import { TransactionCategory } from "@prisma/client";
import {
  BankTransferIcon,
  BusinessIcon,
  ChildrenIcon,
  CustomIcon,
  DebtIcon,
  EducationIcon,
  EntertainmentIcon,
  ExtraIncomeIcon,
  GiftIcon,
  GroceryIcon,
  HealthCareIcon,
  HousingIcon,
  InsuranceIcon,
  InterestDividendIcon,
  MealIcon,
  OtherIcon,
  PersonalCareIcon,
  PetIcon,
  PhoneAndInternetIcon,
  RetirementIcon,
  SalaryIcon,
  ShoppingIcon,
  TaxIcon,
  TitheIcon,
  TransportIcon,
  TravelIcon,
  UtilityIcon,
} from "@/components/icons";
import { AnyCategory } from "@/types";

type CategoryStyle = {
  [k in "income" | "expense"]: {
    [k: string]: AnyCategory;
  };
};

export function getCategoryStyle(
  type: "income" | "expense",
  category: TransactionCategory
) {
  return {
    id: category.id,
    ...categoryMap[type][category.name],
  };
}
const categoryMap: CategoryStyle = {
  income: {
    Business: {
      name: "Business",
      foregroundColor: "text-slate-900",
      backgroundColor: "bg-sky-300",
      backgroundColorAsHsl: "hsl(199.4,95.5%,73.9%)",
      foregroundColorAsHsl: "hsl(222.2,47.4%,11.2%)",
      icon: <BusinessIcon />,
    },
    "Extra Income": {
      name: "Extra Income",
      foregroundColor: "text-slate-900",
      backgroundColor: "bg-pink-300",
      backgroundColorAsHsl: "hsl(327.4,87.1%,81.8%)",
      foregroundColorAsHsl: "hsl(222.2,47.4%,11.2%)",
      icon: <ExtraIncomeIcon />,
    },
    Gift: {
      name: "Gift",
      foregroundColor: "text-slate-900",
      backgroundColor: "bg-indigo-300",
      backgroundColorAsHsl: "hsl(229.7,93.5%,81.8%)",
      foregroundColorAsHsl: "hsl(222.2,47.4%,11.2%)",
      icon: <GiftIcon />,
    },
    "Interest, Dividend": {
      name: "Interest, Dividend",
      foregroundColor: "text-slate-900",
      backgroundColor: "bg-fuchsia-300",
      backgroundColorAsHsl: "hsl(291.1,93.1%,82.9%)",
      foregroundColorAsHsl: "hsl(222.2,47.4%,11.2%)",
      icon: <InterestDividendIcon />,
    },
    Salary: {
      name: "Salary",
      foregroundColor: "text-slate-900",
      backgroundColor: "bg-emerald-300",
      backgroundColorAsHsl: "hsl(156.2,71.6%,66.9%)",
      foregroundColorAsHsl: "hsl(222.2,47.4%,11.2%)",
      icon: <SalaryIcon />,
    },
    Other: {
      name: "Other",
      foregroundColor: "text-slate-900",
      backgroundColor: "bg-yellow-300",
      backgroundColorAsHsl: "hsl(50.4,97.8%,63.5%)",
      foregroundColorAsHsl: "hsl(222.2,47.4%,11.2%)",
      icon: <OtherIcon />,
    },
    Custom: {
      name: "Custom",
      foregroundColor: "text-slate-900",
      backgroundColor: "bg-teal-300",
      backgroundColorAsHsl: "hsl(170.6,76.9%,64.3%)",
      foregroundColorAsHsl: "hsl(222.2,47.4%,11.2%)",
      icon: <CustomIcon />,
    },
  },
  expense: {
    Meal: {
      name: "Meal",
      foregroundColor: "text-slate-900",
      backgroundColor: "bg-slate-300",
      backgroundColorAsHsl: "hsl(212.7,26.8%,83.9%)",
      foregroundColorAsHsl: "hsl(222.2,47.4%,11.2%)",
      icon: <MealIcon />,
    },
    Grocery: {
      name: "Grocery",
      foregroundColor: "text-slate-900",
      backgroundColor: "bg-gray-300",
      backgroundColorAsHsl: "hsl(216,12.2%,83.9%)",
      foregroundColorAsHsl: "hsl(222.2,47.4%,11.2%)",
      icon: <GroceryIcon />,
    },
    Shopping: {
      name: "Shopping",
      foregroundColor: "text-slate-900",
      backgroundColor: "bg-zinc-300",
      backgroundColorAsHsl: "hsl(240,4.9%,83.9%)",
      foregroundColorAsHsl: "hsl(222.2,47.4%,11.2%)",
      icon: <ShoppingIcon />,
    },
    Transportation: {
      name: "Transportation",
      foregroundColor: "text-slate-900",
      backgroundColor: "bg-neutral-300",
      backgroundColorAsHsl: "hsl(0,0%,83.1%)",
      foregroundColorAsHsl: "hsl(222.2,47.4%,11.2%)",
      icon: <TransportIcon />,
    },
    "Bank Transfer": {
      name: "Bank Transfer",
      foregroundColor: "text-slate-900",
      backgroundColor: "bg-stone-300",
      backgroundColorAsHsl: "hsl(24,5.7%,82.9%)",
      foregroundColorAsHsl: "hsl(222.2,47.4%,11.2%)",
      icon: <BankTransferIcon />,
    },
    Entertainment: {
      name: "Entertainment",
      foregroundColor: "text-slate-900",
      backgroundColor: "bg-red-300",
      backgroundColorAsHsl: "hsl(0,93.5%,81.8%)",
      foregroundColorAsHsl: "hsl(222.2,47.4%,11.2%)",
      icon: <EntertainmentIcon />,
    },
    Housing: {
      name: "Housing",
      foregroundColor: "text-slate-50",
      backgroundColor: "bg-orange-300",
      backgroundColorAsHsl: "hsl(30.7,97.2%,72.4%)",
      foregroundColorAsHsl: "hsl(222.2,47.4%,11.2%)",
      icon: <HousingIcon />,
    },
    Travel: {
      name: "Travel",
      foregroundColor: "text-slate-900",
      backgroundColor: "bg-amber-300",
      backgroundColorAsHsl: "hsl(45.9,96.7%,64.5%)",
      foregroundColorAsHsl: "hsl(222.2,47.4%,11.2%)",
      icon: <TravelIcon />,
    },
    "Phone & Internet": {
      name: "Phone & Internet",
      foregroundColor: "text-slate-900",
      backgroundColor: "bg-yellow-300",
      backgroundColorAsHsl: "hsl(50.4,97.8%,63.5%)",
      foregroundColorAsHsl: "hsl(222.2,47.4%,11.2%)",
      icon: <PhoneAndInternetIcon />,
    },
    "Personal Care": {
      name: "Personal Care",
      foregroundColor: "text-slate-900",
      backgroundColor: "bg-lime-300",
      // hsl(206_22%_7%_/_35%)
      backgroundColorAsHsl: "hsl(82,84.5%,67.1%)",
      foregroundColorAsHsl: "hsl(222.2,47.4%,11.2%)",
      icon: <PersonalCareIcon />,
    },
    "Health Care": {
      name: "Health Care",
      foregroundColor: "text-slate-900",
      backgroundColor: "bg-green-300",
      backgroundColorAsHsl: "hsl(141.7,76.6%,73.1%)",
      foregroundColorAsHsl: "hsl(222.2,47.4%,11.2%)",
      icon: <HealthCareIcon />,
    },
    Education: {
      name: "Education",
      foregroundColor: "text-slate-900",
      backgroundColor: "bg-emerald-300",
      backgroundColorAsHsl: "hsl(156.2,71.6%,66.9%)",
      foregroundColorAsHsl: "hsl(222.2,47.4%,11.2%)",
      icon: <EducationIcon />,
    },
    Gift: {
      name: "Gift",
      foregroundColor: "text-slate-900",
      backgroundColor: "bg-teal-300",
      backgroundColorAsHsl: "hsl(170.6,76.9%,64.3%)",
      foregroundColorAsHsl: "hsl(222.2,47.4%,11.2%)",
      icon: <GiftIcon />,
    },
    Pet: {
      name: "Pet",
      foregroundColor: "text-slate-900",
      backgroundColor: "bg-cyan-300",
      backgroundColorAsHsl: "hsl(187,92.4%,69%)",
      foregroundColorAsHsl: "hsl(222.2,47.4%,11.2%)",
      icon: <PetIcon />,
    },
    Insurance: {
      name: "Insurance",
      foregroundColor: "text-slate-900",
      backgroundColor: "bg-sky-300",
      backgroundColorAsHsl: "hsl(199.4,95.5%,73.9%)",
      foregroundColorAsHsl: "hsl(222.2,47.4%,11.2%)",
      icon: <InsuranceIcon />,
    },
    Children: {
      name: "Children",
      foregroundColor: "text-slate-900",
      backgroundColor: "bg-blue-300",
      backgroundColorAsHsl: "hsl(211.7,96.4%,78.4%)",
      foregroundColorAsHsl: "hsl(222.2,47.4%,11.2%)",
      icon: <ChildrenIcon />,
    },
    Debt: {
      name: "Debt",
      foregroundColor: "text-slate-900",
      backgroundColor: "bg-indigo-300",
      backgroundColorAsHsl: "hsl(229.7,93.5%,81.8%)",
      foregroundColorAsHsl: "hsl(222.2,47.4%,11.2%)",
      icon: <DebtIcon />,
    },
    Utility: {
      name: "Utility",
      foregroundColor: "text-slate-900",
      backgroundColor: "bg-violet-300",
      backgroundColorAsHsl: "hsl(252.5,94.7%,85.1%)",
      foregroundColorAsHsl: "hsl(222.2,47.4%,11.2%)",
      icon: <UtilityIcon />,
    },
    Retirement: {
      name: "Retirement",
      foregroundColor: "text-slate-900",
      backgroundColor: "bg-purple-300",
      backgroundColorAsHsl: "hsl(269.2,97.4%,85.1%)",
      foregroundColorAsHsl: "hsl(222.2,47.4%,11.2%)",
      icon: <RetirementIcon />,
    },
    Tax: {
      name: "Tax",
      foregroundColor: "text-slate-900",
      backgroundColor: "bg-pink-300",
      backgroundColorAsHsl: "hsl(327.4,87.1%,81.8%)",
      foregroundColorAsHsl: "hsl(222.2,47.4%,11.2%)",
      icon: <TaxIcon />,
    },
    Tithe: {
      name: "Tithe",
      foregroundColor: "text-slate-900",
      backgroundColor: "bg-emerald-300",
      backgroundColorAsHsl: "hsl(156.2,71.6%,66.9%)",
      foregroundColorAsHsl: "hsl(222.2,47.4%,11.2%)",
      icon: <TitheIcon />,
    },
    Other: {
      name: "Other",
      foregroundColor: "text-slate-900",
      backgroundColor: "bg-fuchsia-300",
      backgroundColorAsHsl: "hsl(291.1,93.1%,82.9%)",
      foregroundColorAsHsl: "hsl(222.2,47.4%,11.2%)",
      icon: <OtherIcon />,
    },
    Custom: {
      name: "Custom",
      foregroundColor: "text-slate-900",
      backgroundColor: "bg-rose-300",
      backgroundColorAsHsl: "hsl(352.6,95.7%,81.8%)",
      foregroundColorAsHsl: "hsl(222.2,47.4%,11.2%)",
      icon: <CustomIcon />,
    },
  },
};
