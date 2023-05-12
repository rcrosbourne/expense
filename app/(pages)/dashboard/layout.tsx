import React from "react";
import "../../globals.css";
import Providers from "@/app/providers";
import Header from "@/app/components/header";
import Footer from "@/app/components/footer";
import { navigation, userNavigation } from "@/app/data/navigation";
import { wotfard } from "@/app/utils/constants";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import {getServerSession, User} from "next-auth";
export const metadata = {
  title: "Expense Tracker",
  description: "Simple free way to track your expenses",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/dashboard");
  }
  return (
    <html lang="en" className={`h-full bg-gray-100 ${wotfard.variable}`}>
      <body className={`h-full`}>
        <Providers session={session}>
          <Header
            userNavigation={userNavigation}
            navigation={navigation}
            user={session.user as User}
          />
          <div className="min-h-full">{children}</div>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
