import { Section } from "react-email";
import { emailStyles as s } from "../style/styles";

export const CustomButton = ({ style, label, link }: { label: string; link: string; style?: React.CSSProperties }) => {
  return (
    <Section style={{ marginTop: "24px", ...style }}>
      <table role="presentation" border={0} cellPadding="0" cellSpacing="0">
        <tbody>
          <tr>
            <td
              align="center"
              valign="middle"
              style={{
                backgroundColor: s.accentBrand.backgroundColor,
              }}
            >
              <a
                href={link}
                target="_blank"
                style={{
                  display: "inline-block",
                  padding: "12px 28px",
                  fontSize: "12px",
                  fontWeight: "700",
                  lineHeight: "12px",
                  color: "#ffffff",
                  textDecoration: "none",
                  textAlign: "center",
                }}
              >
                {label}
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </Section>
  );
};
