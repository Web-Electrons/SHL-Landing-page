// ─── Domain Types ─────────────────────────────────────────────────────────────

import { Address } from "@/types/address.types";
import { PackageContent } from "@/types/content.types";

export interface Country {
  country_code: string;
  country_name: string;
}

export interface Parcel {
  weight: number;
  mass_unit: WeightUnit;
  length: number;
  width: number;
  height: number;
  distance_unit: DimensionUnit;
}

export interface CourierRate {
  id: string;
  carrier: string;
  service_name: string;
  amount: number;
  amountLocal: number;
  currencyLocal: string;
  currency: string;
  estimatedDays: number;
}

export interface ServiceItem {
  service: string;
  status: string;
  description?: string;
  service_id?: string;
}

export interface SummaryData {
  status: boolean;
  message: string;
  data: Record<string, unknown>;
}

// ─── Form Types ───────────────────────────────────────────────────────────────

export type WeightUnit = "lbs" | "kg" | "oz" | "g";
export type DimensionUnit = "in" | "cm" | "m" | "ft";
export type ShippingServiceKey = "hfp" | "cbp" | "cbf" | "forward";

export interface DimensionFormValues {
  length: number;
  width: number;
  height: number;
  weight: number;
  weight_unit: WeightUnit;
  dimension_unit: DimensionUnit;
}

export interface ShippedFromFormValues {
  country?: string;
  state?: string;
  city?: string;
  zip?: string;
  address?: string;
  address2?: string;
  warehouse_code?: string;
}

export interface ShippedToFormValues {
  name?: string;
  country: string;
  state: string;
  city: string;
  zip: string;
  address: string;
  address2?: string;
  email?: string;
  phone?: string;
}

export interface ShippingFormValues {
  dimension: DimensionFormValues;
  shipped_from: ShippedFromFormValues;
  shipped_to: ShippedToFormValues;
  shippingType: string;
  warehouse_destination: string;
  warehouse_destination_country: string;
  mailboxSelected: string;
  package_content: PackageContent[];
  total_package_value: number;
  currency_package_value: string;
}

// ─── API Request / Response Types ────────────────────────────────────────────

export interface ShippingCalculationRequest {
  warehouse_id: string;
  warehouse_id_destination?: string;
  addressFrom: Address;
  addressTo: Address;
  parcels: Parcel;
  total_package_value: number;
  currency_package_value: string;
}

export interface HFPCalculationRequest {
  warehouse_id: string;
  parcels: Parcel;
}

export interface CBPCalculationRequest {
  warehouse_id: string;
  warehouse_id_destination: string;
  broker: string;
  parcels: Parcel;
  currency_package_value: string;
  total_package_value: number;
}

export interface CBFCalculationRequest {
  warehouse_id: string;
  warehouse_id_destination: string;
  broker: string;
  amountLocal?: number;
  currencyLocal?: string;
  addressTo: Address;
  parcels: Parcel;
  total_package_value?: number;
  currency_package_value?: string;
}

export interface ForwardCalculationRequest {
  warehouse_id: string;
  broker: string;
  amountLocal?: number;
  currencyLocal?: string;
  parcels: Parcel;
  addressTo: Address;
}

export interface CalculationApiResponse<T = unknown> {
  status: boolean;
  message: string;
  rates?: { rates: CourierRate[] };
  data?: T;
}
