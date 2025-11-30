'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createBrowserClient } from '@supabase/ssr';
import '../../globals.css';

const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
);

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(
    'Please check your email to verify your account.'
  );
  const handleRegister = async e => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!name || !email || !password) {
      setError('Please fill in all fields.');
      setLoading(false);
      return;
    }

    // Create a new user with email verification
    const { data, error: supabaseError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: name },
        emailRedirectTo: `${window.location.origin}/confirm`,
      },
    });
    setLoading(false);

    if (supabaseError) {
      setError(supabaseError.message);
      return;
    }

    setError(
      'Account created! Please check your email and verify before logging in.'
    );

    // Optionally, you can clear form
    setName('');
    setEmail('');
    setPassword('');
  };

  useEffect(() => {
    const interval = setInterval(async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session && session.user.email_confirmed_at) {
        clearInterval(interval);
        setMessage('Email confirmed! Redirecting to dashboard...');
        router.push('/dashboard'); // auto-redirect
      }
    }, 3000); // check every 3 seconds

    return () => clearInterval(interval);
  }, []);
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0B0A13] p-4">
      <div className="neon-orb" style={{ top: '20%', left: '20%' }}></div>
      <div className="neon-orb" style={{ bottom: '20%', right: '20%' }}></div>

      <div className="w-full max-w-md bg-[#0E0B12] p-8 rounded-xl border border-white/5 shadow-lg">
        <h2 className="text-2xl text-white font-semibold text-center mb-6">
          Create an Account
        </h2>

        <form onSubmit={handleRegister} className="flex flex-col gap-4">
          <div>
            <label className="text-white/70 text-sm">Full Name</label>
            <input
              type="text"
              className="w-full mt-1 p-3 rounded-lg bg-[#1A1A22] text-white outline-none border border-white/10 focus:border-white/30"
              placeholder="Enter your name"
              value={name}
              onChange={e => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="text-white/70 text-sm">Email</label>
            <input
              type="email"
              className="w-full mt-1 p-3 rounded-lg bg-[#1A1A22] text-white outline-none border border-white/10 focus:border-white/30"
              placeholder="Enter your email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="text-white/70 text-sm">Password</label>
            <input
              type="password"
              className="w-full mt-1 p-3 rounded-lg bg-[#1A1A22] text-white outline-none border border-white/10 focus:border-white/30"
              placeholder="Create a password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>

          {error && (
            <p className="text-red-400 text-sm text-center break-words">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="
              w-full py-3 mt-2 text-white font-medium rounded-lg transition 
              bg-[linear-gradient(135deg,rgba(255,0,80,0.9),rgba(255,70,200,0.9),rgba(70,120,255,0.9))]
              hover:bg-[linear-gradient(135deg,rgba(255,0,80,1),rgba(255,70,200,1),rgba(70,120,255,1))]
              shadow-[0_0_20px_rgba(255,70,200,0.4)]
            "
          >
            {loading ? 'Creating Account...' : 'Register'}
          </button>
        </form>

        <p className="text-center text-white/50 text-sm mt-6">
          Already have an account?{' '}
          <Link
            href="/login"
            className="hover:underline text-pink-700 font-bold"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
