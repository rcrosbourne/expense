import localFont from "next/font/local";

export const wotfard = localFont({
  src: [
    {
      path: "../assets/fonts/wotfard/wotfard-thin-webfont.woff2",
      weight: "100",
      style: "normal",
    },
    {
      path: "../assets/fonts/wotfard/wotfard-extralight-webfont.woff2",
      weight: "200",
      style: "normal",
    },
    {
      path: "../assets/fonts/wotfard/wotfard-light-webfont.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../assets/fonts/wotfard/wotfard-regular-webfont.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../assets/fonts/wotfard/wotfard-medium-webfont.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../assets/fonts/wotfard/wotfard-semibold-webfont.woff2",
      weight: "600",
      style: "bold",
    },
    {
      path: "../assets/fonts/wotfard/wotfard-bold-webfont.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-wotfard",
});