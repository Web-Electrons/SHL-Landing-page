/* eslint-disable @next/next/no-img-element */
'use client'
import React, { useCallback, useEffect, useState } from 'react'
import styles from './styles.module.scss'
import { ShippingLabels } from '@/components/home/ShippingLabels'
import { Input } from '@/components/ui/input';
import { useForm, useFieldArray } from "react-hook-form"
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
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';
import * as yup from "yup"
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ShiptoForm } from './components/shiptoForm';
import { yupResolver } from "@hookform/resolvers/yup"
import { RatesPanel } from './components/RatesPanel';
import { Dimension } from './components/forms/Dimension';
import { ShippedTo } from './components/forms/ShippedTo';
import { useToast } from '@/components/ui/use-toast';
import axios from 'axios';
import { ServiceOptions } from './components/panel/ServiceOptions';
import { Summary } from './components/panel/Summary';
import { RatesOption } from './components/panel/RatesOption';
import { SummaryPanel } from './components/panel/SummaryPanel';
import { ChevronRight } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { ServiceTable } from './components/ServiceTable';
import { useMediaQuery } from 'react-responsive';

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
        country: yup.string().required('Please select country'),
        state: yup.string().required('Please select state'),
        city: yup.string().required('Please enter city'),
        zip: yup.string().required('Please enter zip code'),
        address: yup.string().required('Please enter address'),
        address2: yup.string(),
    }),

    shippingType: yup.string().required(),
    mailboxSelected: yup.string()
})

