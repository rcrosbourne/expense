import React from "react";
import "./globals.css";
import Providers from "@/app/providers";
import { Inter } from "next/font/google";
import Header from "@/app/components/header";
import Footer from "@/app/components/footer";
import { user } from "@/app/data/user";
import { navigation, userNavigation } from "@/app/data/navigation";
const inter = Inter({ subsets: ["latin"] });
export const metadata = {
  title: "FinancialTransaction Tracker",
  description: "Simple free way to track your expenses",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full bg-gray-100">
      <body className={`h-full ${inter.className}`}>
        <Providers>
          <Header
            user={user}
            userNavigation={userNavigation}
            navigation={navigation}
          />
          <div className="min-h-full">{children}</div>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
