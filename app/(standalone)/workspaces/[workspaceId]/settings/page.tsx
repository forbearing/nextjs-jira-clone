import { getCurrent } from '@/features/auth/actions'
import { redirect } from 'next/navigation'

interface props {
  params: {
    workspaceId: string
  }
}

export default async ({ params }: props) => {
  const user = await getCurrent()
  if (!user) redirect('/sign-in')

  return (
    <div>
      <h1>Settings {params.workspaceId}</h1>
    </div>
  )
}
