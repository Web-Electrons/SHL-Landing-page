import { Body, Column, Container, Head, Html, Preview, Row, Section, Text } from "react-email";

import { CustomButton } from "./components/CustomButton";
import { EmailFooter } from "./components/EmailFooter";
import { EmailHeader } from "./components/EmailHeader";
import { FlagLocationRow } from "./components/FlagLocationRow";
import { Spacer } from "./components/Spacer";
import { SupportSignature } from "./components/SupportSingature";
import { emailStyles as s } from "./style/styles";

// ─── Props ───
interface PackageReceivedEmailProps {
  companyName?: string;
  packageType?: string;
  packageId?: string;

  originCountry?: string;
  originFlag?: string;

  warehouseName?: string;
  warehouseAddress?: string;
  warehouseCity?: string;
  warehouseProvinceCode?: string;
  warehousePostalCode?: string;
  warehouseCountry?: string;
  warehouseFlag?: string;

  dashboardLink?: string;
}

const defaults: Required<PackageReceivedEmailProps> = {
  companyName: "ShipLink",
  packageType: "package",
  packageId: "PKG-2026-0001",

  originCountry: "United States",
  originFlag: "https://flagcdn.com/h80/us.png",

  warehouseName: "Los Angeles Warehouse",
  warehouseAddress: "1234 Industrial Ave",
  warehouseCity: "Los Angeles",
  warehouseProvinceCode: "CA",
  warehousePostalCode: "90001",
  warehouseCountry: "United States",
  warehouseFlag: "https://flagcdn.com/h80/us.png",

  dashboardLink: "https://shiplink.com/dashboard",
};

export const PackageReceivedEmail = (props: PackageReceivedEmailProps) => {
  const p = { ...defaults, ...props };

  return (
    <Html>
      <Head />
      <Preview>Your shipment has been received at our warehouse facility.</Preview>

      <Body style={s.body}>
        <Container style={s.container} className="mx-auto">
          {/* HEADER */}
          <EmailHeader companyName={p.companyName} />

          {/* CONTENT */}
          <Section style={s.bodySection}>
            <Text style={s.eyebrow}>Ready to pickup</Text>

            <Text style={s.headline}>Your {p.packageType} has arrived.</Text>

            <Text style={s.description}>
              Your package <strong>#{p.packageId}</strong> has successfully arrived at a warehouse and is now ready to
              be picked up.
            </Text>
            <Spacer />

            {/* ROUTE CARDS */}
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
                      <Text style={s.label}>PICKUP LOCATION</Text>

                      <FlagLocationRow
                        flagSrc="https://flagcdn.com/h120/us.jpg"
                        name={p.warehouseName}
                        address={`${p.warehouseAddress}${p.warehouseCity}, ${p.warehouseProvinceCode}, ${p.warehousePostalCode}, ${p.warehouseCountry}`}
                      />
                    </Section>
                  </Section>
                </Column>
              </Row>
            </Section>
            <Spacer />
            <Text style={s.description}>
              {" "}
              To collect your {p.packageType}, please ensure that you bring your pickup voucher when visiting the pickup
              location. The warehouse team may require the voucher for verification before releasing the package.{" "}
            </Text>

            <Spacer />
            {/* CTA */}
            <CustomButton
              style={{
                marginTop: "0px",
                marginBottom: "10px",
              }}
              label="VIEW SHIPMENT"
              link={p.dashboardLink}
            />

            <Spacer />
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

export default PackageReceivedEmail;
