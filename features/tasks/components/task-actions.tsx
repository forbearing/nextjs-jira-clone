import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { LucideExternalLink, LucidePencil, LucideTrash } from 'lucide-react'
import React from 'react'

export const TaskActions = ({
  id,
  projectId,
  children,
}: {
  id: string
  projectId: string
  children: React.ReactNode
}) => {
  return (
    <div className="flex justify-end">
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem onClick={() => {}} disabled={false} className="p-[10px] font-medium">
            <LucideExternalLink className="mr-2 size-4 stroke-2" />
            Task Details
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => {}} disabled={false} className="p-[10px] font-medium">
            <LucideExternalLink className="mr-2 size-4 stroke-2" />
            Open Project
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => {}} disabled={false} className="p-[10px] font-medium">
            <LucidePencil className="mr-2 size-4 stroke-2" />
            Edit Task
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {}}
            disabled={false}
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
