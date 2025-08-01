import { NextResponse } from 'next/server'
import axios from 'axios'
import https from 'https'
const agent = new https.Agent({
  rejectUnauthorized: false, // Non-production use only! Disables SSL certificate verification
})
export async function POST(request) {
  try {
    const { addressFrom, addressTo, parcels } = await request.json()
    // console.log("🚀 ~ POST ~ process.env.API_URL:", process.env.API_URL)

    const response = await axios.post(
      `${process.env.API_URL}/Carrier/ShippingCalculation`,
      {
        addressFrom: addressFrom,
        addressTo: addressTo,
        parcels: parcels,
      },
      {
        httpsAgent: agent,
      }
    )
    console.log('🚀 ~ POST ~ response:', response)

    if (response.status === 200) {
      const responseData = {
        status: response.data.status,
        message: response.data.message,
        services: response.data.services,
        total: response.data.total,
        rates: response.data.shipment,
      }
      return NextResponse.json(responseData, { status: 200 })
    } else {
      return NextResponse.error({ message: response.data.message }, { status: 400 })
    }
  } catch (error) {
    console.error(error)
    return new Response('Internal Server Error', { status: 500 })
  }
}
