/**
 * ─────────────────────────────────────────────────────────────────────────────
 * ShipLink Email Design System — styles.ts
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * Reusable style objects untuk semua email template.
 * Setiap email tinggal import dan pakai — tidak ada duplikasi.
 *
 * Cara pakai:
 *   import { emailStyles as s } from './styles';
 *   <Section style={s.header}>
 *   <Text style={s.headline}>
 *
 * Cara extend per-email (kalau ada kebutuhan khusus):
 *   <Text style={{ ...s.headline, fontSize: 30 }}>  ← override satu property
 * ─────────────────────────────────────────────────────────────────────────────
 */

import React from "react";
import { ACCENT_WIDTH, COLOR, CONTAINER, FONT, FONT_SIZE, SPACE } from "./tokens";

export const emailStyles: Record<string, React.CSSProperties> = {
  // ────────────────────────────────────────────────────────
  // OUTER SHELL
  // ────────────────────────────────────────────────────────

  body: {
    backgroundColor: COLOR.pageBg,
    margin: "0",
    padding: "0",
    fontFamily: FONT.family,
  },

  container: {
    maxWidth: `${CONTAINER.maxWidth}px`,
    backgroundColor: COLOR.white,
    borderTop: `1px solid ${COLOR.containerBorder}`,
    borderRight: `1px solid ${COLOR.containerBorder}`,
    borderBottom: `1px solid ${COLOR.containerBorder}`,
    borderLeft: `1px solid ${COLOR.containerBorder}`,
    margin: `${CONTAINER.outerGap}px auto`,
  },

  // ────────────────────────────────────────────────────────
  // HEADER
  // ────────────────────────────────────────────────────────

  header: {
    backgroundColor: COLOR.brand,
    paddingTop: `${SPACE[5]}px`,
    paddingBottom: `${SPACE[5]}px`,
    paddingLeft: `${SPACE[11]}px`,
    paddingRight: `${SPACE[11]}px`,
  },

  logoText: {
    fontFamily: FONT.family,
    fontSize: `${FONT_SIZE.logo}px`,
    fontWeight: FONT.weight.black,
    color: COLOR.white,
    letterSpacing: "1px",
    margin: "0",
    padding: "0",
    lineHeight: "1",
  },

  // Shadow strip tipis di bawah header
  headerStrip: {
    backgroundColor: COLOR.brandDark,
    paddingTop: "3px",
    paddingBottom: "0",
    margin: "0",
  },

  // Invisible spacer element (untuk strip, dll)
  zero: {
    fontSize: "0",
    lineHeight: "0",
    margin: "0",
    padding: "0",
  },

  // ────────────────────────────────────────────────────────
  // BODY SECTION
  // ────────────────────────────────────────────────────────

  bodySection: {
    paddingTop: `${SPACE[3]}px`,
    paddingBottom: `${SPACE[3]}px`,
    paddingLeft: `${CONTAINER.paddingH}px`,
    paddingRight: `${CONTAINER.paddingH}px`,
  },

  // "NEW TRANSPORT REQUEST" — all-caps micro text di atas headline
  eyebrow: {
    fontFamily: FONT.family,
    fontSize: `${FONT_SIZE.eyebrow}px`,
    fontWeight: FONT.weight.bold,
    letterSpacing: "2px",
    textTransform: "uppercase" as const,
    color: COLOR.secondary,
    marginTop: `${SPACE[3]}px`,
    marginBottom: `${SPACE[3]}px`,
    padding: "0",
  },

  headline: {
    fontFamily: FONT.family,
    fontSize: `${FONT_SIZE["2xl"]}px`,
    fontWeight: FONT.weight.black,
    color: COLOR.textPrimary,
    lineHeight: "1.2",
    marginTop: `${SPACE[3]}px`,
    marginBottom: `${SPACE[3]}px`,
    padding: "0",
  },

  description: {
    fontFamily: FONT.family,
    fontSize: `${FONT_SIZE.base}px`,
    color: COLOR.textBody,
    lineHeight: "1.6",
    marginTop: `${SPACE[3]}px`,
    marginBottom: `${SPACE[3]}px`,
    padding: "0",
  },

  // ────────────────────────────────────────────────────────
  // ROUTE BLOCK (Origin / Destination cards)
  // ────────────────────────────────────────────────────────

  routeWrapper: {
    marginTop: "0",
    marginBottom: "0",
    paddingTop: "0",
    paddingBottom: "0",
  },

  // 50% width columns — gap via paddingRight / paddingLeft (6px each)
  originColumn: {
    width: "50%",
    verticalAlign: "top" as const,
    paddingRight: "6px",
  },

  destinationColumn: {
    width: "50%",
    verticalAlign: "top" as const,
    paddingLeft: "6px",
  },

  // Accent bars — narrow <td> di sisi kiri tiap route card
  accentBrand: {
    // ← warna brand (origin)
    width: `${ACCENT_WIDTH}px`,
    backgroundColor: COLOR.brand,
    fontSize: "0",
    lineHeight: "0",
  },

  accentDark: {
    // ← warna gelap (destination)
    width: `${ACCENT_WIDTH}px`,
    backgroundColor: COLOR.black,
    fontSize: "0",
    lineHeight: "0",
  },

  // CARD
  card: {
    backgroundColor: COLOR.offWhite,
    paddingTop: `${SPACE[6]}px`,
    paddingBottom: `${SPACE[6]}px`,
    paddingLeft: `${SPACE[5]}px`,
    paddingRight: `${SPACE[5]}px`,
  },
  detailText: {
    fontSize: "13px",
    color: COLOR.black,
    margin: 0,
    padding: 0,
  },
  cardTitle: {
    fontSize: "12px",
    fontWeight: 700,
    color: COLOR.textLabel,
  },

  cardText: {
    fontSize: "13px",
    color: COLOR.black,
  },

  cta: {
    backgroundColor: COLOR.brand,
    color: COLOR.white,
    fontSize: "13px",
    fontWeight: 700,
    padding: "12px 24px",
    textDecoration: "none",
    display: "inline-block",
  },
  // Content area di dalam route card (sebelah accent bar)
  routeContent: {
    backgroundColor: COLOR.offWhite,
    paddingTop: `${SPACE[3]}px`,
    paddingBottom: `${SPACE[6]}px`,
    paddingLeft: `${SPACE[5]}px`,
    paddingRight: `${SPACE[5]}px`,
    verticalAlign: "top" as const,
  },

  routeLabel: {
    fontFamily: FONT.family,
    fontSize: `${FONT_SIZE.label}px`,
    color: COLOR.textLabel,
    lineHeight: "24px",
    margin: "0 0 6px",
    padding: "0",
  },

  flag: {
    display: "block",
    outline: "none",
    border: "none",
    textDecoration: "none",
    marginBottom: `${SPACE[3]}px`,
  },

  routeName: {
    fontFamily: FONT.family,
    fontSize: `${FONT_SIZE.base}px`,
    fontWeight: FONT.weight.bold,
    lineHeight: "1.3",
    color: COLOR.textPrimary,
    margin: "0 0 6px",
    padding: "0",
  },

  routeAddress: {
    fontFamily: FONT.family,
    fontSize: `${FONT_SIZE.body}px`,
    color: COLOR.textAddress,
    lineHeight: "1.5",
    margin: "0",
    padding: "0",
  },

  // ────────────────────────────────────────────────────────
  // CTA BUTTON
  // ────────────────────────────────────────────────────────

  ctaButton: {
    backgroundColor: COLOR.brand,
    fontFamily: FONT.family,
    fontSize: `${FONT_SIZE.small}px`,
    fontWeight: FONT.weight.bold,
    letterSpacing: "1px",
    textTransform: "uppercase" as const,
    color: COLOR.white,
    textDecoration: "none",
    paddingTop: `${SPACE[5]}px`,
    paddingBottom: `${SPACE[5]}px`,
    paddingLeft: `${SPACE[10]}px`,
    paddingRight: `${SPACE[10]}px`,
    display: "inline-block",
    marginTop: `${SPACE[6]}px`,
    marginBottom: "0",
  },

  supportText: {
    fontFamily: FONT.family,
    fontSize: `${FONT_SIZE.small}px`,
    color: COLOR.textLabel,
    lineHeight: "24px",
    marginTop: `${SPACE[3]}px`,
    marginBottom: `${SPACE[3]}px`,
    padding: "0",
  },

  supportLink: {
    color: COLOR.textLink,
    textDecoration: "none",
  },

  // ────────────────────────────────────────────────────────
  // DIVIDER & SIGN-OFF
  // ────────────────────────────────────────────────────────

  divider: {
    borderTop: `1px solid ${COLOR.divider}`,
    margin: "0",
  },

  signoff: {
    paddingTop: `${SPACE[1]}px`,
    paddingBottom: `${SPACE[1]}px`,
    paddingLeft: `${CONTAINER.paddingH}px`,
    paddingRight: `${CONTAINER.paddingH}px`,
  },

  signoffText: {
    fontFamily: FONT.family,
    fontSize: `${FONT_SIZE.body}px`,
    color: COLOR.textAddress,
    lineHeight: "24px",
    marginTop: `${SPACE[1]}px`,
    marginBottom: `${SPACE[1]}px`,
    padding: "0",
  },

  // ────────────────────────────────────────────────────────
  // FOOTER
  // ────────────────────────────────────────────────────────

  footer: {
    borderTop: `1px solid ${COLOR.containerBorder}`,
    backgroundColor: COLOR.white,
    paddingTop: `${SPACE[8]}px`,
    paddingBottom: `${SPACE[8]}px`,
    paddingLeft: `${CONTAINER.paddingH}px`,
    paddingRight: `${CONTAINER.paddingH}px`,
  },

  footerBrand: {
    fontFamily: FONT.family,
    fontSize: `${FONT_SIZE.body}px`,
    fontWeight: FONT.weight.black,
    color: COLOR.brand,
    letterSpacing: "0px",
    margin: "0",
    padding: "0",
    lineHeight: "24px",
  },

  footerLink: {
    fontFamily: FONT.family,
    fontSize: `${FONT_SIZE.caption}px`,
    color: "#555555",
    textDecoration: "none",
  },

  footerCopy: {
    fontFamily: FONT.family,
    fontSize: `${FONT_SIZE.caption}px`,
    color: "#444444",
    margin: "0",
    padding: "0",
  },
};
