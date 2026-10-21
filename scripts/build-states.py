#!/usr/bin/env python3
"""Build src/data/states.json from the official facts collected in data/raw/states-*.json.

Each raw field carries its value, the official URL it was read on and a verbatim quote. This script
only reshapes: it never invents a value. A null stays null and the site prints "not confirmed".
Spanish versions of the free-text fields come from data/raw/es-text.json (English -> Spanish);
with --strict, a missing translation stops the build and is listed in data/raw/es-missing.json.

Usage: python3 scripts/build-states.py [--strict]
"""
import json, re, sys, unicodedata
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
RAW = ROOT / 'data' / 'raw'
OUT = ROOT / 'src' / 'data' / 'states.json'
OVR = RAW / 'overrides.json'

ES_NAMES = {
    'AL': 'Alabama', 'AK': 'Alaska', 'AZ': 'Arizona', 'AR': 'Arkansas', 'CA': 'California', 'CO': 'Colorado',
    'CT': 'Connecticut', 'DE': 'Delaware', 'DC': 'Distrito de Columbia', 'FL': 'Florida', 'GA': 'Georgia',
    'HI': 'Hawái', 'ID': 'Idaho', 'IL': 'Illinois', 'IN': 'Indiana', 'IA': 'Iowa', 'KS': 'Kansas', 'KY': 'Kentucky',
    'LA': 'Luisiana', 'ME': 'Maine', 'MD': 'Maryland', 'MA': 'Massachusetts', 'MI': 'Míchigan', 'MN': 'Minnesota',
    'MS': 'Misisipi', 'MO': 'Misuri', 'MT': 'Montana', 'NE': 'Nebraska', 'NV': 'Nevada', 'NH': 'Nuevo Hampshire',
    'NJ': 'Nueva Jersey', 'NM': 'Nuevo México', 'NY': 'Nueva York', 'NC': 'Carolina del Norte', 'ND': 'Dakota del Norte',
    'OH': 'Ohio', 'OK': 'Oklahoma', 'OR': 'Oregón', 'PA': 'Pensilvania', 'RI': 'Rhode Island', 'SC': 'Carolina del Sur',
    'SD': 'Dakota del Sur', 'TN': 'Tennessee', 'TX': 'Texas', 'UT': 'Utah', 'VT': 'Vermont', 'VA': 'Virginia',
    'WA': 'Washington', 'WV': 'Virginia Occidental', 'WI': 'Wisconsin', 'WY': 'Wyoming',
}
# Notes that only say a figure was not found add nothing: the site already prints "not confirmed".
EMPTY_NOTE = re.compile(r'^(?:not (?:stated|found|published|confirmed|given|specified)|no (?:official|number|figure)|unable|could not)', re.I)
NOTE_FIELDS = ['permit_min_age_years', 'permit_holding_months', 'supervised_hours_total', 'intermediate_min_age_years',
               'full_license_min_age_years', 'knowledge_test_questions', 'knowledge_test_pass_correct', 'knowledge_test_pass_percent',
               'knowledge_test_spanish', 'motorcycle_permit_min_age_years']
FIELD_KEY = {
    'permit_min_age_years': 'permitAge', 'permit_holding_months': 'holdMonths', 'supervised_hours_total': 'hours',
    'supervised_hours_night': 'nightHours', 'intermediate_min_age_years': 'interAge', 'full_license_min_age_years': 'fullAge',
    'drivers_ed_required': 'driversEd', 'knowledge_test_questions': 'testQ', 'knowledge_test_pass_correct': 'testPass',
    'knowledge_test_pass_percent': 'testPct', 'knowledge_test_retake_wait': 'retake', 'knowledge_test_spanish': 'spanish',
    'permit_fee_usd': 'permitFee', 'license_fee_usd': 'licenseFee', 'night_restriction': 'night',
    'passenger_restriction': 'passengers', 'teen_phone_ban': 'phoneBan', 'under21_bac': 'u21bac',
    'motorcycle_permit_min_age_years': 'motoAge', 'motorcycle_test_questions': 'motoQ', 'motorcycle_test_pass': 'motoPass',
}


