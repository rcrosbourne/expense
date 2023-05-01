import React from "react";
import { walletStats } from "@/app/data/walletStatus";
import {Actions} from "@/app/wallet/[id]/page";
import useWindowSize from "@/app/hooks/useWindowSize";

const WalletOverview = ({dispatch}: {dispatch: React.Dispatch<Actions>}) => {
  const [showAddTransaction, setShowAddTransaction] =
    React.useState<boolean>(false);
  const windowSize = useWindowSize();
  return (
    <section aria-labelledby="profile-overview-title">
      <div className="overflow-hidden rounded-lg bg-white shadow">
        <h2 className="sr-only" id="profile-overview-title">
          Wallet Overview
        </h2>
        <div className="bg-white p-6">
          <div className="sm:flex sm:items-center sm:justify-between">
            <div className="sm:flex sm:space-x-5">
              <div className="flex-shrink-0"></div>
              <div className="mt-4 text-center sm:mt-0 sm:pt-1 sm:text-left">
                <p className="text-sm font-medium text-gray-600">
                  My Personal Wallet
                </p>
                <p className="text-xl font-bold text-gray-900 sm:text-2xl"></p>
                <p className="text-sm font-medium text-gray-600"></p>
              </div>
            </div>
            <div className="mt-5 flex justify-center sm:mt-0">
              <button
                type="button"
                onClick={() => dispatch({type: "add-transaction", windowSize})}
                className="flex items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 sm:hidden hover:bg-gray-50"
              >
                Add Expense / Income
              </button>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 divide-y divide-gray-200 border-t border-gray-200 bg-gray-50 sm:grid-cols-3 sm:divide-y-0 sm:divide-x">
          <div className="px-6 py-5 text-center text-sm font-medium flex flex-col items-start">
            <span className="text-gray-400 text-xs">Total</span>
            <span className="text-gray-900 text-xl">
              {walletStats.total}
            </span>{" "}
          </div>
          <div className="px-6 py-5 text-center text-sm font-medium flex flex-col items-start">
            <span className="text-gray-400 text-xs">Last 30 days</span>
            <span className="text-gray-900 text-xl">
              {walletStats.lastThirtyDays}
            </span>{" "}
          </div>
          <div className="px-6 py-5 text-center text-sm font-medium flex flex-col items-start">
            <span className="text-gray-400 text-xs">Last 7 days</span>
            <span className="text-gray-900 text-xl">
              {walletStats.lastSevenDays}
            </span>{" "}
          </div>
        </div>
      </div>
    </section>
  );
};
export default WalletOverview;
