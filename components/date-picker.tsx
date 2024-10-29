'use client'

import { LucideCalendar } from 'lucide-react'
import { Button } from './ui/button'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { format } from 'date-fns'
import { cn } from '@/lib/utils'
import { Calendar } from './ui/calendar'

interface props {
  value: Date | undefined
  onChange: (date: Date) => void
  className?: string
  placeholder?: string
}
export const DatePicker = ({ value, onChange, className, placeholder = 'Select Date' }: props) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="lg"
          className={cn(
            'w-full justify-start px-3 text-left font-normal',
            !value && 'text-muted-foreground',
            className,
          )}
        >
          <LucideCalendar className="mr-2 size-4" />
          {value ? format(value, 'PPP') : <span>{placeholder}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar mode="single" selected={value} onSelect={(date) => onChange(date as Date)} initialFocus />
      </PopoverContent>
    </Popover>
  )
}
