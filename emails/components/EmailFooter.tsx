import { Column, Row, Section, Text } from "react-email";
import { emailStyles as s } from "../style/styles";

interface EmailFooterProps {
  companyName?: string;
  landingPageUrl?: string;
  year?: number;
  displayThankYouFooter?: boolean;
}

export const EmailFooter = ({
  companyName = "ShipLink",
  landingPageUrl = "https://shiplink.com",
  displayThankYouFooter = false,
  year = new Date().getFullYear(),
}: EmailFooterProps) => {
  return (
    <Section style={s.footer} className="footer-section">
      {displayThankYouFooter && (
        <Row>
          <Column>
            <Text style={s.signoffText}>
              Thank You for using{" "}
              <span
                style={{
                  fontWeight: "bold",
                }}
              >
                {companyName}
              </span>
            </Text>
          </Column>
        </Row>
      )}
      <Section style={s.footerBottom}>
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
    </Section>
  );
};
