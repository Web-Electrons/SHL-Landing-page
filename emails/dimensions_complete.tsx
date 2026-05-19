import { Body, Container, Head, Html, Preview, Row, Section, Text } from "react-email";

import { CustomButton } from "./components/CustomButton";
import { EmailFooter } from "./components/EmailFooter";
import { EmailHeader } from "./components/EmailHeader";
import { InfoRow } from "./components/InfoRow";
import { PackageRow, PackageTable } from "./components/PakcageTable";
import { SupportSignature } from "./components/SupportSingature";
import { emailStyles as s } from "./style/styles";

// ─── Props ────────────────────────────────────────────────────────────────────

interface PackageSizingCompletedEmailProps {
  companyName?: string;
  packageType?: string;
  orderId?: string;

  warehouse?: string;
  warehouseAddress?: string;
  warehouseCity?: string;
  warehouseProvinceCode?: string;
  warehousePostalCode?: string;
  warehouseCountry?: string;

  packageRows?: PackageRow[];

  serviceLink?: string;
}

const defaults: Required<PackageSizingCompletedEmailProps> = {
  companyName: "ShipLink",
  packageType: "Package",
  orderId: "PKG-2026-0001",

  warehouse: "Los Angeles Warehouse",
  warehouseAddress: "1234 Industrial Ave",
  warehouseCity: "Los Angeles",
  warehouseProvinceCode: "CA",
  warehousePostalCode: "90001",
  warehouseCountry: "United States",

  packageRows: [
    {
      packageId: "A103789",
      dimensions: "12 x 10 x 8 in / 4 lbs",
      qty: "1",
    },
    {
      packageId: "A103790",
      dimensions: "16 x 12 x 10 in / 6 lbs",
      qty: "2",
    },
  ],

  serviceLink: "https://shiplink.com",
};

// ─── Email ────────────────────────────────────────────────────────────────────

export const PackageSizingCompletedEmail = (props: PackageSizingCompletedEmailProps) => {
  const p = { ...defaults, ...props };

  const tableRows: PackageRow[] = p.packageRows.length > 0 ? p.packageRows : [{ packageId: p.orderId }];

  return (
    <Html>
      <Head />
      <Preview>Package sizing has been completed for shipment {p.orderId}.</Preview>

      <Body style={s.body}>
        <Container style={s.container} className="mx-auto">
          {/* HEADER */}
          <EmailHeader companyName={p.companyName} />

          {/* CONTENT */}
          <Section style={s.bodySection}>
            <Text style={s.eyebrow}>Shipment Preparation</Text>

            <Text style={s.headline}>Your package sizing has been completed.</Text>

            <Text style={s.description}>
              Your items have been measured, and your package is ready to ship.
              {/* Your shipment has been measured and prepared for
                            service selection. Package dimensions are now
                            available in your dashboard for forwarding,
                            consolidation, or shipping requests. */}
            </Text>

            {/* PACKAGE INFO */}
            <Section style={s.routeContent}>
              <Text style={s.label}>PACKAGE INFORMATION</Text>
              <InfoRow style={{ width: "110px" }} label={"Account Number"} value={`${p.orderId}`} />
            </Section>

            <Text style={s.description}>
              Please log in to your account to select a shipping service and continue with the next shipment process.
            </Text>

            {/* CTA */}
            <CustomButton
              style={{
                marginTop: "0px",
              }}
              label="SELECT SERVICE"
              link={p.serviceLink}
            />

            <Row style={{ lineHeight: "16px", fontSize: "0" }}>&nbsp;</Row>
            {/* PACKAGE TABLE */}
            <PackageTable
              title="Measured Package Details"
              rows={tableRows}
              columns={[
                {
                  key: "packageId",
                  label: "Package ID",
                  width: "40%",
                },
                {
                  key: "dimensions",
                  label: "Dimensions",
                  width: "50%",
                },
                {
                  key: "qty",
                  label: "Qty",
                  width: "10%",
                },
              ]}
            />
            <Row style={{ lineHeight: "16px", fontSize: "0" }}>&nbsp;</Row>

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

export default PackageSizingCompletedEmail;
