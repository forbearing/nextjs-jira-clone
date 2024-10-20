import { DATABASE_ID, MEMBER_ID } from '@/config'
import { Databases, Query } from 'node-appwrite'
import { queryObjects } from 'v8'

interface props {
  databases: Databases
  workspaceId: string
  userId: string
}

export const getMember = async ({ databases, workspaceId, userId }: props) => {
  const members = await databases.listDocuments(DATABASE_ID, MEMBER_ID, [
    Query.equal('workspaceId', workspaceId),
    Query.equal('userId', userId),
  ])
  return members.documents[0]
}
