import { snakeCaseToTitleCase } from '@/lib/utils'
import { TaskStatus } from '../types'
import {
  LucideCircle,
  LucideCircleCheck,
  LucideCircleDashed,
  LucideCircleDot,
  LucideCircleDotDashed,
  LucidePlus,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCreateTaskModal } from '../hooks/use-create-task-modal'

const statusIconMap: Record<TaskStatus, React.ReactNode> = {
  [TaskStatus.BACKLOG]: <LucideCircleDashed className="size-[18px] text-pink-400" />,
  [TaskStatus.TODO]: <LucideCircle className="size-[18px] text-red-400" />,
  [TaskStatus.IN_PROGRESS]: <LucideCircleDotDashed className="size-[18px] text-yellow-400" />,
  [TaskStatus.IN_REVIEW]: <LucideCircleDot className="size-[18px] text-blue-400" />,
  [TaskStatus.DONE]: <LucideCircleCheck className="size-[18px] text-emerald-400" />,
}

export const KanbanColumnHeader = ({ board, taskCount }: { board: TaskStatus; taskCount: number }) => {
  const { open } = useCreateTaskModal()
  const icon = statusIconMap[board]
  return (
    <div className="flex items-center justify-between px-2 py-1.5">
      <div className="flex items-center gap-x-2">
        {icon}
        <h2 className="text-sm font-medium">{snakeCaseToTitleCase(board)}</h2>
        <div className="flex size-5 items-center justify-center rounded-md bg-neutral-200 text-xs font-medium text-neutral-700">
          {taskCount}
        </div>
      </div>
      <Button onClick={open} variant="ghost" size="icon" className="size-5">
        <LucidePlus className="size-4 text-neutral-500" />
      </Button>
    </div>
  )
}
