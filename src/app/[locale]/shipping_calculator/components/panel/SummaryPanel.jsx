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

export const SummaryPanel = ({
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
        <div className={`flex flex-col px-[20px] h-full w-full`}>
            <ScrollArea className="w-full">
                <div className={`w-full`}>
                    <div className="flex flex-row justify-between mb-[10px]">
                        <p className='text-black text-lg font-bold'>Warehouse & Service Fees</p>
                    </div>
                    <Summary
                        loading_rates={loading_rates}
                        rates={rates}
                        summaryData={summaryData}
                        selecetedData={selecetedData}
                        setShowRates={setShowRates}
                        setOpenServicesOption={setOpenServicesOption}
                    />
                </div>
            </ScrollArea >

        </div >
    )
}
