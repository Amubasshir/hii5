// "use client"

// import { useState } from 'react';
// import { Star } from 'lucide-react';

// export default function ReviewPage() {
//   const [rating, setRating] = useState(0);
//   const [hoverRating, setHoverRating] = useState(0);
//   const [review, setReview] = useState('');
//   const [submitted, setSubmitted] = useState(false);

//   const handleSubmit = () => {
//     if (rating === 0) {
//       alert('Please select a rating');
//       return;
//     }
//     if (review.trim() === '') {
//       alert('Please write a review');
//       return;
//     }
    
//     console.log({ rating, review });
//     setSubmitted(true);
    
//     setTimeout(() => {
//       setRating(0);
//       setReview('');
//       setSubmitted(false);
//     }, 2000);
//   };

//   return (
//     <div className="min-h-screen bg-[#0B0A13] flex items-center justify-center p-4">
//       <div className="w-full max-w-md">
//         {/* Card */}
//         <div className="bg-white rounded-2xl shadow-lg p-8 md:p-10">
//           {submitted ? (
//             <div className="flex flex-col items-center justify-center py-8">
//               <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
//                 <svg
//                   className="w-8 h-8 text-green-600"
//                   fill="currentColor"
//                   viewBox="0 0 20 20"
//                 >
//                   <path
//                     fillRule="evenodd"
//                     d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
//                     clipRule="evenodd"
//                   />
//                 </svg>
//               </div>
//               <h2 className="text-2xl font-bold text-slate-900 text-center">
//                 Thank You!
//               </h2>
//               <p className="text-slate-600 text-center mt-2">
//                 Your review has been submitted successfully.
//               </p>
//             </div>
//           ) : (
//             <>
//               {/* Header */}
//               <div className="text-center mb-8">
//                 <h1 className="text-3xl font-bold text-slate-900 mb-2">
//                   Leave us a review
//                 </h1>
//                 <p className="text-slate-500 text-sm">
//                   Share your experience with us
//                 </p>
//               </div>

//               <div className="space-y-6">
//                 {/* Star Rating */}
//                 <div className="flex flex-col items-center space-y-3">
//                   <label className="text-sm font-semibold text-slate-700">
//                     Rating
//                   </label>
//                   <div className="flex gap-2">
//                     {[1, 2, 3, 4, 5].map((star) => (
//                       <button
//                         key={star}
//                         onClick={() => setRating(star)}
//                         onMouseEnter={() => setHoverRating(star)}
//                         onMouseLeave={() => setHoverRating(0)}
//                         className="transition-transform duration-200 hover:scale-110 cursor-pointer"
//                       >
//                         <Star
//                           size={32}
//                           className={`transition-all duration-200 ${
//                             (hoverRating || rating) >= star
//                               ? 'fill-amber-400 stroke-amber-400'
//                               : 'fill-slate-200 stroke-slate-300'
//                           }`}
//                         />
//                       </button>
//                     ))}
//                   </div>
//                   {rating > 0 && (
//                     <p className="text-xs text-slate-500">
//                       {rating === 1 && 'Poor'}
//                       {rating === 2 && 'Fair'}
//                       {rating === 3 && 'Good'}
//                       {rating === 4 && 'Very Good'}
//                       {rating === 5 && 'Excellent'}
//                     </p>
//                   )}
//                 </div>

//                 {/* Review Textarea */}
//                 <div className="space-y-2">
//                   <label htmlFor="review" className="text-sm font-semibold text-slate-700">
//                     Your Review
//                   </label>
//                   <textarea
//                     id="review"
//                     value={review}
//                     onChange={(e) => setReview(e.target.value)}
//                     placeholder="Tell us about your experience..."
//                     className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-slate-900 placeholder-slate-400 transition-all"
//                     rows="5"
//                   />
//                   <p className="text-xs text-slate-500">
//                     {review.length} / 1000 characters
//                   </p>
//                 </div>

//                 {/* Submit Button */}
//                 <button
//                   onClick={handleSubmit}
//                   className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
//                 >
//                   Submit Review
//                 </button>
//               </div>
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }





"use client"

import { useCurrentUser } from '@/contexts/CurrentUserContext';
import { createBrowserClient } from '@supabase/ssr';
import { Star } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';

const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
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
//   const [contactInfo, setContactInfo] = useState(null);

