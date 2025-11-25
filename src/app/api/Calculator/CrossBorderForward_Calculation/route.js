import { NextResponse } from 'next/server'
import axios from 'axios'
import https from 'https'

const agent = new https.Agent({
  rejectUnauthorized: false, // Non-production use only! Disables SSL certificate verification
})

export async function POST(request) {
  try {
    const { warehouse_id, broker, warehouse_id_destination, parcels, amountLocal, currencyLocal, addressTo, package_content } =
      await request.json()

    const response = await axios.post(
      `${process.env.API_URL}/Carrier/CrossBorderForward_Calculation`,
      {
        warehouse_id,
        broker,
        warehouse_id_destination,
        parcels,
        addressTo,
        amountLocal,
        currencyLocal,
        package_content,

      },
      {
        httpsAgent: agent,
      }
    )

    if (response.status === 200) {
      const responseData = {
        status: response.data.status,
        message: response.data.message,
        services: response.data.services,
        currency: response.data.currency,
        rates: response.data.rates,
        total: response.data.total,
      }
      return NextResponse.json(responseData, { status: 200 })
    } else {
      return NextResponse.json(
        { message: response.data.message || 'Error from upstream API' },
        { status: 400 }
      )
    }
  } catch (error) {
    console.error('API Error:', error)

    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 })
  }
}
