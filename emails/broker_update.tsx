import { Body, Container, Head, Html, Preview, Section, Text } from "react-email";

import { CustomButton } from "./components/CustomButton";
import { EmailFooter } from "./components/EmailFooter";
import { EmailHeader } from "./components/EmailHeader";
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
              <Text style={s.routeLabel}>ORDER INFORMATION</Text>

              <Text style={s.detailText}>
                <strong>Order ID:</strong> {p.orderId}
              </Text>
            </Section>

            <Text style={s.description}>
              You can review the updated brokerage information directly from your account dashboard.
            </Text>

            {/* CTA */}
            <CustomButton
              style={{
                marginTop: "0px",
              }}
              label="REVIEW UPDATE"
              link={p.dashboardLink}
            />

            <Text style={s.description}>
              If you have any questions regarding this update, our support team will be ready to assist you.
            </Text>

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
