import { getCurrent } from '@/features/auth/queries'
import { EditWorkspaceForm } from '@/features/workspaces/components/edit-workspace-form'
import { getWorkspace } from '@/features/workspaces/queries'
import { redirect } from 'next/navigation'

interface props {
  params: {
    workspaceId: string
  }
}

export default async ({ params }: props) => {
  const user = await getCurrent()
  if (!user) redirect('/sign-in')
  const initialValue = await getWorkspace({ workspaceId: params.workspaceId })

  return (
    <div className="w-full lg:max-w-xl">
      <EditWorkspaceForm initialValues={initialValue} />
    </div>
  )
}
