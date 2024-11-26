import { NextResponse } from "next/server"
import axios from "axios";
import https from "https";
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
            service_id_exeption
        } = await request.json();
        const response = await axios.post(
            `${process.env.API_URL}/Warehouse/WarehouseServices_list`,
            {
                warehouse_id: warehouse_id,
                id: id,
                service_id: service_id,
                status: status,
                service_id_exeption: service_id_exeption
            },
            {
                httpsAgent: agent,
                headers: {
                    Authorization:
                        `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiJmN2U5NzcyYy03NmUxLTRiNDItODg3Mi01NWVkYTMzZjEyZTUiLCJyb2xlIjoic3VwZXJhZG1pbiIsInVuaXF1ZV9uYW1lIjoiU1VQMjQwMjE4MjIyMDAyMyIsIm5iZiI6MTczMjU5NDE1OCwiZXhwIjoxNzMyNjM3MzU4LCJpYXQiOjE3MzI1OTQxNTh9.uxBv9QlaB2C6vIJR7nmSULcfVgEj4RbcM2lMIgmC8BE`
                }
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

