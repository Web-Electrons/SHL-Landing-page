import { Body, Container, Head, Html, Preview, Section, Text } from "react-email";

import { EmailFooter } from "./components/EmailFooter";
import { EmailHeader } from "./components/EmailHeader";
import { InfoRow } from "./components/InfoRow";
import { SupportSignature } from "./components/SupportSingature";
import { emailStyles as s } from "./style/styles";

// ─── Props ───
interface DueDateReminderEmailProps {
  companyName?: string;
  customerName?: string;
  orderCode?: string;
  paymentLink?: string;
}

const defaults: Required<DueDateReminderEmailProps> = {
  companyName: "ShipLink",
  customerName: "John Doe",
  orderCode: "ORD-2026-0001",
  paymentLink: "https://shiplink.com",
};

export const DueDateReminderEmail = (props: DueDateReminderEmailProps) => {
  const p = { ...defaults, ...props };

  return (
    <Html>
      <Head />
      <Preview>Final reminder: payment for order {p.orderCode} is due today.</Preview>

      <Body style={s.body}>
        <Container style={s.container} className="mx-auto">
          {/* HEADER */}
          <EmailHeader companyName={p.companyName} />

          {/* CONTENT */}
          <Section style={s.bodySection}>
            <Text style={s.eyebrow}>Final Notice</Text>

            <Text style={s.headline}>Payment due today.</Text>

            <Text style={s.description}>
              Dear <strong>{p.customerName},</strong>
            </Text>

            <Text style={s.description}>
              This is a final reminder that payment for your order is due today. To avoid automatic credit card
              processing fees, please ensure your bank transfer is received before the end of the day.
            </Text>
            {/* ORDER INFO */}
            <Section style={s.routeContent}>
              <Text style={s.label}>PAYMENT INFORMATION</Text>
              <InfoRow label={"Order ID"} value={`${p.orderCode}`} />
            </Section>

            <Text style={s.description}>
              If payment is not received by today, the credit card associated with your account may be charged
              automatically tomorrow, including an additional 3% processing fee.
            </Text>

            {/* CTA */}
            {/* <CustomButton
                            style={{
                                marginTop: "0px",
                                marginBottom: "10px",
                            }}
                            label="COMPLETE PAYMENT"
                            link={p.paymentLink}
                        /> */}

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

export default DueDateReminderEmail;
