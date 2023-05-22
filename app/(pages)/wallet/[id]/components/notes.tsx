import React from "react";
import {TodoListIcon} from "@/components/icons";

const Notes = ({notes, onNotesChanged}: {notes: string, onNotesChanged: (event: React.ChangeEvent<HTMLInputElement>) => void}) => {
  return (
    <>
      <label
        htmlFor="notes"
        className="block text-sm sr-only font-medium leading-6 text-gray-900"
      >
        Notes
      </label>
      <div className="relative mt-2 rounded-md shadow-sm">
        <input
          type="text"
          name="notes"
          id="notes"
          className="block w-full rounded-md bg-slate-100 border-0 py-2.5 pr-10 text-slate-900 ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6"
          placeholder="Notes"
          value={notes}
          onChange={onNotesChanged}
        />
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <TodoListIcon className="h-5 w-5 text-gray-400" />
        </div>
      </div>
    </>
  );
};
export default Notes;
