import {deleteWallet, updateWallet} from "@/lib/server/walletFunctions";
import { z } from "zod";
import {ApiResponse} from "@/app/types/apiResponse";
import {RESPONSE_STATUS} from "@/app/utils/constants";
import {walletSchemaValidator} from "@/lib/validations/wallet";
import {Wallet} from "@/app/types";

const routeContextSchema = z.object({
  params: z.object({
    walletId: z.string(),
  }),
});
export async function DELETE(
    request: Request,
    context: z.infer<typeof routeContextSchema>
) {
  try {
    const {
      params: { walletId },
    } = routeContextSchema.parse(context);
    await deleteWallet(walletId);
    return new Response(null, {
      status: RESPONSE_STATUS.NO_CONTENT,
    });
  } catch (error) {
    if(error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: RESPONSE_STATUS.UNPROCESSABLE_ENTITY })
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
export async function PATCH(
  request: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    const {
      params: { walletId },
    } = routeContextSchema.parse(context);
    // validate body
    const body = await request.json();
    const wallet = walletSchemaValidator.parse(body);
    const updatedWallet = await updateWallet(wallet as Wallet);
    return new Response(JSON.stringify(updatedWallet), {
      status: RESPONSE_STATUS.SUCCESS,
    });
  } catch (error) {
    if(error instanceof z.ZodError) {
     return new Response(JSON.stringify(error.issues), { status: RESPONSE_STATUS.UNPROCESSABLE_ENTITY })
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
