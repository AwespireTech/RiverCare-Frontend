import Header from "@/components/header"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Footer from "@/components/footer"

export const metadata: Metadata = {
  title: "Rivercare",
  description: "Interface of care"
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <div className="flex min-h-screen flex-col items-center justify-between p-4">
          {children}
          <Footer />
        </div>
      </body>
    </html>
  )
}
