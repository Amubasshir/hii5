'use client';
import { useEffect } from 'react';
import { createBrowserClient } from '@supabase/ssr';

const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
);

export default function ConfirmPage() {
  useEffect(() => {
    const check = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session) {
        // opens Dashboard in a real browser tab
        window.location.replace('/dashboard');
      } else {
        window.location.replace('/login');
      }
    };
    check();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center text-white">
      Redirecting to Dashboard...
    </div>
  );
}
