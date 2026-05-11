import { Body, Container, Head, Html, Preview, Section, Text } from "react-email";

import { CustomButton } from "./components/CustomButton";
import { EmailFooter } from "./components/EmailFooter";
import { EmailHeader } from "./components/EmailHeader";
import { SupportSignature } from "./components/SupportSingature";
import { emailStyles as s } from "./style/styles";

// ─── Props ───
interface ResetPasswordEmailProps {
  companyName?: string;
  email?: string;
  link?: string;
}

const defaults: Required<ResetPasswordEmailProps> = {
  companyName: "ShipLink",
  email: "john@example.com",
  link: "https://shiplink.com/reset-password",
};

export const ResetPasswordEmail = (props: ResetPasswordEmailProps) => {
  const p = { ...defaults, ...props };

  return (
    <Html>
      <Head />
      <Preview>Reset your ShipLink password securely.</Preview>

      <Body style={s.body}>
        <Container style={s.container} className="mx-auto">
          {/* HEADER */}
          <EmailHeader companyName={p.companyName} />

          {/* CONTENT */}
          <Section style={s.bodySection}>
            <Text style={s.eyebrow}>Account Security</Text>

            <Text style={s.headline}>Reset your password</Text>

            <Text style={s.description}>
              We received a request to reset the password associated with your ShipLink account.
            </Text>

            <Text style={s.description}>
              To continue securely, please create a new password using the button below.
            </Text>

            {/* CTA */}
            <CustomButton
              style={{
                marginTop: "0",
              }}
              label="RESET PASSWORD"
              link={p.link}
            />

            <Text
              style={{
                ...s.description,
              }}
            >
              If the button above does not work, copy and paste the following link into your browser:{" "}
              <span
                style={{
                  wordBreak: "break-all",
                  color: "#385196",
                }}
              >
                {p.link}
              </span>
            </Text>

            <Text style={s.description}>
              If you did not request a password reset, no further action is required. Your account and password will
              remain unchanged unless the reset process is completed.
            </Text>

            <SupportSignature supportUrl="mailto:support@shiplink.com" />
          </Section>

          {/* FOOTER */}
          <EmailFooter displayThankYouFooter companyName={p.companyName} />
        </Container>
      </Body>
    </Html>
  );
};

export default ResetPasswordEmail;
