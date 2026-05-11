import { Body, Container, Head, Html, Preview, Section, Text } from "react-email";

import { CustomButton } from "./components/CustomButton";
import { EmailFooter } from "./components/EmailFooter";
import { EmailHeader } from "./components/EmailHeader";
import { SupportSignature } from "./components/SupportSingature";
import { emailStyles as s } from "./style/styles";

// ─── Props ───
interface VerifyEmailProps {
  companyName?: string;
  email?: string;
  link?: string;
  contactEmail?: string;
}

const defaults: Required<VerifyEmailProps> = {
  companyName: "ShipLink",
  email: "john@example.com",
  link: "https://shiplink.com/",
  contactEmail: "support@shiplink.com",
};

export const VerifyEmail = (props: VerifyEmailProps) => {
  const p = { ...defaults, ...props };

  return (
    <Html>
      <Head />
      <Preview>Verify your email address.</Preview>

      <Body style={s.body}>
        <Container style={s.container} className="mx-auto">
          {/* HEADER */}
          <EmailHeader companyName={p.companyName} />

          {/* CONTENT */}
          <Section style={s.bodySection}>
            <Text style={s.eyebrow}>Verification</Text>

            <Text style={s.headline}>Verify Your Email</Text>

            <Text style={s.description}>
              Please confirm that <strong>{p.email}</strong> is your email address by clicking the button below within
              48 hours.
            </Text>

            {/* CTA */}
            <CustomButton
              style={{
                marginTop: "0",
              }}
              label="CONFIRM EMAIL"
              link={p.link}
            />

            <Text
              style={{
                ...s.description,
              }}
            >
              If you are unable to use the button above, you can copy this link into your browser:{" "}
              <span
                style={{
                  wordBreak: "break-all",
                  color: "#385196",
                }}
              >
                {p.link}
              </span>
            </Text>
            <SupportSignature supportUrl={`mailto:${p.contactEmail}`} />
          </Section>

          {/* FOOTER */}
          <EmailFooter displayThankYouFooter companyName={p.companyName} />
        </Container>
      </Body>
    </Html>
  );
};

export default VerifyEmail;
