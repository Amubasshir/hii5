'use client';

import { useCurrentUser } from '../../../contexts/CurrentUserContext';
import { createBrowserClient } from '@supabase/ssr';
import { Star } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
);

export default function ReviewPage() {
  const { userData } = useCurrentUser();
  const params = useParams();

  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [review, setReview] = useState('');
  const [fullName, setFullName] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [business, setBusiness] = useState(null);
  const [pageLoading, setPageLoading] = useState(true);

  // Fetch business
  useEffect(() => {
    if (!params?.slug) return;

    const fetchBusiness = async () => {
      const { data, error } = await supabase
        .from('businesses')
        .select('*')
        .eq('slug', params.slug)
        .maybeSingle();

      if (error || !data) {
        toast.error('Invalid business link');
        return;
      }

      setBusiness(data);
      setPageLoading(false);
    };

    fetchBusiness();
  }, [params?.slug]);

  // Save 1-3 stars feedback
  const handleSubmit = async () => {
    if (isLoading) return;
    if (rating === 0) return toast.error('Please select a rating');
    if (!fullName.trim()) return toast.error('Please enter your full name');
    if (!review.trim()) return toast.error('Please write your review');

    setIsLoading(true);

    try {
      const { error } = await supabase.from('reviews').insert([
        {
          rating,
          full_name: fullName.trim(),
          review_text: review.trim(),
          company_id: business.id,
          user_id: userData?.id || null,
          user_email: userData?.email || null,
        },
      ]);

      if (error) throw error;

      toast.success('Feedback submitted successfully!');
      setSubmitted(true);
      setTimeout(() => {
        setRating(0);
        setFullName('');
        setReview('');
        setSubmitted(false);
      }, 3000);
    } catch (err) {
      console.error(err);
      toast.error('Submission failed');
    } finally {
      setIsLoading(false);
    }
  };

  // Save 4-5 stars and redirect
  const handleHighRating = async () => {
    if (isLoading) return;

    setIsLoading(true);

    try {
      const { data, error } = await supabase
        .from('reviews')
        .insert([
          {
            rating,
            full_name: fullName.trim() || userData?.name || '',
            review_text: review.trim() || '',
            company_id: business.id,
            user_id: userData?.id || null,
            user_email: userData?.email || null,
          },
        ])
        .select()
        .maybeSingle();

        

      if (error) throw error;
      if (!data || data.length === 0) throw new Error('Insert failed');

    //   window.open(business?.google_url || business?.yelp_url, '_blank');
      window.open(business?.google_url || business?.yelp_url);

      toast.success('Rating saved successfully!');
      setSubmitted(true);

      setTimeout(() => {
        setRating(0);
        setFullName('');
        setReview('');
        setSubmitted(false);
      }, 3000);
    } catch (err) {
      console.error('High rating save error:', err);
      toast.error('Failed to save rating');
    } finally {
      setIsLoading(false);
    }
  };

//   if (pageLoading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         Loading...
//       </div>
//     );
//   }

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ backgroundColor: business?.brand_color || '#f0f0f0' }}
    >
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Cover */}
        <div className="relative group">
          <img
            src={
              business?.cover_image ||
              'https://i.ibb.co.com/rGQ1X7d9/Whats-App-Image-2025-07-14-at-20-27-35-c0c5cbfc.jpg'
            }
            alt="Cover"
            className="w-full h-52 object-cover rounded-md"
          />

          {/* Hover text */}
          <div className="absolute top-2 left-2 bg-black/60 px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <span className="text-xs text-white">
              Recommended image size: 400 × 800 px.
            </span>
          </div>
        </div>

        {/* Logo */}
        <div className="-mt-12 flex justify-center">
          <img
            src={business?.logo_url || '/placeholder-logo.png'}
            alt={business?.business_name}
            className="w-24 h-24 rounded-full bg-white border-4 border-white object-contain z-30"
            style={{ borderColor: business?.brand_color || '#f0f0f0' }}
          />
        </div>

        <div className="px-6 pb-8 pt-4 text-center">
          <h1
            className="text-xl font-semibold"
            style={{ color: business?.brand_color || '#f0f0f0' }}
          >
            {business?.headline || 'Leave a review'}
          </h1>
          <p className="text-sm mt-1 text-gray-500">
            {business?.subtext || 'Your feedback helps us grow'}
          </p>

          {/* Star Rating */}
          <div className="flex justify-center mt-5 gap-2">
            {[1, 2, 3, 4, 5].map(star => (
              <button
                key={star}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
              >
                <Star
                  size={34}
                  className={
                    (hoverRating || rating) >= star
                      ? ''
                      : 'fill-gray-300 stroke-gray-300'
                  }
                  style={
                    (hoverRating || rating) >= star
                      ? { color: business?.brand_color || '#ffae00' }
                      : {}
                  }
                />
                {/* <Star
                  size={34}
                  className={
                    (hoverRating || rating) >= star
                      ? 'fill-yellow-400 stroke-yellow-400'
                      : 'fill-gray-300 stroke-gray-300'
                  }
                /> */}
              </button>
            ))}
          </div>

          {/* 1–3 Stars Form */}
          {rating > 0 && rating <= 3 && !submitted && (
            <div className="mt-6 space-y-4 text-left">
              <input
                value={fullName}
                onChange={e => setFullName(e.target.value)}
                placeholder="Your full name"
                className="w-full border rounded-lg px-3 py-2 text-sm"
                disabled={isLoading}
              />
              <textarea
                value={review}
                onChange={e => setReview(e.target.value)}
                placeholder="Write your feedback..."
                rows={4}
                className="w-full border rounded-lg px-3 py-2 text-sm"
                disabled={isLoading}
              />
              <button
                onClick={handleSubmit}
                disabled={isLoading}
                className="w-full py-3 rounded-lg text-white font-medium"
                style={{ backgroundColor: business?.brand_color }}
              >
                {isLoading ? 'Submitting...' : 'Submit Feedback'}
              </button>
            </div>
          )}

          {/* 4–5 Stars Button */}
          {rating >= 4 && !submitted && (
            <div className="mt-6">
              <button
                onClick={handleHighRating}
                disabled={isLoading}
                className="w-full py-3 rounded-lg font-medium text-white"
                style={{ backgroundColor: business?.brand_color }}
              >
                {isLoading
                  ? 'Redirecting...'
                  : `Continue to ${business?.review_platform || 'Google'}`}
              </button>
            </div>
          )}

          {/* Success Message */}
          {submitted && (
            <div className="py-10">
              <h2 className="text-lg font-semibold text-center">
                Feedback received. Thank you!
              </h2>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
