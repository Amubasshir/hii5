'use client';

import React from 'react';
import { motion } from 'framer-motion';

// --- Framer Motion Variants ---

// For the main header text (Sticky side)
const headerVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, delay: 0.2 },
  },
};

// Variants for the Step Cards (Scrollable side)
const stepVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

// Placeholder Step Data (from the image)
const steps = [
  {
    id: 1,
    title: 'Create your account',
    desc: 'Lorem ipsum dolor sit amet, consec adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore elit.',
    // Placeholder for illustration component/image path
    illustration:
      'https://cdn.prod.website-files.com/61113c4e9f23df1e7f554117/61118b2e2fb8ecd99fce500c_image-1-home-steps-dark-template-p-500.jpeg',
  },
  {
    id: 2,
    title: 'Customize your profile',
    desc: 'Lorem ipsum dolor sit amet, consec adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore elit.',
    illustration:
      'https://cdn.prod.website-files.com/61113c4e9f23df1e7f554117/61118b2f246ebe2569f937fe_image-2-home-steps-dark-template-p-500.jpeg',
  },
  {
    id: 3,
    title: 'Start earning money',
    desc: 'Lorem ipsum dolor sit amet, consec adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore elit.',
    illustration:
      'https://cdn.prod.website-files.com/61113c4e9f23df1e7f554117/61118b2f5da99f20aff1dc6d_image-3-home-steps-dark-template.jpg',
  },
];

// --- Step Card Component ---

const StepCard = ({ id, title, desc, illustration, delay }) => (
  <motion.div
    className="bg-[#1d1a27] rounded-2xl flex flex-col-reverse sm:flex-row items-center gap-4 sm:gap-8 w-full"
    variants={stepVariants}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.3 }}
    transition={{ delay: delay }}
  >
    {/* Text Content */}
    <div className="flex-1 text-left px-6 sm:px-8 lg:px-12 py-6 sm:py-8">
      <div className="bg-[#5e5b71] h-12 w-12 flex justify-center items-center rounded-xl text-white font-semibold mb-4 text-lg sm:text-xl lg:text-2xl">
        {id}
      </div>
      <h3 className="text-2xl sm:text-3xl lg:text-3xl font-semibold text-white mb-2">
        {title}
      </h3>
      <p className="text-base sm:text-lg text-gray-300 max-w-sm mx-auto sm:mx-0">
        {desc}
      </p>
    </div>

    {/* Illustration */}
    <div className="flex-shrink-0 w-full sm:w-64 lg:w-80 rounded-t-xl sm:rounded-tr-xl sm:rounded-br-xl overflow-hidden">
      <img
        src={illustration}
        alt={title}
        className="w-full h-auto sm:h-full object-cover object-center"
      />
    </div>
  </motion.div>
);

// --- Main Component ---

const GettingStarted = () => {
  return (
    <section className="relative   text-white lg:py-20 px-3 lg:px-16 ">
      <div className="neon-orb" style={{ right: '20%', bottom: '30%' }}></div>
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-20 ">
        {/* Left Pane (Sticky) */}
        <div className="text-center lg:text-start">
          <motion.div
            className="lg:sticky lg:top-4 " // Sticky + Top offset
            variants={headerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            <h2 className="text-4xl md:text-[44px] font-extrabold text-white mb-6">
              How to get started
            </h2>
            <div
              className="w-full flex justify-center lg:justify-start lg:text-start text-center
             "
            >
              <p className="text-lg text-text-dark max-w-md mb-10">
                Eget mi proin sed libero enim sed faucibus viverrate maecenas
                accumsan lacus vel facilisis volutpat viverra maecenas accumsan
                it.
              </p>
            </div>

            {/* Button with Gradient Border */}
            <a
              href=""
              className="relative inline-block rounded-full p-[3px] bg-gradient-to-r from-[rgba(255,0,150,0.8)] via-[rgba(128,0,255,0.8)] to-[rgba(0,200,255,0.8)]"
            >
              <span className="block bg-black text-white px-8 py-3 rounded-full font-semibold transition duration-200 ">
                Get started
              </span>
            </a>
          </motion.div>
        </div>

        {/* Right Pane (Scrollable Steps) */}
        <div className=" flex flex-col space-y-12 pt-0 z-10">
          {steps.map((step, index) => (
            <StepCard
              key={step.id}
              id={step.id}
              title={step.title}
              desc={step.desc}
              illustration={step.illustration}
              delay={index * 0.1} // Staggered delay for scroll-in animation
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default GettingStarted;
