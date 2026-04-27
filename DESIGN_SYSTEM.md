# Crown Design System — Documentation

**Project:** Auction Builder
**Figma file:** `TfJw2zsGB11mbievCt5c3n` — Crown Core Functionality
**Figma page node:** `2414:22799` (Сomponents)
**Font:** Poppins (Google Fonts)
**Tokens file:** `tokens.json` (import via Tokens Studio plugin in Figma)

---

## 1. Color Tokens

All tokens live in the `C` object in `src/AuctionBuilder.jsx`.

### Primitive palette

| Token | Hex | Usage |
|---|---|---|
| `grey900` | `#1D1D1B` | Primary text, btn-primary bg, input focused border |
| `grey800` | `#363633` | btn-primary :active bg |
| `grey700` | `#4A4A48` | btn-primary :hover bg |
| `grey500` | `#787878` | Secondary text (t2), table cell text |
| `grey400` | `#8E8E8E` | Placeholders, tertiary text (t3), input filled border |
| `grey300` | `#AEB0B2` | Disabled text, trash icon default |
| `grey200` | `#C5C7C9` | Disabled button bg, default input border |
| `grey150` | `#DBDCDD` | Toggle off bg, disabled input border |
| `grey100` | `#E9EAEC` | Divider, card border, badge neutral bg |
| `grey50`  | `#F8F8F8` | Page bg, table row hover, list table header bg |
| `white`   | `#FFFFFF` | Surface / card bg |
| `greenAccent` | `#00CE7C` | Brand: toggle on, stepper done, focus ring, tertiary hover underline |
| `green800`    | `#007C4A` | Green badge text |
| `green100`    | `#DDFBEE` | Green badge bg |
| `red600`      | `#E02424` | Error border, error icon |
| `red800`      | `#9B1C1C` | Red badge text |
| `red100`      | `#FDE8E8` | Red badge bg, error banner bg |
| `yellow600`   | `#9F580A` | Yellow badge text, warning text |
| `yellow50`    | `#FDFFD2` | Yellow badge bg, warning banner bg |
| `blue800`     | `#1A49A9` | Blue badge text |
| `blue50`      | `#DFF0FF` | Blue badge bg |
| `orange800`   | `#8C2300` | Orange badge text |
| `orange100`   | `#FFE1CB` | Orange badge bg |
| `orange50`    | `#FFF5EB` | Orange badge LG hover bg |
| `purple800`   | `#5521B5` | Purple badge text, pre-bid text |
| `purple100`   | `#EDEBFE` | Purple badge bg, pre-bid bg |
| `purple50`    | `#F3F2FF` | Purple badge SM default bg |

### Semantic aliases

| Alias | Maps to | Purpose |
|---|---|---|
| `bg` | `grey50` | App/page background |
| `surface` | `white` | Card, modal, input bg |
| `divider` | `grey100` | Borders, separators, table lines |
| `t1` | `grey900` | Primary text |
| `t2` | `grey500` | Secondary text |
| `t3` | `grey400` | Tertiary text / placeholder |
| `disabled` | `grey200` | Disabled state |
| `green` / `greenLight` | `greenAccent` / `green100` | Brand / green badge |
| `blue` / `blueT` | `blue50` / `blue800` | Blue badge bg / text |
| `purple` / `purpleT` | `purple100` / `purple800` | Purple badge bg / text |
| `yellow` / `yellowT` | `yellow50` / `yellow600` | Yellow badge bg / text |
| `red` / `redT` | `red100` / `red800` | Red badge bg / text |
| `orange` / `orangeT` | `orange100` / `orange800` | Orange badge bg / text |

---

## 2. Typography

| Style name | Size | Weight | Line-height | Usage |
|---|---|---|---|---|
| Body / Base | 14px | 400 | 1.5 | Input values, body copy |
| Button / Label | 14px | 600 | 1 (normal) | Buttons, section headers |
| Caption / Label SM | 12px | 400 | 1.2 | Field labels, error msgs, hints |
| Badge SM | 12px | 400 | 1 | Badge text |
| Table header | 11px | 600 | 1 | Column headers (uppercase, 0.06em spacing) |
| Table header std | 12px | 400 | 1 | Column headers (uppercase, 0.05em spacing) |

