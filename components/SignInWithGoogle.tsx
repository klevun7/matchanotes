"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";

const GoogleSignInButton = () => {
  const router = useRouter();

  const handleGoogleSignIn = async () => {
    const supabase = createClient();
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });

    if (error) {
      console.error("Error signing in:", error);
    }
  };

  return (
    <button
      type="button"
      onClick={handleGoogleSignIn}
      className="w-full p-3 border border-gray-300 rounded-lg text-gray-700 font-semibold flex items-center justify-center gap-2 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-sage focus:border-sage transition-colors"
    >
      <FcGoogle className="w-5 h-5" />
      Sign in with Google
    </button>
  );
};

export default GoogleSignInButton;
