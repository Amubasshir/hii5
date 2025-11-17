'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { createBrowserClient } from '@supabase/ssr';
import '../../globals.css';

const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
);

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // ---------- Email/Password Login ----------
  const handleLogin = async e => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      setError('Please fill out all fields.');
      return;
    }

    const { error: supabaseError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (supabaseError) {
      setError(supabaseError.message);
      return;
    }

    router.push('/dashboard');
  };

  // ---------- Google Login ----------
  const handleGoogleLogin = async () => {
    const { error: supabaseError } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/dashboard` },
    });

    if (supabaseError) setError(supabaseError.message);
  };

  return (
    <div className="min-h-screen bg-[#0B0A13] text-white flex flex-col justify-center items-center py-12 sm:px-6 lg:px-8 relative">
      <div className="neon-orb" style={{ top: '20%', left: '20%' }}></div>
      <div className="neon-orb" style={{ bottom: '20%', right: '20%' }}></div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <div className="flex justify-center items-center space-x-2 text-2xl font-bold mb-2">
            <span role="img" aria-label="waving hand" className="text-3xl">
              👋
            </span>
            <span>Hii5.io</span>
          </div>
          <h2 className="mt-6 text-3xl font-extrabold">Welcome back</h2>
          <p className="mt-2 text-sm">Sign in to access your dashboard</p>
        </div>

        <div className="mt-8 py-8 px-4 shadow rounded-lg sm:px-10 w-full">
          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium">
                Email address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={e => {
                  setEmail(e.target.value);
                  setError('');
                }}
                placeholder="you@example.com"
                className="appearance-none block w-full px-3 py-3 border rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-400 sm:text-sm mt-1"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={e => {
                  setPassword(e.target.value);
                  setError('');
                }}
                placeholder="Password"
                className="appearance-none block w-full px-3 py-3 border rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-400 sm:text-sm mt-1"
                required
              />
            </div>

            {error && <p className="mt-2 text-sm text-red-600">{error}</p>}

            <button
              type="submit"
              className="w-full py-3 mt-2 text-white font-medium rounded-lg transition
                bg-[linear-gradient(135deg,rgba(255,0,80,0.9),rgba(255,70,200,0.9),rgba(70,120,255,0.9))]
                hover:bg-[linear-gradient(135deg,rgba(255,0,80,1),rgba(255,70,200,1),rgba(70,120,255,1))]
                shadow-[0_0_20px_rgba(255,70,200,0.4)]"
            >
              Continue to Dashboard
            </button>

            <button
              type="button"
              onClick={handleGoogleLogin}
              className="w-full mt-4 flex items-center justify-center gap-3 border border-gray-600 py-3 rounded-lg hover:bg-white/5 transition"
            >
              <FcGoogle size={30} />
              Continue with Google
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm">
              Don't have an account?
              <a href="/register" className="font-medium ml-1 text-pink-700">
                Sign up
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
