import { Body, Container, Head, Html, Preview, Section, Text } from "react-email";

import { EmailFooter } from "./components/EmailFooter";
import { EmailHeader } from "./components/EmailHeader";
import { InfoRow } from "./components/InfoRow";
import { SupportSignature } from "./components/SupportSingature";
import { emailStyles as s } from "./style/styles";

// ─── Props ───
interface BankPaymentReceivedEmailProps {
  companyName?: string;
  orderId?: string;
  customerName?: string;
  customerId?: string;
  currency?: string;
  amount?: string;
}

const defaults: Required<BankPaymentReceivedEmailProps> = {
  companyName: "ShipLink",
  orderId: "ORD-2026-0001",
  customerName: "John Doe",
  customerId: "CUS-0001",
  currency: "$",
  amount: "250.00",
};

export const BankPaymentReceivedEmail = (props: BankPaymentReceivedEmailProps) => {
  const p = { ...defaults, ...props };

  return (
    <Html>
      <Head />
      <Preview>New bank payment received for order {p.orderId}.</Preview>

      <Body style={s.body}>
        <Container style={s.container} className="mx-auto">
          {/* HEADER */}
          <EmailHeader companyName={p.companyName} />

          {/* CONTENT */}
          <Section style={s.bodySection}>
            <Text style={s.eyebrow}>Payment Received</Text>

            <Text style={s.headline}>New bank payment has been received.</Text>

            <Text style={s.description}>
              A new bank transfer payment has been recorded in the system for order <strong>#{p.orderId}</strong>.
              Please review the details below to proceed with verification.
            </Text>

            {/* PAYMENT DETAILS */}
            <Section style={s.routeContent}>
              <Text style={s.label}>PAYMENT DETAILS</Text>

              <InfoRow style={{ width: "120px" }} label={"Order ID"} value={`${p.orderId}`} />
              <InfoRow style={{ width: "120px" }} label={"Customer Name"} value={`${p.customerName}`} />
              <InfoRow style={{ width: "120px" }} label={"Account Number"} value={`${p.customerId}`} />
              <InfoRow style={{ width: "120px" }} label={"Amount Deposited"} value={`${p.currency}${p.amount}`} />
            </Section>

            <Text style={s.description}>
              This transaction is now pending review in the administrative dashboard. Please ensure the payment is
              validated before confirming order processing.
            </Text>

            {/* SUPPORT */}
            <SupportSignature supportUrl="mailto:support@shiplink.com" />
          </Section>

          {/* FOOTER */}
          <EmailFooter displayThankYouFooter={false} companyName={p.companyName} />
        </Container>
      </Body>
    </Html>
  );
};

export default BankPaymentReceivedEmail;
