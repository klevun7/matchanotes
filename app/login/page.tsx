"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/app/actions/actions";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleLogin = async (formData) => {
    setIsLoading(true);
    setMessage("");

    try {
      const result = await login(formData);
      setMessage(result.message);

      if (result.success && result.redirectPath) {
        router.push(result.redirectPath);
      }
    } catch (error) {
      setMessage("An error occurred during login");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    alert("Google Sign-In functionality is not yet implemented.");
  };

  return (
    <form className="max-w-[400px] mx-auto mt-12 p-10 border border-gray-100 rounded-2xl bg-white shadow-xl flex flex-col gap-6">
      <h1 className="text-3xl font-bold text-center text-matcha mb-4">
        Log In
      </h1>

      <div>
        <label
          htmlFor="email"
          className="font-semibold text-gray-700 block mb-2"
        >
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="w-full p-3 border border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-sage focus:border-sage transition-colors"
        />
      </div>

      <div>
        <label
          htmlFor="password"
          className="font-semibold text-gray-700 block mb-2"
        >
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          className="w-full p-3 border border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-sage focus:border-sage transition-colors"
        />
      </div>

      {message && (
        <div
          className={`p-3 rounded-lg text-sm font-medium ${
            message.includes("successful") ||
            message.includes("check your email")
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {message}
        </div>
      )}

      <button
        type="button"
        onClick={(e) => {
          const form = e.currentTarget.closest("form");
          if (form) {
            const formData = new FormData(form);
            handleLogin(formData);
          }
        }}
        disabled={isLoading}
        className="w-full p-3 bg-sage text-white rounded-lg font-bold cursor-pointer hover:bg-matcha transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? "Loading..." : "Log in"}
      </button>

      <div className="flex items-center my-4">
        <div className="flex-grow border-t border-gray-300"></div>
        <span className="mx-4 text-gray-500 text-sm font-medium">OR</span>
        <div className="flex-grow border-t border-gray-300"></div>
      </div>

      <button
        type="button"
        onClick={handleGoogleSignIn}
        className="w-full p-3 border border-gray-300 rounded-lg text-gray-700 font-semibold flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors"
      >
        <FcGoogle className="w-5 h-5" />
        Sign in with Google
      </button>

      <div className="flex justify-center w-full mt-2">
        <Link
          href={"/signup"}
          className="text-sm text-gray-600 hover:underline"
        >
          <p className="text-center">Don&apos;t have an account?</p>
        </Link>
      </div>
    </form>
  );
}
