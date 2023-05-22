import React from "react";
import Providers from "@/app/providers";
import { wotfard } from "@/lib/utils/fonts";
import "../../globals.css";
import { Toaster } from "@/components/toast/toaster";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`h-full bg-gray-100 ${wotfard.variable}`}>
      <body className={`h-full`}>
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
