// components/email/FlagLocationRow.tsx

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
    display: "inline-block",
    fontSize: "14px",
    lineHeight: "12px",
    fontWeight: "700",
    fontFamily: "Arial,Helvetica,sans-serif",
    color: "#1a1a1a",
    margin: "0",
    padding: "0",
    msoLineHeightRule: "exactly",
    verticalAlign: "top",
  } as CSSProperties,

  address: {
    display: "block",
    fontSize: "12px",
    lineHeight: "16px",
    fontFamily: "Arial,Helvetica,sans-serif",
    color: "#555555",
    margin: "0",
    padding: "2px 0 0 0",
    msoLineHeightRule: "exactly",
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
    <table
      width="100%"
      cellPadding={0}
      cellSpacing={0}
      role="presentation"
      style={{
        borderCollapse: "collapse",
        tableLayout: "fixed",
      }}
    >
      <tbody>
        <tr>
          {/* Flag */}
          <td
            width={flagWidth}
            valign="top"
            style={{
              width: `${flagWidth}px`,
              padding: "1px 10px 0 0",
              verticalAlign: "top",
              fontSize: "0",
              lineHeight: "0",
            }}
          >
            <img
              src={flagSrc}
              alt={flagAlt}
              width={flagWidth}
              height={flagHeight}
              style={{
                display: "block",
                border: "0",
                outline: "none",
                textDecoration: "none",
              }}
            />
          </td>

          {/* Content */}
          <td
            valign="top"
            style={{
              verticalAlign: "top",
              fontSize: "0",
              lineHeight: "0",
              padding: "0",
              margin: "0",
            }}
          >
            <div style={nameStyle}>{name}</div>

            <div style={addressStyle}>{address}</div>
          </td>
        </tr>
      </tbody>
    </table>
  );
}
