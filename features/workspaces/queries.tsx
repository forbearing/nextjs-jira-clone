'use server'

import { DATABASE_ID, MEMBER_ID, WORKSPACE_ID } from '@/config'
import { createSessionClient } from '@/lib/appwrite'
import { cookies } from 'next/headers'
import { Account, Client, Databases, Query } from 'node-appwrite'
import { AUTH_COOKIE } from '../auth/constants'
import { getMember } from '../members/utils'
import { Workspace } from './types'

export const getWorkspaces = async () => {
  try {
    const { databases, account } = await createSessionClient()
    const user = await account.get()
    const members = await databases.listDocuments(DATABASE_ID, MEMBER_ID, [Query.equal('userId', user.$id)])
    if (members.total === 0) {
      return { documents: [], total: 0 }
    }
    const workspaceIds = members.documents.map((member) => member.workspaceId)
    const workspaces = await databases.listDocuments(DATABASE_ID, WORKSPACE_ID, [
      Query.orderDesc('$createdAt'),
      Query.contains('$id', workspaceIds),
    ])
    return workspaces
  } catch {
    return { documents: [], total: 0 }
  }
}

export const getWorkspace = async ({ workspaceId }: { workspaceId: string }) => {
  try {
    const { databases, account } = await createSessionClient()
    const user = await account.get()
    const member = await getMember({ databases, userId: user.$id, workspaceId })
    if (!member) {
      return null
    }
    const workspace = await databases.getDocument<Workspace>(DATABASE_ID, WORKSPACE_ID, workspaceId)
    return workspace
  } catch {
    return null
  }
}

export const getWorkspaceInfo = async ({ workspaceId }: { workspaceId: string }) => {
  try {
    const { databases } = await createSessionClient()
    const workspace = await databases.getDocument<Workspace>(DATABASE_ID, WORKSPACE_ID, workspaceId)
    return {
      name: workspace.name,
    }
  } catch {
    return null
  }
}