//   useEffect(() => {
//     const fetchInfo = async () => {
//         const { data, error } = await supabase
//         .from('reviews_contact_info')
//         .select('slug, email, google_url')
//         .eq('slug', params.slug)
//         .single();

//         if(error) {
//             console.error('Error fetching contact info:', error);
//             return;
//         }

//         setContactInfo(data);
        
//     }

//     if(params.slug) {
//         fetchInfo();
//     }
//   }, [params.slug])

  const handleSubmit = async () => {
    if (rating === 0) {
      alert('Please select a rating');
      return;
    }
    if (review.trim() === '') {
      alert('Please write a review');
      return;
    }
    if (!params?.slug) {
      alert('Please provide a company ID');
      return;
    }

    setIsLoading(true);

    try {
        const { data, error } = await supabase.functions.invoke('submit-review', {
        body: JSON.stringify({
          rating: rating,
          review_text: review.trim(),
          slug: params.slug || null,
        }),
        })

        if(data?.data?.public_link) {
            console.log('Review submitted successfully:', data);
            // redirect to new page link with _blank page
            window.open(data?.data?.public_link, '_blank');

            // router.push('/thank-you');
        }

        toast.success(data?.message)
        
      // Call the Edge Function
    //   const response = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/submit-review`, {
    //     method: 'POST',
    //     headers: {
    //       'Authorization': `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //       rating: rating,
    //       review_text: review.trim(),
    //       user_id: userData?.id || null,
    //       company_id: myQueryParam || null,
    //     }),
    //   });

    //   const result = await response.json();

    //   if (!response.ok) {
      if (error) {
        throw new Error(error || 'Failed to submit review');
      }

    //   console.log('Review submitted successfully:', result);
    //   setMessage(result.message);
      setMessage(data.message);
      setSubmitted(true);
      
      // Reset form after successful submission
      setTimeout(() => {
        setRating(0);
        setReview('');
        setSubmitted(false);
        setMessage('');
      }, 3000);

    } catch (error) {
      console.error('Error submitting review:', error);
      alert(error.message || 'Failed to submit review. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0A13] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-10">
          {submitted ? (
            <div className="flex flex-col items-center justify-center py-8">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${
                rating < 4 ? 'bg-orange-100' : 'bg-green-100'
              }`}>
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
              <p className="text-slate-600 text-center mt-2">
                {message}
              </p>
            </div>
          ) : (
            <>
              {/* Header */}
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-slate-900 mb-2">
                  Leave us a review
                </h1>
                <p className="text-slate-500 text-sm">
                  Share your experience with us
                </p>
              </div>

              <div className="space-y-6">
                {/* Star Rating */}
                <div className="flex flex-col items-center space-y-3">
                  <label className="text-sm font-semibold text-slate-700">
                    Rating
                  </label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="transition-transform duration-200 hover:scale-110 cursor-pointer"
                        disabled={isLoading}
                      >
                        <Star
                          size={32}
                          className={`transition-all duration-200 ${
                            (hoverRating || rating) >= star
                              ? 'fill-amber-400 stroke-amber-400'
                              : 'fill-slate-200 stroke-slate-300'
                          } ${isLoading ? 'opacity-50' : ''}`}
                        />
                      </button>
                    ))}
                  </div>
                  {rating > 0 && (
                    <p className="text-xs text-slate-500">
                      {rating === 1 && 'Poor'}
                      {rating === 2 && 'Fair'}
                      {rating === 3 && 'Good'}
                      {rating === 4 && 'Very Good'}
                      {rating === 5 && 'Excellent'}
                    </p>
                  )}
                </div>

                {/* Review Textarea */}
                <div className="space-y-2">
                  <label htmlFor="review" className="text-sm font-semibold text-slate-700">
                    Your Review
                  </label>
                  <textarea
                    id="review"
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    placeholder="Tell us about your experience..."
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-slate-900 placeholder-slate-400 transition-all"
                    rows="5"
                    disabled={isLoading}
                    maxLength={1000}
                  />
                  <p className="text-xs text-slate-500">
                    {review.length} / 1000 characters
                  </p>
                </div>

                {/* Submit Button */}
                <button
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className={`w-full font-semibold py-3 px-4 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg ${
                    isLoading 
                      ? 'bg-blue-400 cursor-not-allowed' 
                      : 'bg-blue-600 hover:bg-blue-700'
                  } text-white`}
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