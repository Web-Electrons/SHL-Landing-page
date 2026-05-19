import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Info } from "lucide-react";
import React from "react";
import { PhoneInput } from "react-international-phone";
import { Textarea } from "@/components/ui/textarea";
import "react-international-phone/style.css";
import "./style.css";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/src/components/ui/tooltip";

const HazardousMaterialDetails = ({ form }) => {
  const {
    data: hazardousPackageGroupData = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["hazardousPackageGroupData"],
    queryFn: async () => {
      const res = await axios.get("/api/admin/shipping/list_hazardous_package_group");
      return res.data.data;
    },
    staleTime: 1000 * 60 * 60,
    cacheTime: 1000 * 60 * 60 * 2,
  });
  return (
    <div className="mt-2 flex flex-col gap-2">
      <div className="grid grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="package_attributes.pack_group_number"
          render={({ field }) => (
            <FormItem className="w-full space-y-1">
              <FormLabel className="flex flex-row gap-2 text-xs">
                Pack Group{" "}
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="h-3 w-3 cursor-pointer text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent side="top">
                      <div className="max-w-xs text-xs">
                        <p className="mb-2">
                          A packing group is a classification defined by the level of danger presented by a hazardous
                          material that is being packaged for shipment.
                        </p>

                        <ul className="list-disc space-y-1 pl-4">
                          <li>
                            <strong>Packing Group I (PG I)</strong> – High danger
                          </li>
                          <li>
                            <strong>Packing Group II (PG II)</strong> – Medium danger
                          </li>
                          <li>
                            <strong>Packing Group III (PG III)</strong> – Low danger
                          </li>
                        </ul>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </FormLabel>
              <Select value={field.value} onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger className="h-[30px] w-full text-xs">
                    <SelectValue placeholder="Select Pack Group" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {isLoading && <div className="p-2 text-xs text-gray-500">Loading...</div>}
                  {hazardousPackageGroupData?.map((item, index) => (
                    <SelectItem key={item.id} value={item.pg_code} className="text-xs">
                      ({item.hazard_level}) {item.description}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="package_attributes.emergency_contact_company"
          render={({ field }) => (
            <FormItem className="w-full space-y-1">
              <FormLabel className="flex flex-row gap-2 text-xs">
                Emergency Contact{" "}
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="h-3 w-3 cursor-pointer text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent side="top">
                      <p className="max-w-xs text-xs">
                        <b>Company:</b> Enter the Emergency contact company name for any hazardous product spills or
                        exposure incidents (could be a 3rd Party if the shipper has a contract with another company as
                        the Hazmat response team) <br /> <b>Phone:</b> Enter the Emergency contact company phone number
                        for any hazardous product spills or exposure incidents (could be a 3rd Party phone number if the
                        shipper has a contract with another company as the Hazmat response team) Company
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </FormLabel>
              <FormControl>
                <Input
                  type="text"
                  className="h-[30px] w-full text-xs"
                  placeholder="Emergency Contact Company"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="package_attributes.emergency_contact_phone"
          render={({ field }) => (
            <FormItem className="w-full space-y-1">
              <FormLabel className="text-xs">Phone Number</FormLabel>
              <FormControl>
                {/* Wrapper border custom */}
                <div className="flex h-[30px] w-full items-center rounded border border-slate-300">
                  <PhoneInput
                    country="us" // default country
                    value={field.value}
                    onChange={(phone) => {
                      console.log("🚀 ~ phone:", phone);
                      form.setValue("emergency_contact_phone", phone, {
                        shouldValidate: true,
                        shouldDirty: true,
                      });
                    }}
                    enableSearch
                    disableDropdown={false}
                    inputProps={{
                      name: "phone",
                      required: true,
                      autoFocus: false,
                      className: "flex-1 h-9 px-2 text-xs bg-transparent placeholder:text-zinc-400 focus:outline-none",
                      placeholder: "+1 123 456 7890",
                    }}
                    countrySelectorStyleProps={{
                      style: {
                        background: "transparent",
                        border: "none",
                        boxShadow: "none",
                        outline: "none",
                        padding: 0,
                        margin: 0,
                      },
                      buttonStyle: {
                        background: "transparent",
                        border: "none",
                        boxShadow: "none",
                        outline: "none",
                        padding: 0,
                        margin: 0,
                      },
                      dropdownStyleProps: {
                        className: "phone-dropdown",
                      },
                    }}
                  />
                </div>
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="package_attributes.hazmat_class"
          render={({ field }) => (
            <FormItem className="w-full space-y-1">
              <FormLabel className="flex flex-row gap-2 text-xs">
                Hazmat Class{" "}
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="h-3 w-3 cursor-pointer text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent side="top">
                      <div className="max-w-xs text-xs">
                        <p className="mb-2">
                          There are 9 classes of Hazardous Materials as outlined by the Federal Motor Carrier Safety
                          Administration. Most classes have divisions, so please select the correct Class + Division for
                          your product.
                        </p>

                        <ul className="list-disc space-y-1 pl-4">
                          <li>
                            <strong>Class 1:</strong> Explosives
                          </li>
                          <li>
                            <strong>Class 2:</strong> Gases
                          </li>
                          <li>
                            <strong>Class 3:</strong> Flammable and Combustible Liquids
                          </li>
                          <li>
                            <strong>Class 4:</strong> Flammable Solids
                          </li>
                          <li>
                            <strong>Class 5:</strong> Oxidizing Substances and Organic Peroxides
                          </li>
                          <li>
                            <strong>Class 6:</strong> Toxic and Infectious Substances
                          </li>
                          <li>
                            <strong>Class 7:</strong> Radioactive Materials
                          </li>
                          <li>
                            <strong>Class 8:</strong> Corrosives
                          </li>
                          <li>
                            <strong>Class 9:</strong> Miscellaneous Hazardous Materials
                          </li>
                        </ul>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </FormLabel>
              <FormControl>
                <Input
                  type="text"
                  className="h-[30px] w-full text-xs"
                  placeholder="Select UN number to get hazmat class"
                  disabled
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="package_attributes.contract_number"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel className="flex flex-row gap-2 text-xs">
                Contract{" "}
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="h-3 w-3 cursor-pointer text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent side="top">
                      <div className="max-w-xs text-xs">
                        <p className="mb-2">
                          If you have a contract with a 3rd party chemical spill emergency response and/or incident
                          management company, you can include that contract number here.
                        </p>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </FormLabel>
              <FormControl>
                <Input type="text" className="h-[30px] w-full text-xs" placeholder="" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="package_attributes.instructions"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel className="flex flex-row gap-2 text-xs">
                Instructions{" "}
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="h-3 w-3 cursor-pointer text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent side="top">
                      <div className="max-w-xs text-xs">
                        <p className="mb-2">
                          Include all Hazmat shipping, handling, certification, etc. instructions here.
                        </p>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </FormLabel>
              <FormControl>
                <Input type="text" className="h-[30px] w-full text-xs" placeholder="" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default HazardousMaterialDetails;
