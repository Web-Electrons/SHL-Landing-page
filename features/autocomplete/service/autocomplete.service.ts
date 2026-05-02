import { buildAutocompletePayload, buildPlaceDetailsPayload, normalizePredictions } from "./autocomplete.logic";

export const fetchPredictions = async (input: string) => {
  const res = await fetch("/api/places/autocomplete", {
    method: "POST",
    body: buildAutocompletePayload(input),
  });

  const data = await res.json();
  return normalizePredictions(data);
};

export const fetchPlaceDetails = async (placeId: string) => {
  const res = await fetch("/api/places/details", {
    method: "POST",
    body: buildPlaceDetailsPayload(placeId),
  });

  return res.json();
};
