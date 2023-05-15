import {Decimal} from "@prisma/client/runtime";

export type Wallet = {
    budget?: number | string | undefined | Decimal;
    category: "personal" | "business";
    id: number | string | undefined;
    name: string;
};