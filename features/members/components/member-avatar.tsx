import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'
import Image from 'next/image'

interface props {
  name: string
  className?: string
  fallbackClassName?: string
}
export const MemberAvatar = ({ name, className, fallbackClassName }: props) => {
  return (
    <Avatar className={cn('size-5 rounded-full border border-neutral-300 transition', className)}>
      <AvatarFallback
        className={cn(
          'flex items-center justify-center bg-neutral-200 font-medium text-neutral-500',
          fallbackClassName,
        )}
      >
        {name.charAt(0).toUpperCase()}
      </AvatarFallback>
    </Avatar>
  )
}
