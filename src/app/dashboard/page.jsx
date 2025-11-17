'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import { FiLogOut } from 'react-icons/fi';
const BRAND_COLOR = ['#FF007f'];
import '../globals.css';
// --- Helper Components ---
import { FaHandPaper } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

import { createBrowserClient } from '@supabase/ssr';

const StatCard = ({ title, value, subtitle, icon }) => (
  <div className=" bg-gray-900 z-10 p-5 rounded-2xl  flex flex-col justify-between">
    <div className="flex justify-between items-center ">
      <span className="text-sm">{title}</span>
      {/* Using a simple placeholder icon for brevity */}
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M4 6h16M4 10h16M4 14h16M4 18h16"
        ></path>
      </svg>
    </div>
    <p className="text-2xl font-bold  mt-2">{value}</p>
    {subtitle && <p className="text-xs  mt-1">{subtitle}</p>}
  </div>
);

const TemplateCard = ({ title, content, link }) => (
  <div>
    <h3 className="text-sm font-medium  mb-1">{title}</h3>
    <div className=" border border-gray-200 rounded-md p-3">
      {/* The link part is colored dynamically */}
      <p className="text-sm ">{content.replace(link, '').trim()}</p>
      <p className="text-sm" style={{ color: BRAND_COLOR }}>
        {link}
      </p>
    </div>
    <button className="mt-1 flex items-center space-x-1 text-sm  hover:text-gray-700">
      {/* Copy Icon */}
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M8 7v4a1 1 0 001 1h5m-5 0h5m-5 0a1 1 0 01-1-1v-4m0 0a1 1 0 011-1h5m0 0a1 1 0 011 1v4m0 0a1 1 0 01-1 1h-5m-6 9v-3m0-3h6m-6 3h-2a2 2 0 01-2-2v-5a2 2 0 012-2h10a2 2 0 012 2v5a2 2 0 01-2 2h-2"
        ></path>
      </svg>
      <span>Copy</span>
    </button>
  </div>
);

// --- Main Dashboard Component ---

