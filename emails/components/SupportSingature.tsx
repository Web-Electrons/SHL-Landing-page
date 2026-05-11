import { emailStyles as s } from "../style/styles";
interface SupportSignatureProps {
  supportUrl: string;
}

export const SupportSignature = ({ supportUrl }: SupportSignatureProps) => {
  return (
    <p style={s.supportText}>
      Need Help?{" "}
      <a
        href={supportUrl}
        style={{
          color: s.supportLink.color,
          textDecoration: "none",
        }}
      >
        Contact Support
      </a>
    </p>
  );
};
