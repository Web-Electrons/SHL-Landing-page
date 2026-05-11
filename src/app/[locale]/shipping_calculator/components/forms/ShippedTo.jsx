import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import NewAutocompleteInput from "@/components/new-autocomplete";
import { processSelectedAddress } from "@/features/autocomplete/utils/processSelectedAddress";
import { useToast } from "@/src/components/ui/use-toast";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import "./style.css";

export const ShippedTo = ({ form, country_list }) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const [stateCode, setStateCode] = React.useState("");
  console.log("wahch form", form.watch("shipped_to"));

  const shipping = form.watch("shippingType");

  const country_code = form.watch("shipped_to.country");

  const { data: province_list = [], isFetching: isProvinceFetching } = useQuery({
    queryKey: ["province", country_code],
    enabled: !!country_code,
    staleTime: 1000 * 60 * 60,
    queryFn: async () => {
      const response = await axios.post("/api/province", {
        keyword: "",
        alpha_2: country_code,
        page: 0,
        limit: 1000,
        index: 0,
      });
      return response.data.province;
    },
  });

  const handleSelectedAddress = async (countryName, iso2, province, provinceCode) => {
    const data = await processSelectedAddress({
      iso2,
      countryName,
      province,
      provinceCode,
      country_list: country_list,
      queryClient,
    });
    console.log("data", data);

    const alpha_2 = data?.country?.alpha_2;
    form.setValue("shipped_to.country", alpha_2 || "");

    setStateCode(data?.province?.province_code);
    if (alpha_2) {
      form.setValue("shipped_to.state", data?.province?.province_code || "");
    }

    if (data?.status === "error") {
      console.warn("Province fetch failed:", data.error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch and set Province. Please Select Manually.",
      });
      form.setValue("shipped_to.state", "");
      form.setValue("shipped_to.country", "");
      form.setError("shipped_to.country", {
        message: "Please Select Country Manually",
      });
      form.setError("shipped_to.state", {
        message: "Please Select Province Manually",
      });
    }
  };

  /**
   * ISSUE !!!
   * IMPORTANT !
   *
   * > component Select State/Province mengubah State dari form !
   * > bug ini tidak dapat di ikuti alurnya, tapi bisa di coba menghilangkan useEffect dari state form
   * >
   */
  // ISSUE > Select Mengubah State, dari state awal seetelah autocomplete select state : NY dan mencoba lagi Autoselect ke country lain form state terisi di inital awal sa
  console.log(
    "province_list length:",
    province_list?.length,
    "isFetching:",
    isProvinceFetching,
    "state value:",
    form.getValues("shipped_to.state")
  );

  return (
    <div className="flex flex-col">
      {shipping === "HFP" || shipping === "CBP" ? (
        <p className="text-xs font-bold">Ship To ...</p>
      ) : (
        <p className="text-xs font-bold">Ship To ...</p>
      )}

      <FormField
        control={form.control}
        name="shipped_to.address"
        className="w-full"
        render={({ field }) => (
          <FormItem className="mt-2 flex w-full flex-col gap-1 space-y-0">
            <FormLabel className="">Address</FormLabel>
            <FormControl>
              <NewAutocompleteInput
                className="inline-flex h-[35px] items-center justify-start gap-2.5 bg-white px-2.5 py-3 font-['Poppins'] text-xs font-normal leading-tight outline-none"
                placeholder={`Address`}
                autoComplete="off"
                autoFill="off"
                onSelect={(place) => {
                  console.log("PLACE:", place);

                  form.setValue("shipped_to.address", place.street1);
                  form.setValue("shipped_to.city", place.city);
                  form.setValue("shipped_to.zip", place.zip);
                  // form.setValue("shipped_to.state", place.state_code);
                  // form.setValue("shipped_to.country", place.country_code);
                  form.setValue("country_name", place.country);

                  // handleCountryChange(place.country_code, place.state_code);
                  handleSelectedAddress(place.country, place.country_code, place.state, place.state_code);
                }}
                onValueChange={(e) => {
                  form.setValue("shipped_to.address", e);
                }}
                {...field}
              />
            </FormControl>
            <FormMessage className="text-xs" />
          </FormItem>
        )}
      />
      <div className="flex flex-col gap-2 py-2">
        <div className="flex w-full flex-row items-end gap-2">
          <FormField
            control={form.control}
            name="shipped_to.country"
            className="w-full"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="">
                  Country <span className="text-red-600">*</span>
                </FormLabel>
                <FormControl>
                  <Select
                    value={field.value}
                    onValueChange={(value) => {
                      field.onChange(value);
                    }}
                  >
                    <SelectTrigger className="h-[36px] text-xs">
                      <SelectValue placeholder="Select Country" />
                    </SelectTrigger>

                    <SelectContent>
                      {country_list?.map((item, index) => (
                        <SelectItem
                          key={`country-${index}-${item?.country_id}`}
                          value={item.alpha_2}
                          className="text-xs"
                        >
                          {item.country_name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="shipped_to.state"
            render={({ field }) => {
              const selectValue = field.value ?? "";
              return (
                <FormItem className="w-full">
                  <FormLabel>
                    State / Province <span className="text-red-600">*</span>
                  </FormLabel>

                  <Select
                    onValueChange={field.onChange}
                    value={selectValue} // selalu string, tidak pernah undefined
                  >
                    <FormControl>
                      <SelectTrigger className="h-[36px] text-xs">
                        <SelectValue placeholder={isProvinceFetching ? "Loading..." : "Select State / Province"} />
                      </SelectTrigger>
                    </FormControl>

                    <SelectContent>
                      {isProvinceFetching ? (
                        <div className="py-2 text-center text-xs">Loading...</div>
                      ) : province_list?.length > 0 ? (
                        province_list.map((item, index) => (
                          <SelectItem
                            key={`${item.province_id}-${index}`}
                            value={item.province_code}
                            className="text-xs"
                          >
                            {item.province_name}
                          </SelectItem>
                        ))
                      ) : (
                        <div className="py-2 text-center text-xs">No Province found.</div>
                      )}
                    </SelectContent>
                  </Select>

                  <FormMessage className="text-xs" />
                </FormItem>
              );
            }}
          />
        </div>
        <div className="flex w-full flex-row gap-2">
          <FormField
            control={form.control}
            name="shipped_to.city"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="">
                  City <span className="text-red-600">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="City" {...field} />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="shipped_to.zip"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="">
                  Zip/Postal Code <span className="text-red-600">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="Zip/Postal Code" {...field} />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="shipped_to.phone"
          className="w-full"
          render={({ field }) => (
            <FormItem className="mt-2 flex w-full flex-col gap-1 space-y-0">
              <FormLabel className="">Phone Number</FormLabel>
              <FormControl>
                <div className="flex w-full items-center rounded-md border border-zinc-300">
                  <PhoneInput
                    country="us" // default country
                    value={field.value}
                    onChange={(phone) => field.onChange(phone)} // biarkan library handle '+'
                    enableSearch
                    disableDropdown={false}
                    className="h-[35px] w-full"
                    inputProps={{
                      name: "phone",
                      required: true,
                      autoFocus: false,
                      className:
                        "flex-1 h-[35px] px-3 text-sm bg-transparent placeholder:text-zinc-400 focus:outline-none w-full",
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
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};