const DashboardPage = () => {
  const [businessName, setBusinessName] = useState('');
  const [slug, setSlug] = useState('c5c4ed');
  const [logoName, setLogoName] = useState('No file chosen');
  const [brandColor, setBrandColor] = useState('#FF007f'); // initial color
  const router = useRouter();

  const handleColorChange = e => {
    const value = e.target.value;
    // Optional: validate hex format before updating
    if (/^#([0-9A-Fa-f]{0,6})$/.test(value)) {
      setBrandColor(value);
    }
  };

  const submitHandler = e => {
    e.preventDefault();

    const googleURL = e.target.googleURL.value;
    const yelpURL = e.target.yelpURL.value;

    const formData = {
      businessName,
      slug,
      brandColor,
      logoName,
      googleURL,
      yelpURL,
    };

    console.log('Form submitted:', formData);

    // Example: send to backend
    // fetch('/api/save-settings', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(formData),
    // })
    // .then(res => res.json())
    // .then(data => console.log(data))
    // .catch(err => console.error(err));
  };

  // Generate a random slug
  const generateSlug = (length = 6) => {
    const chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  const handleRegenerateSlug = () => setSlug(generateSlug());

  const handleLogoChange = e => {
    if (e.target.files.length > 0) setLogoName(e.target.files[0].name);
  };

  const reviewLink = `https://hii5.io/${slug}`;

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
  );

  return (
    <div className=" min-h-screen ">
      <header className="border-b">
        <div className="max-w-7xl mx-auto flex items-center justify-between space-x-2 text-sm  cursor-pointer px-4 sm:px-6 lg:px-8 py-5">
          <Link
            href="/"
            className="text-3xl text-pink-700 font-medium flex items-center gap-3"
          >
            <span>
              <FaHandPaper />
            </span>
            Hii5.io
          </Link>
          <button
            type="button"
            onClick={async () => {
              try {
                await supabase.auth.signOut();
                router.push('/login');
              } catch (err) {
                console.error('Logout error:', err);
              }
            }}
            className="relative inline-block rounded-full p-[3px] bg-gradient-to-r from-[rgba(255,0,150,0.8)] via-[rgba(128,0,255,0.8)] to-[rgba(0,200,255,0.8)]"
          >
            <span className="block bg-black text-white px-8 py-3 rounded-full font-semibold transition duration-200 flex items-center gap-3 cursor-pointer">
              <FiLogOut size={'20px'} />
              Logout
            </span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-5xl font-semibold">Dashboard</h2>
        <p className="mt-1  mb-8">
          Manage your review collection settings and view analytics
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 ">
          {/* LEFT COLUMN: Business Setup & Review Link */}
          <div className="lg:col-span-1 space-y-8 ">
            {/* Business Setup Card */}
            <form
              onSubmit={submitHandler}
              className="bg-gray-900 z-10 p-5 rounded-2xl"
            >
              <div className=" shadow rounded-lg p-6 space-y-6 ">
                <h2 className="text-lg font-medium ">Business Setup</h2>

                {/* Business Logo */}
                <div>
                  <label className="block text-sm font-medium ">
                    Business Logo
                  </label>
                  <div className="mt-1 flex items-center">
                    <label className="px-4 py-2 text-sm font-medium   border border-gray-300 rounded-md shadow-sm hover:bg-gray-900 cursor-pointer">
                      Choose File
                      <input
                        type="file"
                        className="hidden"
                        onChange={handleLogoChange}
                      />
                    </label>
                    <span className="ml-3 text-sm ">{logoName}</span>
                  </div>
                </div>

                {/* Business Name */}
                <div>
                  <label className="block text-sm font-medium ">
                    Business Name
                  </label>
                  <input
                    type="text"
                    value={businessName}
                    onChange={e => setBusinessName(e.target.value)}
                    placeholder="Enter your business name"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2.5 text-sm"
                  />
                </div>

                {/* Short URL Slug */}
                <div className="grid grid-cols-3 gap-4 items-end">
                  <div className="col-span-2">
                    <label className="block text-sm font-medium ">
                      Short URL Slug
                    </label>
                    <input
                      type="text"
                      value={slug}
                      readOnly
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2.5 text-sm pr-20"
                    />
                  </div>
                  <div className="col-span-1">
                    <button
                      onClick={handleRegenerateSlug}
                      className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium  hover:bg-gray-900"
                    >
                      Regenerate
                    </button>
                  </div>
                </div>

                {/* Google Reviews URL */}
                <div>
                  <label className="block text-sm font-medium ">
                    Google Reviews URL
                  </label>
                  <input
                    type="url"
                    name="googleURL"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2.5 text-sm"
                  />
                </div>

                {/* Yelp URL */}
                <div>
                  <label className="block text-sm font-medium ">Yelp URL</label>
                  <input
                    type="url"
                    name="yelpURL"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2.5 text-sm"
                  />
                </div>

                {/* Brand Color */}
                <div className="pt-2">
                  <label className="block text-sm font-medium ">
                    Brand Color
                  </label>
                  <div className="mt-1 flex items-center space-x-3">
                    {/* Color input palette */}
                    <input
                      type="color"
                      value={brandColor}
                      onChange={handleColorChange}
                      className="w-10 h-10 p-0 border-none cursor-pointer"
                    />

                    {/* Hex code input */}
                    <input
                      type="text"
                      value={brandColor}
                      onChange={e => setBrandColor(e.target.value)}
                      className="block w-32 border border-gray-300 rounded-md shadow-sm p-2.5 text-sm"
                    />
                  </div>
                </div>

                <button
                  style={{ backgroundColor: BRAND_COLOR }}
                  className="
    w-full py-3 mt-2 text-white font-medium rounded-lg transition 
    bg-[linear-gradient(135deg,rgba(255,0,80,0.9),rgba(255,70,200,0.9),rgba(70,120,255,0.9))]
    hover:bg-[linear-gradient(135deg,rgba(255,0,80,1),rgba(255,70,200,1),rgba(70,120,255,1))]
    shadow-[0_0_20px_rgba(255,70,200,0.4)]
  "
                >
                  Save Settings
                </button>
              </div>
            </form>
            {/* Your Review Link Card */}

            <div className="  shadow  space-y-4 bg-gray-900 z-10 p-5 rounded-2xl">
              <h2 className="text-lg font-medium ">Your Review Link</h2>

              <div className="flex justify-between items-center  border border-gray-200 rounded-md p-3">
                <span className="text-sm font-medium ">{reviewLink}</span>
                <button className=" hover:text-gray-600 p-1">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 7v4a1 1 0 001 1h5m-5 0h5m-5 0a1 1 0 01-1-1v-4m0 0a1 1 0 011-1h5m0 0a1 1 0 011 1v4m0 0a1 1 0 01-1 1h-5m-6 9v-3m0-3h6m-6 3h-2a2 2 0 01-2-2v-5a2 2 0 012-2h10a2 2 0 012 2v5a2 2 0 01-2 2h-2"
                    ></path>
                  </svg>
                </button>
              </div>

              {/* QR Code Placeholder */}
              <div className="flex justify-center py-4">
                <div className="p-4 border border-gray-300 rounded-md">
                  <svg
                    className="w-40 h-40"
                    viewBox="0 0 24 24"
                    fill={BRAND_COLOR}
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M4 4h7v7H4V4zm9 0h7v7h-7V4zm-9 9h7v7H4v-7zm9 3h3v-3h-3" />
                  </svg>
                </div>
              </div>

              <div className="flex justify-center">
                <button
                  className="
    w-full py-3 mt-2 text-white font-medium rounded-lg transition 
    bg-[linear-gradient(135deg,rgba(255,0,80,0.9),rgba(255,70,200,0.9),rgba(70,120,255,0.9))]
    hover:bg-[linear-gradient(135deg,rgba(255,0,80,1),rgba(255,70,200,1),rgba(70,120,255,1))]
    shadow-[0_0_20px_rgba(255,70,200,0.4)]
  "
                >
                  <span>Open Public Page</span>
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Analytics & Templates */}
          <div className="lg:col-span-1 space-y-8">
            {/* Analytics Section */}
            <div className=" shadow rounded-lg p-6 space-y-6">
              <h2 className="text-lg font-medium ">Analytics</h2>

              <div className="grid grid-cols-2 gap-4">
                <StatCard title="Total Submissions" value="0" />
                <StatCard
                  title="Avg Rating"
                  value="0.0"
                  subtitle="out of 5.0"
                />
                <StatCard
                  title="Positive Routes"
                  value="0"
                  subtitle="4-5 stars"
                />
                <StatCard
                  title="Private Feedbacks"
                  value="0"
                  subtitle="1-3 stars"
                />
              </div>

              {/* Last 7 Days Activity */}
              <div className="pt-4 bg-gray-900 z-10 p-5 rounded-2xl">
                <h3 className="text-sm font-medium  mb-2">
                  Last 7 Days Activity
                </h3>
                <div className="flex space-x-1.5 h-16 items-end">
                  {/* Bar placeholders (simulating data) */}
                  <div
                    className="flex-1 rounded-sm"
                    style={{ height: '35%', backgroundColor: BRAND_COLOR }}
                  ></div>
                  <div
                    className="flex-1 rounded-sm"
                    style={{ height: '60%', backgroundColor: BRAND_COLOR }}
                  ></div>
                  <div
                    className="flex-1 rounded-sm"
                    style={{ height: '85%', backgroundColor: BRAND_COLOR }}
                  ></div>
                  <div
                    className="flex-1 rounded-sm"
                    style={{ height: '60%', backgroundColor: BRAND_COLOR }}
                  ></div>
                  <div
                    className="flex-1 rounded-sm"
                    style={{ height: '100%', backgroundColor: BRAND_COLOR }}
                  ></div>
                  <div
                    className="flex-1 rounded-sm"
                    style={{ height: '50%', backgroundColor: BRAND_COLOR }}
                  ></div>
                  <div
                    className="flex-1 rounded-sm"
                    style={{ height: '90%', backgroundColor: BRAND_COLOR }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs  mt-1">
                  <span>7 days ago</span>
                  <span>Today</span>
                </div>
              </div>
            </div>

            {/* Example Templates Card */}
            <div className=" shadow bg-gray-900 z-10 p-5 rounded-2xl space-y-4">
              <h2 className="text-lg font-medium ">Example Templates</h2>

              <TemplateCard
                title="Email Template"
                content={`Hey [Name]! Thanks for choosing us. We'd love your feedback: ${reviewLink}`}
                link={reviewLink}
              />

              <TemplateCard
                title="SMS Template"
                content={`Hi [Name]! Share your experience: ${reviewLink}`}
                link={reviewLink}
              />
            </div>

            {/* Upgrade to Premium Card */}
            <div
              className=" shadow bg-gray-900 z-10 p-5 rounded-2xl text-center"
              style={{ borderTop: `4px solid ${BRAND_COLOR}` }}
            >
              <h3 className="text-sm font-medium ">Upgrade to Premium</h3>
              <p className="text-xs mt-1">
                Get advanced analytics, custom branding, and priority support.
              </p>
              <button
                style={{ color: BRAND_COLOR, borderColor: BRAND_COLOR }}
                className="mt-4 py-2 px-4 border text-sm font-medium rounded-md hover:bg-brand-color hover:text-white transition"
              >
                View Pricing
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer/Branding */}
      <footer className="fixed bottom-0 right-0 p-3 text-xs ">
        Built with ❤️ Lovable
      </footer>
    </div>
  );
};

export default DashboardPage;
