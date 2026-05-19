import { Body, Container, Head, Html, Preview, Section, Text } from "react-email";

import { CustomButton } from "./components/CustomButton";
import { EmailFooter } from "./components/EmailFooter";
import { EmailHeader } from "./components/EmailHeader";
import { InfoRow } from "./components/InfoRow";
import { SupportSignature } from "./components/SupportSingature";
import { emailStyles as s } from "./style/styles";

// ─── Props ───
interface WalletTopUpConfirmedEmailProps {
  companyName?: string;
  customerName?: string;
  paymentDate?: string;
  totalAmount?: string;
  walletLink?: string;
}

const defaults: Required<WalletTopUpConfirmedEmailProps> = {
  companyName: "ShipLink",
  customerName: "John Doe",
  paymentDate: "May 18, 2026",
  totalAmount: "$250.00 USD",
  walletLink: "https://app.shiplink.com/wallet",
};

export const WalletTopUpConfirmedEmail = (props: WalletTopUpConfirmedEmailProps) => {
  const p = { ...defaults, ...props };

  return (
    <Html>
      <Head />
      <Preview>Deposit Confirmed</Preview>

      <Body style={s.body}>
        <Container style={s.container} className="mx-auto">
          {/* HEADER */}
          <EmailHeader companyName={p.companyName} />

          {/* CONTENT */}
          <Section style={s.bodySection}>
            <Text style={s.eyebrow}>Wallet Update</Text>

            <Text style={s.headline}>Your wallet top-up has been confirmed.</Text>

            <Text style={s.description}>
              Dear <strong>{p.customerName},</strong>
            </Text>

            <Text style={s.description}>
              Thank you for your payment. The funds have been successfully added to your wallet balance and are now
              available for transactions and shipment payments within your account.
            </Text>

            {/* TOP UP INFO */}
            <Section style={s.routeContent}>
              <Text style={s.label}>TOP-UP DETAILS</Text>
              <InfoRow label={"Payment Date"} value={`${p.paymentDate}`} />
              <InfoRow label={"Total Amount"} value={`${p.totalAmount}`} />
            </Section>

            <Text style={s.description}>
              You can review your updated wallet balance and transaction history directly from your account dashboard.
            </Text>

            {/* CTA */}
            <CustomButton
              style={{
                marginTop: "0px",
                marginBottom: "10px",
              }}
              label="VIEW WALLET"
              link={p.walletLink}
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

export default WalletTopUpConfirmedEmail;
