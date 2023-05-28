import { classNames } from "@/lib/utils";
import React from "react";
import { TickIcon, XIcon } from "@/components/icons";

const ActionButtons = ({
  isIncome,
  isEditing,
  onCancel,
    canCreate,
}: {
  isIncome: boolean;
  isEditing: boolean;
  onCancel: (e: React.MouseEvent<HTMLButtonElement>) => void;
  canCreate: boolean;
}) => {
  return (
    <div className="flex items-center justify-around gap-4">
      <button
        type="submit"
        disabled={!canCreate}
        className={classNames(
          isIncome
            ? "bg-teal-700 hover:bg-teal-900"
            : "bg-red-400 hover:bg-red-500",
          "inline-flex items-center gap-x-2 rounded-md py-2.5 px-3.5 text-sm font-semibold text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2" +
            " focus-visible:outline-teal-600 transition-colors duration-1000 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
        )}
      >
        {isEditing ? "Save" : "Create"}
        <TickIcon className="-mr-0.5 h-5 w-5 text-slate-50 fill-current" />
      </button>
      <button
        type="button"
        onClick={onCancel}
        className="inline-flex items-center gap-x-2 border border-slate-500 rounded-md py-2.5 px-3.5 text-sm font-semibold text-slate-500 shadow-sm hover:bg-slate-500 hover:text-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-600"
      >
        Cancel
        <XIcon className="-mr-0.5 h-5 w-5 fill-current" />
      </button>
    </div>
  );
};
export default ActionButtons;
