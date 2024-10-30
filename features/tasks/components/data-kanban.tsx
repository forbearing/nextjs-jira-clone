import { useState } from 'react'
import { Task, TaskStatus } from '../types'
import { DragDropContext } from '@hello-pangea/dnd'
import { KanbanColumnHeader } from './kanban-column-header'

const boards: TaskStatus[] = [
  TaskStatus.BACKLOG,
  TaskStatus.TODO,
  TaskStatus.IN_PROGRESS,
  TaskStatus.IN_REVIEW,
  TaskStatus.DONE,
]

type TasksState = {
  [key in TaskStatus]: Task[]
}

export const DataKanban = ({ data }: { data: Task[] }) => {
  const [tasks, setTasks] = useState<TasksState>(() => {
    const initialTasks: TasksState = {
      [TaskStatus.BACKLOG]: [],
      [TaskStatus.TODO]: [],
      [TaskStatus.IN_PROGRESS]: [],
      [TaskStatus.IN_REVIEW]: [],
      [TaskStatus.DONE]: [],
    }
    data.forEach((task) => {
      initialTasks[task.status].push(task)
    })
    Object.keys(initialTasks).forEach((status) => {
      initialTasks[status as TaskStatus].sort((a, b) => a.position - b.position)
    })
    return initialTasks
  })

  return (
    <DragDropContext onDragEnd={() => {}}>
      <div className="flex overflow-x-auto">
        {boards.map((board) => (
          <div key={board} className="mx-2 min-w-[200px] flex-1 rounded-md bg-muted p-1.5">
            <KanbanColumnHeader board={board} taskCount={tasks[board].length} />
          </div>
        ))}
      </div>
    </DragDropContext>
  )
}
