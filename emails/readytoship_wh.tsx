import { Body, Container, Head, Html, Preview, Section, Text } from "react-email";

import { EmailFooter } from "./components/EmailFooter";
import { EmailHeader } from "./components/EmailHeader";
import { InfoRow } from "./components/InfoRow";
import { SupportSignature } from "./components/SupportSingature";
import { emailStyles as s } from "./style/styles";

// ─── Props ───
interface PackageReadyToShipEmailProps {
  companyName?: string;
  packageId?: string;
  warehouseName?: string;
  status?: string;
}

const defaults: Required<PackageReadyToShipEmailProps> = {
  companyName: "ShipLink",
  packageId: "PKG-2026-0001",
  warehouseName: "Boucherville",
  status: "Ready to Ship",
};

export const PackageReadyToShipEmail = (props: PackageReadyToShipEmailProps) => {
  const p = { ...defaults, ...props };

  return (
    <Html>
      <Head />
      <Preview>Package {p.packageId} is now ready to ship.</Preview>

      <Body style={s.body}>
        <Container style={s.container} className="mx-auto">
          {/* HEADER */}
          <EmailHeader companyName={p.companyName} />

          {/* CONTENT */}
          <Section style={s.bodySection}>
            <Text style={s.eyebrow}>Ready to Ship</Text>

            <Text style={s.headline}>A package is ready for shipment.</Text>

            <Text style={s.description}>
              The package has completed warehouse processing and is now marked as ready to ship.
            </Text>

            {/* PACKAGE INFO */}
            <Section style={s.routeContent}>
              <Text style={s.label}>PACKAGE INFORMATION</Text>

              <InfoRow label={"Package ID"} value={`${p.packageId}`} />

              <InfoRow label={"Warehouse"} value={`${p.warehouseName}`} />
              <InfoRow label={"Status"} value={`${p.status}`} />
            </Section>

            <Text style={s.description}>
              This notification was generated automatically by the {p.companyName} system to keep your shipment activity
              updated in real time.
            </Text>

            {/* SUPPORT */}
            <SupportSignature supportUrl="mailto:support@shiplink.com" />
          </Section>

          {/* FOOTER */}
          <EmailFooter displayThankYouFooter={false} companyName={p.companyName} />
        </Container>
      </Body>
    </Html>
  );
};

export default PackageReadyToShipEmail;
