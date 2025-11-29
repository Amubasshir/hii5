'use client';

import { createBrowserClient } from '@supabase/ssr';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { FcGoogle } from 'react-icons/fc';
import '../../globals.css';

// ✅ Initialize Supabase client
const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
);

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // ✅ Save user to profiles table
  const saveUserToDB = async user => {
    if (!user || !user.id) return;

    const { error: dbError } = await supabase.from('profiles').upsert(
      {
        id: user.id,
        email: user.email,
        name: user.user_metadata?.full_name || '',
        avatar_url: user.user_metadata?.avatar_url || '',
      },
      { onConflict: 'id' }
    );

    if (dbError) {
      console.error('Error saving user:', dbError.message);
    }
  };

  // ✅ Email & Password Login
  const handleLogin = async e => {
    e.preventDefault();
    setError('');

    const { data, error: loginError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (loginError) {
      setError(loginError.message);
      return;
    }

    await saveUserToDB(data.user);
    router.push('/dashboard');
  };

  // ✅ Google Login
  const handleGoogleLogin = async () => {
    setError('');

    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/dashboard`,
      },
    });

    if (error) setError(error.message);
  };

  // ✅ Listen for Google OAuth login & save user
  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        await saveUserToDB(session.user);
        router.push('/dashboard');
      }
    });

    return () => subscription.unsubscribe();
  }, [router]);

  return (
    <div className="min-h-screen bg-[#0B0A13] text-white flex flex-col justify-center items-center py-12 sm:px-6 lg:px-8 relative">
      {/* Background Neon Orbs */}
      <div
        className="absolute w-64 h-64 rounded-full filter blur-3xl opacity-50 bg-pink-600/50"
        style={{ top: '20%', left: '20%' }}
      ></div>
      <div
        className="absolute w-64 h-64 rounded-full filter blur-3xl opacity-50 bg-blue-600/50"
        style={{ bottom: '20%', right: '20%' }}
      ></div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <img src="/hii5logo.png" alt="logo" className="w-20 h-20 mx-auto" />
          <h2 className="mt-6 text-3xl font-extrabold">Welcome back</h2>
          <p className="mt-2 text-sm text-gray-400">
            Sign in to access your dashboard
          </p>
        </div>

        <div className="mt-8 py-8 px-4 bg-[#14121F] border border-[#2A263F] shadow-2xl rounded-xl sm:px-10 w-full">
          <form className="space-y-6" onSubmit={handleLogin}>
            {/* Email */}
            <div>
              <label className="block text-sm text-gray-300">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={e => {
                  setEmail(e.target.value);
                  setError('');
                }}
                className="w-full px-4 py-3 bg-[#0B0A13] border border-gray-600 rounded-lg mt-1"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm text-gray-300">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={e => {
                  setPassword(e.target.value);
                  setError('');
                }}
                className="w-full px-4 py-3 bg-[#0B0A13] border border-gray-600 rounded-lg mt-1"
              />
            </div>

            {/* Error */}
            {error && (
              <p className="text-red-400 text-sm text-center bg-red-900/20 p-2 rounded">
                {error}
              </p>
            )}

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-3 rounded-lg font-semibold bg-pink-600 hover:opacity-90"
            >
              Continue to Dashboard
            </button>

            <div className="flex items-center gap-4 my-6">
              <div className="h-px bg-gray-700 flex-1"></div>
              <span className="text-gray-400 text-sm">OR</span>
              <div className="h-px bg-gray-700 flex-1"></div>
            </div>

            {/* Google Button */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center gap-3 border border-gray-600 py-3 rounded-lg hover:bg-gray-800"
            >
              <FcGoogle size={26} />
              Continue with Google
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-400">
              Don't have an account?
              <a href="/register" className="ml-1 text-pink-500 font-semibold">
                Sign up
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
