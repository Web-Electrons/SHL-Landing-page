import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "@/components/ui/use-toast";
import axios from "axios";
import { useEffect, useState } from "react";
import { CourrierCard } from "./CourrierCard";
import { MessageArea } from "./MessageArea";

export const RatesOption = ({
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
  openSummary,
  set_loading_rates,
  setOpenSummary,
  warehouse_id,
  selectedService,
  warehouseCountry,
  ratesMessage,
  formWatch,
}) => {
  const [sortedRates, setSortedRates] = useState([]);

  const [isFastest, setIsFastest] = useState(false);
  useEffect(() => {
    if (Array.isArray(rates)) {
      if (isFastest) {
        const filterFastest = [...rates].sort((a, b) => a.estimatedDays - b.estimatedDays);
        setSortedRates(filterFastest);
      } else {
        const filterCheapest = [...rates].sort((a, b) => a.amount - b.amount);
        setSortedRates(filterCheapest);
      }
    } else {
      setSortedRates([]);
    }
  }, [rates, isFastest]);

  const handleRefresh = () => {
    // Implement refresh logic here

    console.log("Refreshing rates...");
  };

  const addingDataToSummary = ({ id, amount, service_name }) => {
    setSummaryData((prevData) => {
      if (!prevData.find((item) => item.id === id)) {
        return [...prevData, { id, amount: parseFloat(amount.replace("$", "")), service_name }];
      }
      return prevData;
    });
  };

  const removeDataFromSummary = (id) => {
    setSummaryData((prevData) => prevData.filter((item) => item.id !== id));
  };

  const warehouseDestination =
    formWatch?.shipped_to?.country === "USA" ? "KM9" : formWatch?.shipped_to?.country === "CAN" ? "AAA" : "";

  console.log("selecetedData", selecetedData);
  const handleCBF = async () => {
    set_loading_rates(true);
    try {
      const response = await axios.post(`/api/Calculator/CrossBorderForward_Calculation`, {
        warehouse_id: warehouse_id,
        warehouse_id_destination: warehouseDestination,
        broker: "use shiplink broker",
        amountLocal: selecetedData?.amountLocal,
        currencyLocal: selecetedData?.currency,
        addressTo: {
          name: "Shiplink",
          country: formWatch.shipped_to.country,
          state: formWatch.shipped_to.state,
          city: formWatch.shipped_to.city,
          zip: formWatch.shipped_to.zip,
          street1: formWatch.shipped_to.address,
          street2: formWatch.shipped_to.address2,
        },
        parcels: {
          weight: formWatch.dimension.weight,
          mass_unit: formWatch.dimension.weight_unit,
          length: formWatch.dimension.length,
          width: formWatch.dimension.width,
          height: formWatch.dimension.height,
          distance_unit: formWatch.dimension.dimension_unit,
        },
        total_package_value: formWatch?.amountLocal,
        currency_package_value: formWatch?.currencyLocal,
      });

      if (response.data.status === true) {
        const responseData = {
          status: response.data.status,
          message: response.data.message,
          data: response.data,
        };
        setSummaryData(responseData);
        setOpenSummary(true);
        setOpenServicesOption(true);
        return responseData;
      } else {
        toast({
          title: "Error",
          description: response.data.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error in handleHFP:", error);
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      set_loading_rates(false);
    }
  };

  const handleDF = async () => {
    set_loading_rates(true);
    try {
      const response = await axios.post(`/api/Calculator/Forward_Calculation`, {
        warehouse_id: warehouse_id,
        broker: "",
        amountLocal: selecetedData?.amountLocal,
        currencyLocal: selecetedData?.currency,
        parcels: {
          weight: formWatch.dimension.weight,
          mass_unit: formWatch.dimension.weight_unit,
          length: formWatch.dimension.length,
          width: formWatch.dimension.width,
          height: formWatch.dimension.height,
          distance_unit: formWatch.dimension.dimension_unit,
        },
        addressTo: {
          name: formWatch.shipped_to.name,
          country: formWatch.shipped_to.country,
          state: formWatch.shipped_to.state,
          city: formWatch.shipped_to.city,
          zip: formWatch.shipped_to.zip,
          street1: formWatch.shipped_to.address,
          street2: formWatch.shipped_to.address2,
          phone: "",
        },
      });

      if (response.data.status === true) {
        const responseData = {
          status: response.data.status,
          message: response.data.message,
          data: response.data,
        };
        setSummaryData(responseData);
        setOpenSummary(true);
        setOpenServicesOption(true);
        return responseData;
      } else {
        toast({
          title: "Error",
          description: response.data.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error in handleHFP:", error);
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      set_loading_rates(false);
    }
  };

  const handleCalculate = () => {
    if (selectedService === "cbf") {
      handleCBF();
    } else if (selectedService === "forward") {
      handleDF();
    }
  };

  return (
    <div className={`flex h-full w-full flex-col px-[20px]`}>
      <div className="flex h-[90vh] w-full flex-col">
        <div className={showRates === true ? "hidden" : "flex flex-1 flex-col overflow-hidden"}>
          <div className="flex flex-1 flex-col overflow-hidden">
            <div className="flex h-full flex-col">
              <div className="flex flex-row justify-between">
                <p className="text-lg font-bold text-black">Carrier Rates</p>
              </div>

              <div className="mt-[10px] flex flex-row gap-2">
                <Button
                  size="xs"
                  variant="ghost"
                  onClick={() => setIsFastest(false)}
                  className={`border border-gray-300 ${!isFastest ? "border-red-600 bg-red-100 text-red-800" : ""}`}
                >
                  Cheapest
                </Button>
                <Button
                  size="xs"
                  variant="ghost"
                  onClick={() => setIsFastest(true)}
                  className={`border border-gray-300 ${isFastest ? "border-red-600 bg-red-100 text-red-800" : ""}`}
                >
                  Fastest
                </Button>
              </div>

              <ScrollArea className="mt-3 min-h-0 flex-1">
                <div className="list flex flex-col gap-2">
                  {loading_rates ? (
                    <>
                      <Skeleton className={`h-[40px] w-full`} />
                      <Skeleton className={`h-[40px] w-full`} />
                      <Skeleton className={`h-[40px] w-full`} />
                    </>
                  ) : rates.length === 0 && !loading_rates ? (
                    <p className="text-sm text-gray-500">No rates available</p>
                  ) : rates.length > 0 ? (
                    sortedRates.map((rate, index) => (
                      <CourrierCard
                        isSelected={selecetedData === rate}
                        onSelect={setSelectedData}
                        addingDataToSummary={addingDataToSummary}
                        key={index}
                        data={rate}
                      />
                    ))
                  ) : (
                    <p className="text-sm text-gray-500">No rates available</p>
                  )}
                </div>
              </ScrollArea>
              <div className="mt-3 flex shrink-0 flex-col gap-3">
                <MessageArea ratesMessage={ratesMessage} />
                <Button
                  variant="destructive"
                  size="sm"
                  disabled={selecetedData === null}
                  className="w-full"
                  onClick={() => handleCalculate()}
                >
                  Calculate
                </Button>
                <Button
                  variant="redOutline"
                  size="sm"
                  className="w-full"
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
      </div>
    </div>
  );
};
