import { Checkbox } from "@/components/ui/checkbox";
import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Info } from "lucide-react";
import React from "react";

const HazardousMaterial = ({ form }) => {
  const {
    data: hazmatClassData = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["hazmatClassData"],
    queryFn: async () => {
      const res = await axios.get("/api/admin/shipping/list_hazmat_class");
      return res.data.data;
    },
    staleTime: 1000 * 60 * 60,
    cacheTime: 1000 * 60 * 60 * 2,
  });

  return (
    <div className="mt-4 flex flex-col items-start justify-center gap-2">
      <FormField
        control={form.control}
        name="package_attributes.reportable_qty"
        render={({ field }) => (
          <FormItem className="flex items-center space-x-2">
            <FormControl>
              <Checkbox checked={!!field.value} onCheckedChange={field.onChange} />
            </FormControl>
            <FormLabel className="!mt-0 text-xs">Reportable Quantity</FormLabel>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="package_attributes.un_id"
        render={({ field }) => (
          <FormItem className="w-full space-y-1">
            <FormLabel className="flex flex-row gap-2 text-xs">
              UN Number{" "}
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-3 w-3 cursor-pointer text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent side="top">
                    <p className="max-w-xs text-xs">
                      UN numbers (or UN IDs) are four-digit numbers ranging from 0004-3534 that identify dangerous goods
                      or hazardous substances — such as explosives, flammable liquids, or toxic substances. Radioactive
                      material is not allowed.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </FormLabel>
            <Select
              value={field.value?.toString()}
              onValueChange={(value) => {
                const selected = hazmatClassData?.find((item) => item.id.toString() === value);

                if (selected) {
                  // ✅ simpan UN number ke form
                  form.setValue("un_number", selected.un_number, {
                    shouldValidate: true,
                  });

                  form.setValue("hazmat_class", selected.hazmat_class, {
                    shouldValidate: true,
                  });

                  // kalau kamu mau simpan id juga
                  field.onChange(value);
                }
              }}
            >
              <FormControl>
                <SelectTrigger className="h-[30px] w-full text-xs">
                  <SelectValue placeholder="Select Hazmat Class" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {isLoading && <div className="p-2 text-xs text-gray-500">Loading...</div>}
                {hazmatClassData?.map((item, index) => (
                  <SelectItem key={item.id} value={item.id.toString()} className="text-xs">
                    ({item.un_number}) {item.description}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormItem>
        )}
      />
    </div>
  );
};

export default HazardousMaterial;
