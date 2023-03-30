import React, {Fragment} from 'react';
import {expenseCategories, incomeCategories} from "@/app/data/categories";
import {Dialog, Transition} from "@headlessui/react";
import {classNames} from "@/app/utils";
const CategoriesDialog = ({
  isOpen,
  close,
  type,
}: {
  isOpen: boolean;
  close: () => void;
  type: "expense" | "income";
}) => {
  const categories = type == "expense" ? expenseCategories : incomeCategories;
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={close}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-2xl bg-slate-50 p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900 capitalize"
                >
                  {type} Categories
                </Dialog.Title>
                <div className="mt-2">
                  <ul
                    role="list"
                    className="mt-3 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3"
                  >
                    {categories.map((category) => (
                      <button key={category.name} className="group">
                        <li className="col-span-1 flex rounded-md shadow-sm">
                          <div
                            className={classNames(
                              category.backgroundColor,
                              category.foregroundColor,
                              "flex w-12 h-12 p-2.5 flex-shrink-0 items-center justify-center rounded-l-md text-sm font-medium p-1 group-hover:cursor-pointer"
                            )}
                          >
                            {category.icon}
                          </div>
                          <div className="flex flex-1 w-full items-center justify-between truncate rounded-r-md border-t border-r border-b border-gray-200 bg-slate-50 group-hover:bg-slate-100 transition-colors">
                            <div className="flex-1 truncate px-4 py-2 text-sm">
                              <span className="font-medium text-gray-900 group-hover:text-slate-600 group-hover:underline transition">
                                {category.name}
                              </span>
                            </div>
                          </div>
                        </li>
                      </button>
                    ))}
                  </ul>
                </div>

                <div className="mt-4">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={close}
                  >
                    Make your own
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
export default CategoriesDialog;