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
    paddingTop: "20px",
    paddingBottom: "20px",
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
    paddingTop: `${SPACE[4]}px`,
    paddingBottom: `${SPACE[4]}px`,
    paddingLeft: `${SPACE[11]}px`,
    paddingRight: `${SPACE[11]}px`,
    borderBottom: `3px solid ${COLOR.brandDark}`,
  },

  headerAccent: {
    width: `100%`,
    backgroundColor: COLOR.brandDark,
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
    fontSize: `${FONT_SIZE["xl"]}px`,
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
  // CARD DETAIL TEXT
  // ────────────────────────────────────────────────────────

  infoLabel: {
    width: "100px",
    display: "inline",
    fontWeight: 700,
  },

  rowWrap: {
    paddingTop: "2px",
    paddingBottom: "2px",
  },
  cellLabel: {
    width: "100px",
    minWidth: "100px",
    verticalAlign: "top" as const,
    paddingBottom: "6px",
    paddingRight: "8px",
    fontSize: "13px",
    fontWeight: 700,
    color: "#374151",
    fontFamily: "Arial, sans-serif",
  },
  cellValue: {
    verticalAlign: "top" as const,
    paddingBottom: "6px",
    fontSize: "13px",
    color: "#374151",
    fontFamily: "Arial, sans-serif",
  },
  colon: {
    paddingRight: "8px",
    verticalAlign: "top" as const,
    fontSize: "13px",
    color: "#374151",
    fontFamily: "Arial, sans-serif",
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
    paddingBottom: `${SPACE[3]}px`,
    paddingLeft: `${SPACE[5]}px`,
    paddingRight: `${SPACE[5]}px`,
    verticalAlign: "top" as const,
    borderLeft: `${ACCENT_WIDTH}px solid ${COLOR.brand}`,
  },

  label: {
    fontFamily: FONT.family,
    fontSize: `${FONT_SIZE.label}px`,
    color: COLOR.textLabel,
    lineHeight: 1,
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
  // TRANSPORT REQUEST
  // ────────────────────────────────────────────────────────
  locationRow: {
    width: "100%",
  },

  locationCellLeft: {
    width: "50%",
    verticalAlign: "top" as const,
    paddingRight: "6px",
  },

  locationCellRight: {
    width: "50%",
    verticalAlign: "top" as const,
    paddingLeft: "6px",
  },

  locationContent: {
    padding: "16px 16px 16px 16px",
    verticalAlign: "top" as const,
  },

  locationLabel: {
    fontSize: "10px",
    color: "#999",
    fontFamily: "Arial,Helvetica,sans-serif",
    lineHeight: "1",
    paddingBottom: "6px",
  },

  locationFlagWrapper: {
    paddingBottom: "10px",
    fontSize: "0",
    lineHeight: "0",
  },

  locationFlag: {
    display: "block",
    border: "0",
  },

  locationName: {
    fontSize: "14px",
    fontWeight: "700",
    lineHeight: 1.3,
    fontFamily: "Arial,Helvetica,sans-serif",
    margin: 0,
    padding: 0,
    paddingBottom: "6px",
  },

  locationAddress: {
    fontSize: "13px",
    color: "#555",
    lineHeight: "1.5",
    fontFamily: "Arial,Helvetica,sans-serif",
    padding: 0,
    margin: 0,
  },

  originCard: {
    background: "#F9F8F6",
    borderLeft: "3px solid #C8102E",
  },

  destinationCard: {
    background: "#F9F8F6",
    borderLeft: "3px solid #1A1A1A",
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
    marginTop: `0`,
    marginBottom: "0",
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
    marginTop: `5px`,
    marginBottom: `5px`,
    padding: "0",
  },

  // ────────────────────────────────────────────────────────
  // FOOTER
  // ────────────────────────────────────────────────────────

  footer: {
    borderTop: `1px solid ${COLOR.containerBorder}`,
    backgroundColor: COLOR.white,
    // paddingTop: `${SPACE[4]}px`,
    paddingBottom: `${SPACE[6]}px`,
    paddingLeft: `${CONTAINER.paddingH}px`,
    paddingRight: `${CONTAINER.paddingH}px`,
  },

  footerBottom: {
    paddingTop: `${SPACE[3]}px`,
  },

  footerBrand: {
    fontFamily: FONT.family,
    fontSize: `${FONT_SIZE.body}px`,
    fontWeight: FONT.weight.black,
    color: COLOR.brand,
    letterSpacing: "0px",
    margin: "0",
    padding: "0",
  },

  footerLink: {
    fontFamily: FONT.family,
    fontSize: `${FONT_SIZE.caption}px`,
    color: "#555555",
    textDecoration: "none",
  },

  footerCopy: {
    lineHeight: "15px",
    fontFamily: FONT.family,
    fontSize: `${FONT_SIZE.caption}px`,
    color: "#444444",
    margin: "0",
    padding: "0",
  },

  // ────────────────────────────────────────────────────────
  // Support Signature
  // ────────────────────────────────────────────────────────

  support: {
    paddingTop: `${SPACE[8]}px`,
    paddingBottom: `${SPACE[8]}px`,
    paddingLeft: `${CONTAINER.paddingH}px`,
    paddingRight: `${CONTAINER.paddingH}px`,
  },

  // ────────────────────────────────────────────────────────
  // Table
  // ────────────────────────────────────────────────────────

  tableBlock: {
    backgroundColor: COLOR.offWhite,
    border: `1px solid ${COLOR.containerBorder}`,
    paddingTop: `${SPACE[4]}px`,
    paddingBottom: `${SPACE[4]}px`,
    paddingLeft: `${SPACE[5]}px`,
    paddingRight: `${SPACE[5]}px`,
  },

  tableHeader: {
    fontSize: "11px",
    fontWeight: FONT.weight.bold,
    color: COLOR.textLabel,
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    paddingBottom: "8px",
  },

  tableRow: {
    fontSize: "13px",
    color: COLOR.textPrimary,
    paddingTop: "6px",
    paddingBottom: "6px",
    borderTop: `1px solid ${COLOR.containerBorder}`,
  },

  tableCell: {
    fontSize: "13px",
    color: COLOR.textPrimary,
    paddingRight: "10px",
  },

  wrapper: {
    padding: "0",
    overflow: "hidden",
    // marginTop: "20px",
    // marginBottom: "20px",
  },

  titleBar: {
    backgroundColor: "#1A1A1A",
    paddingTop: "5px",
    paddingBottom: "5px",
    paddingLeft: "16px",
    paddingRight: "16px",
    borderLeft: "2px solid #C8102E",
  },
  titleText: {
    fontFamily: "Arial, Helvetica, sans-serif",
    fontSize: "10px",
    fontWeight: 700,
    letterSpacing: "1.5px",
    textTransform: "uppercase" as const,
    color: "#FFFFFF",
    margin: "0",
    padding: "0",
    lineHeight: "10px", // penting
  },

  headRow: {
    backgroundColor: "#F2F1EF",
    borderBottom: "1px solid #DDDBD7",
  },

  headCell: {
    fontFamily: "Arial, Helvetica, sans-serif",
    fontSize: "10px",
    fontWeight: 700,
    letterSpacing: "0.8px",
    textTransform: "uppercase" as const,
    color: "#888888",
    paddingTop: "8px",
    paddingBottom: "8px",
    paddingLeft: "16px",
    paddingRight: "8px",
  },

  dataRow: {
    borderBottom: "1px solid #EBEBEB",
  },

  dataRowAlt: {
    backgroundColor: "#FAFAF9",
    borderBottom: "1px solid #EBEBEB",
  },

  dataCell: {
    fontFamily: "Arial, Helvetica, sans-serif",
    fontSize: "10px",
    color: "#1A1A1A",
    paddingTop: "8px",
    paddingBottom: "8px",
    paddingLeft: "16px",
    paddingRight: "8px",
    lineHeight: "1.4",
    verticalAlign: "top" as const,
  },

  emptyCell: {
    fontFamily: "Arial, Helvetica, sans-serif",
    fontSize: "11px",
    color: "#BBBBBB",
    paddingTop: "11px",
    paddingBottom: "11px",
    paddingLeft: "16px",
    paddingRight: "8px",
  },

  accentStrip: {
    width: "3px",
    backgroundColor: "#C8102E", // brand red
    fontSize: "0",
    lineHeight: "0",
    padding: "0",
  },

  footerRow: {
    backgroundColor: "#F2F1EF",
    borderTop: "1px solid #DDDBD7",
  },

  footerCell: {
    fontFamily: "Arial, Helvetica, sans-serif",
    fontSize: "10px",
    color: "#999999",
    paddingTop: "8px",
    paddingBottom: "8px",
    paddingLeft: "16px",
    paddingRight: "16px",
  },
};
