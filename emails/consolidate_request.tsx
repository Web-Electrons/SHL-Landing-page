import { Body, Container, Head, Html, Preview, Section, Text } from "react-email";

import { CustomButton } from "./components/CustomButton";
import { EmailFooter } from "./components/EmailFooter";
import { EmailHeader } from "./components/EmailHeader";
import { InfoRow } from "./components/InfoRow";
import { Spacer } from "./components/Spacer";
import { SupportSignature } from "./components/SupportSingature";
import { emailStyles as s } from "./style/styles";

// ─── Props ───
interface ConsolidationRequestEmailProps {
  companyName?: string;
  warehouseName?: string;
  customerName?: string;
  customerId?: string;
  serviceLink?: string;
}

const defaults: Required<ConsolidationRequestEmailProps> = {
  companyName: "ShipLink",
  warehouseName: "Los Angeles Warehouse",
  customerName: "John Doe",
  customerId: "A10000",
  serviceLink: "https://admin.shiplink.com/",
};

export const ConsolidationRequestEmail = (props: ConsolidationRequestEmailProps) => {
  const p = { ...defaults, ...props };

  return (
    <Html>
      {/* SUBJECT : New Consolidation Request */}
      <Head />
      <Preview>A new consolidation request has been received.</Preview>

      <Body style={s.body}>
        <Container style={s.container} className="mx-auto">
          {/* HEADER */}
          <EmailHeader companyName={p.companyName} />

          {/* CONTENT */}
          <Section style={s.bodySection}>
            <Text style={s.eyebrow}>Consolidation Request</Text>

            <Text style={s.headline}>A consolidation request has been received.</Text>

            <Text style={s.description}>A customer has submitted a new consolidation request.</Text>
            <Spacer />

            {/* REQUEST INFO */}
            <Section style={s.routeContent}>
              <Text style={s.label}>REQUEST DETAILS</Text>

              <InfoRow label={"Warehouse"} value={`${p.warehouseName}`} />
              <InfoRow label={"Customer Name"} value={`${p.customerName}`} />
              <InfoRow label={"Account Number"} value={`${p.customerId}`} />
            </Section>

            <Spacer />

            <Text style={s.description}>This notification was generated automatically.</Text>
            <Spacer />
            {/* CTA */}
            <CustomButton
              style={{
                marginTop: "0px",
                marginBottom: "10px",
              }}
              label="ACCESS WAREHOUSE ACCOUNT"
              link={p.serviceLink}
            />
            <Spacer />

            {/* SUPPORT */}
            <SupportSignature supportUrl="mailto:support@shiplink.com" />
          </Section>

          {/* FOOTER */}
          <EmailFooter style={{ paddingTop: "16px" }} displayThankYouFooter={false} companyName={p.companyName} />
        </Container>
      </Body>
    </Html>
  );
};

export default ConsolidationRequestEmail;
