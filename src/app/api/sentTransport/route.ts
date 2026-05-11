import { resendService } from "@/lib/Resend";
import { NextResponse } from "next/server";

import fs from "fs";
import path from "path";

export async function POST() {
  const templatePath = path.join(process.cwd(), "public", "send_request_carrier_v5.html");

  let html = fs.readFileSync(templatePath, "utf-8");

  html = html.replaceAll("{{name}}", "Tuan Sahril").replaceAll("{{trackingNumber}}", "GDL-123456");

  const response = await resendService.sendEmail({
    from: "onboarding@resend.dev",
    to: "sahrilputra10@gmail.com",
    subject: "TEST - Latest Tranport Request ",
    html,
  });

  return NextResponse.json(response);
}
