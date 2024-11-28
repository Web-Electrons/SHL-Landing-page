/* eslint-disable @next/next/no-img-element */
import React from 'react'
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'
import Image from 'next/image'

export const ItemList = ({
    title,
    description,
    number = 1,
    image = null,
    src = null,
    link,
    bestFor,
    whyShopHere,
    alt
}) => {
    return (
        <div className="flex flex-col gap-3">
            <div className="flex flex-col items-start">
                <div className="flex flex-row gap-3 items-center text-2xl">
                    <p className="bg-opacity-10  text-xl text-center bg-slate-600 rounded p-2 w-[40px]">
                        {number}
                    </p>
                    <p className='font-bold'>
                        {title}
                    </p>
                </div>
            </div>
            <Separator />

            <div className="container my-2 flex items-start bg-white  rounded">

                {
                    src ? (
                        <img
                            src={src}
                            alt={alt}
                            width={300}
                            height={300}
                            className='w-full h-[200px] object-contain'
                        />
                    ) : (
                        <Image
                            alt={alt}
                            src={image || ''}
                            width={300}
                            height={300}
                            className='w-full h-[200px] object-contain'
                        />
                    )
                }
            </div>
            <div className="">
                <p><span className='font-bold'>Best For : </span>{bestFor}</p>
            </div>
            <div className="my-2">
                {description}
            </div>
            <div className="flex gap-1">
                <p className='font-bold'>🌐 Website : </p>
                <Link
                    passHref
                    href={link}
                    target='_blank'
                >
                    <p className='text-myBlue underline'>
                        {link}
                    </p>
                </Link>
            </div>
            <div className="flex gap-1">
                <p>
                    <span className='font-bold text-nowrap'>🛍️ Why Shop Here? : </span>
                    {whyShopHere}
                </p>
                {/* <p>{whyShopHere}</p> */}
            </div>
        </div>
    )
}
