import { Column, Row, Section, Text } from "react-email";
import { emailStyles as s } from "../style/styles";
interface EmailHeaderProps {
  companyName?: string;
}

export const EmailHeader = ({ companyName = "ShipLink" }: EmailHeaderProps) => {
  return (
    <>
      {/* Main Header */}
      <Section style={s.header} className="header-section">
        <Row>
          <Column>
            <Text style={s.logoText}>{companyName}</Text>
          </Column>
        </Row>
      </Section>
    </>
  );
};
