#!/usr/bin/env python3
"""Monthly re-check of the official pages behind the state file.

For every figure of data/raw/states-*.json, the script downloads the official page it was read on
and looks for the verbatim quote stored with it. A page that changed (new hash) and no longer
contains the quote is listed in data/raw/changes.json: a person then reads it again, corrects the
raw file and runs build-states.py. Nothing is ever rewritten automatically, because a changed fee
or age must be read, not guessed. Pages that block automated access are listed as "blocked".

Usage: python3 scripts/update-data.py [--limit N]
Exit code 0 when nothing moved, 3 when at least one quote is missing (the workflow opens an issue).
"""
import hashlib, json, re, sys, time, urllib.request, html
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
RAW = ROOT / 'data' / 'raw'
HASHES = RAW / 'page-hashes.json'
UA = 'Mozilla/5.0 (compatible; StatePermitTest data check; +https://github.com/)'


def fetch(url: str) -> tuple[int, str]:
    req = urllib.request.Request(url, headers={'User-Agent': UA})
    try:
        with urllib.request.urlopen(req, timeout=30) as r:
            body = r.read()
            ctype = r.headers.get('Content-Type', '')
            if 'pdf' in ctype or url.lower().endswith('.pdf'):
                return r.status, body.decode('latin-1', 'ignore')
            return r.status, body.decode('utf-8', 'ignore')
    except urllib.error.HTTPError as e:
        return e.code, ''
    except Exception:
        return 0, ''


def norm(s: str) -> str:
    s = html.unescape(re.sub(r'<[^>]+>', ' ', s))
    return re.sub(r'\s+', ' ', s).strip().lower()


def squash(s: str) -> str:
    return re.sub(r'[^a-z0-9]', '', s)


def main():
    limit = int(sys.argv[sys.argv.index('--limit') + 1]) if '--limit' in sys.argv else None
    old = json.loads(HASHES.read_text()) if HASHES.exists() else {}
    states = []
    for f in sorted(RAW.glob('states-*.json')):
        states += json.loads(f.read_text())
    # One download per URL, then every quote read on it is looked up.
    by_url: dict[str, list[tuple[str, str, str]]] = {}
    for s in states:
        for k, v in s['fields'].items():
            if isinstance(v, dict) and v.get('value') is not None and v.get('source_url') and v.get('quote'):
                by_url.setdefault(v['source_url'], []).append((s['code'], k, v['quote']))
    urls = sorted(by_url)[:limit] if limit else sorted(by_url)
    new, changes, blocked = dict(old), [], []
    for u in urls:
        code, text = fetch(u)
        if code != 200 or not text:
            blocked.append({'url': u, 'status': code})
            continue
        h = hashlib.sha256(norm(text).encode()).hexdigest()
        new[u] = h
        if old.get(u) == h:
            continue
        page = squash(norm(text))
        for st, field, quote in by_url[u]:
            # Quotes may skip words ("...") and pages differ in quotes and dashes: compare letters and
            # digits only, fragment by fragment, and require the longest fragment to be on the page.
            frags = sorted((squash(norm(x)) for x in re.split(r'\.\.\.|…', quote)), key=len, reverse=True)
            q = frags[0][:150] if frags else ''
            if q and q not in page:
                changes.append({'state': st, 'field': field, 'url': u, 'quote': quote})
        time.sleep(1)
    HASHES.write_text(json.dumps(new, indent=1, sort_keys=True) + '\n')
    (RAW / 'changes.json').write_text(json.dumps({'checked': len(urls), 'blocked': blocked, 'changes': changes}, indent=1) + '\n')
    print(f'{len(urls)} pages checked, {len(blocked)} blocked, {len(changes)} quotes to read again')
    sys.exit(3 if changes else 0)


if __name__ == '__main__':
    main()
