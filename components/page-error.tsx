import { LucideAlertTriangle } from 'lucide-react'

export const PageError = ({ message = 'Something went wrong' }: { message?: string }) => {
  return (
    <div className="flex h-full flex-col items-center justify-center">
      <LucideAlertTriangle className="mb-2 size-6 text-muted-foreground" />
      <p className="text-sm font-medium text-muted-foreground">{message}</p>
    </div>
  )
}
