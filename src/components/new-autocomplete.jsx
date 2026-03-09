import React, { useEffect, useRef, useState } from 'react'

import { useDebounce } from '@/utils/debounce'
import { Input } from './ui/input'

const NewAutocompleteInput = ({
  onSelect,
  value,
  onValueChange,
  variants = 'default',
  className,
  disabled = false,
}) => {
  const [localValue, setLocalValue] = useState(value)
  const [predictions, setPredictions] = useState([])
  const isSelectingRef = useRef(false)
  const isProgrammaticRef = useRef(false)

  const debouncedValue = useDebounce(localValue, 500)

  const variant = {
    default: 'w-full px-2.5 py-3 bg-white text-xs font-normal outline-none',
    singup: 'text-base h-15 px-2 py-2 border border-zinc-200 bg-zinc-200/50 rounded-md w-full',
  }

  // sync dari parent
  useEffect(() => {
    isProgrammaticRef.current = true
    setLocalValue(value)
  }, [value])

  // autocomplete
  useEffect(() => {
    if (isSelectingRef.current) {
      isSelectingRef.current = false
      return
    }

    if (isProgrammaticRef.current) {
      isProgrammaticRef.current = false
      setPredictions([])
      return
    }

    if (!debouncedValue || debouncedValue.length < 3) {
      setPredictions([])
      return
    }

    fetch('/api/places/autocomplete', {
      method: 'POST',
      body: JSON.stringify({ input: debouncedValue }),
    })
      .then(res => res.json())
      .then(data => setPredictions(data.predictions || []))
      .catch(() => setPredictions([]))
  }, [debouncedValue])

  const handleSelect = async prediction => {
    isSelectingRef.current = true
    isProgrammaticRef.current = true

    setPredictions([])

    const res = await fetch('/api/places/details', {
      method: 'POST',
      body: JSON.stringify({ placeId: prediction.place_id }),
    })

    const place = await res.json()
    setLocalValue(place.street1)
    // onValueChange(place.streetAddress)
    // setLocalValue(place.streetAddress)
    onValueChange(place.streetAddress)
    onSelect?.(place)
  }

  return (
    <div className="relative">
      <Input
        size="xs"
        disabled={disabled}
        value={localValue}
        onChange={e => setLocalValue(e.target.value)}
        autoComplete="off"
        type="text"
        className={`${variant[variants]} ${className}`}
        placeholder="Street Address"
      />

      {predictions.length > 0 && (
        <ul className="absolute z-50 w-full bg-white border rounded shadow">
          {predictions.map(p => (
            <li
              key={p.place_id}
              onClick={() => handleSelect(p)}
              className="px-3 py-2 cursor-pointer hover:bg-gray-100 text-xs"
            >
              {p.description}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default NewAutocompleteInput
