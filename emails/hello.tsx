/**
 * ShipLink — New Transport Request Email
 *
 * Route block layout:
 *   Desktop (≥600px) : [Origin 50%] [Destination 50%]  ← side-by-side
 *   Mobile  (<600px) : Origin full width, Destination stacks below
 *
 * Responsive technique:
 *   - @media query injected via <Head>
 *   - className on Column compiles to className on <td> in output HTML
 *   - .route-col { display:block; width:100% } forces stacking on mobile
 *   - Outlook desktop ignores @media → stays side-by-side (desktop only, fine)
 */

import * as React from "react";
import { Body, Button, Column, Container, Head, Hr, Html, Img, Link, Preview, Row, Section, Text } from "react-email";

// ─── Colour tokens ────────────────────────────────────────────────────────────
const C = {
  red: "#C8102E",
  redDark: "#A50D24",
  secondary: "#385196",
  redFade: "#E8899A", // logo "LINK" on red bg  — solid, no rgba
  redBorder: "#8B3040", // badge border on red bg — solid, no rgba
  redMuted: "#D94060", // badge text on red bg   — solid, no rgba
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

const FONT = "Arial, Helvetica, sans-serif";

// ─── Responsive styles ────────────────────────────────────────────────────────
//
//  How className + @media works in react-email:
//    <Column className="route-col"> compiles to <td class="route-col">
//    The @media rule then overrides width/display on that <td> at <600px.
//
//  Clients that honour this:  Apple Mail, Yahoo Mail, Samsung Mail,
//                             Outlook.com (web), Gmail Android (modern).
//  Clients that ignore this:  Outlook 2007–2019 (desktop only → fine),
//                             Gmail webmail (strips <style> but columns
//                             are still readable at 50% width on desktop).
//
const responsiveStyles = `
  @media only screen and (max-width: 600px) {

    /* Container fills viewport */
    .email-container {
      width: 100% !important;
      max-width: 100% !important;
    }

    /* Reduce side padding */
    .header-section,
    .body-section,
    .signoff-section,
    .footer-section {
      padding-left: 20px !important;
      padding-right: 20px !important;
    }

    /* ── Route columns: stack vertically ──
       display:block turns each <td> into a block-level element,
       width:100% makes it span the full container.
    ── */
    .route-col {
      display: block !important;
      width: 100% !important;
      max-width: 100% !important;
      box-sizing: border-box !important;
      padding-right: 0 !important;
      padding-left: 0 !important;
    }

    /* Destination gets top margin when stacked */
    .route-dest {
      margin-top: 10px !important;
      padding-top: 0 !important;
    }

    /* Headline slightly smaller on mobile */
    .headline {
      font-size: 20px !important;
    }

    /* CTA full-width on mobile */
    .cta-btn {
      display: block !important;
      text-align: center !important;
      box-sizing: border-box !important;
    }
  }
`;

// ─── Props ────────────────────────────────────────────────────────────────────
export interface ShipLinkTransportEmailProps {
  orderId?: string;
  originName?: string;
  originAddress?: string;
  originCity?: string;
  originProvinceCode?: string;
  originPostalCode?: string;
  originCountry?: string;
  /** ISO 3166-1 alpha-2 lowercase, e.g. "us" */
  originCountryCode?: string;
  destinationName?: string;
  destinationAddress?: string;
  destinationCity?: string;
  destinationProvinceCode?: string;
  destinationPostalCode?: string;
  destinationCountry?: string;
  /** ISO 3166-1 alpha-2 lowercase, e.g. "ca" */
  destinationCountryCode?: string;
  loginUrl?: string;
  supportEmail?: string;
  companyName?: string;
  landingPageUrl?: string;
}

const defaults: Required<ShipLinkTransportEmailProps> = {
  orderId: "C105647",
  originName: "Old Route",
  originAddress: "Old Route 66",
  originCity: "St. Louis",
  originProvinceCode: "MO",
  originPostalCode: "65401",
  originCountry: "United States",
  originCountryCode: "us",
  destinationName: "Test Nama Yang Panjang Sekali",
  destinationAddress: "1000 Boulevard Saint-Jean",
  destinationCity: "Pointe-Claire",
  destinationProvinceCode: "QC",
  destinationPostalCode: "H9R 5Y8",
  destinationCountry: "Canada",
  destinationCountryCode: "ca",
  loginUrl: "https://client.shiplink.com/auth/login",
  supportEmail: "support@shiplink.com",
  companyName: "ShipLink",
  landingPageUrl: "https://shiplink.com",
};

// ─── Component ────────────────────────────────────────────────────────────────
export const ShipLinkTransportEmail = (props: ShipLinkTransportEmailProps) => {
  const p = { ...defaults, ...props };

  return (
    <Html lang="en" dir="ltr">
      <Head>
        {/* Preload flags for faster rendering */}
        <link rel="preload" as="image" href={`https://flagcdn.com/h20/${p.originCountryCode}.png`} />
        <link rel="preload" as="image" href={`https://flagcdn.com/h20/${p.destinationCountryCode}.png`} />
        <meta name="x-apple-disable-message-reformatting" />
        <style dangerouslySetInnerHTML={{ __html: responsiveStyles }} />
      </Head>

      <Preview>Order {p.orderId} has been assigned to your dispatch</Preview>

      <Body style={s.body}>
        <Container style={s.container} className="email-container">
          {/* ══════════════════════════════════════
              HEADER — full red banner
          ══════════════════════════════════════ */}
          <Section style={s.header} className="header-section">
            <Row>
              <Column>
                <Text style={s.logoText}>ShipLink</Text>
              </Column>
            </Row>
          </Section>

          {/* Header shadow strip */}
          <Section style={s.headerStrip}>
            <Text style={s.zero}>&nbsp;</Text>
          </Section>

          {/* ══════════════════════════════════════
              BODY
          ══════════════════════════════════════ */}
          <Section style={s.bodySection} className="body-section">
            {/* Eyebrow */}
            <Text style={s.eyebrow}>New Transport Request</Text>

            {/* Headline */}
            <Text style={s.headline} className="headline">
              Order {p.orderId} has been assigned to your dispatch.
            </Text>

            {/* Description */}
            <Text style={s.description}>
              A new transport request has been created. Please review the shipment details and proceed from your
              dashboard.
            </Text>

            {/* ══════════════════════════════════════
                ROUTE BLOCK
                ─────────────────────────────────────
                Desktop : [Origin 50%] [Destination 50%] — side-by-side
                          Horizontal gap via paddingRight on origin col
                          and paddingLeft on destination col (6px each).

                Mobile  : .route-col → display:block; width:100%
                          .route-dest → margin-top:10px
                          Both columns stack, each fills full width.

                Inner table per column:
                  [3px accent td] [content td]
                  This is the battle-tested way to do a left border
                  in email without CSS border-left (which some clients
                  ignore on <td>).
            ══════════════════════════════════════ */}
            <Section style={s.routeWrapper}>
              <Row>
                {/* ── ORIGIN — left column ── */}
                <Column style={s.originColumn} className="route-col">
                  {/* Inner: accent bar + content */}
                  <Row>
                    <Column style={s.accentRed} width={3} />
                    <Column style={s.routeContent}>
                      <Text style={s.routeLabel}>ORIGIN</Text>
                      <Img
                        src={`https://flagcdn.com/h20/${p.originCountryCode}.png`}
                        alt={p.originCountry}
                        height={18}
                        style={s.flag}
                      />
                      <Text style={s.routeName}>{p.originName}</Text>
                      <Text style={s.routeAddress}>
                        {p.originAddress}, {p.originCity}, {p.originProvinceCode}, {p.originPostalCode},{" "}
                        {p.originCountry}
                      </Text>
                    </Column>
                  </Row>
                </Column>

                {/* ── DESTINATION — right column ── */}
                <Column style={s.destinationColumn} className="route-col route-dest">
                  {/* Inner: accent bar + content */}
                  <Row>
                    <Column style={s.accentBlack} width={3} />
                    <Column style={s.routeContent}>
                      <Text style={s.routeLabel}>DESTINATION</Text>
                      <Img
                        src={`https://flagcdn.com/h20/${p.destinationCountryCode}.png`}
                        alt={p.destinationCountry}
                        height={18}
                        style={s.flag}
                      />
                      <Text style={s.routeName}>{p.destinationName}</Text>
                      <Text style={s.routeAddress}>
                        {p.destinationAddress}, {p.destinationCity}, {p.destinationProvinceCode},{" "}
                        {p.destinationPostalCode}, {p.destinationCountry}
                      </Text>
                    </Column>
                  </Row>
                </Column>
              </Row>
            </Section>

            {/* ── CTA ── */}
            <Button href={p.loginUrl} style={s.ctaButton} className="cta-btn">
              Access your account
            </Button>

            {/* Support */}
            <Text style={s.supportText}>
              Need help?{" "}
              <Link href={`mailto:${p.supportEmail}`} style={s.supportLink}>
                Contact support
              </Link>
            </Text>
          </Section>

          {/* ── DIVIDER ── */}
          <Hr style={s.divider} />

          {/* ── SIGN-OFF ── */}
          <Section style={s.signoff} className="signoff-section">
            <Text style={s.signoffText}>
              Thank you for using <strong style={{ color: C.black }}>{p.companyName}</strong>.
            </Text>
          </Section>

          {/* ══════════════════════════════════════
              FOOTER — dark
          ══════════════════════════════════════ */}
          <Section style={s.footer} className="footer-section">
            <Row>
              <Column valign="middle">
                <Text style={s.footerBrand}>{p.companyName}</Text>
              </Column>
              <Column align="right" valign="middle">
                <Link href={`${p.landingPageUrl}/privacy`} style={s.footerLink}>
                  Privacy Policy
                </Link>
              </Column>
            </Row>
            <Row>
              <Column>
                <Text style={s.footerCopy}>&copy; 2025 ShipLink Services Inc. All rights reserved.</Text>
              </Column>
            </Row>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default ShipLinkTransportEmail;

// ─── Styles ───────────────────────────────────────────────────────────────────
const s: Record<string, React.CSSProperties> = {
  // ── Outer ──
  body: {
    backgroundColor: C.pageBg,
    margin: "0",
    padding: "0",
    fontFamily: FONT,
  },
  container: {
    maxWidth: "600px",
    backgroundColor: C.white,
    borderTop: `1px solid ${C.containerBorder}`,
    borderRight: `1px solid ${C.containerBorder}`,
    borderBottom: `1px solid ${C.containerBorder}`,
    borderLeft: `1px solid ${C.containerBorder}`,
    margin: "24px auto",
  },

  // ── Header ──
  header: {
    backgroundColor: C.red,
    paddingTop: "20px",
    paddingBottom: "20px",
    paddingLeft: "42px",
    paddingRight: "42px",
  },
  logoText: {
    fontFamily: FONT,
    fontSize: "32px",
    fontWeight: 800,
    color: C.white,
    letterSpacing: "1px",
    margin: "0",
    padding: "0",
    lineHeight: "1",
  },
  badge: {
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
    margin: "0",
    display: "inline-block",
  },
  headerStrip: {
    backgroundColor: C.redDark,
    paddingTop: "3px",
    paddingBottom: "0",
    margin: "0",
  },
  zero: {
    fontSize: "0",
    lineHeight: "0",
    margin: "0",
    padding: "0",
  },

  // ── Body section ──
  bodySection: {
    paddingTop: "10px",
    paddingBottom: "10px",
    paddingLeft: "48px",
    paddingRight: "48px",
  },
  eyebrow: {
    fontFamily: FONT,
    fontSize: "14px",
    fontWeight: 700,
    letterSpacing: "2px",
    textTransform: "uppercase",
    color: C.secondary,
    marginTop: "10px",
    marginBottom: "10px",
    padding: "0",
  },
  headline: {
    fontFamily: FONT,
    fontSize: "26px",
    fontWeight: 800,
    color: C.black,
    lineHeight: "1.2",
    marginTop: "10px",
    marginBottom: "10px",
    padding: "0",
  },
  description: {
    fontFamily: FONT,
    fontSize: "14px",
    color: C.muted,
    lineHeight: "1.6",
    marginTop: "10px",
    marginBottom: "10px",
    padding: "0",
  },

  // ── Route block ──
  routeWrapper: {
    marginTop: "0",
    marginBottom: "0",
    paddingTop: "0",
    paddingBottom: "0",
  },

  // Origin col: 50% width, 6px right padding as the gap
  originColumn: {
    width: "50%",
    verticalAlign: "top",
    paddingRight: "6px",
  },

  // Destination col: 50% width, 6px left padding as the gap
  destinationColumn: {
    width: "50%",
    verticalAlign: "top",
    paddingLeft: "6px",
  },

  // Left accent bars — rendered as a narrow <td> inside each route column
  accentRed: {
    width: "3px",
    backgroundColor: C.red,
    fontSize: "0",
    lineHeight: "0",
  },
  accentBlack: {
    width: "3px",
    backgroundColor: C.black,
    fontSize: "0",
    lineHeight: "0",
  },

  // Content area inside each route column (next to the accent bar)
  routeContent: {
    backgroundColor: C.offWhite,
    paddingTop: "16px",
    paddingBottom: "16px",
    paddingLeft: "14px",
    paddingRight: "14px",
  },

  routeLabel: {
    fontFamily: FONT,
    fontSize: "10px",
    color: C.label,
    lineHeight: "24px",
    margin: "0 0 6px",
    padding: "0",
  },
  flag: {
    display: "block",
    outline: "none",
    border: "none",
    textDecoration: "none",
    marginBottom: "10px",
  },
  routeName: {
    fontFamily: FONT,
    fontSize: "14px",
    fontWeight: 700,
    lineHeight: "1.3",
    color: C.black,
    margin: "0 0 6px",
    padding: "0",
  },
  routeAddress: {
    fontFamily: FONT,
    fontSize: "13px",
    color: C.address,
    lineHeight: "1.5",
    margin: "0",
    padding: "0",
  },

  // ── CTA ──
  ctaButton: {
    backgroundColor: C.red,
    fontFamily: FONT,
    fontSize: "12px",
    fontWeight: 700,
    letterSpacing: "1px",
    textTransform: "uppercase",
    color: C.white,
    textDecoration: "none",
    paddingTop: "14px",
    paddingBottom: "14px",
    paddingLeft: "32px",
    paddingRight: "32px",
    display: "inline-block",
    marginTop: "16px",
    marginBottom: "0",
  },
  supportText: {
    fontFamily: FONT,
    fontSize: "12px",
    color: C.label,
    lineHeight: "24px",
    marginTop: "10px",
    marginBottom: "10px",
    padding: "0",
  },
  supportLink: {
    color: C.red,
    textDecoration: "none",
  },

  // ── Divider ──
  divider: {
    borderTop: `1px solid ${C.divider}`,
    margin: "0",
  },

  // ── Sign-off ──
  signoff: {
    paddingTop: "5px",
    paddingBottom: "5px",
    paddingLeft: "48px",
    paddingRight: "48px",
  },
  signoffText: {
    fontFamily: FONT,
    fontSize: "13px",
    color: C.address,
    lineHeight: "24px",
    marginTop: "5px",
    marginBottom: "5px",
    padding: "0",
  },

  // ── Footer ──
  footer: {
    backgroundColor: C.black,
    paddingTop: "22px",
    paddingBottom: "22px",
    paddingLeft: "48px",
    paddingRight: "48px",
  },
  footerBrand: {
    fontFamily: FONT,
    fontSize: "13px",
    fontWeight: 800,
    color: C.white,
    letterSpacing: "0px",
    margin: "0",
    padding: "0",
    lineHeight: "24px",
  },
  footerLink: {
    fontFamily: FONT,
    fontSize: "11px",
    color: "#555555",
    textDecoration: "none",
  },
  footerCopy: {
    fontFamily: FONT,
    fontSize: "11px",
    color: "#444444",
    margin: "0",
    padding: "0",
    paddingTop: "8px",
  },
};
