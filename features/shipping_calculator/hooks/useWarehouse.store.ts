import { Warehouse } from "@/types/warehouse.types";
import { useCallback, useEffect } from "react";
import { UseFormReturn } from "react-hook-form";
import { DEFAULT_WAREHOUSE_CODES, EXCLUDED_WAREHOUSE_CODES } from "../constants/services";
import { fetchWarehouseList } from "../services/shipping.api";
import type { ShippingFormValues } from "../types/shipping.types";
import { useShippingStore } from "./useshipping.store";

interface UseWarehouseOptions {
  form: UseFormReturn<ShippingFormValues>;
}

export const useWarehouse = ({ form }: UseWarehouseOptions) => {
  const {
    setWarehouse,
    setWarehouseFrom,
    setWarehouseId,
    setWarehouseCountry,
    setIsLoadingWarehouse,
    warehouseId,
    warehouse,
  } = useShippingStore();

  /** Populate form fields from a selected warehouse object */
  const assignWarehouseToForm = useCallback(
    (data: Warehouse) => {
      form.setValue("shipped_from.country", data.country_code);
      form.setValue("shipped_from.state", data.province_code);
      form.setValue("shipped_from.city", data.city);
      form.setValue("shipped_from.zip", data.postal_code);
      form.setValue("shipped_from.address", data.address);
      form.setValue("shipped_from.address2", data.address2 ?? "");
      form.setValue("shipped_from.warehouse_code", data.warehouse_code);
    },
    [form]
  );

  /** Load warehouse list and set defaults */
  const loadWarehouseList = useCallback(async () => {
    setIsLoadingWarehouse(true);
    try {
      const data = await fetchWarehouseList();

      const filtered = data.filter(
        (item) => !EXCLUDED_WAREHOUSE_CODES.includes(item.warehouse_code as (typeof EXCLUDED_WAREHOUSE_CODES)[number])
      );

      const defaultWarehouse =
        filtered.find((item) =>
          DEFAULT_WAREHOUSE_CODES.includes(item.warehouse_code as (typeof DEFAULT_WAREHOUSE_CODES)[number])
        ) ?? filtered[0];

      setWarehouse(filtered);

      if (defaultWarehouse) {
        assignWarehouseToForm(defaultWarehouse);
        setWarehouseId(defaultWarehouse.warehouse_id);
        setWarehouseCountry(defaultWarehouse.country_code);
        setWarehouseFrom(defaultWarehouse);
      }

      return filtered;
    } catch (error) {
      console.error("[useWarehouse] Failed to load warehouse list:", error);
      return [];
    } finally {
      setIsLoadingWarehouse(false);
    }
  }, [assignWarehouseToForm, setIsLoadingWarehouse, setWarehouse, setWarehouseCountry, setWarehouseId]);

  /** Handle user selecting a mailbox (warehouse origin) */
  const handleWarehouseChange = useCallback(
    (warehouseCode: string) => {
      const selected = warehouse.find((item) => item.warehouse_code === warehouseCode);
      if (!selected) return;
      assignWarehouseToForm(selected);
      setWarehouseId(selected.warehouse_id);
      setWarehouseCountry(selected.country_code);
    },

    [warehouse, assignWarehouseToForm, setWarehouseId, setWarehouseCountry]
  );

  /** Handle user selecting a warehouse destination */
  const handleWarehouseDestinationChange = useCallback(
    (warehouseCode: string) => {
      const { setWarehouseDestinationId } = useShippingStore.getState();
      const selected = warehouse.find((item) => item.warehouse_code === warehouseCode);
      if (!selected) return;
      setWarehouseDestinationId(selected.warehouse_id);
      form.setValue("warehouse_destination", selected.warehouse_id);
      form.setValue("warehouse_destination_country", selected.country_code);
    },
    [warehouse, form]
  );

  useEffect(() => {
    loadWarehouseList();
  }, [loadWarehouseList]);

  return {
    loadWarehouseList,
    assignWarehouseToForm,
    handleWarehouseChange,
    handleWarehouseDestinationChange,
  };
};
