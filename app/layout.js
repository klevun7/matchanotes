import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import { AuthProvider } from "@/components/AuthProvider"; // The AuthProvider
import { createClient } from "@/lib/supabase/server"; // Server-side Supabase client

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "matchanotes",
  description: "A collaborative platform for sharing and discovering notes",
};


export default async function RootLayout({ children }) {
  const supabase = await createClient(); // Create a Supabase client for server-side
  const {
    data: { user },
  } = await supabase.auth.getUser(); // Get the user session

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider initialUser={user}>
          <Navbar />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
