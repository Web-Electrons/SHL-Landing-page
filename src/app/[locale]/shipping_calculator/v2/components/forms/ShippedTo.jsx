import React from 'react'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/src/components/ui/form';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
    SelectGroup,
} from '@/src/components/ui/select';
import { Input } from '@/src/components/ui/input';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/src/components/ui/command';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/src/components/ui/popover';
import { CheckIcon } from 'lucide-react';
import { PopoverClose } from '@radix-ui/react-popover';
import { ScrollArea } from '@/src/components/ui/scroll-area';
import { Button } from '@/src/components/ui/button';

export const ShippedTo = ({ form, country_list }) => {
    console.log("🚀 ~ ShippedTo ~ country_list:", country_list)

    const handleSelectCountry = (country_code, country_name) => {
        form.setValue('country_code', country_code);
        form.setValue('country_name', country_name);
    }

    const [popOverOpen, setPopOverOpen] = React.useState(false);

    const shipping = form.watch("shippingType");
    return (
        <div className="flex flex-col">
            {
                shipping === "HFP" || shipping === "CBP" ? (
                    <p className='font-bold text-xs'>Reshipped From ...</p>
                ) : (
                    <p className='font-bold text-xs'>Reshipped to ...</p>
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
                    </FormItem>
                )}
            />
            <div className="py-2 flex flex-col gap-2">
                <div className="flex flex-row gap-2 w-full">
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
                                                    >
                                                        {item.country_name}
                                                    </SelectItem>
                                                ))
                                            }

                                        </SelectContent>
                                    </Select>
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="shipped_to.state"
                        className="w-full"
                        render={({ field }) => (
                            <FormItem
                                className="w-full"
                            >
                                <FormLabel className="">State / Province <span className='text-red-600'>*</span></FormLabel>
                                <FormControl>
                                    <Input placeholder="State"
                                        {...field}
                                    />
                                </FormControl>
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
                            </FormItem>
                        )}
                    />
                </div>
            </div>
        </div>

    )
}
