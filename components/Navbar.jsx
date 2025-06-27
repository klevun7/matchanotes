"use client";

import Link from "next/link";
import {useState} from "react";

const Navbar = () => {
  return (
    <div className="flex justify-between items-center p-4 shadow-md bg-white">
      <Link href="/" className="text-2xl font-bold text-forest">
        MatchaNotes
      </Link>
      <div className="flex space-x-6 items-center">
        <Link href="/login" className="hover:text-matcha">
          Login
        </Link>
        <Link href="/signup" className="hover:text-matcha">
          Sign Up
        </Link>
        <Link href="/profile" className="bg-matcha text-black px-4 py-2 rounded-lg hover:bg-forest">
          My Profile
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
