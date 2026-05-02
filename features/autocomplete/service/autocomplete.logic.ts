export const shouldFetchPredictions = ({
  debouncedValue,
  isSelecting,
  isProgrammatic,
}: {
  debouncedValue: string;
  isSelecting: boolean;
  isProgrammatic: boolean;
}) => {
  if (isSelecting) return false;
  if (isProgrammatic) return false;
  if (!debouncedValue || debouncedValue.length < 3) return false;

  return true;
};

export const normalizePredictions = (data: any) => {
  if (!data || !Array.isArray(data.predictions)) return [];
  return data.predictions;
};

export const buildAutocompletePayload = (input: string) => {
  return JSON.stringify({ input });
};

export const buildPlaceDetailsPayload = (placeId: string) => {
  return JSON.stringify({ placeId });
};

export const mapPlaceResult = (place: any) => {
  return {
    inputValue: place?.street1 || "",
    fullAddress: place?.streetAddress || "",
    raw: place,
  };
};
