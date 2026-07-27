import { NextResponse } from "next/server";
import axios from "axios";
import https from "https";

const agent = new https.Agent({
  rejectUnauthorized: false,
});
export async function POST(request) {
  try {
    const { full_name, email, phone_number, subject, message } = await request.json();

    const response = await axios.post(
      `${process.env.API_URL}/Public/ContactUs_set`,
      {
        full_name,
        email,
        phone_number,
        subject,
        message,
      },
      {
        httpsAgent: agent,
      }
    );

    if (response.status === 200) {
      const responseData = {
        status: response.data.status,
        message: response.data.message,
      };
      return NextResponse.json(responseData, { status: 200 });
    } else {
      return NextResponse.error({ message: response.data.message }, { status: 400 });
    }
  } catch (error) {
    console.error(error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
