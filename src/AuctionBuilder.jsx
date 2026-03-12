import React, { useState, useRef, useEffect, useMemo } from "react";

/* ── Tokens ──────────────────────────────────────────────────────────────── */
const C = {
  // Crown Design System palette
  grey900: "#1D1D1B", grey800: "#363633", grey700: "#4A4A48",
  grey500: "#787878", grey400: "#8E8E8E", grey300: "#AEB0B2",
  grey200: "#C5C7C9", grey150: "#DBDCDD", grey100: "#E9EAEC",
  grey50:  "#F8F8F8", white:   "#FFFFFF",
  greenAccent: "#00CE7C", green800: "#007C4A", green100: "#DDFBEE",
  red600:    "#E02424", red800:    "#9B1C1C", red100:    "#FDE8E8",
  yellow50:  "#FDFFD2", yellow600: "#9F580A",
  blue50:    "#DFF0FF", blue800:   "#1A49A9",
  orange50:  "#FFF5EB", orange800: "#8C2300", orange100: "#FFE1CB",
  purple100: "#EDEBFE", purple800: "#5521B5",
  // Semantic aliases
  bg:        "#F8F8F8",
  surface:   "#FFFFFF",
  divider:   "#E9EAEC",
  t1:        "#1D1D1B",
  t2:        "#787878",
  t3:        "#8E8E8E",
  disabled:  "#C5C7C9",
  green:     "#00CE7C", greenLight: "#DDFBEE",
  blue:      "#DFF0FF", blueT:      "#1A49A9",
  purple:    "#EDEBFE", purpleT:    "#5521B5",
  yellow:    "#FDFFD2", yellowT:    "#9F580A",
  red:       "#FDE8E8", redT:       "#9B1C1C",
  orange:    "#FFE1CB", orangeT:    "#8C2300",
  purple50:  "#F3F2FF",
};

/* ── Global styles ───────────────────────────────────────────────────────── */
(() => {
  const s = document.createElement("style");
  s.textContent = `
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html, body, #root { background: ${C.bg}; font-family: 'Poppins', sans-serif;
      color: ${C.t1}; font-size: 14px; -webkit-font-smoothing: antialiased; }
    ::-webkit-scrollbar { width: 4px; }
    ::-webkit-scrollbar-track { background: ${C.bg}; }
    ::-webkit-scrollbar-thumb { background: ${C.disabled}; border-radius: 4px; }

    input, select, textarea {
      font-family: 'Poppins', sans-serif;
      font-size: 14px;
      color: #363633;
      height: 40px;
      padding: 8px 12px;
      padding-right: 12px;
      width: 100%;
      outline: none;
      background: #fff;
      border: 1px solid #C5C7C9;
      border-radius: 4px;
      transition: border-color 0.15s;
    }
    select {
      appearance: none;
      -webkit-appearance: none;
      padding-right: 36px;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23787878' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E");
      background-repeat: no-repeat;
      background-position: right 12px center;
    }
    input[type="number"] { padding-right: 12px; }
    textarea { height: auto; resize: vertical; }
    input::placeholder, textarea::placeholder { color: #8E8E8E; }
    input:focus, select:focus, textarea:focus {
      border-color: #1D1D1B !important;
      box-shadow: none !important;
      outline: none !important;
    }
    input:disabled, select:disabled, textarea:disabled {
      border-color: #DBDCDD;
      color: #AEB0B2;
      background: #fff;
      cursor: not-allowed;
    }
    input.error, select.error, textarea.error { border-color: #E02424; }
    input[type="checkbox"] { width:20px; height:20px; accent-color:${C.green}; cursor:pointer; border-radius:4px; }
    input[type="number"]::-webkit-inner-spin-button { opacity:.5; }

    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      height: 40px;
      padding: 8px 24px;
      border-radius: 4px;
      border: none;
      cursor: pointer;
      font-family: 'Poppins', sans-serif;
      font-size: 14px;
      font-weight: 600;
      line-height: 1;
      white-space: nowrap;
      transition: background 0.15s, border-color 0.15s, color 0.15s;
      text-decoration: none;
    }
    .btn:disabled {
      cursor: not-allowed;
      pointer-events: none;
    }
    .btn-primary {
      background: #1D1D1B;
      color: #FFFFFF;
      border: none;
    }
    .btn-primary:hover:not(:disabled) {
      background: #4A4A48;
    }
    .btn-primary:active:not(:disabled) {
      background: #363633;
    }
    .btn-primary:disabled {
      background: #C5C7C9;
      color: #FFFFFF;
    }
    .btn-secondary {
      background: transparent;
      color: #1D1D1B;
      border: 1px solid #1D1D1B !important;
      padding: 8px 24px;
    }
    .btn-secondary:hover:not(:disabled) {
      border-color: #4A4A48 !important;
      background: transparent;
      color: #1D1D1B;
    }
    .btn-secondary:active:not(:disabled) {
      border-color: #363633 !important;
      background: #E9EAEC;
      color: #1D1D1B;
    }
    .btn-secondary:disabled {
      border-color: #C5C7C9 !important;
      color: #C5C7C9;
      background: transparent;
    }
    .btn-tertiary {
      background: transparent;
      color: #1D1D1B;
      border: none !important;
      padding: 4px 0;
      height: 29px;
      font-weight: 400;
      border-bottom: 1px solid transparent !important;
    }
    .btn-tertiary:hover:not(:disabled) {
      border-bottom: 1px solid #00CE7C !important;
    }
    .btn-tertiary:disabled {
      color: #C5C7C9;
      font-weight: 600;
    }
    .btn-sm {
      height: 32px !important;
      padding: 4px 16px !important;
      font-size: 12px !important;
      font-weight: 600 !important;
    }

    .card { background:${C.surface}; border:1px solid ${C.divider}; border-radius:4px; }

    .badge {
      display:inline-flex; align-items:center; gap:4px;
      height:24px; padding:4px 8px; border-radius:4px;
      font-size:12px; font-weight:400; white-space:nowrap;
      font-family:'Poppins',sans-serif;
    }
    .bg-green  { background:${C.greenLight}; color:#007C4A; }
    .bg-blue   { background:${C.blue};       color:${C.blueT}; }
    .bg-purple { background:#F3F2FF;          color:${C.purpleT}; }
    .bg-yellow { background:${C.yellow};     color:${C.yellowT}; }
    .bg-red    { background:${C.red};        color:${C.redT}; }
    .bg-orange { background:${C.orange};     color:${C.orangeT}; }
    .bg-neutral{ background:${C.bg}; color:${C.t2}; border:1px solid ${C.divider}; }

    table { width:100%; border-collapse:collapse; }
    thead th {
      text-align:left; font-size:12px; font-weight:400; color:${C.t2};
      padding:6px 8px; border-bottom:1px solid ${C.divider};
      text-transform:uppercase; letter-spacing:.05em;
    }
    tbody tr { border-bottom:1px solid ${C.divider}; transition:background .1s; }
    tbody tr:last-child { border-bottom:none; }
    tbody tr:hover { background:${C.bg}; }
    tbody td { padding:8px 12px; font-size:14px; color:${C.t2}; }

    .lt-wrap { border: 1px solid #E9EAEC; border-radius: 6px; overflow: hidden; }
    .lt-head { display: flex; align-items: center; background: #F8F8F8; padding: 10px 16px; gap: 8px; }
    .lt-head span { font-size: 11px; font-weight: 600; color: #787878; text-transform: uppercase; letter-spacing: 0.06em; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .lt-row { display: flex; align-items: center; background: #fff; padding: 8px 16px; gap: 8px; border-top: 1px solid #F0F0F0; }
    .lt-row:last-child { border-bottom: none; }
    .lt-cell-input { border: 1px solid #E9EAEC !important; border-radius: 4px !important; padding: 6px 10px !important; font-size: 13px !important; color: #1D1D1B !important; background: #fff !important; height: 32px !important; width: 100%; transition: border-color 0.15s; box-shadow: none !important; }
    .lt-cell-input:focus { border-color: #1D1D1B !important; outline: none !important; box-shadow: none !important; }
    .lt-trash { background: none; border: none; cursor: pointer; padding: 4px; border-radius: 4px; display: flex; align-items: center; color: #AEB0B2; transition: color 0.15s; flex-shrink: 0; }
    .lt-trash:hover { color: #1D1D1B; }

    .toggle {
      position:relative; width:36px; height:20px; background:#DBDCDD;
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
    .sel-card:hover { border-color:#AEB0B2; }
    .sel-card.active { border-color:${C.green}; }

    .dot { width:28px; height:28px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:12px; font-weight:600; flex-shrink:0; transition:all .2s; }
    .dot-done    { background:${C.green}; color:#fff; }
    .dot-active  { background:${C.t1}; color:#fff; }
    .dot-pending { background:${C.bg}; color:${C.disabled}; border:1px solid ${C.divider}; }
    .step-line { flex:1; height:1px; background:${C.divider}; margin:0 8px; margin-bottom:18px; transition:background .3s; }
    .step-line.done { background:${C.green}; }

    .fade { animation:fadeIn .2s ease; }
    @keyframes fadeIn { from { opacity:0; transform:translateY(5px); } to { opacity:1; transform:none; } }
    button:focus-visible, input:focus-visible, select:focus-visible, textarea:focus-visible {
      outline: 1px solid #00CE7C; outline-offset: 2px;
    }
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
const IcoTrash   = ({ size = 14, color }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color || "currentColor"} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" /><path d="M10 11v6M14 11v6" /></svg>;
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

const Label = ({ children, required, disabled }) => (
  <div style={{ fontSize: 12, fontWeight: 400, color: disabled ? "#AEB0B2" : "#1D1D1B", marginBottom: 6 }}>
    {children}{required && <span style={{ color: disabled ? "#AEB0B2" : C.redT, marginLeft: 2 }}>*</span>}
  </div>
);

const Field = ({ label, required, error, hint, children, style, disabled }) => (
  <div style={{ display: "flex", flexDirection: "column", ...style }}>
    {label && <Label required={required} disabled={disabled}>{label}</Label>}
    {children}
    {hint  && <div style={{ fontSize: 12, color: C.t2, marginTop: 4, lineHeight: 1.2 }}>{hint}</div>}
    {error && <div style={{ fontSize: 12, color: "#E02424", marginTop: 4, lineHeight: 1.2, display: "flex", alignItems: "center", gap: 4 }}><IcoWarn size={12} />{error}</div>}
  </div>
);

const SH = ({ title, sub, action }) => (
  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
    <div>
      <div style={{ fontSize: 14, fontWeight: 700, color: C.t1 }}>{title}</div>
      {sub && <div style={{ fontSize: 12, color: C.t2, marginTop: 2 }}>{sub}</div>}
    </div>
    {action && <div style={{ marginLeft: 12, flexShrink: 0 }}>{action}</div>}
  </div>
);

const Warn = ({ children }) => (
  <div style={{ background: C.yellow, border: `1px solid #E3A008`, borderRadius: 4, padding: "10px 12px", display: "flex", gap: 8, fontSize: 14, color: C.yellowT, alignItems: "flex-start" }}>
    <IcoWarn size={13} />{children}
  </div>
);

const Err = ({ children }) => (
  <div style={{ background: C.red, border: `1px solid #FBD5D5`, borderRadius: 4, padding: "10px 12px", display: "flex", gap: 8, fontSize: 14, color: C.redT, alignItems: "flex-start" }}>
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
  showRanking: false,
  priceAdjustments: {
    enabled: false,
    fixedHandicap:   { added: false, collapsed: false, rules: [] },
    dynamicHandicap: { added: false, collapsed: false, factors: [] },
  },
  requiredSuppliers: [], lineItems: [{ id: Date.now(), name: "", unit: "", quantity: 1, prices: {}, rank: 1 }],
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
  { id: "dashboard",    label: "Dashboard" },
  { id: "eauctions",    label: "eAuctions",     active: true },
  { id: "trainings",    label: "Trainings" },
  { id: "users",        label: "Users" },
  { id: "decisiontree", label: "Decision Tree" },
  { id: "crowngpt",     label: "Crown GPT" },
];

const DarkSidebar = () => {
  const [activeNav, setActiveNav] = React.useState("eauctions");
  const [showMenu, setShowMenu] = React.useState(false);

  return (
    <div style={{ width: 200, flexShrink: 0, background: "#1D1D1B", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "20px 12px", minHeight: "100vh", position: "sticky", top: 0 }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <svg width="22" height="14" viewBox="0 0 22 14" fill="none"><path d="M1 13L5 2L9 7L11 1L13 7L17 2L21 13H1Z" fill="white"/></svg>
            <span style={{ color: "#fff", fontFamily: "Poppins, sans-serif", fontSize: 16, fontWeight: 700, letterSpacing: "0.06em" }}>CROWN</span>
          </div>
          <div style={{ border: "1px solid #363633", borderRadius: 4, height: 29, padding: "0 8px", display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer" }}>
            <span style={{ color: "#AEB0B2", fontSize: 14, fontFamily: "Poppins, sans-serif" }}>All clients</span>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><polyline points="2,4 6,8 10,4" stroke="#AEB0B2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {NAV_ITEMS.map(item => {
            const isActive = activeNav === item.id;
            return (
              <div key={item.id} onClick={() => setActiveNav(item.id)}
                style={{ display: "flex", alignItems: "center", gap: 8, height: 29, padding: "0 8px", borderRadius: 4, background: isActive ? "#363633" : "transparent", cursor: "pointer", transition: "background 0.15s" }}
                onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = "rgba(255,255,255,0.05)"; }}
                onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = "transparent"; }}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <rect x="2" y="2" width="5" height="5" rx="1" stroke={isActive ? "#fff" : "#8E8E8E"} strokeWidth="1.3"/>
                  <rect x="9" y="2" width="5" height="5" rx="1" stroke={isActive ? "#fff" : "#8E8E8E"} strokeWidth="1.3"/>
                  <rect x="2" y="9" width="5" height="5" rx="1" stroke={isActive ? "#fff" : "#8E8E8E"} strokeWidth="1.3"/>
                  <rect x="9" y="9" width="5" height="5" rx="1" stroke={isActive ? "#fff" : "#8E8E8E"} strokeWidth="1.3"/>
                </svg>
                <span style={{ color: isActive ? "#fff" : "#8E8E8E", fontSize: 14, fontFamily: "Poppins, sans-serif" }}>{item.label}</span>
              </div>
            );
          })}

          <div style={{ marginTop: 8, paddingTop: 8, borderTop: "1px solid #363633" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, height: 29, padding: "0 8px", borderRadius: 4, cursor: "pointer" }}
              onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.05)"}
              onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="2" y="6" width="12" height="8" rx="1" stroke="#8E8E8E" strokeWidth="1.3"/><path d="M5 6V4a3 3 0 016 0v2" stroke="#8E8E8E" strokeWidth="1.3" strokeLinecap="round"/></svg>
              <span style={{ color: "#8E8E8E", fontSize: 14, fontFamily: "Poppins, sans-serif" }}>Clients</span>
            </div>
          </div>
        </div>
      </div>

      <div style={{ position: "relative" }}>
        {showMenu && (
          <div style={{ position: "absolute", bottom: "100%", left: 32, marginBottom: 4, background: "#363633", borderRadius: 4, width: 171, zIndex: 100, overflow: "hidden" }}>
            {["Edit Profile", "Switch to French", "Terms of use", "Privacy Policy", "Log Out"].map((label, i) => (
              <div key={i} style={{ padding: "8px 16px", cursor: "pointer", background: i === 1 ? "#4A4A48" : "transparent" }}
                onMouseEnter={e => { if (i !== 1) e.currentTarget.style.background = "rgba(255,255,255,0.06)"; }}
                onMouseLeave={e => { if (i !== 1) e.currentTarget.style.background = i === 1 ? "#4A4A48" : "transparent"; }}>
                <span style={{ color: i === 1 ? "#fff" : "#C5C7C9", fontSize: 14, fontFamily: "Poppins, sans-serif" }}>{label}</span>
              </div>
            ))}
          </div>
        )}
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <span style={{ flex: 1, color: "#DBDCDD", fontSize: 14, fontFamily: "Poppins, sans-serif", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>Mykyta Voytenko</span>
          <div onClick={() => setShowMenu(v => !v)} style={{ width: 16, height: 16, background: "#363633", borderRadius: "100%", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0 }}>
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><circle cx="5" cy="2" r="0.8" fill="#C5C7C9"/><circle cx="5" cy="5" r="0.8" fill="#C5C7C9"/><circle cx="5" cy="8" r="0.8" fill="#C5C7C9"/></svg>
          </div>
        </div>
        <div style={{ color: "#8E8E8E", fontSize: 12, fontFamily: "Poppins, sans-serif", marginTop: 2 }}>mykyta@crown.ovh</div>
      </div>
    </div>
  );
};

