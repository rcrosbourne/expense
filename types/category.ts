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
export type CategoryBackgroundColorsAsHsl = {
  "bg-slate-300": "hsl(212.7,26.8%,83.9%)";
  "bg-gray-300": "hsl(216,12.2%,83.9%)";
  "bg-zinc-300": "hsl(240,4.9%,83.9%)";
  "bg-neutral-300": "hsl(0,0%,83.1%)";
  "bg-stone-300": "hsl(24,5.7%,82.9%)";
  "bg-red-300": "hsl(0,93.5%,81.8%)";
  "bg-orange-300": "hsl(30.7,97.2%,72.4%)";
  "bg-amber-300": "hsl(45.9,96.7%,64.5%)";
  "bg-yellow-300": "hsl(50.4,97.8%,63.5%)";
  "bg-lime-300": "hsl(82,84.5%,67.1%)";
  "bg-green-300": "hsl(141.7,76.6%,73.1%)";
  "bg-emerald-300": "hsl(156.2,71.6%,66.9%)";
  "bg-teal-300": "hsl(170.6,76.9%,64.3%)";
  "bg-cyan-300": "hsl(187,92.4%,69%)";
  "bg-sky-300": "hsl(199.4,95.5%,73.9%)";
  "bg-blue-300": "hsl(211.7,96.4%,78.4%)";
  "bg-indigo-300": "hsl(229.7,93.5%,81.8%)";
  "bg-violet-300": "hsl(252.5,94.7%,85.1%)";
  "bg-purple-300": "hsl(269.2,97.4%,85.1%)";
  "bg-fuchsia-300": "hsl(291.1,93.1%,82.9%)";
  "bg-pink-300": "hsl(327.4,87.1%,81.8%)";
  "bg-rose-300": "hsl(352.6,95.7%,81.8%)";
};

export type Category<T extends keyof CategoryBackgroundColors> = {
  id?: string;
  name: string;
  foregroundColor: keyof CategoryForegroundColors;
  backgroundColor: T;
  backgroundColorAsHsl?: CategoryBackgroundColorsAsHsl[T];
  foregroundColorAsHsl: string;
  icon?: React.ReactNode;
};
export type AnyCategory = Category<keyof CategoryBackgroundColors>;
