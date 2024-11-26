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
} from '@/src/components/ui/select';
import { Input } from '@/src/components/ui/input';
export const Dimension = ({ form }) => {
    return (
        <>
            <div className="flex flex-row gap-2 items-end">
                <FormField
                    control={form.control}
                    name="dimension.weight"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="font-bold">Package Weight <span className='text-red-600'>*</span></FormLabel>
                            <FormControl>
                                <Input placeholder="0"
                                    {...field}
                                />
                            </FormControl>

                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="dimension.weight_unit"
                    render={({ field }) => (
                        <FormItem>
                            {/* <FormLabel className="font-bold">Package Weight</FormLabel> */}
                            <FormControl>
                                <Select
                                    className='text-xs'
                                    onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger className='text-xs w-[100px] h-[36px]'>
                                            <SelectValue />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent >
                                        <SelectItem
                                            className="text-xs"
                                            value="lbs"
                                        >
                                            lbs
                                        </SelectItem>
                                        <SelectItem
                                            className="text-xs"
                                            value="kg"
                                        >
                                            Kg
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </FormControl>
                        </FormItem>
                    )}
                />
            </div>
            <FormField
                control={form.control}
                name="dimension.weight"
                render={({ field }) => (
                    <FormItem>
                        <FormMessage className='text-xs' />
                    </FormItem>
                )}
            />

            <div className="flex flex-col mt-2">
                <p className='font-bold text-xs'>Package Dimension <span className='text-red-600'>*</span></p>
                <div className="flex flex-row gap-2 items-end">
                    <FormField
                        control={form.control}
                        name="dimension.length"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="">Length</FormLabel>
                                <FormControl>
                                    <Input placeholder="0"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage className='text-xs' />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="dimension.width"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="">Width</FormLabel>
                                <FormControl>
                                    <Input placeholder="0"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage className='text-xs' />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="dimension.height"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="">Height</FormLabel>
                                <FormControl>
                                    <Input placeholder="0"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage className='text-xs' />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="dimension.dimension_unit"
                        render={({ field }) => (
                            <FormItem>
                                {/* <FormLabel className="font-bold">Package Weight</FormLabel> */}
                                <FormControl>
                                    <Select
                                        className='text-xs'
                                        onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger className='text-xs w-[100px] h-[36px]'>
                                                <SelectValue />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent >
                                            <SelectItem
                                                className="text-xs"
                                                value="in"
                                            >
                                                in
                                            </SelectItem>
                                            <SelectItem
                                                className="text-xs"
                                                value="cm"
                                            >
                                                cm
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </div>
            </div>

        </>
    )
}
