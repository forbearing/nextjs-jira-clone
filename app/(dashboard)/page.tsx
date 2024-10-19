'use server'

import { getCurrent } from '@/features/auth/actions'
import { UserButton } from '@/features/auth/components/user-button'
import { logger } from '@/lib/logger'
import { redirect } from 'next/navigation'

export default async function Home() {
  const user = await getCurrent()

  // console.log(user)
  // logger.info(user)
  if (!user) redirect('/sign-in')

  return (
    <div>
      this is a home page
      {/* <UserButton /> */}
    </div>
  )
}
