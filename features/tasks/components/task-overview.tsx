import { Button } from '@/components/ui/button'
import { Task } from '../types'
import { LucidePencil } from 'lucide-react'
import { DottedSeparator } from '@/components/dotted-separator'
import { OverviewProperty } from '@/components/overview-property'
import { MemberAvatar } from '@/features/members/components/member-avatar'
import { TaskDate } from './task-date'
import { Badge } from '@/components/ui/badge'
import { snakeCaseToTitleCase } from '@/lib/utils'
import { useEditTaskModal } from '../hooks/use-edit-task-modal'

export const TaskOverview = ({ task }: { task: Task }) => {
  const { open } = useEditTaskModal()

  return (
    <div className="col-span-1 flex flex-col gap-y-4">
      <div className="rounded-lg bg-muted p-4">
        <div className="flex items-center justify-between">
          <p className="text-lg font-semibold">OverView</p>
          <Button variant="secondary" onClick={() => open(task.$id)}>
            <LucidePencil className="mr-2 size-4" />
            Edit
          </Button>
        </div>
        <DottedSeparator className="my-4" />
        <div className="flex flex-col gap-y-4">
          <OverviewProperty label="Assignee">
            <MemberAvatar name={task.assignee.name} className="size-6" />
            <p className="text-sm font-medium">{task.assignee.name}</p>
          </OverviewProperty>
          <OverviewProperty label="Due Date">
            <TaskDate value={task.dueDate} className="text-sm font-medium" />
          </OverviewProperty>
          <OverviewProperty label="Status">
            <Badge variant={task.status}>{snakeCaseToTitleCase(task.status)}</Badge>
          </OverviewProperty>
        </div>
      </div>
    </div>
  )
}
