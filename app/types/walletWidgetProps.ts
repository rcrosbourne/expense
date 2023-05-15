import {Wallet} from "@/app/types/wallet";

export interface WalletWidgetProps extends Wallet {
  href: string;
  iconForeground: string;
  iconBackground: string;
  currentBalance: string;
  // TODO: This feels wrong to have these here
  onEdit?: (wallet: Wallet) => void;
  onCancel?: () => void;
  onDelete?: (wallet: Wallet) => void;
  editMode?: boolean;
  // TODO: This feels wrong to have these here
  // I should move these to a global state
}