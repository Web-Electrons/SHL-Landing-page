/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";

import { Card, CardContent } from "@/components/ui/card";

import React from "react";
import { Separator } from "@/components/ui/separator";
import { formatCurrency, formatDecimal } from "@/lib/utils";

export const Summary = ({
  rates = [],
  loading_rates,
  summaryData,
  selecetedData,
  setSelectedData,
  setShowRates,
  setOpenServicesOption,
  selectedService,
}) => {
  const login = process.env.NEXT_PUBLIC_LOGIN_URL;
  const [isFastest, setIsFastest] = useState(false);
  const [sortedRates, setSortedRates] = useState([]);

  const handleRefresh = () => {
    // Implement refresh logic here

    console.log("Refreshing rates...");
  };

  const [total, setTotal] = useState(0);

  useEffect(() => {
    let total = 0;
    let carrierTotal = selecetedData?.amountLocal || 0;
    summaryData?.data?.services.forEach((item) => {
      total += item?.amount;
    });
    setTotal(total + carrierTotal);
  }, [summaryData, selecetedData]);

  const dataDetails = summaryData?.data?.services?.filter(
    (item) =>
      !item.service?.toLowerCase().includes("brokerage") && !item.service?.toLowerCase().includes("charge fee for")
  );

  const dataBrokerage = summaryData?.data?.services?.filter(
    (item) =>
      item.service?.toLowerCase().includes("brokerage") || item.service?.toLowerCase().includes("charge fee for")
  );

  return (
    <div className="flex h-full flex-col">
      <div className="flex flex-row justify-between">
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

      <ScrollArea className="mt-3 h-[80%]">
        <div className="list flex flex-col gap-2">
          <div className="">
            <Card className="border-none p-0">
              <CardContent className="space-y-2 px-0">
                <div className="">
                  <p className="p-1 text-sm font-bold">Summary</p>
                  {dataDetails?.map((item, index) => (
                    <div key={index} className="flex w-full items-center justify-between gap-2 rounded-lg p-1">
                      <div className="inline-flex gap-2">
                        <span className="text-left text-xs font-medium">{item?.service}</span>
                      </div>
                      <span className="text-xs">
                        {formatCurrency(item?.currency)}
                        {formatDecimal(item?.price)}
                      </span>
                    </div>
                  ))}

                  {(summaryData?.data?.taxes?.length > 0 || dataBrokerage?.length > 0) && (
                    <div className="mt-2 flex w-full items-center justify-between gap-2 border-b border-t p-1 py-2">
                      <span className="text-left text-xs font-bold">Subtotal</span>
                      <span className="text-xs font-bold">
                        {formatCurrency(summaryData?.data?.currency)}
                        {formatDecimal(summaryData?.data?.subtotal_summary)}
                      </span>
                    </div>
                  )}

                  {dataBrokerage?.length > 0 && (
                    <>
                      <p className="mt-2 p-1 text-xs font-bold">Brokerage</p>
                      {dataBrokerage?.map((item, index) => (
                        <div key={index} className="flex w-full items-center justify-between gap-2 rounded-lg p-1">
                          <div className="inline-flex gap-2">
                            <span className="text-left text-xs font-medium">{item?.service}</span>
                          </div>
                          <span className="text-xs">
                            {formatCurrency(item?.currency)}
                            {formatDecimal(item?.price)}
                          </span>
                        </div>
                      ))}
                    </>
                  )}

                  {summaryData?.data?.taxes?.length > 0 && (
                    <p className={`mt-2 p-1 text-xs font-bold ${dataBrokerage?.length > 0 ? "border-t pt-2" : ""}`}>
                      Taxes
                    </p>
                  )}
                  {summaryData?.data?.taxes?.map((item, index) => (
                    <div key={index} className="flex w-full items-center justify-between gap-2 rounded-lg p-1">
                      <div className="inline-flex gap-2">
                        <span className="text-left text-xs font-medium">{item?.tax_abbreviation}</span>
                      </div>
                      <span className="text-xs">
                        {formatCurrency(summaryData?.data?.currency)}
                        {formatDecimal(item?.total_tax_price)}
                      </span>
                    </div>
                  ))}
                </div>
                <Separator />
                <div className="">
                  <div className="flex flex-row justify-between p-1">
                    <p className="text-sm font-bold">Total</p>
                    <div className="flex flex-col gap-2">
                      <div className="flex justify-end gap-2 text-xs font-bold">
                        <span>{summaryData?.data?.currency}</span>
                        <span className="font-bold">${formatDecimal(summaryData?.data?.total)}</span>
                      </div>
                      {summaryData?.data?.total_usd && summaryData?.data?.currency === "CAD" ? (
                        <div className="flex justify-end gap-2 text-xs font-bold">
                          <span>USD</span>
                          <span className="font-bold">${formatDecimal(summaryData?.data?.total_usd)}</span>
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
                <div className="">
                  <Link passHref className="w-full" href={`${login}`}>
                    <Button variant="destructive" className="mt-3 w-full">
                      Start Saving
                    </Button>
                  </Link>
                  <Button
                    variant="redOutline"
                    className="mt-3 w-full"
                    onClick={() => {
                      setOpenServicesOption(false);
                      setShowRates(false);
                      setSelectedData(null);
                    }}
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
  );
};
