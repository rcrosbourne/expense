import { deleteWallet } from "@/lib/walletFunctions";
import { ApiResponse, RESPONSE_STATUS } from "@/app/api/wallets/route";
import { z } from "zod";
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
    const response: ApiResponse = { message: "Success" };
    return new Response(JSON.stringify(response), {
      status: RESPONSE_STATUS.NO_CONTENT,
    });
  } catch (error) {
    if(error instanceof z.ZodError) {
     return new Response(JSON.stringify(error.issues), { status: RESPONSE_STATUS.UNPROCESSABLE_ENTITY })
    }
    if (error instanceof Error) {
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
