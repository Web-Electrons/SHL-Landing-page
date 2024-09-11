/* eslint-disable @next/next/no-img-element */
import React from 'react'
import { Button } from '@/src/components/ui/button'
import { RefreshCcw } from 'lucide-react'
import { CourrierCard } from './panel/CourrierCard'
import { ScrollArea } from '@/src/components/ui/scroll-area'

// import Carrier1 from '@/public/logo.png'

export const RatesPanel = () => {

    const [isFastest, setIsFastest] = React.useState(false)
    return (
        <div className="flex flex-col px-[20px]">
            <div className="flex flex-row justify-between">
                <p className='text-black text-lg font-bold'>Rates</p>
                <Button
                    size="xs"
                    variant='ghost'
                    className="border border-gray-300 flex flex-row gap-2"
                >
                    <RefreshCcw size={16} className='text-red-700' />
                    <p>Refresh</p>
                </Button>
            </div>

            <div className=" flex flex-row gap-2 mt-[10px]">
                <Button
                    size="xs"
                    variant='ghost'
                    onClick={() => setIsFastest(false)}
                    className={`border border-gray-300 ${isFastest === false ? 'bg-red-100 border-red-600 text-red-800' : ''}`}
                >
                    Chepest
                </Button>
                <Button
                    size="xs"
                    variant='ghost'
                    onClick={() => setIsFastest(true)}
                    className={`border border-gray-300 ${isFastest === true ? 'bg-red-100 border-red-600 text-red-800' : ''}`}
                >
                    Fastest
                </Button>
            </div>


            <ScrollArea className="h-[60%] mt-3 ">
                <div className="list flex flex-col gap-2">
                    <CourrierCard />
                    <CourrierCard />
                    <CourrierCard />
                    <CourrierCard />
                    <CourrierCard />
                    <CourrierCard />
                    <CourrierCard />
                    <CourrierCard />
                    <CourrierCard />
                    <CourrierCard />
                    <CourrierCard />
                    <CourrierCard />
                    <CourrierCard />
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
