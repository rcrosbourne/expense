import React from "react";
import Providers from "@/app/providers";
import { wotfard } from "@/lib/utils/fonts";
import "../../globals.css";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Toaster } from "@/components/toast/toaster";
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en" className={`h-full bg-gray-100 ${wotfard.variable}`}>
      <body className={`h-full`}>
        <Providers session={session}>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
