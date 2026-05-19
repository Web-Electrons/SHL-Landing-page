import { Body, Container, Head, Html, Preview, Section, Text } from "react-email";

import { CustomButton } from "./components/CustomButton";
import { EmailFooter } from "./components/EmailFooter";
import { EmailHeader } from "./components/EmailHeader";
import { InfoRow } from "./components/InfoRow";
import { SupportSignature } from "./components/SupportSingature";
import { emailStyles as s } from "./style/styles";

// ─── Props ───
interface BrokerageUpdatedEmailProps {
  companyName?: string;
  orderId?: string;
  dashboardLink?: string;
}

const defaults: Required<BrokerageUpdatedEmailProps> = {
  companyName: "ShipLink",
  orderId: "ORD-2026-0001",
  dashboardLink: "https://app.shiplink.com/dashboard",
};

export const BrokerageUpdatedEmail = (props: BrokerageUpdatedEmailProps) => {
  const p = { ...defaults, ...props };

  return (
    <Html>
      <Head />
      <Preview>Your brokerage information has been updated.</Preview>

      <Body style={s.body}>
        <Container style={s.container} className="mx-auto">
          {/* HEADER */}
          <EmailHeader companyName={p.companyName} />

          {/* CONTENT */}
          <Section style={s.bodySection}>
            <Text style={s.eyebrow}>Brokerage Update</Text>

            <Text style={s.headline}>Your brokerage details have been updated.</Text>

            <Text style={s.description}>
              Our brokerage team has submitted an update related to your shipment order. Please review the latest
              information to ensure all details are accurate and up to date.
            </Text>

            {/* ORDER INFO */}
            <Section style={s.routeContent}>
              <Text style={s.label}>ORDER INFORMATION</Text>
              <InfoRow label="Order ID" value={`${p.orderId}`} />
            </Section>

            <Text style={s.description}>
              You can review the updated brokerage information directly from your account dashboard.
            </Text>

            {/* CTA */}
            <CustomButton
              style={{
                marginTop: "0px",
                marginBottom: "10px",
              }}
              label="GO TO DASHBOARD"
              link={p.dashboardLink}
            />

            <SupportSignature supportUrl="{URL}" />
          </Section>

          {/* FOOTER */}
          <EmailFooter displayThankYouFooter companyName={p.companyName} />
        </Container>
      </Body>
    </Html>
  );
};

export default BrokerageUpdatedEmail;
