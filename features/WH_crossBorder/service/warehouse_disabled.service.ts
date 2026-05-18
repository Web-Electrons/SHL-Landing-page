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

export const isWarehouseDestinationDisabled = (warehouse: WarehouseItem, whDestinationCrossBorder: string): boolean => {
  if (!warehouse.status) {
    return true;
  }

  if (isCrossBorderWarehouse(warehouse.warehouse_code)) {
    return false;
  }

  // Warehouse country harus sesuai tujuan crossborder
  if (warehouse.country_code !== whDestinationCrossBorder) {
    return true;
  }

  const isCrossBorderServiceEnabled = warehouse.warehouse_crossborder_service?.toLowerCase() === "active";

  const isDestinationEnabled = warehouse.crossborder_destination === true;

  // aktif jika salah satu aktif
  return !(isCrossBorderServiceEnabled || isDestinationEnabled);
};
