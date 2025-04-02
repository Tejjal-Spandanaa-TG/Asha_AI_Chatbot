import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Splunk Authentication Events Collector",
  description:
    "Collect authentication events from external SaaS applications and ingest them into Splunk for analysis.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="min-h-screen bg-background">
          {children}
          <Toaster />
        </main>
      </body>
    </html>
  )
}



import './globals.css'