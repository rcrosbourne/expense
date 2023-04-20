"use client";
import Image from "next/image";
import { user } from "@/app/data/user";
import AddWalletButton from "@/app/addWalletButton";
import AddWallet from "@/app/addWallet";
import WalletWidget from "@/app/walletWidget";
import { Wallet } from "@/app/types";
import React from "react";
const stats = [
  { label: "Total", value: "$100,000.00" },
  { label: "Last 30 days", value: "$300,000.00" },
  { label: "Last 7 days", value: "$75,000.00" },
];
interface WalletWidgetProps extends Wallet {
  href: string;
  iconForeground: string;
  iconBackground: string;
  currentBalance: string;
}
const wallets: WalletWidgetProps[] = [
  {
    id: 1,
    name: "My Personal Wallet",
    href: "/wallet/1",
    iconForeground: "text-teal-700",
    iconBackground: "bg-teal-50",
    currentBalance: "$100,000.00",
    category: "personal",
    budget: "$75,000.00",
  },
  {
    id: 2,
    name: "My Business Wallet",
    href: "/wallet/2",
    iconForeground: "text-purple-700",
    iconBackground: "bg-purple-50",
    currentBalance: "$100,000.00",
    category: "business",
    budget: "$30,000.00",
  },
];
const recentHires = [
  {
    name: "Leonard Krasner",
    handle: "leonardkrasner",
    imageUrl:
      "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    href: "#",
  },
  {
    name: "Floyd Miles",
    handle: "floydmiles",
    imageUrl:
      "https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    href: "#",
  },
  {
    name: "Emily Selman",
    handle: "emilyselman",
    imageUrl:
      "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    href: "#",
  },
  {
    name: "Kristin Watson",
    handle: "kristinwatson",
    imageUrl:
      "https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    href: "#",
  },
];
const announcements = [
  {
    id: 1,
    title: "Office closed on July 2nd",
    href: "#",
    preview:
      "Cum qui rem deleniti. Suscipit in dolor veritatis sequi aut. Vero ut earum quis deleniti. Ut a sunt eum cum ut repudiandae possimus. Nihil ex tempora neque cum consectetur dolores.",
  },
  {
    id: 2,
    title: "New password policy",
    href: "#",
    preview:
      "Alias inventore ut autem optio voluptas et repellendus. Facere totam quaerat quam quo laudantium cumque eaque excepturi vel. Accusamus maxime ipsam reprehenderit rerum id repellendus rerum. Culpa cum vel natus. Est sit autem mollitia.",
  },
  {
    id: 3,
    title: "Office closed on July 2nd",
    href: "#",
    preview:
      "Tenetur libero voluptatem rerum occaecati qui est molestiae exercitationem. Voluptate quisquam iure assumenda consequatur ex et recusandae. Alias consectetur voluptatibus. Accusamus a ab dicta et. Consequatur quis dignissimos voluptatem nisi.",
  },
];

export default function Home() {
  const [editWallet, setEditWallet] = React.useState<Wallet | undefined>(
    undefined
  );
  React.useEffect(() => {
    console.log(editWallet);
  }, [editWallet]);
  return (
    <>
      <main className="-mt-24 pb-8">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <h1 className="sr-only">Profile</h1>
          {/* Main 3 column grid */}
          <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-3 lg:gap-8">
            {/* Left column */}
            <div className="grid grid-cols-1 gap-4 lg:col-span-2">
              {/* Welcome panel */}
              <section aria-labelledby="profile-overview-title">
                <div className="overflow-hidden rounded-lg bg-white shadow">
                  <h2 className="sr-only" id="profile-overview-title">
                    Profile Overview
                  </h2>
                  <div className="bg-white p-6">
                    <div className="sm:flex sm:items-center sm:justify-between">
                      <div className="sm:flex sm:space-x-5">
                        <div className="flex-shrink-0">
                          <Image
                            className="mx-auto h-20 w-20 rounded-full object-cover"
                            src={user.imageUrl}
                            alt=""
                            height={80}
                            width={80}
                          />
                        </div>
                        <div className="mt-4 text-center sm:mt-0 sm:pt-1 sm:text-left">
                          <p className="text-sm font-medium text-gray-600">
                            Welcome back,
                          </p>
                          <p className="text-xl font-bold text-gray-900 sm:text-2xl">
                            {user.name}
                          </p>
                          <p className="text-sm font-medium text-gray-600">
                            {user.role}
                          </p>
                        </div>
                      </div>
                      <div className="mt-5 flex justify-center sm:mt-0">
                        <AddWalletButton />
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 divide-y divide-gray-200 border-t border-gray-200 bg-gray-50 sm:grid-cols-3 sm:divide-y-0 sm:divide-x">
                    {stats.map((stat) => (
                      <div
                        key={stat.label}
                        className="px-6 py-5 text-center text-sm font-medium flex flex-col items-start"
                      >
                        <span className="text-gray-400 text-xs">
                          {stat.label}
                        </span>
                        <span className="text-gray-900 text-xl">
                          {stat.value}
                        </span>{" "}
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Actions panel */}
              <section aria-labelledby="quick-links-title">
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 divide-y divide-gray-200 rounded-lg sm:grid sm:gap-4 sm:divide-y-0">
                  <h2 className="sr-only" id="quick-links-title">
                    Quick links
                  </h2>
                  {wallets.map((wallet) => (
                    <WalletWidget
                      key={wallet.name}
                      id={wallet.id}
                      name={wallet.name}
                      href={wallet.href}
                      category={wallet.category}
                      budget={wallet.budget}
                      currentBalance={wallet.currentBalance}
                      iconForeground={wallet.iconForeground}
                      iconBackground={wallet.iconBackground}
                      onEdit={(wallet) => setEditWallet(wallet)}
                      onCancel={() => setEditWallet(undefined)}
                      editMode={editWallet?.id === wallet.id}
                    />
                  ))}
                </div>
              </section>
            </div>

            {/* Right column */}
            <div className="grid grid-cols-1 gap-4">
              {/* Add Wallet */}
              <AddWallet editWallet={editWallet} />
              {/* Recent Hires */}
              <section aria-labelledby="recent-hires-title">
                <div className="overflow-hidden rounded-lg bg-white shadow">
                  <div className="p-6">
                    <h2
                      className="text-base font-medium text-gray-900"
                      id="recent-hires-title"
                    >
                      Recent Hires
                    </h2>
                    <div className="mt-6 flow-root">
                      <ul
                        role="list"
                        className="-my-5 divide-y divide-gray-200"
                      >
                        {recentHires.map((person) => (
                          <li key={person.handle} className="py-4">
                            <div className="flex items-center space-x-4">
                              <div className="flex-shrink-0">
                                <Image
                                  className="h-8 w-8 rounded-full"
                                  src={person.imageUrl}
                                  alt=""
                                  height={32}
                                  width={32}
                                />
                              </div>
                              <div className="min-w-0 flex-1">
                                <p className="truncate text-sm font-medium text-gray-900">
                                  {person.name}
                                </p>
                                <p className="truncate text-sm text-gray-500">
                                  {"@" + person.handle}
                                </p>
                              </div>
                              <div>
                                <a
                                  href={person.href}
                                  className="inline-flex items-center rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                >
                                  View
                                </a>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="mt-6">
                      <a
                        href="#"
                        className="flex w-full items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                      >
                        View all
                      </a>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
