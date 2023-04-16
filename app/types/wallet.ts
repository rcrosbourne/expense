export type Wallet = {
    id: number;
    name: string;
    category: "personal" | "business";
    budget?: number;
};