**Global font stack:** `'Poppins', sans-serif`
**Base font size:** 14px
**Anti-aliasing:** `-webkit-font-smoothing: antialiased`

---

## 3. Spacing & Sizing

| Token | Value | Usage |
|---|---|---|
| `spacing-1` | 4px | Badge gap, icon gap |
| `spacing-2` | 6px | Small label margin |
| `spacing-3` | 8px | Button padding-y, input padding-y, card gap |
| `spacing-5` | 12px | Input padding-x, table cell padding |
| `spacing-6` | 16px | Card default padding, list table padding |
| `spacing-8` | 24px | Button padding-x |
| `spacing-9` | 32px | Large section gap |

| Size token | Value | Usage |
|---|---|---|
| `inputHeight` | 40px | Input, button, badge LG height |
| `inputHeightSm` | 32px | Small button, compact cell height |
| `badgeHeightSm` | 24px | Badge SM |
| `checkboxSize` | 20px | Checkbox, radio |
| `toggleWidth` | 36px | Toggle switch |
| `toggleHeight` | 20px | Toggle switch |
| `stepDot` | 28px | Stepper dot diameter |

---

## 4. Border Radius

| Token | Value | Usage |
|---|---|---|
| `sm` | 4px | Buttons, inputs, cards, badges (standard) |
| `md` | 6px | List table wrapper (`.lt-wrap`) |
| `lg` | 8px | Badge LG hover top corners |
| `full` | 50% | Toggle thumb, stepper dot, online dot |

---

## 5. Components

### Button — `Figma: 41:1933 / 41:1942 / 11374:83535 / 11552:65308`

```jsx
// Primary — default / hover / press / disabled
<button className="btn btn-primary">Label</button>
<button className="btn btn-primary" disabled>Label</button>

// Secondary
<button className="btn btn-secondary">Label</button>

// Tertiary (text link style, green underline on hover)
<button className="btn btn-tertiary">Label</button>

// Small (h=32px, 12px font)
<button className="btn btn-primary btn-sm">Label</button>
<button className="btn btn-secondary btn-sm">Label</button>
```

**States & tokens:**

| State | bg | border | text |
|---|---|---|---|
| Primary default | `grey900` | — | `white` |
| Primary hover | `grey700` | — | `white` |
| Primary press | `grey800` | — | `white` |
| Primary disabled | `grey200` | — | `white` |
| Secondary default | transparent | `grey900` | `grey900` |
| Secondary hover | transparent | `grey700` | `grey900` |
| Secondary press | `grey100` | `grey800` | `grey900` |
| Secondary disabled | transparent | `grey200` | `grey200` |
| Tertiary default | transparent | — | `grey900` |
| Tertiary hover | transparent | bottom `greenAccent` | `grey900` |
| Tertiary disabled | transparent | — | `grey200` |

---

### Input — `Figma: 41:1385`

```jsx
// Default
<input placeholder="Date*" />

// Error
<input className="error" value="bad value" />

// Disabled
<input disabled value="value" />

// With Field wrapper (label + hint/error)
<Field label="Start date" required error="Required field" hint="DD/MM/YYYY">
  <input placeholder="Date*" />
</Field>
```

**States & border colors:**

