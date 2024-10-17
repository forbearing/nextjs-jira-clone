import { DottedSeparator } from '@/components/dotted-separator'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { FaGithub } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import Link from 'next/link'

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, 'Required'),
})

const onSubmit = (values: z.infer<typeof formSchema>) => {
  console.log({ values })
}

export const SignInCard = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  return (
    <Card className="h-full w-full border-none shadow-none md:w-[487px]">
      <CardHeader className="flex items-center justify-center p-7 text-center">
        <CardTitle className="text-2xl">Welcome back!</CardTitle>
      </CardHeader>
      <DottedSeparator className="mb-2 px-7" />
      <CardContent className="p-7">
        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input {...field} type="email" placeholder="Enter email address" disabled={false} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input {...field} type="password" placeholder="Enter password" disabled={false} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={false} size="lg" className="w-full">
              Login
            </Button>
          </form>
        </Form>
      </CardContent>
      <DottedSeparator className="px-7" />
      <CardContent className="flex flex-col gap-y-4 p-7">
        <Button variant="secondary" size="lg" className="w-full" disabled={false}>
          <FcGoogle className="mr-2 size-5" />
          Login with Google
        </Button>
        <Button variant="secondary" size="lg" className="w-full" disabled={false}>
          <FaGithub className="mr-2 size-5" />
          Login with Github
        </Button>
      </CardContent>
      <DottedSeparator className="px-7" />
      <CardContent className="flex items-center justify-center p-7">
        <p>
          {/* Already have an account? */}
          {/* <Link href="/sign-in"></Link> */}
          Don&apos;t have an account?
          <Link href="/sign-up">
            <span className="text-blue-700">&nbsp;Sign Up</span>
          </Link>
        </p>
      </CardContent>
    </Card>
  )
}
