import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Providers from './providers'
import GoogleAnalytics from './components/GoogleAnalytics'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ResuMAI - AI Resume Assistant',
  description: 'Get personalized career advice and resume tips with AI',
  keywords: 'resume, career, AI, job search, career advice',
  viewport: 'width=device-width, initial-scale=1.0'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <GoogleAnalytics />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* 网站图标 */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
} 