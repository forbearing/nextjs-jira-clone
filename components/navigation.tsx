import { cn } from '@/lib/utils'
import { LucideSettings, LucideUser } from 'lucide-react'
import Link from 'next/link'
import { GoCheckCircle, GoCheckCircleFill, GoHome, GoHomeFill } from 'react-icons/go'

export const Navigation = () => {
  return (
    <ul className="flex flex-col">
      {routes.map((item) => {
        let isActive = false
        const Icon = isActive ? item.activeIcon : item.icon
        return (
          <Link key={item.href} href={item.href}>
            <div
              className={cn(
                'flex items-center gap-2.5 rounded-md p-2.5 font-medium text-neutral-500 transition hover:text-primary',
                isActive && 'bg-white text-primary shadow-sm hover:opacity-100',
              )}
            >
              {Icon}
              {item.label}
            </div>
          </Link>
        )
      })}
    </ul>
  )
}

const iconClassName = 'text-neutral-500 size-5'
const routes = [
  {
    label: 'Home',
    href: '/',
    icon: <GoHome className={iconClassName} />,
    activeIcon: <GoHomeFill className={iconClassName} />,
  },
  {
    label: 'My Tasks',
    href: '/tasks',
    icon: <GoCheckCircle className={iconClassName} />,
    activeIcon: <GoCheckCircleFill className={iconClassName} />,
  },
  {
    label: 'Settings',
    href: '/settings',
    icon: <LucideSettings className={iconClassName} />,
    activeIcon: <LucideSettings className={iconClassName} />,
  },
  {
    label: 'Members',
    href: '/members',
    icon: <LucideUser className={iconClassName} />,
    activeIcon: <LucideUser className={iconClassName} />,
  },
]
