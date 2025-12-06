'use client';

import { useCurrentUser } from '@/contexts/CurrentUserContext';

import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';
import QRCode from 'react-qr-code';
import { createClient } from '../../../utlis/supabase/client';
import '../globals.css';
import PreviewPage from '@/components/PreviewPage';

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
  <div className="bg-gray-800 p-5 rounded-2xl flex flex-col justify-between shadow-lg border border-gray-700  ">
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
      className="relative inline-block rounded-full p-[3px] bg-pink-500 w-full text-center px-5 py-3"
    >
      View Pricing
    </a>
  </div>
);

const extractLrdFromGoogleUrl = url => {
  const match = url.match(/0x[a-fA-F0-9]+:0x[a-fA-F0-9]+/);
  return match ? match[0] : null;
};

const generateGoogleReviewDeepLink = googleUrl => {
  const lrd = extractLrdFromGoogleUrl(googleUrl);
  if (!lrd) return null;
  return `https://www.google.com/search?#lrd=${lrd},3,,,,`;
};

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
  const [openPreview, setOpenPreview] = useState(false);
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
  const qrRef = useRef(null);
  const [isDirty, setIsDirty] = useState(false);
  const [headline, setHeadline] = useState('');
  const [subtext, setSubtext] = useState('');
  // Inside your parent component function:

  const [selectedPlatform, setSelectedPlatform] = useState('google');
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
        .maybeSingle();

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

  const submitHandler = async e => {
    e.preventDefault();

    setIsDirty(false);

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
      headline: headline || null, // <-- add this
      subtext: subtext || null, // <-- add this
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
        .maybeSingle();

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

  const downloadQR = async () => {
    if (!qrRef.current) return;

    const svg = qrRef.current.querySelector('svg');
    const serializer = new XMLSerializer();
    const svgData = serializer.serializeToString(svg);

    const canvas = document.createElement('canvas');
    const size = 1000; // high resolution
    canvas.width = size;
    canvas.height = size;

    const ctx = canvas.getContext('2d');
    const img = new Image();

    const svgBlob = new Blob([svgData], {
      type: 'image/svg+xml;charset=utf-8',
    });
    const url = URL.createObjectURL(svgBlob);

    img.onload = () => {
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, size, size);
      ctx.drawImage(img, 0, 0, size, size);
      URL.revokeObjectURL(url);

      const jpgUrl = canvas.toDataURL('image/jpeg', 1.0);

      const link = document.createElement('a');
      link.href = jpgUrl;
      link.download = 'review-qr.jpg';
      link.click();
    };

    img.src = url;
  };

  const handleInputChange = setter => e => {
    setter(e.target.value);
    setIsDirty(true); // কোনো চেঞ্জ হলে true
  };

  
  // Preview Handler
  const handlePreviewClick = (e) => {
    e.preventDefault();
    setOpenPreview(true);
  };

  const ToggleSwitch = ({ label, isChecked, onToggle }) => (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-300 mb-2">
        Select review platform:
      </label>
      <div className="flex rounded-lg bg-gray-800 p-1 space-x-1 max-w-xs mx-auto">
        {/* Google অপশন */}
        <button
          onClick={() => setSelectedPlatform('google')}
          className={`
        w-1/2 py-2 text-sm font-medium rounded-lg transition-colors duration-200
        ${
          selectedPlatform === 'google'
            ? 'bg-pink-600 text-white shadow' // Google সিলেক্ট হলে Indigo রঙ
            : 'text-gray-400 hover:bg-gray-700 hover:text-white'
        }
      `}
        >
          Google
        </button>

        {/* Yelp অপশন */}
        <button
          onClick={() => setSelectedPlatform('yelp')}
          className={`
        w-1/2 py-2 text-sm font-medium rounded-lg transition-colors duration-200
        ${
          selectedPlatform === 'yelp'
            ? 'bg-yellow-600 text-white shadow' // Yelp সিলেক্ট হলে Yellow রঙ
            : 'text-gray-400 hover:bg-gray-700 hover:text-white'
        }
      `}
        >
          Yelp
        </button>
      </div>
    </div>
  );

  const handleActionWithDirtyCheck = action => {
    if (isDirty) {
      showMessage('You have unsaved changes. Please save first!', true);
      return;
    }
    action();
  };

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
            className="rounded-full px-4 py-2 bg-pink-500 flex items-center gap-3 cursor-pointer"
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

            {/* Business Logo */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Business Logo
              </label>
              <div className="flex items-center gap-4 justify-between">
                <label className="relative inline-block rounded-full p-[3px] bg-pink-500 text-center px-5 py-3 cursor-pointer">
                  Choose File
                  <input
                    type="file"
                    className="hidden cursor-pointer"
                    onChange={handleLogoChange}
                  />
                </label>
                {logoUrl && (
                  <img
                    src={logoUrl}
                    className="w-20 h-20 mt-3 object-contain rounded-lg border border-gray-600 p-1 bg-white"
                    alt="Business logo"
                  />
                )}
              </div>
            </div>

            {/* Business Name */}
            <div>
              <label className="block text-sm font-medium text-gray-300">
                Business Name
              </label>
              <input
                type="text"
                value={businessName}
                onChange={handleInputChange(setBusinessName)}
                className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-lg p-3 text-sm text-white"
              />
            </div>

            {/* Slug */}
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
                    onChange={(e) => {
                        let value = e.target.value;
                        value = value.replace(/\s+/g, "-");
                        value = value.replace(/[^a-zA-Z0-9-]/g, "");
                        setSlug(value);
                    }}
                    className="block w-full bg-gray-700 border border-gray-600 rounded-r-lg p-3 text-sm font-mono text-pink-400"
                    />

                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  const s = generateSlug();
                  setSlug(s);
                  setReviewLink(`${window.location.origin}/review/${s}`);
                  setIsDirty(true);
                }}
                className="relative inline-block rounded-full p-[3px] bg-pink-500 text-center px-5 py-3 cursor-pointer"
              >
                Regenerate
              </button>
            </div>

            {/* URLs */}

            <ToggleSwitch />
            <div className="space-y-4">
              {selectedPlatform === 'google' && (
                <div>
                  <label className="block text-sm font-medium text-gray-300">
                    Google Reviews URL
                  </label>
                  <input
                    type="url"
                    value={googleURL}
                    onChange={handleInputChange(setGoogleURL)}
                    placeholder="https://g.page/your-business/review"
                    className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-lg p-3 text-sm text-white"
                  />
                </div>
              )}

              {selectedPlatform === 'yelp' && (
                <div>
                  <label className="block text-sm font-medium text-gray-300">
                    Yelp URL
                  </label>
                  <input
                    type="url"
                    value={yelpURL}
                    onChange={handleInputChange(setYelpURL)}
                    placeholder="https://yelp.com/biz/your-business"
                    className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-lg p-3 text-sm text-white"
                  />
                </div>
              )}
            </div>

            {/* Brand Color */}
            <div className="flex items-center gap-5">
              <input
                type="color"
                value={brandColor}
                onChange={handleInputChange(setBrandColor)}
                className="w-13 h-13 rounded-2xl cursor-pointer"
              />
              <input
                type="text"
                value={brandColor}
                onChange={handleInputChange(setBrandColor)}
                className="w-32 bg-gray-700 border border-gray-600 rounded-lg p-3 text-sm text-white font-mono"
              />
            </div>

            {/* Save Button */}
            <div className="flex items-center gap-5">

            <button
              onClick={handlePreviewClick}
              className="relative inline-block rounded-full p-[3px] bg-pink-500 w-full text-center px-5 py-3 cursor-pointer"
            >
              Preview
            </button>
            <button
              type="submit"
              className="relative inline-block rounded-full p-[3px] bg-pink-500 w-full text-center px-5 py-3 cursor-pointer"
            >
              Save Settings
            </button>
            </div>
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
                onClick={() =>
                  handleActionWithDirtyCheck(() => {
                    navigator.clipboard.writeText(reviewLink);
                    showMessage('Link copied!');
                  })
                }
              >
                <CopyIcon />
              </button>
            </div>
            <div className="flex flex-col items-center py-4 space-y-4">
              <div ref={qrRef} className="bg-white p-4 rounded-lg">
                <QRCode value={reviewLink} size={180} />
              </div>

              <button
                onClick={() => handleActionWithDirtyCheck(downloadQR)}
                className="rounded-full px-4 py-2 bg-pink-500 flex items-center gap-3 cursor-pointer"
              >
                Download QR (JPG)
              </button>

              <a
                href={`/review/${slug}`}
                className="text-sm font-medium text-gray-400 hover:text-white "
                onClick={e => {
                  e.preventDefault();
                  handleActionWithDirtyCheck(() =>
                    window.open(reviewLink, '_blank')
                  );
                }}
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
                    className="flex-1 rounded-t-sm bg-pink-500"
                    style={{ height: `${count * barHeightScale}%` }}
                    title={`${count} reviews`}
                  ></div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-gray-800 p-6 rounded-2xl space-y-6 shadow-2xl border border-gray-700">
            <h2 className="text-xl font-semibold text-white ">
              Reviews Templates
            </h2>
            <div>
              <label className="block text-sm font-medium text-gray-300">
                Headline
              </label>
              <input
                type="text"
                onChange={e => {
                  setHeadline(e.target.value);
                  setIsDirty(true); // mark dirty if changed
                }}
                placeholder="Enter headline text"
                aria-label="Headline text"
                className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-lg p-3 text-sm text-white"
              />
            </div>

            {/* Subtext Input */}
            <div>
              <label className="block text-sm font-medium text-gray-300">
                Subtext
              </label>
              <input
                type="text"
                onChange={e => {
                  setSubtext(e.target.value);
                  setIsDirty(true);
                }}
                placeholder="Enter subtext"
                aria-label="Subtext"
                className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-lg p-3 text-sm text-white"
              />
            </div>

            <TemplateCard
              title="Email Template"
              content="Hey [Name]! Thanks for choosing us. We'd love your feedback:"
              link={reviewLink}
              brandColor="#F472D0"
            />
            <TemplateCard
              title="SMS Template"
              content="Hi [Name]! Share your experience:"
              link={reviewLink}
              brandColor="#F472D0"
            />
          </div>

          <UpgradeCard />
        </div>
        {openPreview && (
            <PreviewPage 
                modalOpen={openPreview}
                setModalOpen={() => setOpenPreview(false)}
                slug={slug}
logoName={logoName}
logoUrl={logoUrl}
googleURL={googleURL}
yelpURL={yelpURL}
brandColor={brandColor}
reviewLink={reviewLink}
openPreview={openPreview}
analytics={analytics}
             />
        )}
          {/* <PreviewModal
            onClose={() => setOpenPreview(false)}
            headline={headline}
            subtext={subtext}
          /> */}
      </main>
    </div>
  );
};

export default DashboardPage;
