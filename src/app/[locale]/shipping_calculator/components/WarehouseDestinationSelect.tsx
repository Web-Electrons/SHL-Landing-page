/* eslint-disable @next/next/no-img-element */
import { FormControl, FormLabel } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { formatWarehouseLabel, getFlagUrl } from "@/features/shipping_calculator/services/shipping.helpers";
import type { ShippingFormValues } from "@/features/shipping_calculator/types/shipping.types";
import type { Warehouse } from "@/types/warehouse.types";
import { UseFormReturn } from "react-hook-form";

interface WarehouseDestinationSelectProps {
  form: UseFormReturn<ShippingFormValues>;
  warehouse: Warehouse[];
  isLoading: boolean;
  getLabel: () => string;
  onChange: (warehouseCode: string) => void;
}

export const WarehouseDestinationSelect = ({
  form,
  warehouse,
  isLoading,
  getLabel,
  onChange,
}: WarehouseDestinationSelectProps) => {
  const label = getLabel();
  const destinationCountry = form.watch("warehouse_destination_country");
  const originCountry = form.watch("shipped_from.country");

  return (
    <>
      <FormLabel className="font-bold">Warehouse Destination</FormLabel>
      <FormControl className="w-full">
        <Select onValueChange={onChange}>
          <FormControl>
            <SelectTrigger name="warehouse_destination" id="warehouse_destination" className="h-[36px] text-xs">
              <SelectValue placeholder="Select Warehouse Destination">
                {isLoading ? (
                  <Skeleton className="h-[20px] w-full" />
                ) : (
                  <div className="flex flex-row items-center gap-2">
                    {label !== "Select Warehouse Destination" && (
                      <img
                        src={getFlagUrl(destinationCountry)}
                        srcSet={`${getFlagUrl(destinationCountry)} 2x`}
                        alt=""
                        className="h-6 w-6 rounded-full border border-blue-50 object-cover object-center"
                      />
                    )}
                    <p>{label}</p>
                  </div>
                )}
              </SelectValue>
            </SelectTrigger>
          </FormControl>

          <SelectContent id="warehouse_destination_select">
            {isLoading ? (
              <Skeleton className="h-[20px] w-full" />
            ) : (
              warehouse.map((item, index) => (
                <SelectItem
                  key={index}
                  className="text-xs"
                  value={item.warehouse_code}
                  id={item.warehouse_code}
                  // disable warehouses in same country as origin
                  disabled={originCountry === item.country_code}
                >
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
