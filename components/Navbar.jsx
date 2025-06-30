// components/Navbar.tsx
"use client";

import Link from "next/link";
import { useAuth } from "@/components/AuthProvider"; // Import useAuth
import { logout } from "@/app/actions/actions"; // Import your logout server action

const Navbar = () => {
  const { user, isLoading } = useAuth(); // Get user and isLoading from context

  if (isLoading) {
    return (
      <div className="flex justify-between items-center p-4 shadow-md bg-white">
        <Link href="/" className="text-2xl font-bold text-forest">
          🍵
        </Link>
        <div>Loading...</div> {/* Show a loading state */}
      </div>
    );
  }

  return (
    <div className="flex justify-between items-center p-4 shadow-md bg-white">
      <Link href="/" className="text-4xl font-bold text-forest">
        🍵
      </Link>
      <div className="flex space-x-6 items-center">
        {user ? (
          <>
          <Link href="/matcha" className="hover:text-matcha font-semibold">
              Matcha
            </Link>
            <Link href="/profile" className="hover:text-matcha">
              My Profile
            </Link>
            <form action={logout}> {/* Use form with Server Action for logout */}
              <button
                type="submit"
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
              >
                Logout
              </button>
            </form>
          </>
        ) : (
          <>
            <Link href="/matcha" className="hover:text-matcha font-semibold">
              Matcha
            </Link>
            <Link href="/login" className="hover:text-matcha font-semibold">
              Login
            </Link>
            <Link href="/signup" className="hover:text-matcha font-semibold">
              Sign Up
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;