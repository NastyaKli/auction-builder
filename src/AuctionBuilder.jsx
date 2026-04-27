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
    .bg-green  { background:${C.greenLight}; color:${C.green800}; }
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

    .lt-wrap { overflow: hidden; }
    .lt-head { display: flex; align-items: center; background: #F8F8F8; padding: 10px 16px; gap: 8px; }
    .lt-head span { font-size: 11px; font-weight: 600; color: #787878; text-transform: uppercase; letter-spacing: 0.06em; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
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
    .sel-card.active { border-color:${C.t1}; background:#F7F7F6; }

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
  <div style={{ background: C.yellow, border: `1px solid ${C.yellowT}`, borderRadius: 4, padding: "10px 12px", display: "flex", gap: 8, fontSize: 14, color: C.yellowT, alignItems: "flex-start" }}>
    <IcoWarn size={13} />{children}
  </div>
);

const Err = ({ children }) => (
  <div style={{ background: C.red, border: `1px solid ${C.red100}`, borderRadius: 4, padding: "10px 12px", display: "flex", gap: 8, fontSize: 14, color: C.redT, alignItems: "flex-start" }}>
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
  lotUnit: "", lotQty: "", lotUnitPrice: "",
  overtime: true, overtimeMin: "1 min", preBid: true,
  showRank: false, rankVisibility: "All Rank",
  handicapEnabled: false, handicapRules: {},
  showRanking: false,
  priceAdjustments: {
    enabled: false,
    scope: "supplier", // "supplier" | "lineItem"
    valueType: "percentage", // "percentage" | "fixed"
    showToSuppliers: false,
    transformations: {}, // { [supplierId]: { direction: "+" | "-", value: "" } }
    lineItemTransformations: {}, // { [supplierId]: { [lineItemId]: { direction, value } } }
  },
  requiredSuppliers: [], lineItems: [{ id: Date.now(), name: "", unit: "", quantity: 1, prices: {}, rank: 1 }],
  awardingMode: "lowest", /* "lowest" | "split" */
  volumeSplit: {}, /* { [supplierId]: percentage } */
  termsOverride: false,
  commercialTerms: "", generalTerms: "",
  lotFiles: [], /* [{ id, name, size, type }] */
  /* Dynamic-specific */
  dynStartingPrice: "", dynEndingPrice: "", dynRoundIncrement: "", dynRoundDuration: "",
  dynPreBid: false, dynShowRank: false, dynRankVisibility: "All Rank",
  dynPreferredEnabled: false, dynPreferredTimes: {},
  /* Dynamic single line item */
  dynItem: { name: "", unit: "", quantity: "", ceilingPrices: {} },
});

const CURRENT_USER = { name: "Mykyta Voytenko", email: "mykyta@crown.ovh" };

const INIT = {
  creationMode: null, type: null, biddingMode: null, dynamicFormat: null,
  name: "", owner: CURRENT_USER.name, startTime: "", endTime: "",
  usage: "", currency: "USD", timezone: "UTC", decimals: "0",
  /* Architecture toggles */
  archPreBid: false, archRankVisible: false, archRankMode: "All Rank",
  archOvertime: false, archOvertimeMin: "2 min",
  archPriceAdjustments: false, archPreferred: false,
  archPriceDirection: "dutch", /* "dutch" | "japanese" — only for multi-round */
  suppliers: [], lots: [mkLot(1)], documents: [],
  /* Global default terms (apply to all lots unless overridden) */
  defaultCommercialTerms: "", defaultGeneralTerms: "",
};

/* ── Template storage ────────────────────────────────────────────────────── */
const TEMPLATES_KEY = "crown_auction_templates";

const loadTemplates = () => {
  try { return JSON.parse(localStorage.getItem(TEMPLATES_KEY) || "[]"); } catch { return []; }
};
const saveTemplates = (tpls) => {
  try { localStorage.setItem(TEMPLATES_KEY, JSON.stringify(tpls)); } catch {}
};
const deleteTemplate = (id) => saveTemplates(loadTemplates().filter(t => t.id !== id));

const SYSTEM_TEMPLATES = [
  {
    id: "sys-english-it",
    name: "IT Hardware Procurement",
    category: "system",
    auctionType: "English Auction",
    typeBg: "#EBFFF7", typeBorder: "#A8F0D8", typeColor: "#1B7A4A",
    lots: 2, description: "Reverse English auction for hardware goods with rank visibility",
    auction: { ...INIT, type:"simple", biddingMode:"english", archRankVisible:true, archRankMode:"All Rank",
      lots:[mkLot(1),mkLot(2)] }
  },
  {
    id: "sys-sealed-consulting",
    name: "Consulting Services RFQ",
    category: "system",
    auctionType: "Sealed Bid",
    typeBg: "#E9F5FF", typeBorder: "#B8DCFA", typeColor: "#1A5080",
    lots: 1, description: "One-round sealed bid for professional services",
    auction: { ...INIT, type:"simple", biddingMode:"sealed", lots:[mkLot(1)] }
  },
  {
    id: "sys-dutch-goods",
    name: "Goods Procurement",
    category: "system",
    auctionType: "Dutch Auction",
    typeBg: "#F3F2FF", typeBorder: "#C9C7FF", typeColor: "#3D3A90",
    lots: 3, description: "Multi-round Dutch auction for goods with price adjustments",
    auction: { ...INIT, type:"dynamic", dynamicFormat:"dutch", archPriceAdjustments:true, archPriceDirection:"dutch",
      lots:[mkLot(1),mkLot(2),mkLot(3)] }
  },
];

/* ── Extra icons ─────────────────────────────────────────────────────────── */
const IcoPencil = ({ size = 14 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={C.t2} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>;
const IcoChevDown = ({ size = 13, color = C.t2 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, transition: "transform .2s" }}><polyline points="6 9 12 15 18 9"/></svg>;

/* ── Section definitions ─────────────────────────────────────────────────── */
const SECTIONS = [
  { id: "arch",      label: "Architecture",    sub: "Type & bidding mode",   isDone: (a) => !!a.type },
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
          <div style={{ fontFamily: "Poppins, sans-serif", fontWeight: 400, fontSize: 12, color: C.t2, lineHeight: 1 }}>Procurement</div>
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
            <div style={{ fontSize: 14, fontWeight: 600, color: row.green ? C.green800 : C.t1, paddingLeft: 19 }}>{row.value}</div>
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
          <select value={auction.decimals ?? "0"} onChange={e => update({ decimals: e.target.value })}>
            {["0","1","2","3","4"].map(d => <option key={d} value={d}>{d} decimal{d !== "1" ? "s" : ""}</option>)}
          </select>
        </Field>
      </div>
      {errors.endTime === "order" && <div style={{ marginTop: 12 }}><Warn>End time must be after start time.</Warn></div>}
    </Card>
  </Sec>
  );
};

/* ── SecArchitecture ─────────────────────────────────────────────────────── */

/* Info modal content for each architecture setting */
const ARCH_INFO = {
  priceDirection: {
    title: "Price Direction",
    body: `Determines how the price moves across rounds in a multi-round auction.\n\n` +
      `Dutch (Increases): The buyer sets a low starting price that increases each round. Suppliers compete to accept the price before it rises too high. Creates urgency — the longer you wait, the more expensive it gets.\n\n` +
      `Japanese (Decreases): The buyer sets a high starting price that decreases each round. Suppliers drop out when the price falls below their minimum. The last supplier standing wins.\n\n` +
      `Impact: Directly determines the auction format (Dutch or Japanese) and how round prices are calculated.`,
    schema: "Round 1 → Round 2 → Round 3 → ... → Final Round\n  Dutch:    $100 → $110 → $120 → ... → $150 ↑\n  Japanese: $150 → $140 → $130 → ... → $100 ↓",
  },
  preBid: {
    title: "Pre-bid Phase",
    body: `Enables a preliminary bidding period before the main auction begins.\n\n` +
      `When enabled, suppliers can submit their initial price offers before the live auction starts. This gives the buyer early visibility into the expected price range and helps set realistic auction parameters.\n\n` +
      `The deadline field sets when pre-bids must be submitted. Suppliers who miss the deadline cannot participate in the pre-bid phase but can still join the main auction.\n\n` +
      `Impact: Turns a Sealed Bid into an English Auction (when combined with ranking). Provides price discovery before the competitive phase.`,
    schema: "Timeline:\n  ┌─── Pre-bid Phase ───┐┌─── Main Auction ───┐\n  │ Suppliers submit     ││ Live competitive    │\n  │ initial offers       ││ bidding begins      │\n  └──────────────────────┘└─────────────────────┘\n           ▲ Deadline",
  },
  ranking: {
    title: "Supplier Ranking",
    body: `Controls whether suppliers can see their competitive position during the auction.\n\n` +
      `When enabled, suppliers see how their bid compares to others — either their exact rank, best rank only, or top N positions. This drives more competitive bidding as suppliers know where they stand.\n\n` +
      `When disabled, suppliers bid blindly without knowing their relative position. This creates a sealed-bid dynamic where each supplier submits their best possible offer independently.\n\n` +
      `Rank modes:\n• All Rank — every supplier sees their exact position\n• Best Rank — suppliers only see if they are #1\n• Top 3 / Top 5 — suppliers see if they are in the top group\n• No Rank — ranking is enabled but positions are hidden\n\n` +
      `Impact: Combined with Pre-bid, determines whether this is an English (visible) or Sealed Bid (hidden) auction.`,
    schema: "Visible ranking:          Hidden ranking:\n  #1  Supplier A  $95     Supplier A  $95  ???\n  #2  Supplier B  $98     Supplier B  $98  ???\n  #3  Supplier C  $102    Supplier C  $102 ???\n  → Drives competition    → Drives best-first-offer",
  },
  priceAdjustments: {
    title: "Price Adjustments (Handicaps)",
    body: `Apply percentage or fixed bonuses/penalties to individual supplier bids.\n\n` +
      `Handicaps let the buyer level the playing field by adjusting supplier prices based on non-price factors like quality, reliability, location, or strategic preference.\n\n` +
      `A bonus (negative adjustment) reduces a supplier's effective price, making them more competitive. A penalty (positive adjustment) increases it.\n\n` +
      `Example: Supplier A has 5% better quality → apply -5% bonus → their $100 bid is evaluated as $95.\n\n` +
      `Impact: When enabled, the Lots section shows a Handicaps configuration panel where you set per-supplier adjustments and see a Price Grid preview.`,
    schema: "Supplier bid: $100\n  Bonus  -5%  → Evaluated: $95   (more competitive)\n  Penalty +3% → Evaluated: $103  (less competitive)\n  No adjustment → Evaluated: $100",
  },
  preferred: {
    title: "Preferred Suppliers",
    body: `Give selected suppliers a timing advantage in multi-round auctions.\n\n` +
      `Preferred suppliers can enter the auction at a different time than regular suppliers, typically getting early access to establish their position before others join.\n\n` +
      `This is useful when you want to give strategic partners or incumbent suppliers a competitive edge while still maintaining an open competitive process.\n\n` +
      `Impact: When enabled, the Lots section shows timing controls per supplier. The auction type becomes "Preferred Dutch" or "Preferred Japanese".`,
    schema: "Round timeline:\n  ┌─── Preferred Only ──┐┌─── All Suppliers ───┐\n  │ Selected suppliers   ││ Everyone competes   │\n  │ bid first            ││ together            │\n  └──────────────────────┘└─────────────────────┘",
  },
};

const ArchInfoModal = ({ info, onClose }) => (
  <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(29,29,27,.45)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 9999 }}>
    <div onClick={e => e.stopPropagation()} className="card fade" style={{ padding: 28, maxWidth: 520, width: "90%", maxHeight: "80vh", overflowY: "auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <div style={{ fontSize: 16, fontWeight: 700, color: C.t1 }}>{info.title}</div>
        <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}><IcoX size={16} /></button>
      </div>
      <div style={{ fontSize: 13, color: C.t1, lineHeight: 1.7, whiteSpace: "pre-wrap", marginBottom: info.schema ? 16 : 0 }}>{info.body}</div>
      {info.schema && (
        <div style={{ background: C.grey50, border: `1px solid ${C.divider}`, borderRadius: 6, padding: 14, fontFamily: "monospace", fontSize: 12, color: C.t2, lineHeight: 1.6, whiteSpace: "pre", overflowX: "auto" }}>
          {info.schema}
        </div>
      )}
    </div>
  </div>
);

const IcoInfo = ({ size = 14, onClick }) => (
  <svg onClick={onClick} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={C.t3} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"
    style={{ flexShrink: 0, cursor: "pointer", transition: "color .15s" }}>
    <circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" />
  </svg>
);

const determineAuctionType = (auction) => {
  const { type, archPriceDirection, archPreBid, archRankVisible, archPriceAdjustments, archPreferred } = auction;
  if (!type) return null;

  const isMulti = type === "dynamic";
  const isSingle = type === "simple";

  let name = "";
  let family = "";
  let desc = "";
  const tags = [];

  if (isMulti) {
    const isJap = archPriceDirection === "japanese";
    name = isJap ? "Japanese Auction" : "Dutch Auction";
    if (archPreferred) name = `Preferred ${name}`;
    family = "Dynamic Multi-Round";
    desc = isJap
      ? "Price decreases gradually each round until a supplier accepts the offer."
      : "Price increases each round during competitive bidding.";
    if (archPreferred) tags.push("Preferred Suppliers");
  } else {
    /* Single round — English if pre-bid OR ranking is ON, otherwise Sealed */
    if (archPreBid || archRankVisible) {
      name = "English Auction";
      family = "Single Round — Live Bidding";
      desc = "Competitive live bidding where suppliers can see activity and outbid each other. Pre-bid and ranking create transparency.";
    } else {
      name = "Sealed Bid Auction";
      family = "Single Round — Sealed";
      desc = "Suppliers submit one blind bid without seeing competitors. No pre-bid phase, no ranking visibility. The best price wins.";
    }
  }

  if (archPreBid)           tags.push("Pre-bid Phase");
  if (archRankVisible)      tags.push(`Rank: ${auction.archRankMode}`);
  if (archPriceAdjustments) tags.push("Handicaps");

  /* Derive legacy fields */
  let biddingMode = null, dynamicFormat = null;
  if (isSingle) {
    biddingMode = (archPreBid || archRankVisible) ? "english" : "sealed";
  } else {
    dynamicFormat = archPriceDirection;
  }

  return { name, family, desc, tags, biddingMode, dynamicFormat };
};

const ArchToggleRow = ({ label, hint, on, onToggle, onInfo, children, inlineField, disabled }) => (
  <div style={{ opacity: disabled ? 0.4 : 1, pointerEvents: disabled ? "none" : "auto" }}>
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 0", gap: 24 }}>
      <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 8 }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ fontSize: 14, fontWeight: 500, color: C.t1 }}>{label}</span>
            {onInfo && <IcoInfo size={15} onClick={onInfo} />}
          </div>
          {hint && <div style={{ fontSize: 12, color: C.t2, marginTop: 2 }}>{hint}</div>}
        </div>
      </div>
      {on && inlineField && <div style={{ flexShrink: 0 }}>{inlineField}</div>}
      <div style={{ flexShrink: 0, marginLeft: 8 }}>
        <button className={`toggle ${on ? "on" : ""}`} onClick={onToggle} />
      </div>
    </div>
    {on && children && <div className="fade" style={{ paddingBottom: 8 }}>{children}</div>}
  </div>
);

