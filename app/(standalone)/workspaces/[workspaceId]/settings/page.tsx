import { getCurrent } from '@/features/auth/queries'
import { redirect } from 'next/navigation'
import { WorkspaceIdSettingClient } from './client'

export default async () => {
  const user = await getCurrent()
  if (!user) redirect('/sign-in')

  return <WorkspaceIdSettingClient />
}
