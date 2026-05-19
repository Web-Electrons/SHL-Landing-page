import { Body, Container, Head, Html, Preview, Section, Text } from "react-email";

import { EmailFooter } from "./components/EmailFooter";
import { EmailHeader } from "./components/EmailHeader";
import { InfoRow } from "./components/InfoRow";
import { SupportSignature } from "./components/SupportSingature";
import { emailStyles as s } from "./style/styles";

// ─── Props ───
interface GoShipShipmentBookedEmailProps {
  companyName?: string;
  trackingId?: string;
  paymentLink?: string;
  date?: string;
}

const defaults: Required<GoShipShipmentBookedEmailProps> = {
  companyName: "ShipLink",
  trackingId: "PKG-2026-0001",
  date: "2026-01-01",
  paymentLink: "https://quotes.goship.com/sign-in",
};

export const GoShipShipmentBookedEmail = (props: GoShipShipmentBookedEmailProps) => {
  const p = { ...defaults, ...props };

  return (
    <Html>
      <Head />
      <Preview>GoShip shipment has been booked and is awaiting payment.</Preview>

      <Body style={s.body}>
        <Container style={s.container} className="mx-auto">
          {/* HEADER */}
          <EmailHeader companyName={p.companyName} />

          {/* CONTENT */}
          <Section style={s.bodySection}>
            <Text style={s.eyebrow}>Shipment Booking</Text>

            <Text style={s.headline}>A GoShip shipment has been successfully booked.</Text>

            <Text style={s.description}>
              The shipment booking has been successfully created through GoShip and is currently awaiting payment
              confirmation before processing can continue.
            </Text>

            {/* SHIPMENT INFO */}
            <Section style={s.routeContent}>
              <Text style={s.label}>SHIPMENT DETAILS</Text>
              <InfoRow style={{ width: "120px" }} label={"Package ID"} value={`${p.trackingId}`} />
              <InfoRow style={{ width: "120px" }} label={"Order Date"} value={`${p.date}`} />
            </Section>

            <Text style={s.description}>
              Please proceed with the payment directly through your GoShip dashboard to finalize the shipment booking
              and continue the delivery process.
            </Text>

            {/* CTA */}
            {/* <CustomButton
                            style={{
                                marginTop: "0px",
                                marginBottom: "10px",
                            }}
                            label="OPEN GOSHIP DASHBOARD"
                            link={p.paymentLink}
                        /> */}

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

export default GoShipShipmentBookedEmail;
