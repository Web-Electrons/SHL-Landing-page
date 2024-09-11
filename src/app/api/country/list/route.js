import { NextResponse } from "next/server"
import axios from "axios";
import https from "https";
const agent = new https.Agent({
    rejectUnauthorized: false // Non-production use only! Disables SSL certificate verification
});
export async function POST(request) {
    try {
        // const tokenAccess = await getAccessToken(request)
        const { keyword, page, limit, index, token } = await request.json();

        // console.log("token from country", token);

        const response = await axios.post(
            `${process.env.API_URL}/Config/Country_list`,
            {
                keyword: keyword,
                page: page,
                limit: limit,
                index: index,
            },
            {
                httpsAgent: agent,
                headers: {
                    Authorization:
                        `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiJmN2U5NzcyYy03NmUxLTRiNDItODg3Mi01NWVkYTMzZjEyZTUiLCJyb2xlIjoic3VwZXJhZG1pbiIsInVuaXF1ZV9uYW1lIjoiU1VQMjQwMjE4MjIyMDAyMyIsIm5iZiI6MTcyNjA1MDI1NiwiZXhwIjoxNzI2MDkzNDU2LCJpYXQiOjE3MjYwNTAyNTZ9.Zj-IM570BVMYBKoC4E22jUTULigu_y06idgYaxTgVGc`
                }
            }
        );

        // console.log("response from api : ", response.data); // Log the response data

        if (response.status === 200) {
            const responseData = {
                status: true,
                message: response.data.message,
                total: response.data.total,
                page_total: response.data.page_total,
                page_limit: response.data.page_limit,
                country: response.data.country
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

