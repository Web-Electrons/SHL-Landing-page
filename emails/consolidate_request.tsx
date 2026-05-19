import { Body, Container, Head, Html, Preview, Section, Text } from "react-email";

import { EmailFooter } from "./components/EmailFooter";
import { EmailHeader } from "./components/EmailHeader";
import { InfoRow } from "./components/InfoRow";
import { SupportSignature } from "./components/SupportSingature";
import { emailStyles as s } from "./style/styles";

// ─── Props ───
interface ConsolidationRequestEmailProps {
  companyName?: string;
  warehouseName?: string;
  customerName?: string;
  customerId?: string;
}

const defaults: Required<ConsolidationRequestEmailProps> = {
  companyName: "ShipLink",
  warehouseName: "Los Angeles Warehouse",
  customerName: "John Doe",
  customerId: "A10000",
};

export const ConsolidationRequestEmail = (props: ConsolidationRequestEmailProps) => {
  const p = { ...defaults, ...props };

  return (
    <Html>
      <Head />
      <Preview>A new consolidation request has been received.</Preview>

      <Body style={s.body}>
        <Container style={s.container} className="mx-auto">
          {/* HEADER */}
          <EmailHeader companyName={p.companyName} />

          {/* CONTENT */}
          <Section style={s.bodySection}>
            <Text style={s.eyebrow}>Consolidation Request</Text>

            <Text style={s.headline}>A new consolidation request has been received.</Text>

            <Text style={s.description}>
              A customer has submitted a new package consolidation request. Please review the warehouse and customer
              information provided below.
            </Text>

            {/* REQUEST INFO */}
            <Section style={s.routeContent}>
              <Text style={s.label}>REQUEST DETAILS</Text>

              <InfoRow style={{ width: "110px", minWidth: "110px" }} label={"Warehouse"} value={`${p.warehouseName}`} />
              <InfoRow
                style={{ width: "110px", minWidth: "110px" }}
                label={"Customer Name"}
                value={`${p.customerName}`}
              />
              <InfoRow
                style={{ width: "110px", minWidth: "110px" }}
                label={"Account Number"}
                value={`${p.customerId}`}
              />
            </Section>

            <Text style={s.description}>
              This notification was generated automatically by the {p.companyName} system to keep shipment and warehouse
              operations updated in real time.
            </Text>

            {/* SUPPORT */}
            <SupportSignature supportUrl="mailto:support@shiplink.com" />
          </Section>

          {/* FOOTER */}
          <EmailFooter displayThankYouFooter={false} companyName={p.companyName} />
        </Container>
      </Body>
    </Html>
  );
};

export default ConsolidationRequestEmail;
