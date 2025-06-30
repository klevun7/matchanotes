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
          matchanotes
        </Link>
        <div>Loading...</div> {/* Show a loading state */}
      </div>
    );
  }

  return (
    <div className="flex justify-between items-center p-4 shadow-md bg-white">
      <Link href="/" className="text-2xl font-bold text-forest">
        matchanotes
      </Link>
      <div className="flex space-x-6 items-center">
        {user ? (
          <>
          <Link href="/matcha" className="hover:text-matcha font-semibold">
              matcha
            </Link>
            <Link href="/profile" className="hover:text-matcha fony-semibold">
              profile
            </Link>
            <form action={logout}> {/* Use form with Server Action for logout */}
              <button
                type="submit"
                className="bg-sage text-white px-4 py-2 rounded-lg hover:bg-matcha transition-colors duration-300"
              >``
                logout
              </button>
            </form>
          </>
        ) : (
          <>
            <Link href="/matcha" className="hover:text-matcha font-semibold">
              matcha
            </Link>
            <Link href="/login" className="hover:text-matcha font-semibold">
              login
            </Link>
            <Link href="/signup" className="hover:text-matcha font-semibold">
              sign up
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;