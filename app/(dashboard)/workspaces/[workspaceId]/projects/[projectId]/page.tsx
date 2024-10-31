import { Button } from '@/components/ui/button'
import { getCurrent } from '@/features/auth/queries'
import { ProjectAvatar } from '@/features/projects/components/project-avatar'
import { getProject } from '@/features/projects/queries'
import { TaskViewSwitcher } from '@/features/tasks/components/task-view-switcher'
import { LucidePencil } from 'lucide-react'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export default async ({ params }: { params: { projectId: string } }) => {
  const user = await getCurrent()
  if (!user) redirect('/sign-in')

  const initialValues = await getProject({
    projectId: params.projectId,
  })

  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-2">
          <ProjectAvatar name={initialValues.name} imageUrl={initialValues.imageUrl} className="size-8" />
          <p className="text-xl font-semibold">{initialValues.name}</p>
        </div>
        <div>
          <Button variant="secondary" size="sm" asChild>
            <Link href={`/workspaces/${initialValues.workspaceId}/projects/${initialValues.$id}/settings`}>
              <LucidePencil className="mr-2 size-4" />
              Edit project
            </Link>
          </Button>
        </div>
      </div>
      <TaskViewSwitcher hideProjectFilter />
    </div>
  )
}
