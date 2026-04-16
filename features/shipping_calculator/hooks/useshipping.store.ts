import { Warehouse } from "@/types/warehouse.types";
import { create } from "zustand";
import type { CourierRate, ShippingServiceKey, SummaryData } from "../types/shipping.types";

interface ShippingCalculatorState {
  // ─── UI State ──────────────────────────────────────────────────────────────
  isLoadingRates: boolean;
  isLoadingWarehouse: boolean;
  isLoadingService: boolean;
  isFormDisabled: boolean;
  showRates: boolean;
  openServicesOption: boolean;
  openRatesOption: boolean;
  openSummary: boolean;

  // ─── Data State ────────────────────────────────────────────────────────────
  warehouse: Warehouse[];
  courierRates: CourierRate[];
  summaryData: SummaryData | null;
  selectedRate: CourierRate | null;
  selectedService: ShippingServiceKey;

  // ─── Warehouse Selection ───────────────────────────────────────────────────
  warehouseId: string;
  warehouseDestinationId: string;
  warehouseCountry: string;
  warehouseFrom: Warehouse | null;
  warehouseDestination: Warehouse | null;

  // ─── Actions ───────────────────────────────────────────────────────────────
  setIsLoadingRates: (loading: boolean) => void;
  setIsLoadingWarehouse: (loading: boolean) => void;
  setIsLoadingService: (loading: boolean) => void;
  setIsFormDisabled: (disabled: boolean) => void;
  setShowRates: (show: boolean) => void;
  setOpenServicesOption: (open: boolean) => void;
  setOpenRatesOption: (open: boolean) => void;
  setOpenSummary: (open: boolean) => void;
  setWarehouse: (warehouse: Warehouse[]) => void;
  setCourierRates: (rates: CourierRate[]) => void;
  setSummaryData: (data: SummaryData | null) => void;
  setSelectedRate: (rate: CourierRate | null) => void;
  setSelectedService: (service: ShippingServiceKey) => void;
  setWarehouseId: (id: string) => void;
  setWarehouseDestinationId: (id: string) => void;
  setWarehouseCountry: (country: string) => void;
  setWarehouseFrom: (warehouse: Warehouse | null) => void;
  setWarehouseDestination: (warehouse: Warehouse | null) => void;

  reset: () => void;
}

const initialState = {
  isLoadingRates: false,
  isLoadingWarehouse: false,
  isLoadingService: false,
  isFormDisabled: false,
  showRates: false,
  openServicesOption: false,
  openRatesOption: false,
  openSummary: false,
  warehouse: [],
  courierRates: [],
  summaryData: null,
  selectedRate: null,
  selectedService: "hfp" as ShippingServiceKey,
  warehouseId: "",
  warehouseDestinationId: "",
  warehouseCountry: "",
  warehouseFrom: null,
  warehouseDestination: null,
};

export const useShippingStore = create<ShippingCalculatorState>((set) => ({
  ...initialState,

  setIsLoadingRates: (loading) => set({ isLoadingRates: loading }),
  setIsLoadingWarehouse: (loading) => set({ isLoadingWarehouse: loading }),
  setIsLoadingService: (loading) => set({ isLoadingService: loading }),
  setIsFormDisabled: (disabled) => set({ isFormDisabled: disabled }),
  setShowRates: (show) => set({ showRates: show }),
  setOpenServicesOption: (open) => set({ openServicesOption: open }),
  setOpenRatesOption: (open) => set({ openRatesOption: open }),
  setOpenSummary: (open) => set({ openSummary: open }),
  setWarehouse: (warehouse) => set({ warehouse }),
  setCourierRates: (rates) => set({ courierRates: rates }),
  setSummaryData: (data) => set({ summaryData: data }),
  setSelectedRate: (rate) => set({ selectedRate: rate }),
  setSelectedService: (service) => set({ selectedService: service }),
  setWarehouseId: (id) => set({ warehouseId: id }),
  setWarehouseDestinationId: (id) => set({ warehouseDestinationId: id }),
  setWarehouseCountry: (country) => set({ warehouseCountry: country }),
  setWarehouseFrom: (warehouse) => set({ warehouseFrom: warehouse }),
  setWarehouseDestination: (warehouse) => set({ warehouseDestination: warehouse }),
  reset: () => set(initialState),
}));
