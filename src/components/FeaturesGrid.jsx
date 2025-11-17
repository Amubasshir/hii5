'use client';

import React from 'react';
import { motion } from 'framer-motion';

// --- Framer Motion Variants ---

// Container for staggered children animation
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // Delay between each card
    },
  },
};

// Variants for each individual card/item
const itemVariants = {
  hidden: { y: 30, opacity: 0, scale: 0.95 },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

// Variants for the main text header
const headerVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      delay: 0.2,
    },
  },
};

// --- Feature Data ---

const features = [
  {
    title: 'Real-time trading',
    img: 'https://cdn.prod.website-files.com/61113c4e9f23df1e7f554117/611178039a18b79f1c9a8f70_icon-1-features-dark-template.svg',
  },
  {
    title: 'Advanced charts',
    img: 'https://cdn.prod.website-files.com/61113c4e9f23df1e7f554117/611178037cca1739cdfcf09f_icon-2-features-dark-template.svg',
  },
  {
    title: 'Enterprise grade security',
    img: 'https://cdn.prod.website-files.com/61113c4e9f23df1e7f554117/61117803277daebac80a1e21_icon-3-features-dark-template.svg',
  },
  {
    title: 'ETFs and stocks',
    img: 'https://cdn.prod.website-files.com/61113c4e9f23df1e7f554117/61117804e14e608f9b945127_icon-4-features-dark-template.svg',
  },
  {
    title: 'Currencies & commodities',
    img: 'https://cdn.prod.website-files.com/61113c4e9f23df1e7f554117/61117804777efc486462daa0_icon-5-features-dark-template.svg',
  },
  {
    title: 'Cryptocurrencies',
    img: 'https://cdn.prod.website-files.com/61113c4e9f23df1e7f554117/61117803277dae245c0a1e20_icon-6-features-dark-template.svg',
  },
];

// --- Feature Card Component ---

const FeatureCard = ({ title, img, description }) => (
  <motion.div
    className="bg-[#1d1a27] p-10 rounded-xl border  border-gray-700/50 hover:border-pink-500 transition duration-300 flex flex-col space-y-3 items-start z-10"
    variants={itemVariants}
    whileHover={{ translateY: -5 }} // Subtle lift on hover
  >
    {/* Icon (White/Light Gray) */}
    <div className="w-20 h-20 p-2 bg-gray-700/50 rounded-lg flex items-center text-start justify-start">
      <img src={img} alt="" />
    </div>

    {/* Title */}
    <h3 className="md:text-3xl font-bold text-white pt-2 flex items-center justify-start">
      {title}
    </h3>

    {/* Description */}
    <p className="text-lg md:text-xl text-text-dark flex items-center justify-start text-start ">
      {description}
    </p>
  </motion.div>
);

// --- Main Component ---

const FeaturesGrid = () => {
  // Replicate the dummy text from the image for consistency
  const description =
    'Lorem ipsum dolor sit amet consectetur adipiscing elit blandit id';

  return (
    <section className="relative overflow-hidden  text-white py-24 px-4 ">
      {/* Gradient Blobs */}
      <div className="neon-orb" style={{ right: '40%', bottom: '30%' }}></div>

      <div className="max-w-7xl mx-auto text-center">
        {/* Header Text */}
        <motion.div
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-extrabold text-white mb-4">
            Packed with cutting-edge features
          </h2>
          <p className="text-lg text-text-dark max-w-2xl mx-auto mb-16">
            Lorem ipsum dolor sit amet consectetur adipiscing elit blandit id
            dolor venenatis auctor maecenas egestas arcu ut consectetur.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 "
          variants={containerVariants}
          initial="hidden"
          whileInView="visible" // Start animation when the element enters the viewport
          viewport={{ once: true, amount: 0.4 }} // Ensures it runs once when 40% visible
        >
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              title={feature.title}
              img={feature.img}
              description={description}
            />
          ))}
        </motion.div>

        {/* CTA Buttons - Matching the image below the grid */}
        <div className="flex flex-col md:flex-row justify-center gap-4 mt-16">
          <a
            href=""
            className="relative inline-block rounded-full p-[3px] bg-gradient-to-r from-[rgba(255,0,150,0.8)] via-[rgba(128,0,255,0.8)] to-[rgba(0,200,255,0.8)]"
          >
            <span className="block bg-black text-white px-12 py-3 rounded-full font-semibold transition duration-200 ">
              Get started
            </span>
          </a>
          <a
            href="#"
            className="py-3.5 px-8 rounded-full font-semibold text-base text-white bg-secondary-btn border-2 border-secondary-btn transition duration-300 hover:bg-[#3b2f50] hover:border-[#3b2f50] text-center"
          >
            Browse features
          </a>
        </div>
      </div>
    </section>
  );
};

export default FeaturesGrid;
