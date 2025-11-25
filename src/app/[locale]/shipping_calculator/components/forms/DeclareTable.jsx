import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from '@/components/ui/tableDashboard'
import React, { useEffect } from 'react'
import { useFieldArray } from 'react-hook-form'
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


const DeclareTable = ({ form }) => {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'package_content',
  })

  const items = form.watch('package_content') || []


  const totalValue = items.reduce((acc, item) => {
    const qty = Number(item.qty) || 0
    const value = Number(item.value) || 0
    return acc + qty * value
  }, 0)



  const totalCurrency = items?.[0]?.currency || 'USD'



  return (
    <div>
      <div className="mb-1">
        <p className="font-bold text-xs">Declare Content</p>
      </div>

      <Table>
        <TableHeader className="bg-sky-50 border">
          <TableRow>
            <TableHead className="px-2 py-2 w-[100px] text-myBlue font-bold text-xs">
              Qty
            </TableHead>
            <TableHead className="px-2 py-2 w-[160px] text-myBlue font-bold text-xs">
              Value
            </TableHead>
            <TableHead className="px-2 py-2 text-myBlue font-bold text-xs">
              Description
            </TableHead>
            <TableHead className="px-2 py-2 w-[40px]"></TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {fields.map((field, index) => (
            <TableRow key={field.id}>
              {/* Qty */}
              <TableCell className="p-1 w-[100px]">
                <Input
                  type="number"
                  {...form.register(`package_content.${index}.qty`)}
                  className="text-xs h-[30px]"
                />
                <p className="text-[10px] text-red-500">
                  {form.formState.errors.package_content?.[index]?.qty?.message}
                </p>
              </TableCell>

              {/* Currency & Value */}
              <TableCell className="p-1 w-[160px]">
                <div className="flex items-center border rounded overflow-hidden h-[30px] bg-white">
                  <Select
                    value={items[index]?.currency}
                    onValueChange={(val) =>
                      form.setValue(`package_content.${index}.currency`, val)
                    }
                  >
                    <SelectTrigger className="w-[70px] h-[30px] text-xs border-0 shadow-none rounded-none bg-transparent">
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
                    {...form.register(`package_content.${index}.value`)}
                    className="text-xs h-[30px] px-2 border-0 focus:outline-none focus:ring-0"
                  />
                </div>
              </TableCell>

              {/* Description */}
              <TableCell className="p-1">
                <Input
                  {...form.register(`package_content.${index}.desc`)}
                  className="text-xs h-[30px]"
                />
                <p className="text-[10px] text-red-500">
                  {form.formState.errors.package_content?.[index]?.desc?.message}
                </p>
              </TableCell>

              {/* Remove button */}
              <TableCell className="text-center p-0 w-[40px]">
                {index > 0 ? (
                  <Button
                    variant="softBlue"
                    type="button"
                    size="tableIcon"
                    className="w-6 h-6"
                    onClick={() => remove(index)}
                  >
                    <XIcon className="w-4 h-4" />
                  </Button>
                ) : null}
              </TableCell>
            </TableRow>
          ))}

          {/* Total Row */}
          <TableRow>
            <TableCell colSpan={4} className="h-2">
              <div className="text-xs w-full flex items-center justify-end gap-2">
                <p>Total</p>
                <p>
                  {formatCurrency(totalCurrency)}
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
          onClick={() =>
            append({
              id: '',
              tracking_id: '',
              qty: 1,
              value: 0,
              desc: '',
              hs_desc: '',
              hs_code: '',
              made_in: '',
              currency: 'USD',
              subtotal: 0,
            })
          }
        >
          + Add Item
        </Button>
      </div>
    </div>
  )
}

export default DeclareTable
