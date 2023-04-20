"use client";
import React from "react";
import { capitalize, classNames } from "@/app/utils";
import Link from "next/link";
import { CancelIcon, EditIcon, TrashCanIcon } from "@/app/components/icons";
import { Wallet } from "@/app/types";

type WalletWidgetProps = {
  id: number;
  name: string;
  href: string;
  budget: string | number | undefined;
  iconForeground: string;
  iconBackground: string;
  currentBalance: string;
  category: "personal" | "business";
  onEdit: (wallet: Wallet) => void;
  onCancel: () => void;
  editMode: boolean;
};
const WalletWidget = ({
  id = 0,
  name,
  href,
  iconForeground,
  iconBackground,
  currentBalance,
  category,
  budget,
  onEdit,
  onCancel,
  editMode,
}: WalletWidgetProps) => {
  return (
    <div className="group rounded-lg relative bg-slate-50 ring-1 ring-slate-200 focus-within:ring-2 focus-within:ring-cyan-500">
      <div className="divide-y divide-slate-200">
        <div className="p-6 pb-2">
          <div>
            <span
              className={classNames(
                iconBackground,
                iconForeground,
                "inline-flex rounded-lg p-3 ring-4 ring-slate-50"
              )}
            >
              {name}
            </span>
          </div>
          <div className="mt-8">
            <h3 className="text-lg font-medium">
              <Link
                href={href}
                className="focus:outline-none text-lg text-slate-900"
              >
                {/* Extend touch target to entire panel */}
                <span className="absolute inset-0" aria-hidden="true" />
                {currentBalance}
              </Link>
            </h3>
            <div className="mt-2 text-xs text-gray-500 grid grid-cols-2">
              <div className="flex flex-col w-full">
                <span>Budget</span>
                <span className="text-lg">{budget}</span>
              </div>
              <div className={"flex flex-col"}>
                <span>Category</span>
                <span className="text-lg">{capitalize(category)}</span>
              </div>
            </div>
          </div>
          <span
            className="pointer-events-none absolute top-6 right-6 text-gray-300 group-hover:text-slate-400"
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
                <stop offset="0" stopColor="#31d8ff" />
                <stop offset="1" stopColor="#808bff" />
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
        <div className="flex divide-x divide-gray-200">
          <div className="flex w-0 flex-1">
            {!editMode ? (
              <button
                type="button"
                onClick={() => onEdit({ id, name, budget, category })}
                className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-slate-900 hover:bg-slate-100 transition-colors"
              >
                <EditIcon className="h-5 w-5 text-gray-400" />
                Edit
              </button>
            ) : (
              <button
                type="button"
                onClick={() => onCancel()}
                className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
              >
                <CancelIcon className="h-5 w-5 fill-current" />
                Cancel
              </button>
            )}
          </div>
          <div className="-ml-px flex w-0 flex-1">
            <button
              type="button"
              onClick={() => console.log("delete")}
              className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-slate-900 hover:bg-slate-100 transition-colors"
            >
              <TrashCanIcon className="h-5 w-5 text-gray-400" />
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default WalletWidget;
