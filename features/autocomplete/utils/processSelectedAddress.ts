import axios from "axios";
import { handleSelectedCountry } from "./HandleSelectedCountry";
import { handleSelectedProvince } from "./HandleSelectedProvince";

export const processSelectedAddress = async ({
  iso2,
  countryName,
  province,
  provinceCode,
  country_list,
  queryClient,
}: {
  iso2: string;
  countryName: string;
  province?: string;
  provinceCode?: string;
  country_list: any[];
  queryClient: any;
}) => {
  try {
    const getCountry = await handleSelectedCountry({
      iso2,
      countries_list: country_list,
      country_name: countryName,
    });

    if (!getCountry) {
      throw new Error(`Country ${countryName} not found`);
    }

    if (!province && !provinceCode) {
      return { status: "success", country: getCountry, province: null };
    }

    const province_list = await queryClient.ensureQueryData({
      queryKey: ["province", getCountry.alpha_2],
      queryFn: async () => {
        const { data } = await axios.post("/api/province", {
          //   country_code: getCountry.country_code,
          alpha_2: getCountry.alpha_2,
        });
        return data?.province || [];
      },
      staleTime: 1000 * 60 * 60,
    });

    const getProvince = await handleSelectedProvince({
      provinces: province_list,
      iso3: getCountry.country_code,
      provinceName: province,
      provinceCode,
    });

    if (!getProvince) {
      console.warn("Province not found:", { province, provinceCode });
    }

    return { status: "success", country: getCountry, province: getProvince };
  } catch (error) {
    console.error("Error processing selected address:", error);
    return {
      status: "error",
      country: { country_name: countryName, country_code: iso2 },
      province: null,
      error: error?.message || "Unknown error",
    };
  }
};
