import React from "react";

interface SpacerProps {
  height?: number;
  style?: React.CSSProperties;
}

export const Spacer = ({ height = 10, style }: SpacerProps) => {
  return (
    <div
      aria-hidden="true"
      style={{
        height: `${height}px`,
        lineHeight: `${height}px`,
        fontSize: "0px",
        msoLineHeightRule: "exactly",
        ...style,
      }}
    >
      &nbsp;
    </div>
  );
};
