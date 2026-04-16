// ─── Service Name Constants ───────────────────────────────────────────────────

export const SERVICE_NAMES = {
  HOLD_FOR_PICKUP: "Hold for Pickup",
  CROSS_BORDER_PICKUP: "Cross Border Pickup",
  CROSS_BORDER_FORWARD: "Cross Border Forward",
  FORWARD_PACKAGE: "Forward Package",
  CONSOLIDATE: "Consolidate",
  REQUEST_MORE_PICTURE: "Request More Picture",
  PACKAGE_RECEPTION_US: "Package Reception US",
  PACKAGE_RECEPTION_CA: "Package Reception CA",
  FREE_MEMBERSHIP: "Free Membership",
  CANCEL_CONSOLIDATE: "Cancel Consolidate",
  CARRIER_RATE: "Carrier Rate",
  BROKERAGE_CA: "Brokerage fee - CA import",
  BROKERAGE_US: "Brokerage fee - US import",
} as const;

// Services replaced from main list by warehouse-specific services
export const SERVICES_TO_REPLACE: string[] = [
  SERVICE_NAMES.FORWARD_PACKAGE,
  SERVICE_NAMES.CONSOLIDATE,
  SERVICE_NAMES.REQUEST_MORE_PICTURE,
  SERVICE_NAMES.PACKAGE_RECEPTION_US,
  SERVICE_NAMES.PACKAGE_RECEPTION_CA,
  SERVICE_NAMES.FREE_MEMBERSHIP,
  SERVICE_NAMES.CANCEL_CONSOLIDATE,
];

// Services categorized as package-handling services
export const PACKAGE_SERVICES: string[] = [
  SERVICE_NAMES.HOLD_FOR_PICKUP,
  SERVICE_NAMES.CROSS_BORDER_PICKUP,
  SERVICE_NAMES.CROSS_BORDER_FORWARD,
  SERVICE_NAMES.FORWARD_PACKAGE,
  SERVICE_NAMES.PACKAGE_RECEPTION_US,
  SERVICE_NAMES.PACKAGE_RECEPTION_CA,
];

// Human-readable descriptions keyed by service name
export const SERVICE_DESCRIPTIONS: Record<string, string> = {
  [SERVICE_NAMES.HOLD_FOR_PICKUP]: "Pick up your package in person from a warehouse location.",
  [SERVICE_NAMES.CANCEL_CONSOLIDATE]: "Cancel the package consolidation process.",
  [SERVICE_NAMES.CROSS_BORDER_PICKUP]: "We import your package and you pickup in person from a local warehouse.",
  [SERVICE_NAMES.CROSS_BORDER_FORWARD]:
    "We import your package and forward it domestically to your final destination with the carrier you select.",
  [SERVICE_NAMES.FORWARD_PACKAGE]:
    "Internationally directly to the address of your choice with the carrier you select.",
  [SERVICE_NAMES.CONSOLIDATE]: "Combine multiple packages into one package.",
  [SERVICE_NAMES.REQUEST_MORE_PICTURE]: "Request additional photos of your package.",
  [SERVICE_NAMES.PACKAGE_RECEPTION_US]: "Receive your package at our US warehouse.",
  [SERVICE_NAMES.PACKAGE_RECEPTION_CA]: "Receive your package at our CA warehouse.",
  [SERVICE_NAMES.CARRIER_RATE]: "Check carrier rates for your package.",
  [SERVICE_NAMES.BROKERAGE_CA]: "Brokerage service for package with value over $20 CAD.",
  [SERVICE_NAMES.BROKERAGE_US]: "Brokerage service for package with value over $800 USD.",
  [SERVICE_NAMES.FREE_MEMBERSHIP]: "Enjoy free membership benefits.",
};

// Warehouse codes to exclude from selector
export const EXCLUDED_WAREHOUSE_CODES = ["AAA", "BBB"] as const;

// Default warehouse preferences (checked in order)
export const DEFAULT_WAREHOUSE_CODES = ["SHN", "CDM"] as const;

// Country code mappings for warehouses used in cross-border forward
export const WAREHOUSE_DESTINATION_BY_COUNTRY: Record<string, string> = {
  USA: "KM9",
  CAN: "AAA",
};

// Shipping service tab identifiers
export const SHIPPING_SERVICE_KEYS = {
  HFP: "hfp",
  CBP: "cbp",
  CBF: "cbf",
  FORWARD: "forward",
} as const;

// Tab names used in the calculator
export const TAB_NAMES = {
  MAILBOX: "mailbox",
  CUSTOM: "custom",
  PRICE_LIST: "priceList",
} as const;
