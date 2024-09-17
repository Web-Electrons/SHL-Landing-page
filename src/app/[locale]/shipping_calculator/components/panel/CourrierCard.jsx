/* eslint-disable @next/next/no-img-element */
import React from 'react'

export const CourrierCard = ({ data, isSelected, onSelect}) => {
    return (
        <div 
      className={`card border border-gray-300 p-2 rounded cursor-pointer ${isSelected ? 'bg-red-100' : 'hover:bg-red-100'}`}
      onClick={() => onSelect(data)}
    >
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-row gap-2 items-center">
          <img
            src={data.providerImage200 || '/placeholder-logo.png'}
            alt={data.provider}
            className="h-8 w-8 object-center object-cover bg-blue-50 rounded"
          />
          <div className="flex flex-col">
            <p className='text-sm'>{data.provider} - {data.servicelevel?.name}</p>
            <p className="text-[10px] text-gray-500">Estimate {data.estimatedDays || "-"} Days</p>
          </div>
        </div>
        <p className='text-sm'>{`${data.currency} ${data.amountLocal.toFixed(2)}`}</p>
      </div>
    </div>
  );
};
