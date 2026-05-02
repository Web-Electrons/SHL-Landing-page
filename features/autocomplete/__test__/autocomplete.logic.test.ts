import { describe, expect, it } from "vitest";

import {
  buildAutocompletePayload,
  buildPlaceDetailsPayload,
  mapPlaceResult,
  normalizePredictions,
  shouldFetchPredictions,
} from "../service/autocomplete.logic";

describe("shouldFetchPredictions", () => {
  it("should return false when isSelecting = true", () => {
    expect(
      shouldFetchPredictions({
        debouncedValue: "jakarta",
        isSelecting: true,
        isProgrammatic: false,
      })
    ).toBe(false);
  });

  it("should return false when isProgrammatic = true", () => {
    expect(
      shouldFetchPredictions({
        debouncedValue: "jakarta",
        isSelecting: false,
        isProgrammatic: true,
      })
    ).toBe(false);
  });

  it("should return false when value is empty", () => {
    expect(
      shouldFetchPredictions({
        debouncedValue: "",
        isSelecting: false,
        isProgrammatic: false,
      })
    ).toBe(false);
  });

  it("should return false when length < 3", () => {
    expect(
      shouldFetchPredictions({
        debouncedValue: "ja",
        isSelecting: false,
        isProgrammatic: false,
      })
    ).toBe(false);
  });

  it("should return true when valid input", () => {
    expect(
      shouldFetchPredictions({
        debouncedValue: "jakarta",
        isSelecting: false,
        isProgrammatic: false,
      })
    ).toBe(true);
  });
});

describe("normalizePredictions", () => {
  it("should return empty array when data is null", () => {
    expect(normalizePredictions(null)).toEqual([]);
  });

  it("should return empty array when predictions is not array", () => {
    expect(normalizePredictions({ predictions: null })).toEqual([]);
  });

  it("should return predictions array", () => {
    const data = { predictions: [{ id: 1 }] };
    expect(normalizePredictions(data)).toEqual([{ id: 1 }]);
  });
});

describe("payload builders", () => {
  it("should build autocomplete payload correctly", () => {
    const result = buildAutocompletePayload("jakarta");
    expect(result).toBe(JSON.stringify({ input: "jakarta" }));
  });

  it("should build place details payload correctly", () => {
    const result = buildPlaceDetailsPayload("abc123");
    expect(result).toBe(JSON.stringify({ placeId: "abc123" }));
  });
});

describe("mapPlaceResult", () => {
  it("should map full data correctly", () => {
    const place = {
      street1: "Jl Mawar",
      streetAddress: "Jl Mawar No 10",
    };

    const result = mapPlaceResult(place);

    expect(result).toEqual({
      inputValue: "Jl Mawar",
      fullAddress: "Jl Mawar No 10",
      raw: place,
    });
  });

  it("should handle missing fields", () => {
    const place = {};

    const result = mapPlaceResult(place);

    expect(result.inputValue).toBe("");
    expect(result.fullAddress).toBe("");
    expect(result.raw).toEqual(place);
  });
});
