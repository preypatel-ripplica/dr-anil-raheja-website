# Dr. Anil Raheja — Design Taste & Brand Direction (Orthopedics)

> Derived from the updated "Healthcare Website Design" Pinterest board (ortho refresh,
> ~30 new pins) + Dr. Anil's existing site. This is the working brief for the
> `dr-anil-raheja` Next.js revamp. Companion to `DESIGN_TASTE.md` (Dr. Tripti's
> feminine editorial brief) — same family of clinics, deliberately different voice.

---

## 1. Brand personality

Where Tripti's brand is warm and editorial, Anil's is **precise, strong, and
reassuringly clinical** — the confidence of a surgeon with 12,000+ operations.
The new pins agree: clean white/ice layouts, deep navy display type, and a single
**vital green** accent that signals movement, recovery, and "go".

Three words to design against: **strong · precise · restorative.**
Avoid: warm blush tones (that's Tripti's), generic hospital blue-on-blue, clutter.

Continuity bonus: the existing site's brand green `#2bb371` survives the revamp —
evolved, not replaced — so patients still recognise the clinic.

---

## 2. What the reference pins actually show

| Reference | What to steal |
| --- | --- |
| **Wellnester** (green family clinic — closest analogue) | Fresh **green accent on white**, huge grotesk display type, full-bleed hero photo with **floating info/stat cards**, green stat numerals (20+/15+/98%), green pill badges, steps-to-care cards, circular progress ring. |
| **HealthSync** (minimal cardiology) | White-first minimalism, **mint→sage gradient panels**, **numbered service lists (01/02/03)**, thin hairlines, pill-outline nav chips, deep forest-green CTA blocks, small dot-eyebrows. |
| **Medvita / Nuvica** (clinic template, seen twice) | **Navy display headlines** + ice-blue tinted cards, **stat band** ($250M / 20M+ / 95% / 200+), department grid of numbered cards with icon chips, doctor-team cards, green pill eyebrow badges. |
| **Meditix** | Trust-layout conventions: services trio, "why choose us", pricing-style cards — keep the *organization*, skip the blue-on-blue. |
| **Royal blue + cream brochure** | Editorial print feel for long-form treatment content: numbered TOC, two-column text, strong rules. |
| **Gronur app / Muhwano branding / retro deck** | General taste: navy+white card cleanliness, confident green identity, one playful shape accent used sparingly. |

---

## 3. Color palette

**Deep navy ink + vital green on ice/white.**

