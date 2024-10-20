import { DATABASE_ID, IMAGE_BUCKET_ID, MEMBER_ID, WORKSPACE_ID } from '@/config'
import { MemberRole } from '@/features/members/types'
import { sessionMiddleware } from '@/lib/session-middleware'
import { zValidator } from '@hono/zod-validator'
import { Hono } from 'hono'
import { ID, Query } from 'node-appwrite'
import { createWorkspaceSchema } from '../schemas'
import { generateInviteCode } from '@/lib/utils'

const app = new Hono()
  .post('/', zValidator('form', createWorkspaceSchema), sessionMiddleware, async (c) => {
    const databases = c.get('databases')
    const storage = c.get('storage')
    const user = c.get('user')

    const { name, image } = c.req.valid('form')
    let uploadImageUrl: string | undefined
    if (image instanceof File) {
      const file = await storage.createFile(IMAGE_BUCKET_ID, ID.unique(), image)
      const arrayBuffer = await storage.getFilePreview(IMAGE_BUCKET_ID, file.$id)
      uploadImageUrl = `data:image/png;base64,${Buffer.from(arrayBuffer).toString('base64')}`
    }
    const workspace = await databases.createDocument(DATABASE_ID, WORKSPACE_ID, ID.unique(), {
      name: name,
      userId: user.$id,
      imageUrl: uploadImageUrl,
      inviteCode: generateInviteCode(6),
    })

    await databases.createDocument(DATABASE_ID, MEMBER_ID, ID.unique(), {
      userId: user.$id,
      workspaceId: workspace.$id,
      role: MemberRole.ADMIN,
    })

    return c.json({ data: workspace })
  })
  .get('/', sessionMiddleware, async (c) => {
    const user = c.get('user')
    const databases = c.get('databases')
    const members = await databases.listDocuments(DATABASE_ID, MEMBER_ID, [Query.equal('userId', user.$id)])
    if (members.total === 0) {
      return c.json({ data: { documents: [], total: 0 } })
    }
    const workspaceIds = members.documents.map((member) => member.workspaceId)

    const workspaces = await databases.listDocuments(DATABASE_ID, WORKSPACE_ID, [
      Query.orderDesc('$createdAt'),
      Query.contains('$id', workspaceIds),
    ])
    return c.json({ data: workspaces })
  })
export default app
