
export const formatNumberAsCurrency = (
  amount: string | number | bigint | null | undefined
): string => {
  if (!amount && amount != 0) return "";
  return Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
  }).format(Number(amount));
};
export const formatNumberAsPercentage = (
    amount: string | number | bigint | null | undefined
): string => {
    if (!amount) return "";
    return Intl.NumberFormat("en-US", {
        minimumFractionDigits: 1,
    }).format(Number(amount)) + "%";
}
