import { classNames } from "@/app/utils";

const ActionButtons = ({ isIncome, isEditing }: { isIncome: boolean, isEditing: boolean }) => {
  return (
    <div className="flex items-center justify-around gap-4">
      <button
        type="submit"
        className={classNames(
          isIncome
            ? "bg-teal-700 hover:bg-teal-900"
            : "bg-red-400 hover:bg-red-500",
          "inline-flex items-center gap-x-2 rounded-md py-2.5 px-3.5 text-sm font-semibold text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2" +
            " focus-visible:outline-teal-600 transition-colors duration-1000 ease-in-out"
        )}
      >
          {isEditing ? "Save" : "Create"}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 520 520"
          className="-mr-0.5 h-5 w-5 text-slate-50 fill-current"
        >
          <path
            d="M79.423 240.755a47.529 47.529 0 0 0-36.737 77.522l120.73 147.894a43.136 43.136 0 0 0 36.066 16.009c14.654-.787 27.884-8.626 36.319-21.515L486.588 56.773a6.13 6.13 0 0 1 .128-.2c2.353-3.613 1.59-10.773-3.267-15.271a13.321 13.321 0 0 0-19.362 1.343q-.135.166-.278.327L210.887 328.736a10.961 10.961 0 0 1-15.585.843l-83.94-76.386a47.319 47.319 0 0 0-31.939-12.438z"
            data-name="7-Check"
          />
        </svg>
      </button>
      <button
        type="button"
        className="inline-flex items-center gap-x-2 border border-slate-500 rounded-md py-2.5 px-3.5 text-sm font-semibold text-slate-500 shadow-sm hover:bg-slate-500 hover:text-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-600"
      >
        Cancel
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 415.188 415.188"
          className="-mr-0.5 h-5 w-5 fill-current"
        >
          <path d="M412.861 78.976c3.404-6.636 2.831-14.159-.15-20.404.84-7.106-1.02-14.321-7.746-19.855a59509.569 59509.569 0 0 1-18.781-15.457c-11.005-9.055-28.237-11.913-38.941 0-48.619 54.103-99.461 105.856-152.167 155.725-39.185-36.605-78.846-72.713-118.223-108.868-13.82-12.693-33.824-8.71-42.519 6.411-12.665 6.286-22.931 14.481-31.42 28.468-4.042 6.664-3.727 15.076 0 21.764 25.421 45.578 74.557 85.651 114.957 122.529-5.406 4.839-10.772 9.724-16.287 14.461-54.43 46.742-91.144 76.399-23.029 124.325.919.647 1.856.504 2.789.882 1.305.602 2.557 1.026 4.004 1.264.45.017.87.093 1.313.058 1.402.114 2.774.471 4.195.192 36.621-7.18 70.677-35.878 101.576-67.48 30.1 29.669 62.151 58.013 97.395 74.831 8.391 4.005 18.395 1.671 24.855-3.931 10.832.818 20.708-5.913 25.665-15.586.734-.454 1.207-.713 2.002-1.21 15.748-9.838 17.187-29.431 5.534-42.936-26.313-30.492-54.284-59.478-82.798-87.95 51.341-50.166 115.448-104.27 147.776-167.233z" />
        </svg>
      </button>
    </div>
  );
};
export default ActionButtons;
