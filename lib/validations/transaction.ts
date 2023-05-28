import { z } from "zod";
export const transactionSchemaValidator = z.object({
  id: z.string().optional().default(""), // default value is required for PATCH requests
  type: z.enum(["income", "expense"]),
  amount: z.preprocess((value) => {
    // Remove thousandth separators and convert to float
    if (typeof value === "number") return value;
    if (typeof value === "string") {
      if (value === "") return 0;
      return parseFloat(value.replace(/,/g, ""));
    }
  }, z.number().min(0.01, "Amount must be at least 0.01")),
  date: z.date().optional(),
  category: z.string().optional(),
  merchant: z.string().optional(),
  notes: z.string().optional(),
});
