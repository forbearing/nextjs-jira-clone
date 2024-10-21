import { SignInCard } from '@/features/auth/components/sign-in-card'
import { getCurrent } from '@/features/auth/queries'
import { redirect } from 'next/navigation'

export default async () => {
  const user = await getCurrent()
  console.log(user)
  if (user) redirect('/')
  return <SignInCard />
}
