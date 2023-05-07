export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <main className="-mt-24 pb-8">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <h1 className="sr-only">Profile</h1>
        {/* Main 3 column grid */}
        <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-3 lg:gap-8">
          {/* Left column */}
          <div className="grid grid-cols-1 gap-4 lg:col-span-2">
            {/* Welcome panel */}
            <section aria-labelledby="profile-overview-title">
              <div className="overflow-hidden rounded-lg bg-white shadow">
                <h2 className="sr-only" id="profile-overview-title">
                  Profile Overview
                </h2>
                <div className="bg-white p-6">
                  <div className="sm:flex sm:items-center sm:justify-between">
                    <div className="sm:flex sm:space-x-5">
                      <div className="flex-shrink-0">
                        <div className="mx-auto h-20 w-20 rounded-full bg-slate-300 animate-pulse" />
                      </div>
                      <div className="mt-4 text-center sm:mt-0 sm:pt-1 sm:text-left space-y-4 animate-pulse">
                        <div className="text-sm font-medium text-gray-600 h-4 w-80 rounded bg-slate-300"></div>
                        <div className="text-sm font-medium text-gray-600 h-4 w-60 rounded bg-slate-300"></div>
                        <div className="text-sm font-medium text-gray-600 h-4 w-40 rounded bg-slate-300"></div>
                      </div>
                    </div>
                    <div className="mt-5 flex justify-center sm:mt-0">
                      <div className="flex items-center justify-center rounded-md bg-slate-300 px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 w-40 h-10 animate-pulse">
                      </div>
                    </div>
                  </div>
                </div>
                <div className="animate-pulse grid grid-cols-1 divide-y divide-gray-200 border-t border-gray-200 bg-gray-50 sm:grid-cols-3 sm:divide-y-0 sm:divide-x">
                  <div className="px-6 py-5 text-center text-sm font-medium flex flex-col items-start gap-2">
                    <span className="h-3 w-10 rounded bg-slate-300"></span>
                    <span className="h-4 w-40 rounded bg-slate-300"></span>
                  </div>
                  <div className="px-6 py-5 text-center text-sm font-medium flex flex-col items-start gap-2">
                    <span className="h-3 w-10 rounded bg-slate-300"></span>
                    <span className="h-4 w-40 rounded bg-slate-300"></span>
                  </div>
                  <div className="px-6 py-5 text-center text-sm font-medium flex flex-col items-start gap-2">
                    <span className="h-3 w-10 rounded bg-slate-300"></span>
                    <span className="h-4 w-40 rounded bg-slate-300"></span>
                  </div>
                </div>
              </div>
            </section>

            {/* Actions panel */}
            <section aria-labelledby="quick-links-title">
              <div className="sm:grid-cols-2 divide-y divide-gray-200 overflow-hidden rounded-lg sm:grid sm:gap-4 sm:divide-y-0">
                <h2 className="sr-only" id="quick-links-title">
                  Quick links
                </h2>
                <div className="group rounded-lg relative bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-cyan-500">
                  <div className="inline-flex rounded-lg bg-slate-300 h-12 w-40 animate-pulse">
                  </div>
                  <div className="mt-8">
                    <h3 className="text-lg font-medium">
                      <div className="focus:outline-none text-lg text-gray-900 bg-slate-300 h-4 w-28 rounded animate-pulse">
                      </div>
                    </h3>
                    <div className="mt-2 text-xs text-gray-500 grid grid-cols-2">
                      <div className="flex flex-col w-full gap-2">
                        <span className="bg-slate-300 h-4 w-12 rounded animate-pulse"></span>
                        <span className="bg-slate-300 h-4 w-24 rounded animate-pulse"></span>
                      </div>
                      <div className="flex flex-col w-full gap-2">
                        <span className="bg-slate-300 h-4 w-12 rounded animate-pulse"></span>
                        <span className="bg-slate-300 h-4 w-24 rounded animate-pulse"></span>
                      </div>
                    </div>
                  </div>
                  <span
                    className="h-10 w-10 rounded-full pointer-events-none absolute top-6 right-6 bg-slate-300 animate-pulse"
                    aria-hidden="true"
                  >
                  </span>
                </div>
                <div className="group rounded-lg relative bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-cyan-500">
                  <div className="inline-flex rounded-lg bg-slate-300 h-12 w-40 animate-pulse">
                  </div>
                  <div className="mt-8">
                    <h3 className="text-lg font-medium">
                      <div className="focus:outline-none text-lg text-gray-900 bg-slate-300 h-4 w-28 rounded animate-pulse">
                      </div>
                    </h3>
                    <div className="mt-2 text-xs text-gray-500 grid grid-cols-2">
                      <div className="flex flex-col w-full gap-2">
                        <span className="bg-slate-300 h-4 w-12 rounded animate-pulse"></span>
                        <span className="bg-slate-300 h-4 w-24 rounded animate-pulse"></span>
                      </div>
                      <div className="flex flex-col w-full gap-2">
                        <span className="bg-slate-300 h-4 w-12 rounded animate-pulse"></span>
                        <span className="bg-slate-300 h-4 w-24 rounded animate-pulse"></span>
                      </div>
                    </div>
                  </div>
                  <span
                    className="h-10 w-10 rounded-full pointer-events-none absolute top-6 right-6 bg-slate-300 animate-pulse"
                    aria-hidden="true"
                  >
                  </span>
                </div>
                <div className="group rounded-lg relative bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-cyan-500">
                  <div className="inline-flex rounded-lg bg-slate-300 h-12 w-40 animate-pulse">
                  </div>
                  <div className="mt-8">
                    <h3 className="text-lg font-medium">
                      <div className="focus:outline-none text-lg text-gray-900 bg-slate-300 h-4 w-28 rounded animate-pulse">
                      </div>
                    </h3>
                    <div className="mt-2 text-xs text-gray-500 grid grid-cols-2">
                      <div className="flex flex-col w-full gap-2">
                        <span className="bg-slate-300 h-4 w-12 rounded animate-pulse"></span>
                        <span className="bg-slate-300 h-4 w-24 rounded animate-pulse"></span>
                      </div>
                      <div className="flex flex-col w-full gap-2">
                        <span className="bg-slate-300 h-4 w-12 rounded animate-pulse"></span>
                        <span className="bg-slate-300 h-4 w-24 rounded animate-pulse"></span>
                      </div>
                    </div>
                  </div>
                  <span
                    className="h-10 w-10 rounded-full pointer-events-none absolute top-6 right-6 bg-slate-300 animate-pulse"
                    aria-hidden="true"
                  >
                  </span>
                </div>
                <div className="group rounded-lg relative bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-cyan-500">
                  <div className="inline-flex rounded-lg bg-slate-300 h-12 w-40 animate-pulse">
                  </div>
                  <div className="mt-8">
                    <h3 className="text-lg font-medium">
                      <div className="focus:outline-none text-lg text-gray-900 bg-slate-300 h-4 w-28 rounded animate-pulse">
                      </div>
                    </h3>
                    <div className="mt-2 text-xs text-gray-500 grid grid-cols-2">
                      <div className="flex flex-col w-full gap-2">
                        <span className="bg-slate-300 h-4 w-12 rounded animate-pulse"></span>
                        <span className="bg-slate-300 h-4 w-24 rounded animate-pulse"></span>
                      </div>
                      <div className="flex flex-col w-full gap-2">
                        <span className="bg-slate-300 h-4 w-12 rounded animate-pulse"></span>
                        <span className="bg-slate-300 h-4 w-24 rounded animate-pulse"></span>
                      </div>
                    </div>
                  </div>
                  <span
                    className="h-10 w-10 rounded-full pointer-events-none absolute top-6 right-6 bg-slate-300 animate-pulse"
                    aria-hidden="true"
                  >
                  </span>
                </div>
              </div>
            </section>
          </div>

          {/* Right column */}
          <div className="grid grid-cols-1 gap-4">
            {/* Announcements */}
            <section aria-labelledby="announcements-title">
              <div className="overflow-hidden rounded-lg bg-white shadow">
                <div className="p-6">
                  <div
                    className="bg-slate-300 h-3 w-32 animate-pulse rounded"
                  >
                  </div>
                  <div className="mt-6 flow-root">
                    <ul role="list" className="-my-5 divide-y divide-gray-200 animate-pulse">
                      <li className="py-5">
                        <div className="relative focus-within:ring-2 focus-within:ring-cyan-500 h-24 bg-slate-300 w-full rounded">
                        </div>
                      </li>
                      <li className="py-5">
                        <div className="relative focus-within:ring-2 focus-within:ring-cyan-500 h-24 bg-slate-300 w-full rounded">
                        </div>
                      </li>
                      <li className="py-5">
                        <div className="relative focus-within:ring-2 focus-within:ring-cyan-500 h-24 bg-slate-300 w-full rounded">
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div className="mt-6">
                    <div
                      className="flex animate-pulse items-center justify-center rounded-md bg-slate-300 w-full h-8 px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    >
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Recent Hires */}
          <section aria-labelledby="announcements-title">
              <div className="overflow-hidden rounded-lg bg-white shadow">
                <div className="p-6">
                  <div
                    className="bg-slate-300 h-3 w-32 animate-pulse rounded"
                  >
                  </div>
                  <div className="mt-6 flow-root">
                    <ul role="list" className="-my-5 divide-y divide-gray-200 animate-pulse">
                      <li className="py-5">
                        <div className="relative focus-within:ring-2 focus-within:ring-cyan-500 h-24 bg-slate-300 w-full rounded">
                        </div>
                      </li>
                      <li className="py-5">
                        <div className="relative focus-within:ring-2 focus-within:ring-cyan-500 h-24 bg-slate-300 w-full rounded">
                        </div>
                      </li>
                      <li className="py-5">
                        <div className="relative focus-within:ring-2 focus-within:ring-cyan-500 h-24 bg-slate-300 w-full rounded">
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div className="mt-6">
                    <div
                      className="flex animate-pulse items-center justify-center rounded-md bg-slate-300 w-full h-8 px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    >
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
