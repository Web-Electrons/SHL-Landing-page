import { Body, Container, Head, Html, Preview, Section, Text } from "react-email";

import { EmailFooter } from "./components/EmailFooter";
import { EmailHeader } from "./components/EmailHeader";
import { Spacer } from "./components/Spacer";
import { SupportSignature } from "./components/SupportSingature";
import { emailStyles as s } from "./style/styles";

// ─── Props ────────────────────────────────────────────────────────────────────

interface PickupVoucherExpiredEmailProps {
  companyName?: string;

  packageId?: string;
  warehouseName?: string;
  voucherStatus?: string;

  dashboardLink?: string;
}

const defaults: Required<PickupVoucherExpiredEmailProps> = {
  companyName: "ShipLink",

  packageId: "PKG-2026-0001",
  warehouseName: "Los Angeles Warehouse",
  voucherStatus: "Expired",

  dashboardLink: "https://app.shiplink.com/dashboard",
};

// ─── Email ────────────────────────────────────────────────────────────────────

export const PickupVoucherExpiredEmail = (props: PickupVoucherExpiredEmailProps) => {
  const p = { ...defaults, ...props };

  return (
    <Html>
      <Head />
      <Preview>Your pickup voucher has expired and requires renewal.</Preview>

      <Body style={s.body}>
        <Container style={s.container} className="mx-auto">
          {/* HEADER */}
          <EmailHeader companyName={p.companyName} />

          {/* CONTENT */}
          <Section style={s.bodySection}>
            <Text style={s.eyebrow}>Pickup Status Update</Text>

            <Text style={s.headline}>Your pickup voucher has expired.</Text>

            <Text style={s.description}>
              The complimentary storage period for your shipment has ended before the pickup process was completed. As a
              result, the pickup voucher associated with this shipment is no longer valid.
            </Text>
            <Spacer />
            {/* PICKUP INFO */}
            <Section style={s.routeContent}>
              <Text style={s.label}>PICKUP INFORMATION</Text>

              <Text style={s.detailText}>
                <strong
                  style={{
                    display: "inline-block",
                    width: "140px",
                  }}
                >
                  Package ID
                </strong>
                : {p.packageId}
              </Text>

              <Text style={s.detailText}>
                <strong
                  style={{
                    display: "inline-block",
                    width: "140px",
                  }}
                >
                  Warehouse
                </strong>
                : {p.warehouseName}
              </Text>

              <Text style={s.detailText}>
                <strong
                  style={{
                    display: "inline-block",
                    width: "140px",
                  }}
                >
                  Voucher Status
                </strong>
                : {p.voucherStatus}
              </Text>
            </Section>
            <Spacer />
            <Text style={s.description}>
              Your shipment has been returned to warehouse received status. Please review the outstanding storage
              balance and complete checkout again to generate a new pickup voucher.
            </Text>

            <Text style={s.description}>
              Previously paid pickup service fees will not be charged again. Only pending storage charges will be
              included in the new checkout.
            </Text>

            {/* SUPPORT */}
            <Spacer />
            <SupportSignature supportUrl="mailto:support@shiplink.com" />
            <Spacer />
          </Section>

          {/* FOOTER */}
          <EmailFooter displayThankYouFooter companyName={p.companyName} />
        </Container>
      </Body>
    </Html>
  );
};

export default PickupVoucherExpiredEmail;
