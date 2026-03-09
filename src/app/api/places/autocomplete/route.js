import { NextResponse } from 'next/server'

export async function POST(req) {
    try {
        const { input } = await req.json()

        if (!input || input.length < 3) {
            return NextResponse.json({ predictions: [] })
        }

        const res = await fetch(
            'https://places.googleapis.com/v1/places:autocomplete',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Goog-Api-Key': process.env.DEV_GOOGLE_PLACES_KEY,
                    'X-Goog-FieldMask': 'suggestions',
                },
                body: JSON.stringify({
                    input,
                    languageCode: 'en',
                    // locationBias: {
                    //     circle: {
                    //         center: {
                    //             latitude: 40.7128,
                    //             longitude: -74.006,
                    //         },
                    //         radius: 50000,
                    //     },
                    // },
                }),
            }
        )

        const data = await res.json()

        console.log('PLACES AUTOCOMPLETE RAW:', JSON.stringify(data, null, 2))

        if (!res.ok) {
            return NextResponse.json(
                { error: data.error || data },
                { status: res.status }
            )
        }

        const predictions =
            data.suggestions?.map((s) => ({
                place_id: s.placePrediction?.placeId,
                description: s.placePrediction?.text?.text,
            })) || []

        return NextResponse.json({ predictions, response: data })
    } catch (err) {
        console.error('AUTOCOMPLETE ERROR:', err)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}