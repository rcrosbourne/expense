import React from "react";

type CategoryForegroundColors = {
  "text-slate-900": true;
  "text-slate-50": true;
};
type CategoryBackgroundColors = {
  "bg-slate-300": true;
  "bg-gray-300": true;
  "bg-zinc-300": true;
  "bg-neutral-300": true;
  "bg-stone-300": true;
  "bg-red-300": true;
  "bg-orange-300": true;
  "bg-amber-300": true;
  "bg-yellow-300": true;
  "bg-lime-300": true;
  "bg-green-300": true;
  "bg-emerald-300": true;
  "bg-teal-300": true;
  "bg-cyan-300": true;
  "bg-sky-300": true;
  "bg-blue-300": true;
  "bg-indigo-300": true;
  "bg-violet-300": true;
  "bg-purple-300": true;
  "bg-fuchsia-300": true;
  "bg-pink-300": true;
  "bg-rose-300": true;
};
export type Category = {
  name: string;
  foregroundColor: keyof CategoryForegroundColors;
  backgroundColor: keyof CategoryBackgroundColors;
  icon?: React.ReactNode;
};