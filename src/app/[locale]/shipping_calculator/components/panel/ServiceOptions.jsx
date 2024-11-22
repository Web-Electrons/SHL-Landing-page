import React, { useEffect, useState } from 'react'
import { Button } from '@/src/components/ui/button'
import { ScrollArea } from '@/src/components/ui/scroll-area'
import { Label } from '@/src/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/src/components/ui/radio-group'
import { Card, CardContent, CardHeader, CardTitle } from '@/src/components/ui/card'
import { Package, Truck, Warehouse, ChevronRight, ArrowRight } from "lucide-react"
import { Checkbox } from '@/src/components/ui/checkbox'
import { Skeleton } from '@/src/components/ui/skeleton'
import { CourrierCard } from './CourrierCard'
import { Summary } from './Summary'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/src/components/ui/tableDashboard'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/src/components/ui/tabs';

export const ServiceOptions = ({
    rates = [],
    loading_rates,
    getRates,
    setSummaryData,
    setShowRates,
    summaryData,
    setSelectedData,
    selecetedData,
    showRates,
    setOpenServicesOption,
    openRatesOption,
    setOpenRatesOption,
    selectedService,
    setSelectedService,
    handleContinue,
    priceList,
    openServicesOption,
    otherService
}) => {
    console.log("🚀 ~ otherService:", otherService)
    console.log("🚀 ~ priceList:", priceList)

    const [tabsName, setTabsName] = useState("mailbox")
    console.log("🚀 ~ tabsName:", tabsName)

    const formatCurrency = (value, currency) => {
        return new Intl.NumberFormat('en-ID', {
            style: 'currency',
            currency: currency,
            minimumIntegerDigits: 2,
            maximumFractionDigits: 2
        }).format(value)
    }

    return (
        <div className={`flex flex-col px-[20px] max-h-[90vh]  ${openServicesOption ? 'cursor-not-allowed pointer-events-none opacity-50' : ""}`}>
            <Tabs
                onValueChange={(value) =>
                    setTabsName(value)
                }
                defaultValue="Service"
                value={tabsName}
                className=""
            >
                <TabsList>
                    <TabsTrigger
                        className="w-[150px]"
                        value="Service">Service</TabsTrigger>
                    <TabsTrigger
                        className="w-[150px]"
                        value="PriceList"
                    >
                        Price List
                    </TabsTrigger>
                </TabsList>
                <TabsContent
                    className="w-full"
                    value="Service">
                    <div className="w-full mt-[20px] px-3">
                        <div className="flex flex-row justify-between mb-[10px] mt-[10px]">
                            <p className='text-black text-lg font-bold'>Service Option</p>
                        </div>
                        <ScrollArea className="w-full">
                            <RadioGroup
                                onValueChange={(value) => setSelectedService(value)}
                                defaultValue="hfp">
                                <div className="flex flex-col gap-3 w-full">
                                    <div className="w-full flex flex-col space-x-2 bg-slate-100 rounded-sm border  p-3">
                                        <div className="flex flex-row gap-2 items-start space-x-1 ">
                                            <RadioGroupItem value="hfp" id="r1" />
                                            <Label className="flex flex-col cursor-pointer" htmlFor="r1">
                                                <div className="flex items-center gap-2">
                                                    <Warehouse className="h-4 w-4" />
                                                    Hold For Pickup
                                                </div>
                                                <p className='text-xs pt-2 w-full'>
                                                    Hold package at the warehouse location it was received for you to pick up in person. Fees must be prepaid online, payment is not available at warehouse locations.
                                                </p>
                                            </Label>
                                        </div>
                                    </div>
                                    <div className="flex flex-col space-x-2 bg-slate-100 rounded-sm border  p-3">
                                        <div className="flex flex-row gap-2 items-start space-x-1">
                                            <RadioGroupItem value="cbp" id="r2" />
                                            <Label className="flex flex-col cursor-pointer " htmlFor="r2">
                                                <div className="flex items-center gap-2">
                                                    <Package className="h-4 w-4" />
                                                    Cross Border Pickup
                                                </div>
                                                <p className='text-xs pt-2'>
                                                    ShipLink will process your package import and transport it to your selected warehouse in the destination country for you to pick up in person. Fees must be prepaid online, payment is not available at warehouse locations.
                                                </p>
                                            </Label>
                                        </div>
                                    </div>
                                    <div className="flex flex-col space-x-2 bg-slate-100 rounded-sm border  p-3">
                                        <div className="flex flex-row gap-2 items-start space-x-1">
                                            <RadioGroupItem value="cbf" id="r3" />
                                            <Label className="flex flex-col cursor-pointer" htmlFor="r3">
                                                <div className="flex items-center gap-2">
                                                    <Truck className="h-4 w-4" />
                                                    Cross Border Forward

                                                </div>
                                                <p
                                                    className='text-xs pt-2'
                                                >
                                                    ShipLink will process your package import and ship it to your selected address domestically, from within the destination country.
                                                </p>
                                            </Label>
                                        </div>
                                    </div>
                                    <div className="flex flex-col space-x-2 bg-slate-100 rounded-sm border  p-3">
                                        <div className="flex flex-row gap-2 items-start space-x-1">
                                            <RadioGroupItem value="forward" id="r4" />
                                            <Label className="flex flex-col cursor-pointer " htmlFor="r4">
                                                <div className="flex items-center gap-2">
                                                    <ArrowRight className="h-4 w-4" />
                                                    Forward Package
                                                </div>
                                                <p className='text-xs pt-2' >
                                                    Ship your package directly to your selected address, either domestic or international using your selected carrier&apos;s own customs import process.
                                                </p>
                                            </Label>
                                        </div>
                                    </div>
                                </div>
                            </RadioGroup>
                        </ScrollArea >

                        <Button
                            className={'mt-4 w-full'}
                            variant="destructive"
                            onClick={() => {
                                handleContinue()
                                setOpenRatesOption(true)
                            }}
                        >
                            Next
                        </Button>
                    </div>
                </TabsContent>
                <TabsContent value="PriceList">
                    <div className={`mt-[20px] px-3`}>
                        <div className="">
                            <div className="flex flex-row justify-between mb-[10px]">
                                <p className='text-black text-lg font-bold'>Package Services</p>
                            </div>
                            <div className="grid  mb-[10px] ">
                                {priceList?.map((item, index) => (
                                    <div
                                        key={index}
                                        className="flex justify-between items-cente r py-2 gap-2 w-full border-b border-gray-200 "
                                    >
                                        <div className="inline-flex gap-2">
                                            <span className="font-medium text-xs text-left">{item.service}</span>
                                        </div>
                                        <span className=" text-xs">
                                            {
                                                formatCurrency(item.price, item.currency)
                                            }
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="">
                            <div className="flex flex-row justify-between mb-[10px]">
                                <p className='text-black text-lg font-bold'>Others</p>
                            </div>
                            <div className="grid  mb-[10px] ">
                                {otherService?.map((item, index) => (
                                    <div
                                        key={index}
                                        className="flex justify-between items-cente r py-2 gap-2 w-full border-b border-gray-200 "
                                    >
                                        <div className="inline-flex gap-2">
                                            <span className="font-medium text-xs text-left">{item.service}</span>
                                        </div>
                                        <span className=" text-xs">
                                            {
                                                formatCurrency(item.price, item.currency)
                                            }
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="text-[12px] text-slate-500 mt-2">
                            <p className="text-[12px] text-black">Note : </p>
                            <ul
                                className='list-disc pl-4'
                            >
                                <li
                                    className=' ' // tailiwnd bullet 
                                >
                                    <p className="text-[12px]">Prices are subject to change without notice</p>
                                </li>
                                <li>
                                    <p className="text-[12px]">Shipping rates may vary based on package dimensions, weight, and destination.</p>
                                </li>
                                <li>
                                    <p className="text-[12px]">Additional fees may apply for oversized or special handling items.</p>
                                </li>
                                <li>
                                    <p className="text-[12px]">For accurate quotes, please use our Shipping Calculator.</p>
                                </li>
                            </ul>
                        </div>

                        <Button
                            className={'mt-4 w-full'}
                            variant="destructive"
                            onClick={() => {
                                setTabsName("Service")
                            }}
                        >
                            Select Service
                        </Button>
                    </div>
                </TabsContent>
            </Tabs>


        </div >
    )
}
