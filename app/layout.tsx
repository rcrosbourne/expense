import React from 'react';
import './globals.css'
import Providers from "@/app/providers";
import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })
export const metadata = {
  title: 'Expense Tracker',
  description: 'Simple free way to track your expenses',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full bg-gray-100">
      <body className={`h-full ${inter.className}`}>
      <Providers>{children}</Providers>
      </body>
    </html>
  )
}
