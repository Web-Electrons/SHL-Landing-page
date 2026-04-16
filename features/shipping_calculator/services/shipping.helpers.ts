// ─── Country / Flag Helpers ───────────────────────────────────────────────────

/**
 * Normalizes a country code to a 2-letter lowercase ISO code
 * suitable for use with flagcdn.com.
 */
export const toFlagCode = (code: string | undefined): string => {
  if (!code) return "ca";
  if (code === "MEX") return "mx";
  if (code.length >= 2) return code.substring(0, 2).toLowerCase();
  return code.toLowerCase();
};

/**
 * Returns the flagcdn.com URL for a given country code.
 */
export const getFlagUrl = (code: string | undefined): string => `https://flagcdn.com/h80/${toFlagCode(code)}.jpg`;

// ─── Currency Formatting ──────────────────────────────────────────────────────

/**
 * Formats a numeric value as a currency string.
 * Falls back to USD if currency is not valid.
 */
export const formatCurrency = (value: number, currency: string): string => {
  try {
    return new Intl.NumberFormat("en-ID", {
      style: "currency",
      currency,
      minimumIntegerDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  } catch {
    return `${currency} ${value.toFixed(2)}`;
  }
};

// ─── Address Formatting ───────────────────────────────────────────────────────

/**
 * Returns a human-readable summary of warehouse location info.
 */
export const formatWarehouseLabel = (warehouse: {
  city: string;
  province_code: string;
  postal_code: string;
  country_code: string;
}): string => `${warehouse.city}, ${warehouse.province_code}, ${warehouse.postal_code}, ${warehouse.country_code}`;

// ─── Form Validation Helpers ──────────────────────────────────────────────────

/** Fields in shipped_to that are NOT required */
export const OPTIONAL_ADDRESS_FIELDS = ["name", "address2", "email", "phone"] as const;

/**
 * Returns an array of [key, value] pairs for required fields that are empty.
 */
export const findEmptyRequiredAddressFields = (
  addressTo: Record<string, string | undefined | null>
): [string, string | undefined | null][] =>
  Object.entries(addressTo).filter(
    ([key, value]) =>
      !(OPTIONAL_ADDRESS_FIELDS as readonly string[]).includes(key) &&
      (value === "" || value === null || value === undefined || String(value).trim() === "")
  );

// ─── Sorting Helpers ──────────────────────────────────────────────────────────

export type RateSortMode = "cheapest" | "fastest";

/**
 * Sorts courier rates by amount (cheapest first) or estimatedDays (fastest first).
 */
export const sortRates = <T extends { amount: number; estimatedDays: number }>(rates: T[], mode: RateSortMode): T[] => {
  const copy = [...rates];
  return mode === "fastest"
    ? copy.sort((a, b) => a.estimatedDays - b.estimatedDays)
    : copy.sort((a, b) => a.amount - b.amount);
};

// ─── Deduplication ────────────────────────────────────────────────────────────

/**
 * Removes duplicate items from an array based on a key selector.
 */
export const deduplicateBy = <T>(items: T[], keySelector: (item: T) => string): T[] => {
  const seen = new Set<string>();
  return items.filter((item) => {
    const key = keySelector(item);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
};
