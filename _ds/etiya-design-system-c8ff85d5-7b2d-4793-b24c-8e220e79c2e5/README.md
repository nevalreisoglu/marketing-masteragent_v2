# Atya Design System

A design system for **Atya Marketing Suite** — a telco-oriented customer engagement platform. This system captures the visual language of the flagship product **ECM (Atya Customer Management)** and extends it to cover the five-component suite: **CDP, Digital Twin, Agentic AI, ECM, and Wizbot**.

> **Brand note:** The product is **Atya** (seen in the logo wordmark on every reference screenshot). Earlier briefs referred to it as "Atya" — this is treated as a typo.

---

## Sources used to build this system

All reference material was provided as uploaded screenshots (no codebase or Figma link was available). Copies live in `assets/reference/`:

| File | Surface |
|---|---|
| `atya-dashboard.png` | ECM Dashboard — campaign timeline, KPIs, analytics |
| `atya-operation-analysis.png` | Operation Analysis / Delivery Result table |
| `atya-programs.png` | Programs search + list |
| `atya-campaigns.png` | Campaign search + list with filter rail |
| `atya-campaign-form.png` | Campaign creation form (Steps, inputs, slider) |
| `atya-email-builder.png` | Email template builder with live preview |
| `atya-journey-builder.png` | Journey Builder canvas (Delivery / Timer / Event nodes) |

> **Missing / needed from brand team:**
> - Exact **brand font files** (system currently substitutes **Open Sans** — see `fonts/README.md`)
> - Official **logo SVG** (current logo in `assets/logos/` is a type-faithful recreation)
> - **Icon set** — ECM appears to use a utility line-icon set; Lucide is substituted via CDN (flagged in ICONOGRAPHY below)

---

## Product context — the Marketing Suite

Atya Marketing Suite is positioned for telco operators. It runs proactive, signal-driven customer journeys. Five components work together:

| Component | Role |
|---|---|
| **CDP** | Unified customer data layer |
| **Digital Twin** | Community-level modeling — detects cohort-wide signals (e.g. *"Data Overage Risk — Next 10 Days"*) |
| **Agentic AI** | Copilot with specialized agents (Segmentation, CLV, Strategy, Delivery Configuration) |
| **ECM** | Prioritization Engine + Journey Builder + Monitoring (the established product) |
| **Wizbot** | Conversational analytics / insights assistant |

The design system's visual anchor is ECM. New suite components inherit ECM's vocabulary and add a small component-label badge at the top of each surface.

---

## Content fundamentals

ECM copy is **concise, operational, and direct** — written for marketing ops professionals who manage campaigns daily.

**Voice**
- **Neutral and functional.** Labels over sentences. *"Campaign Timeline"*, *"No campaigns scheduled for today"*, *"Create New Campaign"*.
- **Second-person when instructional, otherwise impersonal.** *"Your schedule is completely clear for the day. This is a great opportunity to analyze past performance or plan ahead."* — only place in the whole dashboard that speaks to the user directly.
- **No marketing fluff.** No adjectives like "powerful" or "seamless". No exclamation marks.

**Casing**
- **Title Case** for: page titles, card headers, section headings, nav items, button labels. *"Campaign Timeline"*, *"Key Performance Indicators"*, *"Create New Campaign"*, *"Journey Builder"*.
- **UPPERCASE** for: breadcrumb trail, eyebrows, day-of-week pills. *"DASHBOARD"*, *"FAVORITES"*, *"MONDAY"*.
- **Sentence case** for: helper text, empty-state body, tooltip content.

**Numbers & units**
- Currencies render in **Turkish Lira** first in data examples (`₺89`, `₺1.2M`) — fiction but region-appropriate for the telco case.
- Percentages with no space: `16.6%`.
- Large numbers: thousand separator with comma in English UI (`14,470`, `45,230`).
- Dates as `Oct 6` / `APR 24 - 26, 2026` in headers; ISO in tables.

**Emoji & exclamation** — **not used** in the product UI. Email templates may use sparse emoji (a sun 🌞 was seen in one marketing template preview), but that is content, not chrome.

**Pronouns** — "You / your" only in instructional empty states. The product otherwise refers to entities by their name ("customers", "campaigns", "the community").

---

## Visual foundations

**Overall vibe** — clean enterprise B2B. Light, cool, slightly clinical. Information-dense but disciplined. Colored accents used sparingly: green for primary confirmations and section headings, orange as brand highlight, neutral slate for chrome.

**Color**
- Two accent colors dominate: **Atya orange** (`#F7941D`, used for the logo and high-attention CTAs like "Create New Campaign") and **ECM green** (`#62AB47`, used for section headings, "Save" / "Search" buttons, active breadcrumbs).
- Page background is a very light cool blue-gray (`#F0F5FB`). Cards are pure white.
- Semantic color palette uses soft tints + saturated accent — pills and badges are low-contrast (`--success-bg` + `--success`), not neon.
- Journey Builder has its own palette: **blue** (Delivery), **yellow** (Timer), **green** (Event). Pulled directly from `ekran-7.png`.

