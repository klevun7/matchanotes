// components/Navbar.tsx
"use client";

import Link from "next/link";
import { useAuth } from "@/components/AuthProvider"; // Import useAuth
import { logout } from "@/app/login/actions"; // Import your logout server action

const Navbar = () => {
  const { user, isLoading } = useAuth(); // Get user and isLoading from context

  if (isLoading) {
    return (
      <div className="flex justify-between items-center p-4 shadow-md bg-white">
        <Link href="/" className="text-2xl font-bold text-forest">
          MatchaNotes
        </Link>
        <div>Loading...</div> {/* Show a loading state */}
      </div>
    );
  }

  return (
    <div className="flex justify-between items-center p-4 shadow-md bg-white">
      <Link href="/" className="text-2xl font-bold text-forest">
        MatchaNotes
      </Link>
      <div className="flex space-x-6 items-center">
        {user ? (
          <>
            <Link href="/dashboard" className="hover:text-matcha">
              Dashboard
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
            <Link href="/login" className="hover:text-green-500">
              Login
            </Link>
            <Link href="/signup" className="hover:text-matcha">
              Sign Up
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;