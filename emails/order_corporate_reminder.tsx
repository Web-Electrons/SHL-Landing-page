import { Body, Container, Head, Html, Preview, Section, Text } from "react-email";

import { CustomButton } from "./components/CustomButton";
import { EmailFooter } from "./components/EmailFooter";
import { EmailHeader } from "./components/EmailHeader";
import { InfoRow } from "./components/InfoRow";
import { SupportSignature } from "./components/SupportSingature";
import { emailStyles as s } from "./style/styles";

// ─── Props ───
interface NewOrderPaymentRequiredEmailProps {
  companyName?: string;
  customerName?: string;
  orderCode?: string;
  paymentLink?: string;
}

const defaults: Required<NewOrderPaymentRequiredEmailProps> = {
  companyName: "ShipLink",
  customerName: "John Doe",
  orderCode: "ORD-2026-0001",
  paymentLink: "https://shiplink.com/orders",
};

export const NewOrderPaymentRequiredEmail = (props: NewOrderPaymentRequiredEmailProps) => {
  const p = { ...defaults, ...props };

  return (
    <Html>
      <Head />
      <Preview>Payment is required to proceed with order {p.orderCode}.</Preview>

      <Body style={s.body}>
        <Container style={s.container} className="mx-auto">
          {/* HEADER */}
          <EmailHeader companyName={p.companyName} />

          {/* CONTENT */}
          <Section style={s.bodySection}>
            <Text style={s.eyebrow}>Payment Required</Text>

            <Text style={s.headline}>Your order is ready for payment.</Text>

            <Text style={s.description}>
              Dear <strong>{p.customerName},</strong>
            </Text>

            <Text style={s.description}>
              Your shipment order has been successfully generated and is currently awaiting payment confirmation before
              processing can begin.
            </Text>

            {/* ORDER INFO */}
            <Section style={s.routeContent}>
              <Text style={s.label}>ORDER INFORMATION</Text>

              <InfoRow label={"Order ID"} value={`${p.orderCode}`} />
            </Section>

            <Text style={s.description}>
              To continue, please log in to your {p.companyName} account and access the Orders page to review your order
              details and complete the payment process.
            </Text>

            {/* CTA */}
            <CustomButton
              style={{
                marginTop: "0px",
                marginBottom: "10px",
              }}
              label="COMPLETE PAYMENT"
              link={p.paymentLink}
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

export default NewOrderPaymentRequiredEmail;
