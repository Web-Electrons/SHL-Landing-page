'use client'
import React from 'react'
import { Separator } from '@/components/ui/separator'

export const GuideListTemplate = (
    {
        title,
        description,
        id,
        children
    }
) => {
    return (
        <div
            id={id}
            className="my-4">
            <h1 className=" text-myBlue text-2xl font-bold">
                # {title}
            </h1>
            <Separator className="w-full my-2" />
            <p>
                {description}
            </p>
            <div className="">
                {children}
            </div>
        </div>
    )
}
