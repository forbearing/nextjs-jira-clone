import { Card, CardContent } from '@/components/ui/card'
import { useGetMembers } from '@/features/members/api/use-get-member'
import { useGetProjects } from '@/features/projects/api/use-get-projects'
import { useWorkspaceId } from '@/features/workspaces/hooks/use-workspace-id'
import { LucideLoader } from 'lucide-react'
import { EditTaskForm } from './edit-task-form'
import { useGetTask } from '../api/use-get-task'

export const EditTaskFormWrapper = ({ onCancel, id }: { onCancel: () => void; id: string }) => {
  const workspaceId = useWorkspaceId()
  const { data: initialValues, isLoading: isLoadingTask } = useGetTask({ taskId: id })
  const { data: projects, isLoading: isLoadingProjects } = useGetProjects({ workspaceId: workspaceId })
  const { data: members, isLoading: isLoadingMembers } = useGetMembers({ workspaceId: workspaceId })
  const projectOptions = projects?.documents.map((project) => ({
    id: project.$id,
    name: project.name,
    imageUrl: project.imageUrl,
  }))
  const memberOptions = members?.documents.map((member) => ({
    id: member.$id,
    name: member.name,
  }))

  const isLoading = isLoadingProjects || isLoadingMembers || isLoadingTask
  if (isLoading) {
    return (
      <Card className="h-[714px] w-full border-none shadow-none">
        <CardContent className="flex h-full items-center justify-center">
          <LucideLoader className="size-5 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    )
  }
  if (!initialValues) {
    return null
  }

  return (
    <EditTaskForm
      onCancel={onCancel}
      projectOptions={projectOptions ?? []}
      memberOptions={memberOptions ?? []}
      initialValues={initialValues}
    />
  )
}
