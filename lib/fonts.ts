// lib/fonts.ts
import localFont from "next/font/local";

export const generalSans = localFont({
  src: [
    {
      path: "@/public/fonts/GeneralSans-Regular.woff2", 
      weight: "400", 
      style: "normal",
    },
  ],
  variable: "--font-general-sans", 
  display: "swap", 
});
