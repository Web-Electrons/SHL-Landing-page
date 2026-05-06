import { Column, Row, Section, Text } from "react-email";
import { emailStyles as s } from "../style/styles";

interface EmailFooterProps {
  companyName?: string;
  landingPageUrl?: string;
  year?: number;
}

export const EmailFooter = ({
  companyName = "ShipLink",
  landingPageUrl = "https://shiplink.com",
  year = new Date().getFullYear(),
}: EmailFooterProps) => {
  return (
    <Section style={s.footer} className="footer-section">
      <Row>
        <Column valign="middle">
          <Text style={s.footerBrand}>{companyName}</Text>
        </Column>
      </Row>

      <Row>
        <Column>
          <Text style={s.footerCopy}>
            &copy; {year} {companyName} Services Inc. All rights reserved.
          </Text>
        </Column>
      </Row>
    </Section>
  );
};
