/* eslint-disable @next/next/no-img-element */
import { FormControl, FormLabel } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { formatWarehouseLabel, getFlagUrl } from "@/features/shipping_calculator/services/shipping.helpers";
import type { ShippingFormValues } from "@/features/shipping_calculator/types/shipping.types";
import type { Warehouse } from "@/types/warehouse.types";
import { UseFormReturn } from "react-hook-form";

interface MailboxSelectProps {
  form: UseFormReturn<ShippingFormValues>;
  warehouse: Warehouse[];
  isLoading: boolean;
  getLabel: () => string;
  onChange: (warehouseCode: string) => void;
}

export const MailboxSelect = ({ form, warehouse, isLoading, getLabel, onChange }: MailboxSelectProps) => {
  const countryCode = form.getValues("shipped_from.country");

  return (
    <>
      <FormLabel className="font-bold">
        Select Your Mailbox <span className="text-red-600">*</span>
      </FormLabel>
      <FormControl className="w-full">
        <Select value={form.getValues("shipped_from.warehouse_code")} onValueChange={onChange}>
          <FormControl>
            <SelectTrigger name="mailboxSelected" id="mailboxSelected" className="h-[36px] text-xs">
              <SelectValue placeholder="Select Mailbox">
                {isLoading ? (
                  <Skeleton className="h-[20px] w-full" />
                ) : (
                  <div className="flex flex-row items-center gap-2">
                    <img
                      src={getFlagUrl(countryCode)}
                      srcSet={`${getFlagUrl(countryCode)} 2x`}
                      alt=""
                      className="h-6 w-6 rounded-full border border-blue-50 object-cover object-center"
                    />
                    <p>{getLabel()}</p>
                  </div>
                )}
              </SelectValue>
            </SelectTrigger>
          </FormControl>

          <SelectContent id="warehouseContentSelect">
            {isLoading ? (
              <Skeleton className="h-[20px] w-full" />
            ) : (
              warehouse.map((item, index) => (
                <SelectItem key={index} className="text-xs" value={item.warehouse_code} id={item.warehouse_code}>
                  {formatWarehouseLabel(item)}
                </SelectItem>
              ))
            )}
          </SelectContent>
        </Select>
      </FormControl>
    </>
  );
};
