import { Column, Row } from "react-email";
import { emailStyles as s } from "../style/styles";
export const InfoRow = ({ label, value, style }: { label: string; value: string; style?: React.CSSProperties }) => (
  <Row style={s.row}>
    <Column
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
