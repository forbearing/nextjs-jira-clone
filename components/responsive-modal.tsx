import { useMedia } from 'react-use'
import { ReactNode } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle } from '@/components/ui/drawer'
import * as VisuallyHidden from '@radix-ui/react-visually-hidden'

interface props {
  children: ReactNode
  open: boolean
  onOpenChange: (open: boolean) => void
}
export const ResponsiveModal = ({ children, open, onOpenChange }: props) => {
  const isDesktop = useMedia('(min-width: 1024px)', true)
  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <VisuallyHidden.Root>
          <DialogHeader>
            <DialogTitle />
            <DialogDescription />
          </DialogHeader>
        </VisuallyHidden.Root>
        <DialogContent className="hide-scrollbar max-h-[85vh] w-full overflow-y-auto border-none p-0 sm:max-w-lg">
          {children}
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <VisuallyHidden.Root>
        <DrawerHeader>
          <DrawerTitle />
          <DrawerDescription />
        </DrawerHeader>
      </VisuallyHidden.Root>
      <DrawerContent>
        <div className="hide-scrollbar max-h-[85vh] overflow-y-auto">{children}</div>
      </DrawerContent>
    </Drawer>
  )
}
