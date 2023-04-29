"use client";
import React from "react";
import { NumericFormat } from "react-number-format";
import { Wallet } from "@/app/types";

const INITIAL_WALLET: Wallet = {
  id: 0,
  name: "",
  category: "personal",
  budget: "",
};
const AddWallet = ({
  editWallet,
  onSave,
}: {
  editWallet?: Wallet;
  onSave: () => void;
}) => {
  const [wallet, setWallet] = React.useState<Wallet>(INITIAL_WALLET);
  const nameInput = React.useRef<HTMLInputElement>(null);
  const editMode = !!editWallet;
  React.useEffect(() => {
    if(!editWallet) {
      setWallet(INITIAL_WALLET);
    } else {
      setWallet(editWallet);
      if(!nameInput.current) return;
      const inputControl = nameInput.current;
      inputControl.focus()
    }
  }, [editWallet]);
  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    setWallet((previousWallet) => {
      return { ...previousWallet, budget: e.target.value };
    });
  }
  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setWallet({ id: 0, name: "", category: "personal", budget: "" });
    // setEditMode(false);
    onSave();
  }
  return (
    <section aria-labelledby="add-wallet-title" className="hidden sm:block">
      <div className="overflow-hidden rounded-lg bg-slate-50 shadow">
        <div className="p-6">
          <h2
            className="text-base font-medium text-slate-900"
            id="add-wallet-title"
          >
            {editMode ? "Edit Wallet" : "Add Wallet"}
          </h2>
          <form onSubmit={onSubmit}>
            <div className="mt-6 flow-root">
              <div className="flex flex-col">
                <label
                  htmlFor="walletName"
                  className="text-sm font-medium text-slate-700"
                >
                  Name
                </label>
                <input
                  ref={nameInput}
                  type="text"
                  name="walletName"
                  id="walletName"
                  className="mt-1 focus:ring-teal-500 focus:border-teal-500 block w-full shadow-sm sm:text-sm border-slate-300 rounded-md"
                  value={wallet?.name}
                  onChange={(e) => {
                    setWallet({ ...wallet, name: e.target.value });
                  }}
                />
              </div>
              <div className="flex flex-col mt-4">
                <label
                  htmlFor="walletCategory"
                  className="text-sm font-medium text-slate-700"
                >
                  Category
                </label>
                <select
                  id="walletCategory"
                  name="walletCategory"
                  className="mt-1 focus:ring-teal-500 focus:border-teal-500 block w-full shadow-sm sm:text-sm border-slate-300 rounded-md"
                  value={wallet?.category}
                  onChange={(e) => {
                    setWallet({
                      ...wallet,
                      category:
                        e.target.value === "personal" ? "personal" : "business",
                    });
                  }}
                >
                  <option value="personal">Personal</option>
                  <option value="business">Business</option>
                </select>
              </div>
              <div className="flex flex-col mt-4">
                <label
                  htmlFor="walletBudget"
                  className="text-sm font-medium text-slate-700"
                >
                  Budget
                </label>
                <NumericFormat
                  displayType="input"
                  type="text"
                  name="budget"
                  id="budget"
                  className="mt-1 focus:ring-teal-500 focus:border-teal-500 block w-full shadow-sm sm:text-sm border-slate-300 rounded-md"
                  placeholder="0.00"
                  thousandSeparator=","
                  allowNegative={false}
                  maxLength={18}
                  decimalScale={2}
                  fixedDecimalScale
                  onChange={onChange}
                  value={wallet ? wallet.budget : ""}
                  autoComplete="off"
                />
              </div>
            </div>
            <div className="mt-6">
              <button
                type="submit"
                className="flex w-full items-center justify-center rounded-md bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-900 shadow-sm ring-1 ring-slate-300 hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-teal-500"
              >
                {editMode ? "Save" : "Create"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
export default AddWallet;
