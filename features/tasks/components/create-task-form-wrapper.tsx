import { useGetMember } from '@/features/members/api/use-get-member'
import { useGetProjects } from '@/features/projects/api/use-get-projects'
import { useWorkspaceId } from '@/features/workspaces/hooks/use-workspace-id'

export const CreateTaskFormWrapper = ({ onCancel }: { onCancel: () => void }) => {
  const workspaceId = useWorkspaceId()
  const { data: projects, isLoading: isLoadingProjects } = useGetProjects({ workspaceId: workspaceId })
  const {} = useGetMember({ workspaceId: workspaceId })
}
