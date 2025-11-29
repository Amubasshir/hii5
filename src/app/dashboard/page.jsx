'use client';

import { useCurrentUser } from '@/contexts/CurrentUserContext';
import { createClient } from '@supabase/supabase-js';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import QRCode from 'react-qr-code';
import '../globals.css';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
);

const LogOutIcon = props => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
    <polyline points="16 17 21 12 16 7"></polyline>
    <line x1="21" y1="12" x2="9" y2="12"></line>
  </svg>
);

const CopyIcon = props => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
  </svg>
);

const StatCard = ({ title, value, subtitle }) => (
  <div className="bg-gray-800 p-5 rounded-2xl flex flex-col justify-between shadow-lg border border-gray-700">
    <span className="text-sm text-gray-400">{title}</span>
    <p className="text-3xl font-extrabold mt-2 text-white">{value}</p>
    {subtitle && <p className="text-xs mt-1 text-gray-500">{subtitle}</p>}
  </div>
);

const TemplateCard = ({ title, content, link, brandColor }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(`${content}\n${link}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="space-y-2">
      <h3 className="text-sm font-medium text-gray-300">{title}</h3>
      <div className="border border-gray-700 rounded-lg p-3 bg-gray-800 space-y-1 shadow-inner">
        <p className="text-sm text-gray-300">{content}</p>
        <p
          className="text-sm break-all font-mono"
          style={{ color: brandColor }}
        >
          {link}
        </p>
      </div>
      <button
        onClick={handleCopy}
        className="mt-1 flex items-center text-sm text-gray-400 hover:text-white transition duration-150"
      >
        <CopyIcon className="mr-1" />
        {copied ? 'Copied!' : 'Copy'}
      </button>
    </div>
  );
};

const UpgradeCard = () => (
  <div className="bg-gray-800 p-5 rounded-2xl space-y-4 border border-gray-700 shadow-xl mt-8">
    <h2 className="text-xl font-semibold text-white">Upgrade to Premium</h2>
    <p className="text-sm text-gray-400">
      Get advanced analytics, custom branding, and priority support. Unlock the
      full potential of Hii5.io.
    </p>
    <a
      href="/pricing"
      className="inline-block w-full text-center py-2.5 px-4 font-semibold rounded-lg text-black bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 transition duration-300 shadow-lg"
    >
      View Pricing
    </a>
  </div>
);

const DashboardPage = () => {
  const [businessName, setBusinessName] = useState('');
  const { userData } = useCurrentUser();
  const [businesses, setBusinesses] = useState(null);
  const [slug, setSlug] = useState('');
  const [logoName, setLogoName] = useState('No file chosen');
  const [logoUrl, setLogoUrl] = useState('');
  const [googleURL, setGoogleURL] = useState('');
  const [yelpURL, setYelpURL] = useState('');
  const [brandColor, setBrandColor] = useState('#FF007f');
  const [reviewLink, setReviewLink] = useState('');
  const [analytics, setAnalytics] = useState({
    positive: 0,
    private: 0,
    total: 0,
    avgRating: '0.0',
    last7Days: [0, 0, 0, 0, 0, 0, 0],
  });
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);

  const showMessage = (msg, error = false) => {
    setMessage(msg);
    setIsError(error);
    setTimeout(() => setMessage(''), 3000);
  };

  const generateSlug = (length = 6) => {
    const chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    return Array.from({ length })
      .map(() => chars[Math.floor(Math.random() * chars.length)])
      .join('');
  };

  const handleGenerateAnalytics = reviews => {
    if (!reviews || reviews.length === 0) {
      setAnalytics(prev => ({ ...prev, last7Days: [0, 0, 0, 0, 0, 0, 0] }));
      return;
    }

    const total = reviews.length;
    const positive = reviews.filter(r => r.rating >= 4).length;
    const privateCount = total - positive;
    const avgRating =
      total > 0
        ? (reviews.reduce((sum, r) => sum + r.rating, 0) / total).toFixed(1)
        : '0.0';

    const today = new Date();
    const last7Days = Array(7).fill(0);
    reviews.forEach(review => {
      const diffDays = Math.floor(
        (today - new Date(review.created_at)) / (1000 * 60 * 60 * 24)
      );
      if (diffDays >= 0 && diffDays < 7) last7Days[6 - diffDays] += 1;
    });

    setAnalytics({
      positive,
      private: privateCount,
      total,
      avgRating,
      last7Days,
    });
  };

  useEffect(() => {
    const s = generateSlug();
    setSlug(s);
    setReviewLink(`${window.location.origin}/review/${s}`);
  }, []);

  useEffect(() => {
    if (!userData?.id) return;

    const fetchBusiness = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('businesses')
        .select('*')
        .eq('created_by', userData.id)
        .single();

      setLoading(false);
      if (error) {
        // Not necessarily fatal — user may not have created a business yet.
        console.log('fetchBusiness error', error);
        return;
      }

      setBusinesses(data);
      setBusinessName(data.business_name || '');
      setSlug(data.slug || generateSlug());
      setLogoUrl(data.logo_url || '');
      setLogoName(data.logo_url ? 'Uploaded' : 'No file chosen');
      setBrandColor(data.brand_color || '#FF007F');
      setGoogleURL(data.google_url || '');
      setYelpURL(data.yelp_url || '');
      setReviewLink(`${window.location.origin}/review/${data.slug || slug}`);
    };

    fetchBusiness();
  }, [userData]);

  useEffect(() => {
    if (!businesses?.id) return;

    const fetchReviews = async () => {
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .eq('company_id', businesses.id)
        .order('id', { ascending: false });

      if (error) {
        console.log('fetchReviews error', error);
        return;
      }

      handleGenerateAnalytics(data);
    };

    fetchReviews();
  }, [businesses]);

  const handleLogoChange = async e => {
    if (!e.target.files.length) return;

    const file = e.target.files[0];

    if (!file.type.startsWith('image/')) {
      return showMessage('Please upload an image file only.', true);
    }

    const extension = file.name.split('.').pop();
    const finalSlug = slug || businesses?.slug || `business-${businesses?.id}`;

    const fileName = `${finalSlug}-logo.${extension}`;
    const filePath = fileName;

    // ---- Correct Upload ----
    const { error: uploadError } = await supabase.storage
      .from('assets')
      .upload(filePath, file, {
        upsert: true,
        cacheControl: '0', // force refresh (important)
      });

    if (uploadError) {
      console.error('UPLOAD ERROR:', uploadError);
      return showMessage('Upload failed — check storage policies.', true);
    }

    // ---- Correct Public URL + Cache Bust ----
    const { data: urlData } = supabase.storage
      .from('assets')
      .getPublicUrl(filePath);

    const publicUrl = `${urlData.publicUrl}?t=${Date.now()}`;

    setLogoUrl(publicUrl);
    setLogoName(file.name);

    // ---- Update business table ----
    await supabase
      .from('businesses')
      .update({ logo_url: publicUrl })
      .eq('id', businesses.id);

    // ---- Update Contact Info ----
    await supabase.from('reviews_contact_info').upsert(
      {
        company_id: businesses.id,
        slug: finalSlug,
        logo_url: publicUrl,
        email: userData?.email || null,
        google_url: googleURL || null,
      },
      { onConflict: 'company_id' }
    );

    showMessage('Logo updated!');
  };

  // const submitHandler = async e => {
  //   e.preventDefault();

  //   const formData = {
  //     business_name: businessName || 'Unnamed Business',
  //     slug,
  //     brand_color: brandColor || null,
  //     logo_url: logoUrl || null,
  //     google_url: googleURL || null,
  //     yelp_url: yelpURL || null,
  //     created_by: userData?.id,
  //   };

  //   let currentBusiness = businesses || null;
  //   let currentError = null;

  //   // UPDATE existing business
  //   if (currentBusiness && currentBusiness.id) {
  //     const { error } = await supabase
  //       .from('businesses')
  //       .update(formData)
  //       .eq('id', currentBusiness.id);

  //     currentError = error;
  //   }
  //   // INSERT new business
  //   else {
  //     const { data, error } = await supabase
  //       .from('businesses')
  //       .insert(formData)
  //       .select()
  //       .single();

  //     currentError = error;
  //     currentBusiness = data;
  //     if (data) setBusinesses(data); // update state immediately
  //   }

  //   if (currentError) {
  //     console.log('save business error', currentError);
  //     return showMessage('Failed to save settings', true);
  //   }

  //   const { data: contactInfoData, error: contactInfoError } = await supabase
  //     .from('reviews_contact_info')
  //     .upsert(
  //       {
  //         slug: formData.slug,
  //         company_id: currentBusiness.id,
  //         email: userData?.email,
  //         google_url: formData?.google_url,
  //       },
  //       { onConflict: 'company_id' }
  //     );

  //   if (contactErr) {
  //     console.log('reviews_contact_info upsert error', contactErr);
  //     return showMessage('Failed to save contact info', true);
  //   }

  //   setReviewLink(`${window.location.origin}/review/${formData.slug}`);
  //   showMessage('Settings saved successfully!');
  // };

  const submitHandler = async e => {
    e.preventDefault();

    if (!userData?.id) {
      console.error('User not loaded');
      return showMessage('User not logged in', true);
    }

    const formData = {
      business_name: businessName || 'Unnamed Business',
      slug,
      brand_color: brandColor || null,
      logo_url: logoUrl || null,
      google_url: googleURL || null,
      yelp_url: yelpURL || null,
      created_by: userData.id, // <-- NOW SAFE
    };

    let currentBusiness = businesses || null;

    if (currentBusiness?.id) {
      await supabase
        .from('businesses')
        .update(formData)
        .eq('id', currentBusiness.id);
    } else {
      const { data } = await supabase
        .from('businesses')
        .insert(formData)
        .select()
        .single();

      currentBusiness = data;
      if (data) setBusinesses(data);
    }

    await supabase.from('reviews_contact_info').upsert(
      {
        slug: formData.slug,
        company_id: currentBusiness.id,
        email: userData.email,
        google_url: formData.google_url,
      },
      { onConflict: 'company_id' }
    );

    showMessage('Settings saved successfully!');
  };

  const logoutHandler = async () => {
    await supabase.auth.signOut();
    window.location.href = '/login';
  };

  const maxReviews = Math.max(...analytics.last7Days, 1);
  const barHeightScale = 100 / maxReviews;

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans">
      {message && (
        <div
          className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-2xl ${
            isError ? 'bg-red-600' : 'bg-green-500'
          }`}
        >
          {message}
        </div>
      )}

      <header className="border-b border-gray-700 bg-gray-800 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-1">
          <Link href="/">
            <img src="/hii5logo.png" alt="Hii5 logo" className="w-[60px]" />
          </Link>
          <button
            onClick={logoutHandler}
            className="rounded-full p-2 bg-gradient-to-r from-pink-500 to-purple-500 flex items-center gap-3"
          >
            <LogOutIcon /> Logout
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT */}
        <div className="lg:col-span-2 space-y-8">
          <form
            onSubmit={submitHandler}
            className="bg-gray-800 p-6 rounded-2xl space-y-5 shadow-2xl border border-gray-700"
          >
            <h2 className="text-xl font-semibold text-white">Business Setup</h2>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Business Logo
              </label>
              <div className="flex items-center gap-4">
                <label
                  className="px-4 py-2 text-sm font-medium border border-pink-500 rounded-lg text-white cursor-pointer"
                  style={{ backgroundColor: brandColor }}
                >
                  Choose File
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleLogoChange}
                  />
                </label>
                <span className="text-sm text-gray-400">{logoName}</span>
              </div>
              {logoUrl && (
                <img
                  src={logoUrl}
                  className="w-20 h-20 mt-3 object-contain rounded-lg border border-gray-600 p-1 bg-white"
                  alt="Business logo"
                />
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300">
                Business Name
              </label>
              <input
                type="text"
                value={businessName}
                onChange={e => setBusinessName(e.target.value)}
                className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-lg p-3 text-sm text-white"
              />
            </div>

            <div className="flex gap-3 items-end">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-300">
                  Short URL Slug
                </label>
                <div className="flex mt-1">
                  <span className="inline-flex items-center px-3 text-sm text-gray-400 bg-gray-700 border border-r-0 border-gray-600 rounded-l-lg">
                    hii5.io/
                  </span>
                  <input
                    type="text"
                    value={slug}
                    readOnly
                    className="block w-full bg-gray-700 border border-gray-600 rounded-r-lg p-3 text-sm font-mono text-pink-400 cursor-not-allowed"
                  />
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  const s = generateSlug();
                  setSlug(s);
                  setReviewLink(`${window.location.origin}/review/${s}`);
                }}
                className="h-[47px] px-4 border border-gray-600 rounded-lg text-sm text-gray-300"
                style={{ backgroundColor: brandColor }}
              >
                Regenerate
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300">
                Google Reviews URL
              </label>
              <input
                type="url"
                value={googleURL}
                onChange={e => setGoogleURL(e.target.value)}
                placeholder="https://g.page/your-business/review"
                className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-lg p-3 text-sm text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300">
                Yelp URL
              </label>
              <input
                type="url"
                value={yelpURL}
                onChange={e => setYelpURL(e.target.value)}
                placeholder="https://yelp.com/biz/your-business"
                className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-lg p-3 text-sm text-white"
              />
            </div>

            <div className="flex items-center gap-3">
              <input
                type="color"
                value={brandColor}
                onChange={e => setBrandColor(e.target.value)}
                className="w-12 h-12 rounded-full cursor-pointer"
              />
              <input
                type="text"
                value={brandColor}
                onChange={e => setBrandColor(e.target.value)}
                className="w-32 bg-gray-700 border border-gray-600 rounded-lg p-3 text-sm text-white font-mono"
              />
            </div>

            <button
              type="submit"
              style={{ backgroundColor: brandColor }}
              className="w-full mt-4 py-3 text-white cursor-pointer font-bold rounded-lg hover:opacity-90 transition duration-200 shadow-lg"
            >
              Save Settings
            </button>
          </form>

          <div className="bg-gray-800 p-6 rounded-2xl space-y-5 shadow-2xl border border-gray-700">
            <h2 className="text-xl font-semibold text-white">
              Your Unique Review Link
            </h2>
            <div className="flex justify-between items-center bg-gray-700 rounded-lg p-3 border border-gray-600">
              <span className="text-sm font-medium break-all text-pink-400 font-mono">
                {reviewLink}
              </span>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(reviewLink);
                  showMessage('Link copied!');
                }}
                className="ml-4 p-2 text-gray-400 hover:text-white"
              >
                <CopyIcon />
              </button>
            </div>
            <div className="flex flex-col items-center py-4 space-y-4">
              <QRCode value={reviewLink} size={180} fgColor={brandColor} />
              <a
                href={`/public/${slug}`}
                className="text-sm font-medium text-gray-400 hover:text-white"
              >
                Open Public Page
              </a>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="lg:col-span-1 space-y-8">
          <div className="bg-gray-800 p-6 rounded-2xl space-y-5 shadow-2xl border border-gray-700">
            <h2 className="text-xl font-semibold text-white">
              Reviews Overview
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <StatCard title="Total Submissions" value={analytics.total} />
              <StatCard
                title="Avg Rating"
                value={analytics.avgRating}
                subtitle="out of 5.0"
              />
              <StatCard
                title="Positive Feedbacks"
                value={analytics.positive}
                subtitle="4-5 stars (Public)"
              />
              <StatCard
                title="Private Feedbacks"
                value={analytics.private}
                subtitle="1-3 stars (Email)"
              />
            </div>

            <div className="pt-4">
              <h3 className="text-sm font-medium text-gray-300 mb-2">
                Last 7 Days Activity
              </h3>
              <div className="flex h-24 items-end space-x-1 border-b border-gray-600 pb-1">
                {analytics.last7Days.map((count, index) => (
                  <div
                    key={index}
                    className="w-1/7 bg-pink-500 rounded-t-sm"
                    style={{ height: `${count * barHeightScale}%` }}
                    title={`${count} reviews`}
                  ></div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-gray-800 p-6 rounded-2xl space-y-6 shadow-2xl border border-gray-700">
            <h2 className="text-xl font-semibold text-white">
              Example Templates
            </h2>
            <TemplateCard
              title="Email Template"
              content="Hey [Name]! Thanks for choosing us. We'd love your feedback:"
              link={reviewLink}
              brandColor={brandColor}
            />
            <TemplateCard
              title="SMS Template"
              content="Hi [Name]! Share your experience:"
              link={reviewLink}
              brandColor={brandColor}
            />
          </div>

          <UpgradeCard />
        </div>
      </main>

      <footer className="fixed bottom-0 left-1/2 transform -translate-x-1/2 p-3 text-xs text-gray-500">
        Built with <span className="text-red-500">❤️</span> Lovable
      </footer>
    </div>
  );
};

export default DashboardPage;
