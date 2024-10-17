import { DottedSeparator } from '@/components/dotted-separator'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { FaGithub } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'
import { z } from 'zod'
import { registerSchema } from '../schema'
import { userRegister } from '../api/use-register'

export const SignUpCard = () => {
  const { mutate } = userRegister()
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  })

  const onSubmit = (values: z.infer<typeof registerSchema>) => {
    mutate(values)
    // mutate({ json: values })
  }

  return (
    <Card className="h-full w-full border-none shadow-none md:w-[487px]">
      <CardHeader className="flex items-center justify-center p-7 text-center">
        <CardTitle className="text-2xl">Sign Up</CardTitle>
        <CardDescription>
          By signing up, you agree to the{' '}
          <Link href="/privacy">
            <span className="text-blue-700">Privacy Policy</span>
          </Link>{' '}
          and{' '}
          <Link href="/terms">
            <span className="text-blue-700">Terms of Service</span>
          </Link>
        </CardDescription>
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
                    <Input {...field} type="email" placeholder="Enter your email" disabled={false} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input {...field} type="text" placeholder="Enter your name" disabled={false} />
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
          Already have an account?
          <Link href="/sign-in">
            <span className="text-blue-700">&nbsp;Sign In</span>
          </Link>
        </p>
      </CardContent>
    </Card>
  )
}
