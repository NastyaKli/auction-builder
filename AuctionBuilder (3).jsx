import { useState, useRef, useEffect } from "react";

/* ── Fonts ───────────────────────────────────────────────────────────────── */
(() => {
  const l = document.createElement("link");
  l.rel = "stylesheet";
  l.href = "https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap";
  document.head.appendChild(l);
})();

/* ── Tokens ──────────────────────────────────────────────────────────────── */
const C = {
  green:       "#16A34A",
  greenLight:  "#EBFFF7",
  bg:          "#F8F8F8",
  surface:     "#FFFFFF",
  divider:     "#E9EAEC",
  t1:          "#1D1D1B",
  t2:          "#61615F",
  t3:          "#767676",
  disabled:    "#C5C7C9",
  purple:      "#EDEBFE", purpleT: "#5B21B6",
  blue:        "#DFF0FF", blueT:   "#1D4ED8",
  yellow:      "#FDFFD2", yellowT: "#854D0E",
  red:         "#FDE8E8", redT:    "#B91C1C",
  orange:      "#FFE1CB", orangeT: "#C2410C",
};

/* ── Global styles ───────────────────────────────────────────────────────── */
(() => {
  const s = document.createElement("style");
  s.textContent = `
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html, body, #root { background: ${C.bg}; font-family: 'Poppins', sans-serif;
      color: ${C.t1}; font-size: 14px; -webkit-font-smoothing: antialiased; }
    ::-webkit-scrollbar { width: 4px; }
    ::-webkit-scrollbar-thumb { background: ${C.divider}; border-radius: 4px; }

    input, select, textarea {
      font-family: 'Poppins', sans-serif; font-size: 14px; color: ${C.t1};
      height: 40px; padding: 8px 12px; width: 100%; outline: none;
      background: ${C.surface}; border: 1px solid ${C.divider}; border-radius: 4px;
      transition: border-color .15s, box-shadow .15s;
    }
    textarea { height: auto; resize: vertical; }
    input::placeholder, textarea::placeholder { color: ${C.t3}; }
    input:focus, select:focus, textarea:focus {
      border-color: #1D1D1B; box-shadow: none;
    }
    input[type="checkbox"] { width:16px; height:16px; accent-color:${C.green}; cursor:pointer; }
    input[type="number"]::-webkit-inner-spin-button { opacity:.5; }

    .btn {
      display:inline-flex; align-items:center; justify-content:center; gap:8px;
      height:40px; padding:8px 32px; border-radius:4px; border:none; cursor:pointer;
      font-family:'Poppins',sans-serif; font-size:14px; font-weight:500;
      transition:all .15s; white-space:nowrap;
    }
    .btn:disabled { opacity:.35; cursor:not-allowed; pointer-events:none; }
    .btn-primary  { background:${C.t1}; color:#fff; }
    .btn-primary:hover:not(:disabled) { background:#333; }
    .btn-secondary { background:transparent; color:${C.t1}; border:1px solid ${C.divider} !important; padding:8px 24px; }
    .btn-secondary:hover:not(:disabled) { background:${C.bg}; border-color:#bbb !important; }
    .btn-tertiary  { background:transparent; color:${C.green}; padding:8px 0; border:none !important; }
    .btn-tertiary:hover { color:#15803D; }
    .btn-sm { height:32px !important; padding:4px 16px !important; font-size:12px !important; }

    .card { background:${C.surface}; border:1px solid ${C.divider}; border-radius:4px; }

    .badge {
      display:inline-flex; align-items:center; gap:4px;
      height:24px; padding:4px 8px; border-radius:4px;
      font-size:12px; font-weight:500; white-space:nowrap;
      font-family:'Poppins',sans-serif;
    }
    .bg-green  { background:${C.greenLight}; color:${C.green}; }
    .bg-blue   { background:${C.blue};       color:${C.blueT}; }
    .bg-purple { background:${C.purple};     color:${C.purpleT}; }
    .bg-yellow { background:${C.yellow};     color:${C.yellowT}; }
    .bg-red    { background:${C.red};        color:${C.redT}; }
    .bg-orange { background:${C.orange};     color:${C.orangeT}; }
    .bg-neutral{ background:${C.bg}; color:${C.t2}; border:1px solid ${C.divider}; }

    table { width:100%; border-collapse:collapse; }
    thead th {
      text-align:left; font-size:11px; font-weight:600; color:${C.t1};
      padding:8px 16px; border-bottom:1px solid ${C.divider};
      text-transform:uppercase; letter-spacing:.05em;
    }
    tbody tr { border-bottom:1px solid ${C.divider}; transition:background .1s; }
    tbody tr:last-child { border-bottom:none; }
    tbody tr:hover { background:${C.bg}; }
    tbody td { padding:10px 16px; font-size:14px; color:${C.t2}; }

    .toggle {
      position:relative; width:36px; height:20px; background:${C.divider};
      border-radius:10px; cursor:pointer; border:none; padding:0;
      transition:background .2s; flex-shrink:0; display:block;
    }
    .toggle.on { background:${C.green}; }
    .toggle::after {
      content:''; position:absolute; width:14px; height:14px; background:#fff;
      border-radius:50%; top:3px; left:3px;
      transition:transform .2s; box-shadow:0 1px 3px rgba(0,0,0,.15);
    }
    .toggle.on::after { transform:translateX(16px); }

    .sel-card { background:${C.surface}; border:1px solid ${C.divider}; border-radius:4px; cursor:pointer; transition:border-color .15s; }
    .sel-card:hover { border-color:#bbb; }
    .sel-card.active { border-color:${C.green}; box-shadow:0 0 0 2px rgba(22,163,74,.12); }

    .dot { width:28px; height:28px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:11px; font-weight:600; flex-shrink:0; transition:all .2s; }
    .dot-done    { background:${C.green}; color:#fff; }
    .dot-active  { background:${C.t1}; color:#fff; }
    .dot-pending { background:${C.bg}; color:${C.disabled}; border:1px solid ${C.divider}; }
    .step-line { flex:1; height:1px; background:${C.divider}; margin:0 8px; margin-bottom:18px; transition:background .3s; }
    .step-line.done { background:${C.green}; }

    .fade { animation:fadeIn .2s ease; }
    @keyframes fadeIn { from { opacity:0; transform:translateY(5px); } to { opacity:1; transform:none; } }
  `;
  document.head.appendChild(s);
})();

/* ── Icons ───────────────────────────────────────────────────────────────── */
const Svg = ({ d, size = 14, color = "currentColor", sw = 1.5, poly, line, circle }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round"
    style={{ flexShrink: 0 }}>
    {d && <path d={d} />}
    {poly && <polyline points={poly} />}
    {line && <line x1={line[0]} y1={line[1]} x2={line[2]} y2={line[3]} />}
    {circle && <circle cx={circle[0]} cy={circle[1]} r={circle[2]} />}
  </svg>
);

