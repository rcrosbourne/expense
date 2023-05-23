import { z } from "zod";
export const walletSchemaValidator = z.object({
  id: z.string().optional().default(""), // default value is required for PATCH requests
  name: z.string().min(3, "Name must contain at least 3 characters(s)"),
  category: z.enum(["personal", "business"]),
  budget: z.preprocess((value) => {
    // Remove thousandth separators and convert to float
    if (typeof value === "number") return value;
    if (typeof value === "string") {
      if (value === "") return 0;
      return parseFloat(value.replace(/,/g, ""));
    }
  }, z.number().min(0.01, "Budget must be at least 0.01")),
});