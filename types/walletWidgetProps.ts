import {Wallet} from "@/types/wallet";

export interface WalletWidgetProps extends Wallet {
  href: string;
  balance: number;
  // TODO: This feels wrong to have these here
  onEdit?: (wallet: Wallet) => void;
  onCancel?: () => void;
  onDelete?: (wallet: Wallet) => void;
  editMode?: boolean;
  // TODO: This feels wrong to have these here
  // I should move these to a global state
}