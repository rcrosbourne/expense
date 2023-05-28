import { z } from "zod";
import {RESPONSE_STATUS} from "@/lib/utils/constants";
import {ApiResponse} from "@/types/apiResponse";
import {deleteTransaction, updateTransaction} from "@/lib/server/transactionFunctions";
import {FinancialTransaction} from "@/types";

const routeContextSchema = z.object({
  params: z.object({
    walletId: z.string(),
    transactionId: z.string(),
  }),
});
export async function PATCH(
  request: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    const {
      params: { walletId, transactionId },
    } = routeContextSchema.parse(context);
    // validate body
    const body = await request.json() as FinancialTransaction;
    const updatedTransaction = await updateTransaction(walletId, body);
    return new Response(JSON.stringify(updatedTransaction), {
      status: RESPONSE_STATUS.SUCCESS,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), {
        status: RESPONSE_STATUS.UNPROCESSABLE_ENTITY,
      });
    }
    if (error instanceof Error) {
      console.error({ error });
      const response: ApiResponse = {
        message: "Error deleting wallet",
        error,
      };
      return new Response(JSON.stringify(response), {
        status: RESPONSE_STATUS.ERROR,
      });
    }
  }
}

export async function DELETE(
  request: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    const {
      params: { walletId, transactionId },
    } = routeContextSchema.parse(context);
    // validate body
    await deleteTransaction(walletId, transactionId);
    return new Response(null, {
      status: RESPONSE_STATUS.NO_CONTENT,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), {
        status: RESPONSE_STATUS.UNPROCESSABLE_ENTITY,
      });
    }
    if (error instanceof Error) {
      console.error({ error });
      const response: ApiResponse = {
        message: "Error deleting wallet",
        error,
      };
      return new Response(JSON.stringify(response), {
        status: RESPONSE_STATUS.ERROR,
      });
    }
  }
}