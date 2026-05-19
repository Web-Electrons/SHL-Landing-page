import { Body, Container, Head, Html, Preview, Section, Text } from "react-email";

import { CustomButton } from "./components/CustomButton";
import { EmailFooter } from "./components/EmailFooter";
import { EmailHeader } from "./components/EmailHeader";
import { SupportSignature } from "./components/SupportSingature";
import { emailStyles as s } from "./style/styles";

// ─── Props ───
interface CarrierInvitationEmailProps {
  companyName?: string;
  carrierName?: string;
  invitationLink?: string;
}

const defaults: Required<CarrierInvitationEmailProps> = {
  companyName: "ShipLink",
  carrierName: "John Logistics",
  invitationLink: "https://shiplink.com/invitation",
};

export const CarrierInvitationEmail = (props: CarrierInvitationEmailProps) => {
  const p = { ...defaults, ...props };

  return (
    <Html>
      <Head />
      <Preview>You have been invited to join {p.companyName} as a carrier partner.</Preview>

      <Body style={s.body}>
        <Container style={s.container} className="mx-auto">
          {/* HEADER */}
          <EmailHeader companyName={p.companyName} />

          {/* CONTENT */}
          <Section style={s.bodySection}>
            <Text style={s.eyebrow}>Carrier Invitation</Text>

            <Text style={s.headline}>You’ve been invited to join {p.companyName}.</Text>

            <Text style={s.description}>
              Hello <strong>{p.carrierName},</strong>
            </Text>

            <Text style={s.description}>
              We’re pleased to inform you that one of our clients has invited you to become their carrier partner on{" "}
              {p.companyName}. By joining the platform, you will be able to collaborating and managing shipments
            </Text>

            {/* INVITATION INFO */}

            <Text style={s.description}>
              To begin the registration process and activate your carrier access, please use the secure invitation link
              below.
            </Text>

            {/* CTA */}
            <CustomButton
              style={{
                marginTop: "0px",
                marginBottom: "10px",
              }}
              label="CONNECT ACCOUNT"
              link={p.invitationLink}
            />

            <Text style={s.description}>
              If you require any assistance during registration or onboarding, our support team will be happy to assist
              you.
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

export default CarrierInvitationEmail;
