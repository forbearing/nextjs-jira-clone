import { LucideLoader } from 'lucide-react'

export default () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <LucideLoader className="size-6 animate-spin text-muted-foreground" />
    </div>
  )
}
