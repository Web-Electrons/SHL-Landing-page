import { Column, Row, Section, Text } from "react-email";
import { emailStyles as s } from "../style/styles";

interface EmailFooterProps {
  companyName?: string;
  landingPageUrl?: string;
  year?: number;
  displayThankYouFooter?: boolean;
  style?: React.CSSProperties;
}

export const EmailFooter = ({ companyName = "ShipLink", displayThankYouFooter = false, style }: EmailFooterProps) => {
  return (
    <Section style={s.footer} className="footer-section">
      {displayThankYouFooter && (
        <Row>
          <Column>
            <Text style={s.signoffText} className="signoff-text">
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
      <Section style={{ ...s.footerContent, ...style }}>
        <Row>
          <Column valign="middle" align="right" style={{ paddingRight: "4px" }}>
            <Text style={s.footerBrand}>{companyName}</Text>
          </Column>
        </Row>

        <Row>
          <Column align="right">
            <Text style={s.footerCopy}>&copy; {companyName} Services Inc. All rights reserved.</Text>
          </Column>
        </Row>
      </Section>
    </Section>
  );
};
