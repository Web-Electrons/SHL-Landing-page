import { NextResponse } from 'next/server'

export async function POST(req) {
    const { placeId } = await req.json()

    const res = await fetch(
        `https://places.googleapis.com/v1/places/${placeId}`,
        {
            headers: {
                'X-Goog-Api-Key': process.env.DEV_GOOGLE_PLACES_KEY,
                'X-Goog-FieldMask': 'addressComponents',
            },
        }
    )


    const place = await res.json()

    const pick = type =>
        place.addressComponents?.find(c =>
            c.types.includes(type)
        )

    // Street line 1
    const street1 = `${pick('street_number')?.longText || ''} ${pick('route')?.longText || ''
        }`.trim()

    // OBS 1517 : Street line 2 (Opt)
    const street2Parts = [
        pick('subpremise')?.longText, // Apt / Unit
        pick('premise')?.longText,    // Building
        pick('floor')?.longText,
        pick('room')?.longText,
    ].filter(Boolean)

    const street2 = street2Parts.join(', ') || ''
    return NextResponse.json({
        street1,
        street2,
        city:
            pick('locality')?.longText ||
            pick('administrative_area_level_2')?.longText ||
            '',
        state: pick('administrative_area_level_1')?.longText || '',
        state_code:
            pick('administrative_area_level_1')?.shortText || '',
        country: pick('country')?.longText || '',
        country_code: pick('country')?.shortText || '',
        zip: pick('postal_code')?.longText || '',
        data: place
    })
}