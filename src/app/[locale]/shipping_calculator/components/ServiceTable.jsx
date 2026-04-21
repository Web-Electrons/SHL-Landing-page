/* eslint-disable @next/next/no-img-element */
"use client";
import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/tableDashboard";
export const ServiceTable = ({
  serviceList,
  otherService,
  warehouse,
  form,
  selectedData,
  handleValueChange,
  checkCoutryCode,
  loadingService,
  newServiceList,
}) => {
  const formatCurrency = (value = 0, currency) => {
    return new Intl.NumberFormat("en-ID", {
      style: "currency",
      currency: currency || "USD",
      minimumIntegerDigits: 1,
      maximumFractionDigits: 2,
    }).format(value);
  };

  return (
    <div className="space-y-3">
      <div className="">
        <FormField
          control={form.control}
          name="mailboxSelected"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="font-bold">
                Select Your Mailbox <span className="text-red-600">*</span>
              </FormLabel>
              <FormControl className="w-full">
                <Select
                  className="text-xs"
                  // onValueChange={handleValueChange(field.value)}
                  onValueChange={(value) => handleValueChange(value)}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="h-[36px] text-xs">
                      <SelectValue placeholder="Select Mailbox">
                        <div className="flex flex-row items-center gap-2">
                          <img
                            // src={`https://flagcdn.com/w640/ca.png`}
                            src={`https://flagcdn.com/h80/${checkCoutryCode(form.watch("shipped_from.country"))}.jpg`}
                            srcSet={`https://flagcdn.com/h80/${checkCoutryCode(form.watch("shipped_from.country"))}.jpg 2x`}
                            alt=""
                            className="h-6 w-6 rounded-full border border-blue-50 object-cover object-center"
                          />
                          {/* <p>- {field.value}</p> */}
                          <p>{selectedData()}</p>
                        </div>
                      </SelectValue>
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {warehouse?.map((item, index) => (
                      <SelectItem key={index} className="text-xs" value={item?.warehouse_code}>
                        {`${item?.city}, ${item?.province_code}, ${item?.postal_code}, ${item?.country_code}`}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
            </FormItem>
          )}
        />
      </div>
      <div className="pb-2">
        <div className="mb-[10px] flex flex-row justify-between">
          <p className="text-sm font-bold text-black">Package Services</p>
        </div>

        <Table>
          <TableHeader>
            <TableRow className="border-none bg-white text-black hover:bg-slate-100">
              <TableHead className="w-[300px] text-xs text-black">Service</TableHead>
              <TableHead className="text-xs text-black">Description</TableHead>
              <TableHead className="text-right text-xs text-black">Fee</TableHead>
            </TableRow>
          </TableHeader>
          {/* <TableBody>
                        {
                            serviceList??.map((item, index) => (
                                <TableRow
                                    className="border-none"
                                    key={index}>
                                    <TableCell className="font-medium text-xs border-x-0">{item.service}</TableCell>
                                    <TableCell className="text-xs border-x-0">
                                        {item.description}
                                    </TableCell>
                                    <TableCell className="text-right text-xs border-x-0  tabular-nums">{formatCurrency(item.price, item.currency)}</TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody> */}
          <TableBody>
            {loadingService ? (
              <TableRow className="border-none">
                {Array.from({ length: 3 }).map((_, index) => (
                  <TableCell key={index} className="animate-pulse border-x-0">
                    <Skeleton className="h-4 w-20" />
                  </TableCell>
                ))}
              </TableRow>
            ) : newServiceList?.wwarehouse_service?.length > 0 ? (
              newServiceList.wwarehouse_service.map((item, index) => (
                <TableRow className="border-none" key={`${item.id}-${index}`}>
                  <TableCell className="text-nowrap border-x-0 text-xs font-medium">{item.service}</TableCell>

                  <TableCell className="border-x-0 text-xs">{item.description}</TableCell>

                  <TableCell className="border-x-0 text-right text-xs tabular-nums">
                    {/* {item.price === 0
                                                    ? "Free"
                                                    : formatCurrency(item.price, item.currency)} */}
                    {formatCurrency(item.price, item.currency)}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow className="border-none">
                <TableCell className="border-x-0 text-center text-xs" colSpan={3}>
                  No data found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="space-y-4">
        {loadingService ? (
          <div className="space-y-2">
            {Array.from({ length: 1 }).map((_, i) => (
              <Skeleton key={i} className="h-[20px] w-full" />
            ))}
          </div>
        ) : newServiceList?.other_service?.length > 0 ? (
          newServiceList.other_service.map((group) => (
            <div key={group.idconf} className="">
              {/* 🔹 Title per Subservice */}
              <div className="mb-[10px] flex flex-row justify-between">
                <p className="text-sm font-bold text-black">{group.subservice}</p>
              </div>

              {/* 🔹 Table per Subservice */}
              <Table>
                <TableHeader>
                  <TableRow className="border-none bg-white text-black hover:bg-slate-100">
                    <TableHead className="w-[300px] text-xs text-black">Service</TableHead>
                    <TableHead className="text-xs text-black">Description</TableHead>
                    <TableHead className="text-right text-xs text-black">Fee</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {group.services
                    ?.filter((item) => item.status === "Active") // 🔥 filter disini
                    .map((item, index) => (
                      <TableRow key={`${item.id}-${index}`} className="border-none">
                        <TableCell className="text-nowrap border-x-0 text-xs font-medium">{item.service}</TableCell>

                        <TableCell className="border-x-0 text-xs">{item.description}</TableCell>

                        <TableCell className="border-x-0 text-right text-xs tabular-nums">
                          {formatCurrency(item.price, item.currency)}
                          {/* {item.service?.toLowerCase().includes("brokerage") &&
                                                        
                                                            item.price === 0
                                                            ? "Contact us"
                                                            : formatCurrency(item.price, item.currency)} */}
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </div>
          ))
        ) : (
          <div className="text-center text-xs text-gray-500">No data found</div>
        )}
      </div>
    </div>
  );
};
