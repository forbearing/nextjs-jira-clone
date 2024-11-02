import { getCurrent } from '@/features/auth/queries'
import { redirect } from 'next/navigation'
import { WorkspaceIdClient } from './client'

export default async () => {
  const user = await getCurrent()
  if (!user) redirect('/sign-in')

  return <WorkspaceIdClient />
}
