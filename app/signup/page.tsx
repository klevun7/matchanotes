// app/signup/page.tsx
"use client";

import { useActionState } from "react";
import { signup } from "@/app/login/actions";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"; // Import useState for delay state

// Define the type for the action's return value
type AuthActionResult = {
  success: boolean;
  message: string;
  redirectPath?: string;
} | undefined;

export default function SignupPage() {
  const router = useRouter();

  const signupReducer = async (
    _state: AuthActionResult,
    formData: FormData
  ): Promise<AuthActionResult> => {
    return await signup(formData);
  };

  const [state, formAction] = useActionState<AuthActionResult, FormData>(
    signupReducer,
    undefined
  );

  // Use a state to manage if the redirect has been initiated
  const [redirectScheduled, setRedirectScheduled] = useState(false);

  useEffect(() => {
    if (state?.success && state.redirectPath && !redirectScheduled) {
      // Only schedule redirect if it's a success and not already scheduled
      setRedirectScheduled(true); // Mark that redirect is scheduled

      const timer = setTimeout(() => {
        router.push(state.redirectPath as string); // Cast to string as we know it exists here
      }, 3000); // Redirect after 3 seconds (adjust as needed)

      // Clear the timeout if the component unmounts or state changes before redirect
      return () => clearTimeout(timer);
    }
  }, [state, router, redirectScheduled]); // Add redirectScheduled to dependency array

  // Optional: If there's an error, reset redirectScheduled to allow trying again
  useEffect(() => {
      if (state && !state.success) {
          setRedirectScheduled(false);
      }
  }, [state]);


  return (
    <form
      className="max-w-[350px] mx-auto mt-12 p-8 border border-gray-200 rounded-lg bg-white shadow-md flex flex-col gap-4"
      action={formAction}
    >
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
      <div className="flex gap-2 mt-4">
        <button
          type="submit"
          className="flex-1 p-2 bg-gray-100 text-gray-900 border border-gray-300 rounded font-semibold cursor-pointer hover:bg-gray-200 transition"
          disabled={redirectScheduled} // Optionally disable button while redirect is pending
        >
          Sign up
        </button>
      </div>

      {/* Display the message */}
      {state && state.message && (
        <p
          className={`mt-4 p-3 rounded text-center ${
            state.success ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
          }`}
        >
          {state.message}
        </p>
      )}

      {/* Optional: Add a button to redirect immediately if the user doesn't want to wait */}
      {state?.success && state.redirectPath && (
        <button
          type="button"
          onClick={() => router.push(state.redirectPath as string)}
          className="mt-2 p-2 bg-green-500 text-white rounded font-semibold hover:bg-green-600 transition"
        >
          Go to Login Page Now
        </button>
      )}
    </form>
  );
}