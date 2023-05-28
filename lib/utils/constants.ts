import { Wallet } from "../../types";

export const RESPONSE_STATUS = {
  SUCCESS: 200,
  ERROR: 500,
  CREATED: 201,
  NO_CONTENT: 204,
  UNPROCESSABLE_ENTITY: 422,
};
export const INITIAL_WALLET: Wallet = {
  balance: 0,
  href: "",
  transactions: [],
  id: "0",
  name: "",
  category: "personal",
  budget: "",
};