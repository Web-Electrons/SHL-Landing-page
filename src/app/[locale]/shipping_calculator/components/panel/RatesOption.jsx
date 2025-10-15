import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Card, CardContent } from '@/components/ui/card'
import { Package, Truck, Warehouse } from 'lucide-react'
import { Checkbox } from '@/components/ui/checkbox'
import { Skeleton } from '@/components/ui/skeleton'
import { CourrierCard } from './CourrierCard'
import { Summary } from './Summary'
import { toast } from '@/components/ui/use-toast'
import axios from 'axios'

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
  formWatch,
}) => {
  const [sortedRates, setSortedRates] = useState([])

  const [isFastest, setIsFastest] = useState(false)
  useEffect(() => {
    if (Array.isArray(rates)) {
      if (isFastest) {
        const filterFastest = [...rates].sort((a, b) => a.estimatedDays - b.estimatedDays)
        setSortedRates(filterFastest)
      } else {
        const filterCheapest = [...rates].sort((a, b) => a.amount - b.amount)
        setSortedRates(filterCheapest)
      }
    } else {
      setSortedRates([])
    }
  }, [rates, isFastest])

  const handleRefresh = () => {
    // Implement refresh logic here

    console.log('Refreshing rates...')
  }

  const addingDataToSummary = ({ id, amount, service_name }) => {
    setSummaryData(prevData => {
      if (!prevData.find(item => item.id === id)) {
        return [...prevData, { id, amount: parseFloat(amount.replace('$', '')), service_name }]
      }
      return prevData
    })
  }

  const removeDataFromSummary = id => {
    setSummaryData(prevData => prevData.filter(item => item.id !== id))
  }

  console.log('FORMWTACH', formWatch?.shipped_to?.country)

  const warehouseDestination =
    formWatch?.shipped_to?.country === 'USA'
      ? 'KM9'
      : formWatch?.shipped_to?.country === 'CAD'
        ? 'AAA'
        : ''

          console.log('selecetedData', selecetedData)
  const handleCBF = async () => {
    set_loading_rates(true)
    try {
      const response = await axios.post(`/api/Calculator/CrossBorderForward_Calculation`, {
        warehouse_id: warehouse_id,
        warehouse_id_destination: warehouseDestination,
        broker: 'use shiplink broker',
        amountLocal: selecetedData?.amountLocal,
        currencyLocal: selecetedData?.currencyLocal,
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
      })

      if (response.data.status === true) {
        const responseData = {
          status: response.data.status,
          message: response.data.message,
          data: response.data,
        }
        setSummaryData(responseData)
        setOpenSummary(true)
        setOpenServicesOption(true)
        return responseData
      } else {
        toast({
          title: 'Error',
          description: response.data.message,
          variant: 'destructive',
        })
      }
    } catch (error) {
      console.error('Error in handleHFP:', error)
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      })
    } finally {
      set_loading_rates(false)
    }
  }

  console.log('FORMWATCH', selectedService)
  const handleDF = async () => {
    set_loading_rates(true)
    try {
      const response = await axios.post(`/api/Calculator/Forward_Calculation`, {
        warehouse_id: warehouse_id,
        broker: '',
        amountLocal: selecetedData?.amountLocal,
        currencyLocal: selecetedData?.currencyLocal,
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
        },
      })

      if (response.data.status === true) {
        const responseData = {
          status: response.data.status,
          message: response.data.message,
          data: response.data,
        }
        setSummaryData(responseData)
        setOpenSummary(true)
        setOpenServicesOption(true)
        return responseData
      } else {
        toast({
          title: 'Error',
          description: response.data.message,
          variant: 'destructive',
        })
      }
    } catch (error) {
      console.error('Error in handleHFP:', error)
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      })
    } finally {
      set_loading_rates(false)
    }
  }

  const handleCalculate = () => {
    if (selectedService === 'cbf') {
      handleCBF()
    } else if (selectedService === 'forward') {
      handleDF()
    }
  }

  return (
    <div className={`flex flex-col px-[20px] h-full w-full`}>
      <div className="w-full h-[90vh]">
        <div className={showRates === true ? 'hidden' : 'block'}>
          <div className="flex flex-col h-full">
            <div className="flex flex-row justify-between">
              <p className="text-black text-lg font-bold">Carrier Rates</p>
            </div>

            <div className="flex flex-row gap-2 mt-[10px]">
              <Button
                size="xs"
                variant="ghost"
                onClick={() => setIsFastest(false)}
                className={`border border-gray-300 ${!isFastest ? 'bg-red-100 border-red-600 text-red-800' : ''}`}
              >
                Cheapest
              </Button>
              <Button
                size="xs"
                variant="ghost"
                onClick={() => setIsFastest(true)}
                className={`border border-gray-300 ${isFastest ? 'bg-red-100 border-red-600 text-red-800' : ''}`}
              >
                Fastest
              </Button>
            </div>

            <ScrollArea className="h-[70vh] mt-3">
              <div className="list flex flex-col gap-2">
                {loading_rates ? (
                  <>
                    <Skeleton className={`w-full h-[40px]`} />
                    <Skeleton className={`w-full h-[40px]`} />
                    <Skeleton className={`w-full h-[40px]`} />
                  </>
                ) : rates.length === 0 && !loading_rates ? (
                  <p className="text-gray-500 text-sm">No rates available</p>
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
                  <p className="text-gray-500 text-sm">No rates available</p>
                )}
              </div>
            </ScrollArea>
          </div>
          <div className="mt-5">
            <Button
              variant="destructive"
              size="sm"
              disabled={selecetedData === null}
              className="w-full mt-3"
              onClick={() => handleCalculate()}
            >
              Calculate
            </Button>
            <Button
              variant="redOutline"
              size="sm"
              className="w-full mt-3"
              onClick={() => {
                setShowRates(false)
                setOpenServicesOption(false)
              }}
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
