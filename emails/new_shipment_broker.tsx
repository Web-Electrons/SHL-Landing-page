import { Body, Column, Container, Head, Html, Preview, Row, Section, Text } from "react-email";

import { CustomButton } from "./components/CustomButton";
import { EmailFooter } from "./components/EmailFooter";
import { EmailHeader } from "./components/EmailHeader";
import { FlagLocationRow } from "./components/FlagLocationRow";
import { InfoRow } from "./components/InfoRow";
import { Spacer } from "./components/Spacer";
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
            <Spacer />

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
                    <FlagLocationRow
                      flagSrc="https://flagcdn.com/h120/us.jpg"
                      name={p.cityOrigin}
                      address={p.countryOrigin}
                    />
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

                    <FlagLocationRow
                      flagSrc="https://flagcdn.com/h120/ca.jpg"
                      name={p.cityOrigin}
                      address={p.countryDestination}
                    />
                  </Section>
                </Column>
              </Row>
            </Section>
            <Spacer />
            <Text style={s.description}>
              Please login to your ShipLink Customs Broker account to begin processing the clearance request and manage
              the next operational steps.
            </Text>
            <Spacer />
            {/* CTA */}
            <CustomButton
              style={{
                marginTop: "0px",
                marginBottom: "10px",
              }}
              label="OPEN BROKERAGE DASHBOARD"
              link={p.dashboardLink}
            />
            <Spacer />
            <Text style={s.description}>
              Thank you for being a valued <strong>{p.companyName}</strong> patner.
            </Text>
            {/* SUPPORT */}
            <Spacer />
            <SupportSignature supportUrl="mailto:support@shiplink.com" />
          </Section>

          {/* FOOTER */}
          <EmailFooter style={{ paddingTop: "16px" }} companyName={p.companyName} />
        </Container>
      </Body>
    </Html>
  );
};

export default CustomsBrokerageRequestEmail;
