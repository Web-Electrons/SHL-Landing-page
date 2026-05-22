import { Body, Column, Container, Head, Html, Preview, Row, Section, Text } from "react-email";

import { CustomButton } from "./components/CustomButton";
import { EmailFooter } from "./components/EmailFooter";
import { EmailHeader } from "./components/EmailHeader";
import { FlagLocationRow } from "./components/FlagLocationRow";
import { PackageRow, PackageTable } from "./components/PakcageTable";
import { Spacer } from "./components/Spacer";
import { SupportSignature } from "./components/SupportSingature";
import { emailStyles as s } from "./style/styles";

// ─── Props ────────────────────────────────────────────────────────────────────

interface PackageArrivedEmailProps {
  companyName?: string;
  packageType?: string;
  orderId?: string;

  warehouse?: string;
  warehouseAddress?: string;
  warehouseCity?: string;
  warehouseProvinceCode?: string;
  warehousePostalCode?: string;
  warehouseCountry?: string;

  /**
   * Structured rows for the package table.
   * Falls back to a single placeholder row using `orderId` if omitted.
   */
  packageRows?: PackageRow[];

  serviceLink?: string;
}

const defaults: Required<PackageArrivedEmailProps> = {
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
      trackingNumber: "123ZYX",
      carrier: "UPS",
      dimensions: "10x10x10 lbs",
      qty: "1",
    },
    {
      packageId: "A103229",
      trackingNumber: "0987663YWXXS",
      carrier: "FedEx",
      dimensions: "12x20x10 lbs",
      qty: "3",
    },
  ],
  serviceLink: "https://app.shiplink.com/dashboard",
};

// ─── Email ────────────────────────────────────────────────────────────────────

export const PackageArrivedEmail = (props: PackageArrivedEmailProps) => {
  const p = { ...defaults, ...props };

  // If no explicit rows, build a minimal default row from orderId
  const tableRows: PackageRow[] = p.packageRows.length > 0 ? p.packageRows : [{ packageId: p.orderId }];

  return (
    <Html title="Package Arrival">
      {/* SUBJECT : Package Arrival */}
      <Head />

      <Preview>Package Arrival</Preview>

      <Body style={s.body}>
        <Container style={s.container} className="mx-auto">
          <EmailHeader companyName={p.companyName} />

          <Section style={s.bodySection}>
            <Text style={s.eyebrow}>PACKAGE ARRIVAL</Text>

            <Text style={s.headline}>Your {p.packageType} has arrived.</Text>

            <Text style={s.description}>Your {p.packageType} has been received at a warehouse.</Text>
            <Spacer />
            {/* WAREHOUSE BLOCK */}
            <Section
              style={{
                marginTop: "10px",
                padding: "0px",
              }}
            >
              <Row>
                <Column style={s.locationColumn}>
                  <Section style={s.originCard}>
                    <Section style={s.locationContent}>
                      <Text style={s.label}>WAREHOUSE LOCATION</Text>

                      {/* NEW */}

                      <FlagLocationRow
                        flagSrc="https://flagcdn.com/h120/us.jpg"
                        name={p.warehouse}
                        address={`${p.warehouseAddress}${p.warehouseCity}, ${p.warehouseProvinceCode}, ${p.warehousePostalCode}, ${p.warehouseCountry}`}
                      />
                    </Section>
                  </Section>
                </Column>
              </Row>
            </Section>
            <Spacer />
            <Text style={s.description}>
              Please login to your account to select a service and proceed with the next steps
            </Text>
            <Spacer />
            <CustomButton style={{ marginTop: "0px" }} label="SELECT SERVICE" link={p.serviceLink} />
            <Spacer />
            <Row style={{ lineHeight: "16px", fontSize: "0" }}>&nbsp;</Row>
            {/* PACKAGE TABLE — now a standalone component */}
            <PackageTable title="Package Details" rows={tableRows} />
            <Row style={{ lineHeight: "16px", fontSize: "0" }}>&nbsp;</Row>
            <Spacer />
            <SupportSignature supportUrl="mailto:support@shiplink.com" />
          </Section>

          <EmailFooter displayThankYouFooter companyName={p.companyName} />
        </Container>
      </Body>
    </Html>
  );
};

export default PackageArrivedEmail;
