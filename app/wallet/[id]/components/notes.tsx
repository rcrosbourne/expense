import React from "react";

const Notes = () => {
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
        />
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            data-name="Layer 1"
            viewBox="0 0 24 24"
            className="h-5 w-5 text-gray-400"
          >
            <path d="M11 23.5a.5.5 0 0 1-.5.5h-6A4.505 4.505 0 0 1 0 19.5v-15C0 2.019 2.019 0 4.5 0h9C15.981 0 18 2.019 18 4.5v4a.5.5 0 0 1-1 0v-4C17 2.57 15.43 1 13.5 1h-9C2.57 1 1 2.57 1 4.5v15C1 21.43 2.57 23 4.5 23h6a.5.5 0 0 1 .5.5Zm3-18a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0 0 1h9a.5.5 0 0 0 .5-.5Zm-2 5a.5.5 0 0 0-.5-.5h-7a.5.5 0 0 0 0 1h7a.5.5 0 0 0 .5-.5ZM4.5 15a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1h-4ZM24 17.5c0 3.584-2.916 6.5-6.5 6.5S11 21.084 11 17.5s2.916-6.5 6.5-6.5 6.5 2.916 6.5 6.5Zm-1 0c0-3.032-2.468-5.5-5.5-5.5S12 14.468 12 17.5s2.468 5.5 5.5 5.5 5.5-2.468 5.5-5.5Zm-3.347-.88-2.218 2.129a.878.878 0 0 1-1.224.002l-1.131-1.108a.5.5 0 0 0-.699.715l1.131 1.108c.362.354.838.531 1.312.531s.95-.178 1.31-.532l2.213-2.124a.5.5 0 0 0-.693-.721Z" />
          </svg>
        </div>
      </div>
    </>
  );
};
export default Notes;
