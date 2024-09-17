/* eslint-disable @next/next/no-img-element */
'use client'
import React, { useCallback, useEffect, useState } from 'react'
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
import { Dimension } from './components/forms/Dimension';
import { ShippedTo } from './components/forms/ShippedTo';
import { useToast } from '@/src/components/ui/use-toast';
import axios from 'axios';

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
        warehouse_code: yup.string(),
    }),

    shipped_to: yup.object().shape({
        name: yup.string().required(),
        country: yup.string().required(),
        state: yup.string().required(),
        city: yup.string().required(),
        zip: yup.string().required(),
        address: yup.string().required(),
        address2: yup.string(),
    }),

    mailboxSelected: yup.string()
})

export default function Home() {

    const { toast } = useToast();
    const [warehouse, setWarehouse] = useState([])
    console.log("🚀 ~ Home ~ warehouse:", warehouse)
    const [courierRates, setCourierRates] = useState([])
    const [country, setCountry] = useState([])
    console.log("🚀 ~ Home ~ country:", country)
    const form = useForm({
        resolver: yupResolver(formSchema),
        defaultValues: {
            dimension: {
                weight_unit: "lbs",
                dimension_unit: "cm",
            },
            shipped_to: {
                name: "stern",
                country: "Canada",
                state: "",
                city: "",
                zip: "",
                address: "",
                address2: "",
            },
            mailboxSelected: "ca"
        }
    })


    useEffect(() => {
        const countryList = async () => {
            try {
                const response = await axios.post(
                    `/api/country/list`,
                    {
                        keyword: "",
                        page: 1,
                        limit: 999,
                        index: 0,
                    },
                )
                const responseData = response.data.country
                setCountry(responseData)
                return responseData || []
            } catch (error) {
                console.error(error)
            }
        }
        countryList()
    }, [])

    const warehouseList = useCallback(async () => {
        try {
            const response = await axios.post(
                `/api/warehouse/list`,
                {
                    keyword: "",
                    page: 1,
                    limit: 10,
                    index: 0,
                },
            )
            const responseData = response.data.warehouse
            const filteredWarehouse = responseData.filter((item) => item.warehouse_code !== "AAA" && item.warehouse_code !== "BBB");
            setWarehouse(filteredWarehouse)
            handleAssingData(filteredWarehouse[0])
            return filteredWarehouse || []

        } catch (error) {
            console.error(error)
        }
    }, [])

    useEffect(() => {
        warehouseList()
    }, [])

    const [showRates, setShowRates] = useState(false)
    const [tabsName, setTabsName] = useState("mailbox")

    const checkCoutryCode = (code) => {
        if (code === undefined) {
            return "ca"
        } else {
            console.log("🚀 ~ checkCountryCode ~ code:", code);
            if (code?.length >= 2) {
                return code.substring(0, 2).toLowerCase();
            } else {
                return code.toLowerCase();
            }
        }
    }

    const selectedData = () => {
        if (form.watch("shipped_from") === undefined) {
            return "Select Mailbox"
        } else {
            const shipped_from = form.watch("shipped_from")
            return (
                `${shipped_from.city}, ${shipped_from.state}, ${shipped_from.zip}, ${shipped_from.country}`
            )
        }
    }
    const handleAssingData = (data) => {
        form.setValue("shipped_from.country", data?.country_code)
        form.setValue("shipped_from.state", data?.province_code)
        form.setValue("shipped_from.city", data?.city)
        form.setValue("shipped_from.zip", data?.postal_code)
        form.setValue("shipped_from.address", data?.address)
        form.setValue("shipped_from.address2", data?.address2)
        form.setValue("shipped_from.warehouse_code", data?.warehouse_code)
        checkCoutryCode(data?.country_code)
        selectedData()
    }

    const handleValueChange = (value) => {
        const data = warehouse.find((item) => item.warehouse_code === value)
        handleAssingData(data)
    }

    const handleSave = async (formData) => {
        console.log("🚀 ~ handleSave ~ formData:", formData)
        try {
            console.log("Before API call");
            const response = await axios.post(
                `/api/Calculator/ShippingCalculation`,
                {
                    addressFrom: {
                        country: formData.shipped_from.country,
                        state: formData.shipped_from.state,
                        city: formData.shipped_from.city,
                        zip: formData.shipped_from.zip,
                        street1: formData.shipped_from.address,
                        street2: formData.shipped_from.address2,
                        // warehouse_code: formData.shipped_from.warehouse_code,
                    },
                    addressTo: {
                        name: formData.shipped_to.name,
                        country: formData.shipped_to.country,
                        state: formData.shipped_to.state,
                        city: formData.shipped_to.city,
                        zip: formData.shipped_to.zip,
                        street1: formData.shipped_to.address,
                        street2: formData.shipped_to.address2,
                    },
                    parcels: {
                        weight: formData.dimension.weight,
                        mass_unit: formData.dimension.weight_unit,
                        length: formData.dimension.length,
                        width: formData.dimension.width,
                        height: formData.dimension.height,
                        distance_unit: formData.dimension.dimension_unit,
                    },
                },
            )
            console.log("🚀 ~ handleSave ~ response:", response)
            console.log("After API call");
            if (response.data.status === true) {
                toast({
                    title: "Success",
                    description: response.data.message,
                    status: "success",
                })
                setCourierRates(response.data.rates.rates || [])
                setShowRates(true)
                console.log("🚀 ~ slo", response.data.rates.rates)
            } else {
                toast({
                    title: "Error",
                    description: response.data.message,
                })
                return response.data.message
            }
        } catch (error) {
            toast({
                title: "Errors",
                description: error.message,
            })
            console.error("Save Error", error)
        }
    }
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
                                <form
                                    onSubmit={form.handleSubmit(handleSave)}
                                >

                                    <div className="flex flex-col gap-3 justify-evenly">
                                        <div className="">
                                            {
                                                tabsName === "mailbox" ? (
                                                    <FormField
                                                        control={form.control}
                                                        name="mailboxSelected"
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
                                                                        // onValueChange={handleValueChange(field.value)}
                                                                        onValueChange={(value) => handleValueChange(value)}
                                                                        defaultValue={field.value}>
                                                                        <FormControl>
                                                                            <SelectTrigger className='text-xs  h-[36px]'>
                                                                                <SelectValue placeholder="Select Mailbox">
                                                                                    <div className="flex flex-row gap-2 items-center ">
                                                                                        <img
                                                                                            // src={`https://flagcdn.com/w640/ca.png`}
                                                                                            src={`https://flagcdn.com/h80/${checkCoutryCode(form.watch('shipped_from.country'))}.jpg`}
                                                                                            srcSet={`https://flagcdn.com/h80/${checkCoutryCode(form.watch('shipped_from.country'))}.jpg 2x`}
                                                                                            alt=""
                                                                                            className='rounded-full w-6 h-6 border border-blue-50 object-center object-cover'
                                                                                        />
                                                                                        {/* <p>- {field.value}</p> */}
                                                                                        <p>{selectedData()}</p>
                                                                                    </div>
                                                                                </SelectValue>
                                                                            </SelectTrigger>
                                                                        </FormControl>
                                                                        <SelectContent >

                                                                            {
                                                                                warehouse?.map((item, index) => (
                                                                                    <SelectItem
                                                                                        key={index}
                                                                                        className="text-xs"
                                                                                        value={item?.warehouse_code}
                                                                                    >
                                                                                        {`${item?.city}, ${item?.province_code}, ${item?.postal_code}, ${item?.country_code}`}
                                                                                    </SelectItem>
                                                                                ))
                                                                            }

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
                                                            country_list={country}
                                                        />
                                                    </>
                                                )
                                            }

                                        </div>

                                        <div className="">
                                            <Dimension
                                                form={form}
                                            />
                                        </div>

                                        {/* ReshipedTo */}

                                        <ShippedTo
                                            form={form}
                                            country_list={country}
                                        />

                                        <Button
                                            variant="destructive"
                                            className="w-full"
                                            size="sm"
                                            type="submit"
                                        // onClick={() => {
                                        //     setShowRates(true)
                                        // }}
                                        onClick={() => handleSave(form.getValues())}
                                        >
                                            Get Rates
                                        </Button>
                                    </div>
                                </form>
                            </Form>
                        </div>
                    </div>
                </div>
                <div className={` ${showRates === true ? styles.panel : "hidden"}`}>
                    {/* <div className={`${styles.panel} `}> */}
                    <RatesPanel rates={courierRates} />
                </div>
            </div>


        </>
    )
}
