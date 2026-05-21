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
        {/* Fixing Yahoo Mail issues it didnt work with pt */}
        <table
          role="presentation"
          width="100%"
          cellPadding={0}
          cellSpacing={0}
          border={0}
          style={{
            width: "100%",
            borderCollapse: "collapse",
            backgroundColor: "#c42626",
          }}
        >
          <tbody>
            <tr
              style={{
                height: "52px",
              }}
            >
              <td
                width="100%"
                style={{
                  width: "100%",
                  background: "#c42626",
                  // padding: "0px 13px 0px 26px",
                  // Yahoo dindnt work with td height properties change it to padding
                  // height: "52px",
                  padding: "14px 13px 14px 26px",

                  verticalAlign: "middle",
                  // borderBottom: "1px solid #A50D24",
                }}
              >
                <p
                  style={{
                    margin: 0,
                    padding: 0,
                    fontFamily: "Arial, Helvetica, sans-serif",
                    lineHeight: "21px",
                  }}
                >
                  <span
                    style={{
                      color: "#ffffff",
                      fontSize: "24px",
                      fontWeight: "bold",
                    }}
                  >
                    ShipLink
                  </span>
                </p>
              </td>
            </tr>
          </tbody>
        </table>
      </Section>
    </>
  );
};
