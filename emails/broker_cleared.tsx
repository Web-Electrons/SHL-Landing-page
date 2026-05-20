import { Body, Container, Head, Html, Preview, Section, Text } from "react-email";

import { CustomButton } from "./components/CustomButton";
import { EmailFooter } from "./components/EmailFooter";
import { EmailHeader } from "./components/EmailHeader";
import { InfoRow } from "./components/InfoRow";
import { Spacer } from "./components/Spacer";
import { SupportSignature } from "./components/SupportSingature";
import { emailStyles as s } from "./style/styles";

// ─── Props ───
interface BrokerageClearedEmailProps {
  companyName?: string;
  orderId?: string;
  packageId?: string;
  dashboardLink?: string;
}

const defaults: Required<BrokerageClearedEmailProps> = {
  companyName: "ShipLink",
  orderId: "ORD-2026-0001",
  packageId: "PKG-2026-0001",
  dashboardLink: "https://shiplink.com/dashboard",
};

export const BrokerageClearedEmail = (props: BrokerageClearedEmailProps) => {
  const p = { ...defaults, ...props };

  return (
    <Html>
      <Head />
      <Preview>Your order has been successfully cleared by brokerage.</Preview>

      <Body style={s.body}>
        <Container style={s.container} className="mx-auto">
          {/* HEADER */}
          <EmailHeader companyName={p.companyName} />

          {/* CONTENT */}
          <Section style={s.bodySection}>
            <Text style={s.eyebrow}>Brokerage Update</Text>

            <Text style={s.headline}>Your order has been cleared successfully.</Text>

            <Text style={s.description}>
              We are pleased to inform you that your shipment has successfully completed the brokerage clearance process
              and is now ready for the next stage of handling.
            </Text>
            <Spacer />
            {/* ORDER INFO */}
            <Section style={s.routeContent}>
              <Text style={s.label}>ORDER INFORMATION</Text>

              <InfoRow label="Order ID" value={`${p.orderId}`} />
            </Section>

            <Text style={s.description}>
              Please login to your account dashboard to review the latest shipment status and continue with any
              remaining steps if required.
            </Text>

            {/* CTA */}
            <Spacer />
            <CustomButton
              style={{
                marginTop: "0px",
                marginBottom: "10px",
              }}
              label="GO TO DASHBOARD"
              link={p.dashboardLink}
            />
            <Spacer />
            <SupportSignature supportUrl="mailto:support@shiplink.com" />
            <Spacer />
          </Section>

          {/* FOOTER */}
          <EmailFooter displayThankYouFooter companyName={p.companyName} />
        </Container>
      </Body>
    </Html>
  );
};

export default BrokerageClearedEmail;
