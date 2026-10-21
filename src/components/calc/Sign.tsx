/**
 * Road signs drawn in SVG from the shapes and colors of the federal MUTCD (11th edition, public
 * domain). Simplified on purpose: no reproduction of an official artwork file.
 */
interface Props { kind: string; label: string }
const W = 120;
export default function Sign({ kind, label }: Props) {
  const box = (children: React.ReactNode) => (
    <svg viewBox={`0 0 ${W} ${W}`} width="96" height="96" role="img" aria-label={label} className="shrink-0">{children}</svg>
  );
  const t = (x: number, y: number, s: number, txt: string, fill = '#111', w = 800) => <text x={x} y={y} fontSize={s} fontWeight={w} fill={fill} textAnchor="middle" fontFamily="Helvetica, Arial, sans-serif">{txt}</text>;
  switch (kind) {
    case 'stop': return box(<><polygon points="35,4 85,4 116,35 116,85 85,116 35,116 4,85 4,35" fill="#C8102E" stroke="#fff" strokeWidth="4" /></>);
    case 'yield': return box(<><polygon points="4,8 116,8 60,112" fill="#fff" stroke="#C8102E" strokeWidth="14" strokeLinejoin="round" /></>);
    case 'school': return box(<><polygon points="60,4 114,48 114,116 6,116 6,48" fill="#C4D600" stroke="#111" strokeWidth="3" /><circle cx="46" cy="58" r="8" fill="#111" /><rect x="40" y="68" width="12" height="28" fill="#111" /><circle cx="76" cy="62" r="7" fill="#111" /><rect x="71" y="70" width="10" height="24" fill="#111" /></>);
    case 'rr-advance': return box(<><circle cx="60" cy="60" r="56" fill="#FFCD00" stroke="#111" strokeWidth="3" /><line x1="22" y1="22" x2="98" y2="98" stroke="#111" strokeWidth="7" /><line x1="98" y1="22" x2="22" y2="98" stroke="#111" strokeWidth="7" />{t(34, 68, 22, 'R')}{t(86, 68, 22, 'R')}</>);
    case 'no-passing': return box(<><polygon points="4,24 116,60 4,96" fill="#FFCD00" stroke="#111" strokeWidth="3" />{t(42, 55, 12, 'NO')}{t(42, 70, 12, 'PASSING')}{t(42, 85, 12, 'ZONE')}</>);
    case 'diamond': return box(<><polygon points="60,4 116,60 60,116 4,60" fill="#FFCD00" stroke="#111" strokeWidth="3" /><path d="M48 88 V62 Q48 44 66 44 H72" fill="none" stroke="#111" strokeWidth="7" /><polygon points="70,34 86,44 70,54" fill="#111" /></>);
    case 'work-zone': return box(<><polygon points="60,4 116,60 60,116 4,60" fill="#F68D2E" stroke="#111" strokeWidth="3" />{t(60, 56, 15, 'ROAD')}{t(60, 74, 15, 'WORK')}</>);
    case 'guide-green': return box(<><rect x="4" y="22" width="112" height="76" rx="8" fill="#006B3F" stroke="#fff" strokeWidth="3" />{t(60, 52, 15, 'Exit 12', '#fff')}{t(60, 76, 14, 'Main St  1 MI', '#fff', 600)}</>);
    case 'services-blue': return box(<><rect x="10" y="10" width="100" height="100" rx="8" fill="#1F4E9E" stroke="#fff" strokeWidth="3" />{t(60, 74, 44, 'H', '#fff')}</>);
    case 'recreation-brown': return box(<><rect x="4" y="22" width="112" height="76" rx="8" fill="#6B4226" stroke="#fff" strokeWidth="3" />{t(60, 52, 14, 'State Park', '#fff')}{t(60, 76, 14, '2 MI', '#fff', 600)}</>);
    case 'regulatory': return box(<><rect x="22" y="4" width="76" height="112" rx="6" fill="#fff" stroke="#111" strokeWidth="4" />{t(60, 32, 14, 'SPEED')}{t(60, 50, 14, 'LIMIT')}{t(60, 94, 38, '45')}</>);
    case 'advisory-speed': return box(<><polygon points="60,2 104,46 60,90 16,46" fill="#FFCD00" stroke="#111" strokeWidth="3" /><path d="M50 70 V52 Q50 36 66 36 H70" fill="none" stroke="#111" strokeWidth="6" /><polygon points="68,28 82,36 68,44" fill="#111" /><rect x="34" y="92" width="52" height="26" fill="#FFCD00" stroke="#111" strokeWidth="3" />{t(60, 111, 13, '25 MPH')}</>);
    case 'do-not-enter': return box(<><rect x="4" y="4" width="112" height="112" fill="#fff" stroke="#111" strokeWidth="2" /><circle cx="60" cy="60" r="50" fill="#C8102E" /><rect x="22" y="52" width="76" height="16" fill="#fff" /></>);
    case 'wrong-way': return box(<><rect x="4" y="26" width="112" height="68" fill="#C8102E" stroke="#fff" strokeWidth="4" />{t(60, 56, 18, 'WRONG', '#fff')}{t(60, 80, 18, 'WAY', '#fff')}</>);
    case 'crossbuck': return box(<><g transform="rotate(40 60 60)"><rect x="4" y="50" width="112" height="20" fill="#fff" stroke="#111" strokeWidth="3" /></g><g transform="rotate(-40 60 60)"><rect x="4" y="50" width="112" height="20" fill="#fff" stroke="#111" strokeWidth="3" /></g></>);
    case 'slow-moving': return box(<><polygon points="60,8 114,104 6,104" fill="#C8102E" /><polygon points="60,30 96,94 24,94" fill="#F68D2E" /></>);
    default: return null;
  }
}
