'use client';
import { createBrowserClient } from '@supabase/ssr';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
);

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser();
      setIsLoggedIn(!!data.user);
    };
    checkUser();
  }, []);

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

        {/* Center: Medium Devices - Cart + Sign in */}
        {/* Right Controls */}
        <div className="flex items-center gap-4 ml-auto">
          {/* Cart button: visible on all devices */}
          <button
            className="text-lg  hover:text-gray-300 lg:hidden"
            onClick={() => setCartOpen(true)}
          >
            Cart(0)
          </button>

          {/* Sign in button: only on md and up */}
          <div className="hidden md:flex mr-4">
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="px-6 py-2 text-white text-lg rounded-full font-semibold hover:bg-white/10 transition"
              >
                Logout
              </button>
            ) : (
              <Link
                href="/login"
                className="px-6 py-2 text-white text-lg rounded-full font-semibold hover:bg-white/10 transition"
              >
                Sign in
              </Link>
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
          {isLoggedIn && (
            <Link href="/dashboard" className="hover:text-gray-300">
              Dashboard
            </Link>
          )}

          <button
            className=" hover:text-gray-300"
            onClick={() => setCartOpen(true)}
          >
            Cart(0)
          </button>
        </nav>

        {/* Right: Desktop Controls */}
        <div className="hidden md:flex items-center gap-6 text-xl lg:flex">
          <Link
            href="/get-started"
            className="relative inline-block rounded-full p-[3px] bg-gradient-to-r from-[rgba(255,0,150,0.8)] via-[rgba(128,0,255,0.8)] to-[rgba(0,200,255,0.8)]"
          >
            <span className="block bg-black text-white px-6 py-2 rounded-full font-semibold transition duration-200 ">
              Get started
            </span>
          </Link>
        </div>

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
          <button
            className="text-sm hover:text-gray-300"
            onClick={() => {
              setCartOpen(true);
              setMobileOpen(false);
            }}
          >
            Cart(0)
          </button>
        </div>
      )}

      {/* Cart Modal */}
      {cartOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
          <div className="bg-[#0B0A13] rounded-2xl p-6 w-11/12 max-w-md relative">
            <button
              className="absolute top-4 right-4 text-white text-xl"
              onClick={() => setCartOpen(false)}
            >
              ×
            </button>
            <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
            <p className="text-gray-300 mb-4">You have 0 items in your cart.</p>

            <div className="space-y-3 max-h-60 overflow-y-auto">
              <div className="flex justify-between items-center border-b border-gray-700/30 pb-2">
                <span>Item 1</span>
                <span>$10</span>
              </div>
            </div>

            <button className="mt-6 w-full bg-gradient-to-r from-purple-500 to-pink-500 text-black font-semibold py-3 rounded-xl">
              Checkout
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
