'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { useCurrent } from '@/features/auth/api/use-current'
import { useLogout } from '@/features/auth/api/use-logout'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function Home() {
  const router = useRouter()
  const { data, isLoading } = useCurrent()
  const { mutate } = useLogout()

  useEffect(() => {
    if (!data && !isLoading) {
      router.push('/sign-in')
    }
  }, [data])

  return (
    <div>
      only visiable to authorized users.
      <Button onClick={() => mutate()}>Logout.</Button>
    </div>
  )

  return (
    <div className="space-y-2">
      <Button>hello</Button>
      <Button size="xs">hello</Button>
      <Button disabled>hello</Button>
      <Button variant="destructive">destructive</Button>
      <Button variant="outline">outline</Button>
      <Button variant="secondary">secondary</Button>
      <Button variant="ghost">ghost</Button>
      <Button variant="muted">muted</Button>
      <Button variant="teritary">teritary</Button>

      <Input />
      <Select />
    </div>
  )
}
