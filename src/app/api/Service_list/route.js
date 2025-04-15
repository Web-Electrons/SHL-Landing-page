import { NextResponse } from "next/server"
import axios from "axios";
import https from "https";
const agent = new https.Agent({
    rejectUnauthorized: false // Non-production use only! Disables SSL certificate verification
});
export async function GET(request) {
    try {
        // const tokenAccess = await getAccessToken(request)
        // const { keyword, page, limit, index, token } = await request.json();

        // console.log("token from country", token);
        // `${process.env.API_URL}/Public/ServiceSetting_list`,

        const response = await axios.get(
            `https://api.shiplink.ca/api/Public/ServiceSetting_list`,
            {
                httpsAgent: agent,
            }
        );

        // console.log("🚀 ~ GET ~ response:", response)

        if (response.status === 200) {
            const responseData = {
                data: response.data,
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

