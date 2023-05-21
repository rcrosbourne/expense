import React from "react";
import Providers from "@/app/providers";
import {wotfard} from "@/app/utils/fonts";
import "../../globals.css";
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
        </Providers>
      </body>
    </html>
  );
}