const IcoCheck   = ({ size = 12, color = "#fff" }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><polyline points="20 6 9 17 4 12" /></svg>;
const IcoPlus    = ({ size = 14, color = C.t1 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>;
const IcoTrash   = ({ size = 14 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={C.t2} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" /><path d="M10 11v6M14 11v6" /></svg>;
const IcoWarn    = ({ size = 13 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>;
const IcoUpload  = ({ size = 28 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={C.t2} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"><polyline points="16 16 12 12 8 16" /><line x1="12" y1="12" x2="12" y2="21" /><path d="M20.39 18.39A5 5 0 0018 9h-1.26A8 8 0 103 16.3" /></svg>;
const IcoFile    = ({ size = 14 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={C.green} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>;
const IcoRight   = ({ size = 14 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><polyline points="9 18 15 12 9 6" /></svg>;
const IcoLeft    = ({ size = 14 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><polyline points="15 18 9 12 15 6" /></svg>;
const IcoX       = ({ size = 13 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={C.t3} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><circle cx="12" cy="12" r="10" /><line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" /></svg>;
const IcoRocket  = ({ size = 15, color = "currentColor" }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 00-2.91-.09z" /><path d="M12 15l-3-3a22 22 0 012-3.95A12.88 12.88 0 0122 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 01-4 2z" /></svg>;
const IcoSave    = ({ size = 14 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z" /><polyline points="17 21 17 13 7 13 7 21" /><polyline points="7 3 7 8 15 8" /></svg>;

/* ── Shared primitives ───────────────────────────────────────────────────── */
const Card = ({ children, style, p = 20 }) =>
  <div className="card" style={{ padding: p, ...style }}>{children}</div>;

const Divider = ({ my = 16 }) =>
  <div style={{ height: 1, background: C.divider, margin: `${my}px 0` }} />;

const Label = ({ children, required }) => (
  <div style={{ fontSize: 12, fontWeight: 500, color: C.t2, marginBottom: 6 }}>
    {children}{required && <span style={{ color: C.redT, marginLeft: 2 }}>*</span>}
  </div>
);

const Field = ({ label, required, error, hint, children, style }) => (
  <div style={{ display: "flex", flexDirection: "column", ...style }}>
    {label && <Label required={required}>{label}</Label>}
    {children}
    {hint  && <div style={{ fontSize: 11, color: C.t3, marginTop: 4 }}>{hint}</div>}
    {error && <div style={{ fontSize: 11, color: C.redT, marginTop: 4, display: "flex", alignItems: "center", gap: 4 }}><IcoWarn size={11} />{error}</div>}
  </div>
);

const SH = ({ title, sub, action }) => (
  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
    <div>
      <div style={{ fontSize: 13, fontWeight: 600, color: C.t1 }}>{title}</div>
      {sub && <div style={{ fontSize: 12, color: C.t2, marginTop: 2 }}>{sub}</div>}
    </div>
    {action && <div style={{ marginLeft: 12, flexShrink: 0 }}>{action}</div>}
  </div>
);

const Warn = ({ children }) => (
  <div style={{ background: C.yellow, border: `1px solid #D4B800`, borderRadius: 4, padding: "10px 12px", display: "flex", gap: 8, fontSize: 13, color: C.yellowT, alignItems: "flex-start" }}>
    <IcoWarn size={13} />{children}
  </div>
);

const Err = ({ children }) => (
  <div style={{ background: C.red, border: `1px solid #FECACA`, borderRadius: 4, padding: "10px 12px", display: "flex", gap: 8, fontSize: 13, color: C.redT, alignItems: "flex-start" }}>
    <IcoWarn size={13} />{children}
  </div>
);

const Badge = ({ children, cls = "bg-neutral" }) =>
  <span className={`badge ${cls}`}>{children}</span>;

/* ── Constants ───────────────────────────────────────────────────────────── */
const STEPS = ["Creation Mode", "Auction Setup", "Suppliers", "Lots & Pricing", "Documents", "Review & Launch"];
const CURRENCIES = ["USD", "EUR", "GBP", "JPY", "CAD", "AUD", "CHF", "CNY"];
const TIMEZONES  = ["UTC", "America/New_York", "America/Los_Angeles", "Europe/London", "Europe/Berlin", "Asia/Tokyo", "Asia/Singapore"];
const USAGES     = ["Real", "Training", "Test"];

const RANK_OPTIONS = ["All Rank", "Best Rank", "Top 3", "Top 5", "No Rank"];

const DYN_FORMATS = [
  { id: "japanese", label: "Japanese Auction", desc: "Price decreases gradually until a supplier accepts the offer." },
  { id: "dutch",    label: "Dutch Auction",    desc: "Price increases during competitive bidding rounds." },
];
const HC_TYPES     = ["None", "Fixed", "Dynamic"];
const HC_OPS       = ["+", "−", "×", "÷"];
const HC_OP_MAP    = { "+": "+", "−": "-", "×": "*", "÷": "/" };
const DYN_MODES    = ["Percentage", "Factor"];

const mkHandicap   = () => ({ type: "None", operator: "+", value: "", dynMode: "Percentage", dynValue: "" });

/* Calculate evaluated price given a bid value and a handicap rule */
const calcEval = (bid, rule, currency) => {
  const b = parseFloat(bid);
  if (isNaN(b) || !rule || rule.type === "None") return null;

  if (rule.type === "Fixed") {
    const v = parseFloat(rule.value);
    if (isNaN(v)) return null;
    const op = HC_OP_MAP[rule.operator] || "+";
    if (op === "/" && v === 0) return null;
    const ev = op === "+" ? b + v : op === "-" ? b - v : op === "*" ? b * v : b / v;
    return ev;
  }
  if (rule.type === "Dynamic") {
    const v = parseFloat(rule.dynValue);
    if (isNaN(v)) return null;
    if (rule.dynMode === "Percentage") return b * (1 + v / 100);
    if (rule.dynMode === "Factor") {
      if (v <= 0) return null;
      return b * v;
    }
  }
  return null;
};

const fmtEval = (val, currency) => {
  if (val === null || val === undefined) return "—";
  return `${currency} ${val.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

const mkLot = (n) => ({
  id: Date.now() + n, name: `Lot ${n}`,
  baselinePrice: "", duration: "", minDec: "", maxDec: "",
  overtime: false, overtimeMin: "", preBid: false,
  showRank: false, rankVisibility: "All Rank",
  handicapEnabled: false, handicapRules: {},
  requiredSuppliers: [], lineItems: [],
  /* Dynamic-specific */
  dynStartingPrice: "", dynEndingPrice: "", dynRoundIncrement: "", dynRoundDuration: "",
  dynPreBid: false, dynShowRank: false, dynRankVisibility: "All Rank",
  dynPreferredEnabled: false, dynPreferredTimes: {},
  /* Dynamic single line item */
  dynItem: { name: "", unit: "", quantity: "", ceilingPrices: {} },
});

const INIT = {
  creationMode: null, type: null, biddingMode: null, dynamicFormat: null,
  name: "", owner: "", startTime: "", endTime: "",
  usage: "", currency: "USD", timezone: "UTC",
  suppliers: [], lots: [mkLot(1)], documents: [],
};


/* ── Extra icons ─────────────────────────────────────────────────────────── */
const IcoPencil = ({ size = 14 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={C.t2} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>;
const IcoChevDown = ({ size = 13, color = C.t2 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, transition: "transform .2s" }}><polyline points="6 9 12 15 18 9"/></svg>;

/* ── Section definitions ─────────────────────────────────────────────────── */
const SECTIONS = [
  { id: "arch",      label: "Architecture",    sub: "Type & bidding mode",   isDone: (a) => !!a.type && (a.type === "simple" ? !!a.biddingMode : !!a.dynamicFormat) },
  { id: "setup",     label: "Auction Setup",   sub: "Name, dates, currency", isDone: (a) => !!a.name && !!a.owner },
  { id: "suppliers", label: "Suppliers",       sub: "Invite participants",   isDone: (a) => a.suppliers.length > 0 },
  { id: "lots",      label: "Lots & Items",    sub: "Define scope",          isDone: (a) => a.lots.every(l => l.name && l.baselinePrice) },
  { id: "review",    label: "Review & Launch", sub: "Confirm & submit",      isDone: () => false },
];

/* ── Dark Sidebar ────────────────────────────────────────────────────────── */
const NAV_ITEMS = [
  { id: "dashboard",  label: "Dashboard" },
  { id: "eauctions",  label: "eAuctions", active: true },
  { id: "trainings",  label: "Trainings" },
  { id: "users",      label: "Users" },
  { id: "decisiontree", label: "Decision Tree" },
  { id: "crowngpt",   label: "Crown GPT" },
  { id: "clients",    label: "Clients" },
];

const DarkSidebar = ({ collapsed = false }) => (
  <div style={{ width: collapsed ? 48 : 170, flexShrink: 0, background: "#1A1A2E", display: "flex", flexDirection: "column", transition: "width .25s ease", overflow: "hidden" }}>
    {/* Logo */}
    <div style={{ padding: collapsed ? "16px 0" : "16px 20px 12px", borderBottom: "1px solid rgba(255,255,255,.08)", display: "flex", alignItems: "center", justifyContent: collapsed ? "center" : "flex-start", flexShrink: 0 }}>
      {collapsed
        ? <div style={{ width: 28, height: 28, borderRadius: 6, background: C.green, display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ fontSize: 12, fontWeight: 800, color: "#fff" }}>C</span></div>
        : <div style={{ fontSize: 17, fontWeight: 800, color: "#fff", letterSpacing: "0.04em", whiteSpace: "nowrap" }}>CROWN</div>
      }
    </div>
    {/* Nav items */}
    {!collapsed && (
      <>
        <div style={{ padding: "8px 8px 4px", margin: "6px 8px 2px", borderRadius: 6, background: "rgba(255,255,255,.07)", display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer" }}>
          <span style={{ fontSize: 12, fontWeight: 500, color: "rgba(255,255,255,.85)", whiteSpace: "nowrap" }}>All clients</span>
          <IcoChevDown size={11} color="rgba(255,255,255,.5)" />
        </div>
        <div style={{ padding: "4px 8px", flex: 1, overflowY: "auto" }}>
          {NAV_ITEMS.map(item => (
            <div key={item.id} style={{ padding: "7px 10px", borderRadius: 6, marginBottom: 2, cursor: "pointer", background: item.active ? "rgba(255,255,255,.12)" : "transparent", display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 5, height: 5, borderRadius: "50%", background: item.active ? C.green : "transparent", flexShrink: 0 }} />
              <span style={{ fontSize: 13, fontWeight: item.active ? 600 : 400, color: item.active ? "#fff" : "rgba(255,255,255,.65)", whiteSpace: "nowrap" }}>{item.label}</span>
            </div>
          ))}
        </div>
        <div style={{ padding: "10px 14px", borderTop: "1px solid rgba(255,255,255,.08)", display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
          <div style={{ width: 26, height: 26, borderRadius: "50%", background: C.green, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <span style={{ fontSize: 10, fontWeight: 700, color: "#fff" }}>MV</span>
          </div>
          <div style={{ overflow: "hidden" }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: "#fff", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>Mykyta Voytenko</div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,.6)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>mykyta@crown.ovh</div>
          </div>
        </div>
      </>
    )}
    {collapsed && (
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 8, gap: 4 }}>
        {NAV_ITEMS.map(item => (
          <div key={item.id} title={item.label} style={{ width: 32, height: 32, borderRadius: 6, background: item.active ? "rgba(255,255,255,.15)" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
            <div style={{ width: 5, height: 5, borderRadius: "50%", background: item.active ? C.green : "rgba(255,255,255,.4)" }} />
          </div>
        ))}
      </div>
    )}
  </div>
);

/* ── Sections Nav ────────────────────────────────────────────────────────── */
const SectionsNav = ({ activeId, auction, onGate }) => {
  const scrollTo = (id) => {
    const el = document.getElementById(`sec-${id}`);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div style={{ width: 160, flexShrink: 0, background: C.surface, borderRight: `1px solid ${C.divider}`, display: "flex", flexDirection: "column", overflowY: "auto" }}>
      {/* Breadcrumb */}
      <div style={{ padding: "12px 16px", borderBottom: `1px solid ${C.divider}` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 2 }}>
          <span style={{ fontSize: 10, color: C.t3, fontWeight: 500 }}>PROCUREMENT</span>
        </div>
        <div style={{ fontSize: 13, fontWeight: 700, color: C.t1 }}>eAuction Builder</div>
      </div>
      {/* Sections */}
      <div style={{ padding: "12px 10px", flex: 1 }}>
        <div style={{ fontSize: 10, fontWeight: 700, color: C.t3, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8, paddingLeft: 6 }}>Sections</div>
        {SECTIONS.map((sec, i) => {
          const done = sec.isDone(auction);
          const active = activeId === sec.id;
          return (
            <button key={sec.id} onClick={() => scrollTo(sec.id)}
              style={{ width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "8px 8px", borderRadius: 6, border: "none", cursor: "pointer", background: active ? C.greenLight : "transparent", marginBottom: 2, textAlign: "left" }}>
              {/* Status dot */}
              <div style={{ width: 20, height: 20, borderRadius: "50%", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", background: active ? C.green : done ? C.green : C.bg, border: `1px solid ${active || done ? C.green : C.divider}` }}>
                {done || active ? <IcoCheck size={10} /> : <span style={{ fontSize: 10, fontWeight: 700, color: C.t3 }}>{i + 1}</span>}
              </div>
              <div style={{ overflow: "hidden" }}>
                <div style={{ fontSize: 12, fontWeight: active ? 600 : 500, color: active ? C.green : C.t1, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{sec.label}</div>
                <div style={{ fontSize: 10, color: C.t3, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{sec.sub}</div>
              </div>
            </button>
          );
        })}
      </div>
      {/* Back to gate */}
      <div style={{ padding: "12px 16px", borderTop: `1px solid ${C.divider}` }}>
        <button onClick={onGate} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 11, color: C.t3, padding: 0, fontFamily: "Poppins,sans-serif", display: "flex", alignItems: "center", gap: 4 }}>
          ← Change mode
        </button>
      </div>
    </div>
  );
};

/* ── Right eAuction Summary ──────────────────────────────────────────────── */
const RightSummary = ({ auction }) => {
  const fmt = (d) => d ? new Date(d).toLocaleString("en-GB", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" }).replace(",", "") : "—";
  const rows = [
    { label: "Type",      value: auction.biddingMode === "english" ? "English Auction" : auction.biddingMode === "sealed" ? "Sealed Bid" : auction.dynamicFormat === "japanese" ? "Japanese Auction" : auction.dynamicFormat === "dutch" ? "Dutch Auction" : "—" },
    { label: "Currency",  value: auction.currency || "—" },
    { label: "Start Time",value: fmt(auction.startTime) },
    { label: "Suppliers", value: auction.suppliers.length > 0 ? `${auction.suppliers.length} invited` : "—", green: auction.suppliers.length > 0 },
    { label: "Lots",      value: auction.lots.length > 0 ? `${auction.lots.length} configured` : "—" },
  ];
  return (
    <div style={{ width: 200, flexShrink: 0 }}>
      <div style={{ position: "sticky", top: 60 }}>
        <div style={{ fontSize: 10, fontWeight: 700, color: C.t3, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 12 }}>eAuction Summary</div>
        {rows.map(row => (
          <div key={row.label} style={{ marginBottom: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 3 }}>
              <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke={C.t3} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>
              <span style={{ fontSize: 11, color: C.t3 }}>{row.label}</span>
            </div>
            <div style={{ fontSize: 13, fontWeight: 600, color: row.green ? C.green : C.t1, paddingLeft: 19 }}>{row.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ── Section anchor wrapper ──────────────────────────────────────────────── */
const Sec = ({ id, title, sub, children }) => (
  <div id={`sec-${id}`} style={{ scrollMarginTop: 64, marginBottom: 40 }}>
    <div style={{ marginBottom: 16 }}>
      <div style={{ fontSize: 18, fontWeight: 700, color: C.t1, marginBottom: 3 }}>{title}</div>
      {sub && <div style={{ fontSize: 13, color: C.t2 }}>{sub}</div>}
    </div>
    {children}
  </div>
);

/* ── SecSetup ─────────────────────────────────────────────────────────────── */
const SecSetup = ({ auction, update, errors }) => {
  const isDynamic = auction.type === "dynamic";
  return (
  <Sec id="setup" title="eAuction Setup" sub="How would you like to configure this auction?">
    <Card>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <Field label="eAuction name" required error={errors.name} style={{ gridColumn: "1 / -1" }}>
          <input value={auction.name} onChange={e => update({ name: e.target.value })} placeholder="e.g. Q4 Office Supplies Procurement"
            style={{ borderColor: errors.name ? C.redT : undefined }} />
        </Field>
        <Field label="eAuction owner" required error={errors.owner}>
          <div style={{ position: "relative" }}>
            <input value={auction.owner} onChange={e => update({ owner: e.target.value })} placeholder="Name or email"
              style={{ paddingLeft: 40, borderColor: errors.owner ? C.redT : undefined }} />
            <div style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", width: 22, height: 22, borderRadius: "50%", background: auction.owner ? C.green : C.divider, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: 10, fontWeight: 700, color: "#fff" }}>{auction.owner ? auction.owner.slice(0, 2).toUpperCase() : "?"}</span>
            </div>
          </div>
        </Field>
        <Field label="Usage" required>
          <select value={auction.usage} onChange={e => update({ usage: e.target.value })}>
            <option value="">Select usage…</option>
            {USAGES.map(u => <option key={u}>{u}</option>)}
          </select>
        </Field>
        <Field label="Start Date and time" required error={errors.startTime}>
          <input type="datetime-local" value={auction.startTime} onChange={e => update({ startTime: e.target.value })}
            style={{ borderColor: errors.startTime ? C.redT : undefined }} />
        </Field>
        <Field label="End Date and time" required={!isDynamic}
          hint={isDynamic ? "Not applicable for multi-round dynamic auctions" : undefined}
          error={errors.endTime && errors.endTime !== "order" ? errors.endTime : undefined}>
          <input type="datetime-local" value={isDynamic ? "" : auction.endTime}
            onChange={e => update({ endTime: e.target.value })}
            disabled={isDynamic}
            style={{ borderColor: errors.endTime ? C.redT : undefined, opacity: isDynamic ? 0.4 : 1, cursor: isDynamic ? "not-allowed" : undefined }} />
        </Field>
        <Field label="Currency" hint="Cannot be changed after lots are created">
          <select value={auction.currency} onChange={e => update({ currency: e.target.value })}>
            {CURRENCIES.map(c => <option key={c}>{c}</option>)}
          </select>
        </Field>
        <Field label="Decimals">
          <select value={auction.decimals || "2"} onChange={e => update({ decimals: e.target.value })}>
            {["0","1","2","3"].map(d => <option key={d}>{d} decimal{d !== "1" ? "s" : ""}</option>)}
          </select>
        </Field>
      </div>
      {errors.endTime === "order" && <div style={{ marginTop: 12 }}><Warn>End time must be after start time.</Warn></div>}
    </Card>
  </Sec>
  );
};

/* ── SecArchitecture ─────────────────────────────────────────────────────── */
const SecArchitecture = ({ auction, update }) => {
  const { type, biddingMode, dynamicFormat } = auction;
  return (
    <Sec id="arch" title="eAuction Architecture" sub="How would you like to configure this auction?">
      <Card>
        <div style={{ fontSize: 13, fontWeight: 600, color: C.t1, marginBottom: 12 }}>
          {type === "dynamic" ? "Dynamic Configuration" : "Simple Configuration"}
        </div>

        {/* Type selection */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
          {[
            { id: "simple",  label: "Single Round Auction",       desc: "One round. Suppliers submit a single bid — sealed or live. Fast and straightforward." },
            { id: "dynamic", label: "Multi-Round Dynamic Auction", desc: "One round. Suppliers submit a single bid — sealed or live. Fast and straightforward." },
          ].map(opt => {
            const sel = type === opt.id;
            return (
              <div key={opt.id} onClick={() => update({ type: opt.id, dynamicFormat: null, biddingMode: null })}
                style={{ padding: 14, border: `2px solid ${sel ? C.green : C.divider}`, borderRadius: 6, cursor: "pointer", display: "flex", gap: 10, transition: "all .15s", background: sel ? C.greenLight : C.surface }}>
                <div style={{ marginTop: 2, width: 16, height: 16, borderRadius: "50%", border: `2px solid ${sel ? C.green : C.divider}`, background: sel ? C.green : C.surface, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  {sel && <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#fff" }} />}
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: C.t1, marginBottom: 3 }}>{opt.label}</div>
                  <div style={{ fontSize: 11, color: C.t2, lineHeight: 1.5 }}>{opt.desc}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Dynamic format */}
        {type === "dynamic" && (
          <div className="fade">
            <Divider my={12} />
            <div style={{ fontSize: 12, fontWeight: 600, color: C.t2, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 10 }}>Format</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              {DYN_FORMATS.map(fmt => {
                const sel = dynamicFormat === fmt.id;
                return (
                  <div key={fmt.id} onClick={() => update({ dynamicFormat: fmt.id })}
                    style={{ padding: "12px 14px", border: `2px solid ${sel ? C.green : C.divider}`, borderRadius: 6, cursor: "pointer", display: "flex", gap: 10, background: sel ? C.greenLight : C.surface, transition: "all .15s" }}>
                    <div style={{ marginTop: 2, width: 16, height: 16, borderRadius: "50%", border: `2px solid ${sel ? C.green : C.divider}`, background: sel ? C.green : C.surface, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      {sel && <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#fff" }} />}
                    </div>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: C.t1, marginBottom: 2 }}>{fmt.label}</div>
                      <div style={{ fontSize: 11, color: C.t2 }}>{fmt.desc}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Simple bidding mode */}
        {type === "simple" && (
          <div className="fade">
            <Divider my={12} />
            <div style={{ fontSize: 12, fontWeight: 600, color: C.t2, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 10 }}>Bidding Mode</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              {[
                { id: "english", label: "Live bidding",  badge: "English",  desc: "Price increases during competitive bidding rounds." },
                { id: "sealed",  label: "Sealed bid",    badge: "1st price", desc: "Price increases during competitive bidding rounds." },
              ].map(m => {
                const sel = biddingMode === m.id;
                return (
                  <div key={m.id} onClick={() => update({ biddingMode: m.id })}
                    style={{ padding: "12px 14px", border: `1px solid ${sel ? C.green : C.divider}`, borderRadius: 6, cursor: "pointer", background: sel ? C.greenLight : C.surface, transition: "all .15s" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                      <span style={{ fontSize: 13, fontWeight: 600, color: C.t1 }}>{m.label}</span>
                      <Badge cls={sel ? "bg-green" : "bg-neutral"}>{m.badge}</Badge>
                    </div>
                    <div style={{ fontSize: 11, color: C.t2, lineHeight: 1.5 }}>{m.desc}</div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </Card>
    </Sec>
  );
};

/* ── SecSuppliers ────────────────────────────────────────────────────────── */
const SecSuppliers = ({ auction, update }) => {
  const [sName, setSName] = useState("");
  const [sEmail, setSEmail] = useState("");
  const [search, setSearch] = useState("");

  const add = () => {
    if (!sName.trim()) return;
    update({ suppliers: [...auction.suppliers, { id: Date.now(), name: sName.trim(), email: sEmail.trim(), status: "Pending" }] });
    setSName(""); setSEmail("");
  };
  const remove = (id) => update({ suppliers: auction.suppliers.filter(s => s.id !== id) });
  const filtered = auction.suppliers.filter(s => !search || s.name.toLowerCase().includes(search.toLowerCase()) || s.email.toLowerCase().includes(search.toLowerCase()));

  return (
    <Sec id="suppliers" title="Suppliers" sub="Invite suppliers to participate in this eAuction">
      {/* Toolbar */}
      <div style={{ display: "flex", gap: 8, marginBottom: 12, alignItems: "center" }}>
        <div style={{ position: "relative", flex: 1, maxWidth: 280 }}>
          <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke={C.t3} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)" }}><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search…"
            style={{ paddingLeft: 32, height: 36, fontSize: 13 }} />
        </div>
        {/* Quick-add inline */}
        <input value={sName} onChange={e => setSName(e.target.value)} onKeyDown={e => e.key === "Enter" && add()} placeholder="Name" style={{ height: 36, fontSize: 13, width: 140 }} />
        <input value={sEmail} onChange={e => setSEmail(e.target.value)} onKeyDown={e => e.key === "Enter" && add()} placeholder="Email" style={{ height: 36, fontSize: 13, width: 180 }} />
        <button className="btn btn-primary" onClick={add} style={{ height: 36, padding: "0 18px", fontSize: 13, flexShrink: 0, display: "flex", alignItems: "center", gap: 6 }}>
          <IcoPlus size={13} color="#fff" /> Add supplier
        </button>
      </div>

      {/* Table */}
      <Card p={0}>
        {auction.suppliers.length === 0 ? (
          <div style={{ padding: "48px 16px", textAlign: "center", color: C.t3, fontSize: 13 }}>No suppliers added yet.</div>
        ) : (
          <table>
            <thead><tr>
              <th>Name</th><th>Email</th><th>Status</th><th style={{ width: 80 }}>Actions</th>
            </tr></thead>
            <tbody>
              {filtered.map(s => (
                <tr key={s.id}>
                  <td style={{ color: C.t1, fontWeight: 500 }}>{s.name}</td>
                  <td style={{ color: C.t2, fontSize: 13 }}>{s.email ? s.email.length > 22 ? s.email.slice(0, 20) + "…" : s.email : <span style={{ color: C.t3 }}>—</span>}</td>
                  <td><Badge cls="bg-yellow">{s.status}</Badge></td>
                  <td>
                    <div style={{ display: "flex", gap: 4 }}>
                      <button style={{ background: "none", border: "none", cursor: "pointer", padding: 4, display: "flex" }}><IcoPencil /></button>
                      <button onClick={() => remove(s.id)} style={{ background: "none", border: "none", cursor: "pointer", padding: 4, display: "flex" }}><IcoTrash /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Card>
    </Sec>
  );
};

/* ── SecLots ─────────────────────────────────────────────────────────────── */
const DURATION_OPTIONS = ["1 min","2 min","3 min","5 min","10 min","15 min","20 min","30 min","45 min","60 min","90 min","120 min"];
const ROUND_DURATION_OPTIONS = ["30 sec","1 min","2 min","3 min","5 min","10 min","15 min"];
const OVERTIME_OPTIONS = ["30 sec","1 min","2 min","3 min","5 min","10 min"];

const IcoSettings = () => <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke={C.t3} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>;
const IcoSuppliers = () => <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke={C.t3} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>;
const IcoLines = () => <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke={C.t3} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2"/><rect x="9" y="3" width="6" height="4" rx="1"/></svg>;
const IcoPlusCircle = ({ color = C.green }) => <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>;
const IcoInfo = () => <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke={C.t3} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, cursor: "help" }}><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="8"/><path d="M12 12v4"/></svg>;

/* Input with suffix (EUR) */
const InputSuffix = ({ suffix, ...props }) => (
  <div style={{ position: "relative" }}>
    <input {...props} style={{ ...(props.style || {}), paddingRight: suffix ? 44 : undefined }} />
    {suffix && <span style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", fontSize: 13, color: C.t3, fontWeight: 500, pointerEvents: "none" }}>{suffix}</span>}
  </div>
);

const SecLots = ({ auction, update }) => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [advOpen, setAdvOpen] = useState(true);
  const lots = auction.lots;
  const idx = Math.min(activeIdx, lots.length - 1);
  const lot = lots[idx];
  const isDynamic = auction.type === "dynamic";
  const cur = auction.currency || "EUR";

  const updLot = (ch) => update({ lots: lots.map((l, i) => i === idx ? { ...l, ...ch } : l) });
  const addLot = () => {
    const next = [...lots, mkLot(lots.length + 1)];
    update({ lots: next });
    setActiveIdx(next.length - 1);
  };
  const removeLot = (i) => {
    if (lots.length === 1) return;
    const next = lots.filter((_, j) => j !== i);
    update({ lots: next });
    setActiveIdx(Math.max(0, i <= idx ? idx - 1 : idx));
  };

  const addItem = () => updLot({ lineItems: [...lot.lineItems, { id: Date.now(), name: "", quantity: 1, prices: auction.suppliers.reduce((a, s) => ({ ...a, [s.id]: "" }), {}) }] });
  const updItem = (id, ch) => updLot({ lineItems: lot.lineItems.map(li => li.id === id ? { ...li, ...ch } : li) });
  const delItem = (id) => updLot({ lineItems: lot.lineItems.filter(li => li.id !== id) });

  /* Dynamic round preview */
  const roundPreview = (() => {
    if (!isDynamic) return null;
    const dur = parseFloat(lot.duration), rd = parseFloat(lot.dynRoundDuration);
    if (!isNaN(dur) && !isNaN(rd) && rd > 0) return Math.floor(dur / rd);
    return null;
  })();

  const sectionLabel = (icon, text) => (
    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
      {icon}
      <span style={{ fontSize: 11, fontWeight: 600, color: C.t3, textTransform: "uppercase", letterSpacing: "0.1em" }}>{text}</span>
    </div>
  );

  return (
    <Sec id="lots" title="Lots & Items" sub="Define what you are buying and assign suppliers.">

      {/* ── Tabs ── */}
      <div style={{ display: "flex", alignItems: "flex-end", gap: 0, marginBottom: 0 }}>
        {lots.map((l, i) => {
          const active = idx === i;
          return (
            <div key={l.id} style={{ display: "flex", alignItems: "center" }}>
              <button onClick={() => setActiveIdx(i)}
                style={{
                  padding: "7px 20px", border: `1px solid ${active ? C.divider : C.divider}`,
                  borderBottom: active ? "1px solid #fff" : `1px solid ${C.divider}`,
                  borderRadius: active ? "4px 4px 0 0" : "4px 4px 0 0",
                  cursor: "pointer", fontSize: 14, fontWeight: active ? 700 : 500,
                  fontFamily: "Poppins,sans-serif",
                  background: active ? "#F0F4C3" : C.bg,
                  color: active ? C.t1 : C.t2,
                  position: "relative", zIndex: active ? 2 : 1,
                  marginBottom: active ? -1 : 0,
                  transition: "all .15s",
                }}>
                {l.name || `Lot ${i + 1}`}
              </button>
              {lots.length > 1 && active && (
                <button onClick={() => removeLot(i)} style={{ background: "none", border: "none", cursor: "pointer", padding: "0 4px", color: C.t3, fontSize: 16, lineHeight: 1 }}>×</button>
              )}
            </div>
          );
        })}
        <button onClick={addLot}
          style={{ display: "flex", alignItems: "center", gap: 6, padding: "7px 14px", background: "transparent", border: "1px solid transparent", borderRadius: "4px 4px 0 0", cursor: "pointer", fontSize: 14, color: C.t2, fontFamily: "Poppins,sans-serif", marginBottom: 0 }}>
          <IcoPlusCircle color={C.green} /> Add lot
        </button>
      </div>

      {/* ── Card ── */}
      <div style={{ background: C.surface, border: `1px solid ${C.divider}`, borderRadius: "0 4px 4px 4px", padding: "20px 20px 0" }}>

        {/* LOT SETTINGS */}
        {sectionLabel(<IcoSettings />, "Lot Settings")}

        {/* Lot name — full width for simple; in 2-col for dynamic */}
        {!isDynamic && (
          <Field label="Lot name" style={{ marginBottom: 16 }}>
            <input value={lot.name} onChange={e => updLot({ name: e.target.value })} placeholder="Nestle Corporate" />
          </Field>
        )}

        {/* Simple fields */}
        {!isDynamic && (
          <>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
              <Field label={`Baseline price*`}>
                <InputSuffix suffix={cur} type="number" value={lot.baselinePrice} onChange={e => updLot({ baselinePrice: e.target.value })} placeholder="0,00" />
              </Field>
              <Field label="Duration of competition*">
                <select value={lot.duration || "5 min"} onChange={e => updLot({ duration: e.target.value })}>
                  {DURATION_OPTIONS.map(d => <option key={d}>{d}</option>)}
                </select>
              </Field>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
              <Field label="Min bid decrement*">
                <InputSuffix suffix={cur} type="number" value={lot.minDec} onChange={e => updLot({ minDec: e.target.value })} placeholder="1" />
              </Field>
              <Field label="Max bid decrement*">
                <InputSuffix suffix={cur} type="number" value={lot.maxDec} onChange={e => updLot({ maxDec: e.target.value })} placeholder="1" />
              </Field>
            </div>
          </>
        )}

        {/* Dynamic fields — Dutch / Japanese */}
        {isDynamic && (
          <>
            {/* Row 1: Lot name | Duration of competition */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
              <Field label="Lot name">
                <input value={lot.name} onChange={e => updLot({ name: e.target.value })} placeholder="Nestle Corporate" />
              </Field>
              <Field label="Duration of competition*">
                <select value={lot.duration || "5 min"} onChange={e => updLot({ duration: e.target.value })}>
                  {DURATION_OPTIONS.map(d => <option key={d}>{d}</option>)}
                </select>
              </Field>
            </div>
            {/* Row 2: Baseline price | Round Duration */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
              <Field label="Baseline price*">
                <InputSuffix suffix={cur} type="number" value={lot.baselinePrice} onChange={e => updLot({ baselinePrice: e.target.value })} placeholder="0,00" />
              </Field>
              <Field label="Round Duration*">
                <select value={lot.dynRoundDuration || "1 min"} onChange={e => updLot({ dynRoundDuration: e.target.value })}>
                  {ROUND_DURATION_OPTIONS.map(d => <option key={d}>{d}</option>)}
                </select>
              </Field>
            </div>
            {/* Row 3: Round Increment | Ending Price (Dutch) / Starting Price (Japanese) */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
              <Field label={<span style={{ display: "flex", alignItems: "center", gap: 5 }}>Round Increment* <IcoInfo /></span>}>
                <InputSuffix suffix={cur} type="number" value={lot.dynRoundIncrement} onChange={e => updLot({ dynRoundIncrement: e.target.value })} placeholder="1" />
              </Field>
              <Field label={<span style={{ display: "flex", alignItems: "center", gap: 5 }}>{auction.dynamicFormat === "japanese" ? "Starting Price*" : "Ending Price*"} <IcoInfo /></span>}>
                <InputSuffix suffix={cur} type="number" value={lot.dynEndingPrice} onChange={e => updLot({ dynEndingPrice: e.target.value })} placeholder="1" />
              </Field>
            </div>
          </>
        )}

        {/* ── Advanced Settings ── */}
        <div style={{ borderTop: `1px solid ${C.divider}`, margin: "4px -20px 0" }}>
          {/* Header — clickable */}
          <button onClick={() => setAdvOpen(v => !v)}
            style={{ width: "100%", display: "flex", alignItems: "center", gap: 8, padding: "14px 20px", background: "none", border: "none", cursor: "pointer", textAlign: "left" }}>
            <IcoSettings />
            <span style={{ fontSize: 11, fontWeight: 600, color: C.t3, textTransform: "uppercase", letterSpacing: "0.1em", flex: 1 }}>Advanced Settings</span>
            <div style={{ transform: advOpen ? "rotate(180deg)" : "none", transition: "transform .2s" }}>
              <IcoChevDown size={13} color={C.t3} />
            </div>
          </button>
          {/* Content */}
          {advOpen && (
            <div className="fade" style={{ padding: "0 20px 20px", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
            {/* Pre-bid phase */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <button className={`toggle ${(isDynamic ? lot.dynPreBid : lot.preBid) ? "on" : ""}`}
                  onClick={() => updLot(isDynamic ? { dynPreBid: !lot.dynPreBid } : { preBid: !lot.preBid })} />
                <span style={{ fontSize: 14, fontWeight: 500, color: C.t1 }}>Pre-bid phase</span>
              </div>
            </div>
            {/* Enable Overtime (simple only) */}
            {!isDynamic ? (
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: lot.overtime ? 10 : 0 }}>
                  <button className={`toggle ${lot.overtime ? "on" : ""}`} onClick={() => updLot({ overtime: !lot.overtime })} />
                  <span style={{ fontSize: 14, fontWeight: 500, color: C.t1 }}>Enable Overtime</span>
                </div>
                {lot.overtime && (
                  <select value={lot.overtimeMin || "1 min"} onChange={e => updLot({ overtimeMin: e.target.value })} style={{ marginTop: 4 }}>
                    {OVERTIME_OPTIONS.map(o => <option key={o}>{o}</option>)}
                  </select>
                )}
              </div>
            ) : (
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <button className={`toggle ${lot.dynPreferredEnabled ? "on" : ""}`} onClick={() => updLot({ dynPreferredEnabled: !lot.dynPreferredEnabled })} />
                  <span style={{ fontSize: 14, fontWeight: 500, color: C.t1 }}>Preferred Suppliers</span>
                </div>
              </div>
            )}
            {/* Show Rank */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: (isDynamic ? lot.dynShowRank : lot.showRank) ? 10 : 0 }}>
                <button className={`toggle ${(isDynamic ? lot.dynShowRank : lot.showRank) ? "on" : ""}`}
                  onClick={() => updLot(isDynamic ? { dynShowRank: !lot.dynShowRank } : { showRank: !lot.showRank })} />
                <span style={{ fontSize: 14, fontWeight: 500, color: C.t1 }}>Show Rank</span>
              </div>
              {(isDynamic ? lot.dynShowRank : lot.showRank) && (
                <select value={isDynamic ? lot.dynRankVisibility : lot.rankVisibility}
                  onChange={e => updLot(isDynamic ? { dynRankVisibility: e.target.value } : { rankVisibility: e.target.value })}
                  style={{ marginTop: 4 }}>
                  {RANK_OPTIONS.map(r => <option key={r}>{r}</option>)}
                </select>
              )}
            </div>
          </div>
          )}
        </div>

        {/* ── Preferred Suppliers timing (dynamic only, when enabled) ── */}
        {isDynamic && lot.dynPreferredEnabled && auction.suppliers.length > 0 && (
          <div className="fade" style={{ borderTop: `1px solid ${C.divider}`, margin: "0 -20px", padding: "16px 20px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
              <IcoSuppliers />
              <span style={{ fontSize: 11, fontWeight: 600, color: C.t3, textTransform: "uppercase", letterSpacing: "0.1em" }}>Preferred Suppliers — Available from</span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12 }}>
              {auction.suppliers.map(s => (
                <Field key={s.id} label={s.name}>
                  <input type="time" value={lot.dynPreferredTimes?.[s.id] || ""}
                    onChange={e => updLot({ dynPreferredTimes: { ...lot.dynPreferredTimes, [s.id]: e.target.value } })}
                    placeholder="00:00" />
                </Field>
              ))}
            </div>
          </div>
        )}

        {/* ── Assigned Suppliers ── */}
        <div style={{ borderTop: `1px solid ${C.divider}`, margin: "0 -20px", padding: "16px 20px" }}>
          {sectionLabel(<IcoSuppliers />, "Assigned Suppliers")}
          {auction.suppliers.length === 0 ? (
            <div style={{ fontSize: 13, color: C.t3, paddingBottom: 4 }}>Add suppliers in the Suppliers section first.</div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
              {auction.suppliers.map(s => {
                const req = lot.requiredSuppliers.includes(s.id);
                return (
                  <label key={s.id} style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
                    <div onClick={() => updLot({ requiredSuppliers: req ? lot.requiredSuppliers.filter(id => id !== s.id) : [...lot.requiredSuppliers, s.id] })}
                      style={{ width: 20, height: 20, borderRadius: 4, border: `2px solid ${req ? C.t1 : C.divider}`, background: req ? C.t1 : C.surface, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, cursor: "pointer", transition: "all .15s" }}>
                      {req && <IcoCheck size={11} />}
                    </div>
                    <span style={{ fontSize: 14, color: C.t1 }}>{s.name}</span>
                  </label>
                );
              })}
            </div>
          )}
        </div>

        {/* ── Line Items ── */}
        <div style={{ borderTop: `1px solid ${C.divider}`, margin: "0 -20px", padding: "14px 20px 20px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <IcoLines />
              <span style={{ fontSize: 11, fontWeight: 600, color: C.t3, textTransform: "uppercase", letterSpacing: "0.1em" }}>Line Items</span>
            </div>
            {/* Add Item only for Simple */}
            {!isDynamic && (
              <button onClick={addItem} style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", cursor: "pointer", fontSize: 14, color: C.t1, fontFamily: "Poppins,sans-serif", fontWeight: 500 }}>
                <IcoPlusCircle /> Add Item
              </button>
            )}
          </div>

          {/* Dynamic: single fixed line item */}
          {isDynamic ? (
            <div style={{ border: `1px solid ${C.divider}`, borderRadius: 4, overflow: "hidden" }}>
              <table>
                <thead><tr>
                  <th>Item Name</th>
                  <th style={{ width: 100 }}>Unit</th>
                  <th style={{ width: 90 }}>Quantity</th>
                  {auction.suppliers.map(s => <th key={s.id}>{s.name} — Ceiling price</th>)}
                </tr></thead>
                <tbody>
                  <tr>
                    <td><input value={lot.dynItem?.name || ""} onChange={e => updLot({ dynItem: { ...lot.dynItem, name: e.target.value } })} placeholder="Item name" style={{ minWidth: 120 }} /></td>
                    <td><input value={lot.dynItem?.unit || ""} onChange={e => updLot({ dynItem: { ...lot.dynItem, unit: e.target.value } })} placeholder="e.g. kg" style={{ width: 80 }} /></td>
                    <td><input type="number" value={lot.dynItem?.quantity || ""} onChange={e => updLot({ dynItem: { ...lot.dynItem, quantity: e.target.value } })} placeholder="0" style={{ width: 70 }} /></td>
                    {auction.suppliers.map(s => (
                      <td key={s.id}>
                        <InputSuffix suffix={cur} type="number"
                          value={lot.dynItem?.ceilingPrices?.[s.id] || ""}
                          onChange={e => updLot({ dynItem: { ...lot.dynItem, ceilingPrices: { ...(lot.dynItem?.ceilingPrices || {}), [s.id]: e.target.value } } })}
                          placeholder="0,00"
                          style={{ minWidth: 110 }} />
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          ) : (
            /* Simple: multiple line items */
            lot.lineItems.length === 0 ? (
              <div style={{ background: C.bg, borderRadius: 4, border: `1px solid ${C.divider}`, padding: "28px 0", textAlign: "center", fontSize: 14, color: C.t3 }}>No line items</div>
            ) : (
              <div style={{ border: `1px solid ${C.divider}`, borderRadius: 4, overflow: "hidden" }}>
                <table>
                  <thead><tr>
                    <th>Item Name</th><th style={{ width: 70 }}>Qty</th>
                    {auction.suppliers.slice(0, 3).map(s => <th key={s.id}>{s.name}</th>)}
                    <th style={{ width: 36 }} />
                  </tr></thead>
                  <tbody>
                    {lot.lineItems.map(li => (
                      <tr key={li.id}>
                        <td><input value={li.name} onChange={e => updItem(li.id, { name: e.target.value })} placeholder="Item name" style={{ minWidth: 120 }} /></td>
                        <td><input type="number" value={li.quantity} onChange={e => updItem(li.id, { quantity: e.target.value })} style={{ width: 58 }} /></td>
                        {auction.suppliers.slice(0, 3).map(s => (
                          <td key={s.id}><input type="number" value={li.prices[s.id] || ""} onChange={e => updItem(li.id, { prices: { ...li.prices, [s.id]: e.target.value } })} placeholder="Price" style={{ width: 82 }} /></td>
                        ))}
                        <td><button onClick={() => delItem(li.id)} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", padding: 4 }}><IcoTrash /></button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )
          )}
        </div>

      </div>
    </Sec>
  );
};

/* ── SecReview ───────────────────────────────────────────────────────────── */
const SecReview = ({ auction, onLaunch }) => {
  const errs = [];
  if (!auction.name) errs.push("Auction name is required");
  if (!auction.owner) errs.push("Auction owner is required");
  if (auction.suppliers.length === 0) errs.push("No suppliers have been added");
  if (auction.lots.some(l => !l.baselinePrice)) errs.push("Some lots are missing a baseline price");
  if (auction.type === "simple" && !auction.biddingMode) errs.push("Bidding mode not selected");

  const fmt = (d) => d ? new Date(d).toLocaleString("en-GB", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" }).replace(",", "") : "—";
  const KV = ({ label, value }) => (
    <div>
      <div style={{ fontSize: 13, color: C.t2, marginBottom: 4 }}>{label}</div>
      <div style={{ fontSize: 14, fontWeight: 700, color: C.t1 }}>{value || <span style={{ color: C.t3 }}>—</span>}</div>
    </div>
  );

  return (
    <Sec id="review" title="Review & Launch" sub="Review your auction configuration before publishing.">
      {errs.length > 0 && <div style={{ marginBottom: 16, display: "flex", flexDirection: "column", gap: 6 }}>{errs.map(e => <Err key={e}>{e}</Err>)}</div>}

      <Card style={{ marginBottom: 16 }}>

        {/* ── Auction overview ── */}
        <div style={{ fontSize: 16, fontWeight: 700, color: C.t1, marginBottom: 20 }}>Auction overview</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px 24px" }}>
          <KV label="eAuction name" value={auction.name} />
          <KV label="Owner" value={auction.owner} />
          <KV label="Type" value={auction.type === "simple" ? "Simple eAuction" : auction.type === "dynamic" ? "Dynamic eAuction" : null} />
          <KV label="Currency" value={auction.currency} />
          <KV label="Time zone" value={auction.timezone} />
          <KV label="Usage" value={auction.usage} />
          <KV label="Bidding mode" value={auction.biddingMode === "english" ? "English" : auction.biddingMode === "sealed" ? "Sealed Bid" : auction.dynamicFormat === "japanese" ? "Japanese" : auction.dynamicFormat === "dutch" ? "Dutch" : null} />
          <KV label="Start time" value={fmt(auction.startTime)} />
          <KV label="End time" value={fmt(auction.endTime)} />
        </div>

        <Divider my={20} />

        {/* ── Suppliers ── */}
        <div style={{ fontSize: 16, fontWeight: 700, color: C.t1, marginBottom: 16 }}>Suppliers</div>
        {auction.suppliers.length === 0 ? (
          <div style={{ fontSize: 14, color: C.t3 }}>No suppliers added.</div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px 24px" }}>
            {auction.suppliers.map(s => <div key={s.id} style={{ fontSize: 14, fontWeight: 700, color: C.t1 }}>{s.name}</div>)}
          </div>
        )}

        <Divider my={20} />

        {/* ── Lots ── */}
        <div style={{ fontSize: 16, fontWeight: 700, color: C.t1, marginBottom: 16 }}>Lots</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px 24px" }}>
          {auction.lots.map((l, i) => (
            <div key={l.id}>
              <div style={{ fontSize: 14, fontWeight: 700, color: C.t1, marginBottom: 3 }}>{l.name || `Lot ${i + 1}`}</div>
              <div style={{ fontSize: 13, color: C.t2 }}>Baseline: {l.baselinePrice ? `${auction.currency} ${Number(l.baselinePrice).toLocaleString()}` : "—"}</div>
            </div>
          ))}
        </div>

      </Card>

      <div style={{ display: "flex", gap: 10 }}>
        <button className="btn btn-secondary" style={{ display: "flex", alignItems: "center", gap: 6 }}><IcoSave size={14} /> Save Draft</button>
        <button className="btn btn-primary" onClick={onLaunch} disabled={errs.length > 0} style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <IcoRocket size={14} color="#fff" /> Launch Auction
        </button>
      </div>
    </Sec>
  );
};

/* ── Launch Modal ────────────────────────────────────────────────────────── */
const LaunchModal = ({ auction, onClose }) => (
  <div style={{ position: "fixed", inset: 0, background: "rgba(29,29,27,.55)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 9999 }}>
    <div className="card fade" style={{ padding: 40, maxWidth: 420, width: "90%", textAlign: "center" }}>
      <div style={{ width: 56, height: 56, borderRadius: "50%", background: C.greenLight, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
        <IcoRocket size={26} color={C.green} />
      </div>
      <div style={{ fontSize: 20, fontWeight: 700, color: C.t1, marginBottom: 6 }}>Auction Launched</div>
      <div style={{ fontSize: 14, color: C.t2, lineHeight: 1.6, marginBottom: 12 }}>
        <strong style={{ color: C.t1 }}>{auction.name || "Your auction"}</strong> is now live. All suppliers have been notified.
      </div>
      <div style={{ display: "flex", gap: 6, justifyContent: "center", marginBottom: 24 }}>
        <Badge cls="bg-green">{auction.suppliers.length} suppliers</Badge>
        <Badge cls="bg-blue">{auction.lots.length} lots</Badge>
        <Badge>{auction.currency}</Badge>
      </div>
      <button className="btn btn-primary" onClick={onClose}>View Auction Dashboard</button>
    </div>
  </div>
);

/* ── Creation Gate ───────────────────────────────────────────────────────── */
const CreationGate = ({ onSelect }) => {
  const [hovered, setHovered] = useState(null);
  const [selected, setSelected] = useState(null);

  const choose = (mode) => { setSelected(mode); setTimeout(() => onSelect(mode), 300); };

  const cards = [
    {
      id: "recommended",
      icon: <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke={C.green} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>,
      iconBg: C.greenLight,
      title: "Decision Tree Recommendation",
      desc: "System-optimized auction format based on your procurement profile.",
      body: (
        <div style={{ background: C.bg, border: `1px solid ${C.divider}`, borderRadius: 4, padding: "14px 16px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
            <span style={{ fontSize: 14, fontWeight: 600, color: C.t1 }}>English eAuction</span>
            <span style={{ fontSize: 13, fontWeight: 500, color: C.green }}>94% confidence</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {["Competitive supplier base", "High price variance", "Large spend volume"].map(t => (
              <Badge key={t} cls="bg-blue">{t}</Badge>
            ))}
          </div>
        </div>
      ),
      cta: "Apply recommended setup", ctaCls: "btn-primary",
    },
    {
      id: "scratch",
      icon: <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke={C.t2} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>,
      iconBg: C.bg,
      title: "Create From Scratch",
      desc: "Define all auction parameters manually for full control.",
      body: (
        <div style={{ background: C.bg, border: `1px solid ${C.divider}`, borderRadius: 4, padding: "14px 16px" }}>
          <div style={{ fontSize: 13, color: C.t2, lineHeight: 1.7, marginBottom: 10 }}>
            Manually configure auction type, bidding mode, schedule, lots and pricing from scratch.
          </div>
          <span style={{ fontSize: 13, color: C.green, fontWeight: 500, cursor: "pointer" }}>Run Decision Tree instead →</span>
        </div>
      ),
      cta: "Start configuration", ctaCls: "btn-secondary",
    },
  ];

  return (
    <div style={{ minHeight: "100vh", background: C.bg, display: "flex" }}>
      <DarkSidebar />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "48px 24px" }}>
        <div style={{ width: "100%", maxWidth: 760 }}>
          <div style={{ marginBottom: 32 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: C.t3, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>Step 1</div>
            <div style={{ fontSize: 28, fontWeight: 700, color: C.t1, marginBottom: 6 }}>How would you like to start?</div>
            <div style={{ fontSize: 14, color: C.t2 }}>Choose a configuration method for your procurement auction.</div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {cards.map(card => {
              const isSel = selected === card.id;
              return (
                <div key={card.id}
                  onMouseEnter={() => setHovered(card.id)} onMouseLeave={() => setHovered(null)}
                  onClick={() => choose(card.id)}
                  style={{ background: C.surface, borderRadius: 6, padding: 20, border: `2px solid ${isSel ? C.green : hovered === card.id ? "#bbb" : C.divider}`, cursor: "pointer", position: "relative", boxShadow: isSel ? `0 0 0 4px rgba(22,163,74,.1)` : "none", transition: "all .2s", opacity: selected && !isSel ? 0.5 : 1 }}>
                  {isSel && (
                    <div style={{ position: "absolute", top: 16, right: 16, width: 22, height: 22, borderRadius: "50%", background: C.green, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <IcoCheck size={12} />
                    </div>
                  )}
                  <div style={{ display: "flex", gap: 12, marginBottom: 16, alignItems: "flex-start" }}>
                    <div style={{ width: 40, height: 40, borderRadius: 6, background: card.iconBg, border: `1px solid ${C.divider}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{card.icon}</div>
                    <div>
                      <div style={{ fontSize: 15, fontWeight: 600, color: C.t1, marginBottom: 3, lineHeight: 1.3 }}>{card.title}</div>
                      <div style={{ fontSize: 12, color: C.t2, lineHeight: 1.5 }}>{card.desc}</div>
                    </div>
                  </div>
                  <div style={{ marginBottom: 16 }}>{card.body}</div>
                  <button className={`btn ${card.ctaCls}`} style={{ width: "100%" }} onClick={e => { e.stopPropagation(); choose(card.id); }}>{card.cta}</button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ── ROOT APP ────────────────────────────────────────────────────────────── */
export default function App() {
  const [phase,    setPhase]    = useState("gate");
  const [auction,  setAuction]  = useState(INIT);
  const [errors,   setErrors]   = useState({});
  const [launched, setLaunched] = useState(false);
  const [activeId, setActiveId] = useState("arch");
  const scrollRef = useRef(null);

  const update = (ch) => setAuction(prev => ({ ...prev, ...ch }));
  const enterBuilder = (mode) => { update({ creationMode: mode }); setPhase("builder"); };

  useEffect(() => {
    if (phase !== "builder") return;
    const container = scrollRef.current;
    if (!container) return;
    const observers = [];
    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(`sec-${id}`);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([e]) => { if (e.isIntersecting) setActiveId(id); },
        { root: container, rootMargin: "-10% 0px -75% 0px", threshold: 0 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach(o => o.disconnect());
  }, [phase]);

  if (phase === "gate") return <CreationGate onSelect={enterBuilder} />;

  const auctionLabel = auction.type === "dynamic"
    ? `Dynamic eAuction${auction.dynamicFormat ? ` · ${auction.dynamicFormat === "japanese" ? "Japanese" : "Dutch"}` : ""}`
    : auction.type === "simple"
      ? `Simple eAuction${auction.biddingMode ? ` · ${auction.biddingMode === "english" ? "English" : "Sealed Bid"}` : ""}`
      : "eAuction";

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden", background: C.bg }}>

      {/* Dark sidebar — collapsed to 48px */}
      <DarkSidebar collapsed={true} />

      {/* Sections nav — sticky */}
      <SectionsNav activeId={activeId} auction={auction} onGate={() => setPhase("gate")} />

      {/* Main area */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0, overflow: "hidden" }}>

        {/* Top navbar */}
        <div style={{ height: 48, background: C.surface, borderBottom: `1px solid ${C.divider}`, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 16px", flexShrink: 0 }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: C.t1 }}>{auction.name || "New eAuction"}</div>
            <div style={{ fontSize: 11, color: C.t2 }}>{auctionLabel}</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <button className="btn btn-secondary btn-sm" style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <IcoSave size={12} /> Save draft
            </button>
            <button className="btn btn-primary btn-sm" style={{ display: "flex", alignItems: "center", gap: 5 }}
              onClick={() => { const el = document.getElementById("sec-review"); if (el) el.scrollIntoView({ behavior: "smooth" }); }}>
              <IcoRocket size={12} color="#fff" /> Review & Launch
            </button>
          </div>
        </div>

        {/* Content row — fills remaining height, scrolls internally */}
        <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>

          {/* Scrollable content */}
          <div ref={scrollRef} style={{ flex: 1, overflowY: "auto", padding: "24px 24px 80px" }}>
            <SecArchitecture auction={auction} update={update} />
            <SecSetup        auction={auction} update={update} errors={errors} />
            <SecSuppliers    auction={auction} update={update} />
            <SecLots         auction={auction} update={update} />
            <SecReview       auction={auction} onLaunch={() => setLaunched(true)} />
          </div>

          {/* Right summary — sticky (not scrolls) */}
          <div style={{ width: 190, flexShrink: 0, borderLeft: `1px solid ${C.divider}`, padding: "24px 16px", overflowY: "auto", background: C.surface }}>
            <RightSummary auction={auction} />
          </div>
        </div>
      </div>

      {launched && <LaunchModal auction={auction} onClose={() => setLaunched(false)} />}
    </div>
  );
}


