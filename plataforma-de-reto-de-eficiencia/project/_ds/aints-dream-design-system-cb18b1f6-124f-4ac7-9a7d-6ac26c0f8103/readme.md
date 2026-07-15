# aints&dream — Design System

## Overview
This is the design system for **aints&dream**. It was built directly from the brand's Adobe Color palette and typography references — there is no attached codebase, Figma file, or existing app to recreate, so this system establishes visual foundations (color, type, spacing) and a standard set of reusable UI primitives for future product work.

### Sources provided
- `uploads/AdobeColor-My Color Theme (2).jpeg` — the brand's official 4-color Adobe Color palette (Blossom pink, Butter yellow, Periwinkle lavender, Cocoa brown).
- `uploads/Captura de pantalla 2026-07-13 120959.png` — a reference screenshot of a "pouch" wordmark, used **only** as a typography/lettering reference for how titles should feel (rounded, bubbly, lowercase). Not a logo or product name for this brand.
- `uploads/Captura de pantalla 2026-07-13 122424.png` — a reference screenshot naming the typeface "Stack Sans Text" for body/UI text.

No logo, codebase, or Figma file was provided for aints&dream itself. **No logo has been created** — per design-system rules, this system never invents a brand mark. Wherever a logo would go, use the wordmark "aints&dream" set in the display typeface.

## Index
- `styles.css` — root stylesheet, imports all tokens.
- `tokens/colors.css` — color scales + semantic aliases.
- `tokens/fonts.css` — @font-face declarations (Fredoka, Stack Sans Text).
- `tokens/typography.css` — type scale, weights, line-heights.
- `tokens/spacing.css` — spacing, radius, shadow tokens.
- `guidelines/` — foundation specimen cards (colors, type, spacing, radius/shadow).
- `components/core/` — Button, IconButton, Card, Badge, Tag.
- `components/forms/` — Input, Select, Checkbox, Radio, Switch.
- `components/feedback/` — Dialog, Toast, Tooltip.
- `components/navigation/` — Tabs.

## Components
Standard primitive set (no source codebase/Figma was provided, so this is the brand's own baseline set, sized to typical product needs):
- **Button** — primary/secondary/tertiary/ink/ghost variants, pill-shaped.
- **IconButton** — circular icon-only action button.
- **Card** — rounded, soft-shadowed content surface with optional tint.
- **Badge** — small status/metadata pill.
- **Tag** — removable filter/category chip.
- **Input** — labeled text field.
- **Select** — labeled dropdown.
- **Checkbox** — rounded-square checkbox.
- **Radio** — circular radio button.
- **Switch** — on/off toggle.
- **Dialog** — centered modal with backdrop.
- **Toast** — inline notification banner.
- **Tooltip** — hover label.

### Intentional additions
All 13 components above are additions (no source inventory existed to constrain from) — sized as a minimal, typical starter kit rather than an exhaustive library. Add more (Avatar, Tabs panels, Pagination, etc.) as real product screens are defined.

## Content fundamentals
Only a color palette and a typography reference were provided — no product copy, marketing pages, or UX writing samples. Until real copy is supplied:
- Treat "aints&dream" as a playful, warm, lowercase-leaning wordmark (matching the rounded display type).
- No emoji usage has been confirmed either way; none is used in components by default.
- **Ask the brand owner** for real copy samples (app text, marketing lines, error messages) before writing extensive UX copy in this voice — this section will be filled in once samples exist.

## Visual foundations
- **Color**: exactly four brand colors — Blossom pink `#FFAEEE`, Butter yellow `#FEF9B0`, Periwinkle lavender `#A9A9EB`, Cocoa brown `#6E4027`. No reds, no greens, anywhere — this is an explicit brand constraint. Cocoa brown stands in for "ink" (body text, dark surfaces) instead of black. Backgrounds lean toward soft butter-yellow and white; lavender and pink are used for accents/actions; brown anchors text and dark UI moments.
- **Type**: two families. Fredoka (rounded, geometric, semibold) for display/titles — chosen as the closest available match to the brand's rounded "pouch" wordmark reference. Stack Sans Text (clean grotesk) for body and UI text — matched by name from the brand's own reference screenshot.
- **Spacing**: 4px-based scale (4 → 96px).
- **Corner radii**: soft and rounded throughout (8–28px, plus full pill/circle) — no sharp corners, matching the bubbly wordmark reference.
- **Shadows**: soft, warm-brown-tinted (never pure black), low opacity, used sparingly on cards and modals only.
- **Borders**: thin (1–1.5px), warm neutral tones derived from the Cocoa scale, not gray.
- **Backgrounds**: flat color fields (pink/yellow/lavender tints), no gradients, no photographic imagery provided.
- **Animation**: minimal — small scale-down on button press, 0.15s ease transitions on hover/toggle states. No bounces, no looping decorative motion.
- **Hover states**: subtle background shifts (white pill inside tab track, filled circle behind icon buttons).
- **Press states**: buttons scale to 0.96 on press.
- **Transparency/blur**: none currently — no frosted-glass or backdrop-blur motifs observed in the source material.
- **Imagery**: none provided. No photography, illustration, or texture assets exist yet — ask the brand owner for real photography/illustration before using any in a design.

## Iconography
No icon set, icon font, or SVG sprite was provided. No icons currently exist in `assets/`. Components that need a glyph (IconButton, Tooltip trigger) accept any child element/emoji/text as a placeholder — **do not hand-draw brand icons**. When an icon set is provided (or a CDN set like Lucide/Heroicons is approved), copy or link it here and document usage.

## Font substitution flag
"Stack Sans Text" is used exactly as named in the reference screenshot (verified as a real, open, self-hostable Google Font). "Fredoka" is a **substitution** for the brand's custom rounded title lettering seen in the "pouch" reference — the original title typeface/outline file was not provided. If the brand owns a specific custom or licensed display font, please share the font files and this system will be updated to use it exactly.
