import { Warehouse } from "@/types/warehouse.types";
import axios from "axios";
import type {
  CalculationApiResponse,
  CBFCalculationRequest,
  CBPCalculationRequest,
  Country,
  ForwardCalculationRequest,
  HFPCalculationRequest,
  ServiceItem,
  ShippingCalculationRequest,
} from "../types/shipping.types";

// ─── Warehouse ─────────────────────────────────────────────────────────────

export const fetchWarehouseList = async (): Promise<Warehouse[]> => {
  const response = await axios.post<{ warehouse: Warehouse[] }>("/api/warehouse/list", {
    keyword: "",
    page: 1,
    limit: 999,
    index: 0,
  });
  return response.data.warehouse;
};

export const fetchWarehouseServiceList = async (warehouse_id: string): Promise<ServiceItem[]> => {
  const response = await axios.post<{ data: ServiceItem[] }>("/api/public/WarehouseServices_list", {
    warehouse_id,
  });
  return response.data.data;
};

// ─── Country ───────────────────────────────────────────────────────────────

export const fetchCountryList = async (): Promise<Country[]> => {
  const response = await axios.post<{ country: Country[] }>("/api/country/list", {
    keyword: "",
    page: 1,
    limit: 999,
    index: 0,
  });
  return response.data.country;
};

// ─── Service List ──────────────────────────────────────────────────────────

export const fetchMainServiceList = async (): Promise<ServiceItem[]> => {
  const response = await axios.get<{ data: ServiceItem[] }>("/api/Service_list");
  return response.data.data;
};

// ─── Shipping Calculations ─────────────────────────────────────────────────

export const calculateShippingRates = async (payload: ShippingCalculationRequest): Promise<CalculationApiResponse> => {
  const response = await axios.post<CalculationApiResponse>("/api/Calculator/ShippingCalculation", payload);
  return response.data;
};

export const calculateHFP = async (payload: HFPCalculationRequest): Promise<CalculationApiResponse> => {
  const response = await axios.post<CalculationApiResponse>("/api/Calculator/HoldPickup_Calculation", payload);
  return response.data;
};

export const calculateCBP = async (payload: CBPCalculationRequest): Promise<CalculationApiResponse> => {
  const response = await axios.post<CalculationApiResponse>("/api/Calculator/CrossBorderPickup_Calculation", payload);
  return response.data;
};

export const calculateCBF = async (payload: CBFCalculationRequest): Promise<CalculationApiResponse> => {
  const response = await axios.post<CalculationApiResponse>("/api/Calculator/CrossBorderForward_Calculation", payload);
  return response.data;
};

export const calculateForward = async (payload: ForwardCalculationRequest): Promise<CalculationApiResponse> => {
  const response = await axios.post<CalculationApiResponse>("/api/Calculator/Forward_Calculation", payload);
  return response.data;
};
