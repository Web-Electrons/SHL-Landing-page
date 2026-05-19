import { Body, Column, Container, Head, Html, Img, Preview, Row, Section, Text } from "react-email";

import { CustomButton } from "./components/CustomButton";
import { EmailFooter } from "./components/EmailFooter";
import { EmailHeader } from "./components/EmailHeader";
import { SupportSignature } from "./components/SupportSingature";
import { emailStyles as s } from "./style/styles";
export interface ShipLinkTransportEmailProps {
  orderId?: string;
  originName?: string;
  originAddress?: string;
  originCity?: string;
  originCountry?: string;
  destinationName?: string;
  destinationAddress?: string;
  destinationCity?: string;
  destinationCountry?: string;
  loginUrl?: string;
  supportUrl?: string;
}

const defaults: Required<ShipLinkTransportEmailProps> = {
  orderId: "C105647",
  originName: "Old Route",
  originAddress: "Old Route 66",
  originCity: "St. Louis, MO 65401",
  originCountry: "United States",
  destinationName: "Test Nama Yang Panjang Sekali",
  destinationAddress: "1000 Boulevard Saint-Jean",
  destinationCity: "Pointe-Claire, QC H9R 5Y8",
  destinationCountry: "Canada",
  loginUrl: "https://shiplink.com/auth/login",
  supportUrl: "mailto:contact@shiplink.com",
};

export const TransportRequest = (props: ShipLinkTransportEmailProps) => {
  const p = { ...defaults, ...props };
  return (
    <Html>
      <Head />
      <Preview>New Transport Request for oder {p.orderId}</Preview>

      <Body style={s.body}>
        <Container style={s.container} className="mx-auto">
          {/* HEADER */}
          <EmailHeader companyName={"ShipLink"} />

          {/* CONTENT */}
          <Section style={s.bodySection}>
            <Text style={s.eyebrow}>New Transport Request</Text>

            <Text style={s.headline}>Order C1905AA has been assigned to your dispatch.</Text>

            <Text style={s.description}>
              A new transport request has been created. Please review the shipment details and proceed from your
              dashboard.
            </Text>

            {/* USER CARD */}
            {/* USER CARD */}
            <Row style={s.locationRow}>
              {/* LEFT: ORIGIN */}
              <Column style={s.locationCellLeft}>
                <Section style={s.originCard}>
                  <Section style={s.locationContent}>
                    <Text style={s.label}>ORIGIN</Text>

                    <Section style={s.locationFlagWrapper}>
                      <Img
                        height="20"
                        width="36"
                        alt="flag"
                        src="https://flagcdn.com/h120/us.jpg"
                        style={s.locationFlag}
                      />
                    </Section>

                    <Text style={s.locationName}>John Doe</Text>

                    <Text style={s.locationAddress}>1234 Industrial Ave, Los Angeles, CA, 90001, United States</Text>
                  </Section>
                </Section>
              </Column>

              {/* RIGHT: DESTINATION */}
              <Column style={s.locationCellRight}>
                <Section style={s.destinationCard}>
                  <Section style={s.locationContent}>
                    <Text style={s.label}>DESTINATION</Text>

                    <Section style={s.locationFlagWrapper}>
                      <Img
                        height="20"
                        alt="flag"
                        width="36"
                        src="https://flagcdn.com/h120/ca.jpg"
                        style={s.locationFlag}
                      />
                    </Section>

                    <Text style={s.locationName}>Jennie Doe</Text>

                    <Text style={s.locationAddress}>789 Distribution St, Toronto, ON, M5V 2T6, Canada</Text>
                  </Section>
                </Section>
              </Column>
            </Row>
            <Row style={{ lineHeight: "16px", fontSize: "0" }}>&nbsp;</Row>

            {/* CTA */}
            <CustomButton
              style={{
                marginTop: "0px",
                marginBottom: "10px",
              }}
              label="ACCESS YOUR ACCOUNT"
              link={"shiplink.com"}
            />

            <SupportSignature supportUrl="mailto:support@shiplink.com" />
          </Section>

          {/* FOOTER */}
          <EmailFooter displayThankYouFooter={true} companyName={"ShipLink"} />
        </Container>
      </Body>
    </Html>
  );
};

export default TransportRequest;
