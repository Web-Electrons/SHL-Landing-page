import { resendService } from "./Resend";

await resendService.sendEmail({
  to: "user@email.com",
  subject: "Welcome",
  html: `
    <h1>Hello world</h1>
    <p>Testing resend transporter</p>
  `,
});
