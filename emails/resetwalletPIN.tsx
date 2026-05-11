import { Body, Container, Head, Html, Preview, Section, Text } from "react-email";

import { CustomButton } from "./components/CustomButton";
import { EmailFooter } from "./components/EmailFooter";
import { EmailHeader } from "./components/EmailHeader";
import { SupportSignature } from "./components/SupportSingature";
import { emailStyles as s } from "./style/styles";

// ─── Props ───
interface ResetWalletPinEmailProps {
  companyName?: string;
  email?: string;
  link?: string;
}

const defaults: Required<ResetWalletPinEmailProps> = {
  companyName: "ShipLink",
  email: "john@example.com",
  link: "https://app.shiplink.com/reset-wallet-pin",
};

export const ResetWalletPinEmail = (props: ResetWalletPinEmailProps) => {
  const p = { ...defaults, ...props };

  return (
    <Html>
      <Head />
      <Preview>Reset your ShipLink wallet PIN securely.</Preview>

      <Body style={s.body}>
        <Container style={s.container} className="mx-auto">
          {/* HEADER */}
          <EmailHeader companyName={p.companyName} />

          {/* CONTENT */}
          <Section style={s.bodySection}>
            <Text style={s.eyebrow}>Wallet Security</Text>

            <Text style={s.headline}>Reset your wallet PIN</Text>

            <Text style={s.description}>
              We received a request to reset the wallet PIN associated with your ShipLink account.
            </Text>

            <Text style={s.description}>
              For security purposes, please confirm this request by creating a new wallet PIN using the button below.
            </Text>

            {/* CTA */}
            <CustomButton
              style={{
                marginTop: "0px",
              }}
              label="RESET WALLET PIN"
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

            <Section style={s.routeContent}>
              <Text style={s.routeLabel}>ACCOUNT</Text>

              <Text style={s.detailText}>
                <strong>Email:</strong> {p.email}
              </Text>
            </Section>

            <Text style={s.description}>
              If you did not request this change, you can safely ignore this email. Your wallet PIN will remain
              unchanged unless the reset process is completed.
            </Text>

            <SupportSignature supportUrl="{URL}" />
          </Section>

          {/* FOOTER */}
          <EmailFooter companyName={p.companyName} />
        </Container>
      </Body>
    </Html>
  );
};

export default ResetWalletPinEmail;
