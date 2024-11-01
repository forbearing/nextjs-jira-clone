'use client'

import { PageError } from '@/components/page-error'
import { PageLoader } from '@/components/page-loader'
import { Button } from '@/components/ui/button'
import { useGetProject } from '@/features/projects/api/use-get-project'
import { ProjectAvatar } from '@/features/projects/components/project-avatar'
import { useProjectId } from '@/features/projects/hooks/use-project-id'
import { TaskViewSwitcher } from '@/features/tasks/components/task-view-switcher'
import { LucidePencil } from 'lucide-react'
import Link from 'next/link'

export const ProjectIdClient = async () => {
  const projectId = useProjectId()
  const { data, isLoading } = useGetProject({ projectId })

  if (isLoading) return <PageLoader />
  if (!data) return <PageError message="Project not found" />

  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-2">
          <ProjectAvatar name={data.name} imageUrl={data.imageUrl} className="size-8" />
          <p className="text-xl font-semibold">{data.name}</p>
        </div>
        <div>
          <Button variant="secondary" size="sm" asChild>
            <Link href={`/workspaces/${data.workspaceId}/projects/${data.$id}/settings`}>
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
