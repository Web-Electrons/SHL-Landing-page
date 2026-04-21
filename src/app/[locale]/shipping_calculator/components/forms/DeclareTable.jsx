import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'

const DeclareTable = ({ form }) => {
  return (
    <FormItem className="w-full mb-2">
      <FormLabel className="font-bold">Total Declared Value</FormLabel>

      <div className="flex items-center border-slate-300 border rounded overflow-hidden h-[35px]">
        {/* Currency (no border) */}
        <FormField
          control={form.control}
          name="currency_package_value"
          render={({ field }) => (
            <FormControl>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger className="border-0 shadow-none h-full w-[80px] text-xs focus:ring-0">
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
            </FormControl>
          )}
        />

        {/* Divider (optional biar keliatan rapi) */}
        <div className="w-px bg-gray-200 h-full" />

        {/* Input */}
        <FormField
          control={form.control}
          name="total_package_value"
          render={({ field }) => (
            <FormControl>
              <Input
                type="number"
                className="border-0 shadow-none focus-visible:ring-0 h-full text-xs"
                onChange={e => field.onChange(e.target.valueAsNumber)}
                {...field}
              />
            </FormControl>
          )}
        />
      </div>

      <FormMessage />
    </FormItem>
  )
}

export default DeclareTable
