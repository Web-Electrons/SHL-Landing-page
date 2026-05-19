import { Body, Container, Head, Html, Preview, Section, Text } from "react-email";

import { CustomButton } from "./components/CustomButton";
import { EmailFooter } from "./components/EmailFooter";
import { EmailHeader } from "./components/EmailHeader";
import { InfoRow } from "./components/InfoRow";
import { SupportSignature } from "./components/SupportSingature";
import { emailStyles as s } from "./style/styles";

// ─── Props ───
interface ClearedPackageProps {
  companyName?: string;
  orderId?: string;
  packageId?: string;
  dashboardLink?: string;
}

const defaults: Required<ClearedPackageProps> = {
  companyName: "ShipLink",
  orderId: "ORD-2026-0001",
  packageId: "PKG-2026-0001",
  dashboardLink: "https://app.shiplink.com/dashboard",
};

export const ClearedPackage = (props: ClearedPackageProps) => {
  const p = { ...defaults, ...props };

  return (
    <Html>
      <Head />
      <Preview>Your shipment has successfully completed transport clearance.</Preview>

      <Body style={s.body}>
        <Container style={s.container} className="mx-auto">
          {/* HEADER */}
          <EmailHeader companyName={p.companyName} />

          {/* CONTENT */}
          <Section style={s.bodySection}>
            <Text style={s.eyebrow}>Transport Update</Text>

            <Text style={s.headline}>Transport clearance completed successfully.</Text>

            <Text style={s.description}>
              Your shipment has successfully passed the transport clearance process and is now moving forward to the
              next stage within our delivery network.
            </Text>

            {/* ORDER INFO */}
            <Section style={s.routeContent}>
              <Text style={s.label}>SHIPMENT INFORMATION</Text>

              <InfoRow label={"Order ID"} value={`${p.orderId}`} />
              <InfoRow label={"Package ID"} value={`${p.packageId}`} />
            </Section>

            <Text style={s.description}>
              Please log in to your account dashboard to review the latest shipment updates and continue with any
              required actions.
            </Text>

            {/* CTA */}
            <CustomButton
              style={{
                marginTop: "0px",
              }}
              label="VIEW SHIPMENT DETAILS"
              link={p.dashboardLink}
            />

            <Text style={s.description}>
              If you require assistance regarding your shipment, our support team will be available to help you.
            </Text>
            <SupportSignature supportUrl="{URL}" />
          </Section>

          {/* FOOTER */}
          <EmailFooter displayThankYouFooter companyName={p.companyName} />
        </Container>
      </Body>
    </Html>
  );
};

export default ClearedPackage;
