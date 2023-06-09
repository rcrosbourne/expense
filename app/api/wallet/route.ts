import { Wallet } from "@/types";
import {addWallet, getWallets} from "@/lib/server/walletFunctions";
import {ApiResponse} from "@/types/apiResponse";
import {RESPONSE_STATUS} from "@/lib/utils/constants";

export async function POST(request: Request) {
  try {
    const wallet = (await request.json()) as Wallet;
    const savedWallet = await addWallet(wallet);
    const response: ApiResponse = {
      message: "Wallet added successfully",
      data: savedWallet,
    };
    return new Response(JSON.stringify(response), {
      status: RESPONSE_STATUS.CREATED,
    });
  } catch (e) {
    if(e instanceof Error) {
      const response: ApiResponse = {
        message: "Error adding wallet",
        error: e,
      };
      return new Response(JSON.stringify(response), {
        status: RESPONSE_STATUS.ERROR,
      });
    }
    console.error(e);
  }
}
export async function GET(request: Request) {
  try {
    const wallets = await getWallets();
    const response: ApiResponse = {
      message: "Success",
      data: wallets,
    }
    return new Response(JSON.stringify(response), {status: RESPONSE_STATUS.SUCCESS})
  } catch (error) {
    if(error instanceof Error) {
      const response: ApiResponse = {
        message: "Error retrieving wallet",
        error
      }
      return new Response(JSON.stringify(response), {status: RESPONSE_STATUS.ERROR})
    }
  }
}
