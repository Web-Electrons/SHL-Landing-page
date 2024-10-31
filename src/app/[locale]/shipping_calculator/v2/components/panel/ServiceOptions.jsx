import React, { useEffect, useState } from 'react'
import { Button } from '@/src/components/ui/button'
import { ScrollArea } from '@/src/components/ui/scroll-area'
import { Label } from '@/src/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/src/components/ui/radio-group'
import { Card, CardContent } from '@/src/components/ui/card'
import { Package, Truck, Warehouse } from "lucide-react"
import { Checkbox } from '@/src/components/ui/checkbox'
import { Skeleton } from '@/src/components/ui/skeleton'
import { CourrierCard } from './CourrierCard'
import { Summary } from './Summary'
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
    setOpenServicesOption
}) => {
    console.log("🚀 ~ summaryData:", summaryData)
    const [sortedRates, setSortedRates] = useState([])

    const [isFastest, setIsFastest] = useState(false)
    useEffect(() => {
        if (Array.isArray(rates)) {
            if (isFastest) {
                const filterFastest = [...rates].sort(
                    (a, b) => a.estimatedDays - b.estimatedDays
                );
                setSortedRates(filterFastest);
            } else {
                const filterCheapest = [...rates].sort(
                    (a, b) => a.amount - b.amount
                );
                setSortedRates(filterCheapest);
            }
        } else {
            setSortedRates([]);
        }
    }, [rates, isFastest]);

    const handleRefresh = () => {
        // Implement refresh logic here

        console.log("Refreshing rates...");
    }

    const addingDataToSummary = ({ id, amount, service_name }) => {
        setSummaryData(prevData => {
            if (!prevData.find(item => item.id === id)) {
                return [...prevData, { id, amount: parseFloat(amount.replace('$', '')), service_name }];
            }
            return prevData;
        });
    };

    const removeDataFromSummary = (id) => {
        setSummaryData(prevData => prevData.filter(item => item.id !== id));
    };
    return (
        <div className={`
    
        flex flex-col px-[20px] h-full`}>
            {/* <div className="flex flex-row justify-between">
                <p className='text-black text-lg font-bold'>Warehouse & Service Fees</p>
            </div> */}

            <ScrollArea className="">
                {/* <div className="grid gap-2">
                    {[
                        { service: "Storage Fee (per day)", fee: "$2.00" },
                        { service: "Extra Tape", fee: "$5.00" },
                        { service: "Insurance Fee", fee: "$3.00" },
                        { service: "Request More Picture", fee: "$5.00" },
                    ].map((fee, index) => (
                        <div
                            key={index}
                            className="flex justify-between items-center p-1 gap-2 w-full  rounded-lg"
                        >
                            <div className="inline-flex gap-2">
                                <Checkbox
                                    checked={summaryData.some(item => item.id === fee.service)}
                                    onCheckedChange={(checked) => {
                                        return checked
                                            ? addingDataToSummary({ id: fee.service, amount: fee.fee, service_name: fee.service })
                                            : removeDataFromSummary(fee.service);
                                    }}
                                />
                                <span className="font-medium text-xs text-left">{fee.service}</span>
                            </div>
                            <span className=" text-xs">{fee.fee}</span>
                        </div>
                    ))}
                </div> */}
                {/* <RadioGroup defaultValue="comfortable">
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="default" id="r1" />
                        <Label className="flex items-center gap-2" htmlFor="r1">
                            <Warehouse className="h-4 w-4" />
                            Hold For Pickup
                        </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="comfortable" id="r2" />
                        <Label className="flex items-center gap-2" htmlFor="r2">
                            <Package className="h-4 w-4" />
                            Cross Border Pickup
                        </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="compact" id="r3" />
                        <Label className="flex items-center gap-2" htmlFor="r3">
                            <Truck className="h-4 w-4" />
                            Cross Border Forward
                        </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="forward" id="r4" />
                        <Label className="flex items-center gap-2" htmlFor="r4">
                            <Truck className="h-4 w-4" />
                            Forward Package
                        </Label>
                    </div>
                </RadioGroup> */}

                <div className={` ${showRates === false ? 'hidden' : 'block'}`}>
                    <div className="flex flex-row justify-between mb-[10px]">
                        <p className='text-black text-lg font-bold'>Warehouse & Service Fees</p>
                    </div>
                    <div className="grid gap-2 mb-[10px]">
                        {[
                            { service: "Storage Fee (per day)", fee: "$2.00" },
                            { service: "Extra Tape", fee: "$5.00" },
                            { service: "Insurance Fee", fee: "$3.00" },
                            { service: "Request More Picture", fee: "$5.00" },
                        ].map((fee, index) => (
                            <div
                                key={index}
                                className="flex justify-between items-center p-1 gap-2 w-full  rounded-lg"
                            >
                                <div className="inline-flex gap-2">
                                    <Checkbox
                                        checked={summaryData.some(item => item.id === fee.service)}
                                        onCheckedChange={(checked) => {
                                            return checked
                                                ? addingDataToSummary({ id: fee.service, amount: fee.fee, service_name: fee.service })
                                                : removeDataFromSummary(fee.service);
                                        }}
                                    />
                                    <span className="font-medium text-xs text-left">{fee.service}</span>
                                </div>
                                <span className=" text-xs">{fee.fee}</span>
                            </div>
                        ))}
                    </div>
                    <Summary
                        loading_rates={loading_rates}
                        rates={rates}
                        summaryData={summaryData}
                        selecetedData={selecetedData}
                        setShowRates={setShowRates}
                    />
                </div>

                <div className={showRates === true ? 'hidden' : 'block'}>
                    <div className="flex flex-col h-full">
                        <div className="flex flex-row justify-between">
                            <p className='text-black text-lg font-bold'>Rates</p>
                        </div>

                        <div className="flex flex-row gap-2 mt-[10px]">
                            <Button
                                size="xs"
                                variant='ghost'
                                onClick={() => setIsFastest(false)}
                                className={`border border-gray-300 ${!isFastest ? 'bg-red-100 border-red-600 text-red-800' : ''}`}
                            >
                                Cheapest
                            </Button>
                            <Button
                                size="xs"
                                variant='ghost'
                                onClick={() => setIsFastest(true)}
                                className={`border border-gray-300 ${isFastest ? 'bg-red-100 border-red-600 text-red-800' : ''}`}
                            >
                                Fastest
                            </Button>
                        </div>

                        <ScrollArea className="h-[40%] mt-3">
                            <div className="list flex flex-col gap-2">
                                {
                                    loading_rates ? (
                                        <>
                                            <Skeleton className={`w-full h-[40px]`} />
                                            <Skeleton className={`w-full h-[40px]`} />
                                            <Skeleton className={`w-full h-[40px]`} />
                                        </>
                                    ) : rates.length === 0 && !loading_rates ? (
                                        <p className="text-gray-500 text-sm">No rates available</p>
                                    ) : rates.length > 0 ? (
                                        sortedRates.map((rate, index) => (
                                            <CourrierCard
                                                isSelected={selecetedData === rate}
                                                onSelect={setSelectedData}
                                                addingDataToSummary={addingDataToSummary}
                                                key={index} data={rate} />
                                        ))
                                    ) : (
                                        <p className="text-gray-500 text-sm">No rates available</p>
                                    )
                                }

                            </div>
                        </ScrollArea>
                    </div>
                    <div className="">
                        <Button
                            variant="destructive"
                            size="sm"
                            disabled={selecetedData === null}
                            className="w-full mt-3"
                            onClick={() => setShowRates(true)}
                        >
                            Select And Continue
                        </Button>
                        <Button
                            variant="redOutline"
                            size="sm"
                            disabled={selecetedData === null}
                            className="w-full mt-3"
                            onClick={() => {
                                setShowRates(false)
                                setOpenServicesOption(false)
                            }}
                        >
                            Cancel
                        </Button>
                    </div>
                </div>
            </ScrollArea >

        </div >
    )
}
