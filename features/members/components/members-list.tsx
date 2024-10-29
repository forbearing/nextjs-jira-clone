'use client'

import { DottedSeparator } from '@/components/dotted-separator'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { useGetMembers } from '@/features/members/api/use-get-member'
import { useWorkspaceId } from '@/features/workspaces/hooks/use-workspace-id'
import { LucideArrowLeft, LucideMoreVertical } from 'lucide-react'
import Link from 'next/link'
import { Fragment } from 'react'
import { MemberAvatar } from './member-avatar'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { useDeleteMember } from '../api/use-delete-member'
import { useUpdateMember } from '../api/use-update-member'
import { MemberRole } from '../types'
import { useConfirm } from '@/hooks/use-confirm'

export const MembersList = () => {
  const workspaceId = useWorkspaceId()
  const { data } = useGetMembers({ workspaceId })
  const [ConfirmDialog, confirm] = useConfirm({
    title: 'Remove member',
    message: 'This member will be removed from the workspace.',
    variant: 'destructive',
  })
  const { mutate: deleteMember, isPending: isDeletingMember } = useDeleteMember()
  const { mutate: updateMember, isPending: isUpdatingMember } = useUpdateMember()
  const handleUpdateMember = (memberId: string, role: MemberRole) => {
    updateMember({ json: { role }, param: { memberId } })
  }
  const handleDeleteMember = async (memberId: string) => {
    const ok = await confirm()
    if (!ok) return
    deleteMember(
      { param: { memberId } },
      {
        onSuccess: () => {
          window.location.reload()
        },
      },
    )
  }

  return (
    <Card className="h-full w-full border-none shadow-none">
      <ConfirmDialog />
      <CardHeader className="flex flex-row items-center gap-x-4 space-y-0 p-7">
        <Button variant="secondary" size="sm" asChild>
          <Link href={`/workspaces/${workspaceId}`}>
            <LucideArrowLeft />
            Back
          </Link>
        </Button>
        <CardTitle className="text-xl font-bold">Members list</CardTitle>
      </CardHeader>
      <DottedSeparator className="px-7" />
      <CardContent className="p-7">
        {data?.documents.map((member, index) => (
          <Fragment>
            <div className="flex items-center gap-2">
              <MemberAvatar className="size-10" fallbackClassName="text-lg" name={member.name} />
              <div className="flex flex-col">
                <p className="text-sm font-medium">{member.name}</p>
                <p className="text-xs text-muted-foreground">{member.email}</p>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="ml-auto focus-visible:ring-0" variant="secondary" size="icon">
                    <LucideMoreVertical className="size-4 text-muted-foreground" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent side="bottom" align="end">
                  <DropdownMenuItem
                    className="font-medium"
                    onClick={() => handleUpdateMember(member.$id, MemberRole.ADMIN)}
                    disabled={isUpdatingMember}
                  >
                    Set as Administrator
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="font-medium"
                    onClick={() => handleUpdateMember(member.$id, MemberRole.MEMBER)}
                    disabled={isUpdatingMember}
                  >
                    Set as Member
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="font-medium text-amber-700"
                    onClick={() => handleDeleteMember(member.$id)}
                    disabled={isDeletingMember}
                  >
                    Remove {member.name}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            {index < data.documents.length - 1 && <Separator className="my-2.5" />}
          </Fragment>
        ))}
      </CardContent>
    </Card>
  )
}
