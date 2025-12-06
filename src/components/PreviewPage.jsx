"use client";

import { Star } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Modal from "./Modal";


export default function PreviewPage({modalOpen, 
    setModalOpen,
    slug,
logoName,
logoUrl,
googleURL,
yelpURL,
brandColor,
reviewLink,
openPreview,
analytics,
headline = "Leave a review",
subtext = "Your feedback helps us grow",
}) {
  const params = useParams();

  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [review, setReview] = useState("");
  const [fullName, setFullName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [business, setBusiness] = useState(null);
//   const [modalOpen, setModalOpen] = useState(true);


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

console.log({
    slug,
logoName,
logoUrl,
googleURL,
yelpURL,
brandColor,
reviewLink,
openPreview,
analytics,
})
  return (
    <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} brandColor={brandColor}>
      {/* Background */}
      <div
        className="min-h-full p-4"
        style={{ background: brandColor }}
      >
        <div className={`w-full bg-white max-w-xl mx-auto bg-[${brandColor}] rounded-2xl shadow-lg overflow-hidden`}>
          {/* Cover Image */}
          <div className="relative">
            <img
              src={
                business?.cover_image ||
                "https://i.ibb.co.com/rGQ1X7d9/Whats-App-Image-2025-07-14-at-20-27-35-c0c5cbfc.jpg"
              }
              alt="Cover"
              className="w-full h-52 object-cover"
            />
          </div>

          {/* Logo */}
          <div className="-mt-12 flex justify-center relative">
            <img
              src={logoUrl || "/placeholder-logo.png"}
              className="w-24 h-24 rounded-full bg-white border-4 object-contain"
              style={{
                borderColor: brandColor || "#f0f0f0",
              }}
            />
          </div>

          {/* Content */}
          <div className="px-6 pb-8 pt-4 text-center">
            <h1
              className="text-xl font-semibold"
              style={{ color: brandColor }}
            >
              {headline || "Leave a review"}
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              {subtext || "Your feedback helps us grow"}
            </p>

            {/* Stars */}
            <div className="flex justify-center mt-5 gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
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
                        ? ""
                        : `text-gray-300 stroke-gray-300`
                    }
                    style={
                      (hoverRating || rating) >= star
                        ? { color: brandColor }
                        : {}
                    }
                  />
                </button>
              ))}
            </div>

            {/* 1–3 stars form */}
            {rating > 0 && rating <= 3 && !submitted && (
              <div className="mt-6 space-y-4 text-left">
                <input
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Your full name"
                  className="w-full border rounded-lg px-3 py-2 text-sm"
                />
                <textarea
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  placeholder="Write your feedback..."
                  rows={4}
                  className="w-full border rounded-lg px-3 py-2 text-sm"
                />

                <button
                  onClick={handleSubmit}
                  className="w-full py-3 rounded-lg text-white font-medium"
                  style={{ backgroundColor: business?.brandColor }}
                  disabled={isLoading}
                >
                  {isLoading ? "Submitting..." : "Submit Feedback"}
                </button>
              </div>
            )}

            {/* 4–5 stars */}
            {rating >= 4 && !submitted && (
              <button
                onClick={handleHighRating}
                className="w-full mt-6 py-3 rounded-lg text-white font-medium"
                style={{ backgroundColor: brandColor }}
                disabled={isLoading}
              >
                {isLoading
                  ? "Redirecting..."
                  : `Continue to ${business?.review_platform || "Google"}`}
              </button>
            )}

            {/* Success */}
            {submitted && (
              <div className="py-10">
                <h2 className="text-lg font-semibold text-center">
                  Thank you for your feedback! 🎉
                </h2>
              </div>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
}