def slugify(s: str) -> str:
    s = unicodedata.normalize('NFKD', s).encode('ascii', 'ignore').decode()
    return re.sub(r'[^a-z0-9]+', '-', s.lower()).strip('-')


def num(v):
    if v is None or isinstance(v, bool):
        return None
    if isinstance(v, (int, float)):
        return v
    m = re.search(r'-?\d+(?:\.\d+)?', str(v))
    return float(m.group()) if m else None


def clean(v):
    if v is None:
        return None
    s = str(v).strip().replace('—', ',').replace('–', '-')
    # US site: American spelling, whatever the reader of the page typed in the raw notes.
    s = re.sub(r'\b([Ll])icence', r'\1icense', s)
    return s or None


def retake_days(t: str | None):
    """Days to wait before a retake, read from the official sentence. Returns (days, business)."""
    if not t:
        return None, False
    s = t.lower()
    if re.search(r'next (business|working) day', s):
        return 1, True
    if re.search(r'next (calendar )?day|following day|not the same day', s):
        return 1, False
    if re.search(r'same day|no waiting', s):
        return 0, False
    m = re.search(r'(\d+)\s*(calendar\s+|business\s+|working\s+)?days?', s)
    if m:
        return int(m.group(1)), bool(m.group(2) and m.group(2).strip() in ('business', 'working'))
    m = re.search(r'(\d+)\s*hours?', s)
    if m:
        return max(1, round(int(m.group(1)) / 24)), False
    m = re.search(r'(\d+|one|two)\s*weeks?', s)
    if m:
        n = {'one': 1, 'two': 2}.get(m.group(1), None) or int(m.group(1))
        return 7 * n, False
    return None, False


