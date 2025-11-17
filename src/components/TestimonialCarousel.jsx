'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ---------------- Animation Variants ----------------
const slideVariants = {
  enter: direction => ({
    x: direction > 0 ? 150 : -150,
    opacity: 0,
    scale: 0.97,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      x: { type: 'spring', stiffness: 120, damping: 18 },
      opacity: { duration: 0.3 },
    },
  },
  exit: direction => ({
    x: direction < 0 ? 150 : -150,
    opacity: 0,
    scale: 0.97,
    transition: { duration: 0.25 },
  }),
};

// ---------------- Testimonial Data ----------------
const testimonials = [
  {
    id: 1,
    quote: 'A truly next-gen trading app.',
    description:
      'The speed and reliability are unmatched. My trades execute flawlessly every time.',
    author: 'Matt Cannon',
    title: 'VP of Marketing at Facebook',
    image:
      'https://cdn.prod.website-files.com/61113c4e9f23df1e7f554117/6111a0ae2e06952cb2871a80_image-1-testimonial-dark-template.jpg',
  },
  {
    id: 2,
    quote: 'This platform transformed my investment strategy.',
    description:
      'The features are robust and user-friendly. Highly recommended for serious investors.',
    author: 'Jane Doe',
    title: 'Senior Financial Analyst',
    image:
      'https://cdn.prod.website-files.com/61113c4e9f23df1e7f554117/6111a0aee31b8734f48e2497_image-2-testimonial-dark-template.jpg',
  },
];

// ---------------- Main Component ----------------
export default function TestimonialCarousel() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const nextSlide = () => {
    setDirection(1);
    setIndex(prev => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setDirection(-1);
    setIndex(prev => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const current = testimonials[index];

  return (
    <section className="w-full bg-[#0B0A13] text-white py-20 px-6 flex flex-col items-center justify-center">
      {/* --- Section Header --- */}
      <div className="text-center mb-30 md:mb-16 max-w-2xl">
        <h2 className="text-4xl font-bold text-white mb-4">
          What our clients say
        </h2>
        <p className="text-gray-400 text-lg">
          Lorem ipsum dolor sit amet consectetur adipiscing elit blandit id
          dolor venenatis auctor maecenas egestas arcu ut consectetur.
        </p>
      </div>

      <div className="relative max-w-5xl w-full min-h-[380px]">
        {/* Prev Button */}
        <button
          onClick={prevSlide}
          className="absolute left-0 lg:-left-30 top-1/2 -translate-y-1/2 p-3 rounded-full bg-[#1E1B2F] hover:bg-gray-700 border border-gray-700/40 z-20"
        >
          <svg className="w-6 h-6" fill="none" stroke="white" strokeWidth="2">
            <path d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Slider */}
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={index}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            custom={direction}
            className="absolute inset-0 bg-[#13121A] rounded-2xl p-8 md:p-10 border border-white/10 shadow-[0_0_60px_-20px_rgba(145,70,255,0.35)] flex flex-col-reverse md:flex-row items-center gap-10"
          >
            {/* Left Text */}
            <div className="flex-1 text-center md:text-left">
              <p className="text-2xl md:text-3xl font-semibold mb-4">
                “{current.quote}”
              </p>
              <p className="text-gray-300 text-base md:text-lg mb-6">
                {current.description}
              </p>
              <div className="space-y-1">
                <p className="text-lg font-bold">{current.author}</p>
                <p className="text-gray-400">{current.title}</p>
              </div>
            </div>

            {/* Right Image */}
            <div className="flex-shrink-0 relative">
              <div className="w-48 h-48 sm:w-60 sm:h-60 rounded-full overflow-hidden bg-black">
                <img
                  src={current.image}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute inset-0 blur-[80px] bg-purple-600/40 -z-10"></div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Next Button */}
        <button
          onClick={nextSlide}
          className="absolute right-0 lg:-right-30 top-1/2 -translate-y-1/2 p-3 rounded-full bg-[#1E1B2F] hover:bg-gray-700 border border-gray-700/40 z-20"
        >
          <svg className="w-6 h-6" fill="none" stroke="white" strokeWidth="2">
            <path d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </section>
  );
}