### Core
| Token | Hex | Role |
| --- | --- | --- |
| `--ice` | `#f4f8f7` | Page background (cool off-white) |
| `--mint` | `#e6f4ec` | Section tint, card fills, gradient start |
| `--sage` | `#cfe8da` | Deeper tint, gradient end |
| `--green` | `#1ea567` | **Primary accent** — CTAs, links, stats (evolved from site's `#2bb371`) |
| `--green-deep` | `#0e7a4a` | Hover/pressed, forest CTA blocks |
| `--navy` | `#0b1f3a` | Display headings, dark bands, footer |
| `--navy-soft` | `#12315a` | Secondary dark surface |

### Supporting
| Token | Hex | Role |
| --- | --- | --- |
| `--ink` | `#10233e` | Heading text (navy ink) |
| `--text` | `#42526b` | Body copy (cool slate) |
| `--muted` | `#7787a0` | Secondary copy |
| `--line` | `#dfe9e4` | Hairlines on ice |
| `--amber` | `#f2a93b` | Stars/ratings only |

**Usage rules**
- White/ice-first: big clean fields; mint/sage only as tints and soft gradients
  (`linear-gradient(135deg, var(--mint), var(--sage))`).
- Green is the single loud voice — buttons, numerals, pills, icons. Navy grounds it
  (dark bands, footer, headline ink). Never introduce a second hue except amber stars.
- Shadows: cool and soft — `0 20px 50px rgba(11, 31, 58, 0.10)`.

---

## 4. Typography

**Bold grotesk display + humanist clinical body.**

- **Display / headings — `Space Grotesk`** (Google Fonts). Confident, technical,
  slightly engineered — right for a surgeon; echoes Wellnester/Nuvica's bold sans.
  Weight 500–700, tight leading, `letter-spacing: -0.02em`.
- **Body / UI — `IBM Plex Sans`** (Google Fonts). *This is the existing site's font* —
  kept deliberately for brand continuity; clean and clinical. 400/500/600.
- Scale: hero `clamp(2.6rem, 5.5vw, 4.4rem)`; body 16px/1.7.
- Eyebrows: green **pill badges** (mint fill, green text, tiny dot) — not bare text.
- Numbers are a display element: big green numerals for stats and 01/02/03 lists.

---

## 5. Shape & motif language

- **Floating info cards** over hero/section photos (rating card, "12,000+ surgeries"
  chip, clinic-hours pill) — Wellnester's signature.
- **Numbered everything**: services 01–05, process steps, treatment page sections.
- **Green pill badges** for eyebrows/labels; pill buttons with arrow.
- **Stat band** on mint or navy with count-up numerals.
- **Circular progress ring** accents (recovery %, satisfaction).
- Cards: 16–20px radius, hairline `--line` borders, hover lift + shadow.
- Thin outline icons only (bone/joint/spine glyphs drawn as line SVGs).
- One dark **forest/navy CTA band** per page.

## 6. Motion & micro-interactions (new for this project)

Delight, but clinical-calm — nothing bouncy:
- **Reveal on scroll**: sections fade/slide up 12–20px, 500ms ease-out, staggered
  children (IntersectionObserver, CSS-driven, respects `prefers-reduced-motion`).
- **Count-up stats** when the stat band enters view.
- **Hover**: cards lift −4/−6px with shadow; arrows nudge right; image scale 1.05.
- **Accordion/steppers**: animated height + rotating chevron.
- **Progress bars** in multi-step tools animate width.
- Buttons: subtle press scale (0.98) and color transitions ≤250ms.

## 7. Interactive conversion tools (missing from the old site — the upsell)

1. **Symptom Guide** (home): 3-question guided quiz — where does it hurt → what does
   it feel like → how long — ends at a recommended treatment page + "Book a visit"
   CTA with the answers pre-summarised. Progress bar, animated step transitions.
2. **Plan Your Visit** (contact/home): stepper that picks clinic location → shows
   hours/address/phone → mini booking form.
3. **Treatment enquiry mini-form** on every treatment page sidebar ("Ask about knee
   replacement") — name + phone + question, pre-tagged with the treatment.
All front-end only; data as plain objects so the CMS/backend developer wires later.

## 8. Page-by-page application

Same IA as the live site (one page per treatment; `-in-delhi` duplicates become the
same route): Home, About, Hip / Knee / Spine / Arthroscopic / Arthritis treatments,
Photo Gallery, Videos (YouTube Shorts grid), Testimonials (212-review Google rating),
Blogs (3 posts incl. ACL), Contact.

- **Home**: hero (photo + floating cards + trust row) → stat band (count-up) →
  Symptom Guide → services grid (numbered cards) → about strip → video shorts →
  Google-rating testimonials → process steps → blog → CTA band.
- **Treatment pages**: editorial two-column body with numbered sections, symptom
  checklists, FAQ accordion (hip has real FAQs + costs), sidebar with treatment nav +
  enquiry mini-form + helpline card.
- **Testimonials**: "EXCELLENT ★★★★★ · 212 Google reviews" hero block + quote cards.
- **Contact**: location cards for all three clinics (Vijay Nagar / Apollo Spectra /
  Jeewan Mala) with OPD hours + map + Plan-Your-Visit stepper.

The test: it should read as the *brother site* to Tripti's — same family, clearly
related quality, but masculine-clinical green/navy instead of feminine rose/cream.

---

## 10. Revision — the "engineered" differentiation pass

Client feedback: colors were right but layouts/UI read too close to the Tripti
sites. The language was pushed to a distinct **"clinical blueprint / engineered"**
identity (orthopedics = structural engineering of the body):

- **Geometry**: squared radii (6–14px) everywhere — no pills. Tripti owns the
  soft-curve language; Anil owns the technical one.
- **Labels**: eyebrow pills → technical index labels ("01 — Specialities") with a
  gradient hairline rule; section heads left-aligned by default.
- **Buttons**: squared, **gradient-filled** (`--grad-green`), inset top highlight,
  sweeping sheen on hover, arrow nudges; plus a `btn--ghost` underline-grow link
  style. Subtle gradients also on number chips, tick chips and one emphasized word
  per heading (`.grad-text`).
- **Hero**: full dark navy canvas (`--grad-ink`) with a faint engineering **grid
  texture**, oversized display type with an **outlined word** (`-webkit-text-stroke`),
  doctor cut-out fading into the canvas over a glowing ring, and a **"vitals bar"**
  stat strip anchoring the hero (28+ yrs · 12,000+ surgeries · ★ 212 reviews · 3 OPDs).
- **Services**: numbered **index rows** (ledger style with hover thumb + arrow chip),
  not card grids.
- **About**: sticky offset editorial block with a `dl` facts table (Education /
  Hospitals / Memberships) — no check-card list.
- **Process**: connected **timeline** with gradient dots, not step cards.
- **Reviews**: dark band with one **featured quote** + a compact review **ledger** —
  not a card grid.
- **Treatment pages**: **"case file"** pattern — dark spec header with breadcrumbs,
  facts **spec strip** (surgery time, hospital stay, cost…), sticky left **index
  rail** (numbered TOC anchors), max-width editorial content with numbered rules,
  enquiry as a full-width band, and an "other specialities" chip strip. Replaces the
  Tripti-style right-sidebar layout entirely.
- FAQ + blog share one two-column section on home; blog as compact ledger rows.
