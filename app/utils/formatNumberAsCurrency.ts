export const formatNumberAsCurrency = (
  amount: string | number | bigint | null | undefined
): string => {
  if (!amount) return "";
  return Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
  }).format(Number(amount));
};
