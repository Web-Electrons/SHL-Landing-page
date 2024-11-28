import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Card, CardContent } from '@/components/ui/card'
import { Package, Truck, Warehouse } from "lucide-react"
import { Checkbox } from '@/components/ui/checkbox'
import { Skeleton } from '@/components/ui/skeleton'
import { CourrierCard } from './CourrierCard'
import { Summary } from './Summary'

export const RatesOption = ({
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
    openSummary,
    setOpenSummary,
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
        <div className={`flex flex-col px-[20px] h-full w-full`}>
            <ScrollArea className="w-full">
                {/* <div className={` ${showRates === false ? 'hidden' : 'block'}`}>
                    <div className="flex flex-row justify-between mb-[10px]">
                        <p className='text-black text-lg font-bold'>Warehouse & Service Fees</p>
                    </div>
                    <Summary
                        loading_rates={loading_rates}
                        rates={rates}
                        summaryData={summaryData}
                        selecetedData={selecetedData}
                        setShowRates={setShowRates}
                    />
                </div> */}

                <div className={showRates === true ? 'hidden' : 'block'}>
                    <div className="flex flex-col h-full">
                        <div className="flex flex-row justify-between">
                            <p className='text-black text-lg font-bold'>Carrier Rates</p>
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
                            onClick={() => setOpenSummary(true)}
                        >
                            Calculate
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
