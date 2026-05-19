import { Body, Column, Container, Head, Html, Img, Preview, Row, Section, Text } from "react-email";

import { CustomButton } from "./components/CustomButton";
import { EmailFooter } from "./components/EmailFooter";
import { EmailHeader } from "./components/EmailHeader";
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
  packageType: "Package",
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

            <Text style={s.headline}>Your shipment has been received.</Text>

            <Text style={s.description}>
              Your package <strong>#{p.packageId}</strong> has successfully arrived at our warehouse and is now ready to
              be picked up.
            </Text>

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

                      <Section style={s.locationFlagWrapper}>
                        <Img
                          height="20"
                          width="36"
                          alt="flag"
                          src="https://flagcdn.com/h80/us.jpg"
                          style={s.locationFlag}
                        />
                      </Section>

                      <Text style={s.locationName}>John Doe</Text>

                      <Text style={s.locationAddress}>1234 Industrial Ave, Los Angeles, CA, 90001, United States</Text>
                    </Section>
                  </Section>
                </Column>
              </Row>
            </Section>

            <Text style={s.description}>
              {" "}
              To collect your shipment, please ensure that you bring your Pickup Voucher when visiting the pickup
              location. The warehouse team may require the voucher for identity and shipment verification before
              releasing the package.{" "}
            </Text>

            {/* CTA */}
            <CustomButton
              style={{
                marginTop: "0px",
                marginBottom: "10px",
              }}
              label="VIEW SHIPMENT"
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

export default PackageReceivedEmail;
