'use client';

import { createBrowserClient } from '@supabase/ssr';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

// ✅ Supabase Client
const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
);

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // ✅ NEW: Profile dropdown state
  const [profileOpen, setProfileOpen] = useState(false);

  // ✅ NEW: Avatar state
  const [avatarUrl, setAvatarUrl] = useState(null);

  const router = useRouter();

  // ✅ UPDATED: Check user + load profile photo
  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser();

      if (data?.user) {
        setIsLoggedIn(true);

        // ✅ Load avatar from user metadata OR default image
        setAvatarUrl(
          data.user.user_metadata?.avatar_url || '/default-avatar.png'
        );
      } else {
        setIsLoggedIn(false);
        setAvatarUrl(null);
      }
    };

    checkUser();
  }, []);

  // ✅ Logout handler
  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsLoggedIn(false);
    router.push('/login');
  };

  return (
    <header className="w-full text-white bg-[#0B0A13] border-white/5 font-[font3] relative">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between relative">
        {/* Left: Logo */}
        <div className="flex items-center gap-2 text-4xl font-semibold">
          <img src="/hii5logo.png" alt="Hii5 logo" className="w-[100px]" />
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-4 ml-auto">
          {/* ✅ UPDATED: Sign in OR Profile Photo */}
          <div className="hidden md:flex items-center gap-6 mr-4 relative">
            {isLoggedIn ? (
              // ✅ PROFILE AVATAR + DROPDOWN
              <div className="relative">
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="w-11 h-11 rounded-full overflow-hidden border border-white/20"
                >
                  <img
                    src={avatarUrl}
                    alt="User"
                    className="w-full h-full object-cover"
                  />
                </button>

                {/* ✅ DROPDOWN MENU */}
                {profileOpen && (
                  <div className="absolute right-0 mt-3 w-44 bg-[#0B0A13] border border-white/10 rounded-xl overflow-hidden shadow-lg">
                    <Link
                      href="/dashboard"
                      onClick={() => setProfileOpen(false)}
                      className="block px-4 py-3 hover:bg-white/10"
                    >
                      Dashboard
                    </Link>

                    <button
                      onClick={() => {
                        setProfileOpen(false);
                        handleLogout();
                      }}
                      className="w-full text-left px-4 py-3 text-red-400 hover:bg-white/10"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              // ✅ NOT LOGGED IN UI
              <>
                <Link
                  href="/login"
                  className="px-6 py-2 text-white text-lg rounded-full font-semibold hover:bg-white/10 transition"
                >
                  Sign in
                </Link>

                <Link
                  href="/get-started"
                  className="relative inline-block rounded-full p-[3px] bg-gradient-to-r from-[rgba(255,0,150,0.8)] via-[rgba(128,0,255,0.8)] to-[rgba(0,200,255,0.8)]"
                >
                  <span className="block bg-black text-white px-6 py-2 rounded-full font-semibold transition duration-200">
                    Get started
                  </span>
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Center: Desktop Menu */}
        <nav className="hidden lg:flex items-center gap-8 text-xl absolute left-1/2 -translate-x-1/2">
          <Link href="/" className="hover:text-gray-300">
            Home
          </Link>
          <Link href="/about" className="hover:text-gray-300">
            About
          </Link>
          <Link href="/pricing" className="hover:text-gray-300">
            Pricing
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-4 lg:hidden">
          <button
            className="w-14 h-14 rounded-full flex items-center justify-center border border-white/10 ml-3 md:ml-6"
            style={{ backgroundColor: '#212121' }}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-[#0B0A13] border-t border-white/10 px-6 pb-6 pt-4 space-y-3 text-sm z-50">
          <Link href="/" className="block hover:text-gray-300">
            Home
          </Link>
          <Link href="/about" className="block hover:text-gray-300">
            About
          </Link>
          <Link href="/pricing" className="block hover:text-gray-300">
            Pricing
          </Link>

          {isLoggedIn && (
            <Link href="/dashboard" className="block hover:text-gray-300">
              Dashboard
            </Link>
          )}
        </div>
      )}
    </header>
  );
}
