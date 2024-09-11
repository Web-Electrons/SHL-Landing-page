/* eslint-disable @next/next/no-img-element */
'use client'
import React, { useState } from 'react'
import styles from './styles.module.scss'
import { ShippingLabels } from '@/src/components/home/ShippingLabels'
import { Input } from '@/src/components/ui/input';
import { useForm, useFieldArray } from "react-hook-form"
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
import * as yup from "yup"
import { Button } from '@/src/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/src/components/ui/tabs';
import { ShiptoForm } from './components/shiptoForm';
import { yupResolver } from "@hookform/resolvers/yup"
import { RatesPanel } from './components/RatesPanel';

const formSchema = yup.object().shape({
    dimension: yup.object().shape({
        length: yup.number().required(),
        width: yup.number().required(),
        height: yup.number().required(),
        weight: yup.number().required(),
        weight_unit: yup.string().required(),
        dimension_unit: yup.string().required(),
    }),

    shipped_from: yup.object().shape({
        country: yup.string().required(),
        state: yup.string().required(),
        city: yup.string().required(),
        zip: yup.string().required(),
        address: yup.string().required(),
        address2: yup.string(),
    }),

    shipped_to: yup.object().shape({
        country: yup.string().required(),
        state: yup.string().required(),
        city: yup.string().required(),
        zip: yup.string().required(),
        address: yup.string().required(),
        address2: yup.string(),
    }),
})
export default function Home() {

    const form = useForm({
        resolver: yupResolver(formSchema),
        defaultValues: {
            dimension: {
                length: 0,
                width: 0,
                height: 0,
                weight: 0,
                weight_unit: "lbs",
                dimension_unit: "cm",
            },
            shipped_to: {
                country: "Canada",
                state: "",
                city: "",
                zip: "",
                address: "",
                address2: "",
            },
        }
    })



    const [showRates, setShowRates] = useState(false)
    const [tabsName, setTabsName] = useState("mailbox")
    console.log("🚀 ~ Home ~ tabsName:", tabsName)

    return (
        <>
            <div className={styles.container}>
                <div className={`flex flex-col text-center justify-start gap-[32px] pt-[90px] w-full bg-[#FFFFF] py-10
                    ${styles.wrapper}
                    `}>
                    <div className="flex flex-col gap-5 justify-start text-left w-[90%] mx-auto pt-3">
                        <h1 className=" text-myBlue text-3xl font-bold">
                            {/* {t('ship.Shipping')} */}
                            Shipping Calculator
                            {/* Shipping Labels */}
                        </h1>
                        <h1 className=" text-black text-lg font-bold">
                            {/* {t('ship.Shipping_Sub')} */}
                            {/* How it Works */}
                            Simulate Your Shipping Cost
                        </h1>

                        <div className="">
                            <div className="pb-4">
                                <Tabs
                                    onValueChange={(value) => setTabsName(value)}
                                    defaultValue="mailbox" className="w-[400px]">
                                    <TabsList>
                                        <TabsTrigger
                                            className="w-[150px]"
                                            value="mailbox">Mailbox</TabsTrigger>
                                        <TabsTrigger
                                            className="w-[150px]"
                                            value="custom">Custom Address</TabsTrigger>
                                    </TabsList>
                                </Tabs>
                            </div>
                            <Form {...form}>
                                <form >

                                    <div className="flex flex-col gap-3 justify-evenly">
                                        <div className="">
                                            {
                                                tabsName === "mailbox" ? (
                                                    <FormField
                                                        control={form.control}
                                                        name="dimension.weight_unit"
                                                        render={({ field }) => (
                                                            <FormItem
                                                                className="w-full"
                                                            >
                                                                <FormLabel className="font-bold">Select Your Mailbox <span className='text-red-600'>*</span></FormLabel>
                                                                <FormControl
                                                                    className="w-full"
                                                                >
                                                                    <Select
                                                                        className='text-xs'
                                                                        onValueChange={field.onChange} defaultValue={field.value}>
                                                                        <FormControl>
                                                                            <SelectTrigger className='text-xs  h-[36px]'>
                                                                                <SelectValue placeholder="Select Mailbox">
                                                                                    <div className="flex flex-row gap-2 items-center ">
                                                                                        <img
                                                                                            // src={`https://flagcdn.com/w640/ca.png`}
                                                                                            src={`https://flagcdn.com/h80/${field.value}.jpg`}
                                                                                            srcSet={`https://flagcdn.com/h80/${field.value}.jpg 2x`}
                                                                                            alt=""
                                                                                            className='rounded-full w-6 h-6 border border-blue-50 object-center object-cover'
                                                                                        />
                                                                                        <p>- {field.value}</p>
                                                                                    </div>
                                                                                </SelectValue>
                                                                            </SelectTrigger>
                                                                        </FormControl>
                                                                        <SelectContent >
                                                                            <SelectItem
                                                                                className="text-xs"
                                                                                value="ca"
                                                                            >
                                                                                CAD Vareness
                                                                            </SelectItem>
                                                                            <SelectItem
                                                                                className="text-xs"
                                                                                value="us"
                                                                            >
                                                                                USA Moores
                                                                            </SelectItem>
                                                                        </SelectContent>
                                                                    </Select>
                                                                </FormControl>
                                                            </FormItem>
                                                        )}
                                                    />
                                                ) : (
                                                    <>
                                                        <ShiptoForm
                                                            form={form}
                                                        />
                                                    </>
                                                )
                                            }

                                        </div>
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

                                        <div className="flex flex-col">
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

                                        {/* ReshipedTo */}
                                        <div className="flex flex-col">
                                            <p className='font-bold text-xs'>Reshipped to ...</p>
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
                                                                            <SelectItem
                                                                                className="text-xs"
                                                                                value="Canada"
                                                                            >
                                                                                Canada
                                                                            </SelectItem>
                                                                            <SelectItem
                                                                                className="text-xs"
                                                                                value="USA"
                                                                            >
                                                                                USA
                                                                            </SelectItem>
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


                                        <Button
                                            variant="destructive"
                                            className="w-full"
                                            size="sm"
                                            type="button"
                                            onClick={() => {
                                                setShowRates(true)

                                            }}
                                        >
                                            Get Rates
                                        </Button>
                                    </div>
                                </form>
                            </Form>
                        </div>
                    </div>
                </div>
                {/* <div className={` ${showRates === true ? styles.panel : "hidden"}`}> */}
                <div className={`${styles.panel} `}>
                    <RatesPanel />
                </div>
            </div>


        </>
    )
}
