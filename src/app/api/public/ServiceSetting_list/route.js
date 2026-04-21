import axios from 'axios'
import https from 'https'
import { NextResponse } from 'next/server'
const agent = new https.Agent({
  rejectUnauthorized: false, // Non-production use only! Disables SSL certificate verification
})
export async function POST(request) {
  try {
    const { warehouse_id, country_code } = await request.json()
    const response = await axios.get(
      `${process.env.API_URL}/Public/ServiceSetting_list?warehouse_id=${warehouse_id}&country_code=${country_code}`,
      {
        httpsAgent: agent,
      }
    )

    if (response.status === 200) {
      const responseData = {
        data: response.data,
      }
      return NextResponse.json(responseData, { status: 200 })
    } else {
      return NextResponse.json({ message: response.data.message }, { status: 400 })
    }
  } catch (error) {
    console.error(error)
    return new Response('Internal Server Error', { status: 500 })
  }
}
