import {FinancialTransaction} from "@/types";
import {addTransaction} from "@/lib/server/transactionFunctions";
import {ApiResponse} from "@/types/apiResponse";
import {RESPONSE_STATUS} from "@/lib/utils/constants";

export async function POST(request: Request) {
  try {
    const transaction = (await request.json()) as FinancialTransaction;
    // get wallet
    const savedTransaction = await addTransaction(transaction.walletId, transaction);
    const response: ApiResponse = {
      message: "Transaction added successfully",
      data: savedTransaction,
    };
    return new Response(JSON.stringify(response), {
      status: RESPONSE_STATUS.CREATED,
    });
  } catch (e) {
    if(e instanceof Error) {
      const response: ApiResponse = {
        message: "Error adding transaction",
        error: e,
      };
      return new Response(JSON.stringify(response), {
        status: RESPONSE_STATUS.ERROR,
      });
    }
    console.error(e);
  }
}