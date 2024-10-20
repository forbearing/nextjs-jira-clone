'use server'

import { getCurrent } from '@/features/auth/actions'
import { getWorkspace } from '@/features/workspaces/actions'
import { CreateWorkspaceForm } from '@/features/workspaces/components/create-workspace-form'
import { redirect } from 'next/navigation'

export default async function Home() {
  const user = await getCurrent()
  const workspaces = await getWorkspace()
  if (workspaces.total == 0) {
    redirect('/workspaces/create')
  } else {
    redirect(`/workspaces/${workspaces.documents[0].$id}`)
  }
}
