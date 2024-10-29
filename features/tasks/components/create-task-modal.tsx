'use client'

import { ResponsiveModal } from '@/components/responsive-modal'
import { useCreateTaskModal } from '../hooks/use-create-project-modal'

export const CreateTaskModal = () => {
  const { isOpen, setIsOpen } = useCreateTaskModal()
  return (
    <ResponsiveModal open={isOpen} onOpenChange={setIsOpen}>
      <div>TODO: task form</div>
    </ResponsiveModal>
  )
}
