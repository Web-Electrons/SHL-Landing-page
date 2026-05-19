import { Body, Container, Head, Html, Preview, Section, Text } from "react-email";

import { CustomButton } from "./components/CustomButton";
import { EmailFooter } from "./components/EmailFooter";
import { EmailHeader } from "./components/EmailHeader";
import { InfoRow } from "./components/InfoRow";
import { emailStyles as s } from "./style/styles";

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
              <Text style={s.label}>USER DETAILS</Text>
              <InfoRow style={{ width: "110px" }} label={"Name"} value={`${p.userName}`} />
              <InfoRow style={{ width: "110px" }} label={"Email"} value={`${p.userEmail}`} />
              <InfoRow style={{ width: "110px" }} label={"Registration Date"} value={`${p.registrationDate}`} />
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