| State | border | text | label color |
|---|---|---|---|
| Default | `grey200` (#C5C7C9) | `grey400` (placeholder) | `grey900` |
| Focused | `grey900` (#1D1D1B) | `grey800` | `grey900` |
| Filled | `grey400` (#8E8E8E) | `grey800` | `grey900` |
| Error | `red600` (#E02424) | `grey800` | `grey900` |
| Disabled | `grey150` (#DBDCDD) | `grey300` | `grey300` |

---

### Search — `Figma: 734:18710`

Same visual as Input. Focused state shows a dropdown results panel below the field.

---

### Badge — `Figma: 533:6631`

```jsx
// SM (h=24px) — status display
<span className="badge bg-green">Active</span>
<span className="badge bg-red">Inactive</span>
<span className="badge bg-yellow">Upcoming</span>
<span className="badge bg-blue">Closed</span>
<span className="badge bg-purple">Badge</span>
<span className="badge bg-orange">Badge</span>
<span className="badge bg-neutral">Draft</span>
```

**Theme → CSS class mapping:**

| Figma theme | CSS class | bg | text |
|---|---|---|---|
| Green | `bg-green` | `green100` #DDFBEE | `green800` #007C4A |
| Red | `bg-red` | `red100` #FDE8E8 | `red800` #9B1C1C |
| Yellow | `bg-yellow` | `yellow50` #FDFFD2 | `yellow600` #9F580A |
| Blue | `bg-blue` | `blue50` #DFF0FF | `blue800` #1A49A9 |
| Purple | `bg-purple` | `purple50` #F3F2FF | `purple800` #5521B5 |
| Orange | `bg-orange` | `orange100` #FFE1CB | `orange800` #8C2300 |
| Default/Neutral | `bg-neutral` | `grey50` #F8F8F8 | `grey500` #787878 + border |

---

### Checkbox — `Figma: 41:1333 / 41:1375`

```jsx
// Standard (20×20px)
<input type="checkbox" />          // empty
<input type="checkbox" checked />  // checked — accent-color: greenAccent
<input type="checkbox" disabled /> // inactive

// With label
<label style={{ display:'flex', alignItems:'center', gap: 8 }}>
  <input type="checkbox" />
  Supplier name
</label>
```

---

### Toggle / Switch — `Figma: 11421:69558`

```jsx
// Off
<button className="toggle" onClick={toggle} />

// On
<button className="toggle on" onClick={toggle} />
```

**Token usage:** off bg = `grey150`, on bg = `greenAccent`, thumb = `white`, shadow = `0 1px 3px rgba(0,0,0,0.15)`

---

### Switch Button (segmented) — `Figma: 13746:52168`

```jsx
<div style={{ display:'flex' }}>
  <button className="btn btn-primary btn-sm">Simple</button>
  <button className="btn btn-secondary btn-sm">Dynamic</button>
</div>
```

---

### Tabs — `Figma: 11515:52911`

```jsx
<div style={{ display:'flex', borderBottom: `1px solid ${C.divider}` }}>
  <button className="btn btn-tertiary" style={{ borderBottom: `2px solid ${C.green}` }}>
    Tab Active
  </button>
  <button className="btn btn-tertiary">Tab Default</button>
</div>
```

---

### Card — `Figma: General section`

```jsx
<Card p={20}>Content</Card>
// renders: bg=white, border=grey100 1px, border-radius=4px
```

---

### Divider

```jsx
<Divider my={16} />
// renders: height=1px, bg=grey100
```

---

### Field (form field wrapper)

```jsx
<Field label="Label" required hint="Hint text" error="Error message" disabled={false}>
  <input placeholder="..." />
</Field>
```

- `label` — 12px, grey900 (grey300 if disabled)
- `required` — red asterisk (`redT` / grey300 if disabled)
- `hint` — 12px, grey500, lineHeight 1.2
- `error` — 12px, red600, flex with `IcoWarn`

---

### Steps / Stepper — `Figma: 11763:14047`

```jsx
// dot states: dot-done (green bg) | dot-active (grey900 bg) | dot-pending (grey50 + grey100 border)
// step-line: default grey100 | done: greenAccent
<div className="dot dot-done"><IcoCheck /></div>
<div className="step-line done" />
<div className="dot dot-active">2</div>
<div className="step-line" />
<div className="dot dot-pending">3</div>
```

---

### Alert banners

```jsx
// Warning (yellow)
<Warn>Message with icon</Warn>
// bg: yellow50, border: #E3A008, text: yellow600

// Error (red)
<Err>Message</Err>
// bg: red100, border: #FBD5D5, text: red800
```

---

### Table — `Figma: 41:1484`

```jsx
<table>
  <thead>
    <tr><th>Column</th></tr>
    {/* 12px, grey500, uppercase, 0.05em spacing, border-bottom grey100 */}
  </thead>
  <tbody>
    <tr><td>Value</td></tr>
    {/* 14px, grey500, padding 8px 12px, hover: bg grey50 */}
  </tbody>
</table>
```

---

### List Table (`.lt-*`) — `Figma: 4110:20101`

Used for editable tables (lots, suppliers grid).

```jsx
<div className="lt-wrap">
  <div className="lt-head">
    <span>Column</span>
  </div>
  <div className="lt-row">
    <input className="lt-cell-input" />
    <button className="lt-trash"><IcoTrash /></button>
  </div>
</div>
```

---

### Online Status — `Figma: 41:1585`

```jsx
// Online: green dot
// Offline: grey dot
<span style={{ display:'flex', alignItems:'center', gap: 4, fontSize: 12 }}>
  <span style={{ width: 8, height: 8, borderRadius: '50%', background: C.green }} />
  Online
</span>
```

---

### Tooltip — `Figma: 5649:11853`

13 position variants (X: Center/Top/Bottom/Left/Right × Y: Top/Bottom/Left/Right/Center).
Dark tooltip: bg `grey900`, text `white`, border-radius 4px, 12px font.

---

### Bar Timer — `Figma: 4032:13932`

States: `During` (active countdown) / `Closed` / `Upcoming`.
Progress bar: bg `grey100`, fill `greenAccent`, height 4px, border-radius 2px.

---

### Pre-bid — `Figma: 3876:9005`

| Variant | bg | text |
|---|---|---|
| Purple | `purple100` #EDEBFE | `purple800` #5521B5 |
| Yellow | `yellow50` #FDFFD2 | `yellow600` #9F580A |
| Blue | `blue50` #DFF0FF | `blue800` #1A49A9 |
| Stroke | transparent | `grey900`, border `grey100` |

---

### Auction Status badge — `Figma: 2446:34350`

```jsx
<span className="badge bg-neutral">Draft</span>
<span className="badge bg-green">Published</span>
```

---

## 6. Figma Component Node IDs

| Component | Figma Node ID |
|---|---|
| Primary button | `41:1933` |
| Secondary button | `41:1942` |
| Tertiary button | `11374:83535` |
| Small button | `11552:65308` |
| Input | `41:1385` |
| Search | `734:18710` |
| Checkbox | `41:1333` |
| Checkbox small | `41:1375` |
| Badge | `533:6631` |
| Toggle / Switch | `11421:69558` |
| Switch button | `13746:52168` |
| Tabs | `11515:52911` |
| Table column header | `41:1484` |
| Table cell | `4095:35101` |
| List table row | `4110:20101` |
| Action dropdown | `4110:26782` |
| Steps / Stepper | `11763:14047` |
| Tooltip | `5649:11853` |
| Online status | `41:1585` |
| Bar timer | `4032:13932` |
| Pre-bid | `3876:9005` |
| Auction status | `2446:34350` |
| Price/Rank block | `16152:44587` |
| Participants table | `4032:14091` |
| Round / Line item | `4620:58029` |
| Images placeholder | `18850:25548` |
| Header | `6218:47817` |
| Rank badge | `19838:94034` |

---

## 7. Tokens Studio Import Guide

1. Open your Figma file
2. Install **Tokens Studio for Figma** (free plugin)
3. Plugin → Load tokens → Paste contents of `tokens.json`
4. Apply token set → Figma will generate local Variables for all colors, spacing, sizing, typography tokens
5. Use **Sync** to keep tokens in sync with this file

---

## 8. Focus / Accessibility

- Focus ring: `1px solid #00CE7C` (`greenAccent`), `outline-offset: 2px`
- Applies to: `button`, `input`, `select`, `textarea` via `:focus-visible`
- Scrollbar: width 4px, thumb `grey200`, track `grey50`
