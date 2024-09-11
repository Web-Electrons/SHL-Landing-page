/* eslint-disable @next/next/no-img-element */
import React from 'react'

export const CourrierCard = ({ data }) => {
    return (
        <div className="card border border-gray-300 p-2 rounded cursor-pointer hover:bg-red-100  ">
            <div className="flex flex-row justify-between items-center">
                <div className="flex flex-row gap-2 items-center">
                    <img
                        src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRRkMfVDKiEGmlHMh1eDXhG9nadE1H0zGP-g&s'}
                        alt="Carrier"
                        className="h-8 w-8 object-center object-cover bg-blue-50 rounded"
                    />
                    <div className="flex flex-col">
                        <p className='text-sm'>Standard Shipping</p>
                        <p className="text-[10px] text-gray-500">Estimated delivery: 5-7 days</p>
                    </div>
                </div>
                <p className='text-sm'>$10.00</p>
            </div>
        </div>
    )
}