**Type**
- Single humanist sans family throughout. Current stand-in: **Open Sans** (flagged substitute).
- Body text is small: **13px**. Dense tables step down to 12px.
- Section headings rendered in **green** — a signature ECM tic. Page headers are the one exception (neutral slate).
- Breadcrumbs and eyebrows are **UPPERCASE** with wide tracking.

**Spacing & layout**
- 4px base grid. Everything snaps to multiples of 4.
- Two-pane layout: **fixed left sidebar** (~200px, white, subtle active state), plus a thin **vertical secondary rail** for favorites.
- Top: **persistent header** with logo, hamburger, language switcher, notifications, user avatar.
- Breadcrumb strip sits below the header, above the main canvas.
- Content is framed in cards with 16–24px inner padding and 24px gutters between cards.

**Cards**
- White (`--bg-surface`) on light canvas, `--radius-md` (6px), `--border-subtle` hairline + `--shadow-xs`. Never heavy drop-shadows.
- Card headers left-aligned, green, with optional filter/pill inline.

**Borders & dividers**
- Universal 1px hairlines in `#E3E8EF`. Table rows separated by `#EEF2F7` — very low contrast.
- No thick or colored borders.

**Buttons**
- **Primary (green):** solid `--atya-green` bg, white text, `--radius-md`, 8px×14px padding. Used for Save, Search, Create.
- **Brand accent (orange):** solid `--atya-orange` bg, white text. Reserved for the hero / empty-state CTA (e.g. "Create New Campaign" in the dashboard empty state).
- **Secondary (slate):** solid `--atya-slate` bg, white text. "Back", "Clear", "Cancel".
- **Export/utility:** dark slate. Rare.
- All buttons **squared** with `--radius-md` (not pill-shaped except selected day pills).

**Form fields**
- Bordered inputs, white fill, `--radius-sm`, subtle left-aligned label in green above.
- Placeholder in `--fg4`.
- Required marker: red asterisk.
- Calendar inputs have a green calendar icon button on the right edge.

**Animation**
- **Minimal.** Hover fades (~120ms). No bounces, no parallax, no hero animations.
- Modal enters with a short fade+scale (~150ms). Journey node drag uses native drag behavior.

**Hover states**
- Buttons: slight background darken (~10%) — no scale change.
- Rows: `--bg-subtle` tint.
- Links: underline appears.

**Press states**
- Buttons: darker still, no shrink.
- Nav items: selected state uses `--bg-sidebar-active` + green text.

**Shadows**
- Very restrained. `--shadow-xs` on cards. `--shadow-md` on dropdowns / menus. `--shadow-lg` only on modals. Never on body copy.

**Transparency & blur** — not used. ECM is an opaque, flat surface system.

**Corner radii** — `--radius-md` (6px) is the default. Pills use `--radius-pill` (day selector, status badges).

**Imagery** — none in chrome. Illustrations are tiny line icons in empty-states (the campaign empty state shows a minimal calendar-with-check mark). Brand photography is not part of the product UI.

---

## Iconography

ECM uses a **light line-icon style** — ~1.5px strokes, 20–22px grid, rounded terminals, single-color (neutral slate or semantic accent). No filled icons; no multi-tone icons.

**Where they appear:**
- Sidebar nav (Dashboard, Program, Campaign, Content, Segmentation, Datamart, Parameters, Journey Builder)
- Empty states (calendar-with-check)
- KPI cards (envelope, bell, eye, click-cursor, paper — each in its own semantic hue)
- Journey Builder palette (Delivery → paper-plane; Timer → clock; Event → plus)

**Current substitute:** **Lucide Icons** via CDN. Stroke style and metrics match ECM's native icons closely. When the real Atya icon set is provided, swap by pointing `--icon-src` (and the `<Icon>` component in UI kits) at the new source.

```html
<!-- loaded on demand in UI kit pages -->
<script src="https://unpkg.com/lucide@latest"></script>
```

**Emoji** — not used in chrome.
**Unicode icons** — only `→` arrows in breadcrumbs and occasional `✓` in form confirmations.

---

## Index (manifest)

```
README.md               this file
SKILL.md                agent-invocation manifest
colors_and_type.css     CSS variables + base element styles
fonts/                  substitute font notes
assets/
  logos/                Atya wordmark + suite-component glyphs
  icons/                icon usage notes + any imported SVGs
  reference/            original ECM screenshots (flagged as reference)
preview/                design-system review cards (registered assets)
ui_kits/
  marketing-suite/      full ECM-styled Marketing Suite UI kit
    index.html          interactive click-through prototype
    *.jsx               component implementations
    README.md
```

## Using the system

- For HTML prototypes: `<link rel="stylesheet" href="colors_and_type.css">` and use CSS variables directly.
- For components: copy from `ui_kits/marketing-suite/` — components are intentionally simple and cosmetic, meant to be pieced together.
- For brand surfaces (slides, pitch decks): use `--atya-orange` as the single accent, `--atya-slate` for chrome, white-on-slate for section dividers.
