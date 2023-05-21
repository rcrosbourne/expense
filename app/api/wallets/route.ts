import { Wallet } from "@/app/types";
import {addWallet, deleteWallet, getWallets} from "@/lib/walletFunctions";

export const RESPONSE_STATUS = {
  SUCCESS: 200,
  ERROR: 500,
  CREATED: 201,
  NO_CONTENT: 204,
  UNPROCESSABLE_ENTITY: 422,
};
export type ApiResponse = {
  message: string;
  data?: unknown;
  error?: Error;
};
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
        message: "Error adding wallets",
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
        message: "Error retrieving wallets",
        error
      }
      return new Response(JSON.stringify(response), {status: RESPONSE_STATUS.ERROR})
    }
  }
}
