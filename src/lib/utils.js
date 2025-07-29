import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}
export const formatDate = dateString =>
  new Date(dateString).toLocaleDateString('en-US', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })

export const formatDecimal = value =>
  new Intl.NumberFormat('en-US', {
    style: 'decimal',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)

export const formatCurrency = value => {
  if (value === 'USD') {
    return '$'
  } else if (value === 'CAD') {
    return 'C$'
  } else {
    return '$'
  }
}
