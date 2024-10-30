'use client'

import { ColumnDef } from '@tanstack/react-table'
import { Task } from '../types'
import { Button } from '@/components/ui/button'
import { LucideArrowUpDown, LucideMoreVertical } from 'lucide-react'
import { ProjectAvatar } from '@/features/projects/components/project-avatar'
import { MemberAvatar } from '@/features/members/components/member-avatar'
import { TaskDate } from './task-date'
import { Badge } from '@/components/ui/badge'
import { snakeCaseToTitleCase } from '@/lib/utils'
import { TaskActions } from './task-actions'

export const columns: ColumnDef<Task>[] = [
  {
    accessorKey: 'name',
    // header: 'Task Name',
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Task Name
          <LucideArrowUpDown className="ml-2 size-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      return <p className="line-clamp-1">{row.original.name}</p>
    },
  },
  {
    accessorKey: 'project',
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Project
          <LucideArrowUpDown className="ml-2 size-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const project = row.original.project
      return (
        <div className="flex items-center gap-x-2 text-sm font-medium">
          <ProjectAvatar name={project.name} imageUrl={project.imageUrl} className="size-6" />
          <p className="line-clamp-1">{project.name}</p>
        </div>
      )
    },
  },
  {
    accessorKey: 'assignee',
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Assignee
          <LucideArrowUpDown className="ml-2 size-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const assignee = row.original.assignee
      return (
        <div className="flex items-center gap-x-2 text-sm font-medium">
          <MemberAvatar name={assignee.name} className="size-6" fallbackClassName="text-xs" />
          <p className="line-clamp-1">{assignee.name}</p>
        </div>
      )
    },
  },
  {
    accessorKey: 'dueDate',
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Due Date
          <LucideArrowUpDown className="ml-2 size-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const dueDate = row.original.dueDate
      return <TaskDate value={dueDate} />
    },
  },
  {
    accessorKey: 'status',
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Status
          <LucideArrowUpDown className="ml-2 size-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const status = row.original.status
      return <Badge variant={status}>{snakeCaseToTitleCase(status)}</Badge>
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const id = row.original.$id
      const projectId = row.original.projectId

      return (
        <TaskActions id={id} projectId={projectId}>
          <Button variant="ghost" className="size-8 p-0">
            <LucideMoreVertical className="size-4" />
          </Button>
        </TaskActions>
      )
    },
  },
]
