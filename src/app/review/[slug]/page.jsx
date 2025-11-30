'use client';

import { useCurrentUser } from '../../../contexts/CurrentUserContext';
import { createBrowserClient } from '@supabase/ssr';
import { Star } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';

const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
);

export default function ReviewPage() {
  const { userData, loading, error, refresh } = useCurrentUser();
  const params = useParams();
  const router = useRouter();

  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [review, setReview] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [fullName, setFullName] = useState('');

  const handleSubmit = async () => {
    if (isLoading) return;

    if (rating === 0) {
      toast.error('Please select a rating');
      return;
    }

    if (fullName.trim() === '') {
      toast.error('Please enter your full name');
      return;
    }

    if (review.trim() === '') {
      toast.error('Please write a review');
      return;
    }

    if (!params?.slug) {
      toast.error('Invalid company link');
      return;
    }

    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('submit-review', {
        body: {
          rating,
          review_text: review.trim(),
          full_name: fullName.trim(),
          slug: params.slug,
        },
      });

      if (error) {
        throw error;
      }

      const successMessage = data?.message || 'Review submitted successfully';

      toast.success(successMessage);
      setMessage(successMessage);
      setSubmitted(true);

      if (data?.data?.public_link) {
        window.open(data.data.public_link, '_blank');
      }

      setTimeout(() => {
        setRating(0);
        setReview('');
        setFullName('');
        setSubmitted(false);
        setMessage('');
      }, 3000);
    } catch (err) {
      console.error('Submit Error:', err);
      toast.error(err?.message || 'Failed to submit review');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-10">
          {submitted ? (
            <div className="flex flex-col items-center justify-center py-8">
              <div
                className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${
                  rating < 4 ? 'bg-orange-100' : 'bg-green-100'
                }`}
              >
                {rating < 4 ? (
                  <svg
                    className="w-8 h-8 text-orange-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-8 h-8 text-green-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </div>

              <h2 className="text-2xl font-bold text-slate-900 text-center">
                {rating < 4 ? 'Feedback Received' : 'Thank You!'}
              </h2>
              <p className="text-slate-600 text-center mt-2">{message}</p>
            </div>
          ) : (
            <>
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-slate-900 mb-2">
                  Leave us a review
                </h1>
                <p className="text-slate-500 text-sm">
                  Share your experience with us
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex flex-col items-center space-y-3">
                  <label className="text-sm font-semibold text-slate-700">
                    Rating
                  </label>

                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map(star => (
                      <button
                        key={star}
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        disabled={isLoading}
                      >
                        <Star
                          size={32}
                          className={
                            (hoverRating || rating) >= star
                              ? 'fill-amber-400 stroke-amber-400'
                              : 'fill-slate-200 stroke-slate-300'
                          }
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-semibold text-slate-700">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={e => setFullName(e.target.value)}
                    className="w-full mt-1 p-3 rounded-lg outline-none border border-gray-700"
                    disabled={isLoading}
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-slate-700">
                    Your Review
                  </label>
                  <textarea
                    value={review}
                    onChange={e => setReview(e.target.value)}
                    className="w-full px-4 py-3 border rounded-lg"
                    rows="5"
                    disabled={isLoading}
                  />
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg "
                >
                  {isLoading ? 'Submitting...' : 'Submit Review'}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
