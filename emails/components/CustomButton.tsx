import { Section } from "react-email";
import { emailStyles as s } from "../style/styles";
export const CustomButton = ({ style, label, link }: { label: string; link: string; style?: React.CSSProperties }) => {
  return (
    <Section style={{ marginTop: "24px", ...style }}>
      <table role="presentation" border={0} cellPadding="0" cellSpacing="0">
        <tbody>
          <tr>
            <td
              style={{
                backgroundColor: s.accentBrand.backgroundColor,
                padding: "14px 32px",
              }}
            >
              <a
                href={link}
                target="_blank"
                style={{
                  fontSize: "12px",
                  fontWeight: "700",
                  color: "#ffffff",
                  textDecoration: "none",
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
