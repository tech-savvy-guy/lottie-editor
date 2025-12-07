import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Lottie Converter',
  description: 'Convert TGS and JSON files',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}