/* ── Sections Nav ────────────────────────────────────────────────────────── */
const SectionsNav = ({ activeId, auction, onGate }) => {
  const scrollTo = (id) => {
    const el = document.getElementById(`sec-${id}`);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div style={{ width: 200, flexShrink: 0, background: C.surface, borderRight: `1px solid ${C.divider}`, display: "flex", flexDirection: "column", overflowY: "auto" }}>
      {/* Header */}
      <div style={{ height: 64, flexShrink: 0, borderBottom: `1px solid ${C.divider}`, padding: "0 16px", display: "flex", alignItems: "center", gap: 12 }}>
        <button onClick={onGate} style={{ background: "none", border: "none", cursor: "pointer", padding: 0, fontSize: 18, color: C.t1, lineHeight: 1, flexShrink: 0 }}>←</button>
        <div>
          <div style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600, fontSize: 14, color: C.t1, lineHeight: 1, marginBottom: 3 }}>eAuction Builder</div>
          <div style={{ fontFamily: "Poppins, sans-serif", fontWeight: 400, fontSize: 11, color: C.t2, lineHeight: 1 }}>Procurement</div>
        </div>
      </div>
      {/* Sections */}
      <div style={{ padding: "32px 16px", flex: 1 }}>
        <div style={{ fontSize: 10, fontWeight: 700, color: C.t2, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>Sections</div>
        {SECTIONS.map((sec, i) => {
          const done = sec.isDone(auction);
          const active = activeId === sec.id;
          return (
            <button key={sec.id} onClick={() => scrollTo(sec.id)}
              style={{
                width: "100%", display: "flex", alignItems: "center", gap: 8,
                padding: "8px 12px", borderRadius: 4, cursor: "pointer", textAlign: "left",
                marginBottom: 2,
                background: active ? C.bg : "transparent",
                border: active ? `1px solid ${C.divider}` : "1px solid transparent",
              }}>
              {/* Icon box */}
              <div style={{
                width: 24, height: 24, borderRadius: 4, flexShrink: 0,
                display: "flex", alignItems: "center", justifyContent: "center",
                background: active ? C.t1 : C.bg,
              }}>
                {done && !active
                  ? <IcoCheck size={11} color={C.t2} />
                  : <span style={{ fontSize: 10, fontWeight: 600, color: active ? "#fff" : C.t2, lineHeight: 1 }}>{i + 1}</span>
                }
              </div>
              <div style={{ overflow: "hidden" }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: C.t1, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", lineHeight: 1, marginBottom: 3 }}>{sec.label}</div>
                <div style={{ fontSize: 10, fontWeight: 400, color: C.t2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", lineHeight: 1 }}>{sec.sub}</div>
              </div>
            </button>
          );
        })}
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
        <div style={{ fontSize: 10, fontWeight: 700, color: C.t2, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 12 }}>eAuction Summary</div>
        {rows.map(row => (
          <div key={row.label} style={{ marginBottom: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 3 }}>
              <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke={C.t3} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>
              <span style={{ fontSize: 12, color: C.t2 }}>{row.label}</span>
            </div>
            <div style={{ fontSize: 14, fontWeight: 600, color: row.green ? "#007C4A" : C.t1, paddingLeft: 19 }}>{row.value}</div>
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
      {sub && <div style={{ fontSize: 14, color: C.t2 }}>{sub}</div>}
    </div>
    {children}
  </div>
);

/* ── SecSetup ─────────────────────────────────────────────────────────────── */
const DATE_DISABLED_STYLE = {
  background: "#F8F8F8",
  color: "#AEB0B2",
  cursor: "not-allowed",
  pointerEvents: "none",
};

const SecSetup = ({ auction, update, errors }) => {
  const { type, biddingMode } = auction;
  const startRef = useRef(null);
  const endRef   = useRef(null);

  // isMultiRound covers all dynamic sub-types (Japanese, Dutch)
  const isMultiRound  = type === "dynamic";
  const isEnglishLive = type === "simple" && biddingMode === "english";
  const isSealedBid   = type === "simple" && biddingMode === "sealed";

  // Start disabled only for sealed bid; End disabled for live (english) and multi-round
  const startDisabled = isSealedBid;
  const endDisabled   = isEnglishLive || isMultiRound;

  // Clear the disabled field's value when the relevant selection changes
  const prevKey = React.useRef(`${type}:${biddingMode}`);
  React.useEffect(() => {
    const key = `${type}:${biddingMode}`;
    if (prevKey.current === key) return;
    prevKey.current = key;
    if (startDisabled) update({ startTime: "" });
    if (endDisabled)   update({ endTime: "" });
  }, [type, biddingMode]);

  const openPicker = (ref) => {
    try { ref.current?.showPicker(); } catch (_) {}
  };

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
        <Field label="Start Date and time" required={!startDisabled} error={errors.startTime}
          hint={startDisabled ? "Auction starts immediately after creation" : undefined}
          disabled={startDisabled}>
          <input
            ref={startRef}
            type="datetime-local"
            value={auction.startTime}
            onChange={e => update({ startTime: e.target.value })}
            onClick={() => !startDisabled && openPicker(startRef)}
            disabled={startDisabled}
            style={{
              borderColor: errors.startTime ? C.redT : undefined,
              ...(startDisabled ? DATE_DISABLED_STYLE : {}),
            }}
          />
        </Field>
        <Field label="End Date and time" required={!endDisabled}
          hint={
            isEnglishLive ? "End time is determined during the live auction"
            : isMultiRound ? "Not applicable for multi-round dynamic auctions"
            : undefined
          }
          disabled={endDisabled}
          error={errors.endTime && errors.endTime !== "order" ? errors.endTime : undefined}>
          <input
            ref={endRef}
            type="datetime-local"
            value={auction.endTime}
            onChange={e => update({ endTime: e.target.value })}
            onClick={() => !endDisabled && openPicker(endRef)}
            disabled={endDisabled}
            style={{
              borderColor: errors.endTime ? C.redT : undefined,
              ...(endDisabled ? DATE_DISABLED_STYLE : {}),
            }}
          />
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
        <div style={{ fontSize: 14, fontWeight: 600, color: C.t1, marginBottom: 12 }}>
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
                style={{ padding: 14, border: `1px solid ${sel ? C.green : C.divider}`, borderRadius: 6, cursor: "pointer", display: "flex", gap: 10, transition: "all .15s", background: sel ? C.greenLight : C.surface }}>
                <div style={{ marginTop: 2, width: 16, height: 16, borderRadius: "50%", border: `1px solid ${sel ? C.green : C.divider}`, background: sel ? C.green : C.surface, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  {sel && <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#fff" }} />}
                </div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: C.t1, marginBottom: 3 }}>{opt.label}</div>
                  <div style={{ fontSize: 12, color: C.t2, lineHeight: 1.5 }}>{opt.desc}</div>
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
                    style={{ padding: "12px 14px", border: `1px solid ${sel ? C.green : C.divider}`, borderRadius: 6, cursor: "pointer", display: "flex", gap: 10, background: sel ? C.greenLight : C.surface, transition: "all .15s" }}>
                    <div style={{ marginTop: 2, width: 16, height: 16, borderRadius: "50%", border: `1px solid ${sel ? C.green : C.divider}`, background: sel ? C.green : C.surface, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      {sel && <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#fff" }} />}
                    </div>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 600, color: C.t1, marginBottom: 2 }}>{fmt.label}</div>
                      <div style={{ fontSize: 12, color: C.t2 }}>{fmt.desc}</div>
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
                      <span style={{ fontSize: 14, fontWeight: 600, color: C.t1 }}>{m.label}</span>
                      <Badge cls={sel ? "bg-green" : "bg-neutral"}>{m.badge}</Badge>
                    </div>
                    <div style={{ fontSize: 12, color: C.t2, lineHeight: 1.5 }}>{m.desc}</div>
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
      <div style={{ display: "flex", width: "100%", gap: 12, marginBottom: 12, alignItems: "center" }}>
        <div style={{ position: "relative", flex: 1 }}>
          <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke={C.t3} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)" }}><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search…"
            style={{ paddingLeft: 32 }} />
        </div>
        {/* Quick-add inline */}
        <input value={sName} onChange={e => setSName(e.target.value)} onKeyDown={e => e.key === "Enter" && add()} placeholder="Name" style={{ flex: 1 }} />
        <input value={sEmail} onChange={e => setSEmail(e.target.value)} onKeyDown={e => e.key === "Enter" && add()} placeholder="Email" style={{ flex: 1 }} />
        <button className="btn btn-primary" onClick={add} style={{ flexShrink: 0, display: "flex", alignItems: "center", gap: 6 }}>
          <IcoPlus size={13} color="#fff" /> Add supplier
        </button>
      </div>

      {/* Table */}
      <Card p={0}>
        {auction.suppliers.length === 0 ? (
          <div style={{ padding: "48px 16px", textAlign: "center", color: C.t2, fontSize: 14 }}>No suppliers added yet.</div>
        ) : (
          <table>
            <thead><tr>
              <th>Name</th><th>Email</th><th>Status</th><th style={{ width: 80 }}>Actions</th>
            </tr></thead>
            <tbody>
              {filtered.map(s => (
                <tr key={s.id}>
                  <td style={{ color: C.t1, fontWeight: 500 }}>{s.name}</td>
                  <td style={{ color: C.t2, fontSize: 14 }}>{s.email ? s.email.length > 22 ? s.email.slice(0, 20) + "…" : s.email : <span style={{ color: C.t3 }}>—</span>}</td>
                  <td><Badge cls="bg-yellow">{s.status}</Badge></td>
                  <td>
                    <div style={{ display: "flex", gap: 4 }}>
                      <button style={{ background: "none", border: "none", cursor: "pointer", padding: 4, display: "flex", borderRadius: 4 }}><IcoPencil /></button>
                      <button onClick={() => remove(s.id)} style={{ background: "none", border: "none", cursor: "pointer", padding: 4, display: "flex", borderRadius: 4 }}><IcoTrash /></button>
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
const IcoPlusCircle = ({ color = C.green, size = 18 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>;
const IcoInfo = () => <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke={C.t3} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, cursor: "help" }}><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="8"/><path d="M12 12v4"/></svg>;
const IcoScale = () => <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke={C.t3} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><path d="M12 3v18M3 7l9-4 9 4M5 9l-2 7h4L5 9zM19 9l-2 7h4L19 9z"/><line x1="3" y1="21" x2="21" y2="21"/></svg>;

/* Input with suffix (EUR) */
const InputSuffix = ({ suffix, ...props }) => (
  <div style={{ position: "relative" }}>
    <input {...props} style={{ ...(props.style || {}), paddingRight: suffix ? 44 : undefined }} />
    {suffix && <span style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", fontSize: 12, color: C.t2, fontWeight: 500, pointerEvents: "none" }}>{suffix}</span>}
  </div>
);

/* ── Handicap sub-section components — module-level for focus stability ── */

const HcFixedSection = ({ fh, suppliers, lineItems, onUpdate, onRemove }) => {
  const rules = fh.rules || [];
  const namedItems = lineItems.filter(li => li.name?.trim());
  const addRule = () => onUpdate({ rules: [...rules, { id: Date.now(), supplierId: "all", lineItemId: "all", type: "fixed", value: "" }] });
  const updRule = (id, ch) => onUpdate({ rules: rules.map(r => r.id === id ? { ...r, ...ch } : r) });
  const delRule = (id) => onUpdate({ rules: rules.filter(r => r.id !== id) });

  const SUB_HDR = { display: "flex", alignItems: "flex-start", justifyContent: "space-between", padding: "12px 16px", borderBottom: fh.collapsed ? "none" : `1px solid ${C.divider}` };
  return (
    <div style={{ border: `1px solid ${C.divider}`, borderRadius: 6, background: "#fff", marginTop: 12 }}>
      <div style={SUB_HDR}>
        <div>
          <div style={{ fontSize: 14, fontWeight: 600, color: C.t1 }}>Fixed handicap</div>
          {!fh.collapsed && <div style={{ fontSize: 12, color: C.t2, marginTop: 2 }}>Adjust unit prices per supplier and line item.</div>}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0, marginLeft: 12 }}>
          <button onClick={() => onUpdate({ collapsed: !fh.collapsed })}
            style={{ background: "none", border: "none", cursor: "pointer", fontSize: 12, color: C.t3, display: "flex", alignItems: "center", gap: 3, fontFamily: "Poppins,sans-serif", padding: "2px 0" }}>
            {fh.collapsed ? "Expand" : "Collapse"} <IcoChevDown size={12} color={C.t3} />
          </button>
          <button onClick={() => { if (window.confirm("Remove fixed handicap? All adjustment rules will be deleted.")) onRemove(); }} className="lt-trash"><IcoTrash size={14} /></button>
        </div>
      </div>
      {!fh.collapsed && (
        <div style={{ padding: "12px 16px" }}>
          {rules.length > 0 && (
            <>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 8px 1fr 8px 110px 90px 54px 32px", gap: 4, marginBottom: 6, padding: "0 4px" }}>
                {["Supplier","","Line item","","Type","Value","",""].map((h, i) => (
                  <span key={i} style={{ fontSize: 10, fontWeight: 600, color: C.t3, textTransform: "uppercase", letterSpacing: "0.8px" }}>{h}</span>
                ))}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 10 }}>
                {rules.map(rule => {
                  const v = parseFloat(rule.value);
                  const hasVal = !isNaN(v) && v !== 0;
                  const isPos = v > 0;
                  return (
                    <div key={rule.id} style={{ display: "grid", gridTemplateColumns: "1fr 8px 1fr 8px 110px 90px 54px 32px", gap: 4, alignItems: "center", background: "#FAFAFA", border: "1px solid #E8E8E8", borderRadius: 6, padding: "5px 4px" }}>
                      {suppliers.length === 0
                        ? <select disabled style={{ height: 36, fontSize: 13 }}><option>Add suppliers first</option></select>
                        : <select value={rule.supplierId} onChange={e => updRule(rule.id, { supplierId: e.target.value })} style={{ height: 36, fontSize: 13, padding: "0 28px 0 10px" }}>
                            <option value="all">All suppliers</option>
                            {suppliers.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                          </select>
                      }
                      <span style={{ fontSize: 10, color: C.t3, textAlign: "center" }}>→</span>
                      {namedItems.length === 0
                        ? <select disabled style={{ height: 36, fontSize: 13 }}><option>Add items first</option></select>
                        : <select value={rule.lineItemId} onChange={e => updRule(rule.id, { lineItemId: e.target.value })} style={{ height: 36, fontSize: 13, padding: "0 28px 0 10px" }}>
                            <option value="all">All items</option>
                            {namedItems.map(li => <option key={li.id} value={li.id}>{li.name}</option>)}
                          </select>
                      }
                      <span style={{ fontSize: 10, color: C.t3, textAlign: "center" }}>→</span>
                      <div style={{ display: "flex", border: `1px solid ${C.divider}`, borderRadius: 4, overflow: "hidden", height: 36 }}>
                        {[["fixed","EUR"],["percentage","%"]].map(([t, lbl]) => (
                          <button key={t} onClick={() => updRule(rule.id, { type: t })}
                            style={{ flex: 1, border: "none", cursor: "pointer", fontSize: 12, fontFamily: "Poppins,sans-serif", fontWeight: 500, background: rule.type === t ? C.t1 : "#fff", color: rule.type === t ? "#fff" : C.t3 }}>
                            {lbl}
                          </button>
                        ))}
                      </div>
                      <input type="number" value={rule.value} onChange={e => updRule(rule.id, { value: e.target.value })} placeholder="0" style={{ height: 36, fontSize: 13, textAlign: "center" }} />
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                        {hasVal && (
                          <span style={{ fontSize: 10, borderRadius: 4, padding: "3px 5px", fontWeight: 600, fontFamily: "Poppins,sans-serif", background: isPos ? "#FEF2F2" : "#F0FDF4", color: isPos ? "#DC2626" : "#16A34A" }}>
                            {isPos ? "+" : ""}{rule.value}{rule.type === "percentage" ? "%" : ""}
                          </span>
                        )}
                      </div>
                      <button onClick={() => delRule(rule.id)} className="lt-trash" style={{ width: 32, height: 32, justifyContent: "center" }}>✕</button>
                    </div>
                  );
                })}
              </div>
            </>
          )}
          {rules.length === 0 && (
            <div style={{ border: `1px dashed ${C.divider}`, borderRadius: 6, padding: "16px", textAlign: "center", color: C.t3, fontSize: 13, marginBottom: 10 }}>
              No adjustments yet. Add one to level the playing field.
            </div>
          )}
          <button onClick={addRule}
            style={{ width: "100%", height: 34, border: `1px dashed ${C.divider}`, borderRadius: 6, background: "none", cursor: "pointer", fontSize: 13, fontFamily: "Poppins,sans-serif", color: C.t2, display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = C.green; e.currentTarget.style.color = C.green; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = C.divider; e.currentTarget.style.color = C.t2; }}>
            <IcoPlusCircle size={14} color="currentColor" /> Add adjustment
          </button>
        </div>
      )}
    </div>
  );
};

const HcDynamicSection = ({ dh, suppliers, onUpdate, onRemove }) => {
  const [addOpen, setAddOpen] = React.useState(false);
  const [customName, setCustomName] = React.useState("");
  const factors = dh.factors || [];
  const usedNames = factors.map(f => f.name);
  const addFactor = (name) => { onUpdate({ factors: [...factors, { id: Date.now(), name, values: {} }] }); setAddOpen(false); setCustomName(""); };
  const delFactor = (id) => onUpdate({ factors: factors.filter(f => f.id !== id) });
  const updCell = (fId, supId, patch) => onUpdate({
    factors: factors.map(f => f.id !== fId ? f : { ...f, values: { ...f.values, [supId]: { option: "", handicapValue: "", ...f.values[supId], ...patch } } })
  });

  const SUB_HDR = { display: "flex", alignItems: "flex-start", justifyContent: "space-between", padding: "12px 16px", borderBottom: dh.collapsed ? "none" : `1px solid ${C.divider}` };
  return (
    <div style={{ border: `1px solid ${C.divider}`, borderRadius: 6, background: "#fff", marginTop: 12 }}>
      <div style={SUB_HDR}>
        <div>
          <div style={{ fontSize: 14, fontWeight: 600, color: C.t1 }}>Dynamic handicap</div>
          {!dh.collapsed && <div style={{ fontSize: 12, color: C.t2, marginTop: 2 }}>Compare non-price factors by assigning EUR handicap values.</div>}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0, marginLeft: 12 }}>
          <button onClick={() => onUpdate({ collapsed: !dh.collapsed })}
            style={{ background: "none", border: "none", cursor: "pointer", fontSize: 12, color: C.t3, display: "flex", alignItems: "center", gap: 3, fontFamily: "Poppins,sans-serif", padding: "2px 0" }}>
            {dh.collapsed ? "Expand" : "Collapse"} <IcoChevDown size={12} color={C.t3} />
          </button>
          <button onClick={() => { if (window.confirm("Remove dynamic handicap? All factor data will be deleted.")) onRemove(); }} className="lt-trash"><IcoTrash size={14} /></button>
        </div>
      </div>
      {!dh.collapsed && (
        <div style={{ padding: "12px 16px" }}>
          {suppliers.length === 0 && factors.length === 0 && !addOpen && (
            <div style={{ color: C.t3, fontSize: 13, marginBottom: 12 }}>Add suppliers in the Suppliers section first.</div>
          )}
          {factors.length > 0 && (
            <div style={{ overflowX: "auto", marginBottom: 12 }}>
              <div style={{ minWidth: "max-content" }}>
                <div style={{ display: "flex", borderBottom: `1px solid ${C.divider}` }}>
                  <div style={{ width: 140, padding: "8px 12px", fontSize: 10, fontWeight: 600, color: C.t3, textTransform: "uppercase", letterSpacing: "0.8px", flexShrink: 0 }}>Factor</div>
                  {suppliers.map((s, si) => (
                    <div key={s.id} style={{ minWidth: 220, padding: "6px 8px", background: PA_SUP_COLORS[si % PA_SUP_COLORS.length] }}>
                      <div style={{ fontSize: 12, fontWeight: 600, color: C.t1, marginBottom: 3 }}>{s.name}</div>
                      <div style={{ display: "flex", gap: 4 }}>
                        <span style={{ flex: 1, fontSize: 9, color: C.t3, textTransform: "uppercase", letterSpacing: "0.6px" }}>Option</span>
                        <span style={{ width: 88, fontSize: 9, color: C.t3, textTransform: "uppercase", letterSpacing: "0.6px" }}>Handicap</span>
                      </div>
                    </div>
                  ))}
                  <div style={{ width: 36, flexShrink: 0 }} />
                </div>
                {factors.map(f => (
                  <div key={f.id} style={{ display: "flex", alignItems: "center", borderBottom: `1px solid ${C.divider}` }}>
                    <div style={{ width: 140, padding: "8px 12px", fontSize: 13, fontWeight: 500, color: C.t1, background: "#fff", flexShrink: 0 }}>{f.name}</div>
                    {suppliers.map(s => {
                      const cell = f.values[s.id] || { option: "", handicapValue: "" };
                      return (
                        <div key={s.id} style={{ minWidth: 220, padding: "6px 8px", display: "flex", gap: 4, alignItems: "center" }}>
                          <input value={cell.option} onChange={e => updCell(f.id, s.id, { option: e.target.value })} placeholder="e.g. 30 Days" style={{ flex: 1, height: 34, fontSize: 12, padding: "0 8px" }} />
                          <div style={{ position: "relative", width: 88, flexShrink: 0 }}>
                            <input type="number" value={cell.handicapValue} onChange={e => updCell(f.id, s.id, { handicapValue: e.target.value })} placeholder="0" style={{ width: 88, height: 34, fontSize: 12, padding: "0 32px 0 8px" }} />
                            <span style={{ position: "absolute", right: 8, top: "50%", transform: "translateY(-50%)", fontSize: 10, color: C.t3, pointerEvents: "none" }}>EUR</span>
                          </div>
                        </div>
                      );
                    })}
                    <button onClick={() => delFactor(f.id)} className="lt-trash" style={{ width: 36, height: 36, justifyContent: "center" }}>✕</button>
                  </div>
                ))}
              </div>
            </div>
          )}
          {factors.length === 0 && !addOpen && (
            <div style={{ border: `1px dashed ${C.divider}`, borderRadius: 6, padding: "16px", textAlign: "center", color: C.t3, fontSize: 13, marginBottom: 10 }}>
              No factors added. Add payment terms, warranty or other factors.
            </div>
          )}
          {addOpen ? (
            <div style={{ border: `1px solid ${C.divider}`, borderRadius: 6, padding: 14, marginBottom: 10 }}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 12 }}>
                {PA_PRESETS.filter(p => !usedNames.includes(p)).map(p => (
                  <button key={p} onClick={() => addFactor(p)}
                    style={{ padding: "7px 14px", borderRadius: 6, border: `1px solid ${C.divider}`, background: "#fff", fontSize: 12, fontFamily: "Poppins,sans-serif", cursor: "pointer", color: C.t1 }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = C.green; e.currentTarget.style.background = C.greenLight; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = C.divider; e.currentTarget.style.background = "#fff"; }}>
                    {p}
                  </button>
                ))}
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <input value={customName} onChange={e => setCustomName(e.target.value)} placeholder="Or type custom name..."
                  style={{ flex: 1, height: 36, fontSize: 13 }}
                  onKeyDown={e => { if (e.key === "Enter" && customName.trim()) addFactor(customName.trim()); }} />
                <button onClick={() => customName.trim() && addFactor(customName.trim())} disabled={!customName.trim()}
                  style={{ height: 36, padding: "0 14px", border: "none", borderRadius: 6, cursor: customName.trim() ? "pointer" : "not-allowed", fontSize: 13, fontFamily: "Poppins,sans-serif", background: customName.trim() ? C.t1 : C.disabled, color: "#fff" }}>
                  Add
                </button>
                <button onClick={() => { setAddOpen(false); setCustomName(""); }}
                  style={{ height: 36, padding: "0 14px", border: `1px solid ${C.divider}`, borderRadius: 6, cursor: "pointer", fontSize: 13, fontFamily: "Poppins,sans-serif", background: "#fff", color: C.t1 }}>
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <button onClick={() => setAddOpen(true)}
              style={{ width: "100%", height: 34, border: `1px dashed ${C.divider}`, borderRadius: 6, background: "none", cursor: "pointer", fontSize: 13, fontFamily: "Poppins,sans-serif", color: C.t2, display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = C.green; e.currentTarget.style.color = C.green; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = C.divider; e.currentTarget.style.color = C.t2; }}>
              <IcoPlusCircle size={14} color="currentColor" /> Add factor
            </button>
          )}
        </div>
      )}
    </div>
  );
};

const HcPreview = ({ lot, colSuppliers, pa }) => {
  const lineItems = (lot.lineItems || []).filter(li => li.name?.trim());
  const fh = pa.fixedHandicap   || { added: false, rules: [] };
  const dh = pa.dynamicHandicap || { added: false, factors: [] };
  if (colSuppliers.length === 0 || lineItems.length === 0) return null;

  const hasFixed = fh.added && (fh.rules || []).some(r => { const v = parseFloat(r.value); return !isNaN(v) && v !== 0; });
  const hasDyn   = dh.added && (dh.factors || []).some(f => colSuppliers.some(s => { const v = parseFloat(f.values[s.id]?.handicapValue); return !isNaN(v) && v !== 0; }));
  if (!hasFixed && !hasDyn) return null;

  const getAdj = (li, supId) => {
    const original = parseFloat(li.prices?.[supId]) || 0;
    if (!fh.added) return { adj: original, formula: null };
    const rules = (fh.rules || []).filter(r =>
      (r.supplierId === supId || r.supplierId === "all") && (r.lineItemId === li.id || r.lineItemId === "all")
    );
    let adj = original; const parts = [String(original)];
    rules.forEach(r => {
      const v = parseFloat(r.value);
      if (isNaN(v) || v === 0) return;
      const delta = r.type === "fixed" ? v : original * v / 100;
      adj += delta;
      parts.push((delta >= 0 ? "+" : "") + Math.round(delta));
    });
    return { adj, formula: parts.length > 1 ? parts.join(" ") + " = " + Math.round(adj) : null };
  };

  const supTotals = colSuppliers.map(s => {
    const lineSum = lineItems.reduce((acc, li) => acc + getAdj(li, s.id).adj * (parseFloat(li.quantity) || 0), 0);
    const dynTotal = dh.added ? (dh.factors || []).reduce((acc, f) => acc + (parseFloat(f.values[s.id]?.handicapValue) || 0), 0) : 0;
    return { id: s.id, lineSum, dynTotal, total: lineSum + dynTotal };
  });
  const minTotal = Math.min(...supTotals.map(st => st.total));
  const fmt = n => Math.round(n).toLocaleString();
  const colW = 140;

  return (
    <div style={{ border: "1px solid #BBF7D0", borderRadius: 6, overflow: "hidden", marginTop: 12 }}>
      <div style={{ padding: "7px 14px", background: "#F0FDF4", display: "flex", alignItems: "center", gap: 6 }}>
        <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#22C55E", flexShrink: 0 }} />
        <span style={{ fontSize: 10, fontWeight: 700, color: "#16A34A", textTransform: "uppercase", letterSpacing: "0.8px" }}>Live Preview</span>
      </div>
      <div style={{ overflowX: "auto", background: "#fff" }}>
        <div style={{ minWidth: "max-content" }}>
          <div style={{ display: "flex", background: C.grey50, borderBottom: `1px solid ${C.divider}` }}>
            <div style={{ width: colW, padding: "8px 12px", fontSize: 11, fontWeight: 600, color: C.t3, textTransform: "uppercase", flexShrink: 0 }}>Line item</div>
            <div style={{ width: 56,   padding: "8px 8px",  fontSize: 11, fontWeight: 600, color: C.t3, textTransform: "uppercase", flexShrink: 0 }}>Qty</div>
            {colSuppliers.map((s, si) => (
              <div key={s.id} style={{ width: colW, padding: "8px 12px", fontSize: 11, fontWeight: 600, color: C.t1, background: PA_SUP_COLORS[si % PA_SUP_COLORS.length] }}>{s.name}</div>
            ))}
          </div>
          {lineItems.map(li => (
            <div key={li.id} style={{ display: "flex", borderBottom: `1px solid ${C.divider}` }}>
              <div style={{ width: colW, padding: "8px 12px", fontSize: 13, color: C.t1, flexShrink: 0 }}>{li.name}</div>
              <div style={{ width: 56,   padding: "8px 8px",  fontSize: 13, color: C.t2, flexShrink: 0 }}>{li.quantity}</div>
              {colSuppliers.map(s => {
                const { adj, formula } = getAdj(li, s.id);
                return (
                  <div key={s.id} style={{ width: colW, padding: "8px 12px" }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: C.t1 }}>{fmt(adj)}</div>
                    {formula && <div style={{ fontSize: 10, color: C.green, fontFamily: "monospace" }}>{formula}</div>}
                    <div style={{ fontSize: 10, color: C.t3 }}>Total {fmt(adj * (parseFloat(li.quantity) || 0))}</div>
                  </div>
                );
              })}
            </div>
          ))}
          <div style={{ display: "flex", background: C.grey50, borderBottom: `1px solid ${C.divider}` }}>
            <div style={{ width: colW, padding: "8px 12px", fontSize: 13, fontWeight: 700, color: C.t1, flexShrink: 0 }}>Total price</div>
            <div style={{ width: 56, flexShrink: 0 }} />
            {supTotals.map(st => <div key={st.id} style={{ width: colW, padding: "8px 12px" }}><span style={{ fontSize: 13, fontWeight: 700, color: C.t1 }}>{fmt(st.lineSum)}</span></div>)}
          </div>
          {dh.added && (dh.factors || []).map(f => (
            <div key={f.id} style={{ display: "flex", borderBottom: `1px solid ${C.divider}` }}>
              <div style={{ width: colW, padding: "8px 12px", fontSize: 13, color: C.t2, flexShrink: 0 }}>{f.name}</div>
              <div style={{ width: 56, flexShrink: 0 }} />
              {colSuppliers.map(s => {
                const cell = f.values[s.id];
                const v = parseFloat(cell?.handicapValue);
                return (
                  <div key={s.id} style={{ width: colW, padding: "8px 12px" }}>
                    {cell?.option && <div style={{ fontSize: 12, color: C.t1 }}>{cell.option}</div>}
                    {!isNaN(v) && v !== 0 && <div style={{ fontSize: 11, color: "#DC2626", fontWeight: 600 }}>+{fmt(v)} EUR</div>}
                  </div>
                );
              })}
            </div>
          ))}
          <div style={{ display: "flex", background: "#F0FDF4" }}>
            <div style={{ width: colW, padding: "10px 12px", fontSize: 13, fontWeight: 700, color: C.t1, flexShrink: 0 }}>Total value</div>
            <div style={{ width: 56, flexShrink: 0 }} />
            {supTotals.map(st => (
              <div key={st.id} style={{ width: colW, padding: "10px 12px", display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: C.t1 }}>{fmt(st.total)}</span>
                {st.total === minTotal && <span style={{ fontSize: 9, fontWeight: 700, background: "#BBF7D0", color: "#16A34A", padding: "2px 5px", borderRadius: 4, letterSpacing: "0.5px" }}>BEST</span>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};


/* ── Line Items flex components — module-level so identity is stable ── */
const LT = { name: { flex: 2 }, unit: { flex: 1 }, qty: { flex: 1 }, sup: { flex: 1.5 }, del: { width: 32, flexShrink: 0 } };

const LtHead = ({ colSuppliers, showDel }) => (
  <div className="lt-head">
    <span style={LT.name}>Item Name</span>
    <span style={LT.unit}>Unit</span>
    <span style={LT.qty}>Quantity</span>
    {colSuppliers.map(s => <span key={s.id} style={LT.sup}>{s.name} — Ceiling Price</span>)}
    {showDel && <span style={LT.del} />}
  </div>
);

const LtItemRow = ({ item, colSuppliers, onUpdate, onDelete }) => (
  <div className="lt-row">
    <div style={LT.name}><input className="lt-cell-input" value={item.name} onChange={e => onUpdate(item.id, { name: e.target.value })} placeholder="Item name" /></div>
    <div style={LT.unit}><input className="lt-cell-input" value={item.unit || ""} onChange={e => onUpdate(item.id, { unit: e.target.value })} placeholder="e.g. kg" /></div>
    <div style={LT.qty}><input className="lt-cell-input" type="number" value={item.quantity} onChange={e => onUpdate(item.id, { quantity: e.target.value })} placeholder="0" /></div>
    {colSuppliers.map(s => (
      <div key={s.id} style={LT.sup}>
        <input className="lt-cell-input" type="number" value={item.prices?.[s.id] || ""} onChange={e => onUpdate(item.id, { prices: { ...item.prices, [s.id]: e.target.value } })} placeholder="0.00" />
      </div>
    ))}
    <button className="lt-trash" style={LT.del} onClick={onDelete}><IcoTrash /></button>
  </div>
);

const LtDynRow = ({ dynItem, colSuppliers, onUpdate }) => (
  <div className="lt-row">
    <div style={LT.name}><input className="lt-cell-input" value={dynItem?.name || ""} onChange={e => onUpdate({ name: e.target.value })} placeholder="Item name" /></div>
    <div style={LT.unit}><input className="lt-cell-input" value={dynItem?.unit || ""} onChange={e => onUpdate({ unit: e.target.value })} placeholder="e.g. kg" /></div>
    <div style={LT.qty}><input className="lt-cell-input" type="number" value={dynItem?.quantity || ""} onChange={e => onUpdate({ quantity: e.target.value })} placeholder="0" /></div>
    {colSuppliers.map(s => (
      <div key={s.id} style={LT.sup}>
        <input className="lt-cell-input" type="number" value={dynItem?.ceilingPrices?.[s.id] || ""} onChange={e => onUpdate({ ceilingPrices: { ...(dynItem?.ceilingPrices || {}), [s.id]: e.target.value } })} placeholder="0.00" />
      </div>
    ))}
  </div>
);

/* ── Price Adjustments — module-level components ── */
const PA_PRESETS    = ["Payment terms", "Warranty", "Incoterms", "Quality", "Delivery time"];
const PA_SUP_COLORS = ["#E9F5FF", "#FDFFD2", "#F3F2FF", "#FFF5EB", "#DDFBEE", "#FDE8E8"];


const SecLots = ({ auction, update }) => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [advOpen, setAdvOpen] = useState(true);
  const [hcDropOpen, setHcDropOpen] = useState(false);
  const lots = auction.lots;
  const idx = Math.min(activeIdx, lots.length - 1);
  const lot = lots[idx];
  const isDynamic = auction.type === "dynamic";
  const cur = auction.currency || "EUR";

  const updLot = (ch) => {
    const merged = { ...lots[idx], ...ch };
    if (isDynamic && merged.lineItems?.length > 1) merged.lineItems = merged.lineItems.slice(0, 1);
    update({ lots: lots.map((l, i) => i === idx ? merged : l) });
  };
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

  const addItem = () => updLot({ lineItems: [...lot.lineItems, { id: Date.now(), name: "", unit: "", quantity: 1, prices: {} }] });
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
      <span style={{ fontSize: 12, fontWeight: 600, color: C.t2, textTransform: "uppercase", letterSpacing: "0.1em" }}>{text}</span>
    </div>
  );

  const LOT_COLORS = ["#FDFFD2","#E9F5FF","#F3F2FF","#FFF5EB","#DDFBEE","#FDE8E8"];

  return (
    <Sec id="lots" title="Lots & Items" sub="Define what you are buying and assign suppliers.">

      {/* ── Tabs ── */}
      <div style={{ display: "flex", alignItems: "center", gap: 16, borderBottom: `1px solid ${C.divider}`, width: "100%" }}>
        {/* Tabs group */}
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          {lots.map((l, i) => {
            const active = idx === i;
            const tabColor = LOT_COLORS[i % LOT_COLORS.length];
            return (
              <div key={l.id}>
                <button onClick={() => setActiveIdx(i)}
                  style={{
                    height: 36,
                    padding: "8px 20px",
                    borderTop: `1px solid ${C.divider}`,
                    borderLeft: `1px solid ${C.divider}`,
                    borderRight: `1px solid ${C.divider}`,
                    borderBottom: "none",
                    borderRadius: "4px 4px 0 0",
                    cursor: "pointer",
                    fontSize: 14,
                    fontWeight: active ? 600 : 400,
                    fontFamily: "Poppins,sans-serif",
                    background: tabColor,
                    color: C.t1,
                    transition: "all .15s",
                  }}>
                  {l.name || `Lot ${i + 1}`}
                </button>
              </div>
            );
          })}
        </div>
        {/* Add lot button */}
        <button onClick={addLot} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", alignSelf: "center", gap: 8, padding: "4px 0", fontFamily: "Poppins,sans-serif", fontSize: 14, fontWeight: 400, color: C.t1 }}>
          <IcoPlusCircle color={C.green} size={20} /> Add lot
        </button>
      </div>

      {/* ── Card ── */}
      <div style={{ background: C.surface, border: `1px solid ${C.divider}`, borderRadius: "0 4px 4px 4px", padding: "20px 20px 0" }}>

        {/* LOT SETTINGS */}
        <div style={{ display: "flex", alignItems: "center", marginBottom: 14 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, flex: 1 }}>
            <IcoSettings />
            <span style={{ fontSize: 12, fontWeight: 600, color: C.t2, textTransform: "uppercase", letterSpacing: "0.1em" }}>Lot Settings</span>
          </div>
          <button
            onClick={() => removeLot(idx)}
            disabled={lots.length === 1}
            style={{
              background: "none", border: "none", display: "flex", alignItems: "center", padding: 4, borderRadius: 4,
              cursor: lots.length === 1 ? "not-allowed" : "pointer",
              pointerEvents: lots.length === 1 ? "none" : undefined,
              color: lots.length === 1 ? C.disabled : C.t2,
            }}>
            <IcoTrash size={16} color={lots.length === 1 ? C.disabled : C.t2} />
          </button>
        </div>

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
              <Field label={<span style={{ display: "flex", alignItems: "center", gap: 5 }}>{auction.dynamicFormat === "japanese" ? "Round Decrement*" : "Round Increment*"} <IcoInfo /></span>}>
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
            <span style={{ fontSize: 12, fontWeight: 600, color: C.t2, textTransform: "uppercase", letterSpacing: "0.1em", flex: 1 }}>Advanced Settings</span>
            <div style={{ transform: advOpen ? "rotate(180deg)" : "none", transition: "transform .2s" }}>
              <IcoChevDown size={13} color={C.t3} />
            </div>
          </button>
          {/* Content */}
          {advOpen && (
            <div className="fade" style={{ padding: "0 20px 20px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
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
            </div>
          )}
        </div>

        {/* ── Preferred Suppliers timing (dynamic only, when enabled) ── */}
        {isDynamic && lot.dynPreferredEnabled && auction.suppliers.length > 0 && (
          <div className="fade" style={{ borderTop: `1px solid ${C.divider}`, margin: "0 -20px", padding: "16px 20px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
              <IcoSuppliers />
              <span style={{ fontSize: 12, fontWeight: 600, color: C.t2, textTransform: "uppercase", letterSpacing: "0.1em" }}>Preferred Suppliers — Available from</span>
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
            <div style={{ fontSize: 14, color: C.t2, paddingBottom: 4 }}>Add suppliers in the Suppliers section first.</div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
              {auction.suppliers.map(s => {
                const req = lot.requiredSuppliers.includes(s.id);
                return (
                  <label key={s.id} style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
                    <div onClick={() => updLot({ requiredSuppliers: req ? lot.requiredSuppliers.filter(id => id !== s.id) : [...lot.requiredSuppliers, s.id] })}
                      style={{ width: 20, height: 20, borderRadius: 4, border: `1px solid ${req ? C.t1 : C.divider}`, background: req ? C.t1 : C.surface, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, cursor: "pointer", transition: "all .15s" }}>
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
        {(() => {
          const colSuppliers = auction.suppliers.filter(s => lot.requiredSuppliers.includes(s.id));
          return (
            <div style={{ borderTop: `1px solid ${C.divider}`, margin: "0 -20px", padding: "14px 20px 20px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                <IcoLines />
                <span style={{ fontSize: 12, fontWeight: 600, color: C.t2, textTransform: "uppercase", letterSpacing: "0.1em" }}>Line Items</span>
                {!isDynamic && lot.lineItems.length > 1 && (
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginLeft: "auto" }}>
                    <span style={{ fontSize: 12, fontWeight: 400, color: "#787878", fontFamily: "Poppins,sans-serif" }}>Show ranking</span>
                    <div
                      onClick={() => updLot({ showRanking: !lot.showRanking })}
                      style={{ width: 32, height: 18, borderRadius: 9, background: lot.showRanking ? "#1D1D1B" : "#E9EAEC", cursor: "pointer", position: "relative", transition: "background 0.2s", flexShrink: 0 }}
                    >
                      <div style={{ position: "absolute", top: 2, left: lot.showRanking ? 16 : 2, width: 14, height: 14, borderRadius: "50%", background: "#fff", transition: "left 0.2s" }} />
                    </div>
                  </div>
                )}
              </div>

              {isDynamic ? (
                <div className="lt-wrap">
                  <LtHead colSuppliers={colSuppliers} showDel={false} />
                  <LtDynRow dynItem={lot.dynItem} colSuppliers={colSuppliers} onUpdate={p => updLot({ dynItem: { ...lot.dynItem, ...p } })} />
                </div>
              ) : (
                <div>
                  <div className="lt-wrap">
                    <LtHead colSuppliers={colSuppliers} showDel={lot.lineItems.length > 1} />
                    {lot.lineItems.map(li => (
                      <LtItemRow key={li.id} item={li} colSuppliers={colSuppliers} onUpdate={updItem} onDelete={() => delItem(li.id)} />
                    ))}
                  </div>
                  {!isDynamic && (
                    <button onClick={addItem} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 6, marginTop: 8, fontFamily: "Poppins,sans-serif", fontSize: 13, fontWeight: 400, color: C.t1, padding: "4px 0" }}>
                      <IcoPlusCircle size={14} color={C.green} /> Add item
                    </button>
                  )}
                </div>
              )}
            </div>
          );
        })()}

        {/* ── Handicaps ── */}
        {!isDynamic && (() => {
          const pa = lot.priceAdjustments || { enabled: false, fixedHandicap: { added: false, collapsed: false, rules: [] }, dynamicHandicap: { added: false, collapsed: false, factors: [] } };
          const fh = pa.fixedHandicap || { added: false, collapsed: false, rules: [] };
          const dh = pa.dynamicHandicap || { added: false, collapsed: false, factors: [] };
          const colSuppliers = auction.suppliers.filter(s => lot.requiredSuppliers.includes(s.id));
          const bothAdded = fh.added && dh.added;
          const updPA = (patch) => updLot({ priceAdjustments: { ...pa, ...patch } });
          const updFH = (patch) => updPA({ fixedHandicap: { ...fh, ...patch } });
          const updDH = (patch) => updPA({ dynamicHandicap: { ...dh, ...patch } });
          return (
            <div style={{ borderTop: `1px solid ${C.divider}`, margin: "0 -20px", padding: "14px 20px 20px" }}>
              {/* Header row: ⚖ HANDICAPS | toggle Price Adjustments | + Add handicap */}
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <IcoScale />
                  <span style={{ fontSize: 12, fontWeight: 600, color: C.t2, textTransform: "uppercase", letterSpacing: "0.1em" }}>Handicaps</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginLeft: 8 }}>
                  <button className={`toggle ${pa.enabled ? "on" : ""}`} onClick={() => updPA({ enabled: !pa.enabled })} />
                  <span style={{ fontSize: 13, color: C.t2 }}>Price Adjustments</span>
                </div>
                <div style={{ marginLeft: "auto" }}>
                  {pa.enabled && !bothAdded && (
                    <div style={{ position: "relative" }}>
                      {hcDropOpen && <div onClick={() => setHcDropOpen(false)} style={{ position: "fixed", inset: 0, zIndex: 9 }} />}
                      <button
                        onClick={() => setHcDropOpen(o => !o)}
                        style={{ display: "flex", alignItems: "center", gap: 5, background: "none", border: "1px solid #E9EAEC", borderRadius: 6, padding: "5px 10px", fontSize: 12, fontFamily: "Poppins,sans-serif", cursor: "pointer", color: C.t1, position: "relative", zIndex: 10 }}>
                        <IcoPlus size={12} /> Add handicap <IcoChevDown size={11} />
                      </button>
                      {hcDropOpen && (
                        <div style={{ position: "absolute", top: "calc(100% + 4px)", right: 0, background: "#fff", border: "1px solid #E9EAEC", borderRadius: 6, boxShadow: "0 4px 12px rgba(0,0,0,0.08)", zIndex: 20, minWidth: 170, overflow: "hidden" }}>
                          {!fh.added && (
                            <button
                              onClick={() => { updFH({ added: true }); setHcDropOpen(false); }}
                              style={{ display: "block", width: "100%", padding: "9px 14px", background: "none", border: "none", textAlign: "left", fontSize: 13, fontFamily: "Poppins,sans-serif", cursor: "pointer", color: C.t1 }}>
                              Fixed handicap
                            </button>
                          )}
                          {!dh.added && (
                            <button
                              onClick={() => { updDH({ added: true }); setHcDropOpen(false); }}
                              style={{ display: "block", width: "100%", padding: "9px 14px", background: "none", border: "none", borderTop: fh.added ? "none" : "1px solid #F0F0F0", textAlign: "left", fontSize: 13, fontFamily: "Poppins,sans-serif", cursor: "pointer", color: C.t1 }}>
                              Dynamic handicap
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                  {!pa.enabled && (
                    <button disabled style={{ display: "flex", alignItems: "center", gap: 5, background: "none", border: "1px solid #E9EAEC", borderRadius: 6, padding: "5px 10px", fontSize: 12, fontFamily: "Poppins,sans-serif", cursor: "not-allowed", color: C.disabled }}>
                      <IcoPlus size={12} /> Add handicap <IcoChevDown size={11} />
                    </button>
                  )}
                </div>
              </div>
              {/* Body */}
              {!pa.enabled && (
                <div style={{ marginTop: 10, color: C.t3, fontSize: 13 }}>Enable Price Adjustments to configure fixed or dynamic handicaps.</div>
              )}
              {pa.enabled && !fh.added && !dh.added && (
                <div style={{ marginTop: 10, color: "#AEB0B2", fontSize: 13 }}>No handicaps added. Use "+ Add handicap" to configure fixed or dynamic adjustments.</div>
              )}
              {pa.enabled && fh.added && (
                <HcFixedSection
                  fh={fh}
                  suppliers={colSuppliers}
                  lineItems={lot.lineItems || []}
                  onUpdate={(patch) => updFH(patch)}
                  onRemove={() => {
                    if (window.confirm("Remove Fixed handicap? All rules will be lost.")) updFH({ added: false, collapsed: false, rules: [] });
                  }}
                />
              )}
              {pa.enabled && dh.added && (
                <HcDynamicSection
                  dh={dh}
                  suppliers={colSuppliers}
                  onUpdate={(patch) => updDH(patch)}
                  onRemove={() => {
                    if (window.confirm("Remove Dynamic handicap? All factors will be lost.")) updDH({ added: false, collapsed: false, factors: [] });
                  }}
                />
              )}
              {pa.enabled && (fh.added || dh.added) && (
                <HcPreview lot={lot} colSuppliers={colSuppliers} pa={pa} />
              )}
            </div>
          );
        })()}

      </div>
    </Sec>
  );
};

/* ── SecReview ───────────────────────────────────────────────────────────── */
const ReviewLotTable = ({ lot, lotIndex, auction, defaultOpen }) => {
  const [open, setOpen] = React.useState(defaultOpen);
  const isDynamic = auction.type === "dynamic";
  const cur = auction.currency || "USD";
  const fmt = n => Number(n || 0).toLocaleString();

  // suppliers assigned to this lot
  const lotSuppliers = auction.suppliers.filter(s => lot.requiredSuppliers?.includes(s.id));

  // items to display
  const items = isDynamic
    ? (lot.dynItem?.name ? [lot.dynItem] : [])
    : (lot.lineItems || []).filter(li => li.name?.trim());

  const hasItems = items.length > 0;

  const supTotal = (s) => items.reduce((sum, li) => {
    const price = isDynamic
      ? Number(li.ceilingPrices?.[s.id] || 0)
      : Number(li.prices?.[s.id] || 0);
    return sum + price * Number(li.quantity || 0);
  }, 0);

  return (
    <div style={{ marginBottom: 16, borderBottom: `1px solid ${C.divider}`, paddingBottom: 16 }}>
      {/* Lot header */}
      <div onClick={() => setOpen(v => !v)}
        style={{ display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer", padding: "4px 0" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke={C.t2} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
            style={{ transform: open ? "rotate(0deg)" : "rotate(-90deg)", transition: "transform .15s", flexShrink: 0 }}>
            <polyline points="6 9 12 15 18 9"/>
          </svg>
          <span style={{ fontSize: 14, fontWeight: 600, color: C.t1 }}>{lot.name || `Lot ${lotIndex + 1}`}</span>
          <span style={{ fontSize: 12, color: C.t2 }}>· Lot {lotIndex + 1}</span>
        </div>
        <span style={{ fontSize: 12, fontWeight: 400, color: C.t2 }}>
          Baseline: {cur} {lot.baselinePrice ? fmt(lot.baselinePrice) : "—"}
        </span>
      </div>

      {/* Expandable table */}
      {open && hasItems && (
        <div style={{ marginTop: 8, border: `1px solid ${C.divider}`, borderRadius: 6, overflow: "hidden" }}>
          {/* Header */}
          <div style={{ display: "flex", background: "#F8F8F8", padding: "8px 16px", gap: 8 }}>
            <span style={{ flex: 2, fontSize: 11, fontWeight: 600, color: "#787878", textTransform: "uppercase", letterSpacing: "0.06em" }}>Item Name</span>
            <span style={{ flex: 1, fontSize: 11, fontWeight: 600, color: "#787878", textTransform: "uppercase", letterSpacing: "0.06em" }}>Qty</span>
            {lotSuppliers.map(s => (
              <span key={s.id} style={{ flex: 1.5, fontSize: 11, fontWeight: 600, color: "#787878", textTransform: "uppercase", letterSpacing: "0.06em" }}>{s.name}</span>
            ))}
          </div>
          {/* Item rows */}
          {items.map((li, i) => (
            <div key={li.id || i} style={{ display: "flex", padding: "8px 16px", gap: 8, borderTop: `1px solid #F0F0F0`, background: "#fff" }}>
              <span style={{ flex: 2, fontSize: 13, fontWeight: 500, color: C.t1 }}>{li.name || "—"}</span>
              <span style={{ flex: 1, fontSize: 13, fontWeight: 500, color: C.t1 }}>{li.quantity || "—"}</span>
              {lotSuppliers.map(s => {
                const price = isDynamic ? Number(li.ceilingPrices?.[s.id] || 0) : Number(li.prices?.[s.id] || 0);
                return (
                  <span key={s.id} style={{ flex: 1.5, fontSize: 13, fontWeight: 500, color: C.t1 }}>
                    {price ? `${fmt(price)} ${cur}` : "—"}
                  </span>
                );
              })}
            </div>
          ))}
          {/* Total row */}
          {lotSuppliers.length > 0 && (
            <div style={{ display: "flex", padding: "10px 16px", gap: 8, background: "#F8F8F8", borderTop: `1px solid ${C.divider}` }}>
              <span style={{ flex: 2, fontSize: 13, fontWeight: 600, color: C.t1, textTransform: "uppercase", letterSpacing: "0.04em" }}>Total</span>
              <span style={{ flex: 1 }} />
              {lotSuppliers.map(s => (
                <span key={s.id} style={{ flex: 1.5, fontSize: 13, fontWeight: 600, color: C.t1 }}>
                  {fmt(supTotal(s))} {cur}
                </span>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

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
      <div style={{ fontSize: 12, color: C.t2, marginBottom: 4 }}>{label}</div>
      <div style={{ fontSize: 14, fontWeight: 500, color: C.t1 }}>{value || <span style={{ color: C.t3 }}>—</span>}</div>
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
          <div style={{ fontSize: 14, color: C.t2 }}>No suppliers added.</div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px 24px" }}>
            {auction.suppliers.map(s => <div key={s.id} style={{ fontSize: 14, fontWeight: 500, color: C.t1 }}>{s.name}</div>)}
          </div>
        )}

        <Divider my={20} />

        {/* ── Lots ── */}
        <div style={{ fontSize: 16, fontWeight: 700, color: C.t1, marginBottom: 16 }}>Lots</div>
        {auction.lots.map((l, i) => (
          <ReviewLotTable key={l.id} lot={l} lotIndex={i} auction={auction} defaultOpen={i === 0} />
        ))}

      </Card>

      <div style={{ marginTop: 24, textAlign: "center", fontSize: 13, fontWeight: 400, color: "#787878", fontFamily: "Poppins,sans-serif" }}>
        Ready to go? Click «Review &amp; Launch» above to publish.
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
            <span style={{ fontSize: 12, fontWeight: 500, color: "#007C4A" }}>94% confidence</span>
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
          <div style={{ fontSize: 14, color: C.t2, lineHeight: 1.7, marginBottom: 10 }}>
            Manually configure auction type, bidding mode, schedule, lots and pricing from scratch.
          </div>
          <span style={{ fontSize: 14, color: "#007C4A", fontWeight: 500, cursor: "pointer" }}>Run Decision Tree instead →</span>
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
            <div style={{ fontSize: 12, fontWeight: 600, color: C.t2, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>Step 1</div>
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
                  style={{ background: C.surface, borderRadius: 6, padding: 20, border: `1px solid ${isSel ? C.green : hovered === card.id ? "#bbb" : C.divider}`, cursor: "pointer", position: "relative", boxShadow: "none", transition: "all .2s", opacity: selected && !isSel ? 0.5 : 1 }}>
                  {isSel && (
                    <div style={{ position: "absolute", top: 16, right: 16, width: 22, height: 22, borderRadius: "50%", background: C.green, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <IcoCheck size={12} />
                    </div>
                  )}
                  <div style={{ display: "flex", gap: 12, marginBottom: 16, alignItems: "flex-start" }}>
                    <div style={{ width: 40, height: 40, borderRadius: 6, background: card.iconBg, border: `1px solid ${C.divider}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{card.icon}</div>
                    <div>
                      <div style={{ fontSize: 16, fontWeight: 600, color: C.t1, marginBottom: 3, lineHeight: 1.3 }}>{card.title}</div>
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

  const isFormValid = useMemo(() => {
    const a = auction;
    // Architecture
    if (!a.type) return false;
    if (a.type === "simple"  && !a.biddingMode)   return false;
    if (a.type === "dynamic" && !a.dynamicFormat) return false;
    // Setup — name & owner
    if (!a.name?.trim()) return false;
    if (!a.owner)        return false;
    // Dates — conditional per type:
    // Sealed bid: start is auto → only endTime required
    // English live: end is auto → only startTime required
    // Multi-round dynamic: end is auto → only startTime required
    const isSealed     = a.type === "simple"  && a.biddingMode === "sealed";
    const isEnglish    = a.type === "simple"  && a.biddingMode === "english";
    const isMultiRound = a.type === "dynamic";
    if (isSealed                      && !a.endTime)   return false;
    if ((isEnglish || isMultiRound)   && !a.startTime) return false;
    // Suppliers
    if (a.suppliers.length === 0) return false;
    // Lots
    if (a.lots.length === 0) return false;
    for (const lot of a.lots) {
      if (parseFloat(lot.baselinePrice) <= 0 || !lot.baselinePrice) return false;
      // For dynamic: dynItem name; for simple: at least one named lineItem
      const hasNamedItem = isMultiRound
        ? !!lot.dynItem?.name?.trim()
        : (lot.lineItems || []).some(li => li?.name?.trim());
      if (!hasNamedItem) return false;
    }
    return true;
  }, [auction]);

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

      <DarkSidebar />

      {/* Sections nav — sticky */}
      <SectionsNav activeId={activeId} auction={auction} onGate={() => setPhase("gate")} />

      {/* Main area */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0, overflow: "hidden" }}>

        {/* Top navbar */}
        <div style={{ height: 64, minHeight: 64, background: C.surface, borderBottom: `1px solid ${C.divider}`, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 24px", flexShrink: 0 }}>
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, color: C.t1 }}>{auction.name || "New eAuction"}</div>
            <div style={{ fontSize: 12, color: C.t2 }}>{auctionLabel}</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <button className="btn btn-secondary" style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <IcoSave size={14} /> Save draft
            </button>
            <button className="btn btn-primary"
              disabled={!isFormValid}
              title={!isFormValid ? "Please complete all required fields before launching" : undefined}
              onClick={() => { const el = document.getElementById("sec-review"); if (el) el.scrollIntoView({ behavior: "smooth" }); }}
              style={{ display: "flex", alignItems: "center", gap: 5, opacity: isFormValid ? 1 : 0.4, cursor: isFormValid ? "pointer" : "not-allowed", pointerEvents: isFormValid ? "auto" : "none" }}>
              <IcoRocket size={14} color="#fff" /> Review & Launch
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
          <div style={{ width: 200, flexShrink: 0, borderLeft: `1px solid ${C.divider}`, padding: "24px 16px", overflowY: "auto", background: C.surface }}>
            <RightSummary auction={auction} />
          </div>
        </div>
      </div>

      {launched && <LaunchModal auction={auction} onClose={() => setLaunched(false)} />}
    </div>
  );
}


