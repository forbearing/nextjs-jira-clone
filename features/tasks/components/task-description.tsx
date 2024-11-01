import { Button } from '@/components/ui/button'
import { Task } from '../types'
import { LucidePencil, LucideX } from 'lucide-react'
import { DottedSeparator } from '@/components/dotted-separator'
import { useState } from 'react'
import { useUpdateTask } from '../api/use-update-task'
import { Textarea } from '@/components/ui/textarea'

export const TaskDescription = ({ task }: { task: Task }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [value, setValue] = useState(task.description)
  const { mutate, isPending } = useUpdateTask()

  const handleSave = () => {
    mutate(
      {
        json: { description: value },
        param: { taskId: task.$id },
      },
      {
        onSuccess: () => setIsEditing(false),
      },
    )
  }

  return (
    <div className="rounded-lg border p-4">
      <div className="flex items-center justify-between">
        <p className="text-lg font-semibold">Overview</p>
        <Button size="sm" variant="secondary" onClick={() => setIsEditing((prev) => !prev)} disabled={isPending}>
          {isEditing ? <LucideX className="mr-2 size-4" /> : <LucidePencil className="mr-2 size-4" />}
          {isEditing ? 'Cancel' : 'Edit'}
        </Button>
      </div>
      <DottedSeparator className="my-4" />
      {isEditing ? (
        <div className="flex flex-col gap-y-4">
          <Textarea
            placeholder="Add a description..."
            value={value}
            rows={4}
            onChange={(e) => setValue(e.target.value)}
            disabled={isPending}
          />
          <Button size="sm" className="ml-auto w-fit" onClick={handleSave} disabled={isPending}>
            {isPending ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      ) : (
        <div>{task.description || <span className="text-muted-foreground">No description Set</span>}</div>
      )}
    </div>
  )
}
