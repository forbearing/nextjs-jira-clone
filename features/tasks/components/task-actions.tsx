import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { useConfirm } from '@/hooks/use-confirm'
import { LucideExternalLink, LucidePencil, LucideTrash } from 'lucide-react'
import React from 'react'
import { useDeleteTask } from '../api/use-delete-task'
import { useRouter } from 'next/navigation'
import { useWorkspaceId } from '@/features/workspaces/hooks/use-workspace-id'
import { useEditTaskModal } from '../hooks/use-edit-task-modal'

export const TaskActions = ({
  id,
  projectId,
  children,
}: {
  id: string
  projectId: string
  children: React.ReactNode
}) => {
  const workspaceId = useWorkspaceId()
  const router = useRouter()
  const { open } = useEditTaskModal()
  const [ConfirmDialog, confirm] = useConfirm({
    title: 'Delete Task',
    message: 'This action cannot be undone.',
    variant: 'destructive',
  })
  const { mutate, isPending } = useDeleteTask()
  const onDelete = async () => {
    const ok = await confirm()
    if (!ok) return
    mutate({ param: { taskId: id } })
  }

  const onOpenTask = () => {
    router.push(`/workspaces/${workspaceId}/tasks/${id}`)
  }
  const onOpenProject = () => {
    router.push(`/workspaces/${workspaceId}/projects/${projectId}`)
  }

  return (
    <div className="flex justify-end">
      <ConfirmDialog />
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem onClick={onOpenTask} className="p-[10px] font-medium">
            <LucideExternalLink className="mr-2 size-4 stroke-2" />
            Task Details
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onOpenProject} className="p-[10px] font-medium">
            <LucideExternalLink className="mr-2 size-4 stroke-2" />
            Open Project
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => open(id)} className="p-[10px] font-medium">
            {' '}
            <LucidePencil className="mr-2 size-4 stroke-2" />
            Edit Task
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={onDelete}
            disabled={isPending}
            className="p-[10px] font-medium text-amber-700 focus:text-amber-700"
          >
            <LucideTrash className="mr-2 size-4 stroke-2" />
            Delete Task
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
