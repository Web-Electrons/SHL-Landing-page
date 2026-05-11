import { Resend } from "resend";

export interface SendEmailPayload {
  to: string | string[];
  subject: string;
  html: string;
  from?: string;
}

class ResendService {
  private resend: Resend;

  constructor() {
    this.resend = new Resend(process.env.RESEND_API_KEY);
  }

  async sendEmail(payload: SendEmailPayload) {
    try {
      const response = await this.resend.emails.send({
        from: payload.from || "Your App <noreply@yourdomain.com>",
        to: payload.to,
        subject: payload.subject,
        html: payload.html,
      });

      return {
        success: true,
        data: response,
      };
    } catch (error) {
      console.error("Resend Error:", error);

      return {
        success: false,
        error,
      };
    }
  }
}

export const resendService = new ResendService();
