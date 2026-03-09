import React, { useEffect, useState } from 'react'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'

import axios from 'axios'
import { PhoneInput } from 'react-international-phone'
import 'react-international-phone/style.css'

import './style.css'
import NewAutocompleteInput from '@/components/new-autocomplete'

export const ShippedTo = ({ form, country_list }) => {
  const [selectedCountry, setSelectedCountry] = useState({
    country_code: '',
    country_name: '',
  })

  const handleSelectCountry = (country_code, country_name) => {
    form.setValue('country_name', country_name)
    setSelectedCountry({ country_code, country_name })
  }

  const [province_list, setProvince] = useState([])
  const [popProvince, setPopProvince] = useState(false)

  const shipping = form.watch('shippingType')

  const country_code = form.watch('shipped_to.country')

  const [queryProvince, setQueryProvince] = useState({
    keyword: '',
    country_code: '',
    page: 0,
    limit: 1000,
    index: 0,
  })

  useEffect(() => {
    // Update country_code hanya saat selectedCountry berubah
    if (!country_code) return

    setQueryProvince(prev => ({
      ...prev,
      country_code: country_code,
    }))
  }, [country_code])

  useEffect(() => {
    // Fetch data hanya jika country_code sudah ada
    if (!queryProvince.country_code) return

    const fetchDataProvince = async () => {
      try {
        const response = await axios.post(`/api/province`, queryProvince)

        setProvince(response.data.province)
      } catch (error) {
        console.error('Error:', error)
      }
    }

    fetchDataProvince()
  }, [queryProvince])

  const filteredProvince = province_list

  const [pendingStateCode, setPendingStateCode] = useState(null)

  const handleCountryChange = async (country_code, state_code) => {
    const country = country_list?.find(c => c.alpha_2 === country_code)

    if (!country) return

    form.setValue('shipped_to.country', country.country_code)
    form.setValue('country_name', country.country_name)

    setSelectedCountry({
      country_code,
      country_name: country.country_name,
    })

    try {
      const response = await axios.post('/api/province', {
        keyword: '',
        country_code: country.country_code,
        page: 0,
        limit: 1000,
        index: 0,
      })

      const provinces = response.data.province || []

      setProvince(provinces)

      // simpan state_code dulu
      if (state_code) {
        setPendingStateCode(state_code)
      }
    } catch (error) {
      console.error(error)
    }
  }
  useEffect(() => {
    if (!pendingStateCode || province_list.length === 0) return

    const province = province_list.find(p => p.province_name === pendingStateCode)

    if (province) {
      form.setValue('shipped_to.state', province.province_name)
      form.setValue('state', province.province_name)
    }

    setPendingStateCode(null)
  }, [province_list])

  return (
    <div className="flex flex-col">
      {shipping === 'HFP' || shipping === 'CBP' ? (
        <p className="font-bold text-xs">Ship To ...</p>
      ) : (
        <p className="font-bold text-xs">Ship To ...</p>
      )}

      <div className="w-full grid grid-cols-2 gap-2 mt-3">
        <FormField
          className="w-full space-y-0"
          name="shipped_to.email"
          control={form.control}
          render={({ field }) => (
            <>
              <FormItem className="w-full space-y-0 flex flex-col gap-1">
                <FormLabel>{`Email`}</FormLabel>
                <FormControl>
                  <Input
                    size="xs"
                    id="name"
                    type="text"
                    className="  px-2.5 py-3 bg-white   justify-start items-center gap-2.5 inline-flex  text-xs font-normal font-['Poppins'] leading-tight outline-none"
                    placeholder="Email"
                    {...field}
                  />
                </FormControl>
                <FormMessage className={'text-xs'} />
              </FormItem>
            </>
          )}
        />
        <FormField
          name="shipped_to.phone"
          control={form.control}
          render={({ field }) => (
            <FormItem className="w-full space-y-0 flex flex-col gap-1">
              <FormLabel className="text-xs">Phone Number</FormLabel>
              <FormControl>
                {/* Wrapper border custom */}
                <div className="border border-zinc-300 rounded flex items-center w-full h-[30px]">
                  <PhoneInput
                    country="us" // default country
                    value={field.value}
                    onChange={phone => field.onChange(phone)} // biarkan library handle '+'
                    enableSearch
                    disableDropdown={false}
                    inputProps={{
                      name: 'phone',
                      required: true,
                      autoFocus: false,
                      className:
                        'flex-1 h-9 px-2 text-xs bg-transparent placeholder:text-zinc-400 focus:outline-none',
                      placeholder: '+1 123 456 7890',
                    }}
                    countrySelectorStyleProps={{
                      style: {
                        background: 'transparent',
                        border: 'none',
                        boxShadow: 'none',
                        outline: 'none',
                        padding: 0,
                        margin: 0,
                      },
                      buttonStyle: {
                        background: 'transparent',
                        border: 'none',
                        boxShadow: 'none',
                        outline: 'none',
                        padding: 0,
                        margin: 0,
                      },
                      dropdownStyleProps: {
                        className: 'phone-dropdown',
                      },
                    }}
                  />
                </div>
              </FormControl>
              <FormMessage className="text-xs text-red-500" />
            </FormItem>
          )}
        />
      </div>
      <FormField
        control={form.control}
        name="shipped_to.address"
        className="w-full"
        render={({ field }) => (
          <FormItem className="w-full space-y-0 flex flex-col gap-1 mt-2">
            <FormLabel className="">Address</FormLabel>
            <FormControl>
              <NewAutocompleteInput
                className="px-2.5 py-3 bg-white  justify-start items-center gap-2.5 inline-flex  text-xs font-normal font-['Poppins'] leading-tight outline-none"
                placeholder={`Address`}
                autoComplete="off"
                autoFill="off"
                onSelect={place => {
                  console.log('PLACE:', place)

                  form.setValue('shipped_to.address', place.street1)
                  form.setValue('shipped_to.city', place.city)
                  form.setValue('shipped_to.zip', place.zip)

                  form.setValue('shipped_to.country', place.country_code)
                  form.setValue('country_name', place.country)

                  handleCountryChange(place.country_code, place.state)
                }}
                onValueChange={e => {
                  form.setValue('shipped_to.address', e)
                }}
                {...field}
              />
            </FormControl>
            <FormMessage className="text-xs" />
          </FormItem>
        )}
      />
      <div className="py-2 flex flex-col gap-2">
        <div className="flex flex-row gap-2 w-full items-end">
          <FormField
            control={form.control}
            name="shipped_to.country"
            className="w-full"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="">
                  Country <span className="text-red-600">*</span>
                </FormLabel>
                <FormControl>
                  <Select
                    value={field.value}
                    onValueChange={value => {
                      field.onChange(value)
                    }}
                  >
                    <SelectTrigger className="text-xs h-[36px]">
                      <SelectValue placeholder="Select Country" />
                    </SelectTrigger>

                    <SelectContent>
                      {country_list?.map((item, index) => (
                        <SelectItem
                          key={item?.country_id}
                          value={item.country_code}
                          className="text-xs"
                        >
                          {item.country_name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="shipped_to.state"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>
                  State / Province <span className="text-red-600">*</span>
                </FormLabel>

                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="h-[36px] text-xs">
                      <SelectValue placeholder="Select State / Province" />
                    </SelectTrigger>
                  </FormControl>

                  <SelectContent>
                    {province_list?.length > 0 ? (
                      province_list?.map((item, index) => (
                        <SelectItem
                          key={item.province_id}
                          value={item.province_name}
                          className="text-xs"
                        >
                          {item.province_name}
                        </SelectItem>
                      ))
                    ) : (
                      <div className="text-xs text-center py-2">No Province found.</div>
                    )}
                  </SelectContent>
                </Select>

                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-row gap-2 w-full">
          <FormField
            control={form.control}
            name="shipped_to.city"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="">
                  City <span className="text-red-600">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="City" {...field} />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="shipped_to.zip"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="">
                  Zip/Postal Code <span className="text-red-600">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="Zip/Postal Code" {...field} />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
        </div>
      </div>
    </div>
  )
}
