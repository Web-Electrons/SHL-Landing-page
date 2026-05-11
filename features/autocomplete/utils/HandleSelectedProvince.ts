import { normalizeProvinceName } from "@/lib/normalizeProvinceName";

export type Province = {
  province_id: number;
  province_name: string;
  province_code: string;
};

export const handleSelectedProvince = async ({
  provinces,
  iso3,
  provinceName,
  provinceCode,
}: {
  provinces: Province[];
  iso3: string;
  provinceName?: string;
  provinceCode?: string;
}): Promise<Province | null> => {
  try {
    if (!provinces?.length) return null;

    let selected: Province | undefined;

    const shouldMatchByName = iso3 === "FRA" || (provinceCode && provinceCode.length > 3);

    // 🔹 Match by name
    if (shouldMatchByName && provinceName) {
      selected = provinces.find((p) => normalizeProvinceName(p.province_name) === normalizeProvinceName(provinceName));
    }

    // 🔹 Match by code
    if (!selected && provinceCode && provinceCode.length <= 3) {
      selected = provinces.find((p) => p.province_code?.toLowerCase() === provinceCode.toLowerCase());
    }

    if (!selected) {
      console.warn("Province not found:", {
        iso3,
        provinceName,
        provinceCode,
      });
      return null;
    }

    return selected;
  } catch (error) {
    console.error("handleSelectedProvince error:", error);
    return null;
  }
};
