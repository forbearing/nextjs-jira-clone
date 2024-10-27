import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'
import Image from 'next/image'

interface props {
  image?: string
  name: string
  className?: string
  fallbackClassName?: string
}
export const ProjectAvatar = ({ image, name, className, fallbackClassName }: props) => {
  if (image) {
    return (
      <div className={cn('relative size-5 overflow-hidden rounded-md', className)}>
        <Image src={image} alt={name} fill className="object-cover" />
      </div>
    )
  }
  return (
    <Avatar className={cn('size-5 rounded-md', className)}>
      <AvatarFallback
        className={cn('rounded-md bg-blue-600 text-sm font-semibold uppercase text-white', fallbackClassName)}
      >
        {name[0]}
      </AvatarFallback>
    </Avatar>
  )
}
