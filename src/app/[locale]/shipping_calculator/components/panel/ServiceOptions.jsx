import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowRight, Info, Package, Truck, Warehouse } from "lucide-react";

export const ServiceOptions = ({
  rates = [],
  loading_rates,
  getRates,
  setSummaryData,
  setShowRates,
  summaryData,
  setSelectedData,
  selecetedData,
  showRates,
  setOpenServicesOption,
  openRatesOption,
  setOpenRatesOption,
  selectedService,
  setSelectedService,
  handleContinue,
  priceList,
  openServicesOption,
  otherService,
  warehouse_id,
  disbaledService = false,
}) => {
  return (
    <div
      className={`flex max-h-[90vh] flex-col px-[20px] ${openServicesOption ? "pointer-events-none cursor-not-allowed opacity-50" : ""}`}
    >
      <div className="mt-[20px] w-full px-3">
        <div className="mb-[10px] flex flex-row justify-between">
          <p className="text-lg font-bold text-black">Service Option</p>
        </div>
        {/* 🔥 GLOBAL NOTICE */}
        {disbaledService && (
          <div className="mb-4 flex items-start gap-2 rounded-md border border-amber-300 bg-amber-50 p-3">
            <Info className="mt-[2px] h-4 w-4 text-amber-600" />
            <p className="text-xs text-amber-700">
              This warehouse does not support <span className="font-medium">Cross Border Services</span>. You can still
              use other available services.
            </p>
          </div>
        )}

        <ScrollArea className="w-full">
          <RadioGroup onValueChange={(value) => setSelectedService(value)} value={selectedService}>
            <div className="flex w-full flex-col gap-3">
              <div className="flex w-full flex-col space-x-2 rounded-sm border bg-slate-100 p-3">
                <div className="flex flex-row items-start gap-2 space-x-1">
                  <RadioGroupItem value="hfp" id="r1" />
                  <Label className="flex cursor-pointer flex-col" htmlFor="r1">
                    <div className="flex items-center gap-2">
                      <Warehouse className="h-4 w-4" />
                      Hold For Pickup
                    </div>
                    <p className="w-full pt-2 text-xs">
                      Hold package at the warehouse location it was received for you to pick up in person. Fees must be
                      prepaid online, payment is not available at warehouse locations.
                    </p>
                  </Label>
                </div>
              </div>
              <div
                className={`flex flex-col rounded-md border p-3 ${
                  disbaledService ? "bg-gray-100 opacity-60" : "bg-slate-100"
                }`}
              >
                <div className="flex flex-row items-start gap-2 space-x-1">
                  <RadioGroupItem disabled={disbaledService} value="cbp" id="r2" />
                  <Label className="flex cursor-pointer flex-col" htmlFor="r2">
                    <div className="flex items-center gap-2">
                      <Package className="h-4 w-4" />
                      Cross Border Pickup
                    </div>
                    <div className="flex flex-col">
                      <p className="pt-2 text-xs">
                        ShipLink will process your package import and transport it to your selected warehouse in the
                        destination country for you to pick up in person. Fees must be prepaid online, payment is not
                        available at warehouse locations.
                      </p>
                    </div>
                  </Label>
                </div>
              </div>

              <div
                className={`flex flex-col rounded-md border p-3 ${
                  disbaledService ? "bg-gray-100 opacity-60" : "bg-slate-100"
                }`}
              >
                <div className="flex flex-row items-start gap-2 space-x-1">
                  <RadioGroupItem disabled={disbaledService} value="cbf" id="r3" />
                  <Label className="flex cursor-pointer flex-col" htmlFor="r3">
                    <div className="flex items-center gap-2">
                      <Truck className="h-4 w-4" />
                      Cross Border Forward
                    </div>
                    <p className="pt-2 text-xs">
                      ShipLink will process your package import and ship it to your selected address domestically, from
                      within the destination country.
                    </p>
                  </Label>
                </div>
              </div>
              <div className="flex flex-col space-x-2 rounded-sm border bg-slate-100 p-3">
                <div className="flex flex-row items-start gap-2 space-x-1">
                  <RadioGroupItem value="forward" id="r4" />
                  <Label className="flex cursor-pointer flex-col" htmlFor="r4">
                    <div className="flex items-center gap-2">
                      <ArrowRight className="h-4 w-4" />
                      Forward Package
                    </div>
                    <p className="pt-2 text-xs">
                      Ship your package directly to your selected address, either domestic or international using your
                      selected carrier&apos;s own customs import process.
                    </p>
                  </Label>
                </div>
              </div>
            </div>
          </RadioGroup>
        </ScrollArea>

        <Button className="mt-4 w-full" id="continue_service" variant="destructive" onClick={handleContinue}>
          Next
        </Button>
      </div>
    </div>
  );
};
