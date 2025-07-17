// lib/fonts.ts
import localFont from "next/font/local";

export const generalSans = localFont({
  src: [
    {
      path: "@/public/fonts/GeneralSans-Regular.woff2", // Path is relative to THIS file
      weight: "400", // Assuming 'Regular' means a font-weight of 400
      style: "normal",
    },
  ],
  variable: "--font-general-sans", // This CSS variable name
  display: "swap", // 'swap' is generally good for performance (shows fallback then swaps)
});
