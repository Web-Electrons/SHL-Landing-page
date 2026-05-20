import { Section } from "react-email";
import { emailStyles as s } from "../style/styles";

interface EmailHeaderProps {
  companyName?: string;
}

export const EmailHeader = ({ companyName = "ShipLink" }: EmailHeaderProps) => {
  return (
    <>
      {/* Main Header */}
      {/* <Section style={s.header} className="header-section">
        <Row>
          <Column>
            <Img
              style={s.logoHeader}
              src="https://client.shiplink.com/whiteLogo.png"
              alt="ShipLink Logo"
              height="28"
              width="42"
            />
            <Text style={s.logoText}>{companyName}</Text>
          </Column>
        </Row>
      </Section> */}
      <Section style={s.header} className="header-section">
        <tr
          style={{
            height: "39pt",
          }}
        >
          <td
            width="100%"
            style={{
              width: "100%",
              background: "#c42626",
              padding: "0px 10pt 0px 20pt",
              height: "39pt",
              verticalAlign: "middle",
              // borderBottom: "1px solid #A50D24",
            }}
          >
            <p
              style={{
                margin: 0,
                padding: 0,
                fontFamily: "Arial, Helvetica, sans-serif",
                lineHeight: "16pt",
              }}
            >
              <span
                style={{
                  color: "#ffffff",
                  fontSize: "18pt",
                  fontWeight: "bold",
                }}
              >
                ShipLink
              </span>
            </p>
          </td>
        </tr>
      </Section>
    </>
  );
};
