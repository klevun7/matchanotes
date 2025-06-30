// components/Navbar.tsx
"use client";

import Link from "next/link";
import { useAuth } from "@/components/AuthProvider"; // Import useAuth
import { logout } from "@/app/actions/actions"; 

const Navbar = () => {
  const { user, isLoading } = useAuth(); 

  if (isLoading) {
    return (
      <div className="flex justify-between items-center p-4 shadow-md bg-white">
        <Link href="/" className="text-2xl font-bold text-forest">
          matchanotes
        </Link>
        <div>Loading...</div> 
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
            <Link href="/profile" className="hover:text-matcha font-semibold">
              profile
            </Link>
            <form action={logout}>
              <button
                type="submit"
                className="bg-sage text-white px-4 py-2 rounded-lg hover:bg-matcha transition-colors duration-300"
              >
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
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;