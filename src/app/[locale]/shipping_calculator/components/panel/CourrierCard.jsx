/* eslint-disable @next/next/no-img-element */
import { formatCurrency, formatDecimal } from '@/lib/utils';
import React from 'react'

export const CourrierCard = ({ data, isSelected, onSelect }) => {
  return (
    <div
      className={`card border border-gray-300 p-2 rounded cursor-pointer ${isSelected ? 'bg-red-100' : 'hover:bg-red-100'}`}
      onClick={() => onSelect(data)}
    >
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-row gap-2 items-center">
          <img
            src={data?.providerImage200 || '/placeholder-logo.png'}
            alt={data?.provider}
            className="h-8 w-8 object-center object-contain p-1 bg-blue-100 rounded"
          />
          <div className="flex flex-col w-[70%]">
            <p className='text-xs'>{data?.provider} - {data?.servicelevel?.name}</p>
            <p className="text-[10px] text-gray-500">Estimate {data.estimatedDays || "-"} Days</p>
          </div>
        </div>
        <p className='text-xs w-[30%] text-right'>{`${formatCurrency(data?.currency)} ${formatDecimal(data?.amountLocal || 0)}`}</p>
      </div>
    </div>
  );
};
