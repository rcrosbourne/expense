"use client";
import React from "react";
import { NumericFormat } from "react-number-format";
import { Wallet } from "@/app/types";
import { z } from "zod";
import { FieldValues, useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DevTool } from "@hookform/devtools";
import { User } from "next-auth";
import { useRouter } from "next/navigation";
import { Decimal } from "@prisma/client/runtime";
const INITIAL_WALLET: Wallet = {
  id: 0,
  name: "",
  category: "personal",
  budget: "",
};

const WalletValidator = z.object({
  name: z.string().min(3, "Name must contain at least 3 characters(s)"),
  category: z.enum(["personal", "business"]),
  budget: z.preprocess((value) => {
    // Remove thousandth separators and convert to float
    if (typeof value === "number") return value;
    if (typeof value === "string") {
      if (value === "") return 0;
      return parseFloat(value.replace(/,/g, ""));
    }
  }, z.number().min(100)),
});
const AddWallet = ({
  editWallet,
  onSave,
}: {
  editWallet?: Wallet;
  onSave: () => void;
}) => {
  const [wallet, setWallet] = React.useState<Wallet>(INITIAL_WALLET);
  const editMode = !!editWallet;
  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    setValue,
    setFocus,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(WalletValidator),
    defaultValues: { ...wallet },
  });
  React.useEffect(() => {
    const setWalletAndResetForm = (wallet: Wallet) => {
      setWallet(() => {
        const initWallet = { ...wallet };
        setValue("name", initWallet.name);
        setValue("category", initWallet.category);
        setValue("budget", initWallet.budget);
        reset({ ...initWallet });
        return initWallet;
      });
    };

    if (editWallet === undefined) {
      setWalletAndResetForm(INITIAL_WALLET);
      return;
    }
    setWalletAndResetForm(editWallet);
    setFocus("name");
  }, [editWallet, setFocus, setValue, reset]);

  async function onSubmit(data: FieldValues) {
    // e.preventDefault();
    // store the wallet
    const response = await fetch("/api/wallets", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const wallet = await response.json();
    console.log({ wallet });
    setWallet(INITIAL_WALLET);
    reset({ ...INITIAL_WALLET });
    // setEditMode(false);
    onSave();
    router.refresh();
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
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mt-6 flow-root">
              <div className="flex flex-col">
                <label
                  htmlFor="name"
                  className="text-sm font-medium text-slate-700"
                >
                  Name
                </label>
                <input
                  type="text"
                  className="mt-1 focus:ring-teal-500 focus:border-teal-500 block w-full shadow-sm sm:text-sm border-slate-300 rounded-md"
                  {...register("name")}
                  aria-invalid={errors.name ? "true" : "false"}
                />
                {errors.name && (
                  <p role="alert" className="text-red-500 text-sm">
                    {errors.name?.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col mt-4">
                <label
                  htmlFor="category"
                  className="text-sm font-medium text-slate-700"
                >
                  Category
                </label>
                <select
                  className="mt-1 focus:ring-teal-500 focus:border-teal-500 block w-full shadow-sm sm:text-sm border-slate-300 rounded-md"
                  {...register("category")}
                  aria-invalid={errors.category ? "true" : "false"}
                >
                  <option value="personal">Personal</option>
                  <option value="business">Business</option>
                </select>
                {errors.category && (
                  <p role="alert" className="text-red-500 text-sm">
                    {errors.category?.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col mt-4">
                <label
                  htmlFor="budget"
                  className="text-sm font-medium text-slate-700"
                >
                  Budget
                </label>
                <Controller
                  name="budget"
                  control={control}
                  render={({ field: { onChange, name, value } }) => (
                    <NumericFormat
                      displayType="input"
                      type="text"
                      id="budget"
                      className="mt-1 focus:ring-teal-500 focus:border-teal-500 block w-full shadow-sm sm:text-sm border-slate-300 rounded-md"
                      placeholder="0.00"
                      thousandSeparator=","
                      allowNegative={false}
                      maxLength={18}
                      decimalScale={2}
                      fixedDecimalScale
                      autoComplete="off"
                      onChange={onChange}
                      name={name}
                      value={value}
                    />
                  )}
                />

                {errors.budget && (
                  <p role="alert" className="text-red-500 text-sm">
                    {errors.budget?.message}
                  </p>
                )}
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
      {/*<DevTool control={control} />*/}
    </section>
  );
};
export default AddWallet;
