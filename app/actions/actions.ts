"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { MatchaProduct } from "@/types/product";
import { createClient } from "@/lib/supabase/server";

export type AuthActionResult = {
  success: boolean;
  message: string;
  redirectPath?: string; // Optional path for client-side redirect
};

export async function login(formData: FormData): Promise<AuthActionResult> {
  const supabase = await createClient();
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error, data: authData } =
    await supabase.auth.signInWithPassword(data);

  if (error) {
    console.error("Login error:", error.message);
    return { success: false, message: error.message }; // Return error message
  }

  // If email confirmation is required and user is not confirmed, session will be null
  if (authData.user && !authData.session && supabase.auth.admin?.getUserById) {
    // Check if user exists but no session

    return {
      success: true,
      message: "Please check your email to confirm your account and log in.",
      redirectPath: "/login",
    };
  }

  revalidatePath("/", "layout");
  // Instead of direct redirect here, let the client component handle it.
  return { success: true, message: "Login successful!", redirectPath: "/" };
}

export async function signup(formData: FormData): Promise<AuthActionResult> {
  const supabase = await createClient();
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error, data: authData } = await supabase.auth.signUp(data); 

  if (error) {
    console.error("Signup error:", error.message);
    // Supabase often returns 'User already registered' if email confirmation is enabled and user tries to sign up again
    if (error.message.includes("User already registered")) {
      return {
        success: false,
        message: "Account already exists. Please login or reset your password.",
      };
    }
    return { success: false, message: error.message };
  }

  if (authData.user && !authData.session) {
    return {
      success: true,
      message:
        "Registration successful! Please check your email to verify your account.",
      redirectPath: "/login", // Suggest redirecting to login page after signup
    };
  }

  // This case might occur if email confirmation is *disabled* in Supabase settings.
  // In that scenario, `session` would not be null immediately after signup.
  // However, it's generally recommended to have email confirmation enabled.
  revalidatePath("/", "layout");
  return { success: true, message: "Signup successful!", redirectPath: "/" };
}

export async function logout(): Promise<void> {
  // Logout can still redirect directly
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error("Logout error:", error.message);
    redirect("/error?message=" + error.message); // You might want to handle this more gracefully
  }

  revalidatePath("/", "layout");
  redirect("/login");
}

export async function searchMatchaAction(query: string) {
  if (!query) {
    return [];
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("matcha_products")
      .select("*")
      .or(`name.ilike.%${query}%,brand.ilike.%${query}%`)
      .limit(10);

    if (error) {
      console.error("Supabase search action error:", error);
      throw new Error("Failed to perform search");
    }

    return data;
  } catch (error) {
    console.error("Server Action error:", error);
    throw error;
  }
}

export async function showTopMatcha(): Promise<MatchaProduct[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("matcha_products")
      .select("*")
      //sort by popularity once reviews are implemented
      //.order('popularity', { ascending: false })
      .limit(4);

    if (error) {
      console.error("Supabase showTopMatcha error:", error);
      throw new Error("Failed to fetch top matcha products");
    }

    return data as MatchaProduct[];
  } catch (error) {
    console.error("Server Action error:", error);
    throw error;
  }
}

export async function submitReview(formData: FormData) {
  const supabase = await createClient();
  const rawData = {
    matcha_id: formData.get("matcha_id"),
    user_id: formData.get("user_id"),
    rating: formData.get("rating"),
    comment: formData.get("comment"),
  };

  // Validate and parse data
  const rating = rawData.rating ? parseInt(rawData.rating.toString(), 10) : 0;
  if (rating < 1 || rating > 5) {
    return { error: "Rating must be between 1 and 5." };
  }

  if (
    !rawData.comment ||
    typeof rawData.comment !== "string" ||
    rawData.comment.trim() === ""
  ) {
    return { error: "Comment cannot be empty." };
  }

  const dataToInsert = {
    matcha_id: rawData.matcha_id,
    user_id: rawData.user_id,
    rating: rating,
    comment: rawData.comment,
  };

  const { error } = await supabase.from("reviews").insert([dataToInsert]);

  if (error) {
    console.error("Error inserting review:", error);
    return { error: "Failed to submit review. Please try again." };
  }

  if (rawData.matcha_id) {
    revalidatePath(`/matcha/${rawData.matcha_id}`);
  }

  return { success: true };
}
