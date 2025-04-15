/* eslint-disable @next/next/no-img-element */
'use client'
import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/tableDashboard'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import axios from 'axios'
import { FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Skeleton } from '@/components/ui/skeleton'
export const ServiceTable = ({
    serviceList,
    otherService,
    warehouse,
    form,
    selectedData,
    handleValueChange,
    checkCoutryCode,
    warehouseServiceList,
    loadingService
}) => {

    const formatCurrency = (value = 0, currency) => {
        return new Intl.NumberFormat('en-ID', {
            style: 'currency',
            currency: currency || 'USD',
            minimumIntegerDigits: 1,
            maximumFractionDigits: 2
        }).format(value)
    }


    return (
        <div className=" space-y-3">
            <div className="">
                <FormField
                    control={form.control}
                    name="mailboxSelected"
                    render={({ field }) => (
                        <FormItem
                            className="w-full"
                        >
                            <FormLabel className="font-bold">Select Your Mailbox <span className='text-red-600'>*</span></FormLabel>
                            <FormControl
                                className="w-full"
                            >
                                <Select
                                    className='text-xs'
                                    // onValueChange={handleValueChange(field.value)}
                                    onValueChange={(value) => handleValueChange(value)}
                                    defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger className='text-xs  h-[36px]'>
                                            <SelectValue placeholder="Select Mailbox">
                                                <div className="flex flex-row gap-2 items-center ">
                                                    <img
                                                        // src={`https://flagcdn.com/w640/ca.png`}
                                                        src={`https://flagcdn.com/h80/${checkCoutryCode(form.watch('shipped_from.country'))}.jpg`}
                                                        srcSet={`https://flagcdn.com/h80/${checkCoutryCode(form.watch('shipped_from.country'))}.jpg 2x`} alt=""
                                                        className='rounded-full w-6 h-6 border border-blue-50 object-center object-cover'
                                                    />
                                                    {/* <p>- {field.value}</p> */}
                                                    <p>{selectedData()}</p>
                                                </div>
                                            </SelectValue>
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent >
                                        {
                                            warehouse?.map((item, index) => (
                                                <SelectItem
                                                    key={index}
                                                    className="text-xs"
                                                    value={item?.warehouse_code}
                                                >
                                                    {`${item?.city}, ${item?.province_code}, ${item?.postal_code}, ${item?.country_code}`}
                                                </SelectItem>
                                            ))
                                        }

                                    </SelectContent>
                                </Select>
                            </FormControl>
                        </FormItem>

                    )}
                />

            </div>
            <div className="pb-2">

                <div className="flex flex-row justify-between mb-[10px]">
                    <p className='text-black text-sm font-bold '>Package Services</p>
                </div>

                <Table>
                    <TableHeader>
                        <TableRow className="bg-white text-black hover:bg-slate-100 border-none">
                            <TableHead className="w-[300px] text-black text-xs">Service</TableHead>
                            <TableHead className=" text-xs text-black">Description</TableHead>
                            <TableHead className="text-right text-black  text-xs">Fee</TableHead>
                        </TableRow>
                    </TableHeader>
                    {/* <TableBody>
                        {
                            serviceList?.map((item, index) => (
                                <TableRow
                                    className="border-none"
                                    key={index}>
                                    <TableCell className="font-medium text-xs border-x-0">{item.service}</TableCell>
                                    <TableCell className="text-xs border-x-0">
                                        {item.description}
                                    </TableCell>
                                    <TableCell className="text-right text-xs border-x-0  tabular-nums">{formatCurrency(item.price, item.currency)}</TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody> */}
                    <TableBody>
                        {
                            loadingService ? (
                                <TableRow className="border-none">
                                    {
                                        Array.from({ length: 3 }).map((_, index) => (
                                            <TableCell key={index} className="animate-pulse border-x-0">
                                                <Skeleton className="w-20 h-4" />
                                            </TableCell>
                                        ))
                                    }
                                </TableRow>
                            ) : serviceList.length > 0 ? (

                                serviceList?.map((item, index) => (
                                    <TableRow
                                        className="border-none"
                                        key={index}>
                                        <TableCell className="font-medium text-xs border-x-0">{item.service}</TableCell>
                                        <TableCell className="text-xs border-x-0">
                                            {item.description}
                                        </TableCell>
                                        <TableCell className="text-right text-xs border-x-0  tabular-nums">{formatCurrency(item.price, item.currency)}</TableCell>
                                    </TableRow>
                                ))

                            ) : (
                                <TableRow className="border-none">
                                    <TableCell className="text-center text-xs border-x-0" colSpan={3}>No data found</TableCell>
                                </TableRow>
                            )
                        }
                        {/* {
                            serviceList?.map((item, index) => (
                                <TableRow
                                    className="border-none"
                                    key={index}>
                                    <TableCell className="font-medium text-xs border-x-0">{item.service}</TableCell>
                                    <TableCell className="text-xs border-x-0">
                                        {item.description}
                                    </TableCell>
                                    <TableCell className="text-right text-xs border-x-0  tabular-nums">{formatCurrency(item.price, item.currency || "USD")}</TableCell>
                                </TableRow>
                            ))
                        } */}
                    </TableBody>
                </Table>
            </div>
            <div className="">
                <div className="flex flex-row justify-between mb-[10px]">
                    <p className='text-black text-sm font-bold '>Other Services</p>
                </div>

                <Table>
                    <TableHeader>
                        <TableRow className="bg-white text-black hover:bg-slate-100 border-none">
                            <TableHead className="w-[300px] text-black text-xs">Service</TableHead>
                            <TableHead className=" text-xs text-black">Description</TableHead>
                            <TableHead className="text-right text-black  text-xs">Fee</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            loadingService ? (
                                <TableRow className="border-none">
                                    {
                                        Array.from({ length: 3 }).map((_, index) => (
                                            <TableCell key={index} className="animate-pulse border-x-0">
                                                <Skeleton className="w-20 h-4" />
                                            </TableCell>
                                        ))
                                    }
                                </TableRow>
                            ) : otherService?.length > 0 ? (
                                otherService?.map((item, index) => (
                                    console.log("CURRENCY", item),
                                    <TableRow
                                        className="border-none"
                                        key={index}>
                                        <TableCell className="font-medium text-xs border-x-0">{item.service}</TableCell>
                                        <TableCell className="text-xs border-x-0">
                                            {item.description}
                                        </TableCell>
                                        <TableCell className="text-right text-xs border-x-0  tabular-nums">
                                            {item?.service === "Brokerage fee - US import" ? "Contact us" : (formatCurrency(item.price, item.currency))}
                                        </TableCell>
                                    </TableRow>
                                ))

                            ) : (
                                <TableRow className="border-none">
                                    <TableCell className="text-center text-xs border-x-0" colSpan={3}>No data found</TableCell>
                                </TableRow>
                            )
                        }

                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
