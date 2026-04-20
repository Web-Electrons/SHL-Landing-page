/* eslint-disable @next/next/no-img-element */
'use client'
import Loading from '@/app/loading'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle
} from '@/components/ui/sheet'
import { Skeleton } from '@/components/ui/skeleton'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useToast } from '@/components/ui/use-toast'
import { yupResolver } from '@hookform/resolvers/yup'
import axios from 'axios'
import { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useMediaQuery } from 'react-responsive'
import * as yup from 'yup'
import { ServiceTable } from './components/ServiceTable'
import DeclareTable from './components/forms/DeclareTable'
import { Dimension } from './components/forms/Dimension'
import { ShippedTo } from './components/forms/ShippedTo'
import { RatesOption } from './components/panel/RatesOption'
import { ServiceOptions } from './components/panel/ServiceOptions'
import { SummaryPanel } from './components/panel/SummaryPanel'
import { ShiptoForm } from './components/shiptoForm'
import styles from './styles.module.scss'

const formSchema = yup.object().shape({
  dimension: yup.object().shape({
    length: yup
      .number()
      .typeError('Length must be a number')
      .required('Package length is required')
      .min(1, 'Length must be greater than 0'),

    width: yup
      .number()
      .typeError('Width must be a number')
      .required('Package width is required')
      .min(1, 'Width must be greater than 0'),

    height: yup
      .number()
      .typeError('Height must be a number')
      .required('Package height is required')
      .min(1, 'Height must be greater than 0'),

    weight: yup
      .number()
      .typeError('Weight must be a number')
      .required('Package weight is required')
      .min(0.01, 'Weight must be greater than 0'),

    weight_unit: yup
      .string()
      .required('Weight unit is required'),

    dimension_unit: yup
      .string()
      .required('Dimension unit is required'),
  }),
  shipped_from: yup.object().shape({
    country: yup.string(),
    state: yup.string(),
    city: yup.string(),
    zip: yup.string(),
    address: yup.string(),
    warehouse_code: yup.string(),
  }),
  shipped_to: yup.object().shape({
    name: yup.string(),
    country: yup.string(),
    state: yup.string(),
    city: yup.string(),
    zip: yup.string(),
    address: yup.string(),
    address2: yup.string(),
    email: yup.string(),
    phone: yup.string(),
  }),
  shippingType: yup.string(),
  warehouse_destination: yup.string(),
  warehouse_destination_country: yup.string(),
  mailboxSelected: yup.string(),

  package_content: yup.array().of(
    yup.object({
      id: yup.string(),
      tracking_id: yup.string().nullable(),
      qty: yup.number(),
      value: yup.number(),
      desc: yup.string(),
      hs_desc: yup.string().nullable(),
      hs_code: yup.string().nullable(),
      made_in: yup.string().nullable(),
      currency: yup.string(),
      subtotal: yup.number(),
    })
  ),
  total_package_value: yup.number(),
  currency_package_value: yup.string(),
})

