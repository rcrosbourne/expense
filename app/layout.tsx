import React from 'react';
import './globals.css'
import Providers from "@/app/providers";
import {Inter} from 'next/font/google'
import Header from "@/app/components/header";
import Footer from "@/app/components/footer";

const inter = Inter({subsets: ['latin']})
export const metadata = {
    title: 'Expense Tracker',
    description: 'Simple free way to track your expenses',
}
const user = {
    name: "James Hagon",
    email: "chelsea.hagon@example.com",
    role: "Human Resources Manager",
    imageUrl:
        "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
};
const navigation = [
    {name: "Home", href: "#", current: true},
    {name: "Profile", href: "#", current: false},
    {name: "Settings", href: "#", current: false},
];
const userNavigation = [
    {name: "Your Profile", href: "#"},
    {name: "Settings", href: "#"},
    {name: "Sign out", href: "#"},
];
export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" className="h-full bg-gray-100">
        <body className={`h-full ${inter.className}`}>
        <Providers>
            <Header user={user} userNavigation={userNavigation} navigation={navigation}/>
            <div className="min-h-full">
                {children}
            </div>
            <Footer/>
        </Providers>
        </body>
    </html>
  )
}
