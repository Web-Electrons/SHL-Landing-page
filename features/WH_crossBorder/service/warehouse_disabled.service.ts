export interface WarehouseItem {
  warehouse_code: string;
  warehouse_crossborder_service?: string | null;
  status: boolean;
  country_code: string;
  crossborder_destination: boolean;
}

const CROSS_BORDER_CODES = ["AAA", "BBB"];

export const isCrossBorderWarehouse = (warehouseCode: string): boolean => {
  return CROSS_BORDER_CODES.includes(warehouseCode);
};

export const isWarehouseDisabled = (warehouse: WarehouseItem): boolean => {
  // Global warehouse status
  if (!warehouse.status) {
    return true;
  }

  // Cross border warehouse selalu enabled
  if (isCrossBorderWarehouse(warehouse.warehouse_code)) {
    return false;
  }

  return warehouse.warehouse_crossborder_service !== "active";
};
export const isWarehouseDestinationDisabled = (
  warehouse: WarehouseItem,
  originCountryCode: string,
  warehouseCode: string
): boolean => {
  // inactive warehouse
  if (!warehouse.status) {
    return true;
  }

  // prevent same origin & destination
  if (warehouse.warehouse_code === warehouseCode) {
    return true;
  }

  // special warehouse always enabled
  if (isCrossBorderWarehouse(warehouse.warehouse_code)) {
    return false;
  }

  // determine opposite country
  let allowedCountry: string | null = null;

  if (originCountryCode === "US") {
    allowedCountry = "CA";
  } else if (originCountryCode === "CA") {
    allowedCountry = "US";
  }

  // if origin US/CA -> only opposite country allowed
  if (allowedCountry && warehouse.country_code !== allowedCountry) {
    return true;
  }

  const isCrossBorderServiceEnabled = warehouse.warehouse_crossborder_service?.toLowerCase() === "active";

  const isDestinationEnabled = warehouse.crossborder_destination === true;

  return !(isCrossBorderServiceEnabled || isDestinationEnabled);
};
