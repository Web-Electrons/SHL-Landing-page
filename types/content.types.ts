export interface PackageContent {
  id: string;
  tracking_id: string | null;
  qty: number;
  value: number;
  desc: string;
  hs_desc: string | null;
  hs_code: string | null;
  made_in: string | null;
  currency: string;
  subtotal: number;
}