export default function Home() {

    const tableMode = useMediaQuery({ query: '(max-width: 950px)' });

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
    const [warehouse_id, setWarehouseId] = useState('');
    const [warehouseServiceList, setWarehouseServiceList] = useState([]);
    const [openSheet, setOpenSheet] = useState(false);
    const [open, setOpen] = useState(false);
    console.log("🚀 ~ Home ~ openSheet:", openSheet)

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
            setWarehouseId(filteredWarehouse[0]?.warehouse_id)
            return filteredWarehouse || []

        } catch (error) {
            console.error(error)
        }
    }, [])

    useEffect(() => {
        warehouseList()
    }, [])

    const [loadingService, setLoadingService] = useState(false)

    const getServicesList = async () => {
        setLoadingService(true)
        try {
            // Panggil kedua API
            const [serviceListResponse, warehouseServiceResponse] = await Promise.all([
                axios.get(`/api/Service_list`),
                axios.post(`/api/warehouse/service_list`, { warehouse_id: warehouse_id })
            ]);

            console.log("🚀 ~ getServicesList ~ response:", serviceListResponse);
            console.log("🚀 ~ getWarehouseServiceList:", warehouseServiceResponse);

            const serviceListData = serviceListResponse.data.data;
            const warehouseServiceData = warehouseServiceResponse.data.data;

            // Daftar layanan yang harus dihapus dari main service
            const servicesToReplace = [
                "Forward Package",
                "Consolidate",
                "Request More Picture",
                "Package Reception US",
                "Package Reception CA",
                "Free Membership",
                "Cancel Consolidate",
            ];

            const packageServices = [
                "Hold for Pickup",
                "Cross Border Pickup",
                "Cross Border Forward",
                "Forward Package",
                "Package Reception US",
                "Package Reception CA"
            ];

            const descriptions = {
                "Hold for Pickup": "Pick up your package in person from a warehouse location.",
                "Cancel Consolidate": "Cancel the package consolidation process.",
                "Cross Border Pickup": "We import your package and you pickup in person from a local warehouse",
                "Cross Border Forward": "We import your package and forward it domestically to your final destination with the carrier you select",
                "Forward Package": "Internationally directly to the address of your choice with the carrier you select",
                "Consolidate": "Combine multiple packages into one shippment.",
                "Request More Picture": "Request additional photos of your package.",
                "Package Reception US": "Brokerage service for package with value over $800 USD.",
                "Package Reception CA": "Brokerage service for package with value over $20 CAD.",
                "Carrier Rate": "Check carrier rates for your package.",
                "Brokerage fee - CA import": "Fee for importing into Canada.",
                "Brokerage fee - US import": "Fee for importing into the US.",
                "Free Membership": "Enjoy free membership benefits."
            };

            // Filter data main service
            const filteredMainServices = serviceListData
                .filter((item) => item.status === "Active") // Hanya ambil status aktif
                .filter((item) => item.service === item.service) // Hapus duplikat
                .filter((item) => !servicesToReplace.includes(item.service)) // Hapus layanan yang diambil dari warehouseService
                .map((item) => ({
                    ...item,
                    description: descriptions[item.service] || "No description available."
                }));

            // Tambahkan deskripsi pada layanan warehouseService
            const warehouseServicesWithDescriptions = warehouseServiceData.map((item) => ({
                ...item,
                description: descriptions[item.service] || "No description available."
            }));

            // Gabungkan data warehouseService ke dalam layanan utama
            const combinedServices = [
                ...filteredMainServices,
                ...warehouseServicesWithDescriptions
            ];

            // Kelompokkan ke dalam "package" dan "other"
            const packageList = combinedServices.filter((item) => packageServices.includes(item.service));
            const otherList = combinedServices.filter((item) => !packageServices.includes(item.service));

            const packageClean = packageList.filter((item, index, self) =>
                self.findIndex(t => t.service === item.service) === index
            );

            const cleanOtherList = otherList.filter((item, index, self) =>
                self.findIndex(t => t.service === item.service) === index
            );

            setOtherService(cleanOtherList);
            setServiceList(packageClean);
        } catch (e) {
            console.error(e);
        } finally {
            setLoadingService(false)
        }
    };

    // Gunakan `getServicesList` dalam `useEffect`
    useEffect(() => {
        getServicesList();
    }, [warehouse_id]);

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
        console.log("🚀 ~ handleValueChange ~ data:", data)
        handleAssingData(data)
        setWarehouseId(data?.warehouse_id)
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

    const validateForm = async () => {
        const isValid = await form.trigger();

        if (!isValid) {
            tableMode && setOpen(true)
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
                description: "Some required fields are missing.",
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

    const triggerContinue = async () => {
        const isValid = await form.trigger();
        if (isValid) {
            setOpen(true)
        }
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
                <div className={`flex h-screen min-h-max  flex-col text-center justify-start gap-[32px] pt-[90px] w-full bg-[#FFFFF] py-10
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
                                    <div className={`pb-4 pt-3 flex 
                                        ${tableMode ? 'flex flex-col gap-3 items-start  ' : 'flex-row gap-[20px] h-full items-center'}
                                        `}>
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
                                                    disabled={true}
                                                    value="custom">
                                                    Custom Address
                                                </TabsTrigger>

                                            </TabsList>
                                        </Tabs>
                                        <div className={`h-[32px] ${tableMode ? 'hidden' : 'flex'}`}>
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

                                    <div className="flex flex-col gap-3 justify-evenly h-max">
                                        <div className="">
                                            {
                                                tabsName === "mailbox" ? (
                                                    <FormField
                                                        control={form.control}
                                                        name="mailboxSelected"
                                                        render={({ field }) => (
                                                            <>
                                                                <div className="">
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

                                                                    <Button
                                                                        className={`${tableMode ? 'bloc' : 'hidden'} w-full mt-5`}
                                                                        variant="destructive"
                                                                        onClick={() => {
                                                                            triggerContinue()
                                                                        }}
                                                                    >
                                                                        Continue
                                                                    </Button>
                                                                </div>
                                                            </>
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
                                                        <ServiceTable
                                                            form={form}
                                                            warehouse={warehouse}
                                                            otherService={otherService}
                                                            serviceList={serviceList}
                                                            selectedData={selectedData}
                                                            handleValueChange={handleValueChange}
                                                            checkCoutryCode={checkCoutryCode}
                                                            warehouseServiceList={warehouseServiceList}
                                                            loadingService={loadingService}
                                                        />
                                                    </>
                                                )
                                            }

                                        </div>

                                    </div>
                                </form>
                            </Form>
                        </div>
                    </div>
                </div>
                {
                    tableMode ? (
                        <>
                            {
                                open === true && (
                                    <Sheet
                                        open={open}
                                        onOpenChange={setOpen}
                                        modal={true}
                                    >
                                        <SheetContent
                                            className='rounded-sm'
                                            side={"bottom"}>
                                            <SheetHeader
                                                className={'hidden'}
                                            >
                                                <SheetTitle>Edit profile</SheetTitle>
                                                <SheetDescription>
                                                </SheetDescription>
                                            </SheetHeader>
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
                                        </SheetContent>
                                    </Sheet>
                                )
                            }


                            {
                                openServicesOption && (
                                    <Sheet
                                        open={openServicesOption}
                                        onOpenChange={setOpenServicesOption}
                                        modal={true}
                                    >
                                        <SheetContent
                                            className='rounded-sm w-full flex flex-col'
                                            side={"bottom"}>
                                            <>
                                                {
                                                    openServicesOption && (
                                                        selectedService?.toLowerCase() === 'hfp' ? (
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
                                                        ) : openSummary && selectedService?.toLowerCase() !== 'hfp' ? (
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
                                                        ) : (
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
                                                        )
                                                    )
                                                }

                                            </>
                                        </SheetContent>
                                    </Sheet>
                                )
                            }

                        </>
                    ) : (
                        <>
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
                        </>

                    )
                }
                {/* <div className={styles.service}>
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
                </div> */}

            </div>


        </>
    )
}
