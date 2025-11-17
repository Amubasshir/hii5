'use client';
import React from 'react';

// --- Stat Card Component ---
const StatCard = ({ number, label, plusColor }) => {
  const parts = number.split('+');
  return (
    <div className="px-6 py-8 md:px-8 md:py-16 backdrop-blur-sm rounded-xl border border-white/10 shadow-lg text-center transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl bg-[#1d1a27a3]">
      <div className="text-4xl md:text-5xl font-extrabold text-white mb-2">
        {parts[0]}
        <span className={plusColor}>+</span>
      </div>
      <div className="text-sm md:text-base text-gray-400 font-medium tracking-wider uppercase">
        {label}
      </div>
    </div>
  );
};

export default function CombinedSection() {
  const stats = [
    { number: '250M+', label: 'Traded monthly', plusColor: 'text-red-400' },
    { number: '300K+', label: 'Active users', plusColor: 'text-yellow-400' },
    {
      number: '10M+',
      label: 'Saved in commissions',
      plusColor: 'text-green-400',
    },
    { number: '75M+', label: 'Capital in funding', plusColor: 'text-blue-400' },
  ];

  return (
    <div className="relative overflow-hidden">
      {/* Stats Section */}
      <div className="neon-orb" style={{ right: '100px', bottom: '60%' }}></div>
      <section className="py-16 md:py-24 neon-animated-bg">
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          {/* Mission Statement */}
          <div className="max-w-5xl mb-12 md:mb-16">
            <h1 className="text-5xl md:text-7xl font-extrabold leading-tight text-white">
              We are on a mission to{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-400">
                democratize finance
              </span>
            </h1>
            <p className="mt-4 text-lg text-gray-300 max-w-2xl">
              Lorem ipsum dolor sit amet consectetur adipiscing elit blandit id
              dolor venenatis auctor maecenas egestas arcu ut.
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <StatCard
                key={index}
                number={stat.number}
                label={stat.label}
                plusColor={stat.plusColor}
              />
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="w-full text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center relative z-10">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              The story behind us
            </h2>
            <p className="text-gray-300 leading-relaxed text-lg">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim
              ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
              aliquip ex ea commodo consequat duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu.
            </p>
          </div>

          <div className="flex justify-center">
            <img
              src="https://cdn.prod.website-files.com/61113c4e9f23df1e7f554117/6112d603add3607e309c70a5_image-2-story-dark-template-p-800.jpeg"
              alt="Team working together"
              width={500}
              height={350}
              className="rounded-2xl shadow-lg object-cover"
            />
          </div>

          <div className="flex justify-center order-2 md:order-none lg:-mt-30 ">
            <img
              src="https://cdn.prod.website-files.com/61113c4e9f23df1e7f554117/6112d605225ac8d582ad79d4_image-1-story-dark-template-p-800.jpeg"
              alt="Office workspace"
              width={500}
              height={350}
              className="rounded-2xl shadow-lg object-cover"
            />
          </div>

          <div>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              The mission behind all our work
            </h2>
            <p className="text-gray-300 leading-relaxed text-lg">
              Aliquam ultrices sagittis orci a scelerisque purus tristique nulla
              aliquet enim tortor at auctor urna nunc id. Fringilla phasellus
              faucibus scelerisque eleifend donec pretium vulputate non blandit
              massa enim nec dui. Maecenas volutpat blandit aliquam etiam erat
              velit scelerisque duis at consectetur.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
