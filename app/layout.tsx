// app/layout.tsx
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import {CheckScreenSize} from "@/components/check-screen-size";
const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Website Builder",
  description: "Build your website using pre-made templates",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CheckScreenSize />
        {children}
      </body>
    </html>
  )
}