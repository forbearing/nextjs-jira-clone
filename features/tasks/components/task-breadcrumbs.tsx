import { Project } from '@/features/projects/types'
import { Task } from '../types'
import { ProjectAvatar } from '@/features/projects/components/project-avatar'
import Link from 'next/link'
import { useWorkspaceId } from '@/features/workspaces/hooks/use-workspace-id'
import { LucideChevronRight, LucideTrash } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useDeleteTask } from '../api/use-delete-task'
import { useConfirm } from '@/hooks/use-confirm'
import { useRouter } from 'next/navigation'

export const TaskBreadcrumbs = ({ project, task }: { project: Project; task: Task }) => {
  const router = useRouter()
  const workspaceId = useWorkspaceId()
  const { mutate, isPending } = useDeleteTask()
  const [ConfirmDialog, confirm] = useConfirm({
    title: 'Delete Task',
    message: 'This action cannot be undone.',
    variant: 'destructive',
  })
  const handleDeleteTask = async () => {
    const ok = await confirm()
    if (!ok) return
    mutate(
      { param: { taskId: task.$id } },
      {
        onSuccess: () => {
          router.push(`/workspaces/${workspaceId}/tasks`)
        },
      },
    )
  }
  return (
    <div className="flex items-center gap-x-2">
      <ProjectAvatar name={project.name} imageUrl={project.imageUrl} className="size-6 lg:size-0" />
      <Link href={`/workspaces/${workspaceId}/projects/${project.$id}`}>
        <p className="text-sm font-semibold text-muted-foreground transition hover:opacity-75 lg:text-lg">
          {project.name}
        </p>
      </Link>
      <LucideChevronRight className="size-4 text-muted-foreground lg:size-5" />
      <p className="text-sm font-semibold lg:text-lg">{task.name}</p>
      <Button className="ml-auto" variant="destructive" size="sm" onClick={handleDeleteTask} disabled={isPending}>
        <LucideTrash className="size-4 lg:mr-2" />
        <span className="hidden lg:block">Delete Task</span>
      </Button>
    </div>
  )
}
