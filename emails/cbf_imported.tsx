import { Body, Container, Head, Html, Preview, Section, Text } from "react-email";

import { CustomButton } from "./components/CustomButton";
import { EmailFooter } from "./components/EmailFooter";
import { EmailHeader } from "./components/EmailHeader";
import { SupportSignature } from "./components/SupportSingature";
import { emailStyles as s } from "./style/styles";

// ─── Props ───
interface PackageImportedEmailProps {
  companyName?: string;
  packageType?: string;
  packageId?: string;
  trackingLink?: string;
}

const defaults: Required<PackageImportedEmailProps> = {
  companyName: "ShipLink",
  packageType: "Package",
  packageId: "PKG-2026-0001",
  trackingLink: "https://shiplink.com/dashboard",
};

export const PackageImportedEmail = (props: PackageImportedEmailProps) => {
  const p = { ...defaults, ...props };

  return (
    <Html>
      <Head />
      <Preview>Your shipment has arrived in the destination country.</Preview>

      <Body style={s.body}>
        <Container style={s.container} className="mx-auto">
          {/* HEADER */}
          <EmailHeader companyName={p.companyName} />

          {/* CONTENT */}
          <Section style={s.bodySection}>
            <Text style={s.eyebrow}>Shipment Update</Text>

            <Text style={s.headline}>Your package has arrived in the destination country.</Text>

            <Text style={s.description}>
              Your shipment has successfully completed the international transit process and has now been transferred to
              the domestic carrier for local delivery handling.
            </Text>

            {/* PACKAGE INFO */}
            <Section style={s.routeContent}>
              <Text style={s.routeLabel}>PACKAGE INFORMATION</Text>

              <Text style={s.detailText}>
                <strong>{p.packageType} ID:</strong> {p.packageId}
              </Text>
            </Section>

            <Text style={s.description}>
              You can follow the latest tracking activity and delivery progress directly from your account dashboard.
            </Text>

            {/* CTA */}
            <CustomButton
              style={{
                marginTop: "0px",
              }}
              label="TRACK PACKAGE"
              link={p.trackingLink}
            />

            <Text style={s.description}>
              If you require assistance regarding your shipment, our support team will be available to help you.
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

export default PackageImportedEmail;
