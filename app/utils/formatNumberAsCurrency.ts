export const formatNumberAsCurrency = (amount: string | number | bigint | null | undefined): string => {
  if (!amount) return "";
  return Intl.NumberFormat().format(Number(amount));
};
