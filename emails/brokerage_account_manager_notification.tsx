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
interface BrokerageStatusEmailProps {
  companyName?: string;
  title?: string;
  brokerageStatus?: string;
  orderCode?: string;
  originCity?: string;
  originCountry?: string;
  destinationCity?: string;
  destinationCountry?: string;
  dashboardLink?: string;
}

const defaults: Required<BrokerageStatusEmailProps> = {
  companyName: "ShipLink",
  title: "Brokerage Request Updated",
  brokerageStatus: "approved",
  orderCode: "ORD-2026-0001",
  originCity: "Los Angeles",
  originCountry: "United States",
  destinationCity: "Toronto",
  destinationCountry: "Canada",
  dashboardLink: "https://shiplink.com/dashboard",
};

export const BrokerageStatusEmail = (props: BrokerageStatusEmailProps) => {
  const p = { ...defaults, ...props };

  return (
    <Html>
      <Head />
      <Preview>Brokerage request status updated for order {p.orderCode}.</Preview>

      <Body style={s.body}>
        <Container style={s.container} className="mx-auto">
          {/* HEADER */}
          <EmailHeader companyName={p.companyName} />

          {/* CONTENT */}
          <Section style={s.bodySection}>
            <Text style={s.eyebrow}>Brokerage Update</Text>

            <Text style={s.headline}>{p.title}</Text>

            <Text style={s.description}>
              The brokerage request been <strong>{p.brokerageStatus}</strong>. Please review the updated information
              from your dashboard.
            </Text>

            <Spacer />

            {/* ORDER INFO */}
            <Section style={s.routeContent}>
              <Text style={s.label}>ORDER INFORMATION</Text>
              <InfoRow label={"Order ID"} value={`${p.orderCode}`} />
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
                      name={p.originCity}
                      address={p.originCountry}
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
                      name={p.destinationCity}
                      address={p.destinationCountry}
                    />
                  </Section>
                </Column>
              </Row>
            </Section>

            <Spacer />
            <Text style={s.description}>You can access your dashboard to review the latest brokerage activity.</Text>

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

export default BrokerageStatusEmail;
