/**
 * ShipLink — New Transport Request Email
 *
 * Compatibility targets:
 *   Outlook 2007 / 2010 / 2013 / 2016 / 2019 / 365
 *   Gmail (web + app), Apple Mail, Yahoo! Mail, Samsung Mail
 *
 * Compatibility rules applied:
 *   ✅ NO borderRadius        → Outlook strips it silently
 *   ✅ NO overflow            → Outlook strips it silently
 *   ✅ NO display:flex        → Outlook ignores it; layout via <table> only
 *   ✅ NO flexDirection / flexShrink
 *   ✅ NO rgba()              → Outlook ignores it; solid hex only
 *   ✅ NO CSS height property → Yahoo! Mail strips it; use HTML height="" attr
 *   ✅ NO whiteSpace:pre-line → use explicit <br /> instead
 *   ✅ NO CSS shorthand       → expand padding/border to individual properties
 *   ✅ Accent bars = nested <table> td with bgcolor + width attr (not <div>)
 *   ✅ All layout = <table><tr><td> — zero CSS positioning / grid / flex
 *   ✅ All padding split into paddingTop/Right/Bottom/Left
 */

import { Body, Head, Html, Preview } from "react-email";

// ─── Colour tokens — solid hex only, no rgba ─────────────────────────────────
const C = {
  red: "#C8102E",
  redDark: "#A50D24",
  redFade: "#E8899A", // logo "LINK" on red bg  (≈ rgba white 50%)
  redBorder: "#8B3040", // badge border on red bg (≈ rgba white 30%)
  redMuted: "#D94060", // badge text on red bg   (≈ rgba white 65%)
  black: "#1A1A1A",
  offWhite: "#F9F8F6",
  pageBg: "#F0EFED",
  containerBorder: "#E0DDD8",
  divider: "#ECECEA",
  muted: "#666666",
  label: "#999999",
  address: "#555555",
  white: "#ffffff",
} as const;

// ─── Props ────────────────────────────────────────────────────────────────────
export interface ShipLinkTransportEmailProps {
  orderId?: string;
  originName?: string;
  originAddress?: string;
  originCity?: string;
  originCountry?: string;
  destinationName?: string;
  destinationAddress?: string;
  destinationCity?: string;
  destinationCountry?: string;
  loginUrl?: string;
  supportUrl?: string;
}

const defaults: Required<ShipLinkTransportEmailProps> = {
  orderId: "C105647",
  originName: "Old Route",
  originAddress: "Old Route 66",
  originCity: "St. Louis, MO 65401",
  originCountry: "United States",
  destinationName: "Test Nama Yang Panjang Sekali",
  destinationAddress: "1000 Boulevard Saint-Jean",
  destinationCity: "Pointe-Claire, QC H9R 5Y8",
  destinationCountry: "Canada",
  loginUrl: "https://client.shiplink.com/auth/login",
  supportUrl: "mailto:contact@shiplink.com",
};

// ─── Font shorthand ───────────────────────────────────────────────────────────
const FONT = "Arial, Helvetica, sans-serif";

