"use client";

import Link from "next/link";
import { useAuth } from "@/components/AuthProvider";
import { logout } from "@/app/actions/actions";
import whisk from "@/public/whisk.png";
import Image from "next/image";

const NavLink = ({ href, children }) => (
  <Link
    href={href}
    className="relative font-semibold transition-colors duration-300 hover:text-matcha group"
  >
    {children}
    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-matcha-light origin-left transform scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100"></span>
  </Link>
);

const Navbar = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex justify-between items-center p-4 shadow-md bg-white">
        <Link href="/" className="text-2xl font-bold text-forest">
          <Image
            src={whisk}
            alt="Matcha Whisk"
            width={40}
            height={40}
            className="object-contain"
          />
        </Link>
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex justify-between items-center p-4 shadow-md bg-white">
      <Link
        href="/"
        className="flex flex-row relative text-2xl font-bold text-forest transition-colors duration-300 hover:text-matcha group"
      >
        <Image
          src={whisk}
          alt="Matcha Whisk"
          width={25}
          height={25}
          className="object-contain"
        />
        matchanotes
        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-matcha-light origin-left transform scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100"></span>
      </Link>
      <div className="flex space-x-6 items-center">
        {user ? (
          <>
            <NavLink href="/matcha">matcha</NavLink>
            <NavLink href="/profile">profile</NavLink>
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
            <NavLink href="/matcha">matcha</NavLink>
            <NavLink href="/login">login</NavLink>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
