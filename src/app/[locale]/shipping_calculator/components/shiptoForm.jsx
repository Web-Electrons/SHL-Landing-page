import React from 'react'
import { Input } from '@/components/ui/input';
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
} from '@/components/ui/select';

export const ShiptoForm = ({ form, country_list }) => {
    return (
        <div className="flex flex-col">
            <p className='font-bold text-xs'>Reshipped From ...</p>
            <FormField
                control={form.control}
                name="shipped_from.address"
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
                <div className="flex flex-row gap-2 w-full">
                    <FormField
                        control={form.control}
                        name="shipped_from.country"
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
                                            <SelectTrigger
                                                data-testid="country-select-trigger"
                                                name="shipped_from.country"
                                                id="shipped_from.country"
                                                className='text-xs h-[36px]'
                                            >
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
                        name="shipped_from.state"
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
                                <FormMessage className="text-xs" />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="flex flex-row gap-2 w-full">
                    <FormField
                        control={form.control}
                        name="shipped_from.city"
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
                        name="shipped_from.zip"
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
