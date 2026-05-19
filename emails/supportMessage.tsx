import { Body, Container, Head, Html, Preview, Section, Text } from "react-email";

import { CustomButton } from "./components/CustomButton";
import { EmailFooter } from "./components/EmailFooter";
import { EmailHeader } from "./components/EmailHeader";
import { SupportSignature } from "./components/SupportSingature";
import { emailStyles as s } from "./style/styles";

// ─── Props ───
interface SupportReplyEmailProps {
  companyName?: string;
  message?: string;
  dashboardLink?: string;
}

const defaults: Required<SupportReplyEmailProps> = {
  companyName: "ShipLink",
  message: "Your shipment is currently being reviewed by our operations team. We will provide another update shortly.",
  dashboardLink: "https://app.shiplink.com/dashboard/support",
};

export const SupportReplyEmail = (props: SupportReplyEmailProps) => {
  const p = { ...defaults, ...props };

  return (
    <Html>
      <Head />
      <Preview>Your support ticket has received a new reply.</Preview>

      <Body style={s.body}>
        <Container style={s.container} className="mx-auto">
          {/* HEADER */}
          <EmailHeader companyName={p.companyName} />

          {/* CONTENT */}
          <Section style={s.bodySection}>
            <Text style={s.eyebrow}>Support Update</Text>

            <Text style={s.headline}>Your support ticket has been replied.</Text>

            <Text style={s.description}>
              Our support team has replied to your ticket. Please log in to your {p.companyName} account to review the
              latest response and continue the conversation if additional assistance is needed.
            </Text>

            {/* MESSAGE */}
            <Section style={s.routeContent}>
              <Text style={s.label}>LATEST RESPONSE</Text>

              <Text
                style={{
                  ...s.detailText,
                  lineHeight: "1.7",
                }}
              >
                {p.message}
              </Text>
            </Section>

            <Text style={s.description}>
              We recommend reviewing the update as soon as possible to avoid delays in shipment handling or support
              resolution.
            </Text>

            {/* CTA */}
            <CustomButton
              style={{
                marginTop: "0px",
                marginBottom: "10px",
              }}
              label="VIEW SUPPORT TICKET"
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

export default SupportReplyEmail;
