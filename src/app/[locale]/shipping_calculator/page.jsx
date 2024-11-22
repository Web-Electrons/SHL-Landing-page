/* eslint-disable @next/next/no-img-element */
'use client'
import React, { useCallback, useEffect, useState } from 'react'
import styles from './styles.module.scss'
import { ShippingLabels } from '@/src/components/home/ShippingLabels'
import { Input } from '@/src/components/ui/input';
import { useForm, useFieldArray } from "react-hook-form"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/src/components/ui/tableDashboard'
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
    SelectGroup,
    SelectItem,
    SelectLabel,
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
import { ServiceOptions } from './components/panel/ServiceOptions';
import { Summary } from './components/panel/Summary';
import { RatesOption } from './components/panel/RatesOption';
import { SummaryPanel } from './components/panel/SummaryPanel';
import { ChevronRight } from 'lucide-react';
import { Separator } from '@/src/components/ui/separator';

const formSchema = yup.object().shape({
    dimension: yup.object().shape({
        length: yup.number().required('Package length is required'),
        width: yup.number().required('Pacakge Width is required'),
        height: yup.number().required("Package Height is required"),
        weight: yup.number().required('Package Weight is required'),
        weight_unit: yup.string().required('Weight unit is required'),
        dimension_unit: yup.string().required('Dimension unit is required'),
    }),

    shipped_from: yup.object().shape({
        country: yup.string().required('Please select country'),
        state: yup.string().required('Please select state'),
        city: yup.string().required('Please select city'),
        zip: yup.string().required('Please enter zip code'),
        address: yup.string().required('Please enter address'),
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

    shippingType: yup.string().required(),
    mailboxSelected: yup.string()
})

export default function Home() {

    const { toast } = useToast();
    const [warehouse, setWarehouse] = useState([])
    const [courierRates, setCourierRates] = useState([])
    const [country, setCountry] = useState([])
    const [disabledForm, setDisabledForm] = useState(false)
    const [loading_rates, set_loading_rates] = useState(false)
    const [openRates, setOpenRates] = useState(false)
    const [openServicesOption, setOpenServicesOption] = useState(false)
    const [summaryData, setSummaryData] = useState([])
    const [selecetedData, setSelectedData] = useState(null)
    const [openRatesOption, setOpenRatesOption] = useState(false)
    const [openSummary, setOpenSummary] = useState(false);
    const [selectedService, setSelectedService] = useState(null)
    const [serviceList, setServiceList] = useState([]);
    const [otherService, setOtherService] = useState([])
    console.log("🚀 ~ Home ~ serviceList:", serviceList)

    // const [openServicesOption]

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
            shipped_from: {
                address2: "",
            },
            shippingType: "HFP",
            mailboxSelected: "ca"
        }
    })

    const shipping = form.watch("shippingType");

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


    const getServicesList = async () => {
        try {
            const response = await axios.get(
                `/api/Service_list`
            )
            console.log("🚀 ~ getServicesList ~ response:", response)
            const responseData = response.data.data

            const filteredActiveStatus = responseData.filter((item) => item.status === "Active")
            const removeDuplicate = filteredActiveStatus.filter((item, index, self) => self.findIndex(t => t.service === item.service) === index)
            const packageServices = [
                "Hold for Pickup",
                "Cancel Consolidate",
                "Package Reception US",
                "Request More Picture",
                "Cross Border Pickup",
                "Cross Border Forward",
                "Forward Package",
                "Consolidate",
                "Package Reception CA"
            ];
            const descriptions = {
                "Hold for Pickup": "Pick up your package from our local warehouse.",
                "Cancel Consolidate": "Cancel the package consolidation process.",
                "Package Reception US": "Receive your package at our US warehouse.",
                "Request More Picture": "Request additional photos of your package.",
                "Cross Border Pickup": "Pick up your package across borders.",
                "Cross Border Forward": "Forward your package to another country.",
                "Forward Package": "Forward your package to your address.",
                "Consolidate": "Combine multiple packages into one shipment.",
                "Package Reception CA": "Receive your package at our Canada warehouse.",
                "Carrier Rate": "Check carrier rates for your shipment.",
                "Brokerage fee - CA import": "Fee for importing into Canada.",
                "Brokerage fee - US import": "Fee for importing into the US.",
                "Free Membership": "Enjoy free membership benefits."
            };

            const withDescriptions = removeDuplicate.map((item) => ({
                ...item,
                description: descriptions[item.service] || "No description available."
            }));
            // Kelompokkan layanan ke dalam "package" dan "other"
            const packageList = withDescriptions.filter((item) => packageServices.includes(item.service));
            const otherList = withDescriptions.filter((item) => !packageServices.includes(item.service));

            setOtherService(otherList)
            setServiceList(packageList)
        } catch (e) {
            console.error(e)
        }
    }

    useEffect(() => {
        getServicesList();
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
        set_loading_rates(true)
        // setShowRates(true)
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
        } finally {
            set_loading_rates(false)
        }
    }

    // const validateForm = async () => {
    //     const isValid = await form.trigger();
    //     if (!isValid) {
    //         // Ambil semua field yang error dari form state
    //         const errorFields = Object.keys(form.formState.errors).map((key) => key.replace(/\./g, ' > '));
    //         console.log("🚀 ~ validateForm ~ errorFields:", form.formState.errors)
    //         toast({
    //             title: "Error",
    //             description: `Required fields: ${errorFields.join(', ')}`,
    //             status: "error",
    //         });

    //         return false;
    //     }
    //     return true
    // };

    const validateForm = async () => {
        const isValid = await form.trigger();

        if (!isValid) {
            // Ambil semua field yang error dari form state
            const errors = form.formState.errors;
            console.log("🚀 ~ validateForm ~ errors:", errors)

            // Mapping pesan error yang lebih friendly
            const errorMessages = Object.values(errors).map((fieldError) => {
                console.log("🚀 ~ errorMessages ~ fieldError.message:", fieldError.message)
                if (fieldError.message) return fieldError.message;
                return "Some required fields are missing.";
            });

            // Gabungkan semua pesan error
            const friendlyErrorMessage = errorMessages.join(', ');

            console.log("🚀 ~ validateForm ~ errorFields:", errors);

            toast({
                title: "Oops! Please check the form",
                description: friendlyErrorMessage,
                status: "error",
            });

            return false;
        }

        return true;
    };
    const triggerSave = () => {
        // validateForm()
        handleSave(form.getValues())
    }

    const handleContinue = async () => {
        setOpenSummary(false)
        const isValid = await validateForm();
        if (isValid) {
            setOpenServicesOption(true)
            setDisabledForm(true)
            setShowRates(false)
            triggerSave()
        }
    }


    const formatCurrency = (value, currency) => {
        return new Intl.NumberFormat('en-ID', {
            style: 'currency',
            currency: currency,
            minimumIntegerDigits: 2,
            maximumFractionDigits: 2
        }).format(value)
    }

    return (
        <>

            <div className={styles.container}>
                <div className={`flex  flex-col text-center justify-start gap-[32px] pt-[90px] w-full bg-[#FFFFF] py-10
                    ${styles.wrapper}
                    `}>
                    <div className="flex flex-col gap-5 justify-start text-left w-[90%] mx-auto pt-3">
                        <h1 className=" text-myBlue text-3xl font-bold">
                            Shipping Calculator
                        </h1>
                        <h1 className=" text-black text-lg font-bold">

                            Estimate Your Shipping Cost
                        </h1>

                        <div className="">

                            <Form {...form}>
                                <form
                                    disabled={disabledForm}
                                    onSubmit={form.handleSubmit(handleSave)}
                                >
                                    <div className="pb-4 pt-3 flex flex-row gap-[20px] h-full items-center">
                                        <Tabs
                                            onValueChange={(value) => setTabsName(value)}
                                            defaultValue="mailbox"
                                            value={tabsName}
                                            className=""
                                        >
                                            <TabsList>
                                                <TabsTrigger
                                                    className="w-[150px]"
                                                    value="mailbox">
                                                    Mailbox
                                                </TabsTrigger>
                                                <TabsTrigger
                                                    className="w-[150px]"
                                                    // disabled={shipping === "HFP"}
                                                    value="custom">
                                                    Custom Address
                                                </TabsTrigger>

                                            </TabsList>
                                        </Tabs>
                                        <div className="flex  h-[32px]">
                                            <Separator orientation="vertical w-[10px]" />

                                        </div>
                                        <div className="">
                                            <Tabs
                                                value={tabsName}
                                                onValueChange={(value) => setTabsName(value)}
                                            >
                                                <TabsList>
                                                    <TabsTrigger
                                                        className="w-[150px]"
                                                        value="priceList">Price List
                                                    </TabsTrigger>
                                                </TabsList>
                                            </Tabs>
                                        </div>
                                    </div>

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
                                                            </FormItem>

                                                        )}
                                                    />
                                                ) : tabsName === "custom" ? (
                                                    <>

                                                        <ShiptoForm
                                                            form={form}
                                                            country_list={country}
                                                        />
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

                                                    </>
                                                ) : (
                                                    <>
                                                        <div className=" space-y-3">
                                                            <div className="pb-2">
                                                                <div className="flex flex-row justify-between mb-[10px]">
                                                                    <p className='text-black text-sm font-bold '>Package Services</p>
                                                                </div>
                                                                <Table>
                                                                    <TableHeader>
                                                                        <TableRow className="bg-white text-black hover:bg-slate-100 border-none">
                                                                            <TableHead className="w-[300px] text-black text-xs">Service</TableHead>
                                                                            <TableHead className=" text-xs text-black">Description</TableHead>
                                                                            <TableHead className="text-right text-black  text-xs">Fee</TableHead>
                                                                        </TableRow>
                                                                    </TableHeader>
                                                                    <TableBody>
                                                                        {
                                                                            serviceList?.map((item, index) => (
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
                                                                    </TableBody>
                                                                </Table>
                                                            </div>
                                                            <div className="">
                                                                <div className="flex flex-row justify-between mb-[10px]">
                                                                    <p className='text-black text-sm font-bold '>Other Services</p>
                                                                </div>
                                                                <Table>
                                                                    <TableHeader>
                                                                        <TableRow className="bg-white text-black hover:bg-slate-100 border-none">
                                                                            <TableHead className="w-[300px] text-black text-xs">Service</TableHead>
                                                                            <TableHead className=" text-xs text-black">Description</TableHead>
                                                                            <TableHead className="text-right text-black  text-xs">Fee</TableHead>
                                                                        </TableRow>
                                                                    </TableHeader>
                                                                    <TableBody>
                                                                        {
                                                                            otherService?.map((item, index) => (
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
                                                                    </TableBody>
                                                                </Table>
                                                            </div>
                                                        </div>
                                                    </>
                                                )
                                            }

                                        </div>




                                        {/* <Button
                                            variant="destructive"
                                            className="w-full"
                                            size="sm"
                                            type="button"
                                            disabled={loading_rates}
                                            onClick={() => handleContinue()}
                                        // onClick={() => {
                                        //     setShowRates(true)
                                        // }}
                                        // onClick={() => handleSave(form.getValues())}
                                        >
                                            Continue
                                        </Button> */}
                                    </div>
                                </form>
                            </Form>
                        </div>
                    </div>
                </div>
                <div className={styles.service}>
                    <ServiceOptions
                        loading_rates={loading_rates}
                        rates={courierRates}
                        getRates={triggerSave}
                        setSummaryData={setSummaryData}
                        setShowRates={setShowRates}
                        summaryData={summaryData}
                        setSelectedData={setSelectedData}
                        selecetedData={selecetedData}
                        showRates={showRates}
                        setOpenServicesOption={setOpenServicesOption}
                        openRatesOption={openRatesOption}
                        setOpenRatesOption={setOpenRatesOption}
                        selectedService={selectedService}
                        setSelectedService={setSelectedService}
                        handleContinue={handleContinue}
                        openServicesOption={openServicesOption}
                        priceList={serviceList}
                        otherService={otherService}
                    />
                </div>

                {
                    openServicesOption && (
                        selectedService?.toLowerCase() === 'hfp' ? (
                            <div className={`${styles.service}`}>
                                {/* <div className={`${styles.panel} `}> */}
                                <SummaryPanel
                                    loading_rates={loading_rates}
                                    rates={courierRates}
                                    getRates={triggerSave}
                                    setSummaryData={setSummaryData}
                                    setShowRates={setShowRates}
                                    summaryData={summaryData}
                                    setSelectedData={setSelectedData}
                                    selecetedData={selecetedData}
                                    showRates={showRates}
                                    setOpenServicesOption={setOpenServicesOption}
                                />
                            </div>
                        ) : openSummary && selectedService?.toLowerCase() !== 'hfp' ? (
                            <div className={`${styles.service}`}>
                                {/* <div className={`${styles.panel} `}> */}
                                <SummaryPanel
                                    loading_rates={loading_rates}
                                    rates={courierRates}
                                    getRates={triggerSave}
                                    setSummaryData={setSummaryData}
                                    setShowRates={setShowRates}
                                    summaryData={summaryData}
                                    setSelectedData={setSelectedData}
                                    selecetedData={selecetedData}
                                    showRates={showRates}
                                    setOpenServicesOption={setOpenServicesOption}
                                />
                            </div>
                        ) : (
                            <div className={`${styles.service}`}>
                                {/* <div className={`${styles.panel} `}> */}
                                <RatesOption
                                    openSummary={openSummary}
                                    setOpenSummary={setOpenSummary}
                                    loading_rates={loading_rates}
                                    rates={courierRates}
                                    getRates={triggerSave}
                                    setSummaryData={setSummaryData}
                                    setShowRates={setShowRates}
                                    summaryData={summaryData}
                                    setSelectedData={setSelectedData}
                                    selecetedData={selecetedData}
                                    showRates={showRates}
                                    setOpenServicesOption={setOpenServicesOption}

                                />
                            </div>
                        )
                    )
                }

                {/* {
                    openRatesOption && (
                        <div className={`
                            ${openRatesOption === true ? styles.service : "hidden"}`}>
                            <RatesOption
                                openSummary={openSummary}
                                setOpenSummary={setOpenSummary}
                                loading_rates={loading_rates}
                                rates={courierRates}
                                getRates={triggerSave}
                                setSummaryData={setSummaryData}
                                setShowRates={setShowRates}
                                summaryData={summaryData}
                                setSelectedData={setSelectedData}
                                selecetedData={selecetedData}
                                showRates={showRates}
                                setOpenServicesOption={setOpenServicesOption}
                            />
                        </div>
                    )
                }

                {
                    openSummary && (
                        <div className={`
                            ${openSummary === true ? styles.service : "hidden"}`}>
                            <SummaryPanel
                                loading_rates={loading_rates}
                                rates={courierRates}
                                getRates={triggerSave}
                                setSummaryData={setSummaryData}
                                setShowRates={setShowRates}
                                summaryData={summaryData}
                                setSelectedData={setSelectedData}
                                selecetedData={selecetedData}
                                showRates={showRates}
                                setOpenServicesOption={setOpenServicesOption}
                            />
                        </div>
                    )
                } */}

            </div>


        </>
    )
}
