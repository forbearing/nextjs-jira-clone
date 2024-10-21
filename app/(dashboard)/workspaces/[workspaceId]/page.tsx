import { getCurrent } from '@/features/auth/queries'
import { redirect } from 'next/navigation'

export default async ({ params }: { params: { workspaceId: string } }) => {
  const user = await getCurrent()
  if (!user) redirect('/sign-in')

  return <div>{params.workspaceId}</div>
}
