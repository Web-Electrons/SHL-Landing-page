import { Body, Container, Head, Html, Preview, Section, Text } from "react-email";

import { EmailFooter } from "./components/EmailFooter";
import { EmailHeader } from "./components/EmailHeader";
import { InfoRow } from "./components/InfoRow";
import { SupportSignature } from "./components/SupportSingature";
import { emailStyles as s } from "./style/styles";

// ─── Props ───
interface PaymentReminderEmailProps {
  companyName?: string;
  customerName?: string;
  orderCode?: string;
  dueDateTitle?: string;
  dueDateText?: string;
  paymentLink?: string;
}

const defaults: Required<PaymentReminderEmailProps> = {
  companyName: "ShipLink",
  customerName: "John Doe",
  orderCode: "ORD-2026-0001",
  dueDateTitle: "Due Tomorrow",
  dueDateText: "due tomorrow",
  paymentLink: "https://shiplink.com/orders",
};

export const PaymentReminderEmail = (props: PaymentReminderEmailProps) => {
  const p = { ...defaults, ...props };

  return (
    <Html>
      <Head />
      <Preview>
        Reminder: invoice payment for order {p.orderCode} is {p.dueDateText}.
      </Preview>

      <Body style={s.body}>
        <Container style={s.container} className="mx-auto">
          {/* HEADER */}
          <EmailHeader companyName={p.companyName} />

          {/* CONTENT */}
          <Section style={s.bodySection}>
            <Text style={s.eyebrow}>Payment Reminder</Text>

            <Text style={s.headline}>Your invoice is {p.dueDateTitle.toLowerCase()}.</Text>

            <Text style={s.description}>
              Dear <strong>{p.customerName}</strong>,
            </Text>

            <Text style={s.description}>
              This is a friendly reminder that the invoice associated with your shipment order is currently{" "}
              {p.dueDateText}. To avoid additional processing charges, please ensure your bank payment is received
              before the due date expires.
            </Text>

            {/* PAYMENT INFO */}
            <Section style={s.routeContent}>
              <Text style={s.label}>PAYMENT INFORMATION</Text>

              <InfoRow label={"Order ID"} value={`${p.orderCode}`} />
              <InfoRow label={"Invoice Status"} value={`${p.dueDateTitle}`} />
            </Section>

            <Text style={s.description}>
              If payment is not received by the end of the due date, the credit card associated with your account may be
              charged automatically, including an additional 5% processing fee.
            </Text>

            <Text
              style={{
                ...s.description,
                fontSize: "13px",
              }}
            >
              *Additional service charges may apply for declined payments. Please contact our support team for further
              details.
            </Text>

            <Text style={s.description}>
              If you have any questions or require assistance, our support team is available to help you at any time.
            </Text>

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

export default PaymentReminderEmail;
