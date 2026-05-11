import { Body, Container, Head, Html, Preview, Section, Text } from "react-email";

import { CustomButton } from "./components/CustomButton";
import { EmailFooter } from "./components/EmailFooter";
import { EmailHeader } from "./components/EmailHeader";
import { SupportSignature } from "./components/SupportSingature";
import { emailStyles as s } from "./style/styles";

// ─── Props ───
interface BankValidationProps {
  companyName?: string;
  orderId?: string;
  invoiceLink?: string;
}

const defaults: Required<BankValidationProps> = {
  companyName: "ShipLink",
  orderId: "PKG-2026-0001",
  invoiceLink: "https://app.shiplink.com/invoice",
};

export const BankValidation = (props: BankValidationProps) => {
  const p = { ...defaults, ...props };

  return (
    <Html>
      <Head />
      <Preview>Your payment has been successfully verified.</Preview>

      <Body style={s.body}>
        <Container style={s.container} className="mx-auto">
          {/* HEADER */}
          <EmailHeader companyName={p.companyName} />

          {/* CONTENT */}
          <Section style={s.bodySection}>
            <Text style={s.eyebrow}>Payment Confirmation</Text>

            <Text style={s.headline}>Your payment has been verified successfully.</Text>

            <Text style={s.description}>
              We have successfully verified your bank payment and your transaction is now being processed by our system.
            </Text>

            {/* PACKAGE INFO */}
            <Section style={s.routeContent}>
              <Text style={s.routeLabel}>PACKAGE INFORMATION</Text>

              <Text style={s.detailText}>
                <strong>Package ID:</strong> {p.orderId}
              </Text>
            </Section>

            <Text style={s.description}>
              You can now access your invoice and transaction details through your account dashboard.
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

            <SupportSignature supportUrl="{URL}" />
          </Section>

          {/* FOOTER */}
          <EmailFooter displayThankYouFooter companyName={p.companyName} />
        </Container>
      </Body>
    </Html>
  );
};

export default BankValidation;
