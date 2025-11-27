'use client';

import { createBrowserClient } from '@supabase/ssr';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
);

export default function VerifyOTPPage({ searchParams }) {
  const router = useRouter();
  const email = searchParams?.email || '';
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleVerify = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // 1️⃣ Get user by email
      const { data: users } = await supabase.auth.admin.listUsers({ email });
      if (!users || users.length === 0) {
        setError('User not found');
        return;
      }
      const userId = users[0].id;

      // 2️⃣ Check OTP
      const { data: otpData } = await supabase
        .from('email_verifications')
        .select('*')
        .eq('user_id', userId)
        .eq('code', otp)
        .gte('expires_at', new Date())
        .single();

      if (!otpData) {
        setError('Invalid or expired OTP');
        return;
      }

      // 3️⃣ Mark user as verified
      await supabase.auth.admin.updateUserById(userId, {
        user_metadata: { ...users[0].user_metadata, is_verified: true },
      });

      // 4️⃣ Delete used OTP
      await supabase.from('email_verifications').delete().eq('id', otpData.id);

      setSuccess('Email verified! Redirecting...');
      setTimeout(() => router.push('/login'), 2000);
    } catch (err) {
      setError(err.message || 'Verification failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center text-white">
      <form onSubmit={handleVerify} className="flex flex-col gap-4">
        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="Enter OTP"
          className="p-3 rounded bg-[#1A1A22] text-white"
        />
        {error && <p className="text-red-400">{error}</p>}
        {success && <p className="text-green-400">{success}</p>}
        <button className="bg-pink-600 p-3 rounded">
          {success ? 'Verified' : 'Verify OTP'}
        </button>
      </form>
    </div>
  );
}
