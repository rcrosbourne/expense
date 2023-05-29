import { Stat, Wallet } from "@/types";
import { formatNumberAsCurrency } from "@/lib/utils/formatNumberAs";

export function generatePortfolioStats(wallets: Wallet[]): Stat[] {
  const totalBudget = wallets.reduce((total, wallet) => {
    return total + Number(wallet.budget);
  }, 0);

  const totalBalance = wallets.reduce((total, wallet) => {
    return total + wallet.balance;
  }, 0);
  const bestPerformingWallet = wallets.reduce((best, wallet) => {
    if (wallet.balance > best.balance) {
      return wallet;
    }
    return best;
  }, wallets[0]);
  // const worstPerformingWallet = wallet.reduce((worst, wallet) => {
  //   if (wallet.balance < worst.balance) {
  //     return wallet;
  //   }
  //   return worst;
  // }, wallet[0]);
  return [
    { label: "Total Balance", value: `$${formatNumberAsCurrency(totalBalance)}` },
    { label: "Total Budget", value: `$${formatNumberAsCurrency(totalBudget)}`},
    { label: "Best Performer", value: bestPerformingWallet?.name || "N/A" },
  ];
}

export function generateWalletStats(wallet: Wallet): Stat[] {
  const highestExpense = wallet.transactions.filter(t => t.type==="expense").reduce((highest, expense) => {
    if (expense.amount > highest.amount) {
      return expense;
    }
    return highest;
  }, wallet.transactions[0]);
  const highestIncome = wallet.transactions.filter(t => t.type==="income").reduce((highest, expense) => {
    if (expense.amount > highest.amount) {
      return expense;
    }
    return highest;
  }, wallet.transactions[0]);
  return [
    { label: "Balance", value: `$${formatNumberAsCurrency(wallet.balance)}` },
    { label: "Budget", value: `$${formatNumberAsCurrency(wallet.budget)}` },
    { label: "Highest Expense", value: `$${formatNumberAsCurrency(highestExpense?.amount || 0)}` },
    { label: "Highest Income", value: `$${formatNumberAsCurrency(highestIncome?.amount || 0)}` },
  ]
}
