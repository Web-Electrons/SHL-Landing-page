/* eslint-disable @next/next/no-img-element */
import React from 'react'
import { Button } from '@/src/components/ui/button'

// import Carrier1 from '@/public/logo.png'
import Carrier1 from '../components/courrier/canadian.png'
import carir from './courrier/canadian.png'
export const RatesPanel = () => {
    return (
        <div className="flex flex-col px-[20px]">
            <div className="flex flex-row justify-between">
                <p>Rates</p>
                <Button
                    size="xs"
                    variant='ghost'
                    className="border border-gray-300"
                >
                    Refresh
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
                <div className="card border border-gray-300 p-4 rounded">
                    <div className="flex flex-row justify-between items-center">
                        <div className="flex flex-row gap-2 items-center">
                            <img
                                src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRRkMfVDKiEGmlHMh1eDXhG9nadE1H0zGP-g&s'}
                                alt="Carrier"
                                className="h-8 w-8 object-center object-cover bg-blue-50 rounded"
                            />
                            <div className="flex flex-col">
                                <p>Standard Shipping</p>
                                <p className="text-xs text-gray-500">Estimated delivery: 5-7 days</p>
                            </div>
                        </div>
                        <p>$10.00</p>
                    </div>

                </div>
                <div className="card border border-gray-300 p-4 rounded">
                    <div className="flex flex-row justify-between items-center">
                        <div className="flex flex-row gap-2 items-center">
                            <img
                                src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRRkMfVDKiEGmlHMh1eDXhG9nadE1H0zGP-g&s'}
                                alt="Carrier"
                                className="h-8 w-8 object-center object-cover bg-blue-50 rounded"
                            />
                            <div className="flex flex-col">
                                <p>Standard Shipping</p>
                                <p className="text-xs text-gray-500">Estimated delivery: 5-7 days</p>
                            </div>
                        </div>
                        <p>$10.00</p>
                    </div>

                </div>
            </div>
        </div>
    )
}
