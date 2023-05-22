"use client";
import React from "react";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { walletSchemaValidator } from "@/lib/validations/wallet";
import { useMutation } from "@tanstack/react-query";
import { WalletFunctions } from "@/lib/client/walletFunctions";
import { INITIAL_WALLET } from "@/lib/utils/constants";
import { useEditWallet, useHandleCancelEdit } from "@/lib/store/walletStore";
import { NumericFormat } from "react-number-format";
import { useRouter } from "next/navigation";
import useWindowSize from "@/hooks/useWindowSize";
import { Wallet } from "@/types";
import {useToast} from "@/hooks/useToast";

const WalletForm = ({
  onSubmitCallback,
}: {
  onSubmitCallback?: () => void;
}) => {
  const handleCancelEdit = useHandleCancelEdit();
  const [wallet, setWallet] = React.useState<Wallet>(INITIAL_WALLET);
  const editWallet = useEditWallet();
  const editMode = !!editWallet;
  const router = useRouter();
  const windowSize = useWindowSize();
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    control,
    setValue,
    setFocus,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(walletSchemaValidator),
    defaultValues: { ...wallet },
  });
  const { mutate, isLoading } = useMutation(["wallets", wallet.name], {
    mutationFn: WalletFunctions.Store,
    onSuccess: async () => {
      setWallet(INITIAL_WALLET);
      reset({ ...INITIAL_WALLET });
      handleCancelEdit();
      toast({
        title: "Wallet added",
        description: "Wallet has been added successfully",
      });
      router.refresh();
    },
    onError: (error) => {
      console.error(error);
    },
  });
  const { mutate: update, isLoading: updateIsLoading } = useMutation(
    ["wallets", wallet.name],
    {
      mutationFn: WalletFunctions.Update,
      onSuccess: async () => {
        setWallet(INITIAL_WALLET);
        reset({ ...INITIAL_WALLET });
        handleCancelEdit();
        toast({
          title: "Wallet updated",
          description: "Wallet has been added successfully",
          variant: "default",
        });
        router.refresh();
      },
      onError: (error) => {
        console.error(error);
        toast({
          title: "An error occurred",
          description: "This action cannot be completed at this time.",
          variant: "destructive",
        });
      },
    }
  );
  async function onSubmit(data: FieldValues | Wallet) {
    if (editMode) {
      await update(data as Wallet);
    } else {
      await mutate(data as FieldValues);
    }
    if (onSubmitCallback) {
      onSubmitCallback();
    }
  }
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
    windowSize.width > 640 && setFocus("name");
  }, [editWallet, setFocus, setValue, reset, windowSize.width]);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mt-6 flow-root">
        <div className="flex flex-col">
          <label htmlFor="name" className="text-sm font-medium text-slate-700">
            Name
          </label>
          <input
            type="text"
            autoComplete={"off"}
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
                inputMode="numeric"
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
          disabled={isLoading}
          type="submit"
          className="flex w-full items-center justify-center rounded-md bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-900 shadow-sm ring-1 ring-slate-300 hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-teal-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {editMode
            ? isLoading || updateIsLoading
              ? "Saving"
              : "Save"
            : isLoading || updateIsLoading
            ? "Creating"
            : "Create"}
        </button>
      </div>
    </form>
  );
};
export default WalletForm;
