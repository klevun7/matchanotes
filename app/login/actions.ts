'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation' 

import { createClient } from '@/lib/supabase/server'



type AuthActionResult = {
  success: boolean;
  message: string;
  redirectPath?: string; // Optional path for client-side redirect
};

export async function login(formData: FormData): Promise<AuthActionResult> {
  const supabase = await createClient();
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  };

  const { error, data: authData } = await supabase.auth.signInWithPassword(data);

  if (error) {
    console.error('Login error:', error.message);
    return { success: false, message: error.message }; // Return error message
  }

  // If email confirmation is required and user is not confirmed, session will be null
  if (authData.user && !authData.session && supabase.auth.admin?.getUserById) { // Check if user exists but no session

      return { success: true, message: 'Please check your email to confirm your account and log in.', redirectPath: '/login' };
  }


  revalidatePath('/', 'layout');
  // Instead of direct redirect here, let the client component handle it.
  return { success: true, message: 'Login successful!', redirectPath: '/' };
}


export async function signup(formData: FormData): Promise<AuthActionResult> {
  const supabase = await createClient();
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  };

  const { error, data: authData } = await supabase.auth.signUp(data); // `data` contains user and session

  if (error) {
    console.error('Signup error:', error.message);
    // Supabase often returns 'User already registered' if email confirmation is enabled and user tries to sign up again
    if (error.message.includes('User already registered')) {
        return { success: false, message: 'Account already exists. Please login or reset your password.' };
    }
    return { success: false, message: error.message };
  }

  // Supabase's default behavior for `signUp` when email confirmation is enabled:
  // It creates the user but returns `session: null`.
  // The user then needs to click a link in the email to activate their session.
  if (authData.user && !authData.session) {
    return {
      success: true,
      message: 'Registration successful! Please check your email to verify your account.',
      redirectPath: '/login', // Suggest redirecting to login page after signup
    };
  }

  // This case might occur if email confirmation is *disabled* in Supabase settings.
  // In that scenario, `session` would not be null immediately after signup.
  // However, it's generally recommended to have email confirmation enabled.
  revalidatePath('/', 'layout');
  return { success: true, message: 'Signup successful!', redirectPath: '/' };
}

export async function logout(): Promise<void> { // Logout can still redirect directly
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error('Logout error:', error.message);
    redirect('/error?message=' + error.message); // You might want to handle this more gracefully
  }

  revalidatePath('/', 'layout');
  redirect('/login');
}

export async function searchMatchaAction(query: string) {
  if (!query) {
    return []; 
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('matcha_products')
      .select('*')
      .or(`name.ilike.%${query}%,brand.ilike.%${query}%`)
      .limit(10);

    if (error) {
      console.error('Supabase search action error:', error);
      throw new Error('Failed to perform search');
    }

    return data;
  } catch (error) {
    console.error('Server Action error:', error);
    throw error; 
  }
}