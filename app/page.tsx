"use client";
import Image from "next/image";
import { classNames } from "@/app/utils";
import {
  CheckBadgeIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";
import {User} from "@/app/types";
import Link from "next/link";

const user = {
  name: "James Hagon",
  email: "chelsea.hagon@example.com",
  role: "Human Resources Manager",
  imageUrl:
    "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
};
const stats = [
  { label: "Total", value: "$100,000.00" },
  { label: "Last 30 days", value: "$300,000.00" },
  { label: "Last 7 days", value: "$75,000.00" },
];
const actions = [
  {
    icon: ClockIcon,
    name: "My Wallet",
    href: "/wallet/1",
    iconForeground: "text-teal-700",
    iconBackground: "bg-teal-50",
    currentBalance: "$100,000.00",
    last30Days: "$300,000.00",
    last7Days: "$75,000.00",
  },
  {
    icon: CheckBadgeIcon,
    name: "Benefits",
    href: "/wallet/2",
    iconForeground: "text-purple-700",
    iconBackground: "bg-purple-50",
      currentBalance: "$100,000.00",
    last30Days: "$300,000.00",
    last7Days: "$75,000.00",
  },
  // {
  //   icon: UsersIcon,
  //   name: "Schedule a one-on-one",
  //   href: "#",
  //   iconForeground: "text-sky-700",
  //   iconBackground: "bg-sky-50",
  //      currentBalance: "$100,000.00",
  //   last30Days: "$300,000.00",
  //   last7Days: "$75,000.00",
  // },
  // {
  //   icon: BanknotesIcon,
  //   name: "Payroll",
  //   href: "#",
  //   iconForeground: "text-yellow-700",
  //   iconBackground: "bg-yellow-50",
  // },
  // {
  //   icon: ReceiptRefundIcon,
  //   name: "Submit an expense",
  //   href: "#",
  //   iconForeground: "text-rose-700",
  //   iconBackground: "bg-rose-50",
  // },
  // {
  //   icon: AcademicCapIcon,
  //   name: "Training",
  //   href: "#",
  //   iconForeground: "text-indigo-700",
  //   iconBackground: "bg-indigo-50",
  // },
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
                              className="mx-auto h-20 w-20 rounded-full"
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
                          <a
                            href="#"
                            className="flex items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                          >
                            Add Wallet
                          </a>
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
                  <div className="sm:grid-cols-2 divide-y divide-gray-200 overflow-hidden rounded-lg sm:grid sm:gap-4 sm:divide-y-0">
                    <h2 className="sr-only" id="quick-links-title">
                      Quick links
                    </h2>
                    {actions.map((action, actionIdx) => (
                      <div
                        key={action.name}
                        className="group rounded-lg relative bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-cyan-500"
                      >
                        <div>
                          <span
                            className={classNames(
                              action.iconBackground,
                              action.iconForeground,
                              "inline-flex rounded-lg p-3 ring-4 ring-white"
                            )}
                          >
                          My Personal Wallet
                          </span>
                        </div>
                        <div className="mt-8">
                          <h3 className="text-lg font-medium">
                            <Link
                              href={action.href}
                              className="focus:outline-none text-lg text-gray-900"
                            >
                              {/* Extend touch target to entire panel */}
                              <span
                                className="absolute inset-0"
                                aria-hidden="true"
                              />
                              {action.currentBalance}
                            </Link>
                          </h3>
                          <div className="mt-2 text-xs text-gray-500 grid grid-cols-2">
                              <div className="flex flex-col w-full">
                                  <span>Last 7 Days</span>
                                  <span className="text-lg">{action.last7Days}</span>
                              </div>
                              <div className={"flex flex-col"}>
                                  <span>Last 30 Days</span>
                                  <span className="text-lg">{action.last30Days}</span>
                              </div>
                          </div>
                        </div>
                        <span
                          className="pointer-events-none absolute top-6 right-6 text-gray-300 group-hover:text-gray-400"
                          aria-hidden="true"
                        >
                          <svg
                            className="h-10 w-10"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                          >
                            <linearGradient
                              id="a"
                              x1="0"
                              x2="512"
                              y1="-16658"
                              y2="-16658"
                              gradientTransform="matrix(1 0 0 -1 0 -16402)"
                              gradientUnits="userSpaceOnUse"
                            >
                              <stop offset="0" stop-color="#31d8ff" />
                              <stop offset="1" stop-color="#808bff" />
                            </linearGradient>
                            <path
                              fill="url(#a)"
                              d="M512 256c0 141.387-114.613 256-256 256S0 397.387 0 256 114.613 0 256 0s256 114.613 256 256zm0 0"
                              data-original="url(#a)"
                            />
                            <g fill="#fff">
                              <path
                                d="M256 56c-8.285 0-15 6.715-15 15s6.715 15 15 15c93.738 0 170 76.262 170 170s-76.262 170-170 170S86 349.738 86 256c0-8.285-6.715-15-15-15s-15 6.715-15 15c0 110.281 89.719 200 200 200s200-89.719 200-200S366.281 56 256 56zm-80.93 48.285c1.914 0 3.856-.367 5.735-1.144l20.277-8.399c7.652-3.172 11.29-11.945 8.117-19.601-3.168-7.653-11.945-11.286-19.597-8.118l-20.278 8.399c-7.652 3.172-11.289 11.945-8.12 19.601 2.394 5.778 7.98 9.262 13.866 9.262zm-57.644 43.66c3.84 0 7.676-1.465 10.605-4.394l15.52-15.52c5.86-5.86 5.86-15.355 0-21.215-5.856-5.855-15.356-5.855-21.211 0l-15.524 15.524c-5.855 5.855-5.855 15.351 0 21.21a14.957 14.957 0 0 0 10.61 4.395zM75.145 209.2a14.95 14.95 0 0 0 5.734 1.148c5.883 0 11.469-3.489 13.863-9.266l8.399-20.277c3.168-7.653-.465-16.43-8.118-19.598-7.656-3.172-16.43.465-19.601 8.117l-8.399 20.278c-3.168 7.656.465 16.43 8.122 19.597zm0 0"
                                data-original="#ffffff"
                              />
                              <path
                                d="M256 178.29c-8.285 0-15 6.714-15 15V241h-47.71c-8.286 0-15 6.715-15 15s6.714 15 15 15H241v47.71c0 8.286 6.715 15 15 15s15-6.714 15-15V271h47.71c8.286 0 15-6.715 15-15s-6.714-15-15-15H271v-47.71c0-8.286-6.715-15-15-15zm0 0"
                                data-original="#ffffff"
                              />
                            </g>
                          </svg>
                        </span>
                      </div>
                    ))}
                  </div>
                </section>
              </div>

              {/* Right column */}
              <div className="grid grid-cols-1 gap-4">
                {/* Announcements */}
                <section aria-labelledby="announcements-title">
                  <div className="overflow-hidden rounded-lg bg-white shadow">
                    <div className="p-6">
                      <h2
                        className="text-base font-medium text-gray-900"
                        id="announcements-title"
                      >
                        Announcements
                      </h2>
                      <div className="mt-6 flow-root">
                        <ul
                          role="list"
                          className="-my-5 divide-y divide-gray-200"
                        >
                          {announcements.map((announcement) => (
                            <li key={announcement.id} className="py-5">
                              <div className="relative focus-within:ring-2 focus-within:ring-cyan-500">
                                <h3 className="text-sm font-semibold text-gray-800">
                                  <a
                                    href={announcement.href}
                                    className="hover:underline focus:outline-none"
                                  >
                                    {/* Extend touch target to entire panel */}
                                    <span
                                      className="absolute inset-0"
                                      aria-hidden="true"
                                    />
                                    {announcement.title}
                                  </a>
                                </h3>
                                <p className="mt-1 text-sm text-gray-600 line-clamp-2">
                                  {announcement.preview}
                                </p>
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
                                  <img
                                    className="h-8 w-8 rounded-full"
                                    src={person.imageUrl}
                                    alt=""
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
