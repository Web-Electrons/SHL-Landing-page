import { Body, Container, Head, Html, Preview, Section, Text } from "react-email";

import { CustomButton } from "./components/CustomButton";
import { EmailFooter } from "./components/EmailFooter";
import { EmailHeader } from "./components/EmailHeader";
import { InfoRow } from "./components/InfoRow";
import { Spacer } from "./components/Spacer";
import { SupportSignature } from "./components/SupportSingature";
import { emailStyles as s } from "./style/styles";

// ─── Props ───
interface SupportReplyEmailProps {
  companyName?: string;
  message?: string;
  dashboardLink?: string;
  ticket_id?: string;
  ticket_subject?: string;
}

const defaults: Required<SupportReplyEmailProps> = {
  companyName: "ShipLink",
  message: "Your shipment is currently being reviewed by our operations team. We will provide another update shortly.",
  dashboardLink: "https://app.shiplink.com/dashboard/support",
  ticket_id: "SPT-2026-0001",
  ticket_subject: "Shipment is currently awaiting processing",
};

export const SupportReplyEmail = (props: SupportReplyEmailProps) => {
  const p = { ...defaults, ...props };

  return (
    <Html>
      <Head />
      {/* SUBJECT:  New Support Message - Ticket #{ticketID}*/}
      <Preview>Your support ticket has received a new reply.</Preview>

      <Body style={s.body}>
        <Container style={s.container} className="mx-auto">
          {/* HEADER */}
          <EmailHeader companyName={p.companyName} />

          {/* CONTENT */}
          <Section style={s.bodySection}>
            <Text style={s.eyebrow}>Support Update</Text>

            <Text style={s.headline}>Your Support Ticket has received a reply.</Text>

            <Text style={s.description}>
              Our support team has replied to your ticket. Please login to your {p.companyName} account to review the
              latest response and continue the conversation.
            </Text>

            <Spacer />
            {/* MESSAGE */}
            <Section style={s.routeContent}>
              <Text style={s.label}>TICKET INFORMATION</Text>
              <InfoRow label={"Ticket ID"} value={`${p.ticket_id}`} />
              <InfoRow label={"Subject"} value={`${p.ticket_subject}`} />
            </Section>
            <Spacer />
            {/* <Text style={s.description}>
              We recommend reviewing the update as soon as possible to avoid delays in support
              resolution.
            </Text> */}
            <Spacer />
            {/* CTA */}
            <CustomButton
              style={{
                marginTop: "0px",
                marginBottom: "10px",
              }}
              label="ACCESS YOUR ACCOUNT"
              link={p.dashboardLink}
            />
            <Spacer />
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
