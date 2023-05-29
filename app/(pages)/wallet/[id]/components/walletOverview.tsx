import React from "react";
import useWindowSize from "@/hooks/useWindowSize";
import {useSetShowAsModal} from "@/lib/store/financialTransactionStore";
import {Stat, Wallet} from "@/types";
import WalletStats from "@/app/(pages)/wallet/[id]/components/walletStats";

const WalletOverview = ({wallet, stats}: {wallet: Wallet, stats: Stat[]}) => {
  const windowSize = useWindowSize();
  const setShowAsModal = useSetShowAsModal();
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
                <p className="text-xl font-medium text-slate-600">
                  {wallet.name}
                </p>
                <p className="text-xl font-bold text-gray-900 sm:text-2xl"></p>
                <p className="text-sm font-medium text-gray-600"></p>
              </div>
            </div>
            <div className="mt-5 flex justify-center sm:mt-0">
              <button
                type="button"
                onClick={() => setShowAsModal(windowSize.width < 640)}
                className="flex items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 sm:hidden hover:bg-gray-50"
              >
                Add Expense / Income
              </button>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 divide-y divide-gray-200 border-t border-gray-200 bg-gray-50 sm:grid-cols-4 sm:divide-y-0 sm:divide-x">
          <WalletStats stats={stats} />
        </div>
      </div>
    </section>
  );
};
export default WalletOverview;