// ─── Component ────────────────────────────────────────────────────────────────
export const ShipLinkTransportEmail = (props: ShipLinkTransportEmailProps) => {
  const p = { ...defaults, ...props };

  return (
    <Html lang="en" dir="ltr">
      <Head />
      <Preview>New Transport Request — Order {p.orderId} has been assigned to your dispatch.</Preview>

      <Body style={{ backgroundColor: C.pageBg, margin: "0", padding: "0" }}>
        {/* ── OUTER WRAPPER ── */}
        <table width="100%" cellPadding={0} cellSpacing={0} border={0} style={{ backgroundColor: C.pageBg }}>
          <tbody>
            <tr>
              <td
                align="center"
                style={{
                  paddingTop: "24px",
                  paddingBottom: "24px",
                  paddingLeft: "16px",
                  paddingRight: "16px",
                }}
              >
                {/* ── CONTAINER — 600px, no borderRadius, no overflow ── */}
                <table
                  width="600"
                  cellPadding={0}
                  cellSpacing={0}
                  border={0}
                  style={{
                    backgroundColor: C.white,
                    borderTop: `1px solid ${C.containerBorder}`,
                    borderRight: `1px solid ${C.containerBorder}`,
                    borderBottom: `1px solid ${C.containerBorder}`,
                    borderLeft: `1px solid ${C.containerBorder}`,
                    fontFamily: FONT,
                  }}
                >
                  <tbody>
                    {/* ══════════════════════════════════
                        HEADER — full red banner
                    ══════════════════════════════════ */}
                    <tr>
                      <td
                        style={{
                          backgroundColor: C.red,
                          paddingTop: "28px",
                          paddingBottom: "24px",
                          paddingLeft: "48px",
                          paddingRight: "48px",
                        }}
                      >
                        <table width="100%" cellPadding={0} cellSpacing={0} border={0}>
                          <tbody>
                            <tr>
                              {/* Logo */}
                              <td valign="middle">
                                <span
                                  style={{
                                    fontFamily: FONT,
                                    fontSize: "22px",
                                    fontWeight: 800,
                                    color: C.white,
                                    letterSpacing: "2px",
                                  }}
                                >
                                  SHIP
                                </span>
                                {/* solid hex — NOT rgba */}
                                <span
                                  style={{
                                    fontFamily: FONT,
                                    fontSize: "22px",
                                    fontWeight: 800,
                                    color: C.redFade,
                                    letterSpacing: "2px",
                                  }}
                                >
                                  LINK
                                </span>
                              </td>
                              {/* Badge — solid border hex, NOT rgba */}
                              <td align="right" valign="middle">
                                <span
                                  style={{
                                    fontFamily: FONT,
                                    fontSize: "9px",
                                    fontWeight: 700,
                                    letterSpacing: "2px",
                                    color: C.redMuted,
                                    borderTop: `1px solid ${C.redBorder}`,
                                    borderRight: `1px solid ${C.redBorder}`,
                                    borderBottom: `1px solid ${C.redBorder}`,
                                    borderLeft: `1px solid ${C.redBorder}`,
                                    paddingTop: "4px",
                                    paddingBottom: "4px",
                                    paddingLeft: "10px",
                                    paddingRight: "10px",
                                  }}
                                >
                                  DISPATCH NOTICE
                                </span>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>

                    {/* Shadow strip — HTML height attr (not CSS height) for Yahoo */}
                    <tr>
                      <td height={3} bgcolor={C.redDark} style={{ fontSize: "0", lineHeight: "0" }}>
                        &nbsp;
                      </td>
                    </tr>

                    {/* ══════════════════════════════════
                        BODY
                    ══════════════════════════════════ */}
                    <tr>
                      <td
                        style={{
                          paddingTop: "40px",
                          paddingBottom: "32px",
                          paddingLeft: "48px",
                          paddingRight: "48px",
                        }}
                      >
                        {/* Eyebrow */}
                        <p
                          style={{
                            fontFamily: FONT,
                            fontSize: "10px",
                            fontWeight: 700,
                            letterSpacing: "2.5px",
                            textTransform: "uppercase",
                            color: C.red,
                            margin: "0 0 14px",
                            padding: "0",
                          }}
                        >
                          New Transport Request
                        </p>

                        {/* Headline — explicit <br /> not whiteSpace:pre-line */}
                        <p
                          style={{
                            fontFamily: FONT,
                            fontSize: "26px",
                            fontWeight: 800,
                            color: C.black,
                            lineHeight: "1.2",
                            margin: "0 0 16px",
                            padding: "0",
                          }}
                        >
                          Order {p.orderId} has been
                          <br />
                          assigned to your dispatch.
                        </p>

                        {/* Description */}
                        <p
                          style={{
                            fontFamily: FONT,
                            fontSize: "14px",
                            color: C.muted,
                            lineHeight: "1.65",
                            margin: "0 0 36px",
                            padding: "0",
                          }}
                        >
                          A new transport request has been created and assigned to your dispatch. Please review the
                          shipment details below and log in to your account to proceed with the next steps.
                        </p>

                        {/* ── ROUTE BLOCK ──
                            Accent bars = nested table td with bgcolor attr + width attr.
                            NO div, NO flex, NO flexShrink.
                        ── */}
                        <table width="100%" cellPadding={0} cellSpacing={0} border={0} style={{ marginBottom: "36px" }}>
                          <tbody>
                            <tr>
                              {/* ORIGIN */}
                              <td width="44%" valign="top" bgcolor={C.offWhite} style={{ backgroundColor: C.offWhite }}>
                                <table width="100%" cellPadding={0} cellSpacing={0} border={0}>
                                  <tbody>
                                    <tr>
                                      {/* Red accent bar — HTML width attr, bgcolor attr */}
                                      <td
                                        width={3}
                                        bgcolor={C.red}
                                        style={{
                                          backgroundColor: C.red,
                                          fontSize: "0",
                                          lineHeight: "0",
                                        }}
                                      >
                                        &nbsp;
                                      </td>
                                      <td
                                        style={{
                                          paddingTop: "22px",
                                          paddingBottom: "22px",
                                          paddingLeft: "20px",
                                          paddingRight: "24px",
                                        }}
                                      >
                                        <p
                                          style={{
                                            fontFamily: FONT,
                                            fontSize: "9px",
                                            fontWeight: 700,
                                            letterSpacing: "2px",
                                            textTransform: "uppercase",
                                            color: C.label,
                                            margin: "0 0 8px",
                                            padding: "0",
                                          }}
                                        >
                                          Origin
                                        </p>
                                        <p
                                          style={{
                                            fontFamily: FONT,
                                            fontSize: "14px",
                                            fontWeight: 700,
                                            color: C.black,
                                            margin: "0 0 5px",
                                            padding: "0",
                                          }}
                                        >
                                          {p.originName}
                                        </p>
                                        <p
                                          style={{
                                            fontFamily: FONT,
                                            fontSize: "13px",
                                            color: C.address,
                                            lineHeight: "1.55",
                                            margin: "0",
                                            padding: "0",
                                          }}
                                        >
                                          {p.originAddress}
                                          <br />
                                          {p.originCity}
                                          <br />
                                          {p.originCountry}
                                        </p>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>

                              {/* ARROW */}
                              <td
                                width="12%"
                                align="center"
                                valign="middle"
                                style={{ paddingLeft: "6px", paddingRight: "6px" }}
                              >
                                <span
                                  style={{
                                    fontFamily: FONT,
                                    fontSize: "20px",
                                    color: C.red,
                                  }}
                                >
                                  &#x2192;
                                </span>
                              </td>

                              {/* DESTINATION */}
                              <td width="44%" valign="top" bgcolor={C.offWhite} style={{ backgroundColor: C.offWhite }}>
                                <table width="100%" cellPadding={0} cellSpacing={0} border={0}>
                                  <tbody>
                                    <tr>
                                      {/* Black accent bar */}
                                      <td
                                        width={3}
                                        bgcolor={C.black}
                                        style={{
                                          backgroundColor: C.black,
                                          fontSize: "0",
                                          lineHeight: "0",
                                        }}
                                      >
                                        &nbsp;
                                      </td>
                                      <td
                                        style={{
                                          paddingTop: "22px",
                                          paddingBottom: "22px",
                                          paddingLeft: "20px",
                                          paddingRight: "24px",
                                        }}
                                      >
                                        <p
                                          style={{
                                            fontFamily: FONT,
                                            fontSize: "9px",
                                            fontWeight: 700,
                                            letterSpacing: "2px",
                                            textTransform: "uppercase",
                                            color: C.label,
                                            margin: "0 0 8px",
                                            padding: "0",
                                          }}
                                        >
                                          Destination
                                        </p>
                                        <p
                                          style={{
                                            fontFamily: FONT,
                                            fontSize: "14px",
                                            fontWeight: 700,
                                            color: C.black,
                                            margin: "0 0 5px",
                                            padding: "0",
                                          }}
                                        >
                                          {p.destinationName}
                                        </p>
                                        <p
                                          style={{
                                            fontFamily: FONT,
                                            fontSize: "13px",
                                            color: C.address,
                                            lineHeight: "1.55",
                                            margin: "0",
                                            padding: "0",
                                          }}
                                        >
                                          {p.destinationAddress}
                                          <br />
                                          {p.destinationCity}
                                          <br />
                                          {p.destinationCountry}
                                        </p>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>

                        {/* ── CTA BUTTON — no borderRadius ── */}
                        <table cellPadding={0} cellSpacing={0} border={0} style={{ marginBottom: "16px" }}>
                          <tbody>
                            <tr>
                              <td bgcolor={C.red} style={{ backgroundColor: C.red }}>
                                <a
                                  href={p.loginUrl}
                                  style={{
                                    display: "inline-block",
                                    paddingTop: "14px",
                                    paddingBottom: "14px",
                                    paddingLeft: "36px",
                                    paddingRight: "36px",
                                    fontFamily: FONT,
                                    fontSize: "12px",
                                    fontWeight: 700,
                                    letterSpacing: "1.5px",
                                    textTransform: "uppercase",
                                    color: C.white,
                                    textDecoration: "none",
                                  }}
                                >
                                  ACCESS YOUR ACCOUNT &#x2192;
                                </a>
                              </td>
                            </tr>
                          </tbody>
                        </table>

                        {/* Support link */}
                        <p
                          style={{
                            fontFamily: FONT,
                            fontSize: "12px",
                            color: C.label,
                            margin: "0",
                            padding: "0",
                          }}
                        >
                          Need assistance? Contact our{" "}
                          <a
                            href={p.supportUrl}
                            style={{
                              color: C.red,
                              fontWeight: 700,
                              textDecoration: "none",
                            }}
                          >
                            Support Team
                          </a>
                        </p>
                      </td>
                    </tr>

                    {/* ── DIVIDER ── */}
                    <tr>
                      <td
                        style={{
                          borderTop: `1px solid ${C.divider}`,
                          fontSize: "0",
                          lineHeight: "0",
                        }}
                      >
                        &nbsp;
                      </td>
                    </tr>

                    {/* ── SIGN-OFF ── */}
                    <tr>
                      <td
                        style={{
                          paddingTop: "24px",
                          paddingBottom: "24px",
                          paddingLeft: "48px",
                          paddingRight: "48px",
                        }}
                      >
                        <p
                          style={{
                            fontFamily: FONT,
                            fontSize: "13px",
                            color: C.address,
                            margin: "0",
                            padding: "0",
                          }}
                        >
                          Thank you for using <strong style={{ color: C.black, fontWeight: 800 }}>ShipLink</strong>.
                        </p>
                      </td>
                    </tr>

                    {/* ══════════════════════════════════
                        FOOTER — dark
                    ══════════════════════════════════ */}
                    <tr>
                      <td
                        bgcolor={C.black}
                        style={{
                          backgroundColor: C.black,
                          paddingTop: "22px",
                          paddingBottom: "22px",
                          paddingLeft: "48px",
                          paddingRight: "48px",
                        }}
                      >
                        <table width="100%" cellPadding={0} cellSpacing={0} border={0}>
                          <tbody>
                            <tr>
                              <td valign="middle">
                                <span
                                  style={{
                                    fontFamily: FONT,
                                    fontSize: "13px",
                                    fontWeight: 800,
                                    color: C.white,
                                    letterSpacing: "2px",
                                  }}
                                >
                                  SHIP
                                </span>
                                <span
                                  style={{
                                    fontFamily: FONT,
                                    fontSize: "13px",
                                    fontWeight: 800,
                                    color: C.red,
                                    letterSpacing: "2px",
                                  }}
                                >
                                  LINK
                                </span>
                              </td>
                              <td align="right" valign="middle">
                                <a
                                  href="#"
                                  style={{
                                    fontFamily: FONT,
                                    fontSize: "11px",
                                    color: "#555555",
                                    textDecoration: "none",
                                    marginRight: "16px",
                                  }}
                                >
                                  Unsubscribe
                                </a>
                                <a
                                  href="#"
                                  style={{
                                    fontFamily: FONT,
                                    fontSize: "11px",
                                    color: "#555555",
                                    textDecoration: "none",
                                  }}
                                >
                                  Privacy Policy
                                </a>
                              </td>
                            </tr>
                            <tr>
                              <td colSpan={2} style={{ paddingTop: "8px" }}>
                                <p
                                  style={{
                                    fontFamily: FONT,
                                    fontSize: "11px",
                                    color: "#444444",
                                    margin: "0",
                                    padding: "0",
                                  }}
                                >
                                  &copy; 2025 ShipLink Services Inc. All rights reserved.
                                </p>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
                {/* end container */}
              </td>
            </tr>
          </tbody>
        </table>
        {/* end outer wrapper */}
      </Body>
    </Html>
  );
};

export default ShipLinkTransportEmail;
