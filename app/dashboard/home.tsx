"use client";

import React from "react";
import { PortfolioStat, User, Wallet, WalletWidgetProps } from "@/app/types";
import Image from "next/image";

import AddWalletButton from "@/app/dashboard/addWalletButton";
import AddWallet from "@/app/dashboard/addWallet";
import WalletWidget from "@/app/dashboard/walletWidget";
import ConfirmDialog from "@/app/components/confirmDialog";
import UserInfo from "@/app/dashboard/userInfo";
import PortfolioStats from "@/app/dashboard/PortfolioStats";
import { useImmerReducer } from "use-immer";
import { useSession } from "next-auth/react";
import {stat} from "fs";
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

type State = {
  editWallet: Wallet | undefined;
  deleteWallet: Wallet | undefined;
  openConfirm: boolean;
};
type HomeActions = {
  type: "cancel-edit" | "edit-wallet" | "delete-wallet";
  wallet?: Wallet;
  isOpen?: boolean;
};
let INITIAL_STATE: State = {
  editWallet: undefined,
  deleteWallet: undefined,
  openConfirm: false,
};
function reducer(draft: State, action: HomeActions) {
  switch (action.type) {
    case "delete-wallet": {
      draft.deleteWallet = action.wallet;
      draft.openConfirm = action.isOpen || false;
      return;
    }
    case "cancel-edit": {
      draft.editWallet = undefined;
      return;
    }
    case "edit-wallet": {
      draft.editWallet = action.wallet;
      return;
    }
  }
}
const Home = ({
  wallets,
  user,
  stats,
}: {
  wallets: WalletWidgetProps[];
  user: User;
  stats: PortfolioStat[];
}) => {
  const [state, dispatch] = useImmerReducer(reducer, INITIAL_STATE);
  const { data:session, status} = useSession({
    required: true,
    onUnauthenticated() {
        return { redirectTo: "/api/auth/signin" };
    }
  });
  // if (status === "loading") return null;
  // if (status === "unauthenticated") return "Not authenticated";
  return (
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
                    {session && session?.user && <UserInfo user={session?.user} /> }
                    <div className="mt-5 flex justify-center sm:mt-0">
                      <AddWalletButton
                        editWallet={state.editWallet}
                        onCancel={() => dispatch({ type: "cancel-edit" })}
                        onSave={() => dispatch({ type: "cancel-edit" })}
                      />
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 divide-y divide-gray-200 border-t border-gray-200 bg-gray-50 sm:grid-cols-3 sm:divide-y-0 sm:divide-x">
                  <PortfolioStats stats={stats} />
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
                    onEdit={(wallet) =>
                      dispatch({ type: "edit-wallet", wallet })
                    }
                    onCancel={() => dispatch({ type: "cancel-edit" })}
                    onDelete={() =>
                      dispatch({ type: "delete-wallet", wallet, isOpen: true })
                    }
                    editMode={state.editWallet?.id === wallet.id}
                  />
                ))}
              </div>
            </section>
          </div>

          {/* Right column */}
          <div className="grid grid-cols-1 gap-4">
            {/* Add Wallet */}
            <AddWallet
              editWallet={state.editWallet}
              onSave={() => dispatch({ type: "cancel-edit" })}
            />
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
                    <ul role="list" className="-my-5 divide-y divide-gray-200">
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
      <ConfirmDialog
        openConfirm={state.openConfirm}
        setOpenConfirm={(isOpen) =>
          dispatch({ type: "delete-wallet", wallet: undefined, isOpen })
        }
        title={"Delete Wallet"}
        message={`You are about to delete "${state.deleteWallet?.name}"`}
        confirmButtonText={"Delete"}
        cancelButtonText={"Cancel"}
        confirm={() =>
          dispatch({ type: "delete-wallet", wallet: undefined, isOpen: false })
        }
      />
    </main>
  );
};
export default Home;
