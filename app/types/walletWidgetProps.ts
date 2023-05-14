import {Wallet} from "@/app/types/wallet";

export interface WalletWidgetProps extends Wallet {
  href: string;
  iconForeground: string;
  iconBackground: string;
  currentBalance: string;
  onEdit: (wallet: Wallet) => void;
  onCancel: () => void;
  onDelete: (wallet: Wallet) => void;
  editMode: boolean;
}