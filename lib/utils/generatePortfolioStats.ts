import { PortfolioStat, Wallet } from "@/types";
import { formatNumberAsCurrency } from "@/lib/utils/formatNumberAs";

export function generatePortfolioStats(wallets: Wallet[]): PortfolioStat[] {
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
    { label: "Best Performer", value: bestPerformingWallet.name },
  ];
}
