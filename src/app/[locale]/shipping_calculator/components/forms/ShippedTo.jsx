import React, { useEffect, useState } from 'react'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
    SelectGroup,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/components/ui/command';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { CheckIcon } from 'lucide-react';
import { PopoverClose } from '@radix-ui/react-popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { set } from 'lodash';
import axios from 'axios';



export const ShippedTo = ({ form, country_list }) => {
   
    const [selectedCountry, setSelectedCountry] = useState({
  country_code: '',
  country_name: '',
})

    const handleSelectCountry = (country_code, country_name) => {
        console.log("Selected Country: ", country_code, country_name);
        form.setValue('country_name', country_name);
        setSelectedCountry({ country_code, country_name });

    }

    const [province_list, setProvince] = useState([]);
    const [popProvince, setPopProvince] = useState(false);

   

    const shipping = form.watch("shippingType");

    const country_code = form.watch("shipped_to.country");

const [queryProvince, setQueryProvince] = useState({
  keyword: '',
  country_code: '',
  page: 0,
  limit: 1000,
  index: 0,
})

useEffect(() => {
  // Update country_code hanya saat selectedCountry berubah
  if (!country_code) return;

  setQueryProvince((prev) => ({
    ...prev,
    country_code: country_code,
  }));
}, [country_code]);

useEffect(() => {
  // Fetch data hanya jika country_code sudah ada
  if (!queryProvince.country_code) return;

  const fetchDataProvince = async () => {
    try {
      const response = await axios.post(`/api/province`, queryProvince);
      setProvince(response.data.province);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  fetchDataProvince();
}, [queryProvince]);

    const filteredProvince = province_list

    

    return (
        <div className="flex flex-col">
            {
                shipping === "HFP" || shipping === "CBP" ? (
                    <p className='font-bold text-xs'>Ship To ...</p>
                ) : (
                    <p className='font-bold text-xs'>Ship To ...</p>
                )
            }

            <FormField
                control={form.control}
                name="shipped_to.address"
                className="w-full"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel className="">Address</FormLabel>
                        <FormControl>
                            <Input
                                placeholder="Address"
                                {...field}
                            />
                        </FormControl>
                        <FormMessage className="text-xs" />
                    </FormItem>
                )}
            />
            <div className="py-2 flex flex-col gap-2">
                <div className="flex flex-row gap-2 w-full items-end">
                    <FormField
                        control={form.control}
                        name="shipped_to.country"
                        className="w-full"
                        render={({ field }) => (
                            <FormItem
                                className="w-full"
                            >
                                <FormLabel className="">Country <span className='text-red-600'>*</span></FormLabel>
                                <FormControl>
                                    <Select
                                        className='text-xs'
                                        onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger className='text-xs h-[36px]'>
                                                <SelectValue placeholder="Select Country" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent >
                                            {
                                                country_list?.map((item, index) => (
                                                    <SelectItem
                                                        key={index}
                                                        className="text-xs"
                                                        value={item.country_code}
                                                        onClick={() => handleSelectCountry(item.country_code, item.country_name)}
                                                    >
                                                        {item.country_name}
                                                    </SelectItem>
                                                ))
                                            }

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
  render={({ field }) => (
    <FormItem className="w-full">
      <FormLabel>
        State / Province <span className="text-red-600">*</span>
      </FormLabel>

      <Select
        onValueChange={field.onChange}
        value={field.value}
      >
        <FormControl>
          <SelectTrigger className="h-[36px] text-xs">
            <SelectValue placeholder="Select State / Province" />
          </SelectTrigger>
        </FormControl>

        <SelectContent>
          {filteredProvince?.length > 0 ? (
            filteredProvince.map((item) => (
              <SelectItem
                key={item.province_id}
                value={item.province_name}
                className="text-xs"
              >
                {item.province_name}
              </SelectItem>
            ))
          ) : (
            <div className="text-xs text-center py-2">
              No Province found.
            </div>
          )}
        </SelectContent>
      </Select>

      <FormMessage className="text-xs" />
    </FormItem>
  )}
/>

                </div>
                <div className="flex flex-row gap-2 w-full">
                    <FormField
                        control={form.control}
                        name="shipped_to.city"
                        render={({ field }) => (
                            <FormItem
                                className="w-full"
                            >
                                <FormLabel className="">City <span className='text-red-600'>*</span></FormLabel>
                                <FormControl>
                                    <Input placeholder="City"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage className="text-xs" />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="shipped_to.zip"
                        render={({ field }) => (
                            <FormItem
                                className="w-full"
                            >
                                <FormLabel className="">Zip/Postal Code <span className='text-red-600'>*</span></FormLabel>
                                <FormControl>
                                    <Input placeholder="Zip/Postal Code"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage className="text-xs" />
                            </FormItem>
                        )}
                    />
                </div>
            </div>
        </div>

    )
}
