'use client'

import * as VisuallyHidden from '@radix-ui/react-visually-hidden'
import { LucideMenu } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet'
import { usePathname } from 'next/navigation'
import { Sidebar } from './sidebar'

export const MobileSidebar = () => {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setOpen(false)

    return () => {}
  }, [])

  return (
    <Sheet modal={false} open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="secondary" className="lg:hidden" size="icon">
          <LucideMenu className="size-4 text-neutral-500" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0">
        <VisuallyHidden.Root>
          <SheetHeader>
            <SheetTitle />
            <SheetDescription />
          </SheetHeader>
        </VisuallyHidden.Root>
        <Sidebar />
      </SheetContent>
    </Sheet>
  )
}
