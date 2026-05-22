import { Column, Row } from "react-email";
import { emailStyles as s } from "../style/styles";
export const InfoRow = ({ label, value, style }: { label: string; value: string; style?: React.CSSProperties }) => {
  return (
    <Row style={s.row}>
      <Column
        valign="baseline"
        style={{
          ...s.cellLabel,
          ...style,
        }}
      >
        {label}
      </Column>

      <Column style={s.cellValue}> : {value}</Column>
    </Row>
  );
};
