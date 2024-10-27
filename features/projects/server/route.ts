import { DATABASE_ID, IMAGE_BUCKET_ID, MEMBER_ID, PROJECT_ID, WORKSPACE_ID } from '@/config'
import { getMember } from '@/features/members/utils'
import { sessionMiddleware } from '@/lib/session-middleware'
import { zValidator } from '@hono/zod-validator'
import { Hono } from 'hono'
import { ID, Query } from 'node-appwrite'
import { z } from 'zod'
import { createProjectSchema } from '../schemas'

const app = new Hono()
  .post('/', sessionMiddleware, zValidator('form', createProjectSchema), async (c) => {
    const databases = c.get('databases')
    const storage = c.get('storage')
    const user = c.get('user')

    const { name, image, workspaceId } = c.req.valid('form')

    const member = await getMember({
      databases,
      workspaceId,
      userId: user.$id,
    })
    if (!member) {
      return c.json({ error: 'Unauthorized' }, 401)
    }

    let uploadImageUrl: string | undefined
    if (image instanceof File) {
      const file = await storage.createFile(IMAGE_BUCKET_ID, ID.unique(), image)
      const arrayBuffer = await storage.getFilePreview(IMAGE_BUCKET_ID, file.$id)
      uploadImageUrl = `data:image/png;base64,${Buffer.from(arrayBuffer).toString('base64')}`
    }
    const project = await databases.createDocument(DATABASE_ID, PROJECT_ID, ID.unique(), {
      name: name,
      imageUrl: uploadImageUrl,
      workspaceId,
    })

    return c.json({ data: project })
  })
  .get('/', sessionMiddleware, zValidator('query', z.object({ workspaceId: z.string() })), async (c) => {
    const user = c.get('user')
    const databases = c.get('databases')
    const { workspaceId } = c.req.valid('query')
    if (!workspaceId) {
      return c.json({ error: 'Missing workspaceId' }, 400)
    }

    const member = await getMember({ databases, workspaceId, userId: user.$id })
    if (!member) {
      return c.json({ error: 'Unauthorized' }, 401)
    }

    const projects = await databases.listDocuments(DATABASE_ID, PROJECT_ID, [
      Query.equal('workspaceId', workspaceId),
      Query.orderDesc('$createdAt'),
    ])

    return c.json({ data: projects })
  })
export default app
