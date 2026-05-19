import { Body, Container, Head, Html, Preview, Section, Text } from "react-email";

import { CustomButton } from "./components/CustomButton";
import { EmailFooter } from "./components/EmailFooter";
import { EmailHeader } from "./components/EmailHeader";
import { SupportSignature } from "./components/SupportSingature";
import { emailStyles as s } from "./style/styles";

// ─── Props ───
interface WarehouseReminderEmailProps {
  companyName?: string;
  customerName?: string;
  trackingIds?: string;
  message?: string;
  dashboardLink?: string;
}

const defaults: Required<WarehouseReminderEmailProps> = {
  companyName: "ShipLink",
  customerName: "John Doe",
  trackingIds: "PKG-2026-0001, PKG-2026-0002",
  message: "are currently awaiting processing",
  dashboardLink: "https://shiplink.com/dashboard",
};

export const WarehouseReminderEmail = (props: WarehouseReminderEmailProps) => {
  const p = { ...defaults, ...props };

  return (
    <Html>
      <Head />
      <Preview>Packages in your warehouse account require attention.</Preview>

      <Body style={s.body}>
        <Container style={s.container} className="mx-auto">
          {/* HEADER */}
          <EmailHeader companyName={p.companyName} />

          {/* CONTENT */}
          <Section style={s.bodySection}>
            <Text style={s.eyebrow}>Warehouse Reminder</Text>

            <Text style={s.headline}>Packages in your account require action.</Text>

            <Text style={s.description}>
              Dear <strong>{p.customerName},</strong>
            </Text>

            <Text style={s.description}>
              Our system shows that package(s) <strong>{p.trackingIds}</strong> in one of our warehouse facilities{" "}
              {p.message}.
            </Text>

            <Text style={s.description}>
              To avoid additional storage fees or processing delays, please select one of the available service options
              such as
              <strong> Consolidation</strong>, <strong>Pick-Up</strong>, or <strong>Forwarding</strong> service.
            </Text>

            {/* CTA */}
            <CustomButton
              style={{
                marginTop: "0px",
                marginBottom: "10px",
              }}
              label="MANAGE PACKAGES"
              link={p.dashboardLink}
            />

            <Text style={s.description}>
              If you need assistance selecting the appropriate shipping option, our support team is available to help
              you.
            </Text>

            {/* SUPPORT */}
            <SupportSignature supportUrl="mailto:support@shiplink.com" />
          </Section>

          {/* FOOTER */}
          <EmailFooter displayThankYouFooter={true} companyName={p.companyName} />
        </Container>
      </Body>
    </Html>
  );
};

export default WarehouseReminderEmail;
