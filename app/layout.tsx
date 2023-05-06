import React from "react";
import "./globals.css";
import Providers from "@/app/providers";
import localFont from "next/font/local";
import Header from "@/app/components/header";
import Footer from "@/app/components/footer";
import { user } from "@/app/data/user";
import { navigation, userNavigation } from "@/app/data/navigation";
export const metadata = {
  title: "FinancialTransaction Tracker",
  description: "Simple free way to track your expenses",
};
const wotfard = localFont({
  src: [
    {
      path: "./assets/fonts/wotfard/wotfard-thin-webfont.woff2",
      weight: "100",
      style: "normal",
    },
    {
      path: "./assets/fonts/wotfard/wotfard-extralight-webfont.woff2",
      weight: "200",
      style: "normal",
    },
    {
      path: "./assets/fonts/wotfard/wotfard-light-webfont.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "./assets/fonts/wotfard/wotfard-regular-webfont.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./assets/fonts/wotfard/wotfard-medium-webfont.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./assets/fonts/wotfard/wotfard-semibold-webfont.woff2",
      weight: "600",
      style: "bold",
    },
    {
      path: "./assets/fonts/wotfard/wotfard-bold-webfont.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-wotfard",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`h-full bg-gray-100 ${wotfard.variable}`}>
      <body className={`h-full`}>
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
