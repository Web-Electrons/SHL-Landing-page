import { Body, Container, Head, Html, Preview, Section, Text } from "react-email";

import { EmailFooter } from "./components/EmailFooter";
import { EmailHeader } from "./components/EmailHeader";
import { InfoRow } from "./components/InfoRow";
import { SupportSignature } from "./components/SupportSingature";
import { emailStyles as s } from "./style/styles";

// ─── Props ───
interface ContentImageRequestEmailProps {
  companyName?: string;
  trackingId?: string;
  customerName?: string;
  customerId?: string;
}

const defaults: Required<ContentImageRequestEmailProps> = {
  companyName: "ShipLink",
  trackingId: "PKG-2026-0001",
  customerName: "John Doe",
  customerId: "CUS-2026-0001",
};

export const ContentImageRequestEmail = (props: ContentImageRequestEmailProps) => {
  const p = { ...defaults, ...props };

  return (
    <Html>
      <Head />
      <Preview>New content image request received for package {p.trackingId}.</Preview>

      <Body style={s.body}>
        <Container style={s.container} className="mx-auto">
          {/* HEADER */}
          <EmailHeader companyName={p.companyName} />

          {/* CONTENT */}
          <Section style={s.bodySection}>
            <Text style={s.eyebrow}>Content Image Request</Text>

            <Text style={s.headline}>A new package image request has been submitted.</Text>

            <Text style={s.description}>
              A customer has requested additional package content images for shipment <strong>#{p.trackingId}</strong>.
              Please review the request details below and proceed with the image handling process.
            </Text>

            {/* REQUEST DETAILS */}
            <Section style={s.routeContent}>
              <Text style={s.label}>REQUEST DETAILS</Text>

              <InfoRow label={"Package ID"} value={`${p.trackingId}`} />

              <InfoRow label={"Customer Name"} value={`${p.customerName}`} />
              <InfoRow label={"Customer ID"} value={`${p.customerId}`} />
            </Section>

            <Text style={s.description}>
              This notification was generated automatically by the {p.companyName} system to help warehouse and
              operations teams manage package inspection requests efficiently.
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

export default ContentImageRequestEmail;