export default function Home() {
  const tableMode = useMediaQuery({ query: '(max-width: 950px)' })

  const { toast } = useToast()
  const [warehouse, setWarehouse] = useState([])
  const [selectedWarehouseFrom, setSelectedWarehouseFrom] = useState(null)
  const isServiceDisabled = (setting) => {
    console.log('setting', setting)
    if (!setting) return false
    return setting.toLowerCase() === 'disable'
  }
  const [courierRates, setCourierRates] = useState([])
  const [country, setCountry] = useState([])
  const [disabledForm, setDisabledForm] = useState(false)
  const [loading_rates, set_loading_rates] = useState(false)
  const [openRates, setOpenRates] = useState(false)
  const [openServicesOption, setOpenServicesOption] = useState(false)
  const [summaryData, setSummaryData] = useState([])
  const [selecetedData, setSelectedData] = useState(null)
  const [openRatesOption, setOpenRatesOption] = useState(false)
  const [openSummary, setOpenSummary] = useState(false)
  const [selectedService, setSelectedService] = useState('hfp')
  const [serviceList, setServiceList] = useState([])
  const [otherService, setOtherService] = useState([])
  const [warehouse_id, setWarehouseId] = useState('')
  const [openSheet, setOpenSheet] = useState(false)
  const [open, setOpen] = useState(false)
  const [loadingWarehouse, setLoadingWarehouse] = useState(false)
  const [warehousesServiceList, setwarehousesServiceList] = useState(null)
  const [warehouseDestination_id, setWarehouseDestination_id] = useState('')
  const [warehouseCountry, setWarehouseCountry] = useState('')


  console.log('otherService', otherService)
  console.log('serviceList', serviceList)
  const form = useForm({
    resolver: yupResolver(formSchema),
    defaultValues: {
      dimension: {
        weight_unit: 'lbs',
        dimension_unit: 'in',
        weight: 0,
        length: 0,
        width: 0,
        height: 0,
      },
      shipped_to: {
        name: '',
        country: '',
        state: '',
        city: '',
        zip: '',
        address: '',
        address2: '',
      },
      shipped_from: {
        address2: '',
      },
      shippingType: '',
      warehouse_destination: '',
      warehouse_destination_country: '',
      mailboxSelected: 'VRN',
      package_content: [],
      currency_package_value: 'CAD',
      total_package_value: 0,
    },
    mode: 'onChange',
  })

  useEffect(() => {
    const countryList = async () => {
      try {
        const response = await axios.post(`/api/country/list`, {
          keyword: '',
          page: 1,
          limit: 999,
          index: 0,
        })
        const responseData = response.data.country
        setCountry(responseData)
        return responseData || []
      } catch (error) {
        console.error(error)
      }
    }
    countryList()
  }, [])

  const warehouseList = useCallback(async () => {
    setLoadingWarehouse(true)
    try {
      const response = await axios.post(`/api/warehouse/list`, {
        keyword: '',
        page: 1,
        limit: 10,
        index: 0,
      })
      const responseData = response.data.warehouse
      const filteredWarehouse = responseData.filter(
        item => item.warehouse_code !== 'AAA' && item.warehouse_code !== 'BBB'
      )
      const getFirstWarehouse = filteredWarehouse[0]
      const preferredCodes = ['SHN', 'VRN']
      const intialMNYWarehouse =
        filteredWarehouse.find(item =>
          preferredCodes.includes(item.warehouse_code)
        ) || getFirstWarehouse
      setWarehouse(filteredWarehouse)
      handleAssingData(intialMNYWarehouse)
      setSelectedWarehouseFrom(intialMNYWarehouse)
      setWarehouseId(intialMNYWarehouse?.warehouse_id)
      setWarehouseCountry(intialMNYWarehouse?.country_code)

      return filteredWarehouse || []
    } catch (error) {
      console.error(error)
    } finally {
      setLoadingWarehouse(false)
    }
  }, [])

  useEffect(() => {
    warehouseList()
  }, [])

  const [loadingService, setLoadingService] = useState(false)

  const currencyLabel = {
    USD: 'US',
    CAD: 'CA',
  }

  const getDisplayService = item => {
    const name = item.service
    const currency = item.currency

    const label = currencyLabel[currency] || currency

    return currency
      ? `${name} - ${label}`
      : name
  }

  const getServicesList = async (warehouse_id) => {
    setLoadingService(true)

    try {
      const [serviceListResponse, warehouseServiceResponse] = await Promise.all([
        axios.get(`/api/Service_list`),
        axios.post(`/api/public/WarehouseServices_list`, { warehouse_id }),
      ])

      const serviceListData = serviceListResponse.data.data || []
      const warehouseServiceData = warehouseServiceResponse.data.data || []

      const normalize = str =>
        str?.toLowerCase().trim().replace(/\s+/g, ' ')

      // =========================
      // DESCRIPTIONS
      // =========================
      const descriptions = {
        'Hold for Pickup':
          'Pick up your package in person from a warehouse location.',
        'Cancel Consolidate':
          'Cancel the package consolidation process.',
        'Cross Border Pickup':
          'We import your package and you pickup in person from a local warehouse',
        'Cross Border Forward':
          'We import your package and forward it domestically to your final destination with the carrier you select',
        'Forward Package':
          'Internationally directly to the address of your choice with the carrier you select',
        'Package Forward':
          'Internationally directly to the address of your choice with the carrier you select',
        Consolidate: 'Combine multiple packages into one package.',
        'Request More Picture': 'Request additional photos of your package.',
        'Package Reception US': 'Receive your package at our US warehouse.',
        'Package Reception CA': 'Receive your package at our CA warehouse.',
        'Carrier Rate': 'Check carrier rates for your package.',
        'Brokerage fee - CA import':
          'Brokerage service for package with value over $20 CAD',
        'Brokerage fee - US import':
          'Brokerage service for package with value over $800 USD.',
        'Free Membership': 'Enjoy free membership benefits.',
        'Request Picture': 'Request additional photos of your package.',
        'Pallet Reception US': 'Receive your Pallet at our US warehouse.',
        'Pallet Forward':
          'Internationally directly to the address of your choice with the carrier you select',
        'Pallet HFP':
          'Pick up your Pallet in person from a warehouse location.',
        'Pallet Reception CA': 'Receive your Pallet at our CA warehouse.',
      }

      // =========================
      // 1. ACTIVE FILTER
      // =========================
      const activeGlobal = serviceListData.filter(s => s.status === 'Active')
      const activeWarehouse = warehouseServiceData

      // =========================
      // 2. MULTI CURRENCY SERVICES RULE
      // =========================
      const multiCurrencyServices = new Set([
        'cross border pickup',
        'cross border forward',
        'brokerage fee - ca import',
        'brokerage fee - us import',
      ])

      const getKey = item => {
        const name = normalize(item.service)
        const isMulti = multiCurrencyServices.has(name)

        return isMulti ? `${name}|${item.currency}` : name
      }

      // =========================
      // 3. WAREHOUSE DEDUPE
      // =========================
      const warehouseMap = new Map()

      activeWarehouse.forEach(item => {
        const key = getKey(item)

        if (!warehouseMap.has(key)) {
          warehouseMap.set(key, item)
        }
      })

      const warehouseList = Array.from(warehouseMap.values()).map(item => ({
        ...item,
        display_service: item.currency
          ? `${item.service} - ${item.currency}`
          : item.service,
        description:
          descriptions[item.service] || 'No description available.',
        source: 'warehouse',
      }))

      // =========================
      // 4. WAREHOUSE KEY SET
      // =========================
      const warehouseNameSet = new Set(warehouseList.map(getKey))

      // =========================
      // 5. GLOBAL FILTER
      // =========================
      const otherMap = new Map()

      activeGlobal.forEach(item => {
        const key = getKey(item)

        // skip if exists in warehouse
        if (warehouseNameSet.has(key)) return

        if (!otherMap.has(key)) {
          otherMap.set(key, item)
        }
      })
      const otherList = Array.from(otherMap.values()).map(item => ({
        ...item,
        display_service: getDisplayService(item),
        description:
          descriptions[item.service] || 'No description available.',
        source: 'global',
      }))
      // =========================
      // 6. DEBUG
      // =========================
      console.log('WAREHOUSE:', warehouseList.map(s => s.display_service))
      console.log('OTHER:', otherList.map(s => s))

      // =========================
      // 7. SET STATE
      // =========================
      setServiceList(warehouseList)
      setOtherService(otherList)

    } catch (e) {
      console.error(e)
    } finally {
      setLoadingService(false)
    }
  }



  const fetchServiceList = async warehouse_id => {
    try {
      const response = await axios.post('/api/public/WarehouseServices_list', {
        warehouse_id: warehouse_id,
      })
      const data = response.data.data
      setwarehousesServiceList(data)
    } catch (error) {
      console.error('Failed to fetch service list:', error)
      return []
    }
  }

  useEffect(() => {
    if (warehouse_id) {
      fetchServiceList(warehouse_id)
    }
  }, [warehouse_id])

  useEffect(() => {
    getServicesList(warehouse_id)
  }, [warehouse_id])

  const [showRates, setShowRates] = useState(false)
  const [tabsName, setTabsName] = useState('mailbox')

  const checkCoutryCode = code => {
    if (code === undefined) {
      return 'ca'
    } else {
      if (code === 'MEX') {
        return 'mx'
      } else if (code?.length >= 2) {
        return code.substring(0, 2).toLowerCase()
      } else {
        return code.toLowerCase()
      }
    }
  }

  const selectedData = () => {
    if (form.watch('shipped_from') === undefined) {
      return 'Select Mailbox'
    } else {
      const shipped_from = form.watch('shipped_from')
      return shipped_from.city === undefined
        ? 'Select Mailbox'
        : `${shipped_from.city}, ${shipped_from.state}, ${shipped_from.zip}, ${shipped_from.country}`
    }
  }

  const selectedDataDestination = () => {
    if (form.watch('warehouse_destination') === undefined) {
      return 'Select Warehouse Destination'
    } else {
      const shipped_to = form.watch('warehouse_destination')
      const data = warehouse.find(item => item.warehouse_id === shipped_to)
      return data?.city === undefined
        ? 'Select Warehouse Destination'
        : `${data?.city}, ${data?.province_code}, ${data?.postal_code}, ${data?.country_code}`
    }
  }

  const handleAssingData = data => {
    form.setValue('shipped_from.country', data?.country_code)
    form.setValue('shipped_from.state', data?.province_code)
    form.setValue('shipped_from.city', data?.city)
    form.setValue('shipped_from.zip', data?.postal_code)
    form.setValue('shipped_from.address', data?.address)
    form.setValue('shipped_from.address2', data?.address2)
    form.setValue('shipped_from.warehouse_code', data?.warehouse_code)
    checkCoutryCode(data?.country_code)
    selectedData()
  }

  const handleValueChange = value => {
    const data = warehouse.find(item => item.warehouse_code === value)
    setSelectedWarehouseFrom(data)
    handleAssingData(data)
    setWarehouseId(data?.warehouse_id)
  }

  const handlewarehouseDestination = value => {
    const data = warehouse.find(item => item.warehouse_code === value)
    setWarehouseDestination_id(data?.warehouse_id)
    selectedDataDestination()
    form.setValue('warehouse_destination', data?.warehouse_id)
    form.setValue('warehouse_destination_country', data?.country_code)
  }

  const handleSave = async formData => {
    const addressTo = formData.shipped_to

    if (formData.total_package_value <= 0) {
      toast({
        title: 'Oops! Please check the form',
        description: 'Please input total declare value.',
        variant: 'destructive',
      })
      return
    }

    const notRequired = ['name', 'address2']
    const emptyFields = Object.entries(addressTo).filter(
      ([key, value]) =>
        !notRequired.includes(key) && // skip jika key termasuk not required
        (value === '' ||
          value === null ||
          value === undefined ||
          (typeof value === 'string' && value.trim() === ''))
    )

    if (emptyFields.length > 0) {
      toast({
        title: 'Oops! Please check the form',
        description: `Field "${emptyFields[0]}" in address destination is required.`,
        variant: 'destructive',
      })
      return
    }

    set_loading_rates(true)
    // setShowRates(true)
    try {
      const response = await axios.post(`/api/Calculator/ShippingCalculation`, {
        warehouse_id: warehouse_id,
        warehouse_id_destination: warehouseDestination_id,
        addressFrom: {
          country: formData.shipped_from.country,
          state: formData.shipped_from.state,
          city: formData.shipped_from.city,
          zip: formData.shipped_from.zip,
          street1: formData.shipped_from.address,
          street2: formData.shipped_from.address2,
        },
        addressTo: {
          name: 'Shiplink',
          country: formData.shipped_to.country,
          state: formData.shipped_to.state,
          city: formData.shipped_to.city,
          zip: formData.shipped_to.zip,
          street1: formData.shipped_to.address,
          street2: formData.shipped_to.address2,
          phone: '+12345678900'
        },
        parcels: {
          weight: formData.dimension.weight,
          mass_unit: formData.dimension.weight_unit,
          length: formData.dimension.length,
          width: formData.dimension.width,
          height: formData.dimension.height,
          distance_unit: formData.dimension.dimension_unit,
        },
        total_package_value: Number(formData.total_package_value) || 0,
        currency_package_value: formData.currency_package_value,
      })

      if (response.data.status === true) {
        toast({
          title: 'Success',
          description: response.data.message,
          status: 'success',
        })
        setCourierRates(response.data.rates.rates || [])
      } else {
        toast({
          title: 'Error',
          description: response.data.message,
        })
        return response.data.message
      }
    } catch (error) {
      toast({
        title: 'Errors',
        description: error.message,
      })
      console.error('Save Error', error)
    } finally {
      set_loading_rates(false)
    }
  }
  const getErrorMessages = (errors, parentKey = '') => {
    let messages = []

    for (const key in errors) {
      const error = errors[key]
      const fieldName = parentKey ? `${parentKey}.${key}` : key

      if (error?.message) {
        messages.push(`${fieldName}: ${error.message}`)
      }

      if (typeof error === 'object' && !error.message) {
        messages = messages.concat(getErrorMessages(error, fieldName))
      }
    }

    return messages
  }

  // const validateForm = async () => {
  //   const isValid = await form.trigger()

  //   if (!isValid) {
  //     tableMode && setOpen(true)
  //     // Ambil semua field yang error dari form state
  //     const errors = form.formState.errors
  //     console.log('🚀 ~ validateForm ~ errors:', errors)

  //     // Mapping pesan error yang lebih friendly
  //     const errorMessages = Object.values(errors).map(fieldError => {
  //       console.log('🚀 ~ errorMessages ~ fieldError.message:', fieldError.message)
  //       if (fieldError.message) return fieldError.message
  //       return 'Some required fields are missing.'
  //     })

  //     // Gabungkan semua pesan error
  //     const friendlyErrorMessage = errorMessages.join(', ')

  //     console.log('🚀 ~ validateForm ~ errorFields:', errors)

  //     toast({
  //       title: 'Oops! Please check the form',
  //       description: 'Some required fields are missing.',
  //       status: 'error',
  //     })

  //     return false
  //   }

  const validateForm = async () => {
    const isValid = await form.trigger()

    if (!isValid) {
      if (tableMode) setOpen(true)

      const errors = form.formState.errors
      const messages = getErrorMessages(errors)

      toast({
        title: 'Oops! Please check the form',
        description: messages[0] || 'Some required fields are missing.',
        variant: 'destructive',
      })

      return false
    }

    return true
  }
  //   return true
  // }

  // const triggerSave = () => {
  //   // validateForm()
  //   handleSave(form.getValues())
  // }
  const triggerSave = async () => {
    const isValid = await validateForm()
    if (!isValid) return

    handleSave(form.getValues())
  }

  const triggerContinue = async () => {
    const isValid = await form.trigger()
    if (isValid) {
      setOpen(true)
    }
  }

  const formWatch = form.watch()


  const handleHFP = async () => {
    if (
      formWatch.dimension.weight === undefined ||
      formWatch.dimension.length === undefined ||
      formWatch.dimension.width === undefined ||
      formWatch.dimension.height === undefined ||
      formWatch.dimension.weight_unit === undefined ||
      formWatch.dimension.dimension_unit === undefined
    ) {
      toast({
        title: 'Oops! Please check the form',
        description: 'Some required fields are missing.',
        variant: 'destructive',
      })
      return
    }
    set_loading_rates(true)
    try {
      const response = await axios.post(`/api/Calculator/HoldPickup_Calculation`, {
        warehouse_id: warehouse_id,
        parcels: {
          weight: formWatch.dimension.weight,
          mass_unit: formWatch.dimension.weight_unit,
          length: formWatch.dimension.length,
          width: formWatch.dimension.width,
          height: formWatch.dimension.height,
          distance_unit: formWatch.dimension.dimension_unit,
        },
      })

      if (response.status === 200) {
        const responseData = {
          status: response.data.status,
          message: response.data.message,
          data: response.data,
        }
        setSummaryData(responseData)
        setOpenServicesOption(true)
        return responseData
      }
    } catch (error) {
      console.error('Error in handleHFP:', error)
    } finally {
      set_loading_rates(false)
    }
  }

  const handleCBP = async () => {
    if (
      formWatch.dimension.weight === undefined ||
      formWatch.dimension.length === undefined ||
      formWatch.dimension.width === undefined ||
      formWatch.dimension.height === undefined ||
      formWatch.dimension.weight_unit === undefined ||
      formWatch.dimension.dimension_unit === undefined ||
      formWatch.warehouse_destination === ''
    ) {
      toast({
        title: 'Oops! Please check the form',
        description: 'Some required fields are missing.',
        variant: 'destructive',
      })
      return
    }
    set_loading_rates(true)
    try {
      const response = await axios.post(`/api/Calculator/CrossBorderPickup_Calculation`, {
        warehouse_id: warehouse_id,
        warehouse_id_destination: formWatch.warehouse_destination,
        broker: 'use shiplink broker',
        parcels: {
          weight: formWatch.dimension.weight,
          mass_unit: formWatch.dimension.weight_unit,
          length: formWatch.dimension.length,
          width: formWatch.dimension.width,
          height: formWatch.dimension.height,
          distance_unit: formWatch.dimension.dimension_unit,
        },
        currency_package_value: formWatch.currency_package_value,
        total_package_value: Number(formWatch.total_package_value) || 0,
      })

      if (response.data.status === true) {
        const responseData = {
          status: response.data.status,
          message: response.data.message,
          data: response.data,
        }
        setSummaryData(responseData)
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

  // const handleContinue = async () => {
  //   const isValid = await validateForm()
  //   if (!isValid) return

  //   if (selectedService === 'hfp') {
  //     return handleHFP()
  //   }

  //   if (selectedService === 'cbp') {
  //     return handleCBP()
  //   }

  //   if (formWatch.total_package_value <= 0) {
  //     toast({
  //       title: 'Oops! Please check the form',
  //       description: 'Please input total declare value.',
  //       variant: 'destructive',
  //     })
  //     return
  //   }
  //   if (formWatch.shipped_to.country === '') {
  //     toast({
  //       title: 'Oops! Please check the form',
  //       description: 'Please input total COuntry value.',
  //       variant: 'destructive',
  //     })
  //     return
  //   }

  //   setOpenSummary(false)
  //   setDisabledForm(true)
  //   setShowRates(false)

  //   await triggerSave()
  //   setOpenServicesOption(true)
  // }
  const handleContinue = async () => {
    if (formWatch.dimension.height === 0 || formWatch.dimension.width === 0 || formWatch.dimension.length === 0 || formWatch.dimension.weight === 0) {
      toast({
        title: 'Oops! Please check the form',
        description: 'Package dimensions fields are missing.',
        variant: 'destructive',
      })
      return
    }
    if (selectedService === 'hfp') {
      handleHFP()
    } else if (selectedService === 'cbp') {
      handleCBP()
    } else {
      console.log('FORM WATCH', formWatch.total_package_value)
      if (formWatch.total_package_value <= 0) {
        toast({
          title: 'Oops! Please check the form',
          description: 'Please input total declare value.',
          variant: 'destructive',
        })
        return
      }
      if (formWatch.shipped_to.country === '' || formWatch.shipped_to.state === '' || formWatch.shipped_to.city === '' || formWatch.shipped_to.zip === '' || formWatch.shipped_to.address === '') {
        toast({
          title: 'Oops! Please check the form',
          description: 'Please input shipping address.',
          variant: 'destructive',
        })
        return
      }
      setOpenSummary(false)
      const isValid = await validateForm()
      if (isValid) {
        setOpenServicesOption(true)
        setDisabledForm(true)
        setShowRates(false)
        triggerSave()
      }
    }
  }

  const formatCurrency = (value, currency) => {
    return new Intl.NumberFormat('en-ID', {
      style: 'currency',
      currency: currency,
      minimumIntegerDigits: 2,
      maximumFractionDigits: 2,
    }).format(value)
  }

  return (
    <>
      {loading_rates && <Loading />}
      <div className={styles.container}>
        <div
          className={`flex h-screen min-h-max  flex-col text-center justify-start gap-[32px] pt-[90px] w-full bg-[#FFFFF] py-10
                    ${styles.wrapper}
                    `}
        >
          <div className="flex flex-col gap-5 justify-start text-left w-[90%] mx-auto pt-3">
            <h1 className=" text-myBlue text-3xl font-bold">Shipping Calculator</h1>
            <h1 className=" text-black text-lg font-bold">Estimate Your Shipping Cost</h1>

            <div className="">
              <Form {...form}>
                <form disabled={disabledForm}>
                  <div
                    className={`pb-4 pt-3 flex 
                                        ${tableMode ? 'flex flex-col gap-3 items-start  ' : 'flex-row gap-[20px] h-full items-center'}
                                        `}
                  >
                    <Tabs
                      onValueChange={value => setTabsName(value)}
                      defaultValue="mailbox"
                      value={tabsName}
                      className=""
                    >
                      <TabsList>
                        <TabsTrigger className="w-[150px]" value="mailbox">
                          Mailbox
                        </TabsTrigger>
                        <div
                          className=""
                          onClick={() => {
                            toast({
                              title: 'Coming Soon',
                              description: 'Custom Address will coming soon.',
                            })
                          }}
                        >
                          <TabsTrigger
                            className="w-[150px]"
                            // disabled={shipping === "HFP"}
                            disabled={true}
                            value="custom"
                            onClick={() => {
                              toast({
                                title: 'Coming Soon',
                                description: 'Custom Address will coming soon.',
                              })
                            }}
                          >
                            Custom Address
                          </TabsTrigger>
                        </div>
                      </TabsList>
                    </Tabs>
                    <div className={`h-[32px] ${tableMode ? 'hidden' : 'flex'}`}>
                      <Separator orientation="vertical w-[10px]" />
                    </div>
                    <div className="">
                      <Tabs value={tabsName} onValueChange={value => setTabsName(value)}>
                        <TabsList>
                          <TabsTrigger className="w-[150px]" value="priceList">
                            Price List
                          </TabsTrigger>
                        </TabsList>
                      </Tabs>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 justify-evenly h-max">
                    <div className="">
                      {tabsName === 'mailbox' ? (
                        <FormField
                          control={form.control}
                          name="mailboxSelected"
                          render={({ field }) => (
                            <>
                              <div className="">
                                <FormLabel className="font-bold">
                                  Select Your Mailbox <span className="text-red-600">*</span>
                                </FormLabel>
                                <FormControl className="w-full">
                                  <Select
                                    className="text-xs"
                                    onValueChange={handleValueChange}
                                    defaultValue={selectedData}
                                  >
                                    <FormControl>
                                      <SelectTrigger
                                        name="mailboxSelected"
                                        id="mailboxSelected"
                                        className="text-xs h-[36px]"
                                      >
                                        <SelectValue placeholder="Select Mailbox">
                                          {loadingWarehouse && selectedData === undefined ? (
                                            <Skeleton className="w-full h-[20px]" />
                                          ) : (
                                            <div className="flex flex-row gap-2 items-center">
                                              <img
                                                src={`https://flagcdn.com/h80/${checkCoutryCode(form.watch('shipped_from.country'))}.jpg`}
                                                srcSet={`https://flagcdn.com/h80/${checkCoutryCode(form.watch('shipped_from.country'))}.jpg 2x`}
                                                alt=""
                                                className="rounded-full w-6 h-6 border border-blue-50 object-cover object-center"
                                              />
                                              <p>{selectedData()}</p>
                                            </div>
                                          )}
                                        </SelectValue>
                                      </SelectTrigger>
                                    </FormControl>

                                    <SelectContent id="warehouseContentSelect">
                                      {loadingWarehouse ? (
                                        <Skeleton className="w-full h-[20px]" />
                                      ) : (
                                        warehouse?.map((item, index) => (
                                          <SelectItem
                                            key={index}
                                            className="text-xs"
                                            value={item?.warehouse_code}
                                            id={item?.warehouse_code}
                                          >
                                            {`${item?.city}, ${item?.province_code}, ${item?.postal_code}, ${item?.country_code}`}
                                          </SelectItem>
                                        ))
                                      )}
                                    </SelectContent>
                                  </Select>
                                </FormControl>

                                <FormItem className="w-full">
                                  <div className="">
                                    <Dimension form={form} />
                                  </div>
                                  {/* ReshipedTo */}
                                  {selectedService === 'hfp' ? (
                                    <></>
                                  ) : selectedService === 'cbp' ? (
                                    <div>
                                      <div className="w-full my-4 grid grid-cols-3">
                                        <DeclareTable form={form} />
                                      </div>
                                      <Form {...form}>
                                        <form disabled={disabledForm}>
                                          <FormLabel className="font-bold">
                                            Warehouse Destination
                                          </FormLabel>
                                          <FormControl className="w-full">
                                            <Select
                                              className="text-xs"
                                              onValueChange={handlewarehouseDestination}
                                              defaultValue={selectedDataDestination}
                                            >
                                              <FormControl>
                                                <SelectTrigger
                                                  name="warehouse_destination"
                                                  id="warehouse_destination"
                                                  className="text-xs h-[36px]"
                                                >
                                                  <SelectValue placeholder="Select Warehouse Destination">
                                                    {loadingWarehouse &&
                                                      selectedDataDestination === undefined ? (
                                                      <Skeleton className="w-full h-[20px]" />
                                                    ) : (
                                                      <div className="flex flex-row gap-2 items-center">
                                                        {selectedDataDestination() ===
                                                          'Select Warehouse Destination' ? (
                                                          <></>
                                                        ) : (
                                                          <img
                                                            src={`https://flagcdn.com/h80/${checkCoutryCode(form.watch('warehouse_destination_country'))}.jpg`}
                                                            srcSet={`https://flagcdn.com/h80/${checkCoutryCode(form.watch('warehouse_destination_country'))}.jpg 2x`}
                                                            alt=""
                                                            className="rounded-full w-6 h-6 border border-blue-50 object-cover object-center"
                                                          />
                                                        )}
                                                        <p>{selectedDataDestination()}</p>
                                                      </div>
                                                    )}
                                                  </SelectValue>
                                                </SelectTrigger>
                                              </FormControl>

                                              <SelectContent id="warehouse_destination_select">
                                                {loadingWarehouse ? (
                                                  <Skeleton className="w-full h-[20px]" />
                                                ) : (
                                                  warehouse?.map((item, index) => (
                                                    <SelectItem
                                                      key={index}
                                                      className="text-xs"
                                                      value={item?.warehouse_code}
                                                      id={item?.warehouse_code}
                                                      disabled={
                                                        form.watch('shipped_from.country') ===
                                                        item?.country_code
                                                      }
                                                    >
                                                      {`${item?.city}, ${item?.province_code}, ${item?.postal_code}, ${item?.country_code}`}
                                                    </SelectItem>
                                                  ))
                                                )}
                                              </SelectContent>
                                            </Select>
                                          </FormControl>
                                        </form>
                                      </Form>
                                    </div>
                                  ) : selectedService === 'cbf' ? (
                                    <>
                                      <div className="w-full my-4 grid grid-cols-3">
                                        <DeclareTable form={form} />
                                      </div>
                                      {/* <Form {...form}>
                                <form disabled={disabledForm}>
                                  <FormLabel className="font-bold">Warehouse Destination</FormLabel>
                                  <FormControl className="w-full">
                                    <Select
                                      className="text-xs"
                                      onValueChange={handlewarehouseDestination}
                                      defaultValue={selectedDataDestination}
                                    >
                                      <FormControl>
                                        <SelectTrigger
                                          name="warehouse_destination"
                                          id="warehouse_destination"
                                          className="text-xs h-[36px]"
                                        >
                                          <SelectValue placeholder="Select Warehouse Destination">
                                            {loadingWarehouse &&
                                            selectedDataDestination === undefined ? (
                                              <Skeleton className="w-full h-[20px]" />
                                            ) : (
                                              <div className="flex flex-row gap-2 items-center">
                                                {selectedDataDestination() ===
                                                'Select Warehouse Destination' ? (
                                                  <></>
                                                ) : (
                                                  <img
                                                    src={`https://flagcdn.com/h80/${checkCoutryCode(form.watch('warehouse_destination_country'))}.jpg`}
                                                    srcSet={`https://flagcdn.com/h80/${checkCoutryCode(form.watch('warehouse_destination_country'))}.jpg 2x`}
                                                    alt=""
                                                    className="rounded-full w-6 h-6 border border-blue-50 object-cover object-center"
                                                  />
                                                )}
                                                <p>{selectedDataDestination()}</p>
                                              </div>
                                            )}
                                          </SelectValue>
                                        </SelectTrigger>
                                      </FormControl>

                                      <SelectContent id="warehouse_destination_select">
                                        {loadingWarehouse ? (
                                          <Skeleton className="w-full h-[20px]" />
                                        ) : (
                                          warehouse?.map((item, index) => (
                                            <SelectItem
                                              key={index}
                                              className="text-xs"
                                              value={item?.warehouse_code}
                                              id={item?.warehouse_code}
                                              disabled={
                                                form.watch('shipped_from.country') ===
                                                item?.country_code
                                              }
                                            >
                                              {`${item?.city}, ${item?.province_code}, ${item?.postal_code}, ${item?.country_code}`}
                                            </SelectItem>
                                          ))
                                        )}
                                      </SelectContent>
                                    </Select>
                                  </FormControl>
                                </form>
                              </Form> */}
                                      <ShippedTo form={form} country_list={country} />
                                    </>
                                  ) : (
                                    <>
                                      <div className="w-full my-4 grid grid-cols-3">
                                        <DeclareTable form={form} />
                                      </div>
                                      <ShippedTo form={form} country_list={country} />
                                    </>
                                  )}
                                </FormItem>

                                <Button
                                  className={`${tableMode ? 'bloc' : 'hidden'} w-full mt-5`}
                                  variant="destructive"
                                  onClick={() => {
                                    triggerContinue()
                                  }}
                                >
                                  Continue
                                </Button>
                              </div>
                            </>
                          )}
                        />
                      ) : tabsName === 'custom' ? (
                        <>
                          <ShiptoForm form={form} country_list={country} />
                          <div className="">
                            <Dimension form={form} />
                          </div>
                          {selectedService === 'hfp' ? (
                            <></>
                          ) : selectedService === 'cbp' ? (
                            <div>
                              <div className="w-full my-4">
                                <DeclareTable />
                              </div>
                              <Form {...form}>
                                <form disabled={disabledForm}>
                                  <FormLabel className="font-bold">Warehouse Destination</FormLabel>
                                  <FormControl className="w-full">
                                    <Select
                                      className="text-xs"
                                      onValueChange={handlewarehouseDestination}
                                      defaultValue={selectedDataDestination}
                                    >
                                      <FormControl>
                                        <SelectTrigger
                                          name="warehouse_destination"
                                          id="warehouse_destination"
                                          className="text-xs h-[36px]"
                                        >
                                          <SelectValue placeholder="Select Warehouse Destination">
                                            {loadingWarehouse &&
                                              selectedDataDestination === undefined ? (
                                              <Skeleton className="w-full h-[20px]" />
                                            ) : (
                                              <div className="flex flex-row gap-2 items-center">
                                                {selectedDataDestination() ===
                                                  'Select Warehouse Destination' ? (
                                                  <></>
                                                ) : (
                                                  <img
                                                    src={`https://flagcdn.com/h80/${checkCoutryCode(form.watch('warehouse_destination_country'))}.jpg`}
                                                    srcSet={`https://flagcdn.com/h80/${checkCoutryCode(form.watch('warehouse_destination_country'))}.jpg 2x`}
                                                    alt=""
                                                    className="rounded-full w-6 h-6 border border-blue-50 object-cover object-center"
                                                  />
                                                )}
                                                <p>{selectedDataDestination()}</p>
                                              </div>
                                            )}
                                          </SelectValue>
                                        </SelectTrigger>
                                      </FormControl>

                                      <SelectContent id="warehouse_destination_select">
                                        {loadingWarehouse ? (
                                          <Skeleton className="w-full h-[20px]" />
                                        ) : (
                                          warehouse?.map((item, index) => (
                                            <SelectItem
                                              key={index}
                                              className="text-xs"
                                              value={item?.warehouse_code}
                                              id={item?.warehouse_code}
                                              disabled={
                                                form.watch('shipped_from.country') ===
                                                item?.country_code
                                              }
                                            >
                                              {`${item?.city}, ${item?.province_code}, ${item?.postal_code}, ${item?.country_code}`}
                                            </SelectItem>
                                          ))
                                        )}
                                      </SelectContent>
                                    </Select>
                                  </FormControl>
                                </form>
                              </Form>
                            </div>
                          ) : (
                            <>
                              <div className="w-full my-4 grid grid-cols-3">
                                <DeclareTable />
                              </div>

                              <Form {...form}>
                                <form disabled={disabledForm}>
                                  <FormLabel className="font-bold">Warehouse Destination</FormLabel>
                                  <FormControl className="w-full">
                                    <Select
                                      className="text-xs"
                                      onValueChange={handlewarehouseDestination}
                                      defaultValue={selectedDataDestination}
                                    >
                                      <FormControl>
                                        <SelectTrigger
                                          name="warehouse_destination"
                                          id="warehouse_destination"
                                          className="text-xs h-[36px]"
                                        >
                                          <SelectValue placeholder="Select Warehouse Destination">
                                            {loadingWarehouse &&
                                              selectedDataDestination === undefined ? (
                                              <Skeleton className="w-full h-[20px]" />
                                            ) : (
                                              <div className="flex flex-row gap-2 items-center">
                                                {selectedDataDestination() ===
                                                  'Select Warehouse Destination' ? (
                                                  <></>
                                                ) : (
                                                  <img
                                                    src={`https://flagcdn.com/h80/${checkCoutryCode(form.watch('warehouse_destination_country'))}.jpg`}
                                                    srcSet={`https://flagcdn.com/h80/${checkCoutryCode(form.watch('warehouse_destination_country'))}.jpg 2x`}
                                                    alt=""
                                                    className="rounded-full w-6 h-6 border border-blue-50 object-cover object-center"
                                                  />
                                                )}
                                                <p>{selectedDataDestination()}</p>
                                              </div>
                                            )}
                                          </SelectValue>
                                        </SelectTrigger>
                                      </FormControl>

                                      <SelectContent id="warehouse_destination_select">
                                        {loadingWarehouse ? (
                                          <Skeleton className="w-full h-[20px]" />
                                        ) : (
                                          warehouse?.map((item, index) => (
                                            <SelectItem
                                              key={index}
                                              className="text-xs"
                                              value={item?.warehouse_code}
                                              id={item?.warehouse_code}
                                              disabled={
                                                form.watch('shipped_from.country') ===
                                                item?.country_code
                                              }
                                            >
                                              {`${item?.city}, ${item?.province_code}, ${item?.postal_code}, ${item?.country_code}`}
                                            </SelectItem>
                                          ))
                                        )}
                                      </SelectContent>
                                    </Select>
                                  </FormControl>
                                </form>
                              </Form>
                              <ShippedTo form={form} country_list={country} />
                            </>
                          )}
                        </>
                      ) : (
                        <>
                          <ServiceTable
                            form={form}
                            warehouse={warehouse}
                            otherService={otherService}
                            serviceList={serviceList}
                            selectedData={selectedData}
                            handleValueChange={handleValueChange}
                            checkCoutryCode={checkCoutryCode}
                            loadingService={loadingService}
                          />
                        </>
                      )}
                    </div>
                  </div>
                </form>
              </Form>
            </div>
          </div>
        </div>
        {tableMode ? (
          <>
            {open === true && (
              <Sheet open={open} onOpenChange={setOpen} modal={true}>
                <SheetContent className="rounded-sm" side={'bottom'}>
                  <SheetHeader className={'hidden'}>
                    <SheetTitle>Edit profile</SheetTitle>
                    <SheetDescription></SheetDescription>
                  </SheetHeader>
                  <ServiceOptions
                    loading_rates={loading_rates}
                    rates={courierRates}
                    getRates={triggerSave}
                    setSummaryData={setSummaryData}
                    setShowRates={setShowRates}
                    summaryData={summaryData}
                    setSelectedData={setSelectedData}
                    selecetedData={selecetedData}
                    showRates={showRates}
                    setOpenServicesOption={setOpenServicesOption}
                    openRatesOption={openRatesOption}
                    setOpenRatesOption={setOpenRatesOption}
                    selectedService={selectedService}
                    setSelectedService={setSelectedService}
                    handleContinue={handleContinue}
                    openServicesOption={openServicesOption}
                    priceList={serviceList}
                    otherService={otherService}
                    warehouse_id={warehouse_id}
                    disbaledService={isServiceDisabled(
                      selectedWarehouseFrom ?
                        selectedWarehouseFrom?.warehouse_bullet_setting
                        : false
                    )}
                  />
                </SheetContent>
              </Sheet>
            )}

            {openServicesOption && (
              <Sheet open={openServicesOption} onOpenChange={setOpenServicesOption} modal={true}>
                <SheetContent className="rounded-sm w-full flex flex-col" side={'bottom'}>
                  <>
                    {openServicesOption &&
                      (selectedService?.toLowerCase() === 'hfp' ||
                        selectedService?.toLowerCase() === 'cbp' ? (
                        <SummaryPanel
                          loading_rates={loading_rates}
                          rates={courierRates}
                          getRates={triggerSave}
                          setSummaryData={setSummaryData}
                          setShowRates={setShowRates}
                          summaryData={summaryData}
                          setSelectedData={setSelectedData}
                          selecetedData={selecetedData}
                          showRates={showRates}
                          setOpenServicesOption={setOpenServicesOption}
                          selectedService={selectedService}
                        />
                      ) : (openSummary && selectedService?.toLowerCase() !== 'hfp') ||
                        (openSummary && selectedService?.toLowerCase() === 'cbp') ? (
                        <SummaryPanel
                          loading_rates={loading_rates}
                          rates={courierRates}
                          getRates={triggerSave}
                          setSummaryData={setSummaryData}
                          setShowRates={setShowRates}
                          summaryData={summaryData}
                          setSelectedData={setSelectedData}
                          selecetedData={selecetedData}
                          showRates={showRates}
                          setOpenServicesOption={setOpenServicesOption}
                          selectedService={selectedService}
                        />
                      ) : (
                        <RatesOption
                          openSummary={openSummary}
                          setOpenSummary={setOpenSummary}
                          loading_rates={loading_rates}
                          rates={courierRates}
                          getRates={triggerSave}
                          setSummaryData={setSummaryData}
                          setShowRates={setShowRates}
                          summaryData={summaryData}
                          setSelectedData={setSelectedData}
                          selecetedData={selecetedData}
                          showRates={showRates}
                          setOpenServicesOption={setOpenServicesOption}
                        />
                      ))}
                  </>
                </SheetContent>
              </Sheet>
            )}
          </>
        ) : (
          <>
            <div className={styles.service}>
              <ServiceOptions
                loading_rates={loading_rates}
                rates={courierRates}
                getRates={triggerSave}
                setSummaryData={setSummaryData}
                setShowRates={setShowRates}
                summaryData={summaryData}
                setSelectedData={setSelectedData}
                selecetedData={selecetedData}
                showRates={showRates}
                setOpenServicesOption={setOpenServicesOption}
                openRatesOption={openRatesOption}
                setOpenRatesOption={setOpenRatesOption}
                selectedService={selectedService}
                setSelectedService={setSelectedService}
                handleContinue={handleContinue}
                openServicesOption={openServicesOption}
                priceList={serviceList}
                otherService={otherService}
                warehouse_id={warehouse_id}
                disbaledService={isServiceDisabled(
                  selectedWarehouseFrom ?
                    selectedWarehouseFrom?.warehouse_bullet_setting
                    : false
                )}
              />
            </div>

            {openServicesOption &&
              (selectedService?.toLowerCase() === 'hfp' ||
                selectedService?.toLowerCase() === 'cbp' ? (
                <div className={`${styles.service}`}>
                  <SummaryPanel
                    loading_rates={loading_rates}
                    rates={courierRates}
                    getRates={triggerSave}
                    setSummaryData={setSummaryData}
                    setShowRates={setShowRates}
                    summaryData={summaryData}
                    setSelectedData={setSelectedData}
                    selecetedData={selecetedData}
                    showRates={showRates}
                    setOpenServicesOption={setOpenServicesOption}
                    selectedService={selectedService}
                  />
                </div>
              ) : (openSummary && selectedService?.toLowerCase() !== 'hfp') ||
                (openSummary && selectedService?.toLowerCase() === 'cbp') ? (
                <div className={`${styles.service}`}>
                  <SummaryPanel
                    loading_rates={loading_rates}
                    rates={courierRates}
                    getRates={triggerSave}
                    setSummaryData={setSummaryData}
                    setShowRates={setShowRates}
                    summaryData={summaryData}
                    setSelectedData={setSelectedData}
                    selecetedData={selecetedData}
                    showRates={showRates}
                    setOpenServicesOption={setOpenServicesOption}
                    selectedService={selectedService}
                  />
                </div>
              ) : (
                <div className={`${styles.service}`}>
                  <RatesOption
                    openSummary={openSummary}
                    setOpenSummary={setOpenSummary}
                    loading_rates={loading_rates}
                    rates={courierRates}
                    getRates={triggerSave}
                    setSummaryData={setSummaryData}
                    setShowRates={setShowRates}
                    summaryData={summaryData}
                    setSelectedData={setSelectedData}
                    selecetedData={selecetedData}
                    showRates={showRates}
                    setOpenServicesOption={setOpenServicesOption}
                    set_loading_rates={set_loading_rates}
                    warehouse_id={warehouse_id}
                    selectedService={selectedService}
                    warehouseCountry={warehouseCountry}
                    formWatch={formWatch}
                  />
                </div>
              ))}
          </>
        )}
      </div>
    </>
  )
}
