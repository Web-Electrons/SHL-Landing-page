import { Body, Container, Head, Html, Preview, Section, Text } from "react-email";

import { CustomButton } from "./components/CustomButton";
import { EmailFooter } from "./components/EmailFooter";
import { EmailHeader } from "./components/EmailHeader";
import { emailStyles as s } from "./style/styles";

// ─── Color System (match design sebelumnya) ───
const C = {
  red: "#C8102E",
  black: "#1A1A1A",
  secondary: "#385196",
  muted: "#666666",
  label: "#999999",
  pageBg: "#F0EFED",
  white: "#ffffff",
  offWhite: "#F9F8F6",
  border: "#E0DDD8",
};

const FONT = "Arial, Helvetica, sans-serif";

// ─── Props ───
interface NewUserEmailProps {
  companyName?: string;
  userName?: string;
  userEmail?: string;
  registrationDate?: string;
  link?: string;
}

const defaults: Required<NewUserEmailProps> = {
  companyName: "ShipLink",
  userName: "John Doe",
  userEmail: "john@example.com",
  registrationDate: "2026-01-01",
  link: "https://admin.shiplink.com",
};

// ─── Component ───
export const NewUserEmail = (props: NewUserEmailProps) => {
  const p = { ...defaults, ...props };

  return (
    <Html>
      <Head />
      <Preview>New user registered: {p.userName}</Preview>

      <Body style={s.body}>
        <Container style={s.container} className="mx-auto">
          {/* HEADER */}
          <EmailHeader companyName={p.companyName} />

          {/* CONTENT */}
          <Section style={s.bodySection}>
            <Text style={s.eyebrow}>New Registration</Text>

            <Text style={s.headline}>A new user has just registered.</Text>

            <Text style={s.description}>Below are the details of the newly registered user.</Text>

            {/* USER CARD */}
            <Section style={s.routeContent}>
              <Text style={s.routeLabel}>USER DETAILS</Text>

              <Text style={s.detailText}>
                <strong>Name:</strong> {p.userName}
                <br />
                <strong>Email:</strong> {p.userEmail}
                <br />
                <strong>Registration Date:</strong> {p.registrationDate}
              </Text>
            </Section>

            <Text style={s.description}>Please review this user and take action if necessary.</Text>
            {/* CTA */}
            <CustomButton
              style={{
                marginTop: "0px",
              }}
              label="VIEW USER"
              link={p.link}
            />
          </Section>

          {/* FOOTER */}
          <EmailFooter companyName={p.companyName} />
        </Container>
      </Body>
    </Html>
  );
};

export default NewUserEmail;
