/* eslint-disable @next/next/no-img-element */
import React from 'react'
import { Button } from '@/src/components/ui/button'
import { RefreshCcw } from 'lucide-react'

// import Carrier1 from '@/public/logo.png'

export const RatesPanel = () => {
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
                    className="border border-gray-300"
                >
                    Chepest
                </Button>
                <Button
                    size="xs"
                    variant='ghost'
                    className="border border-gray-300"
                >
                    Fastest
                </Button>
            </div>


            <div className="list mt-3 flex flex-col gap-2">
                <div className="card border border-gray-300 p-2 rounded">
                    <div className="flex flex-row justify-between items-center">
                        <div className="flex flex-row gap-2 items-center">
                            <img
                                src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRRkMfVDKiEGmlHMh1eDXhG9nadE1H0zGP-g&s'}
                                alt="Carrier"
                                className="h-8 w-8 object-center object-cover bg-blue-50 rounded"
                            />
                            <div className="flex flex-col">
                                <p className='text-sm'>Standard Shipping</p>
                                <p className="text-xs text-gray-500">Estimated delivery: 5-7 days</p>
                            </div>
                        </div>
                        <p className='text-sm'>$10.00</p>
                    </div>
                </div>
                <div className="card border border-gray-300 p-2 rounded">
                    <div className="flex flex-row justify-between items-center">
                        <div className="flex flex-row gap-2 items-center">
                            <img
                                src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRRkMfVDKiEGmlHMh1eDXhG9nadE1H0zGP-g&s'}
                                alt="Carrier"
                                className="h-8 w-8 object-center object-cover bg-blue-50 rounded"
                            />
                            <div className="flex flex-col">
                                <p className='text-sm'>Standard Shipping</p>
                                <p className="text-xs text-gray-500">Estimated delivery: 5-7 days</p>
                            </div>
                        </div>
                        <p className='text-sm'>$10.00</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
