import { Body, Container, Head, Html, Preview, Section, Text } from "react-email";

import { CustomButton } from "./components/CustomButton";
import { EmailFooter } from "./components/EmailFooter";
import { EmailHeader } from "./components/EmailHeader";
import { InfoRow } from "./components/InfoRow";
import { SupportSignature } from "./components/SupportSingature";
import { emailStyles as s } from "./style/styles";

// ─── Props ───
interface TransportRequestDeclinedEmailProps {
  companyName?: string;
  orderId?: string;
  originCity?: string;
  originCountry?: string;
  destinationCity?: string;
  destinationCountry?: string;
  dashboardLink?: string;
}

const defaults: Required<TransportRequestDeclinedEmailProps> = {
  companyName: "ShipLink",
  orderId: "ORD-2026-0001",
  originCity: "Los Angeles",
  originCountry: "United States",
  destinationCity: "Toronto",
  destinationCountry: "Canada",
  dashboardLink: "https://shiplink.com/dashboard",
};

export const TransportRequestDeclinedEmail = (props: TransportRequestDeclinedEmailProps) => {
  const p = { ...defaults, ...props };

  return (
    <Html>
      <Head />
      <Preview>Your transport request for order {p.orderId} has been declined.</Preview>

      <Body style={s.body}>
        <Container style={s.container} className="mx-auto">
          {/* HEADER */}
          <EmailHeader companyName={p.companyName} />

          {/* CONTENT */}
          <Section style={s.bodySection}>
            <Text style={s.eyebrow}>DECLINED REQUEST</Text>

            <Text style={s.headline}>Your shipment request has been declined.</Text>

            <Text style={s.description}>
              The carrier assigned to your shipment request was unable to accept the transport request at this time.
              Please review the shipment details below and submit an alternative shipping request from your dashboard.
            </Text>

            {/* ORDER INFO */}
            <Section style={s.routeContent}>
              <Text style={s.label}>SHIPMENT INFORMATION</Text>
              <InfoRow label="Order ID" value={p.orderId} />
              <InfoRow label="Origin" value={`${p.originCity}, ${p.originCountry}`} />
              <InfoRow label="Destination" value={`${p.destinationCity}, ${p.destinationCountry}`} />
            </Section>

            <Text style={s.description}>
              To continue with the shipment process, please log in to your account and request an alternative shipping
              option.
            </Text>

            {/* CTA */}
            <CustomButton
              style={{
                marginTop: "0px",
                marginBottom: "10px",
              }}
              label="VIEW DASHBOARD"
              link={p.dashboardLink}
            />

            {/* SUPPORT */}
            <SupportSignature supportUrl="mailto:support@shiplink.com" />
          </Section>

          {/* FOOTER */}
          <EmailFooter displayThankYouFooter companyName={p.companyName} />
        </Container>
      </Body>
    </Html>
  );
};

export default TransportRequestDeclinedEmail;
