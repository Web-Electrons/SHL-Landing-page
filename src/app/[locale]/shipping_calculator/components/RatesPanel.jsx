/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from 'react'
import { Button } from '@/src/components/ui/button'
import { RefreshCcw } from 'lucide-react'
import { CourrierCard } from './panel/CourrierCard'
import { ScrollArea } from '@/src/components/ui/scroll-area'

// import Carrier1 from '@/public/logo.png'



export const RatesPanel = ({ rates = [] }) => {

    const [isFastest, setIsFastest] = useState(false)
    const [sortedRates, setSortedRates] = useState([])

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

    return (
        <div className="flex flex-col px-[20px]">
            <div className="flex flex-row justify-between">
                <p className='text-black text-lg font-bold'>Rates</p>
                <Button
                    size="xs"
                    variant='ghost'
                    className="border border-gray-300 flex flex-row gap-2"
                    onClick={handleRefresh}
                >
                    <RefreshCcw size={16} className='text-red-700' />
                    <p>Refresh</p>
                </Button>
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

            <ScrollArea className="h-full mt-3">
                <div className="list flex flex-col gap-2">
                    {sortedRates.map((rate, index) => (
                        <CourrierCard key={index} data={rate} />
                    ))}
                </div>
            </ScrollArea>

            <div className="">
                <Button
                    variant="destructive"
                    size="xs"
                    className="w-full mt-3"
                >
                    Start Shipping
                </Button>
            </div>
        </div>
    )
}
