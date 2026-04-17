import axios from "axios";
import https from "https";
import { NextResponse } from "next/server";
const agent = new https.Agent({
    rejectUnauthorized: false // Non-production use only! Disables SSL certificate verification
});
export async function POST(request) {
    try {
        const {
            warehouse_id,
            id,
            service_id,
            status,
            service_id_exeption,
            user_plan = 'free'
        } = await request.json();
        const response = await axios.post(
            `${process.env.API_URL}/Public/WarehouseServices_list`,
            {
                warehouse_id: warehouse_id,
                id: id,
                service_id: service_id,
                status: status,
                service_id_exeption: service_id_exeption,
                user_plan: user_plan
            },
            {
                httpsAgent: agent,
            }
        );

        if (response.status === 200) {
            const responseData = {
                message: response.data.message,
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

