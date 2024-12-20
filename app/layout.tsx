import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import { Inter } from 'next/font/google'
import { cn } from '@/lib/utils'
import QueryProviders from '@/components/query-provider'
import { Toaster } from 'sonner'

const inter = Inter({ subsets: ['latin'] })

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
})
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
})

export const metadata: Metadata = {
  title: 'Jira Clone',
  description: 'Jira Clone',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={cn(inter.className, 'min-h-screen antialiased')}>
        <QueryProviders>
          <Toaster richColors />
          {children}
        </QueryProviders>
      </body>
    </html>
  )
}
