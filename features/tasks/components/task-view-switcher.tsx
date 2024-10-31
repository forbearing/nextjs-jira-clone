'use client'

import { DottedSeparator } from '@/components/dotted-separator'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useWorkspaceId } from '@/features/workspaces/hooks/use-workspace-id'
import { LucideLoader, LucidePlus } from 'lucide-react'
import { useQueryState } from 'nuqs'
import { useGetTasks } from '../api/use-get-tasks'
import { useCreateTaskModal } from '../hooks/use-create-task-modal'
import { useTaskFilters } from '../hooks/use-task-filters'
import { columns } from './columns'
import { DataFilters } from './data-filters'
import { DataTable } from './data-table'
import { DataKanban } from './data-kanban'
import { useCallback } from 'react'
import { TaskStatus } from '../types'
import { useBulkUpdateTasks } from '../api/use-bulk-update-tasks'
import { DataCalendar } from './data-calendar'

export const TaskViewSwitcher = ({ hideProjectFilter }: { hideProjectFilter?: boolean }) => {
  const [{ status, assigneeId, projectId, dueDate }] = useTaskFilters()
  const [view, setView] = useQueryState('task-view', {
    defaultValue: 'table',
  })
  const workspaceId = useWorkspaceId()
  const { open } = useCreateTaskModal()
  const { mutate: bulkUpdate } = useBulkUpdateTasks()
  const { data: tasks, isLoading: isLoadingTasks } = useGetTasks({
    workspaceId,
    projectId,
    assigneeId,
    status,
    dueDate,
  })

  const onKanbanChange = useCallback(
    (tasks: { $id: string; status: TaskStatus; position: number }[]) => {
      bulkUpdate({
        json: { tasks },
      })
    },
    [bulkUpdate],
  )

  return (
    <Tabs className="w-full flex-1 rounded-lg border" defaultValue={view} onValueChange={setView}>
      <div className="flex h-full flex-col overflow-auto p-4">
        <div className="flex flex-col items-center justify-between gap-y-2 lg:flex-row">
          <TabsList className="w-full lg:w-auto">
            <TabsTrigger className="h-8 w-full lg:w-auto" value="table">
              Table
            </TabsTrigger>
            <TabsTrigger className="h-8 w-full lg:w-auto" value="kanban">
              Kanban
            </TabsTrigger>
            <TabsTrigger className="h-8 w-full lg:w-auto" value="calendar">
              Calendar
            </TabsTrigger>
          </TabsList>
          <Button className="w-full lg:w-auto" size="sm" onClick={open}>
            <LucidePlus className="mr-2 size-4" />
            New
          </Button>
        </div>
        <DottedSeparator className="my-4" />
        <DataFilters hideProjectFilter={hideProjectFilter} />
        <DottedSeparator className="my-4" />
        {isLoadingTasks ? (
          <div className="flex h-[200px] w-full flex-col items-center justify-center rounded-lg border">
            <LucideLoader className="size-5 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <>
            <TabsContent value="table" className="mt-0">
              <DataTable columns={columns} data={tasks?.documents ?? []} />
            </TabsContent>
            <TabsContent value="kanban" className="mt-0">
              <DataKanban data={tasks?.documents ?? []} onChange={onKanbanChange} />
            </TabsContent>
            <TabsContent value="calendar" className="mt-0 h-full pb-8">
              <DataCalendar data={tasks?.documents ?? []} />
            </TabsContent>
          </>
        )}
      </div>
    </Tabs>
  )
}
