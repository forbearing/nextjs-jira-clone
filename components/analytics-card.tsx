import { FaCaretDown, FaCaretUp } from 'react-icons/fa'
import { Card, CardDescription, CardHeader, CardTitle } from './ui/card'
import { cn } from '@/lib/utils'

export const AnalyticsCard = ({
  title,
  value,
  variant,
  increaseValue,
}: {
  title: string
  value: number
  variant: 'up' | 'down'
  increaseValue: number
}) => {
  const iconColor = variant === 'up' ? 'text-emerald-500' : 'text-rose-500'
  const increaseValueColor = variant === 'up' ? 'text-emerald-500' : 'text-rose-500'
  const Icon =
    variant === 'up' ? (
      <FaCaretUp className={cn(iconColor, 'size-4')} />
    ) : (
      <FaCaretDown className={cn(iconColor, 'size-4')} />
    )
  return (
    <Card className="w-full border-none shadow-none">
      <CardHeader>
        <div className="flex items-center gap-x-2.5">
          <CardDescription className="flex items-center gap-x-2 overflow-hidden font-medium">
            <span className="truncate text-base">{title}</span>
          </CardDescription>
          <div className="flex items-center gap-x-1">
            {Icon}
            <span className={cn(increaseValueColor, 'truncate text-base font-medium')}>{increaseValue}</span>
          </div>
        </div>
        <CardTitle className="text-3xl font-semibold">{value}</CardTitle>
      </CardHeader>
    </Card>
  )
}
