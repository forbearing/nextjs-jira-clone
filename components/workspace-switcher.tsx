'use client'

import { useGetWorkspace } from '@/features/workspaces/api/use-get-workspace'
import { RiAddCircleFill } from 'react-icons/ri'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { WorkspaceAvatar } from '@/features/workspaces/components/workspace-avatar'

export const WorkspaceSwitcher = () => {
  const { data: workspaces } = useGetWorkspace()
  console.log('useGetWorkspace:', workspaces)
  return (
    <div className="flex flex-col gap-y-2">
      <div className="flex items-center justify-between">
        <p className="text-xs uppercase text-neutral-500">Workspaces</p>
        <RiAddCircleFill className="size-5 cursor-pointer text-neutral-500 transition hover:opacity-75" />
      </div>
      <Select>
        <SelectTrigger className="w-full bg-neutral-200 p-1 font-medium focus:ring-transparent">
          <SelectValue placeholder="No workspace selected"></SelectValue>
        </SelectTrigger>
        <SelectContent>
          {workspaces?.documents.map((workspace) => (
            <SelectItem key={workspace.$id} value={workspace.$id}>
              <div className="flex items-center justify-start gap-3 font-medium">
                <WorkspaceAvatar name={workspace.name} image={workspace.imageUrl} />
                <span className="truncate">{workspace.name}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
