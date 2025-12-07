import './globals.css'
import type { Metadata } from 'next'
import { Toaster } from '@/components/ui/sonner'
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"

export const metadata: Metadata = {
  title: 'Lottie Converter',
  description: 'Convert TGS and Lottie JSON files',
  openGraph: {
    title: 'Lottie Converter',
    description: 'Convert TGS and Lottie JSON files',
    type: 'website',
    images: [
      {
        url: '/lottie-editor.png',
        width: 1200,
        height: 630,
        alt: 'Lottie Editor',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lottie Converter',
    description: 'Convert TGS and Lottie JSON files',
    images: ['/lottie-editor.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className='select-none'>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div
            className="fixed inset-0 z-0"
            style={{
              background: "radial-gradient(125% 125% at 50% 90%, var(--gradient-start) 40%, var(--gradient-end) 100%)",
            }}
          />
          <div className="relative z-10">
            {children}
          </div>
          <Toaster />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}