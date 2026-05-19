import { Body, Column, Container, Head, Html, Img, Preview, Row, Section, Text } from "react-email";

import { CustomButton } from "./components/CustomButton";
import { EmailFooter } from "./components/EmailFooter";
import { EmailHeader } from "./components/EmailHeader";
import { InfoRow } from "./components/InfoRow";
import { SupportSignature } from "./components/SupportSingature";
import { emailStyles as s } from "./style/styles";

// ─── Props ───
interface CustomsBrokerageRequestEmailProps {
  companyName?: string;
  brokerageCompany?: string;

  orderId?: string;

  cityOrigin?: string;
  countryOrigin?: string;

  cityDestination?: string;
  countryDestination?: string;

  dashboardLink?: string;
}

const defaults: Required<CustomsBrokerageRequestEmailProps> = {
  companyName: "ShipLink",
  brokerageCompany: "Global Customs Brokerage",

  orderId: "ORD-2026-0001",

  cityOrigin: "Los Angeles",
  countryOrigin: "United States",

  cityDestination: "Toronto",
  countryDestination: "Canada",

  dashboardLink: "https://broker.shiplink.com/dashboard",
};

export const CustomsBrokerageRequestEmail = (props: CustomsBrokerageRequestEmailProps) => {
  const p = { ...defaults, ...props };

  return (
    <Html>
      <Head />
      <Preview>A new customs brokerage request has been assigned.</Preview>

      <Body style={s.body}>
        <Container style={s.container} className="mx-auto">
          {/* HEADER */}
          <EmailHeader companyName={p.companyName} />

          {/* CONTENT */}
          <Section style={s.bodySection}>
            <Text style={s.eyebrow}>Brokerage Assignment</Text>

            <Text style={s.headline}>A new customs brokerage request has been assigned.</Text>

            <Text style={s.description}>
              Dear <strong>{p.brokerageCompany},</strong>
            </Text>

            <Text style={s.description}>
              A new shipment has been assigned to your brokerage team for import clearance processing. Please review the
              shipment details below and proceed with the customs handling process through your brokerage dashboard.
            </Text>

            {/* ORDER INFO */}
            <Section style={s.routeContent}>
              <Text style={s.label}>ORDER INFORMATION</Text>
              <InfoRow label={"Order ID"} value={`${p.orderId}`} />
            </Section>

            {/* ROUTE */}
            <Section
              style={{
                marginTop: "10px",
              }}
            >
              <Row>
                {/* ORIGIN */}
                <Column style={s.originColumn}>
                  <Section
                    style={{
                      ...s.routeContent,
                      borderLeft: "3px solid #C8102E",
                    }}
                  >
                    <Text style={s.label}>ORIGIN</Text>
                    <Section style={s.locationFlagWrapper}>
                      <Img
                        height="20"
                        width="36"
                        alt="flag"
                        src="https://flagcdn.com/h80/us.jpg"
                        style={s.locationFlag}
                      />
                    </Section>
                    <Text style={s.routeName}>{p.cityOrigin}</Text>

                    <Text style={s.routeAddress}>{p.countryOrigin}</Text>
                  </Section>
                </Column>

                {/* DESTINATION */}
                <Column style={s.destinationColumn}>
                  <Section
                    style={{
                      ...s.routeContent,
                      borderLeft: "3px solid #1A1A1A",
                    }}
                  >
                    <Text style={s.label}>DESTINATION</Text>

                    <Section style={s.locationFlagWrapper}>
                      <Img
                        height="20"
                        width="36"
                        alt="flag"
                        src="https://flagcdn.com/h80/ca.jpg"
                        style={s.locationFlag}
                      />
                    </Section>
                    <Text style={s.routeName}>{p.cityDestination}</Text>

                    <Text style={s.routeAddress}>{p.countryDestination}</Text>
                  </Section>
                </Column>
              </Row>
            </Section>

            <Text style={s.description}>
              Please log in to your ShipLink Customs Broker account to begin processing the clearance request and manage
              the next operational steps.
            </Text>

            {/* CTA */}
            <CustomButton
              style={{
                marginTop: "0px",
                marginBottom: "10px",
              }}
              label="OPEN BROKERAGE DASHBOARD"
              link={p.dashboardLink}
            />

            <Text style={s.description}>
              Thank you for being a valued <strong>{p.companyName}</strong> patner.
            </Text>
            {/* SUPPORT */}
            <SupportSignature supportUrl="mailto:support@shiplink.com" />
          </Section>

          {/* FOOTER */}
          <EmailFooter companyName={p.companyName} />
        </Container>
      </Body>
    </Html>
  );
};

export default CustomsBrokerageRequestEmail;
