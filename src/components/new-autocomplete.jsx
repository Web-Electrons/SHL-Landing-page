import { useEffect, useRef, useState } from "react";

import { mapPlaceResult, shouldFetchPredictions } from "@/features/autocomplete/service/autocomplete.logic";
import { fetchPlaceDetails, fetchPredictions } from "@/features/autocomplete/service/autocomplete.service";
import { useDebounce } from "../utils/debounce";
import { Input } from "./ui/input";

const NewAutocompleteInput = ({
  onSelect,
  value,
  onValueChange,
  variants = "default",
  className,
  disabled = false,
}) => {
  const [localValue, setLocalValue] = useState(value);
  const [predictions, setPredictions] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const isSelectingRef = useRef(false);
  const isProgrammaticRef = useRef(false);
  const containerRef = useRef(null);

  const debouncedValue = useDebounce(localValue, 500);

  const variant = {
    default: "w-full px-2.5 py-3 bg-white text-xs font-normal outline-none",
    singup: "text-base h-15 px-2 py-2 border border-zinc-200 bg-zinc-200/50 rounded-md w-full",
  };

  // sync with parent
  useEffect(() => {
    if (value !== localValue) {
      isProgrammaticRef.current = true;
      setLocalValue(value);
    }
  }, [value, localValue]);

  // autocomplete logic
  useEffect(() => {
    if (!isFocused) return;
    const shouldFetch = shouldFetchPredictions({
      debouncedValue,
      isSelecting: isSelectingRef.current,
      isProgrammatic: isProgrammaticRef.current,
    });

    if (!shouldFetch) {
      isSelectingRef.current = false;
      isProgrammaticRef.current = false;
      setPredictions([]);
      return;
    }

    fetchPredictions(debouncedValue)
      .then(setPredictions)
      .catch(() => setPredictions([]));
  }, [debouncedValue, isFocused]);

  // select handler
  const handleSelect = async (prediction) => {
    isSelectingRef.current = true;
    isProgrammaticRef.current = true;

    setPredictions([]);

    const place = await fetchPlaceDetails(prediction.place_id);
    const mapped = mapPlaceResult(place);

    setLocalValue(mapped.inputValue);
    onValueChange(mapped.fullAddress);
    onSelect?.(mapped.raw);
  };

  //  click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setPredictions([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={containerRef}>
      <Input
        size="xs"
        disabled={disabled}
        value={localValue}
        onFocus={() => setIsFocused(true)}
        onChange={(e) => {
          const val = e.target.value;
          setLocalValue(val);
          onValueChange?.(val);
        }}
        autoComplete="off"
        type="text"
        className={`${variant[variants]} ${className}`}
        placeholder="Street Address"
      />

      {isFocused && predictions.length > 0 && (
        <ul className="absolute z-50 w-full rounded border bg-white shadow">
          {predictions.map((p) => (
            <li
              key={p.place_id}
              onClick={() => handleSelect(p)}
              className="cursor-pointer px-3 py-2 text-xs hover:bg-gray-100"
            >
              {p.description}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NewAutocompleteInput;
