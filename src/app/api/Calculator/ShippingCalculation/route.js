import { NextResponse } from 'next/server'
import axios from 'axios'
import https from 'https'
const agent = new https.Agent({
  rejectUnauthorized: false, // Non-production use only! Disables SSL certificate verification
})
export async function POST(request) {
  try {
    const {
      warehouse_id,
      warehouse_id_destination,
      addressFrom,
      addressTo,
      parcels,
      total_package_value,
      currency_package_value,
    } = await request.json()

    const response = await axios.post(
      `${process.env.API_URL}/Carrier/ShippingCalculation`,
      {
        warehouse_id: warehouse_id,
        warehouse_id_destination: warehouse_id_destination,
        addressFrom: addressFrom,
        addressTo: addressTo,
        parcels: parcels,
        total_package_value: total_package_value,
        currency_package_value: currency_package_value,
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
