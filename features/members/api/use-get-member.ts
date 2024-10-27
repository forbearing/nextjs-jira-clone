import { client } from '@/lib/rpc'
import { useQuery } from '@tanstack/react-query'

export const useGetMember = ({ workspaceId }: { workspaceId: string }) => {
  const query = useQuery({
    queryKey: ['members', workspaceId],
    queryFn: async () => {
      const response = await client.api.members.$get({ query: { workspaceId } })
      if (!response.ok) {
        throw new Error('Failed to get members')
      }
      const { data } = await response.json()
      return data
    },
  })

  return query
}