def main(strict: bool):
    raw = []
    for f in sorted(RAW.glob('states-*.json')):
        d = json.loads(f.read_text())
        raw += d if isinstance(d, list) else d['states']
    overrides = json.loads(OVR.read_text()) if OVR.exists() else {}
    es_path = RAW / 'es-text.json'
    es = json.loads(es_path.read_text()) if es_path.exists() else {}
    missing: set[str] = set()

    def T(s):
        s = clean(s)
        if not s:
            return None
        tr = es.get(s)
        if not tr:
            missing.add(s)
            tr = s
        return {'en': s, 'es': tr}

    out, n_fields, n_null, seen = [], 0, 0, set()
    for r in raw:
        code = r['code']
        if code in seen:
            raise SystemExit(f'duplicate state {code}')
        seen.add(code)
        F = {k: dict(v) if isinstance(v, dict) else {'value': v} for k, v in r['fields'].items()}
        for k, v in overrides.get(code, {}).get('fields', {}).items():
            F.setdefault(k, {}).update(v)
        V = lambda k: F.get(k, {}).get('value')
        for k in FIELD_KEY:
            n_fields += 1
            if V(k) is None:
                n_null += 1
        q, pc_ = num(V('knowledge_test_questions')), num(V('knowledge_test_pass_percent'))
        pc_ok = num(V('knowledge_test_pass_correct'))
        q = int(q) if q else None
        pc_ok = int(pc_ok) if pc_ok else None
        pct = pc_ / 100 if pc_ and pc_ > 1 else pc_
        if pct is None and q and pc_ok:
            pct = round(pc_ok / q, 4)
        rt = clean(V('knowledge_test_retake_wait'))
        rd, rbus = retake_days(rt)
        ph = V('teen_phone_ban')
        phone = ph if isinstance(ph, bool) else (None if ph is None else bool(re.search(r'\b(no|ban|prohibit|may not|shall not|cannot|not allowed|not permitted)\b', str(ph), re.I)))
        de = V('drivers_ed_required')
        if isinstance(de, bool):
            de = 'Required' if de else 'Not required'
        # Raw notes are the researcher's remarks (blocked sites, archive copies...): never published.
        # Publishable notes come from overrides.json only.
        fee_note = None
        notes = {k: T(v) for k, v in overrides.get(code, {}).get('notes', {}).items()}
        sp = V('knowledge_test_spanish')
        rec = {
            'code': code, 'name': r['name'], 'es': ES_NAMES[code],
            'slug': f"{slugify(r['name'])}-permit-test", 'slugEs': f"examen-permiso-{slugify(ES_NAMES[code])}",
            'agency': r['agency'], 'agencyUrl': r['agency_url'], 'handbookUrl': r.get('handbook_url') or None,
            'handbookEdition': clean(r.get('handbook_edition')),
            'permitAge': num(V('permit_min_age_years')), 'holdMonths': num(V('permit_holding_months')),
            'hours': num(V('supervised_hours_total')), 'nightHours': num(V('supervised_hours_night')),
            'interAge': num(V('intermediate_min_age_years')), 'fullAge': num(V('full_license_min_age_years')),
            'testQ': q, 'testPass': pc_ok, 'testPct': pct,
            'retake': T(rt), 'retakeDays': rd, 'retakeBusiness': rbus,
            'spanish': sp if isinstance(sp, bool) else None,
            'permitFee': num(V('permit_fee_usd')), 'licenseFee': num(V('license_fee_usd')), 'feeCombined': False, 'feeNote': T(fee_note),
            'driversEd': T(de), 'night': T(V('night_restriction')), 'passengers': T(V('passenger_restriction')),
            'phoneBan': phone, 'u21bac': num(V('under21_bac')),
            'motoAge': num(V('motorcycle_permit_min_age_years')), 'motoQ': int(num(V('motorcycle_test_questions'))) if num(V('motorcycle_test_questions')) else None,
            'motoPass': clean(V('motorcycle_test_pass')) if V('motorcycle_test_pass') is not None else None,
            'notes': notes,
            'src': {FIELD_KEY[k]: v['source_url'] for k, v in F.items() if k in FIELD_KEY and v.get('value') is not None and v.get('source_url')},
        }
        for k, v in overrides.get(code, {}).get('rec', {}).items():
            rec[k] = T(v) if k in ('feeNote', 'retake', 'driversEd', 'night', 'passengers') and isinstance(v, str) else v
        # Coherence: a pass count above the number of questions, or ages out of order, is a reading error.
        if rec['testQ'] and rec['testPass'] and rec['testPass'] > rec['testQ']:
            raise SystemExit(f'{code}: pass {rec["testPass"]} > questions {rec["testQ"]}')
        if rec['permitAge'] and rec['interAge'] and rec['interAge'] < rec['permitAge']:
            raise SystemExit(f'{code}: intermediate age below permit age')
        for k in ('permitAge', 'interAge', 'fullAge', 'motoAge'):
            if rec[k] is not None and not (13 <= rec[k] <= 21):
                raise SystemExit(f'{code}: {k}={rec[k]} out of range')
        out.append(rec)
    out.sort(key=lambda s: s['name'])
    dates = [r.get('retrieved') or r.get('retrieved_at') for r in raw if r.get('retrieved') or r.get('retrieved_at')]
    meta = {'retrieved': max(dates) if dates else '2026-10-22', 'fields': n_fields, 'nulls': n_null, 'states': len(out)}
    OUT.write_text(json.dumps({'meta': meta, 'states': out}, ensure_ascii=False, indent=1) + '\n')
    miss = RAW / 'es-missing.json'
    if missing:
        miss.write_text(json.dumps(sorted(missing), ensure_ascii=False, indent=1) + '\n')
    elif miss.exists():
        miss.unlink()
    print(f'{len(out)} states, {n_fields - n_null}/{n_fields} fields confirmed, {len(missing)} Spanish texts missing')
    if strict and missing:
        sys.exit(1)


if __name__ == '__main__':
    main('--strict' in sys.argv)
