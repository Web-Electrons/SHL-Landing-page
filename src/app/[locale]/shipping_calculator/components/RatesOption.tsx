import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { sortRates, type RateSortMode } from "@/features/shipping_calculator/services/shipping.helpers";
import type { CourierRate, ShippingFormValues, SummaryData } from "@/features/shipping_calculator/types/shipping.types";
import { useEffect, useState } from "react";
import { CourrierCard } from "./panel/CourrierCard";

interface RatesOptionProps {
  rates: CourierRate[];
  loading_rates: boolean;
  getRates: () => void;
  setSummaryData: (data: SummaryData | null) => void;
  setShowRates: (show: boolean) => void;
  summaryData: SummaryData | null;
  setSelectedData: (rate: CourierRate | null) => void;
  selecetedData: CourierRate | null;
  showRates: boolean;
  setOpenServicesOption: (open: boolean) => void;
  openSummary: boolean;
  set_loading_rates: (loading: boolean) => void;
  setOpenSummary: (open: boolean) => void;
  warehouse_id: string;
  selectedService: string;
  warehouseCountry: string;
  formWatch: ShippingFormValues;
  handleCalculate: () => Promise<void>;
}

export const RatesOption = ({
  rates = [],
  loading_rates,
  setSelectedData,
  selecetedData,
  showRates,
  setOpenServicesOption,
  setShowRates,
  handleCalculate,
}: RatesOptionProps) => {
  const [sortMode, setSortMode] = useState<RateSortMode>("cheapest");
  const [sortedRates, setSortedRates] = useState<CourierRate[]>([]);

  useEffect(() => {
    if (Array.isArray(rates)) {
      setSortedRates(sortRates(rates, sortMode));
    } else {
      setSortedRates([]);
    }
  }, [rates, sortMode]);

  return (
    <div className="flex h-full w-full flex-col px-[20px]">
      <div className="h-[90vh] w-full">
        <div className={showRates ? "hidden" : "block"}>
          <div className="flex h-full flex-col">
            {/* Header */}
            <div className="flex flex-row justify-between">
              <p className="text-lg font-bold text-black">Carrier Rates</p>
            </div>

            {/* Sort Buttons */}
            <div className="mt-[10px] flex flex-row gap-2">
              <Button
                size="xs"
                variant="ghost"
                type="button"
                onClick={() => setSortMode("cheapest")}
                className={`border border-gray-300 ${
                  sortMode === "cheapest" ? "border-red-600 bg-red-100 text-red-800" : ""
                }`}
              >
                Cheapest
              </Button>
              <Button
                size="xs"
                variant="ghost"
                type="button"
                onClick={() => setSortMode("fastest")}
                className={`border border-gray-300 ${
                  sortMode === "fastest" ? "border-red-600 bg-red-100 text-red-800" : ""
                }`}
              >
                Fastest
              </Button>
            </div>

            {/* Rate List */}
            <ScrollArea className="mt-3 h-[70vh]">
              <div className="list flex flex-col gap-2">
                {loading_rates ? (
                  <>
                    <Skeleton className="h-[40px] w-full" />
                    <Skeleton className="h-[40px] w-full" />
                    <Skeleton className="h-[40px] w-full" />
                  </>
                ) : sortedRates.length > 0 ? (
                  sortedRates.map((rate, index) => (
                    <CourrierCard
                      key={index}
                      isSelected={selecetedData === rate}
                      onSelect={setSelectedData}
                      data={rate}
                    />
                  ))
                ) : (
                  <p className="text-sm text-gray-500">No rates available</p>
                )}
              </div>
            </ScrollArea>
          </div>

          {/* Action Buttons */}
          <div className="mt-5">
            <Button
              variant="destructive"
              size="sm"
              type="button"
              disabled={selecetedData === null}
              className="mt-3 w-full"
              onClick={handleCalculate}
            >
              Calculate
            </Button>
            <Button
              variant="redOutline"
              size="sm"
              type="button"
              className="mt-3 w-full"
              onClick={() => {
                setShowRates(false);
                setOpenServicesOption(false);
              }}
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