const SecArchitecture = ({ auction, update }) => {
  const { type } = auction;
  const isMulti = type === "dynamic";
  const isSingle = type === "simple";
  const [infoModal, setInfoModal] = useState(null);

  const resolved = determineAuctionType(auction);

  const setType = (t) => {
    const base = { type: t };
    if (t === "simple") {
      base.dynamicFormat = null;
      base.archPreferred = false;
    }
    if (t === "dynamic") {
      base.biddingMode = null;
    }
    update(base);
  };

  /* Sync legacy fields whenever toggles change */
  React.useEffect(() => {
    if (!resolved) return;
    const sync = {};
    if (resolved.biddingMode !== auction.biddingMode) sync.biddingMode = resolved.biddingMode;
    if (resolved.dynamicFormat !== auction.dynamicFormat) sync.dynamicFormat = resolved.dynamicFormat;
    if (Object.keys(sync).length > 0) update(sync);
  }, [resolved?.biddingMode, resolved?.dynamicFormat]);

  return (
    <Sec id="arch" title="eAuction Architecture" sub="Configure the auction structure and rules.">
      {/* Info modal */}
      {infoModal && <ArchInfoModal info={infoModal} onClose={() => setInfoModal(null)} />}

      {/* ── Round Structure Selection ── */}
      <Card style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 12, fontWeight: 500, color: C.t2, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 12 }}>Round Structure</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          {[
            {
              id: "simple",
              label: "Single Round Auction",
              desc: "One round. Suppliers submit a single bid — sealed or live.",
              bestFor: ["First-time eAuctions", "Sensitive supplier relationships", "Complex specs requiring one clear bid"],
              avoid: "Avoid when strong price competition is expected",
            },
            {
              id: "dynamic",
              label: "Multi-Round Dynamic Auction",
              desc: "Multiple rounds with price movement. Japanese or Dutch format.",
              bestFor: ["High spend categories", "Commodities & standard services", "Maximum savings potential"],
              avoid: "Avoid for highly customized or single-source items",
            },
          ].map(opt => {
            const sel = type === opt.id;
            return (
              <div key={opt.id} onClick={() => setType(opt.id)}
                style={{ padding: 14, border: `1px solid ${sel ? C.t1 : C.divider}`, borderRadius: 6, cursor: "pointer", transition: "all .15s", background: sel ? "#F7F7F6" : C.surface }}>
                <div style={{ display: "flex", gap: 10, marginBottom: 10 }}>
                  <div style={{ marginTop: 2, width: 16, height: 16, borderRadius: "50%", border: `1px solid ${sel ? C.t1 : C.divider}`, background: sel ? C.t1 : C.surface, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    {sel && <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#fff" }} />}
                  </div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: C.t1, marginBottom: 3 }}>{opt.label}</div>
                    <div style={{ fontSize: 12, color: C.t2, lineHeight: 1.5 }}>{opt.desc}</div>
                  </div>
                </div>
                <div style={{ borderTop: `1px solid ${C.divider}`, paddingTop: 10, display: "flex", flexDirection: "column", gap: 6 }}>
                  <div>
                    <div style={{ fontSize: 10, fontWeight: 600, color: C.t3, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 4 }}>Best for</div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                      {opt.bestFor.map(t => (
                        <div key={t} style={{ display: "flex", alignItems: "flex-start", gap: 6 }}>
                          <div style={{ width: 4, height: 4, borderRadius: "50%", background: C.t3, marginTop: 5, flexShrink: 0 }} />
                          <span style={{ fontSize: 12, color: C.t2, lineHeight: 1.4 }}>{t}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 6, marginTop: 2 }}>
                    <div style={{ width: 4, height: 4, borderRadius: "50%", background: C.yellowT, marginTop: 5, flexShrink: 0 }} />
                    <span style={{ fontSize: 12, color: C.t3, lineHeight: 1.4, fontStyle: "italic" }}>{opt.avoid}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* ── Two-panel: Config + Preview ── */}
      {type && (
        <div className="fade" style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 16, alignItems: "start" }}>
          {/* LEFT — Configuration Toggles */}
          <Card>
            <div style={{ fontSize: 12, fontWeight: 500, color: C.t2, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 4 }}>Configuration</div>

            {/* Price Direction — only Multi-Round */}
            {isMulti && (
              <>
                <Divider my={8} />
                <div style={{ padding: "10px 0" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
                    <span style={{ fontSize: 14, fontWeight: 500, color: C.t1 }}>Price Direction</span>
                    <IcoInfo size={15} onClick={() => setInfoModal(ARCH_INFO.priceDirection)} />
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                    {[
                      { id: "dutch",    label: "Increases", icon: "↑", desc: "Dutch — price goes up" },
                      { id: "japanese", label: "Decreases", icon: "↓", desc: "Japanese — price goes down" },
                    ].map(d => {
                      const sel = auction.archPriceDirection === d.id;
                      return (
                        <div key={d.id} onClick={() => update({ archPriceDirection: d.id })}
                          style={{ padding: "10px 12px", border: `1px solid ${sel ? C.t1 : C.divider}`, borderRadius: 6, cursor: "pointer", background: sel ? "#F7F7F6" : C.surface, transition: "all .15s" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                            <span style={{ fontSize: 16 }}>{d.icon}</span>
                            <span style={{ fontSize: 13, fontWeight: 600, color: C.t1 }}>{d.label}</span>
                          </div>
                          <div style={{ fontSize: 12, color: C.t2, marginTop: 2 }}>{d.desc}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </>
            )}

            <Divider my={4} />

            {/* Pre-bid Phase */}
            <ArchToggleRow label="Pre-bid Phase" hint="Suppliers submit initial offers before the auction starts"
              on={auction.archPreBid} onToggle={() => update({ archPreBid: !auction.archPreBid })}
              onInfo={() => setInfoModal(ARCH_INFO.preBid)}
              inlineField={
                <div>
                  <div style={{ fontSize:12, fontWeight:400, color:"#1D1D1B", marginBottom:6 }}>Deadline</div>
                  <input type="datetime-local" value={auction.archPreBidDeadline || ""}
                    onChange={e => update({ archPreBidDeadline: e.target.value })}
                    style={{ fontSize:13, padding:"5px 8px", width:220 }} />
                </div>
              } />

            <Divider my={4} />

            {/* Supplier Ranking */}
            <ArchToggleRow label="Supplier Ranking" hint="Show competitive position to suppliers"
              on={auction.archRankVisible} onToggle={() => update({ archRankVisible: !auction.archRankVisible })}
              onInfo={() => setInfoModal(ARCH_INFO.ranking)}
              inlineField={
                <div>
                  <div style={{ fontSize:12, fontWeight:400, color:"#1D1D1B", marginBottom:6 }}>Rank mode</div>
                  <select value={auction.archRankMode} onChange={e => update({ archRankMode: e.target.value })}
                    style={{ width:220, fontSize:13 }}>
                    {RANK_OPTIONS.map(r => <option key={r}>{r}</option>)}
                  </select>
                </div>
              } />

            <Divider my={4} />

            {/* Price Adjustments / Handicaps */}
            <ArchToggleRow label="Price Adjustments" hint="Apply handicaps or bonuses per supplier"
              on={auction.archPriceAdjustments} onToggle={() => update({ archPriceAdjustments: !auction.archPriceAdjustments })}
              onInfo={() => setInfoModal(ARCH_INFO.priceAdjustments)} />

            {/* Preferred Suppliers — only Multi-Round */}
            {isMulti && (
              <>
                <Divider my={4} />
                <ArchToggleRow label="Preferred Suppliers" hint="Give selected suppliers early access timing"
                  on={auction.archPreferred} onToggle={() => update({ archPreferred: !auction.archPreferred })}
                  onInfo={() => setInfoModal(ARCH_INFO.preferred)} />
              </>
            )}
          </Card>

          {/* RIGHT — Preview Card */}
          {(() => {
            const n = resolved?.name || "";
            const isD = n.includes("Dutch"), isJ = n.includes("Japanese"), isS = n.includes("Sealed"), isE = n.includes("English");
            const cardBg = isD ? "#F3F2FF" : isJ ? "#FEFFEA" : isS ? "#E9F5FF" : isE ? "#EBFFF7" : C.grey50;
            const badgeBg = isD ? "#C9C7FF" : isJ ? "#DCF5A0" : isS ? "#B8DCFA" : isE ? "#A8F0D8" : C.grey100;
            const badgeColor = isD ? "#3D3A90" : isJ ? "#4A6010" : isS ? "#1A5080" : isE ? "#1B7A4A" : C.t2;
            return (
          <Card style={{ background: cardBg, border: `1px solid ${C.divider}`, position: "sticky", top: 80 }}>
            <div style={{ fontSize: 12, fontWeight: 500, color: C.t2, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 12 }}>Determined Auction Type</div>

            {resolved ? (
              <div>
                <div style={{ fontSize: 18, fontWeight: 700, color: C.t1, marginBottom: 4 }}>{resolved.name}</div>
                <div style={{ fontSize: 12, color: C.t2, marginBottom: 12 }}>{resolved.family}</div>

                {resolved.tags.length > 0 && (
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 14 }}>
                    {resolved.tags.map(tag => (
                      <span key={tag} style={{ fontSize: 12, fontWeight: 500, padding: "3px 10px", borderRadius: 4, background: badgeBg, color: badgeColor }}>{tag}</span>
                    ))}
                  </div>
                )}

                <div style={{ fontSize: 13, color: C.t2, lineHeight: 1.6, marginBottom: 16 }}>{resolved.desc}</div>

                <div style={{ fontSize: 12, fontWeight: 500, color: C.t2, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 8 }}>Key Characteristics</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  {[
                    isMulti ? "Multiple bidding rounds" : "Single bidding round",
                    isMulti ? (auction.archPriceDirection === "japanese" ? "Price decreases each round" : "Price increases each round") : ((auction.archPreBid || auction.archRankVisible) ? "Live competitive bidding" : "Blind sealed bids"),
                    auction.archPreBid ? "Pre-bid phase enabled" : "No pre-bid phase",
                    auction.archRankVisible ? "Rankings visible to suppliers" : "Rankings hidden",
                  ].filter(Boolean).map((c, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: C.t1 }}>
                      <div style={{ width: 4, height: 4, borderRadius: "50%", background: C.green, flexShrink: 0 }} />
                      {c}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div style={{ fontSize: 13, color: C.t3, fontStyle: "italic" }}>Select a round structure to see the determined auction type.</div>
            )}
          </Card>
            );
          })()}
        </div>
      )}
    </Sec>
  );
};

/* ── SecSuppliers ────────────────────────────────────────────────────────── */
const fmtDeadline = (dt) => {
  if (!dt) return null;
  const d = new Date(dt);
  if (isNaN(d)) return null;
  return d.toLocaleString("en-GB", { day:"2-digit", month:"short", year:"numeric", hour:"2-digit", minute:"2-digit" });
};

const parseCSV = (text) => {
  const lines = text.split(/\r?\n/).filter(l => l.trim());
  if (lines.length < 2) return [];
  const raw = lines[0].split(/,|;/).map(h => h.trim().replace(/^["']|["']$/g, "").toLowerCase());
  const nameIdx  = raw.findIndex(h => h.includes("name") || h.includes("company") || h.includes("supplier"));
  const emailIdx = raw.findIndex(h => h.includes("email") || h.includes("mail"));
  if (nameIdx === -1) return [];
  return lines.slice(1).map((line, i) => {
    const cols = line.split(/,|;/).map(c => c.trim().replace(/^["']|["']$/g, ""));
    const name = cols[nameIdx] || "";
    const email = emailIdx >= 0 ? cols[emailIdx] || "" : "";
    return name ? { _id: Date.now() + i, name, email, platformStatus: "invite", selected: true } : null;
  }).filter(Boolean);
};

const SecSuppliers = ({ auction, update }) => {
  const [sName, setSName] = useState("");
  const [sEmail, setSEmail] = useState("");
  const [search, setSearch] = useState("");
  const [extendId, setExtendId] = useState(null);
  const [extDate, setExtDate] = useState("");
  const [extReason, setExtReason] = useState("");
  const [importRows, setImportRows] = useState([]);
  const [importOpen, setImportOpen] = useState(false);
  const fileRef = useRef(null);

  const showDeadlineCol = auction.archPreBid;

  const add = () => {
    if (!sName.trim()) return;
    const newSupplier = { id: Date.now(), name: sName.trim(), email: sEmail.trim(), status: "Pending", preBidDeadlineOverride: "", preBidReason: "" };
    const newLots = auction.lots.map(lot => ({ ...lot, requiredSuppliers: [...lot.requiredSuppliers, newSupplier.id] }));
    update({ suppliers: [...auction.suppliers, newSupplier], lots: newLots });
    setSName(""); setSEmail("");
  };
  const remove = (id) => {
    if (extendId === id) setExtendId(null);
    update({
      suppliers: auction.suppliers.filter(s => s.id !== id),
      lots: auction.lots.map(lot => ({ ...lot, requiredSuppliers: lot.requiredSuppliers.filter(sid => sid !== id) })),
    });
  };
  const updateSupplier = (id, patch) => update({ suppliers: auction.suppliers.map(s => s.id === id ? { ...s, ...patch } : s) });

  const openExtend = (s) => {
    setExtendId(s.id);
    setExtDate(s.preBidDeadlineOverride || auction.archPreBidDeadline || "");
    setExtReason(s.preBidReason || "");
  };
  const saveExtend = (id) => {
    updateSupplier(id, { preBidDeadlineOverride: extDate, preBidReason: extReason });
    setExtendId(null);
  };
  const clearExtend = (id) => {
    updateSupplier(id, { preBidDeadlineOverride: "", preBidReason: "" });
    setExtendId(null);
  };

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    e.target.value = "";
    if (/\.(xlsx|xls)$/i.test(file.name)) {
      alert("Please save your Excel file as CSV (.csv) first, then import it here.");
      return;
    }
    const reader = new FileReader();
    reader.onload = (ev) => {
      const rows = parseCSV(ev.target.result);
      if (!rows.length) { alert("No suppliers found. Make sure your CSV has columns: Company name, Email."); return; }
      setImportRows(rows);
      setImportOpen(true);
    };
    reader.readAsText(file);
  };

  const confirmImport = () => {
    const selected = importRows.filter(r => r.selected && r.name);
    const newSuppliers = selected.map(r => ({
      id: Date.now() + Math.random(),
      name: r.name, email: r.email,
      status: r.platformStatus === "platform" ? "On platform" : "Pending",
      preBidDeadlineOverride: "", preBidReason: "",
    }));
    const newLots = auction.lots.map(lot => ({ ...lot, requiredSuppliers: [...lot.requiredSuppliers, ...newSuppliers.map(s => s.id)] }));
    update({ suppliers: [...auction.suppliers, ...newSuppliers], lots: newLots });
    setImportOpen(false); setImportRows([]);
  };

  const toggleImportRow = (id) => setImportRows(rows => rows.map(r => r._id === id ? { ...r, selected: !r.selected } : r));
  const setRowStatus = (id, val) => setImportRows(rows => rows.map(r => r._id === id ? { ...r, platformStatus: val } : r));

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
        <input value={sName} onChange={e => setSName(e.target.value)} onKeyDown={e => e.key === "Enter" && add()} placeholder="Company name" style={{ flex: 1 }} />
        <input value={sEmail} onChange={e => setSEmail(e.target.value)} onKeyDown={e => e.key === "Enter" && add()} placeholder="Email" style={{ flex: 1 }} />
        <button className="btn btn-primary" onClick={add} style={{ flexShrink: 0, display: "flex", alignItems: "center", gap: 6 }}>
          <IcoPlus size={13} color="#fff" /> Add supplier
        </button>
        <button className="btn" onClick={() => fileRef.current?.click()} style={{ flexShrink: 0, display: "flex", alignItems: "center", gap: 6, whiteSpace: "nowrap" }}>
          <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
          Import from Excel
        </button>
        <input ref={fileRef} type="file" accept=".csv,.xlsx,.xls" style={{ display: "none" }} onChange={handleFile} />
      </div>

      {/* Import preview panel */}
      {importOpen && (
        <Card p={0} style={{ marginBottom: 12, border: `1px solid ${C.divider}` }}>
          <div style={{ padding: "12px 16px", borderBottom: `1px solid ${C.divider}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <span style={{ fontSize: 13, fontWeight: 600, color: C.t1 }}>Import preview</span>
              <span style={{ fontSize: 12, color: C.t3, marginLeft: 8 }}>{importRows.filter(r => r.selected).length} of {importRows.length} selected</span>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button className="btn btn-primary" onClick={confirmImport}
                style={{ fontSize: 12, padding: "5px 14px" }}>
                Add {importRows.filter(r => r.selected).length} suppliers
              </button>
              <button className="btn" onClick={() => { setImportOpen(false); setImportRows([]); }}
                style={{ fontSize: 12, padding: "5px 14px" }}>Cancel</button>
            </div>
          </div>
          <table>
            <thead><tr>
              <th style={{ width: 36 }}></th>
              <th>Company name</th>
              <th>Email</th>
              <th>Platform status</th>
            </tr></thead>
            <tbody>
              {importRows.map(r => (
                <tr key={r._id} style={{ opacity: r.selected ? 1 : 0.45 }}>
                  <td>
                    <input type="checkbox" checked={r.selected} onChange={() => toggleImportRow(r._id)}
                      style={{ width: 15, height: 15, cursor: "pointer" }} />
                  </td>
                  <td style={{ color: C.t1, fontWeight: 500 }}>{r.name}</td>
                  <td style={{ color: C.t2, fontSize: 13 }}>{r.email || <span style={{ color: C.t3 }}>—</span>}</td>
                  <td>
                    <div style={{ display: "flex", gap: 6 }}>
                      {[
                        { v: "platform", label: "On platform", bg: "#EBFFF7", color: "#1B7A4A" },
                        { v: "invite",   label: "Needs invite",  bg: "#FFF8E6", color: "#92600A" },
                      ].map(opt => (
                        <button key={opt.v} onClick={() => setRowStatus(r._id, opt.v)}
                          style={{ fontSize: 11, fontWeight: 500, padding: "3px 9px", borderRadius: 4, border: `1px solid ${r.platformStatus === opt.v ? "transparent" : C.divider}`, cursor: "pointer",
                            background: r.platformStatus === opt.v ? opt.bg : C.surface,
                            color: r.platformStatus === opt.v ? opt.color : C.t3 }}>
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      )}

      {/* Table */}
      <Card p={0}>
        {auction.suppliers.length === 0 ? (
          <div style={{ padding: "48px 16px", textAlign: "center", color: C.t2, fontSize: 14 }}>No suppliers added yet.</div>
        ) : (
          <table>
            <thead><tr>
              <th>Company name</th>
              <th>Email</th>
              {showDeadlineCol && <th>Pre-bid Deadline</th>}
              <th>Status</th>
              <th style={{ width: 80 }}>Actions</th>
            </tr></thead>
            <tbody>
              {filtered.map(s => {
                const hasOverride = !!s.preBidDeadlineOverride;
                const displayDeadline = hasOverride ? s.preBidDeadlineOverride : auction.archPreBidDeadline;
                const isExpanding = extendId === s.id;
                return (
                  <React.Fragment key={s.id}>
                    <tr>
                      <td style={{ color: C.t1, fontWeight: 500 }}>{s.name}</td>
                      <td style={{ color: C.t2, fontSize: 14 }}>{s.email ? s.email.length > 22 ? s.email.slice(0, 20) + "…" : s.email : <span style={{ color: C.t3 }}>—</span>}</td>
                      {showDeadlineCol && (
                        <td>
                          <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                            <div>
                              {displayDeadline ? (
                                <span style={{ fontSize:13, color: hasOverride ? "#D97706" : C.t1, fontWeight: hasOverride ? 500 : 400 }}>
                                  {hasOverride && <span style={{ marginRight:4 }}>🕐</span>}
                                  {fmtDeadline(displayDeadline)}
                                </span>
                              ) : (
                                <span style={{ fontSize:13, color:C.t3 }}>No deadline set</span>
                              )}
                              {hasOverride && s.preBidReason && (
                                <div style={{ fontSize:11, color:C.t3, marginTop:2, maxWidth:180, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }} title={s.preBidReason}>{s.preBidReason}</div>
                              )}
                            </div>
                            <button
                              onClick={() => isExpanding ? setExtendId(null) : openExtend(s)}
                              style={{ flexShrink:0, fontSize:11, padding:"3px 8px", borderRadius:4, border:`1px solid ${C.divider}`, background: isExpanding ? C.grey100 : C.surface, color:C.t2, cursor:"pointer", whiteSpace:"nowrap" }}>
                              {hasOverride ? "Edit" : "Extend"}
                            </button>
                            {hasOverride && !isExpanding && (
                              <button onClick={() => clearExtend(s.id)} style={{ flexShrink:0, fontSize:11, padding:"3px 6px", borderRadius:4, border:"none", background:"none", color:C.t3, cursor:"pointer" }} title="Remove extension">✕</button>
                            )}
                          </div>
                        </td>
                      )}
                      <td>
                        {s.status === "On platform"
                          ? <span style={{ fontSize:11, fontWeight:500, padding:"2px 8px", borderRadius:4, background:"#EBFFF7", color:"#1B7A4A" }}>On platform</span>
                          : <Badge cls="bg-yellow">{s.status || "Pending"}</Badge>}
                      </td>
                      <td>
                        <div style={{ display: "flex", gap: 4 }}>
                          <button style={{ background: "none", border: "none", cursor: "pointer", padding: 4, display: "flex", borderRadius: 4 }}><IcoPencil /></button>
                          <button onClick={() => remove(s.id)} style={{ background: "none", border: "none", cursor: "pointer", padding: 4, display: "flex", borderRadius: 4 }}><IcoTrash /></button>
                        </div>
                      </td>
                    </tr>
                    {/* Extend row */}
                    {isExpanding && (
                      <tr>
                        <td colSpan={showDeadlineCol ? 5 : 4} style={{ padding:"12px 16px", background:C.grey50, borderTop:`1px solid ${C.divider}` }}>
                          <div style={{ display:"flex", alignItems:"flex-end", gap:12, flexWrap:"wrap" }}>
                            <div>
                              <div style={{ fontSize:11, color:C.t2, marginBottom:4, fontWeight:500 }}>Extended deadline</div>
                              <input type="datetime-local" value={extDate} onChange={e => setExtDate(e.target.value)}
                                style={{ fontSize:13, padding:"5px 8px" }} />
                            </div>
                            <div style={{ flex:1, minWidth:180 }}>
                              <div style={{ fontSize:11, color:C.t2, marginBottom:4, fontWeight:500 }}>Reason <span style={{ fontWeight:400, color:C.t3 }}>(optional)</span></div>
                              <input type="text" value={extReason} onChange={e => setExtReason(e.target.value)}
                                placeholder="e.g. Requested additional time to verify specs"
                                style={{ width:"100%", fontSize:13, padding:"5px 8px" }} />
                            </div>
                            <div style={{ display:"flex", gap:8 }}>
                              <button className="btn btn-primary" onClick={() => saveExtend(s.id)} style={{ fontSize:12, padding:"6px 14px" }}>Save</button>
                              <button className="btn" onClick={() => setExtendId(null)} style={{ fontSize:12, padding:"6px 14px" }}>Cancel</button>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        )}
      </Card>
    </Sec>
  );
};

/* ── SecLots ─────────────────────────────────────────────────────────────── */
const toSec = (s) => { const n = parseFloat(s || "0"); return String(s || "").includes("sec") ? n : n * 60; };
const DURATION_OPTIONS = ["1 min","2 min","3 min","5 min","10 min","15 min","20 min","30 min","45 min","60 min","90 min","120 min"];
const ROUND_DURATION_OPTIONS = ["15 sec","30 sec","1 min","2 min","3 min","5 min","10 min","15 min"];
const OVERTIME_OPTIONS = ["30 sec","1 min","2 min","3 min","5 min","10 min"];

const IcoSettings = () => <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke={C.t3} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>;
const IcoSuppliers = () => <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke={C.t3} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>;
const IcoLines = () => <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke={C.t3} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2"/><rect x="9" y="3" width="6" height="4" rx="1"/></svg>;
const IcoPlusCircle = ({ color = C.green, size = 18 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>;
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
                          <span style={{ fontSize: 10, borderRadius: 4, padding: "3px 5px", fontWeight: 600, fontFamily: "Poppins,sans-serif", background: isPos ? C.red : C.greenLight, color: isPos ? C.red600 : C.green800 }}>
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
                        <span style={{ flex: 1, fontSize: 10, color: C.t3, textTransform: "uppercase", letterSpacing: "0.6px" }}>Option</span>
                        <span style={{ width: 88, fontSize: 10, color: C.t3, textTransform: "uppercase", letterSpacing: "0.6px" }}>Handicap</span>
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
    <div style={{ border: `1px solid ${C.greenLight}`, borderRadius: 6, overflow: "hidden", marginTop: 12 }}>
      <div style={{ padding: "7px 14px", background: C.greenLight, display: "flex", alignItems: "center", gap: 6 }}>
        <div style={{ width: 6, height: 6, borderRadius: "50%", background: C.green, flexShrink: 0 }} />
        <span style={{ fontSize: 10, fontWeight: 700, color: C.green800, textTransform: "uppercase", letterSpacing: "0.8px" }}>Live Preview</span>
      </div>
      <div style={{ overflowX: "auto", background: "#fff" }}>
        <div style={{ minWidth: "max-content" }}>
          <div style={{ display: "flex", background: C.grey50, borderBottom: `1px solid ${C.divider}` }}>
            <div style={{ width: colW, padding: "8px 12px", fontSize: 12, fontWeight: 600, color: C.t3, textTransform: "uppercase", flexShrink: 0 }}>Line item</div>
            <div style={{ width: 56,   padding: "8px 8px",  fontSize: 12, fontWeight: 600, color: C.t3, textTransform: "uppercase", flexShrink: 0 }}>Qty</div>
            {colSuppliers.map((s, si) => (
              <div key={s.id} style={{ width: colW, padding: "8px 12px", fontSize: 12, fontWeight: 600, color: C.t1, background: PA_SUP_COLORS[si % PA_SUP_COLORS.length] }}>{s.name}</div>
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
                    {!isNaN(v) && v !== 0 && <div style={{ fontSize: 12, color: C.red600, fontWeight: 600 }}>+{fmt(v)} EUR</div>}
                  </div>
                );
              })}
            </div>
          ))}
          <div style={{ display: "flex", background: C.greenLight }}>
            <div style={{ width: colW, padding: "10px 12px", fontSize: 13, fontWeight: 700, color: C.t1, flexShrink: 0 }}>Total value</div>
            <div style={{ width: 56, flexShrink: 0 }} />
            {supTotals.map(st => (
              <div key={st.id} style={{ width: colW, padding: "10px 12px", display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: C.t1 }}>{fmt(st.total)}</span>
                {st.total === minTotal && <span style={{ fontSize: 10, fontWeight: 700, background: C.green, color: C.surface, padding: "2px 5px", borderRadius: 4, letterSpacing: "0.5px" }}>BEST</span>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};


/* ── Line Items flex components — module-level so identity is stable ── */
const LT = { name: { flex: 2 }, unit: { flex: 1 }, qty: { flex: 1 }, del: { width: 32, flexShrink: 0 } };
const SUP_AVT = [
  { bg:"#E9F5FF", text:"#1A49A9" },
  { bg:"#DDFBEE", text:"#007C4A" },
  { bg:"#FFF5EB", text:"#8C2300" },
  { bg:"#EDEBFE", text:"#5521B5" },
  { bg:"#FDE8E8", text:"#9B1C1C" },
  { bg:"#FDFFD2", text:"#856D00" },
];

const LtHead = ({ allSuppliers, requiredSuppliers, onToggleSupplier, isDynamic }) => (
  <div style={{ display:"flex", alignItems:"stretch", background:C.grey50, borderBottom:`1px solid ${C.grey150}` }}>
    <div style={{ flex:4, display:"flex", alignItems:"center", gap:8, padding:"10px 16px", borderRight:`1px solid ${C.grey150}` }}>
      <span style={{ flex:2, fontSize:10, fontWeight:600, color:C.t3, textTransform:"uppercase", letterSpacing:"0.07em" }}>Item name</span>
      <span style={{ flex:1, fontSize:10, fontWeight:600, color:C.t3, textTransform:"uppercase", letterSpacing:"0.07em" }}>Qty</span>
      <span style={{ flex:1, fontSize:10, fontWeight:600, color:C.t3, textTransform:"uppercase", letterSpacing:"0.07em" }}>Unit</span>
    </div>
    {(allSuppliers||[]).map((s, si) => {
      const active = !requiredSuppliers || requiredSuppliers.includes(s.id);
      return (
        <div key={s.id}
          onClick={() => onToggleSupplier && onToggleSupplier(s.id)}
          style={{ flex:1.5, padding:"10px 12px", borderLeft: si > 0 ? `1px solid ${C.grey100}` : "none",
            display:"flex", flexDirection:"column", alignItems:"flex-start", gap:2,
            cursor: onToggleSupplier ? "pointer" : "default",
            opacity: active ? 1 : 0.5, userSelect:"none" }}>
          <div style={{ display:"flex", alignItems:"center", gap:7 }}>
            <div style={{ width:14, height:14, borderRadius:3, flexShrink:0, transition:"all .15s",
              border:`1.5px solid ${active ? C.t1 : C.grey300}`,
              background: active ? C.t1 : "transparent",
              display:"flex", alignItems:"center", justifyContent:"center" }}>
              {active && <IcoCheck size={9} color="#fff"/>}
            </div>
            <span style={{ fontSize:11, fontWeight:600, color:C.t1, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{s.name}</span>
          </div>
          <span style={{ fontSize:10, color:C.t3, paddingLeft:21 }}>{isDynamic ? "ceiling / unit" : "price / unit"}</span>
        </div>
      );
    })}
    <div style={{ width:32, flexShrink:0 }} />
  </div>
);

const LtItemRow = ({ item, allSuppliers, requiredSuppliers, onUpdate, onDelete, cur }) => {
  const qty = parseFloat(item.quantity) || 0;
  const fmtTotal = (n) => `${cur || ""} ${n.toLocaleString("en-US", { minimumFractionDigits:2, maximumFractionDigits:2 })}`;
  return (
    <div style={{ display:"flex", alignItems:"stretch", background:C.surface, borderTop:`1px solid ${C.grey100}` }}>
      <div style={{ flex:4, display:"flex", alignItems:"center", gap:8, padding:"10px 16px", borderRight:`1px solid ${C.grey150}` }}>
        <div style={LT.name}><input className="lt-cell-input" value={item.name} onChange={e => onUpdate(item.id, { name: e.target.value })} placeholder="Item name" /></div>
        <div style={LT.qty}><input className="lt-cell-input" type="number" value={item.quantity} onChange={e => onUpdate(item.id, { quantity: e.target.value })} placeholder="0" /></div>
        <div style={LT.unit}><input className="lt-cell-input" value={item.unit || ""} onChange={e => onUpdate(item.id, { unit: e.target.value })} placeholder="unit" /></div>
      </div>
      {(allSuppliers||[]).map((s, si) => {
        const active = !requiredSuppliers || requiredSuppliers.includes(s.id);
        const price = parseFloat(item.prices?.[s.id]) || 0;
        const total = qty > 0 && price > 0 ? qty * price : null;
        return (
          <div key={s.id} style={{ flex:1.5, padding:"10px 12px",
            borderLeft: si > 0 ? `1px solid ${C.grey100}` : "none",
            display:"flex", flexDirection:"column", alignItems:"flex-end", justifyContent:"center", gap:3,
            background: active ? C.surface : C.grey50, opacity: active ? 1 : 0.4 }}>
            {active ? <>
              <input className="lt-cell-input" type="number" value={item.prices?.[s.id] || ""} onChange={e => onUpdate(item.id, { prices: { ...item.prices, [s.id]: e.target.value } })} placeholder="0.00" style={{ textAlign:"right" }} />
              {total !== null
                ? <span style={{ fontSize:10, color:C.t3 }}>= {fmtTotal(total)}</span>
                : <span style={{ fontSize:10, color:C.grey200 }}>—</span>}
            </> : <span style={{ fontSize:12, color:C.grey300 }}>—</span>}
          </div>
        );
      })}
      <button className="lt-trash" style={{ ...LT.del, alignSelf:"center" }} onClick={onDelete}><IcoTrash /></button>
    </div>
  );
};

const LtTotalRow = ({ items, allSuppliers, requiredSuppliers, cur }) => {
  const totals = (allSuppliers||[]).map(s => {
    const active = !requiredSuppliers || requiredSuppliers.includes(s.id);
    const total = active ? items.reduce((sum, li) => sum + (parseFloat(li.prices?.[s.id])||0) * (parseFloat(li.quantity)||0), 0) : 0;
    return { id:s.id, active, total };
  });
  const activeTotals = totals.filter(t => t.active && t.total > 0).map(t => t.total);
  const minTotal = activeTotals.length > 0 ? Math.min(...activeTotals) : 0;
  if (activeTotals.length === 0) return null;
  return (
    <div style={{ display:"flex", alignItems:"stretch", background:C.surface, borderTop:`1px solid ${C.grey150}` }}>
      <div style={{ flex:4, padding:"10px 16px", display:"flex", flexDirection:"column", justifyContent:"center", borderRight:`1px solid ${C.grey150}` }}>
        <span style={{ fontSize:12, fontWeight:600, color:C.t1 }}>Total per supplier</span>
        <span style={{ fontSize:10, color:C.t3, marginTop:1 }}>sum of all items × qty</span>
      </div>
      {totals.map((t, ti) => {
        const isLowest = t.active && t.total > 0 && t.total === minTotal;
        const pct = t.active && t.total > 0 && !isLowest && minTotal > 0 ? ((t.total - minTotal) / minTotal * 100).toFixed(1) : null;
        return (
          <div key={t.id} style={{ flex:1.5, padding:"10px 12px",
            borderLeft: ti > 0 ? `1px solid ${C.grey100}` : "none",
            display:"flex", flexDirection:"column", alignItems:"flex-end", justifyContent:"center", gap:2, opacity: t.active ? 1 : 0.35 }}>
            {t.active && t.total > 0 ? <>
              <span style={{ fontSize:13, fontWeight:700, color: isLowest ? C.green800 : C.t1 }}>
                {cur} {t.total.toLocaleString("en-US", { minimumFractionDigits:2, maximumFractionDigits:2 })}
              </span>
              {isLowest
                ? <span style={{ fontSize:10, fontWeight:700, color:C.green800 }}>Lowest</span>
                : pct ? <span style={{ fontSize:10, color:C.t3 }}>+{pct}%</span> : null}
            </> : <span style={{ fontSize:12, color:C.grey300 }}>—</span>}
          </div>
        );
      })}
      <div style={{ width:32, flexShrink:0 }} />
    </div>
  );
};

const LtDynRow = ({ dynItem, allSuppliers, requiredSuppliers, onUpdate, cur }) => {
  const qty = parseFloat(dynItem?.quantity) || 0;
  const fmtTotal = (n) => `${cur || ""} ${n.toLocaleString("en-US", { minimumFractionDigits:2, maximumFractionDigits:2 })}`;
  return (
    <div style={{ display:"flex", alignItems:"stretch", background:C.surface, borderTop:`1px solid ${C.grey100}` }}>
      <div style={{ flex:4, display:"flex", alignItems:"center", gap:8, padding:"10px 16px", borderRight:`1px solid ${C.grey150}` }}>
        <div style={LT.name}><input className="lt-cell-input" value={dynItem?.name || ""} onChange={e => onUpdate({ name: e.target.value })} placeholder="Item name" /></div>
        <div style={LT.qty}><input className="lt-cell-input" type="number" value={dynItem?.quantity || ""} onChange={e => onUpdate({ quantity: e.target.value })} placeholder="0" /></div>
        <div style={LT.unit}><input className="lt-cell-input" value={dynItem?.unit || ""} onChange={e => onUpdate({ unit: e.target.value })} placeholder="unit" /></div>
      </div>
      {(allSuppliers||[]).map((s, si) => {
        const active = !requiredSuppliers || requiredSuppliers.includes(s.id);
        const price = parseFloat(dynItem?.ceilingPrices?.[s.id]) || 0;
        const total = qty > 0 && price > 0 ? qty * price : null;
        return (
          <div key={s.id} style={{ flex:1.5, padding:"10px 12px",
            borderLeft: si > 0 ? `1px solid ${C.grey100}` : "none",
            display:"flex", flexDirection:"column", alignItems:"flex-end", justifyContent:"center", gap:3,
            background: active ? C.surface : C.grey50, opacity: active ? 1 : 0.4 }}>
            {active ? <>
              <input className="lt-cell-input" type="number" value={dynItem?.ceilingPrices?.[s.id] || ""} onChange={e => onUpdate({ ceilingPrices: { ...(dynItem?.ceilingPrices || {}), [s.id]: e.target.value } })} placeholder="0.00" style={{ textAlign:"right" }} />
              {total !== null
                ? <span style={{ fontSize:10, color:C.t3 }}>= {fmtTotal(total)}</span>
                : <span style={{ fontSize:10, color:C.grey200 }}>—</span>}
            </> : <span style={{ fontSize:12, color:C.grey300 }}>—</span>}
          </div>
        );
      })}
      <div style={{ width:32, flexShrink:0 }} />
    </div>
  );
};

/* ── Price Adjustments — module-level components ── */
const PA_PRESETS    = ["Payment terms", "Warranty", "Incoterms", "Quality", "Delivery time"];
const PA_SUP_COLORS = ["#E9F5FF", "#FDFFD2", "#F3F2FF", "#FFF5EB", "#DDFBEE", "#FDE8E8"];

/* ── LotPreview ──────────────────────────────────────────────────────────── */
const LOT_PREVIEW_COLORS = ["#00CE7C","#1A49A9","#9F580A","#5521B5","#E02424","#8C2300"];
const LOT_PREVIEW_BG     = ["#E9F5FF","#FDFFD2","#F3F2FF","#FFF5EB","#DDFBEE","#FDE8E8"];
const LOT_PREVIEW_TEXT   = ["#1A49A9","#856D00","#5521B5","#9F580A","#E02424","#8C2300"];

const LotPreview = ({ lot, auction, sidebar }) => {
  const isDynamic   = auction.type === "dynamic";
  const isJapanese  = auction.dynamicFormat === "japanese";
  const cur         = auction.currency || "EUR";
  const fmtN        = (n) => Math.round(n).toLocaleString("en-US");
  const wrap        = (children) => sidebar
    ? <div style={{ padding: "16px 16px 20px" }}>{children}</div>
    : <>{children}</>;

  const basePrice       = parseFloat(lot.baselinePrice) || 0;
  const assignedSuppliers = auction.suppliers.filter(s => lot.requiredSuppliers?.includes(s.id));

  const headerRow = (label, right) => (
    <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:12 }}>
      <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke={C.t3} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
      <span style={{ fontSize:12, fontWeight:500, color:C.t2, textTransform:"uppercase", letterSpacing:"0.07em" }}>{label}</span>
      {right && <span style={{ fontSize:12, fontWeight:500, color:C.t1, marginLeft:"auto" }}>{right}</span>}
    </div>
  );

  /* ── MULTI-ROUND: Price Grid table ── */
  if (isDynamic) {
    const increment  = parseFloat(lot.dynRoundIncrement) || 0;
    const durSec     = toSec(lot.duration || "5 min");
    const rdSec      = toSec(lot.dynRoundDuration || "1 min");
    const totalRounds = rdSec > 0 ? Math.max(1, Math.min(Math.floor(durSec / rdSec), 30)) : 0;

    const pa    = lot.priceAdjustments || {};
    const tf    = pa.transformations  || {};
    const vType = pa.valueType || "percentage";
    const handicapsOn = !!auction.archPriceAdjustments;

    const calcAdj = (ref, dir, val) => {
      const b = parseFloat(ref) || 0, v = parseFloat(val) || 0;
      if (!b || !v) return b;
      return vType === "percentage"
        ? (dir === "+" ? b * (1 + v / 100) : b * (1 - v / 100))
        : (dir === "+" ? b + v : b - v);
    };

    const getRoundRef = (r) => {
      if (increment > 0) return isJapanese ? basePrice - increment * (r - 1) : increment * r;
      if (basePrice > 0) return (basePrice / (totalRounds || 1)) * r;
      return 0;
    };

    const noData = totalRounds === 0 || basePrice === 0;

    return wrap(
      <>
        {headerRow(
          "eAuction Preview",
          noData ? null : `${totalRounds} round${totalRounds !== 1 ? "s" : ""} · ${isJapanese ? "Japanese ↓" : "Dutch ↑"}`
        )}
        {noData ? (
          <div style={{ fontSize:13, color:C.t3, fontStyle:"italic" }}>
            Enter Baseline price, Duration and Round Duration to see the price grid.
          </div>
        ) : (
          <div style={{ overflowX:"auto", borderRadius:6, border:`1px solid ${C.divider}` }}>
            <table style={{ width:"100%", borderCollapse:"collapse", fontSize:12 }}>
              <thead>
                <tr>
                  <th style={{ padding:"5px 8px", textAlign:"left", fontWeight:600, color:C.t2,
                    borderBottom:`2px solid ${C.divider}`, background:C.grey50, position:"sticky", left:0, minWidth:55 }}>
                    Round
                  </th>
                  <th style={{ padding:"5px 8px", textAlign:"right", fontWeight:600, color:C.t3,
                    borderBottom:`2px solid ${C.divider}`, background:C.grey50, minWidth:75 }}>
                    Reference
                  </th>
                  {assignedSuppliers.map((s, si) => {
                    const t = tf[s.id] || { direction:"+", value:"" };
                    const val = parseFloat(t.value) || 0;
                    let hLabel = "";
                    if (handicapsOn && val > 0) {
                      const sign = t.direction === "-" ? "−" : "+";
                      hLabel = vType === "percentage" ? `(${sign}${val}%)` : `(${sign}${fmtN(val)})`;
                    }
                    return (
                      <th key={s.id} style={{ padding:"5px 8px", textAlign:"right", fontWeight:600,
                        color:LOT_PREVIEW_TEXT[si % LOT_PREVIEW_TEXT.length],
                        borderBottom:`2px solid ${C.divider}`,
                        background:LOT_PREVIEW_BG[si % LOT_PREVIEW_BG.length], minWidth:90 }}>
                        <div style={{ display:"flex", alignItems:"center", justifyContent:"flex-end", gap:4 }}>
                          <div style={{ width:6, height:6, borderRadius:"50%", background:LOT_PREVIEW_COLORS[si % LOT_PREVIEW_COLORS.length] }} />
                          <span>{s.name}</span>
                          {hLabel && <span style={{ fontWeight:400, fontSize:10, color:C.t3 }}>{hLabel}</span>}
                        </div>
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: totalRounds }, (_, i) => i + 1).map(r => {
                  const ref     = getRoundRef(r);
                  const isFirst = r === 1;
                  const isLast  = r === totalRounds;
                  const rowBg   = (isFirst || isLast) ? C.grey50 : "#fff";
                  return (
                    <tr key={r} style={{ borderBottom:`1px solid ${C.divider}` }}>
                      <td style={{ padding:"4px 8px", fontWeight:600, color:C.t1,
                        position:"sticky", left:0, background:rowBg }}>
                        {r}
                        {isFirst && <span style={{ fontSize:10, fontWeight:400, color:C.t3, marginLeft:3 }}>{isJapanese ? "ceiling" : "floor"}</span>}
                        {isLast && !isFirst && <span style={{ fontSize:10, fontWeight:400, color:C.t3, marginLeft:3 }}>{isJapanese ? "floor" : "ceiling"}</span>}
                      </td>
                      <td style={{ padding:"4px 8px", textAlign:"right", color:C.t3, background:rowBg }}>{fmtN(ref)}</td>
                      {assignedSuppliers.map((s, si) => {
                        const t   = tf[s.id] || { direction:"+", value:"" };
                        const adj = handicapsOn ? calcAdj(ref, t.direction, t.value) : ref;
                        const diff = adj - ref;
                        return (
                          <td key={s.id} style={{ padding:"4px 8px", textAlign:"right", fontWeight:600, color:C.t1, background:rowBg }}>
                            {fmtN(ref)}
                            {handicapsOn && diff !== 0 && (
                              <span style={{ fontSize:10, fontWeight:400, marginLeft:4, color:C.t3 }}>
                                →&nbsp;{fmtN(adj)}
                              </span>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </>
    );
  }

  /* ── SINGLE ROUND: SVG chart ── */
  const minDec  = parseFloat(lot.minDec)  || 0;
  const maxDec  = parseFloat(lot.maxDec)  || 0;
  const durSec  = toSec(lot.duration || "10 min");
  const durMin  = durSec / 60;

  if (basePrice === 0) return wrap(
    <>
      {headerRow("eAuction Preview")}
      <div style={{ fontSize:13, color:C.t3, fontStyle:"italic" }}>Enter Baseline price to see the preview.</div>
    </>
  );

  const W = 520, H = 130, PL = 72, PR = 20, PT = 14, PB = 26;
  const iW = W - PL - PR, iH = H - PT - PB;
  const floorPrice = maxDec > 0 ? Math.max(0, basePrice - maxDec) : basePrice * 0.75;
  const range = basePrice - floorPrice || 1;
  const toY = (p) => PT + iH - ((p - floorPrice) / range) * iH;
  const toX = (t) => PL + (t / durMin) * iW;

  const yTicks = [basePrice, basePrice - range / 2, floorPrice];

  return wrap(
    <>
      {headerRow(
        "eAuction Preview",
        `${auction.biddingMode === "english" ? "English" : "Sealed Bid"} · ${durMin} min · ${cur}`
      )}
      <div style={{ background:C.grey50, border:`1px solid ${C.divider}`, borderRadius:6, padding:"8px 0 0" }}>
        <svg width="100%" viewBox={`0 0 ${W} ${H}`} style={{ display:"block" }}>
          {/* Grid & Y-labels */}
          {yTicks.map((p, i) => (
            <g key={i}>
              <line x1={PL} y1={toY(p)} x2={W - PR} y2={toY(p)} stroke={C.divider} strokeDasharray="4,3" />
              <text x={PL - 6} y={toY(p) + 4} textAnchor="end" fontSize={9} fill={C.t3}>{fmtN(p)}</text>
            </g>
          ))}
          {/* Shaded bid range area */}
          <rect x={PL} y={toY(basePrice)} width={iW} height={toY(floorPrice) - toY(basePrice)}
            fill="#00CE7C" opacity={0.06} />
          {/* Baseline price line */}
          <line x1={PL} y1={toY(basePrice)} x2={W - PR} y2={toY(basePrice)}
            stroke="#00CE7C" strokeWidth={1.5} strokeDasharray="6,3" />
          <text x={PL + 6} y={toY(basePrice) - 4} fontSize={9} fill={C.green}>
            Baseline {fmtN(basePrice)} {cur}
          </text>
          {/* Floor line */}
          {maxDec > 0 && (
            <>
              <line x1={PL} y1={toY(floorPrice)} x2={W - PR} y2={toY(floorPrice)}
                stroke={C.divider} strokeWidth={1} />
              <text x={PL + 6} y={toY(floorPrice) + 12} fontSize={9} fill={C.t3}>
                Min: {fmtN(floorPrice)}
              </text>
            </>
          )}
          {/* Supplier lines */}
          {assignedSuppliers.slice(0, 6).map((s, si) => {
            const fraction = 0.55 + (si * 0.09) % 0.35;
            const endPrice = floorPrice + range * fraction;
            const midT = durMin * 0.45;
            const midP = basePrice - (basePrice - endPrice) * 0.45;
            const pts = `${toX(0)},${toY(basePrice)} ${toX(midT)},${toY(midP)} ${toX(durMin)},${toY(endPrice)}`;
            return (
              <g key={s.id}>
                <polyline points={pts} fill="none"
                  stroke={LOT_PREVIEW_COLORS[si % LOT_PREVIEW_COLORS.length]}
                  strokeWidth={1.5} strokeLinejoin="round" />
                <circle cx={toX(durMin)} cy={toY(endPrice)} r={3}
                  fill={LOT_PREVIEW_COLORS[si % LOT_PREVIEW_COLORS.length]} />
              </g>
            );
          })}
          {/* X-labels */}
          {[0, durMin / 2, durMin].map((t, i) => (
            <text key={i} x={toX(t)} y={H - 6} textAnchor="middle" fontSize={9} fill={C.t3}>
              {t === 0 ? "0" : t === durMin ? `${durMin} min` : `${(durMin / 2).toFixed(1)} min`}
            </text>
          ))}
        </svg>
        {/* Legend */}
        {assignedSuppliers.length > 0 && (
          <div style={{ display:"flex", gap:14, padding:"4px 12px 10px", flexWrap:"wrap" }}>
            {assignedSuppliers.slice(0, 6).map((s, si) => (
              <div key={s.id} style={{ display:"flex", alignItems:"center", gap:5, fontSize:12, color:C.t2 }}>
                <div style={{ width:12, height:2, background:LOT_PREVIEW_COLORS[si % LOT_PREVIEW_COLORS.length], borderRadius:1 }} />
                {s.name}
              </div>
            ))}
          </div>
        )}
      </div>
      {minDec > 0 && (
        <div style={{ display:"flex", gap:16, marginTop:10 }}>
          <span style={{ fontSize:12, color:C.t3 }}>Min decrement: <strong style={{ color:C.t1 }}>{fmtN(minDec)} {cur}</strong></span>
          {maxDec > 0 && <span style={{ fontSize:12, color:C.t3 }}>Max decrement: <strong style={{ color:C.t1 }}>{fmtN(maxDec)} {cur}</strong></span>}
        </div>
      )}
    </>
  );
};

const SecLots = ({ auction, update }) => {
  const lots = auction.lots;
  const isDynamic = auction.type === "dynamic";
  const cur = auction.currency || "EUR";

  const [activeLotId, setActiveLotId] = useState(() => lots[0]?.id);
  const [lotSecs, setLotSecs] = useState(() => {
    const s = {};
    lots.forEach(l => { s[l.id] = new Set(["settings","items","pricing"]); });
    return s;
  });
  const [expandedSuppliers, setExpandedSuppliers] = useState({});
  const [infoModal, setInfoModal] = useState(null);
  const [applyToAll, setApplyToAll] = useState(true);

  const INFO = {
    baseline:     { title: "Baseline Price",        body: "The reference budget or target price for this lot. It serves as a benchmark — the auction aims to achieve savings below this value." },
    endingPrice:  { title: "Ending Price",           body: "The maximum (ceiling) price at which the Dutch auction ends. If no supplier accepts before this round, the auction closes at this price." },
    startingPrice:{ title: "Starting Price (auto)",  body: "Automatically calculated as: Ending Price − Decrement × (Rounds − 1). This is the lowest price offered in round 1 (floor)." },
    decrement:    { title: "Decrement / Round",      body: "The fixed amount by which the price increases each round in a Dutch auction. Suppliers decide each round whether to accept the current price." },
    duration:     { title: "Total Duration",         body: "The total time the auction is open. Combined with Round Duration, this determines the number of price rounds." },
    roundDuration:{ title: "Round Duration",         body: "How long each price round lasts. At the end of each round, the price moves by one decrement step." },
    japStartPrice:{ title: "Starting Price",         body: "The initial highest price in a Japanese auction (ceiling). Price decreases by the decrement each round until a supplier accepts or the floor is reached." },
    japDecrement: { title: "Round Decrement",        body: "The fixed amount by which the price decreases each round in a Japanese auction. Suppliers who cannot meet the price drop out each round." },
    overtime:     { title: "Overtime",               body: "Extra time added to the auction when a bid is placed in the final seconds, preventing last-second sniping." },
    minDec:       { title: "Min Bid Decrement",      body: "The minimum amount by which each new bid must be lower than the current best bid." },
    maxDec:       { title: "Max Bid Decrement",      body: "The maximum amount a supplier can lower their bid in a single round, protecting against aggressive undercutting." },
  };
  const InfoBtn = ({ k }) => (
    <button onClick={() => setInfoModal(INFO[k])}
      style={{ background:"none", border:"none", cursor:"pointer", padding:"0 0 0 4px", lineHeight:1, verticalAlign:"middle", color:C.t3, fontSize:13 }}>
      <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <circle cx={12} cy={12} r={10}/><line x1={12} y1={16} x2={12} y2={12}/><line x1={12} y1={8} x2={12} y2={8}/>
      </svg>
    </button>
  );

  const toggleSec = (lotId, sec) => setLotSecs(prev => {
    const cur2 = new Set(prev[lotId] || []);
    cur2.has(sec) ? cur2.delete(sec) : cur2.add(sec);
    return { ...prev, [lotId]: cur2 };
  });
  const isSecOpen = (lotId, sec) => (lotSecs[lotId] || new Set(["settings","items","pricing"])).has(sec);

  const makeUpdLot = (idx) => (ch) => {
    const merged = { ...lots[idx], ...ch };
    if (isDynamic && merged.lineItems?.length > 1) merged.lineItems = merged.lineItems.slice(0, 1);
    update({ lots: lots.map((l, i) => i === idx ? merged : l) });
  };
  const addLot = () => {
    const l = mkLot(lots.length + 1);
    l.requiredSuppliers = auction.suppliers.map(s => s.id);
    update({ lots: [...lots, l] });
    setActiveLotId(l.id);
    setLotSecs(prev => ({ ...prev, [l.id]: new Set(["settings","items","pricing"]) }));
  };
  const removeLot = (i) => {
    if (lots.length === 1) return;
    const lotId = lots[i].id;
    const newLots = lots.filter((_, j) => j !== i);
    update({ lots: newLots });
    if (activeLotId === lotId) setActiveLotId(newLots[Math.max(0, i - 1)]?.id);
  };

  const fmtAmt = n => Math.round(parseFloat(n) || 0).toLocaleString("en-US");
  const LOT_COLORS = ["#FDFFD2","#E9F5FF","#F3F2FF","#FFF5EB","#DDFBEE","#FDE8E8"];

  const Badge = ({ type, children }) => {
    const S = { done:{background:C.greenLight,color:C.green800}, required:{background:C.yellow,color:C.yellowT}, info:{background:C.blue,color:C.blueT}, optional:{background:C.grey100,color:C.grey500} };
    const s = S[type] || S.optional;
    return <span style={{ fontSize:9,fontWeight:700,padding:"2px 8px",borderRadius:20,whiteSpace:"nowrap",...s }}>{children}</span>;
  };

  const activeLot = lots.find(l => l.id === activeLotId) || lots[0];
  const activeIdx  = lots.findIndex(l => l.id === activeLot?.id);

  return (
    <Sec id="lots" title="Lots & Items" sub="Define what you are buying and assign suppliers.">

      {infoModal && (
        <div onClick={() => setInfoModal(null)}
          style={{ position:"fixed",inset:0,background:"rgba(0,0,0,0.35)",zIndex:1000,display:"flex",alignItems:"center",justifyContent:"center" }}>
          <div onClick={e => e.stopPropagation()}
            style={{ background:C.surface,borderRadius:10,padding:"24px 28px",maxWidth:380,width:"90%",boxShadow:"0 8px 32px rgba(0,0,0,0.18)" }}>
            <div style={{ fontSize:15,fontWeight:600,color:C.t1,marginBottom:10 }}>{infoModal.title}</div>
            <div style={{ fontSize:13,color:C.t2,lineHeight:1.6 }}>{infoModal.body}</div>
            <button onClick={() => setInfoModal(null)}
              style={{ marginTop:18,background:C.t1,color:"#fff",border:"none",borderRadius:4,padding:"8px 22px",cursor:"pointer",fontSize:13,fontWeight:600 }}>
              Got it
            </button>
          </div>
        </div>
      )}

      {/* ── Tab bar ── */}
      <div style={{ display:"flex", alignItems:"center", gap:4, marginBottom:12 }}>
        {lots.map((lot, idx) => {
          const isActive = lot.id === activeLot?.id;
          const tabColor = LOT_COLORS[idx % LOT_COLORS.length];
          return (
            <div key={lot.id}
              style={{ display:"flex", alignItems:"center", gap:0,
                background: isActive ? tabColor : C.grey100,
                borderRadius:6, overflow:"hidden",
                border: `1px solid ${isActive ? C.grey200 : C.grey150}`,
                cursor:"pointer", userSelect:"none", transition:"all .15s" }}>
              <span
                onClick={() => setActiveLotId(lot.id)}
                style={{ fontSize:13, fontWeight:isActive?700:500,
                  color: isActive ? C.t1 : C.t2,
                  padding:"6px 14px", display:"block" }}>
                {lot.name || `Lot ${idx+1}`}
              </span>
              {lots.length > 1 && (
                <button
                  onClick={e => { e.stopPropagation(); removeLot(idx); }}
                  style={{ background:"none", border:"none", borderLeft:`1px solid ${isActive ? C.grey200 : C.grey200}`,
                    padding:"6px 8px", cursor:"pointer", display:"flex", alignItems:"center",
                    color: C.t3, lineHeight:1, fontSize:14 }}>
                  ×
                </button>
              )}
            </div>
          );
        })}
        <button onClick={addLot}
          style={{ display:"flex", alignItems:"center", gap:6, padding:"6px 12px",
            background:"none", border:"none", cursor:"pointer",
            fontSize:13, fontWeight:400, color:C.t2, fontFamily:"Poppins,sans-serif" }}>
          <IcoPlusCircle size={15} color={C.green}/> Add lot
        </button>
      </div>

      {/* ── Active lot panel ── */}
      {activeLot && (() => {
        const lot = activeLot;
        const idx = activeIdx;
        {
          const updLot = makeUpdLot(idx);
          const addItem = () => updLot({ lineItems: [...lot.lineItems, { id: Date.now(), name:"", unit:"", quantity:1, prices:{} }] });
          const updItem = (id, ch) => updLot({ lineItems: lot.lineItems.map(li => li.id===id ? {...li,...ch} : li) });
          const delItem = (id) => updLot({ lineItems: lot.lineItems.filter(li => li.id!==id) });
          const colSuppliers = auction.suppliers.filter(s => lot.requiredSuppliers.includes(s.id));
          const tabColor = LOT_COLORS[idx % LOT_COLORS.length];

          const settingsDone = !!(lot.name && lot.duration);
          const namedItems = (lot.lineItems || []).filter(li => li.name?.trim());
          const itemsDone = isDynamic ? !!lot.dynItem?.name?.trim() : namedItems.length > 0;
          const pricingDone = isDynamic
            ? !!(lot.dynEndingPrice && lot.dynRoundIncrement)
            : !!(lot.baselinePrice && lot.minDec && lot.maxDec);

          /* Handicap vars — computed here so both items section and pricing section can use them */
          const pa = lot.priceAdjustments || { enabled:false, scope:"supplier", valueType:"percentage", showToSuppliers:false, transformations:{}, lineItemTransformations:{} };
          const updPA = (patch) => updLot({ priceAdjustments: { ...pa, ...patch } });
          const assignedSuppliers = auction.suppliers.filter(s => lot.requiredSuppliers?.includes(s.id));
          const hScope = pa.scope || "supplier";
          const vType = pa.valueType || "percentage";
          const tf = pa.transformations || {};
          const litf = pa.lineItemTransformations || {};
          const basePrice = parseFloat(lot.baselinePrice) || 0;
          const calcImpact = (base, direction, value) => {
            const b = parseFloat(base)||0, v = parseFloat(value)||0;
            if (!b||!v) return b;
            if (vType==="percentage") return direction==="+" ? b*(1+v/100) : b*(1-v/100);
            return direction==="+" ? b+v : b-v;
          };
          const configuredCount = assignedSuppliers.filter(s => {
            if (hScope==="supplier") return parseFloat(tf[s.id]?.value)>0;
            return (lot.lineItems||[]).some(li => parseFloat(litf[s.id]?.[li.id]?.value)>0);
          }).length;

          const inpStyle = {};
          const fldLbl = (text) => (
            <div style={{ fontSize:12,fontWeight:400,color:"#1D1D1B",marginBottom:6 }}>{text}</div>
          );

          const secHdr = (id, icon, label, badge, body) => {
            const open = isSecOpen(lot.id, id);
            return (
              <div style={{ borderTop:`1px solid ${C.grey100}` }}>
                <div onClick={() => toggleSec(lot.id, id)}
                  style={{ display:"flex",justifyContent:"space-between",alignItems:"center",
                    padding:"10px 20px",cursor:"pointer",userSelect:"none",background:C.surface }}>
                  <div style={{ display:"flex",alignItems:"center",gap:8 }}>
                    <span style={{ fontSize:13,lineHeight:1 }}>{icon}</span>
                    <span style={{ fontSize:12,fontWeight:500,textTransform:"uppercase",letterSpacing:".07em",color:C.t2 }}>{label}</span>
                    {badge}
                  </div>
                  <span style={{ color:C.grey300,fontSize:18,lineHeight:1,fontWeight:300 }}>{open?"−":"+"}</span>
                </div>
                {open && <div style={{ padding:"0 20px 20px",background:C.surface }}>{body}</div>}
              </div>
            );
          };

          const cardStyle = { background:C.surface,border:`1px solid ${C.grey150}`,borderRadius:8,overflow:"hidden" };
          const cardHead = (icon,label,right) => (
            <div style={{ display:"flex",alignItems:"center",gap:8,padding:"10px 20px" }}>
              <span style={{ fontSize:13,lineHeight:1 }}>{icon}</span>
              <span style={{ fontSize:12,fontWeight:500,textTransform:"uppercase",letterSpacing:".07em",color:C.t2 }}>{label}</span>
              {right && <span style={{ marginLeft:"auto" }}>{right}</span>}
            </div>
          );
          return (
            <div style={{ display:"flex",flexDirection:"column",gap:4 }}>

              {/* ── CARD 1: LOT SETTINGS ── */}
              <div style={cardStyle}>
                {cardHead("📋","Lot Settings",settingsDone ? <Badge type="done">Done</Badge> : <Badge type="required">Required</Badge>)}
                <div style={{ padding:"16px 20px" }}>
                  {!isDynamic ? (
                    <div style={{ display:"flex",alignItems:"flex-end",gap:12 }}>
                      <Field label="Lot name" style={{ flex:2 }}>
                        <input value={lot.name} onChange={e=>updLot({name:e.target.value})} placeholder="e.g. Corporate Catering"/>
                      </Field>
                      <Field label={<span>Duration <InfoBtn k="duration"/></span>} style={{ flex:1 }}>
                        <select value={lot.duration||"10 min"} onChange={e=>updLot({duration:e.target.value})}>
                          {DURATION_OPTIONS.map(d=><option key={d}>{d}</option>)}
                        </select>
                      </Field>
                      <Field label={<span>Overtime <InfoBtn k="overtime"/></span>} style={{ flex:1 }}>
                        <select value={lot.overtimeMin||"1 min"} onChange={e=>updLot({overtimeMin:e.target.value})}>
                          {OVERTIME_OPTIONS.map(o=><option key={o}>{o}</option>)}
                        </select>
                      </Field>
                    </div>
                  ) : (
                    <div style={{ display:"flex",alignItems:"flex-end",gap:12 }}>
                      <Field label="Lot name" style={{ flex:2 }}>
                        <input value={lot.name} onChange={e=>updLot({name:e.target.value})} placeholder="e.g. Raw Materials"/>
                      </Field>
                      <Field label={<span>Duration <InfoBtn k="duration"/></span>} style={{ flex:1 }}>
                        <select value={lot.duration||"5 min"} onChange={e=>updLot({duration:e.target.value})}>
                          {DURATION_OPTIONS.map(d=><option key={d}>{d}</option>)}
                        </select>
                      </Field>
                      <Field label={<span>Round Duration <InfoBtn k="roundDuration"/></span>} style={{ flex:1 }}>
                        <select value={lot.dynRoundDuration||"1 min"} onChange={e=>updLot({dynRoundDuration:e.target.value})}>
                          {ROUND_DURATION_OPTIONS.map(d=><option key={d}>{d}</option>)}
                        </select>
                      </Field>
                    </div>
                  )}
                </div>
              </div>

              {/* ── CARD 2: LINE ITEMS & SUPPLIERS ── */}
              <div style={cardStyle}>
                {cardHead("📦","Line Items & Suppliers",itemsDone ? <Badge type="info">{isDynamic?"1 item":`${namedItems.length} item${namedItems.length!==1?"s":""}`}</Badge> : <Badge type="required">Required</Badge>)}
                <>
                  {auction.suppliers.length === 0 && (
                    <div style={{ fontSize:13,color:C.t3,padding:"10px 20px" }}>No suppliers added yet — go to the Suppliers step to invite participants. Supplier columns will appear here once added.</div>
                  )}
                    <div className="lt-wrap">
                      {(() => {
                        const toggleSupplier = (sid) => updLot({ requiredSuppliers: lot.requiredSuppliers.includes(sid) ? lot.requiredSuppliers.filter(x=>x!==sid) : [...lot.requiredSuppliers, sid] });
                        return isDynamic ? (
                          <>
                            <LtHead allSuppliers={auction.suppliers} requiredSuppliers={lot.requiredSuppliers} onToggleSupplier={toggleSupplier} isDynamic={true}/>
                            <LtDynRow dynItem={lot.dynItem} allSuppliers={auction.suppliers} requiredSuppliers={lot.requiredSuppliers} onUpdate={p=>updLot({dynItem:{...lot.dynItem,...p}})} cur={cur}/>
                          </>
                        ) : (
                          <>
                            <LtHead allSuppliers={auction.suppliers} requiredSuppliers={lot.requiredSuppliers} onToggleSupplier={toggleSupplier} isDynamic={false}/>
                            {lot.lineItems.map(li=>(
                              <LtItemRow key={li.id} item={li} allSuppliers={auction.suppliers} requiredSuppliers={lot.requiredSuppliers} onUpdate={updItem} onDelete={()=>delItem(li.id)} cur={cur}/>
                            ))}
                            <LtTotalRow items={lot.lineItems} allSuppliers={auction.suppliers} requiredSuppliers={lot.requiredSuppliers} cur={cur}/>
                          </>
                        );
                      })()}
                    </div>
                    {!isDynamic && (
                      <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 20px 16px" }}>
                        <button onClick={addItem}
                          style={{ background:"none",border:"none",cursor:"pointer",display:"flex",alignItems:"center",gap:6,fontFamily:"Poppins,sans-serif",fontSize:13,fontWeight:400,color:C.t1,padding:"4px 0" }}>
                          <IcoPlusCircle size={14} color={C.green}/> Add item
                        </button>
                        <span/>
                      </div>
                    )}

                    {/* (handicap panel moved to separate card below) */}
                    {false && (() => {
                      const setTF = (supplierId, patch) => updPA({ transformations: { ...tf, [supplierId]: { ...(tf[supplierId]||{direction:"+",value:""}), ...patch } } });
                      const setLiTF = (supplierId, liId, patch) => {
                        const sup = litf[supplierId]||{}, li = sup[liId]||{direction:"+",value:""};
                        updPA({ lineItemTransformations: { ...litf, [supplierId]: { ...sup, [liId]: {...li,...patch} } } });
                      };
                      const fmtPrice = (n) => `${cur} ${Math.round(n).toLocaleString("en-US")}`;
                      const fmtDiff  = (diff) => diff>=0 ? `(+${Math.round(Math.abs(diff)).toLocaleString("en-US")})` : `(${Math.round(diff).toLocaleString("en-US")})`;
                      const SegControl = ({options,value,onChange}) => (
                        <div style={{ display:"inline-flex",borderRadius:6,overflow:"hidden",border:`1px solid ${C.divider}` }}>
                          {options.map(o=>(
                            <button key={String(o.v)} onClick={()=>onChange(o.v)}
                              style={{ padding:"5px 14px",fontSize:13,fontWeight:value===o.v?600:400,fontFamily:"Poppins,sans-serif",
                                background:value===o.v?C.grey900:C.surface,color:value===o.v?"#fff":C.t2,
                                border:"none",cursor:"pointer",transition:"all .15s",whiteSpace:"nowrap" }}>
                              {o.l}
                            </button>
                          ))}
                        </div>
                      );
                      const DirToggle = ({direction,onChange}) => (
                        <div style={{ display:"inline-flex",borderRadius:6,overflow:"hidden",border:`1px solid ${C.divider}` }}>
                          {["+","-"].map(d=>(
                            <button key={d} onClick={()=>onChange(d)}
                              style={{ width:32,height:30,fontSize:15,fontFamily:"Poppins,sans-serif",
                                background:direction===d?C.grey900:C.surface,color:direction===d?"#fff":C.t2,
                                border:"none",cursor:"pointer",transition:"all .15s" }}>
                              {d}
                            </button>
                          ))}
                        </div>
                      );
                      const TypeBadge = ({direction,value}) => {
                        if (!parseFloat(value)) return null;
                        const isAdd = direction==="+";
                        return <span style={{ fontSize:11,fontWeight:600,padding:"2px 8px",borderRadius:20,background:isAdd?C.red100:C.greenLight,color:isAdd?C.red800:C.green800 }}>{isAdd?"Penalty":"Advantage"}</span>;
                      };
                      const SUP_COL = ["#00CE7C","#1A49A9","#9F580A","#5521B5","#E02424","#8C2300"];
                      return (
                        <div style={{ margin:"0 20px 16px",border:`1px solid ${C.purple100}`,borderRadius:8,background:"#faf9ff",overflow:"hidden" }}>
                          <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",padding:"10px 14px",borderBottom:`1px solid ${C.purple100}` }}>
                            <div style={{ display:"flex",alignItems:"center",gap:8 }}>
                              <span style={{ fontSize:12,fontWeight:600,color:C.purpleT,textTransform:"uppercase",letterSpacing:"0.08em" }}>⚡ Price Adjustments</span>
                              {configuredCount>0 && <span style={{ fontSize:11,background:C.purple100,color:C.purpleT,padding:"1px 8px",borderRadius:20 }}>{configuredCount} configured</span>}
                            </div>
                            <div style={{ display:"flex",alignItems:"center",gap:10 }}>
                              <span style={{ fontSize:12,color:C.t3 }}>Scope:</span>
                              <SegControl options={[{v:"supplier",l:"Per supplier"},{v:"lineItem",l:"Per item"}]} value={hScope} onChange={v=>updPA({scope:v})}/>
                              <span style={{ fontSize:12,color:C.t3 }}>Type:</span>
                              <SegControl options={[{v:"percentage",l:"%"},{v:"fixed",l:cur}]} value={vType} onChange={v=>updPA({valueType:v})}/>
                            </div>
                          </div>
                          {assignedSuppliers.length===0 ? (
                            <div style={{ padding:"16px",fontSize:13,color:C.t3 }}>No suppliers assigned to this lot.</div>
                          ) : (
                            <div style={{ padding:"10px 14px",display:"flex",flexDirection:"column",gap:8 }}>
                              {assignedSuppliers.map((s,si) => {
                                const supKey = `${lot.id}-${s.id}`;
                                const isExpanded = !!expandedSuppliers[supKey];
                                const col = SUP_COL[si%SUP_COL.length];
                                if (hScope==="supplier") {
                                  const t = tf[s.id]||{direction:"+",value:""};
                                  const adjusted = calcImpact(basePrice,t.direction,t.value);
                                  const diff = adjusted - basePrice;
                                  return (
                                    <div key={s.id} style={{ display:"flex",alignItems:"center",gap:10,padding:"10px 14px",background:C.surface,borderRadius:7,border:`1px solid ${C.divider}` }}>
                                      <div style={{ width:8,height:8,borderRadius:"50%",background:col,flexShrink:0 }}/>
                                      <span style={{ fontSize:13,fontWeight:500,minWidth:120,color:C.t1 }}>{s.name}</span>
                                      <DirToggle direction={t.direction} onChange={d=>setTF(s.id,{direction:d})}/>
                                      <div style={{ position:"relative",display:"flex",alignItems:"center",width:90 }}>
                                        <input type="number" value={t.value} onChange={e=>setTF(s.id,{value:e.target.value})}
                                          placeholder="0" style={{ height:30,fontSize:13,paddingRight:24,width:"100%" }}/>
                                        <span style={{ position:"absolute",right:8,fontSize:12,color:C.t3,pointerEvents:"none" }}>
                                          {vType==="percentage"?"%":cur}
                                        </span>
                                      </div>
                                      <TypeBadge direction={t.direction} value={t.value}/>
                                      {basePrice>0&&parseFloat(t.value)>0 && (
                                        <div style={{ marginLeft:"auto",fontSize:13,fontWeight:500,color:C.t1 }}>
                                          {fmtPrice(adjusted)}<span style={{ fontSize:12,marginLeft:4,color:diff>0?C.red600:C.green800 }}>{fmtDiff(diff)}</span>
                                        </div>
                                      )}
                                    </div>
                                  );
                                } else {
                                  const items = lot.lineItems||[];
                                  const hasAny = items.some(li=>parseFloat(litf[s.id]?.[li.id]?.value)>0);
                                  return (
                                    <div key={s.id} style={{ border:`1px solid ${C.divider}`,borderRadius:7,overflow:"hidden" }}>
                                      <div onClick={()=>setExpandedSuppliers(prev=>({...prev,[supKey]:!isExpanded}))}
                                        style={{ display:"flex",alignItems:"center",gap:10,padding:"10px 14px",background:C.surface,cursor:"pointer" }}>
                                        <div style={{ width:8,height:8,borderRadius:"50%",background:col,flexShrink:0 }}/>
                                        <span style={{ fontSize:13,fontWeight:500,color:C.t1 }}>{s.name}</span>
                                        {hasAny && <span style={{ fontSize:11,background:C.purple100,color:C.purpleT,padding:"1px 8px",borderRadius:20 }}>configured</span>}
                                        <span style={{ marginLeft:"auto",color:C.t3,fontSize:16 }}>{isExpanded?"−":"+"}</span>
                                      </div>
                                      {isExpanded && (
                                        <div style={{ borderTop:`1px solid ${C.grey100}` }}>
                                          {items.map(li => {
                                            const t = litf[s.id]?.[li.id]||{direction:"+",value:""};
                                            const liBase = parseFloat(li.prices?.[s.id])||(basePrice/(items.length||1));
                                            const adjusted = calcImpact(liBase,t.direction,t.value);
                                            const diff = adjusted - liBase;
                                            return (
                                              <div key={li.id} style={{ display:"grid",gridTemplateColumns:"1fr 80px 80px 90px 1fr",
                                                gap:10,alignItems:"center",padding:"10px 14px",borderBottom:`1px solid ${C.grey100}` }}>
                                                <span style={{ fontSize:13,color:C.t2 }}>{li.name||"Unnamed item"}</span>
                                                <DirToggle direction={t.direction} onChange={d=>setLiTF(s.id,li.id,{direction:d})}/>
                                                <div style={{ position:"relative",display:"flex",alignItems:"center" }}>
                                                  <input type="number" value={t.value} onChange={e=>setLiTF(s.id,li.id,{value:e.target.value})}
                                                    placeholder="0" style={{ height:30,fontSize:12,paddingRight:24 }}/>
                                                  <span style={{ position:"absolute",right:8,fontSize:12,color:C.t3,pointerEvents:"none" }}>
                                                    {vType==="percentage"?"%":cur}
                                                  </span>
                                                </div>
                                                <TypeBadge direction={t.direction} value={t.value}/>
                                                <div style={{ textAlign:"right",fontSize:13,fontWeight:500,color:C.t1 }}>
                                                  {liBase>0&&parseFloat(t.value)>0 ? (
                                                    <>{fmtPrice(adjusted)}<span style={{ fontSize:12,marginLeft:4,color:diff>0?C.red600:C.green800 }}>{fmtDiff(diff)}</span></>
                                                  ) : fmtPrice(liBase)}
                                                </div>
                                              </div>
                                            );
                                          })}
                                        </div>
                                      )}
                                    </div>
                                  );
                                }
                              })}
                            </div>
                          )}
                        </div>
                      );
                    })()}
                </>
              </div>

              {/* ── CARD 2.5: PRICE ADJUSTMENTS (HANDICAPS) ── */}
              {auction.archPriceAdjustments && (() => {
                const fmtN = (n) => Math.round(n).toLocaleString("en-US");
                const setTF = (supId, patch) => updPA({ transformations: { ...tf, [supId]: { ...(tf[supId]||{direction:"+",value:""}), ...patch } } });
                // Bonus = "-" dir → ref*(1+v/100) displayed higher; Penalty = "+" dir → ref*(1-v/100) displayed lower
                const calcAdj = (ref, dir, val) => {
                  const b = parseFloat(ref)||0, v = parseFloat(val)||0;
                  if (!b||!v) return b;
                  if (vType==="percentage") return dir==="-" ? b*(1+v/100) : b*(1-v/100);
                  return dir==="-" ? b+v : b-v;
                };
                const configuredCount = assignedSuppliers.filter(s=>parseFloat(tf[s.id]?.value)>0).length;
                const SUP_COL = ["#00CE7C","#1A49A9","#9F580A","#5521B5","#E02424","#8C2300"];

                // Price grid data (dynamic)
                const durSec2 = toSec(lot.duration||"5 min");
                const rdSec2  = toSec(lot.dynRoundDuration||"1 min");
                const totalRounds = rdSec2>0 ? Math.max(1,Math.min(Math.floor(durSec2/rdSec2),30)) : 0;
                const increment = parseFloat(lot.dynRoundIncrement)||0;
                const endPrice  = parseFloat(lot.dynEndingPrice)||0;
                const isJap = auction.archPriceDirection==="japanese";
                const startPrice = isJap ? endPrice : Math.max(0, endPrice - increment*(totalRounds-1));
                const getRef = (r) => isJap ? startPrice - increment*(r-1) : startPrice + increment*(r-1);
                const showGrid = isDynamic && totalRounds>0 && endPrice>0 && increment>0 && assignedSuppliers.length>0;

                return (
                <div style={cardStyle}>
                  {/* Header */}
                  <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",padding:"12px 20px",borderBottom:`1px solid ${C.divider}` }}>
                    <div style={{ display:"flex",alignItems:"center",gap:10 }}>
                      <span style={{ fontSize:11,fontWeight:700,color:C.t2,textTransform:"uppercase",letterSpacing:"0.08em" }}>⚡ Transformation</span>
                      {configuredCount>0 && <span style={{ fontSize:11,fontWeight:500,padding:"2px 8px",borderRadius:4,background:"#EBFFF7",color:"#1B7A4A" }}>Active</span>}
                    </div>
                    <div style={{ display:"inline-flex",borderRadius:6,border:`1px solid ${C.divider}`,overflow:"hidden" }}>
                      {[{v:"percentage",l:"Percentage (%)"},{v:"fixed",l:"Fixed value"}].map(o=>(
                        <button key={o.v} onClick={()=>updPA({valueType:o.v})}
                          style={{ padding:"5px 14px",fontSize:12,fontFamily:"Poppins,sans-serif",
                            background:vType===o.v?C.t1:C.surface,color:vType===o.v?"#fff":C.t2,
                            border:"none",cursor:"pointer",fontWeight:vType===o.v?600:400 }}>
                          {o.l}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Supplier cards grid */}
                  <div style={{ padding:"16px 20px",display:"flex",flexWrap:"wrap",gap:12 }}>
                    {assignedSuppliers.length===0 ? (
                      <div style={{ fontSize:13,color:C.t3 }}>No suppliers assigned to this lot yet.</div>
                    ) : assignedSuppliers.map((s,si)=>{
                      const col = SUP_COL[si%SUP_COL.length];
                      const t = tf[s.id]||{direction:"+",value:""};
                      const val = parseFloat(t.value)||0;
                      const isBonus = t.direction==="-";
                      const hasVal = val>0;
                      return (
                        <div key={s.id} style={{ flex:"1 1 calc(33% - 12px)",minWidth:180,
                          border:`1.5px solid ${hasVal?(isBonus?"#BBF0DC":"#FECACA"):C.divider}`,
                          borderRadius:8,background:hasVal?(isBonus?"#F0FBF5":"#FFF5F5"):C.surface,
                          padding:"12px 14px",display:"flex",flexDirection:"column",gap:10 }}>
                          {/* Top: dot + name + badge */}
                          <div style={{ display:"flex",alignItems:"center",gap:8 }}>
                            <div style={{ width:8,height:8,borderRadius:"50%",background:col,flexShrink:0 }}/>
                            <span style={{ fontSize:13,fontWeight:500,color:C.t1,flex:1 }}>{s.name}</span>
                            {hasVal && (
                              <span style={{ fontSize:11,fontWeight:600,padding:"2px 8px",borderRadius:4,
                                background:isBonus?"#EBFFF7":"#FEF2F2",color:isBonus?"#1B7A4A":"#DC2626" }}>
                                {isBonus?"Bonus":"Penalty"}
                              </span>
                            )}
                          </div>
                          {/* Bottom: +/- toggle + input */}
                          <div style={{ display:"flex",alignItems:"center",gap:8 }}>
                            <div style={{ display:"inline-flex",borderRadius:6,overflow:"hidden",border:`1px solid ${C.divider}` }}>
                              {["+","-"].map(d=>(
                                <button key={d} onClick={()=>setTF(s.id,{direction:d})}
                                  style={{ width:32,height:32,fontSize:16,fontFamily:"Poppins,sans-serif",fontWeight:600,
                                    background:t.direction===d?(d==="+"?"#FEF2F2":"#EBFFF7"):C.surface,
                                    color:t.direction===d?(d==="+"?"#DC2626":"#1B7A4A"):C.t3,
                                    border:"none",cursor:"pointer" }}>
                                  {d}
                                </button>
                              ))}
                            </div>
                            <div style={{ position:"relative",flex:1 }}>
                              <input type="number" value={t.value} onChange={e=>setTF(s.id,{value:e.target.value})}
                                placeholder="0" style={{ width:"100%",fontSize:13,paddingRight:28,height:32 }}/>
                              <span style={{ position:"absolute",right:8,top:"50%",transform:"translateY(-50%)",fontSize:12,color:C.t3,pointerEvents:"none" }}>
                                {vType==="percentage"?"%":cur}
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Price Grid Preview — removed, handicaps shown in existing Price Grid below */}
                  {false && showGrid && (
                    <div style={{ borderTop:`1px solid ${C.divider}`,padding:"0 20px 20px" }}>
                      {/* Header */}
                      <div style={{ display:"flex",alignItems:"center",gap:10,padding:"12px 0 10px" }}>
                        <span style={{ fontSize:13,fontWeight:600,color:C.t1 }}>Price grid preview — {isJap?"Japanese":"Dutch"} auction</span>
                        <span style={{ fontSize:12,color:C.t3 }}>{totalRounds} rounds</span>
                      </div>
                      {/* Legend */}
                      <div style={{ display:"flex",alignItems:"center",gap:16,marginBottom:12,flexWrap:"wrap" }}>
                        <div style={{ display:"flex",alignItems:"center",gap:6 }}>
                          <div style={{ width:22,height:2,background:C.t3 }}/><span style={{ fontSize:12,color:C.t3 }}>Reference grid</span>
                        </div>
                        {assignedSuppliers.map((s,si)=>{
                          const col=SUP_COL[si%SUP_COL.length];
                          const t=tf[s.id]||{direction:"+",value:""};
                          const val=parseFloat(t.value)||0;
                          const lbl=val>0?` (${t.direction==="+"?"+":"-"}${val}${vType==="percentage"?"%":""})` : "";
                          return <div key={s.id} style={{ display:"flex",alignItems:"center",gap:6 }}><div style={{ width:22,height:2,background:col }}/><span style={{ fontSize:12,color:C.t2 }}>{s.name}{lbl}</span></div>;
                        })}
                      </div>
                      {/* Table */}
                      <div style={{ overflowX:"auto",border:`1px solid ${C.divider}`,borderRadius:6 }}>
                        <table style={{ width:"100%",borderCollapse:"collapse",fontSize:12 }}>
                          <thead>
                            <tr style={{ background:C.grey50 }}>
                              <th style={{ padding:"8px 10px",textAlign:"left",fontWeight:400,color:C.t2,borderBottom:`1px solid ${C.divider}`,minWidth:60 }}>Round</th>
                              <th style={{ padding:"8px 10px",textAlign:"right",fontWeight:400,color:C.t2,borderBottom:`1px solid ${C.divider}`,minWidth:80 }}>Reference</th>
                              {assignedSuppliers.map((s,si)=>{
                                const col=SUP_COL[si%SUP_COL.length];
                                const t=tf[s.id]||{direction:"+",value:""};
                                const val=parseFloat(t.value)||0;
                                const lbl=val>0?` (${t.direction==="+"?"+":"-"}${val}${vType==="percentage"?"%":""})` : "";
                                return (
                                  <th key={s.id} style={{ padding:"8px 10px",textAlign:"right",fontWeight:400,color:col,borderBottom:`1px solid ${C.divider}`,minWidth:90 }}>
                                    <span style={{ display:"inline-flex",alignItems:"center",justifyContent:"flex-end",gap:5 }}>
                                      <span style={{ width:6,height:6,borderRadius:"50%",background:col,display:"inline-block" }}/>
                                      {s.name}{lbl}
                                    </span>
                                  </th>
                                );
                              })}
                              <th style={{ padding:"8px 10px",textAlign:"right",fontWeight:400,color:C.t2,borderBottom:`1px solid ${C.divider}` }}>Increment</th>
                            </tr>
                          </thead>
                          <tbody>
                            {Array.from({length:totalRounds},(_,i)=>i+1).map(r=>{
                              const ref=getRef(r);
                              const isFirst=r===1, isLast=r===totalRounds;
                              const bg=(isFirst||isLast)?C.grey50:"#fff";
                              const prevRef=r>1?getRef(r-1):null;
                              return (
                                <tr key={r} style={{ borderBottom:`1px solid ${C.divider}` }}>
                                  <td style={{ padding:"7px 10px",fontWeight:600,color:C.t1,background:bg }}>
                                    {r}
                                    {isFirst&&<span style={{ fontSize:10,fontWeight:400,color:C.t3,marginLeft:4 }}>{isJap?"ceiling":"floor"}</span>}
                                    {isLast&&!isFirst&&<span style={{ fontSize:10,fontWeight:400,color:C.t3,marginLeft:4 }}>{isJap?"floor":"ceiling"}</span>}
                                  </td>
                                  <td style={{ padding:"7px 10px",textAlign:"right",color:C.t3,background:bg }}>{fmtN(ref)}</td>
                                  {assignedSuppliers.map((s,si)=>{
                                    const col=SUP_COL[si%SUP_COL.length];
                                    const t=tf[s.id]||{direction:"+",value:""};
                                    const adj=calcAdj(ref,t.direction,t.value);
                                    const diff=adj-ref;
                                    return (
                                      <td key={s.id} style={{ padding:"7px 10px",textAlign:"right",fontWeight:600,color:C.t1,background:bg }}>
                                        {fmtN(adj)}
                                        {diff!==0&&<span style={{ fontSize:10,fontWeight:400,color:diff>0?"#1B7A4A":"#DC2626",marginLeft:4 }}>{diff>0?"+":""}{fmtN(diff)}</span>}
                                      </td>
                                    );
                                  })}
                                  <td style={{ padding:"7px 10px",textAlign:"right",color:C.t3,background:bg,fontSize:11 }}>
                                    {prevRef!==null&&(()=>{
                                      const refStep=ref-prevRef;
                                      const adjSteps=assignedSuppliers.map((s,si)=>{
                                        const col=SUP_COL[si%SUP_COL.length];
                                        const t=tf[s.id]||{direction:"+",value:""};
                                        return {col,step:calcAdj(ref,t.direction,t.value)-calcAdj(prevRef,t.direction,t.value)};
                                      }).filter(x=>Math.abs(x.step-refStep)>0.5);
                                      return (
                                        <span style={{ display:"inline-flex",alignItems:"center",gap:4,flexWrap:"wrap",justifyContent:"flex-end" }}>
                                          {adjSteps.map((x,i)=><span key={i} style={{ color:x.col,fontWeight:500 }}>{x.step>0?"+":""}{fmtN(x.step)}</span>)}
                                          {adjSteps.length>0&&<span style={{ color:C.t3 }}>vs</span>}
                                          <span style={{ color:C.t3 }}>{refStep>0?"+":""}{fmtN(refStep)}</span>
                                        </span>
                                      );
                                    })()}
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                </div>
                );
              })()}

              {/* ── CARD 3: PRICING RULES ── */}
              <div style={cardStyle}>
                {cardHead("💰","Pricing Rules",pricingDone ? <Badge type="done">Done</Badge> : <Badge type="required">Required</Badge>)}
                <div style={{ padding:"16px 20px" }}>
                  <>
                    {/* Simple auction pricing */}
                    {!isDynamic && (() => {
                      const durMin = toSec(lot.duration||"10 min")/60;
                      const bp=basePrice;
                      const chartSuppliers=auction.suppliers.filter(s=>lot.requiredSuppliers?.includes(s.id));
                      const getSupTotal=(supId)=>(lot.lineItems||[]).reduce((sum,li)=>sum+(parseFloat(li.prices?.[supId])||0)*(parseFloat(li.quantity)||0),0);
                      const suppliersWithTotal=chartSuppliers.filter(s=>getSupTotal(s.id)>0);
                      const hasData=bp>0;
                      const fmtV=n=>{if(Math.abs(n)>=1000000)return`${(n/1000000).toFixed(1)}M`;if(Math.abs(n)>=1000)return`${(n/1000).toFixed(0)}K`;return Math.round(n).toLocaleString("en-US");};
                      /* Chart scale: baseline at top, supplier prices below */
                      const totalQtyChart=(lot.lineItems||[]).reduce((s,li)=>s+(parseFloat(li.quantity)||0),0);
                      const bpTotal = bp>0&&totalQtyChart>0 ? bp*totalQtyChart : bp;
                      const W=900,H=230,PL=72,PR=20,PT=22,PB=38,iW=W-PL-PR,iH=H-PT-PB;
                      const allTotals=suppliersWithTotal.map(s=>getSupTotal(s.id));
                      /* top = baseline + 6% headroom; bottom = lowest supplier price - 8%, or baseline*0.7 if no suppliers */
                      const topVal=bpTotal>0?bpTotal*1.06:1000;
                      const minSupTotal=allTotals.length>0?Math.min(...allTotals):0;
                      const botVal=minSupTotal>0?minSupTotal*0.92:(bpTotal>0?bpTotal*0.75:topVal*0.7);
                      const yMax=topVal,yMin=Math.max(0,botVal),yRange=yMax-yMin||1;
                      const toY=p=>PT+iH-((p-yMin)/yRange)*iH;
                      const toX=t=>PL+(t/(durMin||1))*iW;
                      const rawStep=(yMax-yMin)/4,mag=Math.pow(10,Math.floor(Math.log10(rawStep||1)));
                      const yTicks=Array.from({length:5},(_,i)=>{const v=yMin+i*(yMax-yMin)/4;return Math.round(v/(mag/2||1))*(mag/2||1);});
                      const totalQty = (lot.lineItems||[]).reduce((s,li)=>s+(parseFloat(li.quantity)||0),0);
                      const fmtHint = (val) => {
                        const v = parseFloat(val)||0;
                        if (!v || !totalQty) return null;
                        const t = v * totalQty;
                        return `= ${cur} ${t.toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2})} total`;
                      };
                      const PriceHint = ({val}) => {
                        const hint = fmtHint(val);
                        return hint
                          ? <div style={{fontSize:10,color:C.t3,marginTop:4}}>{hint}</div>
                          : <div style={{fontSize:10,color:C.grey200,marginTop:4}}>× qty = total</div>;
                      };
                      return (
                        <>
                          <div style={{ marginBottom:14 }}>
                            <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:12 }}>
                              <div>
                                {fldLbl(<span>Baseline ({cur})* <InfoBtn k="baseline"/></span>)}
                                <input type="number" value={lot.baselinePrice||""} placeholder="0.00" style={inpStyle} onChange={e=>updLot({baselinePrice:e.target.value})}/>
                                <PriceHint val={lot.baselinePrice}/>
                              </div>
                              <div>
                                {fldLbl(<span>Min bid step ({cur})* <InfoBtn k="minDec"/></span>)}
                                <input type="number" value={lot.minDec} onChange={e=>updLot({minDec:e.target.value})} placeholder="1" style={inpStyle}/>
                                <PriceHint val={lot.minDec}/>
                              </div>
                              <div>
                                {fldLbl(<span>Max bid step ({cur})* <InfoBtn k="maxDec"/></span>)}
                                <input type="number" value={lot.maxDec} onChange={e=>updLot({maxDec:e.target.value})} placeholder="1" style={inpStyle}/>
                                <PriceHint val={lot.maxDec}/>
                              </div>
                            </div>
                          </div>
                          {/* eAuction Preview */}
                          <div style={{ marginBottom:4 }}>
                            <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:8 }}>
                              <span style={{ fontSize:12,fontWeight:500,color:C.t2,textTransform:"uppercase",letterSpacing:"0.07em" }}>eAuction Preview</span>
                              {suppliersWithTotal.length>0 && (
                                <div style={{ display:"flex",gap:12 }}>
                                  {suppliersWithTotal.map((s,si)=>{
                                    const SUP_PASTELS=["#6BA3D6","#A78BFA","#F59E7A","#60BFB0","#F472B6","#A3C45A"];
                                    return (
                                      <div key={s.id} style={{ display:"flex",alignItems:"center",gap:4,fontSize:12,color:C.t2 }}>
                                        <div style={{ width:14,height:2,borderRadius:1,background:SUP_PASTELS[si%SUP_PASTELS.length] }}/>
                                        {s.name}
                                      </div>
                                    );
                                  })}
                                </div>
                              )}
                            </div>
                            <div style={{ background:"#fff",border:`1px solid ${C.divider}`,borderRadius:6,overflow:"hidden" }}>
                              {(() => {
                                const SUP_PASTELS = ["#6BA3D6","#A78BFA","#F59E7A","#60BFB0","#F472B6","#A3C45A"];
                                return (
                                  <svg width="100%" viewBox={`0 0 ${W} ${H}`} style={{ display:"block" }}>
                                    {/* Y-axis label — inside left margin */}
                                    <text x={16} y={H/2} textAnchor="middle" fontSize={9} fill={C.t3} transform={`rotate(-90,16,${H/2})`}>Price ({cur})</text>
                                    {/* Y-axis ticks */}
                                    {yTicks.map((p,i)=>(
                                      <g key={i}>
                                        <line x1={PL} y1={toY(p)} x2={W-PR} y2={toY(p)} stroke={C.divider} strokeDasharray="5,4" strokeWidth={0.7}/>
                                        <text x={PL-5} y={toY(p)+4} textAnchor="end" fontSize={10} fill={C.t3}>{fmtV(p)}</text>
                                      </g>
                                    ))}
                                    {/* Shaded area between baseline and lowest supplier price */}
                                    {bpTotal>0&&minSupTotal>0&&<rect x={PL} y={toY(bpTotal)} width={iW} height={toY(minSupTotal)-toY(bpTotal)} fill="#F0FBF5" opacity={0.6}/>}
                                    {/* Baseline — green */}
                                    {bpTotal>0&&(<><line x1={PL} y1={toY(bpTotal)} x2={W-PR} y2={toY(bpTotal)} stroke={C.green} strokeWidth={2}/><text x={PL+8} y={toY(bpTotal)-5} fontSize={10} fontWeight="600" fill={C.green}>Baseline · {cur} {fmtV(bpTotal)}</text></>)}
                                    {/* Supplier ceiling lines — pastel, no text labels */}
                                    {suppliersWithTotal.map((s,si)=>{
                                      const total=getSupTotal(s.id);
                                      const col=SUP_PASTELS[si%SUP_PASTELS.length];
                                      return <line key={s.id} x1={PL} y1={toY(total)} x2={W-PR} y2={toY(total)} stroke={col} strokeWidth={1.5} strokeDasharray="5,4"/>;
                                    })}
                                    {/* X-axis ticks */}
                                    {(()=>{
                                      const step=durMin<=10?2:durMin<=20?4:5,tks=[];
                                      for(let t=0;t<=durMin;t+=step)tks.push(t);
                                      if(tks[tks.length-1]!==durMin)tks.push(durMin);
                                      return tks.map((t,i)=><g key={i}><line x1={toX(t)} y1={H-PB+4} x2={toX(t)} y2={H-PB} stroke={C.divider} strokeWidth={0.8}/><text x={toX(t)} y={H-PB+14} textAnchor="middle" fontSize={10} fill={C.t3}>{t}</text></g>);
                                    })()}
                                    {/* X-axis label — inside bottom margin */}
                                    <text x={PL+iW/2} y={H-PB+26} textAnchor="middle" fontSize={9} fill={C.t3}>Duration (min)</text>
                                    {/* Axes */}
                                    <line x1={PL} y1={PT} x2={PL} y2={H-PB} stroke={C.divider} strokeWidth={0.8}/>
                                    <line x1={PL} y1={H-PB} x2={W-PR} y2={H-PB} stroke={C.divider} strokeWidth={0.8}/>
                                  </svg>
                                );
                              })()}
                            </div>
                          </div>
                        </>
                      );
                    })()}

                    {/* Dynamic Japanese pricing */}
                    {isDynamic && auction.dynamicFormat==="japanese" && (() => {
                      const toS2=(s)=>{const n=parseFloat(s);return s&&s.includes("sec")?n:n*60;};
                      const durSec2=toS2(lot.duration||"5 min"),rdSec2=toS2(lot.dynRoundDuration||"1 min");
                      const numRounds2=rdSec2>0?Math.max(1,Math.min(Math.floor(durSec2/rdSec2),30)):0;
                      const japStart=parseFloat(lot.dynEndingPrice)||0;
                      const japDec=parseFloat(lot.dynRoundIncrement)||0;
                      const floorPrice = japStart>0&&japDec>0&&numRounds2>0 ? japStart-japDec*(numRounds2-1) : null;
                      const fmtFloor = (n) => n!==null&&!isNaN(n) ? fmtAmt(n) : "—";
                      const dynQty2 = parseFloat(lot.dynItem?.quantity)||0;
                      const fmtDynHint2 = (val) => {
                        const v = parseFloat(val)||0;
                        if (!v || !dynQty2) return null;
                        return `= ${cur} ${(v*dynQty2).toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2})} total`;
                      };
                      const DynHint2 = ({val}) => {
                        const hint = fmtDynHint2(val);
                        return hint
                          ? <div style={{fontSize:10,color:C.t3,marginTop:4}}>{hint}</div>
                          : <div style={{fontSize:10,color:C.grey200,marginTop:4}}>× qty = total</div>;
                      };
                      const floorTotal = floorPrice!==null&&dynQty2>0 ? floorPrice*dynQty2 : null;
                      const fmtTotalJap = (v) => `${cur} ${v.toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2})}`;
                      return (
                        <div style={{ marginBottom:14 }}>
                          {/* All in one row: Baseline | Starting Price − Decrement = Floor Price */}
                          <div style={{ display:"flex",alignItems:"flex-start",gap:10 }}>
                            {/* Baseline */}
                            <div style={{ flex:1 }}>
                              {fldLbl(<span>Baseline ({cur})* <InfoBtn k="baseline"/></span>)}
                              <input type="number" value={lot.baselinePrice||""} placeholder="0.00" style={inpStyle} onChange={e=>updLot({baselinePrice:e.target.value})}/>
                              <DynHint2 val={lot.baselinePrice}/>
                            </div>

                            {/* divider */}
                            <div style={{ width:1,background:C.grey150,alignSelf:"stretch",marginTop:22,flexShrink:0 }}/>

                            {/* Starting Price */}
                            <div style={{ flex:1 }}>
                              {fldLbl(<span>Starting Price ({cur})* <InfoBtn k="japStartPrice"/></span>)}
                              <input type="number" value={lot.dynEndingPrice||""} placeholder="0.00" style={inpStyle} onChange={e=>updLot({dynEndingPrice:e.target.value})}/>
                              <DynHint2 val={lot.dynEndingPrice}/>
                            </div>

                            {/* − */}
                            <div style={{ fontSize:20,color:C.t3,paddingTop:26,flexShrink:0,lineHeight:1 }}>−</div>

                            {/* Decrement */}
                            <div style={{ flex:1 }}>
                              {fldLbl(<span>Decrement / round ({cur})* <InfoBtn k="japDecrement"/></span>)}
                              <input type="number" value={lot.dynRoundIncrement||""} placeholder="0.00" style={inpStyle} onChange={e=>updLot({dynRoundIncrement:e.target.value})}/>
                              <DynHint2 val={lot.dynRoundIncrement}/>
                            </div>

                            {/* = */}
                            <div style={{ fontSize:20,color:C.t3,paddingTop:26,flexShrink:0,lineHeight:1 }}>=</div>

                            {/* Floor Price (auto-calculated) */}
                            <div style={{ flex:1 }}>
                              {fldLbl(<span>Floor Price <InfoBtn k="startingPrice"/></span>)}
                              <div style={{ display:"flex",alignItems:"center",minHeight:36,padding:"0 10px",
                                background:floorPrice!==null?C.greenLight:C.grey50,
                                border:`1px solid ${floorPrice!==null?"#a7f3d0":C.divider}`,
                                borderRadius:4,fontSize:13,fontWeight:600,
                                color:floorPrice!==null?C.green800:C.t3 }}>
                                {fmtFloor(floorPrice)}
                              </div>
                              {floorTotal!==null
                                ? <div style={{fontSize:10,color:C.t3,marginTop:4}}>= {fmtTotalJap(floorTotal)} total</div>
                                : <div style={{fontSize:10,color:C.grey200,marginTop:4}}>× qty = total</div>}
                            </div>
                          </div>
                        </div>
                      );
                    })()}

                    {/* Dynamic Dutch pricing */}
                    {isDynamic && auction.dynamicFormat==="dutch" && (() => {
                      const toS3=(s)=>{const n=parseFloat(s);return s&&s.includes("sec")?n:n*60;};
                      const numR=Math.max(1,Math.min(Math.floor(toS3(lot.duration||"5 min")/(toS3(lot.dynRoundDuration||"30 sec")||1)),30));
                      const ep=parseFloat(lot.dynEndingPrice)||0,dc=parseFloat(lot.dynRoundIncrement)||0;
                      const sp=ep>0&&dc>0&&numR>0?ep-dc*(numR-1):null;
                      const fmtSP=(n)=>n!==null&&!isNaN(n)?fmtAmt(n):"—";
                      const dynQty3 = parseFloat(lot.dynItem?.quantity)||0;
                      const fmtDynHint3 = (val) => {
                        const v = parseFloat(val)||0;
                        if (!v || !dynQty3) return null;
                        return `= ${cur} ${(v*dynQty3).toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2})} total`;
                      };
                      const DynHint3 = ({val}) => {
                        const hint = fmtDynHint3(val);
                        return hint
                          ? <div style={{fontSize:10,color:C.t3,marginTop:4}}>{hint}</div>
                          : <div style={{fontSize:10,color:C.grey200,marginTop:4}}>× qty = total</div>;
                      };
                      const spTotal = sp!==null&&dynQty3>0 ? sp*dynQty3 : null;
                      const fmtTotal3 = (v) => `${cur} ${v.toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2})}`;
                      return (
                        <div style={{ marginBottom:14 }}>
                          {/* All in one row: Baseline | Ending Price − Decrement = Starting Price */}
                          <div style={{ display:"flex",alignItems:"flex-start",gap:10 }}>
                            {/* Baseline */}
                            <div style={{ flex:1 }}>
                              {fldLbl(<span>Baseline ({cur})* <InfoBtn k="baseline"/></span>)}
                              <input type="number" value={lot.baselinePrice||""} placeholder="0.00" style={inpStyle} onChange={e=>updLot({baselinePrice:e.target.value})}/>
                              <DynHint3 val={lot.baselinePrice}/>
                            </div>

                            {/* divider */}
                            <div style={{ width:1,background:C.grey150,alignSelf:"stretch",marginTop:22,flexShrink:0 }}/>

                            {/* Ending Price */}
                            <div style={{ flex:1 }}>
                              {fldLbl(<span>Ending Price ({cur})* <InfoBtn k="endingPrice"/></span>)}
                              <input type="number" value={lot.dynEndingPrice||""} placeholder="0" style={inpStyle} onChange={e=>updLot({dynEndingPrice:e.target.value})}/>
                              <DynHint3 val={lot.dynEndingPrice}/>
                            </div>

                            {/* − */}
                            <div style={{ fontSize:20,color:C.t3,paddingTop:26,flexShrink:0,lineHeight:1 }}>−</div>

                            {/* Decrement */}
                            <div style={{ flex:1 }}>
                              {fldLbl(<span>Decrement / round ({cur})* <InfoBtn k="decrement"/></span>)}
                              <input type="number" value={lot.dynRoundIncrement||""} placeholder="0" style={inpStyle} onChange={e=>updLot({dynRoundIncrement:e.target.value})}/>
                              <DynHint3 val={lot.dynRoundIncrement}/>
                            </div>

                            {/* = */}
                            <div style={{ fontSize:20,color:C.t3,paddingTop:26,flexShrink:0,lineHeight:1 }}>=</div>

                            {/* Starting Price (auto-calculated) */}
                            <div style={{ flex:1 }}>
                              {fldLbl(<span>Starting Price <InfoBtn k="startingPrice"/></span>)}
                              <div style={{ display:"flex",alignItems:"center",minHeight:36,padding:"0 10px",
                                background:sp!==null?C.greenLight:C.grey50,
                                border:`1px solid ${sp!==null?"#a7f3d0":C.divider}`,
                                borderRadius:4,fontSize:13,fontWeight:600,
                                color:sp!==null?C.green800:C.t3 }}>
                                {fmtSP(sp)}
                              </div>
                              {spTotal!==null
                                ? <div style={{fontSize:10,color:C.t3,marginTop:4}}>= {fmtTotal3(spTotal)} total</div>
                                : <div style={{fontSize:10,color:C.grey200,marginTop:4}}>× qty = total</div>}
                            </div>
                          </div>
                        </div>
                      );
                    })()}

                    {/* Price Grid — always shown for dynamic auctions */}
                    {isDynamic && (() => {
                      const PASTEL_BG   = [C.yellow50,C.blue50,C.purple100,C.orange50,C.green100,C.red100];
                      const PASTEL_BORDER = ["#E8E5A0","#B0D4F1","#C8C0F0","#F0CBA8","#A0DFC0","#F0B0B0"];
                      const PASTEL_TEXT  = [C.yellowT,C.blueT,C.purpleT,C.orangeT,C.green800,C.redT];
                      const isJapanese = auction.dynamicFormat==="japanese";
                      const defaultRd  = isJapanese ? "1 min" : "30 sec";
                      const durSec  = toSec(lot.duration   || (isJapanese?"5 min":"5 min"));
                      const rdSec   = toSec(lot.dynRoundDuration || defaultRd);
                      let totalRounds = rdSec>0 ? Math.floor(durSec/rdSec) : 10;
                      totalRounds = Math.max(1, Math.min(totalRounds, 30));
                      const rounds = Array.from({length:totalRounds},(_,i)=>i+1);

                      const increment  = parseFloat(lot.dynRoundIncrement)||0;
                      const endPrice   = parseFloat(lot.dynEndingPrice)||0;
                      const dynQty     = parseFloat(lot.dynItem?.quantity)||1;
                      const hasData    = basePrice>0 || endPrice>0 || increment>0;

                      /* Price at each round:
                         Japanese: starts at basePrice (ceiling), decreases by increment each round
                         Dutch:    starts at (endPrice - increment*(totalRounds-1)), increases by increment,
                                   ends at endPrice (ceiling). Round 1 = lowest, round N = highest. */
                      const getJapPrice = (r) => {
                        if(basePrice>0 && increment>0) return basePrice - increment*(r-1);
                        if(basePrice>0) return basePrice - (basePrice*0.1/totalRounds)*(r-1);
                        return null;
                      };
                      const getDutchPrice = (r) => {
                        if(endPrice>0 && increment>0){
                          const startP = endPrice - increment*(totalRounds-1);
                          return startP + increment*(r-1);
                        }
                        if(endPrice>0) return endPrice - (endPrice*0.5/totalRounds)*(totalRounds-r);
                        return null;
                      };
                      const getRoundPrice = (r) => isJapanese ? getJapPrice(r) : getDutchPrice(r);

                      /* For Dutch display: reverse so highest round is at top */
                      const displayRounds = isJapanese ? rounds : [...rounds].reverse();

                      const supplierGrid = assignedSuppliers.map((s,si)=>{
                        const t = tf[s.id]||{direction:"+",value:""};
                        const val = parseFloat(t.value)||0;
                        /* ceiling price = price per unit × quantity = total ceiling for this supplier */
                        const ceilingPerUnit = parseFloat(lot.dynItem?.ceilingPrices?.[s.id])||0;
                        const ceilingPrice = ceilingPerUnit * dynQty;
                        let hLabel="";
                        if(val>0){const sign=t.direction==="-"?"\u2013":"+";hLabel=vType==="percentage"?`(${sign}${val}%)`:`(${sign}${val} ${cur})`;}

                        const roundData = rounds.map(r=>{
                          const ref = getRoundPrice(r);
                          if(ref===null) return{ref:null,adj:null,isActive:false};
                          const adj = calcImpact(ref, t.direction, t.value);
                          /* Dutch: active = adjusted unit price ≤ supplier's ceiling unit price
                             Japanese: active = adjusted unit price ≤ supplier's ceiling unit price */
                          const isActive = ceilingPerUnit>0 && adj<=ceilingPerUnit;
                          return{ref,adj,isActive};
                        });

                        /* Dutch: last active round index (highest round where price ≤ ceiling)
                           Japanese: last active round index */
                        const lastActiveIdx = ceilingPrice>0
                          ? roundData.reduce((acc,rd,i)=>rd.isActive?i:acc,-1)
                          : -1;

                        return{
                          id:s.id, name:s.name, hasValue:val>0, hLabel,
                          bg:PASTEL_BG[si%PASTEL_BG.length],
                          border:PASTEL_BORDER[si%PASTEL_BORDER.length],
                          text:PASTEL_TEXT[si%PASTEL_TEXT.length],
                          ceilingPrice, roundData, lastActiveIdx
                        };
                      });

                      const fmtN = (n) => n===null?"—":Math.round(n).toLocaleString("en-US");
                      const fmtPriceTotal = (n) => n===null||!dynQty ? null : (n*dynQty).toLocaleString("en-US",{minimumFractionDigits:0,maximumFractionDigits:0});
                      const hasCeilings = supplierGrid.some(sg=>sg.ceilingPrice>0);

                      return (
                        <div style={{ marginTop:20,paddingTop:16,borderTop:`1px solid ${C.divider}` }}>
                          <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:10 }}>
                            <div style={{ display:"flex",alignItems:"center",gap:8 }}>
                              <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke={C.t3} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink:0 }}><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
                              <span style={{ fontSize:12,fontWeight:500,color:C.t2,textTransform:"uppercase",letterSpacing:"0.07em" }}>Price Grid</span>
                              {!hasCeilings && assignedSuppliers.length>0 && (
                                <span style={{ fontSize:11,color:C.t3 }}>— add ceiling prices in Line Items to see supplier highlights</span>
                              )}
                            </div>
                            <span style={{ fontSize:13,fontWeight:600,color:C.t1 }}>
                              {totalRounds} rounds · {lot.dynRoundDuration||defaultRd}/round · {lot.duration||"5 min"} total
                            </span>
                          </div>
                          <div style={{ overflowX:"auto",borderRadius:6,border:`1px solid ${C.divider}` }}>
                            <table style={{ width:"100%",borderCollapse:"collapse",fontSize:12 }}>
                              <thead>
                                <tr>
                                  <th style={{ padding:"8px 10px",textAlign:"left",fontSize:12,fontWeight:600,color:C.t2,borderBottom:`2px solid ${C.divider}`,background:C.grey50,position:"sticky",left:0,zIndex:2,minWidth:60 }}>Round</th>
                                  <th style={{ padding:"8px 10px",textAlign:"right",fontSize:12,fontWeight:600,color:C.t3,borderBottom:`2px solid ${C.divider}`,background:C.grey50,minWidth:120 }}>
                                    {isJapanese?"Price ↓":"Price ↑"}
                                    {dynQty>0&&<div style={{ fontSize:9,fontWeight:400,color:C.grey300,marginTop:1 }}>unit · total {cur}</div>}
                                  </th>
                                  {supplierGrid.map(sg=>(
                                    <th key={sg.id} style={{ padding:"8px 12px",textAlign:"center",fontSize:12,fontWeight:600,borderBottom:`2px solid ${C.divider}`,background:sg.bg,color:sg.text,minWidth:110 }}>
                                      <div style={{ display:"flex",alignItems:"center",justifyContent:"center",gap:4 }}>
                                        <div style={{ width:6,height:6,borderRadius:"50%",background:sg.text,flexShrink:0 }}/>
                                        <span>{sg.name}</span>
                                      </div>
                                      {sg.ceilingPrice>0 && (
                                        <div style={{ fontWeight:500,fontSize:10,marginTop:2,opacity:0.8 }}>
                                          ceiling: {fmtN(sg.ceilingPrice)} {cur} total
                                        </div>
                                      )}
                                      {sg.hLabel && <div style={{ fontWeight:400,fontSize:10,marginTop:1 }}>{sg.hLabel}</div>}
                                    </th>
                                  ))}
                                </tr>
                              </thead>
                              <tbody>
                                {displayRounds.map((r)=>{
                                  const ri = r-1; /* original 0-based index */
                                  const refPrice = getRoundPrice(r);
                                  const isTop    = r===totalRounds; /* highest round */
                                  const isBottom = r===1;           /* lowest round */
                                  return (
                                    <tr key={r}>
                                      <td style={{ padding:"6px 10px",fontWeight:600,fontSize:12,color:C.t1,borderBottom:`1px solid ${C.grey100}`,background:C.grey50,position:"sticky",left:0,zIndex:1 }}>
                                        {r}
                                        {isJapanese && isBottom && <span style={{ fontSize:10,fontWeight:400,color:C.t3,marginLeft:3 }}>start</span>}
                                        {isJapanese && isTop   && <span style={{ fontSize:10,fontWeight:400,color:C.t3,marginLeft:3 }}>end</span>}
                                        {!isJapanese && isTop    && <span style={{ fontSize:10,fontWeight:400,color:C.t3,marginLeft:3 }}>ceiling</span>}
                                        {!isJapanese && isBottom && <span style={{ fontSize:10,fontWeight:400,color:C.t3,marginLeft:3 }}>floor</span>}
                                      </td>
                                      <td style={{ padding:"6px 10px",textAlign:"right",borderBottom:`1px solid ${C.grey100}` }}>
                                        <div style={{ fontWeight:hasData?500:400,color:hasData?C.t2:C.grey300,fontSize:12 }}>{fmtN(refPrice)}</div>
                                        {fmtPriceTotal(refPrice)&&<div style={{ fontSize:10,color:C.t3,marginTop:1 }}>{fmtPriceTotal(refPrice)}</div>}
                                      </td>
                                      {supplierGrid.map(sg=>{
                                        const rd = sg.roundData[ri];
                                        const isActive = rd.isActive;
                                        /* For Dutch: ceiling row = the last active round (highest price they accept)
                                           For Japanese: ceiling row = last active round */
                                        const isCeilRow = sg.lastActiveIdx===ri && sg.ceilingPrice>0;
                                        return (
                                          <td key={sg.id} style={{
                                            padding:"6px 12px",
                                            textAlign:"center",
                                            borderBottom:`1px solid ${isActive?sg.border:C.grey100}`,
                                            background:isActive?sg.bg:"transparent",
                                            borderTop: isCeilRow&&!isJapanese ? `2px solid ${sg.text}` : "none",
                                            borderBottom2: isCeilRow&&isJapanese ? `2px solid ${sg.text}` : undefined,
                                          }}>
                                            {rd.ref!==null ? (
                                              <>
                                                {/* Line 1: base round price */}
                                                <div style={{ fontWeight:isActive?600:400, color:isActive?sg.text:C.t3, fontSize:12 }}>
                                                  {fmtN(rd.ref)}
                                                  {dynQty>0 && <span style={{ fontSize:9, fontWeight:400, color:isActive?sg.text:C.grey300, marginLeft:3 }}>{fmtN(rd.ref*dynQty)}</span>}
                                                </div>
                                                {/* Line 2: handicap-adjusted price */}
                                                {sg.hasValue && Math.abs(rd.adj-rd.ref)>0.001 && (
                                                  <div style={{ fontSize:11, fontWeight:700, marginTop:2, color: rd.adj>rd.ref ? "#DC2626" : "#16A34A" }}>
                                                    {fmtN(rd.adj)}
                                                    {dynQty>0 && <span style={{ fontSize:9, fontWeight:400, marginLeft:3 }}>{fmtN(rd.adj*dynQty)}</span>}
                                                  </div>
                                                )}
                                                {isCeilRow && (
                                                  <div style={{ fontSize:9,fontWeight:700,color:sg.text,marginTop:1,textTransform:"uppercase",letterSpacing:"0.05em" }}>
                                                    ceiling
                                                  </div>
                                                )}
                                              </>
                                            ) : (
                                              <span style={{ color:C.grey300,fontSize:12 }}>—</span>
                                            )}
                                          </td>
                                        );
                                      })}
                                    </tr>
                                  );
                                })}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      );
                    })()}
                  </>
                </div>
              </div>

              {/* ── CARD 4: AWARDING & TERMS ── */}
              {(() => {
                const fileInputId = `file-upload-${lot.id}`;
                const files = lot.lotFiles || [];
                const handleFiles = (newFiles) => {
                  const mapped = Array.from(newFiles).map(f => ({ id: Date.now() + Math.random(), name: f.name, size: f.size, type: f.type }));
                  updLot({ lotFiles: [...files, ...mapped] });
                };
                const removeFile = (fid) => updLot({ lotFiles: files.filter(f => f.id !== fid) });
                const fmtSize = (b) => b < 1024 ? `${b} B` : b < 1048576 ? `${(b/1024).toFixed(0)} KB` : `${(b/1048576).toFixed(1)} MB`;
                const doApplyAll = () => {
                  const patch = { awardingMode: lot.awardingMode, volumeSplit: lot.volumeSplit, commercialTerms: lot.commercialTerms, generalTerms: lot.generalTerms, lotFiles: lot.lotFiles };
                  update({ lots: lots.map(l => ({ ...l, ...patch })) });
                };
                const multiLot = lots.length > 1;
                return (
              <div style={cardStyle}>
                {cardHead("📋","Awarding & Terms")}
                <div style={{ padding:"16px 20px",display:"flex",flexDirection:"column",gap:18 }}>

                  {/* Apply to all toggle — always visible */}
                  <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",
                    background: applyToAll && multiLot ? C.greenLight : C.grey50,
                    borderRadius:6,padding:"8px 14px",
                    opacity: multiLot ? 1 : 0.5,
                    transition:"background .2s" }}>
                    <div>
                      <span style={{ fontSize:13,fontWeight:500,color:C.t1 }}>Apply to all lots</span>
                      <span style={{ fontSize:12,color:C.t3,marginLeft:8 }}>
                        {multiLot ? (applyToAll ? "Changes will sync across all lots" : "This lot has independent settings") : "Only one lot"}
                      </span>
                    </div>
                    <div style={{ display:"flex",alignItems:"center",gap:10 }}>
                      {applyToAll && multiLot && (
                        <button onClick={doApplyAll}
                          style={{ padding:"3px 12px",borderRadius:4,border:`1px solid ${C.green}`,
                            background:C.surface,fontSize:12,fontWeight:500,color:C.green,
                            cursor:"pointer",fontFamily:"Poppins,sans-serif",whiteSpace:"nowrap" }}>
                          Apply now →
                        </button>
                      )}
                      <button
                        className={`toggle ${applyToAll ? "on" : ""}`}
                        disabled={!multiLot}
                        onClick={() => { setApplyToAll(v => !v); }}
                      />
                    </div>
                  </div>

                  {/* ── Awarding Principle ── */}
                  <div>
                    <div style={{ fontSize:12,fontWeight:500,color:C.t2,textTransform:"uppercase",letterSpacing:"0.07em",marginBottom:10 }}>Awarding Principle</div>
                    <div style={{ display:"flex",gap:10 }}>
                      {[
                        {v:"lowest", label:"Lowest price wins", sub:"Winner takes all volume"},
                        {v:"split",  label:"Volume split",      sub:"Distribute % between suppliers"},
                      ].map(opt=>{
                        const active = (lot.awardingMode||"lowest")===opt.v;
                        return (
                          <div key={opt.v} onClick={()=>updLot({awardingMode:opt.v})}
                            style={{ flex:1,padding:"10px 14px",borderRadius:6,cursor:"pointer",userSelect:"none",
                              border:`1.5px solid ${active?C.t1:C.divider}`,
                              background:active?"#F7F7F6":C.surface }}>
                            <div style={{ display:"flex",alignItems:"center",gap:8,marginBottom:2 }}>
                              <div style={{ width:14,height:14,borderRadius:"50%",border:`2px solid ${active?C.t1:C.grey300}`,
                                display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}>
                                {active && <div style={{ width:6,height:6,borderRadius:"50%",background:C.t1 }}/>}
                              </div>
                              <span style={{ fontSize:13,fontWeight:600,color:active?C.t1:C.t2 }}>{opt.label}</span>
                            </div>
                            <div style={{ fontSize:11,color:C.t3,paddingLeft:22 }}>{opt.sub}</div>
                          </div>
                        );
                      })}
                    </div>
                    {/* Volume split */}
                    {(lot.awardingMode==="split") && (() => {
                      const lotSuppliers = assignedSuppliers;
                      const splits = lot.volumeSplit||{};
                      const total = lotSuppliers.reduce((s,sup)=>s+(parseFloat(splits[sup.id])||0),0);
                      const isValid = Math.abs(total-100)<0.01;
                      const updSplit = (sid,val) => updLot({volumeSplit:{...splits,[sid]:val}});
                      return (
                        <div style={{ marginTop:10,background:C.grey50,border:`1px solid ${C.divider}`,borderRadius:6,padding:"12px 14px" }}>
                          <div style={{ fontSize:12,fontWeight:600,color:C.t2,marginBottom:10 }}>Volume allocation</div>
                          {lotSuppliers.length===0 ? (
                            <div style={{ fontSize:13,color:C.t3 }}>No suppliers assigned to this lot yet.</div>
                          ) : (
                            <>
                              <div style={{ display:"flex",flexDirection:"column",gap:8 }}>
                                {lotSuppliers.map((s,si)=>{
                                  const val = splits[s.id]||"";
                                  const pct = parseFloat(val)||0;
                                  return (
                                    <div key={s.id} style={{ display:"flex",alignItems:"center",gap:10 }}>
                                      <div style={{ width:8,height:8,borderRadius:"50%",background:["#00CE7C","#1A49A9","#9F580A","#5521B5","#E02424","#8C2300"][si%6],flexShrink:0 }}/>
                                      <span style={{ fontSize:13,color:C.t1,minWidth:110,flex:1 }}>{s.name}</span>
                                      <div style={{ position:"relative",width:100 }}>
                                        <input type="number" min="0" max="100" value={val}
                                          onChange={e=>updSplit(s.id,e.target.value)} placeholder="0"
                                          style={{ paddingRight:28,textAlign:"right" }}/>
                                        <span style={{ position:"absolute",right:10,top:"50%",transform:"translateY(-50%)",fontSize:13,color:C.t3,pointerEvents:"none" }}>%</span>
                                      </div>
                                      {pct>0 && <div style={{ width:120,height:6,background:C.grey150,borderRadius:3,overflow:"hidden" }}><div style={{ width:`${Math.min(pct,100)}%`,height:"100%",background:["#00CE7C","#1A49A9","#9F580A","#5521B5","#E02424","#8C2300"][si%6],borderRadius:3 }}/></div>}
                                    </div>
                                  );
                                })}
                              </div>
                              <div style={{ marginTop:12,paddingTop:10,borderTop:`1px solid ${C.divider}`,display:"flex",alignItems:"center",gap:8 }}>
                                <span style={{ fontSize:12,color:C.t2 }}>Total:</span>
                                <span style={{ fontSize:13,fontWeight:700,color:isValid?C.green800:total>0?C.redT:C.t3 }}>{total.toFixed(0)}%</span>
                                {isValid ? <span style={{ fontSize:11,color:C.green800 }}>✓ Valid</span> : total>0 ? <span style={{ fontSize:11,color:C.redT }}>Must equal 100%</span> : null}
                              </div>
                            </>
                          )}
                        </div>
                      );
                    })()}
                  </div>

                  {/* ── Terms & Conditions + Documents side by side ── */}
                  <div style={{ display:"flex",gap:16,alignItems:"flex-start" }}>

                    {/* LEFT: Terms */}
                    <div style={{ flex:1,display:"flex",flexDirection:"column",gap:12 }}>
                      <div style={{ fontSize:12,fontWeight:500,color:C.t2,textTransform:"uppercase",letterSpacing:"0.07em" }}>Terms & Conditions</div>
                      <Field label="Commercial Terms">
                        <textarea
                          value={lot.commercialTerms||""}
                          onChange={e=>updLot({commercialTerms:e.target.value})}
                          placeholder="e.g. NET 30, payment within 30 days of invoice…"
                          rows={4}
                          style={{ resize:"vertical",fontFamily:"Poppins,sans-serif",fontSize:13,lineHeight:1.5 }}/>
                      </Field>
                      <Field label="General Terms">
                        <textarea
                          value={lot.generalTerms||""}
                          onChange={e=>updLot({generalTerms:e.target.value})}
                          placeholder="e.g. INCOTERMS 2020, DDP, governing law…"
                          rows={4}
                          style={{ resize:"vertical",fontFamily:"Poppins,sans-serif",fontSize:13,lineHeight:1.5 }}/>
                      </Field>
                    </div>

                    {/* RIGHT: Documents */}
                    <div style={{ width:220,flexShrink:0,display:"flex",flexDirection:"column",gap:10 }}>
                      <div style={{ fontSize:12,fontWeight:500,color:C.t2,textTransform:"uppercase",letterSpacing:"0.07em" }}>Documents</div>
                      <input type="file" id={fileInputId} multiple accept=".pdf,.doc,.docx,.xls,.xlsx"
                        style={{ display:"none" }}
                        onChange={e=>{ handleFiles(e.target.files); e.target.value=""; }}/>
                      <div
                        onClick={()=>document.getElementById(fileInputId)?.click()}
                        onDragOver={e=>{e.preventDefault();e.currentTarget.style.borderColor=C.t1;e.currentTarget.style.background="#F0F0EE";}}
                        onDragLeave={e=>{e.currentTarget.style.borderColor=C.grey200;e.currentTarget.style.background=C.grey50;}}
                        onDrop={e=>{e.preventDefault();e.currentTarget.style.borderColor=C.grey200;e.currentTarget.style.background=C.grey50;handleFiles(e.dataTransfer.files);}}
                        style={{ border:`1.5px dashed ${C.grey200}`,borderRadius:6,background:C.grey50,
                          padding:"16px 10px",textAlign:"center",cursor:"pointer",transition:"all .15s" }}>
                        <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke={C.t3} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom:6 }}>
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
                        </svg>
                        <div style={{ fontSize:12,color:C.t2,fontWeight:500 }}>Drop files or <span style={{ color:C.t1,textDecoration:"underline" }}>browse</span></div>
                        <div style={{ fontSize:10,color:C.t3,marginTop:3 }}>PDF, DOC, DOCX, XLS</div>
                        <div style={{ fontSize:10,color:C.t3 }}>Max 20 MB each</div>
                      </div>
                      {files.length > 0 && (
                        <div style={{ display:"flex",flexDirection:"column",gap:5 }}>
                          {files.map(f => (
                            <div key={f.id} style={{ display:"flex",alignItems:"center",gap:8,padding:"6px 8px",
                              background:C.surface,border:`1px solid ${C.grey150}`,borderRadius:6 }}>
                              <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke={C.t3} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink:0 }}>
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
                              </svg>
                              <span style={{ flex:1,fontSize:11,color:C.t1,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap" }}>{f.name}</span>
                              <span style={{ fontSize:10,color:C.t3,flexShrink:0 }}>{fmtSize(f.size)}</span>
                              <button onClick={()=>removeFile(f.id)}
                                style={{ background:"none",border:"none",cursor:"pointer",color:C.t3,padding:"0 4px",lineHeight:1,fontSize:15 }}>×</button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                  </div>
                </div>
              </div>
                );
              })()}

            </div>
          );
        }
      })()}

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
            <span style={{ flex: 2, fontSize: 12, fontWeight: 600, color: "#787878", textTransform: "uppercase", letterSpacing: "0.06em" }}>Item Name</span>
            <span style={{ flex: 1, fontSize: 12, fontWeight: 600, color: "#787878", textTransform: "uppercase", letterSpacing: "0.06em" }}>Qty</span>
            {lotSuppliers.map(s => (
              <span key={s.id} style={{ flex: 1.5, fontSize: 12, fontWeight: 600, color: "#787878", textTransform: "uppercase", letterSpacing: "0.06em" }}>{s.name}</span>
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
  const a = auction;
  const isMulti = a.type === "dynamic";
  const isSealed = a.type === "simple" && a.biddingMode === "sealed";

  const checks = [
    {
      done: !!a.name?.trim(),
      task: "Give your auction a catchy name",
      hint: a.name ? a.name : "Head to Auction Setup to add a name",
    },
    {
      done: !!a.owner,
      task: "Assign an auction owner",
      hint: a.owner ? a.owner : "Who's responsible for this auction?",
    },
    {
      done: !!a.type,
      task: "Choose your auction format",
      hint: a.type === "simple" ? (a.biddingMode === "sealed" ? "Sealed Bid" : "English Auction") : a.dynamicFormat === "dutch" ? "Dutch Auction" : a.dynamicFormat === "japanese" ? "Japanese Auction" : "Select a format in Architecture",
    },
    {
      done: isSealed ? !!a.endTime : !!a.startTime,
      task: isSealed ? "Set a submission deadline" : "Schedule when the auction starts",
      hint: isSealed ? (a.endTime ? new Date(a.endTime).toLocaleString("en-GB", { day:"2-digit", month:"short", year:"numeric", hour:"2-digit", minute:"2-digit" }) : "Add an end date in Auction Setup") : (a.startTime ? new Date(a.startTime).toLocaleString("en-GB", { day:"2-digit", month:"short", year:"numeric", hour:"2-digit", minute:"2-digit" }) : "Add a start date in Auction Setup"),
    },
    {
      done: a.suppliers.length > 0,
      task: "Invite at least one supplier",
      hint: a.suppliers.length > 0 ? `${a.suppliers.length} supplier${a.suppliers.length > 1 ? "s" : ""} invited` : "Go to the Suppliers step to add participants",
    },
    {
      done: a.lots.every(l => l.baselinePrice && parseFloat(l.baselinePrice) > 0),
      task: "Set a baseline price for each lot",
      hint: a.lots.every(l => l.baselinePrice) ? `${a.lots.length} lot${a.lots.length > 1 ? "s" : ""} configured` : "Open Lots & Pricing to complete pricing",
    },
  ];
  const allDone = checks.every(c => c.done);

  const fmt = (d) => d ? new Date(d).toLocaleString("en-GB", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" }).replace(",", "") : "—";
  const KV = ({ label, value }) => (
    <div>
      <div style={{ fontSize: 12, color: C.t2, marginBottom: 4 }}>{label}</div>
      <div style={{ fontSize: 14, fontWeight: 500, color: C.t1 }}>{value || <span style={{ color: C.t3 }}>—</span>}</div>
    </div>
  );

  return (
    <Sec id="review" title="Review & Launch" sub="Review your auction configuration before publishing.">

      {/* ── Pre-launch checklist ── */}
      <Card style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: C.t1, marginBottom: 16 }}>Pre-launch checklist</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {checks.map((c, i) => (
            <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 14, padding: "10px 0", borderBottom: i < checks.length - 1 ? `1px solid ${C.divider}` : "none" }}>
              {/* Icon */}
              <div style={{ marginTop: 1, flexShrink: 0 }}>
                {c.done ? (
                  <div style={{ width: 20, height: 20, borderRadius: "50%", background: C.green, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <svg width={11} height={11} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  </div>
                ) : (
                  <div style={{ width: 20, height: 20, borderRadius: "50%", border: `1.5px solid ${C.divider}` }} />
                )}
              </div>
              {/* Text */}
              <div>
                <div style={{ fontSize: 13, fontWeight: 500, color: c.done ? C.t2 : C.t1, textDecoration: c.done ? "line-through" : "none" }}>{c.task}</div>
                <div style={{ fontSize: 12, color: C.t3, marginTop: 2 }}>{c.hint}</div>
              </div>
            </div>
          ))}
        </div>
        {allDone && (
          <div style={{ marginTop: 16, display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", borderRadius: 6, background: C.greenLight }}>
            <IcoRocket size={16} color={C.green} />
            <span style={{ fontSize: 13, fontWeight: 500, color: C.green }}>Everything looks good — you're ready to launch!</span>
          </div>
        )}
      </Card>

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

/* ── Template Modal ──────────────────────────────────────────────────────── */
const TemplateModal = ({ onClose, onSelect }) => {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [userTemplates, setUserTemplates] = useState(() => loadTemplates());
  const [hoveredCard, setHoveredCard] = useState(null);

  const all = [
    ...userTemplates.map(t => ({ ...t, category: "my" })),
    ...SYSTEM_TEMPLATES,
  ];
  const filtered = all.filter(t => {
    if (filter === "my" && t.category !== "my") return false;
    if (filter === "system" && t.category !== "system") return false;
    if (search && !t.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const handleDelete = (id, e) => {
    e.stopPropagation();
    deleteTemplate(id);
    setUserTemplates(loadTemplates());
  };

  const myCount = all.filter(t => t.category === "my").length;
  const sysCount = all.filter(t => t.category === "system").length;

  return (
    <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.4)", zIndex:1000, display:"flex", alignItems:"center", justifyContent:"center", padding:24 }}
      onClick={onClose}>
      <div className="card fade" style={{ maxWidth:780, width:"100%", maxHeight:"85vh", display:"flex", flexDirection:"column", borderRadius:8, overflow:"hidden" }}
        onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div style={{ padding:"20px 24px 16px", borderBottom:`1px solid ${C.divider}`, display:"flex", alignItems:"center", gap:12, flexShrink:0 }}>
          <div style={{ flex:1 }}>
            <div style={{ fontSize:18, fontWeight:700, color:C.t1, marginBottom:2 }}>Choose a Template</div>
            <div style={{ fontSize:13, color:C.t2 }}>Start from a pre-configured auction setup</div>
          </div>
          <input
            placeholder="Search templates…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ width:200, height:36, fontSize:13 }}
          />
          <button onClick={onClose} style={{ background:"none", border:"none", cursor:"pointer", padding:4, color:C.t2, fontSize:20, lineHeight:1, flexShrink:0 }}>×</button>
        </div>

        {/* Filter pills */}
        <div style={{ padding:"12px 24px 0", display:"flex", gap:8, flexShrink:0 }}>
          {[
            { key:"all",    label:`All (${all.length})` },
            { key:"my",     label:`My templates (${myCount})` },
            { key:"system", label:`System (${sysCount})` },
          ].map(pill => (
            <button key={pill.key} onClick={() => setFilter(pill.key)}
              style={{ height:32, padding:"0 14px", borderRadius:16, border:`1px solid ${filter===pill.key ? C.t1 : C.divider}`,
                background: filter===pill.key ? C.t1 : "transparent",
                color: filter===pill.key ? "#fff" : C.t2,
                fontSize:13, fontFamily:"Poppins,sans-serif", cursor:"pointer", fontWeight: filter===pill.key ? 600 : 400,
                transition:"all .15s" }}>
              {pill.label}
            </button>
          ))}
        </div>

        {/* Template grid */}
        <div style={{ flex:1, overflowY:"auto", padding:24 }}>
          {filtered.length === 0 ? (
            <div style={{ textAlign:"center", padding:"48px 24px", color:C.t2 }}>
              <div style={{ fontSize:32, marginBottom:12 }}>📋</div>
              <div style={{ fontSize:15, fontWeight:600, color:C.t1, marginBottom:6 }}>No templates found</div>
              <div style={{ fontSize:13 }}>
                {filter === "my" ? "Save a configuration from the builder to create your first template." : "Try adjusting your search."}
              </div>
            </div>
          ) : (
            <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:16 }}>
              {filtered.map(tpl => {
                const isHov = hoveredCard === tpl.id;
                return (
                  <div key={tpl.id}
                    onMouseEnter={() => setHoveredCard(tpl.id)}
                    onMouseLeave={() => setHoveredCard(null)}
                    style={{ borderRadius:8, border:`1px solid ${isHov ? tpl.typeBorder : C.divider}`,
                      overflow:"hidden", cursor:"pointer", transition:"border-color .15s, box-shadow .15s",
                      boxShadow: isHov ? "0 2px 12px rgba(0,0,0,0.08)" : "none",
                      display:"flex", flexDirection:"column" }}>

                    {/* Colored header */}
                    <div style={{ background: tpl.typeBg, borderBottom:`1px solid ${tpl.typeBorder}`, padding:"12px 14px" }}>
                      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:6 }}>
                        <span style={{ fontSize:11, fontWeight:600, color: tpl.typeColor,
                          background:`${tpl.typeBorder}66`, padding:"2px 8px", borderRadius:10,
                          border:`1px solid ${tpl.typeBorder}` }}>
                          {tpl.auctionType}
                        </span>
                        {tpl.category === "my" && (
                          <button onClick={e => handleDelete(tpl.id, e)}
                            style={{ background:"none", border:"none", cursor:"pointer", padding:2, color: tpl.typeColor, opacity:0.6, lineHeight:1 }}
                            title="Delete template">
                            <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/></svg>
                          </button>
                        )}
                      </div>
                      <div style={{ fontSize:14, fontWeight:700, color:C.t1, lineHeight:1.3 }}>{tpl.name}</div>
                    </div>

                    {/* Body */}
                    <div style={{ padding:"12px 14px", flex:1, background:C.surface }}>
                      <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:8 }}>
                        <span style={{ fontSize:12, color:C.t2 }}>{tpl.lots} lot{tpl.lots !== 1 ? "s" : ""}</span>
                        {tpl.category === "my" && <span style={{ fontSize:11, color:C.t3 }}>· My template</span>}
                        {tpl.category === "system" && <span style={{ fontSize:11, color:C.t3 }}>· System</span>}
                      </div>
                      <div style={{ fontSize:12, color:C.t2, lineHeight:1.5, marginBottom: tpl.savedAt ? 6 : 0 }}>{tpl.description}</div>
                      {tpl.savedAt && (
                        <div style={{ fontSize:11, color:C.t3 }}>
                          Saved {new Date(tpl.savedAt).toLocaleDateString("en-GB", { day:"numeric", month:"short", year:"numeric" })}
                        </div>
                      )}
                    </div>

                    {/* Use button — shown on hover */}
                    {isHov && (
                      <div style={{ padding:"10px 14px", borderTop:`1px solid ${tpl.typeBorder}`, background: tpl.typeBg }}>
                        <button className="btn btn-primary btn-sm" style={{ width:"100%" }}
                          onClick={() => onSelect(tpl.auction)}>
                          Use Template →
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

/* ── Save Template Modal ─────────────────────────────────────────────────── */
const SaveTemplateModal = ({ auction, onClose, onSaved }) => {
  const [name, setName] = useState(auction.name ? `${auction.name} template` : "");

  const save = () => {
    if (!name.trim()) return;
    const resolved = determineAuctionType(auction);
    const typeName = resolved?.name || "Auction";
    const isD = typeName.includes("Dutch");
    const isJ = typeName.includes("Japanese");
    const isS = typeName.includes("Sealed");
    const typeBg     = isD?"#F3F2FF":isJ?"#FEFFEA":isS?"#E9F5FF":"#EBFFF7";
    const typeBorder = isD?"#C9C7FF":isJ?"#DCF5A0":isS?"#B8DCFA":"#A8F0D8";
    const typeColor  = isD?"#3D3A90":isJ?"#4A6010":isS?"#1A5080":"#1B7A4A";
    const tpl = {
      id: `tpl-${Date.now()}`,
      name: name.trim(),
      category: "my",
      auctionType: typeName,
      typeBg, typeBorder, typeColor,
      lots: auction.lots.length,
      description: `${auction.suppliers.length} supplier${auction.suppliers.length !== 1 ? "s" : ""} · Saved from builder`,
      savedAt: new Date().toISOString(),
      auction: { ...auction },
    };
    const existing = loadTemplates();
    saveTemplates([tpl, ...existing]);
    onSaved();
    onClose();
  };

  return (
    <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.4)", zIndex:1000, display:"flex", alignItems:"center", justifyContent:"center", padding:24 }}
      onClick={onClose}>
      <div className="card fade" style={{ maxWidth:400, width:"100%", borderRadius:8, overflow:"hidden" }}
        onClick={e => e.stopPropagation()}>
        <div style={{ padding:"20px 24px 16px", borderBottom:`1px solid ${C.divider}` }}>
          <div style={{ fontSize:16, fontWeight:700, color:C.t1, marginBottom:2 }}>Save as Template</div>
          <div style={{ fontSize:13, color:C.t2 }}>Save this configuration for future reuse</div>
        </div>
        <div style={{ padding:"20px 24px" }}>
          <div style={{ marginBottom:16 }}>
            <label style={{ fontSize:13, fontWeight:500, color:C.t1, display:"block", marginBottom:6 }}>Template name</label>
            <input
              value={name}
              onChange={e => setName(e.target.value)}
              onKeyDown={e => { if (e.key === "Enter") save(); if (e.key === "Escape") onClose(); }}
              placeholder="e.g. My IT Hardware Template"
              autoFocus
              style={{ width:"100%" }}
            />
          </div>
          <div style={{ display:"flex", gap:8, justifyContent:"flex-end" }}>
            <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
            <button className="btn btn-primary" onClick={save} disabled={!name.trim()}>Save Template</button>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ── Creation Gate ───────────────────────────────────────────────────────── */
const CreationGate = ({ onSelectType, onFromTemplate, onFromScratch }) => {
  const [expanded, setExpanded] = useState(null);
  const [showTemplates, setShowTemplates] = useState(false);

  const TYPE_CARDS = [
    {
      key: "english",
      label: "English Auction",
      desc: "Competitive live bidding — suppliers see activity and outbid each other in real time.",
      typeBg: "#EBFFF7", typeBorder: "#A8F0D8", typeColor: "#1B7A4A",
      auction: { type:"simple", biddingMode:"english", archRankVisible: true },
      icon: (
        <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#1B7A4A" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
          <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/>
        </svg>
      ),
    },
    {
      key: "dutch",
      label: "Dutch Auction",
      desc: "Price increases each round during competitive multi-round bidding.",
      typeBg: "#F3F2FF", typeBorder: "#C9C7FF", typeColor: "#3D3A90",
      auction: { type:"dynamic", dynamicFormat:"dutch", archPriceDirection:"dutch" },
      icon: (
        <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#3D3A90" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
          <polyline points="22 17 13.5 8.5 8.5 13.5 2 7"/><polyline points="16 17 22 17 22 11"/>
        </svg>
      ),
    },
    {
      key: "japanese",
      label: "Japanese Auction",
      desc: "Price decreases each round until a supplier accepts the offer.",
      typeBg: "#FEFFEA", typeBorder: "#DCF5A0", typeColor: "#4A6010",
      auction: { type:"dynamic", dynamicFormat:"japanese", archPriceDirection:"japanese" },
      icon: (
        <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#4A6010" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/>
        </svg>
      ),
    },
    {
      key: "sealed",
      label: "Sealed Bid",
      desc: "Suppliers submit one blind bid without seeing competitors. Best price wins.",
      typeBg: "#E9F5FF", typeBorder: "#B8DCFA", typeColor: "#1A5080",
      auction: { type:"simple", biddingMode:"sealed" },
      icon: (
        <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#1A5080" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/>
        </svg>
      ),
    },
  ];

  return (
    <>
    <div style={{ minHeight:"100vh", background:C.bg, display:"flex" }}>
      <DarkSidebar />
      <div style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"48px 24px" }}>
        <div style={{ width:"100%", maxWidth:820 }}>

          {/* Header */}
          <div style={{ marginBottom:32 }}>
            <div style={{ fontSize:12, fontWeight:600, color:C.t2, textTransform:"uppercase", letterSpacing:"0.1em", marginBottom:8 }}>New eAuction</div>
            <div style={{ fontSize:28, fontWeight:700, color:C.t1, marginBottom:6 }}>Start building your auction</div>
            <div style={{ fontSize:14, color:C.t2 }}>Select an auction type to pre-configure the builder, or start from scratch.</div>
          </div>

          {/* Top: Choose Auction Type */}
          <div className="card" style={{ marginBottom:16, padding:"20px 20px 16px", borderRadius:8 }}>
            <div style={{ fontSize:11, fontWeight:700, color:C.t2, textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:14 }}>Choose Auction Type</div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:12 }}>
              {TYPE_CARDS.map(tc => {
                const isExp = expanded === tc.key;
                return (
                  <div key={tc.key}
                    onClick={() => setExpanded(isExp ? null : tc.key)}
                    style={{ borderRadius:8, border:`1px solid ${isExp ? tc.typeBorder : C.divider}`,
                      background: isExp ? tc.typeBg : C.surface,
                      cursor:"pointer", transition:"all .15s",
                      overflow:"hidden" }}>
                    <div style={{ padding:"14px 14px 12px", display:"flex", alignItems:"flex-start", gap:10 }}>
                      <div style={{ width:34, height:34, borderRadius:8,
                        background: isExp ? `${tc.typeBorder}55` : C.bg,
                        border:`1px solid ${isExp ? tc.typeBorder : C.divider}`,
                        display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                        {tc.icon}
                      </div>
                      <div style={{ flex:1, minWidth:0 }}>
                        <div style={{ fontSize:13, fontWeight:700, color: isExp ? tc.typeColor : C.t1, lineHeight:1.2, marginBottom:2 }}>{tc.label}</div>
                        {isExp && (
                          <div style={{ fontSize:12, color:C.t2, lineHeight:1.5, marginTop:4 }}>{tc.desc}</div>
                        )}
                      </div>
                      <div style={{ flexShrink:0, marginTop:2 }}>
                        {isExp
                          ? <IcoCheck size={14} color={tc.typeColor} />
                          : <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke={C.t3} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
                        }
                      </div>
                    </div>
                    {isExp && (
                      <div style={{ padding:"0 14px 14px" }}>
                        <button className="btn btn-primary btn-sm" style={{ width:"100%" }}
                          onClick={e => { e.stopPropagation(); onSelectType({ ...INIT, ...tc.auction }); }}>
                          Start building →
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom row: From Template + From Scratch */}
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>

            {/* From Template */}
            <div className="card" style={{ borderRadius:8, padding:20, cursor:"pointer", transition:"border-color .15s",
              display:"flex", alignItems:"center", gap:16 }}
              onClick={() => setShowTemplates(true)}
              onMouseEnter={e => e.currentTarget.style.borderColor = C.grey200}
              onMouseLeave={e => e.currentTarget.style.borderColor = C.divider}>
              <div style={{ width:44, height:44, borderRadius:10, background:"#FFF5EB",
                border:"1px solid #FFD0A0", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#8C2300" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
                  <polyline points="14 2 14 8 20 8"/>
                  <line x1="16" y1="13" x2="8" y2="13"/>
                  <line x1="16" y1="17" x2="8" y2="17"/>
                  <polyline points="10 9 9 9 8 9"/>
                </svg>
              </div>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:15, fontWeight:700, color:C.t1, marginBottom:3 }}>From Template</div>
                <div style={{ fontSize:13, color:C.t2 }}>Choose from saved or system templates</div>
              </div>
              <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke={C.t3} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink:0 }}>
                <polyline points="9 18 15 12 9 6"/>
              </svg>
            </div>

            {/* From Scratch */}
            <div className="card" style={{ borderRadius:8, padding:20, cursor:"pointer", transition:"border-color .15s",
              display:"flex", alignItems:"center", gap:16 }}
              onClick={onFromScratch}
              onMouseEnter={e => e.currentTarget.style.borderColor = C.grey200}
              onMouseLeave={e => e.currentTarget.style.borderColor = C.divider}>
              <div style={{ width:44, height:44, borderRadius:10, background:C.bg,
                border:`1px solid ${C.divider}`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke={C.t2} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/>
                </svg>
              </div>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:15, fontWeight:700, color:C.t1, marginBottom:3 }}>From Scratch</div>
                <div style={{ fontSize:13, color:C.t2 }}>Full control over every parameter</div>
              </div>
              <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke={C.t3} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink:0 }}>
                <polyline points="9 18 15 12 9 6"/>
              </svg>
            </div>
          </div>

        </div>
      </div>
    </div>

    {showTemplates && (
      <TemplateModal
        onClose={() => setShowTemplates(false)}
        onSelect={(tplAuction) => { setShowTemplates(false); onFromTemplate(tplAuction); }}
      />
    )}
    </>
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

  const [showSaveTemplate, setShowSaveTemplate] = useState(false);

  const update = (ch) => setAuction(prev => ({ ...prev, ...ch }));
  const enterBuilder = (mode, initialAuction = null) => {
    if (initialAuction) {
      setAuction({ ...initialAuction, creationMode: mode });
    } else {
      setAuction({ ...INIT, creationMode: mode });
    }
    setPhase("builder");
  };

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

  if (phase === "gate") return (
    <CreationGate
      onSelectType={(typeAuction) => enterBuilder("type", { ...INIT, ...typeAuction })}
      onFromTemplate={(tplAuction) => enterBuilder("template", tplAuction)}
      onFromScratch={() => enterBuilder("scratch")}
    />
  );

  const _resolved = determineAuctionType(auction);
  const auctionLabel = _resolved ? `${_resolved.family} · ${_resolved.name}` : "eAuction";

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
            <button className="btn btn-secondary" onClick={() => setShowSaveTemplate(true)}
              style={{ display:"flex", alignItems:"center", gap:5 }}>
              📋 Save as template
            </button>
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
      {showSaveTemplate && (
        <SaveTemplateModal
          auction={auction}
          onClose={() => setShowSaveTemplate(false)}
          onSaved={() => {}}
        />
      )}
    </div>
  );
}


