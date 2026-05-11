/**
 * ─────────────────────────────────────────────────────────────────────────────
 * ShipLink Email Design System — tokens.ts
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * SINGLE SOURCE OF TRUTH untuk seluruh 40+ email templates.
 *
 * Cara pakai:
 *   import { COLOR, FONT, SPACE, FONT_SIZE, RADIUS } from './tokens';
 *
 * Cara update brand color:
 *   Cukup ubah COLOR.brand di sini → semua email ikut berubah.
 * ─────────────────────────────────────────────────────────────────────────────
 */

// ─── Color Palette ────────────────────────────────────────────────────────────
export const COLOR = {
  // Brand — ubah di sini untuk rebranding
  brand: "#C8102E", // primary red (CTA, accents, eyebrow)
  brandDark: "#A50D24", // hover / shadow strip bawah header
  brandFade: "#E8899A", // teks di atas background merah (solid, no rgba)
  brandBorder: "#8B3040", // border badge di atas background merah
  brandMuted: "#D94060", // teks badge di atas background merah
  secondary: "#385196", // secondary blue (CTA, accents, eyebrow)
  // Neutrals
  black: "#1A1A1A", // headline, body text penting
  white: "#FFFFFF", // background kartu, teks di atas gelap
  offWhite: "#F9F8F6", // background route block / card ringan
  pageBg: "#F0EFED", // outer background (di luar container)

  // Borders & Dividers
  containerBorder: "#E0DDD8",
  divider: "#ECECEA",

  // Text hierarchy
  textPrimary: "#1A1A1A", // = black, untuk judul
  textBody: "#666666", // body / description (muted)
  textLabel: "#999999", // micro-label (ORIGIN, DESTINATION, footer)
  textAddress: "#555555", // alamat, sign-off
  textLink: "#C8102E", // = brand, untuk inline link
} as const;

// ─── Typography ───────────────────────────────────────────────────────────────
export const FONT = {
  // React Email sangat terbatas font-nya; stack safe untuk semua email client
  family: "Arial, Helvetica, sans-serif",

  weight: {
    regular: 400,
    bold: 700,
    black: 800,
  },
} as const;

// ─── Font Sizes (px) ──────────────────────────────────────────────────────────
export const FONT_SIZE = {
  micro: 9, // badge text
  eyebrow: 14,
  label: 10, //  route label, footer
  caption: 11, // footer copy
  small: 12, // CTA button text, support text
  body: 13, // sign-off, footer brand
  base: 14, // description, route name
  lg: 16, // —
  xl: 20, // headline mobile fallback
  "2xl": 22, // headline desktop
  logo: 28, // logo header
} as const;

// ─── Spacing (px) ─────────────────────────────────────────────────────────────
//
// Gunakan skala ini, JANGAN hardcode angka sembarangan di email.
// Ini memastikan rhythm vertikal konsisten di semua 40 email.
//
export const SPACE = {
  0: 0,
  1: 4,
  2: 8,
  3: 10,
  4: 12,
  5: 14,
  6: 16,
  7: 20,
  8: 22,
  9: 24,
  10: 32,
  11: 42,
  12: 48,
} as const;

// ─── Container ────────────────────────────────────────────────────────────────
export const CONTAINER = {
  maxWidth: 600, // px — lebar maksimum email
  outerGap: 24, // margin atas-bawah container dari viewport
  paddingH: 48, // padding horizontal section (body, footer, dll)
  paddingHMd: 20, // padding horizontal saat mobile
} as const;

// ─── Accent bar (route block left-border trick) ───────────────────────────────
export const ACCENT_WIDTH = 3; // px
