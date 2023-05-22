export type Wallet = {
    budget?: number | string | undefined;
    category: "personal" | "business";
    id:  string;
    name: string;
};