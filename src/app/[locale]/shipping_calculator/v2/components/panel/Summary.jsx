/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from 'react'
import { Button } from '@/src/components/ui/button'
import { ScrollArea } from '@/src/components/ui/scroll-area'
import Link from 'next/link'

import { Card, CardContent } from '@/src/components/ui/card'

import React from 'react'
import { Separator } from '@/src/components/ui/separator'

export const Summary = ({
    rates = [],
    loading_rates,
    summaryData,
    selecetedData,
    setShowRates
}) => {
    const login = process.env.NEXT_PUBLIC_LOGIN_URL;
    const [isFastest, setIsFastest] = useState(false)
    const [sortedRates, setSortedRates] = useState([])
    console.log("🚀 ~ RatesPanel ~ selecetedData:", selecetedData)

    const handleRefresh = () => {
        // Implement refresh logic here

        console.log("Refreshing rates...");
    }

    const [total, setTotal] = useState(0);
    console.log("🚀 ~ total:", total)

    useEffect(() => {
        let total = 0;
        let carrierTotal = selecetedData?.amountLocal || 0
        summaryData.forEach(item => {
            total += item?.amount;
        });
        setTotal(total + carrierTotal);
    }, [summaryData]);

    return (
        <div className="flex flex-col  h-full">

            <div className="flex flex-row justify-between">
                <p className='text-black text-lg font-bold'>Summary</p>
                {/* <Button
                    size="xs"
                    variant='ghost'
                    className="border border-gray-300 flex flex-row gap-2"
                    onClick={handleRefresh}
                >
                    <RefreshCcw size={16} className='text-red-700' />
                    <p>Refresh</p>
                </Button> */}
            </div>

            <ScrollArea className="h-[80%] mt-3">
                <div className="list flex flex-col gap-2">
                    <div className="">
                        <Card className="border-none p-0">
                            <CardContent className="px-0 space-y-2">
                                <div className="">
                                    {
                                        selecetedData && (
                                            <div className="flex flex-row gap-2 items-center  p-1">
                                                <div className="flex flex-col w-[70%]">
                                                    <p className='text-xs'>{selecetedData.provider} - {selecetedData.servicelevel?.name}</p>
                                                    <p className="text-[10px] text-gray-500">Estimate {selecetedData.estimatedDays || "-"} Days</p>
                                                </div>
                                                <p className='text-xs w-[30%] text-right'>{`$ ${selecetedData.amountLocal.toFixed(2)}`}</p>
                                            </div>
                                        )

                                    }
                                    {
                                        summaryData.map((item, index) => (
                                            <div
                                                key={index}
                                                className="flex justify-between items-center p-1 gap-2 w-full  rounded-lg"
                                            >
                                                <div className="inline-flex gap-2">
                                                    <span className="font-medium text-xs text-left">{item.service_name}</span>
                                                </div>
                                                <span className=" text-xs">$ {item.amount}</span>
                                            </div>
                                        ))
                                    }
                                </div>
                                <Separator />
                                <div className="">
                                    <div className="grid gap-2">
                                        <div
                                            className="flex justify-between items-center p-1 gap-2 w-full  rounded-lg"
                                        >
                                            <div className="inline-flex gap-2">
                                                <span className="font-bold text-sm text-left">Total</span>
                                            </div>
                                            <span className=" text-sm">$ {total}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="">
                                    <Link
                                        passHref
                                        className='w-full'
                                        href={`${login}`}
                                    >
                                        <Button
                                            variant="destructive"

                                            className="w-full mt-3"
                                        >
                                            Start Saving
                                        </Button>
                                    </Link>
                                    <Button
                                        variant="redOutline"
                                        className="w-full mt-3"
                                        onClick={() => setShowRates(false)}
                                    >
                                        Cancel
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                </div>
            </ScrollArea>

        </div>
    )
}
