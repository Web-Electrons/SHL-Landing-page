import { Body, Container, Head, Html, Preview, Section, Text } from "react-email";

import { CustomButton } from "./components/CustomButton";
import { EmailFooter } from "./components/EmailFooter";
import { EmailHeader } from "./components/EmailHeader";
import { SupportSignature } from "./components/SupportSingature";
import { emailStyles as s } from "./style/styles";

// ─── Props ───
interface PackageImageReadyEmailProps {
  companyName?: string;
  trackingId?: string;
  dashboardLink?: string;
}

const defaults: Required<PackageImageReadyEmailProps> = {
  companyName: "ShipLink",
  trackingId: "PKG-2026-0001",
  dashboardLink: "https://shiplink.com/dashboard",
};

export const PackageImageReadyEmail = (props: PackageImageReadyEmailProps) => {
  const p = { ...defaults, ...props };

  return (
    <Html>
      <Head />
      <Preview>Package images are now available for shipment {p.trackingId}.</Preview>

      <Body style={s.body}>
        <Container style={s.container} className="mx-auto">
          {/* HEADER */}
          <EmailHeader companyName={p.companyName} />

          {/* CONTENT */}
          <Section style={s.bodySection}>
            <Text style={s.eyebrow}>Package Update</Text>

            <Text style={s.headline}>Your package images are now available.</Text>

            <Text style={s.description}>
              {" "}
              Images for shipment <strong>#{p.trackingId}</strong> have been uploaded and are now available in your
              dashboard. You may review the uploaded photos to verify package condition, shipment contents, and other
              handling details before continuing with the next step.{" "}
            </Text>

            <Text style={s.description}>
              Please log in to your dashboard to review the uploaded images and manage the next shipment process.
            </Text>

            {/* CTA */}
            <CustomButton
              style={{
                marginTop: "0px",
                marginBottom: "10px",
              }}
              label="GO TO DASHBOARD"
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

export default PackageImageReadyEmail;
