import "client-only";
import {FieldValues} from "react-hook-form";
import {Wallet, WalletWidgetProps} from "@/types";
import {ApiResponse} from "@/types/apiResponse";
const WALLET_API_URL: string = "/api/wallets";

async function Index() {
  const response =  await fetch(WALLET_API_URL, {
    method: "GET",
  });
    return await response.json() as {message: string, data: WalletWidgetProps[]};
}
async function Store(wallet: FieldValues) {
  return await fetch(WALLET_API_URL, {
    method: "POST",
    body: JSON.stringify(wallet),
  });
}

async function Destroy(walletId: string) {
  return await fetch(`${WALLET_API_URL}/${walletId}`, {
    method: "DELETE",
  });
}

async function Update(wallet: Wallet) {
  return await fetch(`${WALLET_API_URL}/${wallet.id}`, {
    method: "PATCH",
    body: JSON.stringify(wallet),
  });
}

export const WalletFunctions = {Index, Store, Destroy, Update}
