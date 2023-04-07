import React from "react";
import {ShopIcon} from "@/app/components/icons";
const Merchant = ({
  merchant,
  onMerchantChanged,
}: {
  merchant: string;
  onMerchantChanged: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <>
      <label
        htmlFor="merchant"
        className="block text-sm sr-only font-medium leading-6 text-gray-900"
      >
        Merchant
      </label>
      <div className="relative mt-2 rounded-md shadow-sm">
        <input
          type="text"
          name="merchant"
          id="merchant"
          className="block w-full rounded-md bg-slate-100 border-0 py-2.5 pr-10 text-slate-900 ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6"
          placeholder="Merchant"
          value={merchant}
          onChange={onMerchantChanged}
        />
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <ShopIcon className="h-5 w-5 text-gray-400" />
        </div>
      </div>
    </>
  );
};
export default Merchant;
