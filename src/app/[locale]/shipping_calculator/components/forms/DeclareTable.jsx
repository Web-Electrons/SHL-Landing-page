import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from '@/components/ui/tableDashboard'
import React from 'react'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, useFieldArray } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { XIcon } from 'lucide-react'
import { formatCurrency, formatDecimal } from '@/lib/utils'

const formSchema = yup.object().shape({
  items: yup.array().of(
    yup.object().shape({
      quantity: yup
        .number()
        .typeError('Quantity must be a number')
        .required('Quantity is required')
        .positive('Quantity must be greater than 0')
        .integer('Quantity must be an integer'),
      currency: yup.string().required('Currency is required'),
      price: yup
        .number()
        .typeError('Price must be a number')
        .required('Price is required')
        .moreThan(0, 'Price must be greater than 0'),
      description: yup
        .string()
        .required('Description is required')
        .max(255, 'Description must be at most 255 characters'),
    })
  ),
})

const DeclareTable = () => {
  const form = useForm({
    resolver: yupResolver(formSchema),
    defaultValues: {
      items: [
        {
          quantity: 1,
          currency: 'USD',
          price: 0,
          description: '',
        },
      ],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'items',
  })

  const onSubmit = data => {
    console.log('Form Data:', data)
  }

  const items = form.watch('items')

  const totalValue = items?.reduce((acc, item) => {
    const quantity = Number(item.quantity) || 0
    const price = Number(item.price) || 0
    return acc + quantity * price
  }, 0)

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <div className="mb-1">
        <p className="font-bold text-xs">Declare Content</p>
      </div>

      <Table>
        <TableHeader className="bg-sky-50 border">
          <TableHead className="p-0 px-2 py-2 w-[100px] text-myBlue font-bold text-xs">
            Qty
          </TableHead>
          <TableHead className="p-0 px-2 py-2 w-[160px] text-myBlue font-bold text-xs">
            Value
          </TableHead>
          <TableHead className="p-0 px-2 py-2 text-myBlue font-bold text-xs">Description</TableHead>
          <TableHead className="p-0 px-2 py-2 text-myBlue font-bold text-xs"></TableHead>
        </TableHeader>

        <TableBody>
          {fields.map((field, index) => (
            <TableRow key={field.id}>
              {/* Quantity */}
              <TableCell className="p-1 w-[100px]">
                <Input
                  type="number"
                  {...form.register(`items.${index}.quantity`)}
                  className="text-xs h-[30px]"
                />
                <p className="text-[10px] text-red-500">
                  {form.formState.errors.items?.[index]?.quantity?.message}
                </p>
              </TableCell>

              {/* Currency & Price */}
              <TableCell className="p-1 w-[160px]">
                <div className="flex items-center border rounded overflow-hidden h-[30px] bg-white">
                  <Select
                    defaultValue={field.currency}
                    onValueChange={val => form.setValue(`items.${index}.currency`, val)}
                  >
                    <SelectTrigger className="w-[70px] h-[30px] text-xs border-0 focus:outline-none focus:ring-0 shadow-none rounded-none bg-transparent">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD" className="text-xs">
                        USD
                      </SelectItem>
                      <SelectItem value="CAD" className="text-xs">
                        CAD
                      </SelectItem>
                    </SelectContent>
                  </Select>

                  <Input
                    type="number"
                    {...form.register(`items.${index}.price`)}
                    className="text-xs h-[30px] py-2 p-0 focus:outline-none border-none bg-none focus-visible:ring-0 focus-visible:ring-transparaent focus-visible:ring-offset-0"
                  />
                </div>
              </TableCell>

              {/* Description */}
              <TableCell className="p-1">
                <Input
                  {...form.register(`items.${index}.description`)}
                  className="text-xs h-[30px]"
                />
                <p className="text-[10px] text-red-500">
                  {form.formState.errors.items?.[index]?.description?.message}
                </p>
              </TableCell>

              <TableCell className="text-center  p-0 h-8 px-2 py-2 w-[40px] ">
                {index > 0 ? (
                  <div className="flex flex-row justify-between gap-2 w-full">
                    <Button
                      variant="softBlue"
                      type="button"
                      size="tableIcon"
                      className="px-1 py-1 w-6 h-6"
                      onClick={() => remove(index)}
                      // disabled={disabled}
                    >
                      <XIcon className="w-4 h-4" />
                    </Button>
                  </div>
                ) : (
                  <></>
                )}
              </TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell colSpan={4} className="h-2">
              <div className="text-xs w-full flex items-center justify-end gap-2">
                <p>Total</p>
                <p>
                  {formatCurrency(form.watch('currency'))}
                  {formatDecimal(totalValue)}
                </p>
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <div className="mt-2 flex items-center gap-2">
        <Button
          type="button"
          variant="tableBlue"
          size="xs"
          onClick={() => append({ quantity: 1, currency: 'USD', price: 0, description: '' })}
        >
          + Add Item
        </Button>
        {/* <Button type="submit" variant="outline">
          Submit
        </Button> */}
      </div>
    </form>
  )
}

export default DeclareTable
