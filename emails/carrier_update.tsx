import { Body, Container, Head, Html, Preview, Section, Text } from "react-email";

import { EmailFooter } from "./components/EmailFooter";
import { EmailHeader } from "./components/EmailHeader";
import { InfoRow } from "./components/InfoRow";
import { SupportSignature } from "./components/SupportSingature";
import { emailStyles as s } from "./style/styles";

// ─── Props ───
interface CarrierUpdateEmailProps {
  companyName?: string;
  orderId?: string;
  carrierUpdatedData?: string;
}

const defaults: Required<CarrierUpdateEmailProps> = {
  companyName: "ShipLink",
  orderId: "ORD-2026-0001",
  carrierUpdatedData: "Carrier assignment updated from DHL Express to FedEx.",
};

export const CarrierUpdateEmail = (props: CarrierUpdateEmailProps) => {
  const p = { ...defaults, ...props };

  return (
    <Html>
      <Head />
      <Preview>Transport request order {p.orderId} has been updated.</Preview>

      <Body style={s.body}>
        <Container style={s.container} className="mx-auto">
          {/* HEADER */}
          <EmailHeader companyName={p.companyName} />

          {/* CONTENT */}
          <Section style={s.bodySection}>
            <Text style={s.eyebrow}>Carrier Update</Text>

            <Text style={s.headline}>Your transport request has been updated.</Text>

            <Text style={s.description}>
              The transport request associated with your shipment order has been updated with new carrier-related
              information. Please review the latest details below.
            </Text>

            {/* UPDATE INFO */}
            <Section style={s.routeContent}>
              <Text style={s.label}>UPDATE DETAILS</Text>

              <InfoRow label="Order ID" value={`${p.orderId}`} />
              <InfoRow label="Updated Data" value={`${p.carrierUpdatedData}`} />
            </Section>

            <Text style={s.description}>
              This notification was generated automatically by the {p.companyName} system to keep your shipment activity
              and transport information up to date.
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

export default CarrierUpdateEmail;
