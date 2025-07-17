"use client";

import { useState, useEffect } from "react"; // Import useEffect
import { useRouter } from "next/navigation";
import { signup } from "@/app/actions/actions";

export default function SignupPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  const [shouldRedirect, setShouldRedirect] = useState<{ path: string } | null>(
    null,
  );

  const handleSignup = async (formData: FormData) => {
    setIsLoading(true);
    setMessage("");

    try {
      const result = await signup(formData);
      setMessage(result.message);

      if (result.success && result.redirectPath) {
        setShouldRedirect({ path: result.redirectPath });
      }
    } catch (error) {
      setMessage("An error occurred during signup");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (shouldRedirect) {
      const timer = setTimeout(() => {
        router.push(shouldRedirect.path);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [shouldRedirect, router]);

  return (
    <form className="max-w-[350px] mx-auto mt-12 p-8 border border-gray-200 rounded-lg bg-white shadow-md flex flex-col gap-4">
      <label htmlFor="email" className="font-medium">
        Email:
      </label>
      <input
        id="email"
        name="email"
        type="email"
        required
        className="p-2 border border-gray-300 rounded text-base"
      />
      <label htmlFor="password" className="font-medium">
        Password:
      </label>
      <input
        id="password"
        name="password"
        type="password"
        required
        className="p-2 border border-gray-300 rounded text-base"
      />

      {message && (
        <div
          className={`p-2 rounded text-sm ${
            message.includes("successful") ||
            message.includes("check your email")
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {message}
        </div>
      )}

      <div className="flex gap-2 mt-4">
        <button
          type="button"
          onClick={(e) => {
            const form = e.currentTarget.closest("form") as HTMLFormElement;
            const formData = new FormData(form);
            handleSignup(formData);
          }}
          disabled={isLoading}
          className="flex-1 p-2 bg-sage text-white border rounded font-semibold cursor-pointer hover:bg-matcha transition disabled:opacity-50"
        >
          {isLoading ? "Loading..." : "Sign up"}
        </button>
      </div>
    </form>
  );
}
