import { LucideLoader } from 'lucide-react'

export const PageLoader = () => {
  return (
    <div className="flex h-full items-center justify-center">
      <LucideLoader className="size-6 animate-spin text-muted-foreground" />
    </div>
  )
}
