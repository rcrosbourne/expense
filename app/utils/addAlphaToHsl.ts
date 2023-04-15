import {CategoryBackgroundColorsAsHsl} from "@/app/types";

export const addAlphaToHsl = <T extends keyof CategoryBackgroundColorsAsHsl>(
  color: CategoryBackgroundColorsAsHsl[T],
  alpha: string | number
): string => {
    // alpha can be 0.8 or "80%"
    if (typeof alpha === "number") {
        alpha = `${alpha * 100}%`;
    }
    return color.replace(")", `, ${alpha})`).replace("hsl", "hsla");
};