'use client'

import { Skeleton } from '@/components/ui/skeleton'
import { FormField, FormItem, FormLabel, FormControl } from '@/components/ui/form'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import { checkCoutryCode } from '@/lib/utils'



export function WarehouseDestinationField({
  form,
  warehouse,
  loadingWarehouse,
  handleWarehouseDestination,
  selectedDataDestination,
}) {
  return (
    <FormField
      control={form.control}
      name="warehouse_destination"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="font-bold">Warehouse Destination</FormLabel>
          <FormControl>
            <Select
              value={field.value}
              onValueChange={(val) => {
                field.onChange(val)
                handleWarehouseDestination(val)
              }}
            >
              <SelectTrigger className="text-xs h-[36px]">
                <SelectValue placeholder="Select Warehouse Destination">
                  {loadingWarehouse && !field.value ? (
                    <Skeleton className="w-full h-[20px]" />
                  ) : (
                    <div className="flex flex-row gap-2 items-center">
                      {field.value && (
                        <img
                          src={`https://flagcdn.com/h80/${checkCoutryCode(
                            form.watch('warehouse_destination_country')
                          )}.jpg`}
                          alt=""
                          className="rounded-full w-6 h-6 border border-blue-50 object-cover"
                        />
                      )}
                      <p>
                        {selectedDataDestination?.() || 'Select Warehouse Destination'}
                      </p>
                    </div>
                  )}
                </SelectValue>
              </SelectTrigger>
              <SelectContent id="warehouse_destination_select">
                {loadingWarehouse ? (
                  <Skeleton className="w-full h-[20px]" />
                ) : (
                  warehouse?.map((item) => (
                    <SelectItem
                      key={item?.warehouse_code}
                      value={item?.warehouse_code}
                      className="text-xs"
                      disabled={form.watch('shipped_from.country') === item?.country_code}
                    >
                      {`${item?.city}, ${item?.province_code}, ${item?.postal_code}, ${item?.country_code}`}
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
          </FormControl>
        </FormItem>
      )}
    />
  )
}
