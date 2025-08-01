import { NextResponse } from 'next/server'
import axios from 'axios'
import https from 'https'
import { Currency } from 'lucide-react'

const agent = new https.Agent({
  rejectUnauthorized: false, // Non-production use only! Disables SSL certificate verification
})

export async function POST(request) {
  try {
    const { warehouse_id, parcels } = await request.json()
    console.log('')

    const response = await axios.post(
      `${process.env.API_URL}/Carrier/HoldPickup_Calculation`,
      {
        warehouse_id,
        parcels,
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
