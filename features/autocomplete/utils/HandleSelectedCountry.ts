// import { Country } from '@/hooks/useCountryList'

export type Country = {
  country_id: number;
  country_name: string;
  country_code: string; // ISO3
  alpha_2: string; // ISO2
};

export const handleSelectedCountry = async ({
  iso2,
  countries_list,
  country_name,
}: {
  iso2?: string;
  country_name?: string;
  countries_list?: Country[];
}): Promise<Country | null> => {
  try {
    if (!countries_list?.length) return null;

    let selectedCountry: Country | undefined;

    // 🔹 Match by ISO2
    if (iso2) {
      selectedCountry = countries_list.find((item) => item.alpha_2?.toLowerCase() === iso2.toLowerCase());
    }

    // 🔹 Fallback match by name
    if (!selectedCountry && country_name) {
      selectedCountry = countries_list.find((item) => item.country_name?.toLowerCase() === country_name.toLowerCase());
    }

    if (!selectedCountry) {
      console.warn("Country not found:", { iso2, country_name });
      return null;
    }

    return selectedCountry;
  } catch (error) {
    console.error("handleSelectedCountry error:", error);
    return null;
  }
};
