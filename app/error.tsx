'use client'

import { Button } from '@/components/ui/button'
import { LucideAlertTriangle } from 'lucide-react'
import Link from 'next/link'

export default () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-y-2">
      <LucideAlertTriangle className="size-6 text-muted-foreground" />
      <p className="text-sm text-muted-foreground">Something went wrong</p>
      <Button variant="secondary" size="sm" asChild>
        <Link href="/">Back to home</Link>
      </Button>
    </div>
  )
}
