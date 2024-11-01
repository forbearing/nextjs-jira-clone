import { ProjectAnalyticsResonseType } from '@/features/projects/api/use-get-project-analytics'
import { ScrollArea, ScrollBar } from './ui/scroll-area'
import { AnalyticsCard } from './analytics-card'
import { DottedSeparator } from './dotted-separator'

export const Analytics = ({ data }: ProjectAnalyticsResonseType) => {
  return (
    <ScrollArea className="w-full shrink-0 whitespace-nowrap rounded-lg border">
      <div className="flex w-full flex-row">
        <div className="flex flex-1 items-center">
          <AnalyticsCard
            title="Total tasks"
            value={data.taskCount}
            variant={data.taskDifference > 0 ? 'up' : 'down'}
            increaseValue={data.taskDifference}
          />
          <DottedSeparator direction="vertical" className="py-0.5" />
        </div>
        <div className="flex flex-1 items-center">
          <AnalyticsCard
            title="Assigned Tasks"
            value={data.assignedTaskCount}
            variant={data.assignedTaskDifference > 0 ? 'up' : 'down'}
            increaseValue={data.assignedTaskDifference}
          />
          <DottedSeparator direction="vertical" className="py-0.5" />
        </div>
        <div className="flex flex-1 items-center">
          <AnalyticsCard
            title="Completed Tasks"
            value={data.completeTaskCount}
            variant={data.completeTaskDifference > 0 ? 'up' : 'down'}
            increaseValue={data.completeTaskDifference}
          />
          <DottedSeparator direction="vertical" className="py-0.5" />
        </div>
        <div className="flex flex-1 items-center">
          <AnalyticsCard
            title="Overdue Tasks"
            value={data.overdueTaskCount}
            variant={data.overdueTaskDifference > 0 ? 'up' : 'down'}
            increaseValue={data.overdueTaskDifference}
          />
          <DottedSeparator direction="vertical" className="py-0.5" />
        </div>
        <div className="flex flex-1 items-center">
          <AnalyticsCard
            title="Incomplete Tasks"
            value={data.incompleteTaskCount}
            variant={data.incompleteTaskDifference > 0 ? 'up' : 'down'}
            increaseValue={data.incompleteTaskDifference}
          />
        </div>
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  )
}
