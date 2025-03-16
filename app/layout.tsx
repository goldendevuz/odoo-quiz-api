import type React from "react"
import "@/app/globals.css"
import { ThemeProvider } from "@/components/theme-provider"

export const metadata = {
  title: "Quiz API",
  description: "A Django REST Framework API for quiz data",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <main className="min-h-screen bg-background">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'