import { Body, Container, Head, Html, Preview, Section, Text } from "react-email";

import { CustomButton } from "./components/CustomButton";
import { EmailFooter } from "./components/EmailFooter";
import { EmailHeader } from "./components/EmailHeader";
import { InfoRow } from "./components/InfoRow";
import { SupportSignature } from "./components/SupportSingature";
import { emailStyles as s } from "./style/styles";

// ─── Props ───
interface PaymentSuccessfulEmailProps {
  companyName?: string;
  customerName?: string;
  orderId?: string;
  invoiceNumber?: string;
  paymentDate?: string;
  totalAmount?: string;
  invoiceLink?: string;
}

const defaults: Required<PaymentSuccessfulEmailProps> = {
  companyName: "ShipLink",
  customerName: "John Doe",
  orderId: "ORD-2026-0001",
  invoiceNumber: "INV-2026-0001",
  paymentDate: "May 18, 2026",
  totalAmount: "$250.00 USD",
  invoiceLink: "https://shiplink.com/dashboard",
};

export const PaymentSuccessfulEmail = (props: PaymentSuccessfulEmailProps) => {
  const p = { ...defaults, ...props };

  return (
    <Html>
      <Head />
      <Preview>Your payment for order {p.orderId} has been completed successfully.</Preview>

      <Body style={s.body}>
        <Container style={s.container} className="mx-auto">
          {/* HEADER */}
          <EmailHeader companyName={p.companyName} />

          {/* CONTENT */}
          <Section style={s.bodySection}>
            <Text style={s.eyebrow}>Payment Confirmation</Text>

            <Text style={s.headline}>Your payment was completed successfully.</Text>

            <Text style={s.description}>
              Dear <strong>{p.customerName},</strong>
            </Text>

            <Text style={s.description}>
              Thank you for your payment. We are pleased to confirm that your checkout process has been completed
              successfully and your transaction has been securely recorded in our system.
            </Text>

            {/* PAYMENT INFO */}
            <Section style={s.routeContent}>
              <Text style={s.label}>INVOICE DETAILS</Text>

              <InfoRow label={"Order ID"} value={`${p.orderId}`} />
              <InfoRow label={"Invoice Number"} value={`${p.invoiceNumber}`} />
              <InfoRow label={"Payment Date"} value={`${p.paymentDate}`} />
              <InfoRow label={"Total Amount"} value={`${p.totalAmount}`} />
            </Section>

            <Text style={s.description}>
              You can review your invoice and payment details anytime through your account dashboard.
            </Text>

            {/* CTA */}
            <CustomButton
              style={{
                marginTop: "0px",
                marginBottom: "10px",
              }}
              label="VIEW INVOICE"
              link={p.invoiceLink}
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

export default PaymentSuccessfulEmail;
