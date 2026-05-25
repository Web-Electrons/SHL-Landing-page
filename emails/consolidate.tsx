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

interface ConsolidationCompletedEmailProps {
  companyName?: string;
  orderId?: string;

  warehouse?: string;
  warehouseAddress?: string;
  warehouseCity?: string;
  warehouseProvinceCode?: string;
  warehousePostalCode?: string;
  warehouseCountry?: string;

  originalPackages?: PackageRow[];
  consolidatedPackages?: PackageRow[];

  serviceLink?: string;
}

const defaults: Required<ConsolidationCompletedEmailProps> = {
  companyName: "ShipLink",

  orderId: "CON-2026-0001",

  warehouse: "Los Angeles Warehouse",
  warehouseAddress: "1234 Industrial Ave",
  warehouseCity: "Los Angeles",
  warehouseProvinceCode: "CA",
  warehousePostalCode: "90001",
  warehouseCountry: "United States",

  originalPackages: [
    {
      packageId: "PKG-10001",
      dimensions: "10 x 10 x 8 in, 3 lbs",
      qty: "1",
    },
    {
      packageId: "PKG-10002",
      dimensions: "14 x 12 x 10 in, 5 lbs",
      qty: "1",
    },
  ],

  consolidatedPackages: [
    {
      packageId: "CON-2026-0001",
      dimensions: "18 x 16 x 14 in, 8 lbs",
      qty: "2",
    },
  ],

  serviceLink: "https://shiplink.com",
};

// ─── Email ────────────────────────────────────────────────────────────────────

export const ConsolidationCompletedEmail = (props: ConsolidationCompletedEmailProps) => {
  const p = { ...defaults, ...props };

  return (
    <Html>
      <Head />
      {/* SUBJECT : CONSOLIDATION COMPLETE */}
      <Preview>Consolidation Completed</Preview>

      <Body style={s.body}>
        <Container style={s.container} className="mx-auto">
          {/* HEADER */}
          <EmailHeader companyName={p.companyName} />

          {/* CONTENT */}
          <Section style={s.bodySection}>
            <Text style={s.eyebrow}>Consolidation Completed</Text>

            <Text style={s.headline}> Consolidation #{p.orderId} has been completed. </Text>

            <Text style={s.description}>
              Your consolidation request has been completed. Please login to your account to select a service and
              continue with the next steps.
            </Text>
            <Spacer />
            {/* WAREHOUSE */}
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

                      <FlagLocationRow
                        flagSrc="https://flagcdn.com/h120/us.jpg"
                        name={p.warehouse}
                        address={`${p.warehouseAddress}, ${p.warehouseCity}, ${p.warehouseProvinceCode}, ${p.warehousePostalCode}, ${p.warehouseCountry}`}
                      />
                    </Section>
                  </Section>
                </Column>
              </Row>
            </Section>

            <Row style={{ lineHeight: "16px", fontSize: "0" }}>&nbsp;</Row>
            {/* CTA */}
            <CustomButton
              style={{
                marginTop: "0px",
              }}
              label="SELECT SERVICE"
              link={p.serviceLink}
            />

            <Row style={{ lineHeight: "16px", fontSize: "0" }}>&nbsp;</Row>
            {/* CONSOLIDATE PACKAGES */}
            <PackageTable
              title="Consolidated Package"
              rows={p.consolidatedPackages}
              columns={[
                {
                  key: "packageId",
                  label: "Package ID",
                  width: "40%",
                },
                {
                  key: "dimensions",
                  label: "Dimensions",
                  width: "40%",
                },
                {
                  key: "qty",
                  label: "Qty",
                  width: "20%",
                },
              ]}
            />

            {/* SPACING */}
            <Row style={{ lineHeight: "16px", fontSize: "0" }}>&nbsp;</Row>
            {/* ORIGINAL PACKAGE */}
            <PackageTable
              title="Original Packages"
              rows={p.originalPackages}
              columns={[
                {
                  key: "packageId",
                  label: "Package ID",
                  width: "40%",
                },
                {
                  key: "dimensions",
                  label: "Dimensions",
                  width: "40%",
                },
                {
                  key: "qty",
                  label: "Qty",
                  width: "20%",
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

export default ConsolidationCompletedEmail;
