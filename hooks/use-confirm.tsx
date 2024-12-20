import { ResponsiveModal } from '@/components/responsive-modal'
import { Button, ButtonProps } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useCallback, useState } from 'react'

interface props {
  title: string
  message: string
  variant: ButtonProps['variant']
}
export const useConfirm = ({
  title,
  message,
  variant = 'primary',
}: props): [() => JSX.Element, () => Promise<unknown>] => {
  const [promise, setPromise] = useState<{ resolve: (value: boolean) => void } | null>(null)

  const confirm = () => {
    return new Promise((resolve) => {
      setPromise({ resolve })
    })
  }

  const handleClose = useCallback(() => {
    setPromise(null)
  }, [promise])
  const handleConfirm = useCallback(() => {
    promise?.resolve(true)
    handleClose()
  }, [promise])
  const handleCancel = useCallback(() => {
    promise?.resolve(false)
    handleClose()
  }, [promise])

  const ConfirmationDialog = () => (
    <ResponsiveModal open={promise != null} onOpenChange={handleClose}>
      <Card className="h-full w-full border-none shadow-none">
        <CardContent className="pt-8">
          <CardHeader className="p-0">
            <CardTitle>{title}</CardTitle>
            <CardDescription>{message}</CardDescription>
          </CardHeader>
          <div className="flex w-full flex-col items-center justify-end gap-x-2 gap-y-2 pt-4 lg:flex-row">
            <Button onClick={handleCancel} variant="outline" className="w-full lg:w-auto">
              Cancel
            </Button>
            <Button onClick={handleConfirm} variant={variant} className="w-full lg:w-auto">
              Confirm
            </Button>
          </div>
        </CardContent>
      </Card>
    </ResponsiveModal>
  )

  return [ConfirmationDialog, confirm]
}
