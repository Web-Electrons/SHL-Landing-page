import { beforeEach, describe, expect, it, vi } from "vitest";
import { fetchPlaceDetails, fetchPredictions } from "../service/autocomplete.service";

global.fetch = vi.fn();

describe("fetchPredictions", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should call API and return normalized predictions", async () => {
    const mockResponse = {
      predictions: [{ description: "Jakarta" }],
    };

    (fetch as any).mockResolvedValue({
      json: async () => mockResponse,
    });

    const result = await fetchPredictions("jakarta");

    expect(fetch).toHaveBeenCalledWith("/api/places/autocomplete", {
      method: "POST",
      body: JSON.stringify({ input: "jakarta" }),
    });

    expect(result).toEqual(mockResponse.predictions);
  });

  it("should return empty array when API fails shape", async () => {
    (fetch as any).mockResolvedValue({
      json: async () => ({ invalid: true }),
    });

    const result = await fetchPredictions("jakarta");

    expect(result).toEqual([]);
  });
});

describe("fetchPlaceDetails", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should call API and return place details", async () => {
    const mockPlace = {
      street1: "Jl A",
      streetAddress: "Jl A No 1",
    };

    (fetch as any).mockResolvedValue({
      json: async () => mockPlace,
    });

    const result = await fetchPlaceDetails("place123");

    expect(fetch).toHaveBeenCalledWith("/api/places/details", {
      method: "POST",
      body: JSON.stringify({ placeId: "place123" }),
    });

    expect(result).toEqual(mockPlace);
  });
});
