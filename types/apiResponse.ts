import {ZodError} from "zod";

export type ApiResponse = {
  message: string;
  data?: unknown;
  error?: Error | ZodError;
};