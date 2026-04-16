import { useToast } from "@/components/ui/use-toast";
import { useCallback } from "react";

import { WAREHOUSE_DESTINATION_BY_COUNTRY } from "../constants/services";
import {
  calculateCBF,
  calculateCBP,
  calculateForward,
  calculateHFP,
  calculateShippingRates,
} from "../services/shipping.api";
import { findEmptyRequiredAddressFields } from "../services/shipping.helpers";
import type { CourierRate, ShippingFormValues } from "../types/shipping.types";
import { useShippingStore } from "./useshipping.store";

export const useShippingRates = () => {
  const { toast } = useToast();
  const store = useShippingStore();

  // ─── Helpers ───────────────────────────────────────────────────────────────

  const buildParcel = (dimension: ShippingFormValues["dimension"]) => ({
    weight: dimension.weight,
    mass_unit: dimension.weight_unit,
    length: dimension.length,
    width: dimension.width,
    height: dimension.height,
    distance_unit: dimension.dimension_unit,
  });

  const showError = (description: string) => toast({ title: "Error", description, variant: "destructive" });

  const showValidationError = (description: string) =>
    toast({ title: "Oops! Please check the form", description, variant: "destructive" });

  // ─── Validate Destination Address ─────────────────────────────────────────

  const validateDestinationAddress = (shippedTo: ShippingFormValues["shipped_to"]): boolean => {
    const emptyFields = findEmptyRequiredAddressFields(shippedTo as Record<string, string>);
    if (emptyFields.length > 0) {
      showValidationError(`Field "${emptyFields[0][0]}" in address destination is required.`);
      return false;
    }
    return true;
  };

  // ─── Validate Dimension Fields ────────────────────────────────────────────

  const validateDimension = (dimension: ShippingFormValues["dimension"]): boolean => {
    const hasMissing = Object.values(dimension).some((v) => v === undefined || v === null);
    if (hasMissing) {
      showValidationError("Some required dimension fields are missing.");
      return false;
    }
    return true;
  };

  // ─── Calculate Standard Shipping Rates ───────────────────────────────────

  const calculateRates = useCallback(
    async (formData: ShippingFormValues): Promise<CourierRate[] | null> => {
      if (formData.total_package_value <= 0) {
        showValidationError("Please input total declare value.");
        return null;
      }

      if (!validateDestinationAddress(formData.shipped_to)) return null;

      store.setIsLoadingRates(true);
      try {
        const result = await calculateShippingRates({
          warehouse_id: store.warehouseId,
          warehouse_id_destination: store.warehouseDestinationId || undefined,
          addressFrom: {
            country: formData.shipped_from.country ?? "",
            state: formData.shipped_from.state ?? "",
            city: formData.shipped_from.city ?? "",
            zip: formData.shipped_from.zip ?? "",
            street1: formData.shipped_from.address ?? "",
            street2: formData.shipped_from.address2,
          },
          addressTo: {
            name: "Shiplink",
            country: formData.shipped_to.country,
            state: formData.shipped_to.state,
            city: formData.shipped_to.city,
            zip: formData.shipped_to.zip,
            street1: formData.shipped_to.address,
            street2: formData.shipped_to.address2,
          },
          parcels: buildParcel(formData.dimension),
          total_package_value: Number(formData.total_package_value) || 0,
          currency_package_value: formData.currency_package_value,
        });

        if (result.status) {
          toast({ title: "Success", description: result.message });
          const rates = result.rates?.rates ?? [];
          store.setCourierRates(rates);
          return rates;
        } else {
          showError(result.message);
          return null;
        }
      } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error";
        showError(message);
        return null;
      } finally {
        store.setIsLoadingRates(false);
      }
    },
    [store, toast]
  );

  // ─── Hold For Pickup ──────────────────────────────────────────────────────

  const calculateHoldForPickup = useCallback(
    async (formData: ShippingFormValues): Promise<boolean> => {
      if (!validateDimension(formData.dimension)) return false;

      store.setIsLoadingRates(true);
      try {
        const result = await calculateHFP({
          warehouse_id: store.warehouseId,
          parcels: buildParcel(formData.dimension),
        });

        if (result.status === true) {
          store.setSummaryData({ status: result.status, message: result.message, data: result });
          store.setOpenServicesOption(true);
          return true;
        }
        return false;
      } catch (error) {
        console.error("[useShippingRates] HFP error:", error);
        return false;
      } finally {
        store.setIsLoadingRates(false);
      }
    },
    [store]
  );

  // ─── Cross Border Pickup ──────────────────────────────────────────────────

  const calculateCrossBorderPickup = useCallback(
    async (formData: ShippingFormValues): Promise<boolean> => {
      if (!validateDimension(formData.dimension)) return false;
      if (!formData.warehouse_destination) {
        showValidationError("Please select a warehouse destination.");
        return false;
      }

      store.setIsLoadingRates(true);
      try {
        const result = await calculateCBP({
          warehouse_id: store.warehouseId,
          warehouse_id_destination: formData.warehouse_destination,
          broker: "use shiplink broker",
          parcels: buildParcel(formData.dimension),
          currency_package_value: formData.currency_package_value,
          total_package_value: Number(formData.total_package_value) || 0,
        });

        if (result.status === true) {
          store.setSummaryData({ status: result.status, message: result.message, data: result });
          store.setOpenServicesOption(true);
          return true;
        } else {
          showError(result.message);
          return false;
        }
      } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error";
        showError(message);
        return false;
      } finally {
        store.setIsLoadingRates(false);
      }
    },
    [store, toast]
  );

  // ─── Cross Border Forward ─────────────────────────────────────────────────

  const calculateCrossBorderForward = useCallback(
    async (
      formData: ShippingFormValues,
      selectedRate: { amountLocal?: number; currencyLocal?: string } | null
    ): Promise<boolean> => {
      const destinationWarehouse = WAREHOUSE_DESTINATION_BY_COUNTRY[formData.shipped_to.country] ?? "";

      store.setIsLoadingRates(true);
      try {
        const result = await calculateCBF({
          warehouse_id: store.warehouseId,
          warehouse_id_destination: destinationWarehouse,
          broker: "use shiplink broker",
          amountLocal: selectedRate?.amountLocal,
          currencyLocal: selectedRate?.currencyLocal,
          addressTo: {
            name: "Shiplink",
            country: formData.shipped_to.country,
            state: formData.shipped_to.state,
            city: formData.shipped_to.city,
            zip: formData.shipped_to.zip,
            street1: formData.shipped_to.address,
            street2: formData.shipped_to.address2,
          },
          parcels: buildParcel(formData.dimension),
          total_package_value: selectedRate?.amountLocal,
          currency_package_value: selectedRate?.currencyLocal,
        });

        if (result.status === true) {
          store.setSummaryData({ status: result.status, message: result.message, data: result });
          store.setOpenSummary(true);
          store.setOpenServicesOption(true);
          return true;
        } else {
          showError(result.message);
          return false;
        }
      } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error";
        showError(message);
        return false;
      } finally {
        store.setIsLoadingRates(false);
      }
    },
    [store, toast]
  );

  // ─── Direct Forward ───────────────────────────────────────────────────────

  const calculateDirectForward = useCallback(
    async (
      formData: ShippingFormValues,
      selectedRate: { amountLocal?: number; currencyLocal?: string } | null
    ): Promise<boolean> => {
      store.setIsLoadingRates(true);
      try {
        const result = await calculateForward({
          warehouse_id: store.warehouseId,
          broker: "",
          amountLocal: selectedRate?.amountLocal,
          currencyLocal: selectedRate?.currencyLocal,
          parcels: buildParcel(formData.dimension),
          addressTo: {
            name: formData.shipped_to.name ?? "",
            country: formData.shipped_to.country,
            state: formData.shipped_to.state,
            city: formData.shipped_to.city,
            zip: formData.shipped_to.zip,
            street1: formData.shipped_to.address,
            street2: formData.shipped_to.address2,
          },
        });

        if (result.status === true) {
          store.setSummaryData({ status: result.status, message: result.message, data: result });
          store.setOpenSummary(true);
          store.setOpenServicesOption(true);
          return true;
        } else {
          showError(result.message);
          return false;
        }
      } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error";
        showError(message);
        return false;
      } finally {
        store.setIsLoadingRates(false);
      }
    },
    [store, toast]
  );

  return {
    calculateRates,
    calculateHoldForPickup,
    calculateCrossBorderPickup,
    calculateCrossBorderForward,
    calculateDirectForward,
  };
};
