import { CSSProperties } from "react";

interface FlagLocationRowProps {
  flagSrc: string;
  flagAlt?: string;
  flagWidth?: number;
  flagHeight?: number;
  name: string;
  address: string;
  styles?: {
    name?: CSSProperties;
    address?: CSSProperties;
  };
}

const defaultStyles = {
  name: {
    display: "block",
    fontSize: "14px",
    // lineHeight: "10px",
    fontWeight: "700",
    fontFamily: "Arial,Helvetica,sans-serif",
    color: "#1a1a1a",
    margin: "0",
    padding: "0",
    msoLineHeightRule: "exactly",
    verticalAlign: "top",
    msoLineHeightRule: "exactly" as any,
    msoMarginTopAlt: "0px" as any, // ← hapus top margin Word
    msoPaddingTopAlt: "0px" as any, // ← hapus top padding Word
  } as CSSProperties,

  address: {
    fontSize: "12px",
    fontFamily: "Arial,Helvetica,sans-serif",
    color: "#555555",
    margin: "0",
    padding: "0",
    lineHeight: "0",
  } as CSSProperties,
};

export function FlagLocationRow({
  flagSrc,
  flagAlt = "flag",
  flagWidth = 36,
  flagHeight = 20,
  name,
  address,
  styles = {},
}: FlagLocationRowProps) {
  const nameStyle = { ...defaultStyles.name, ...styles.name };
  const addressStyle = { ...defaultStyles.address, ...styles.address };

  return (
    <table width="100%" cellPadding={0} cellSpacing={0} style={{ borderCollapse: "collapse", tableLayout: "fixed" }}>
      <tbody>
        <tr>
          {/* Flag cell */}
          <td
            width={flagWidth}
            valign="top"
            style={{
              width: `${flagWidth}px`,
              paddingRight: "10px",
              paddingTop: "4px",
              // paddingTop: `${flagPaddingTop}px`,
              verticalAlign: "top",
              fontSize: "0",
              lineHeight: "0",
              msoLineHeightRule: "exactly",
              msoPaddingTopAlt: "4px", // ← ini khusus Outlook
            }}
          >
            <img
              src={flagSrc}
              alt={flagAlt}
              width={flagWidth}
              height={flagHeight}
              style={{ display: "block", border: 0, marginTop: "-2px" }}
            />
          </td>

          {/* Text cell */}
          <td valign="top" style={{ verticalAlign: "top" }}>
            <table cellPadding={0} cellSpacing={0} style={{ borderCollapse: "collapse" }}>
              <tbody>
                <tr>
                  <td style={nameStyle}>{name}</td>
                </tr>
                <tr>
                  <td style={{ paddingTop: "2px" }}>
                    <span style={addressStyle}>{address}</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
  );
}
