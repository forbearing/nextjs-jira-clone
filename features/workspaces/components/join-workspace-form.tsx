'use client'

import { DottedSeparator } from '@/components/dotted-separator'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import { useJoinWorkspace } from '../api/use-join-workspace'
import { useInviteCode } from '../hooks/use-invite-code'
import { useWorkspaceId } from '../hooks/use-workspace-id'
import { useRouter } from 'next/navigation'

export const JoinWorkspaceForm = ({ initialValues }: { initialValues: { name: string } }) => {
  const router = useRouter()
  const workspaceId = useWorkspaceId()
  const inviteCode = useInviteCode()
  const { mutate, isPending } = useJoinWorkspace()

  const onSubmit = () => {
    mutate(
      {
        param: { workspaceId },
        json: { code: inviteCode },
      },
      {
        onSuccess: ({ data }) => {
          router.push(`/workspaces/${data.$id}`)
        },
      },
    )
  }
  return (
    <Card className="h-full w-full border-none shadow-none">
      <CardHeader className="p-7">
        <CardTitle className="text-xl font-bold">Join Workspace</CardTitle>
        <CardDescription>
          You&apos;ve been invited to join <strong>{initialValues.name}</strong>;
        </CardDescription>
      </CardHeader>
      <DottedSeparator className="p-7" />
      <CardContent>
        <div className="flex flex-col items-center justify-between gap-2 lg:flex-row">
          <Button className="w-full lg:w-fit" variant="secondary" type="button" size="lg" disabled={isPending}>
            <Link href="/">Cancel</Link>
          </Button>
          <Button className="w-full lg:w-fit" size="lg" type="button" onClick={onSubmit} disabled={isPending}>
            Join Workspace
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
