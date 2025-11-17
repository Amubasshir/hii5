'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // Stagger children animations
        delayChildren: 0.5, // Delay before children start animating
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const dashboardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    show: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, rotate: 0 },
    show: {
      opacity: 1,
      y: 0,
      rotate: [0, 5, -5, 3, -3, 0],
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  const candlestickCardVariants = {
    hidden: { opacity: 0, y: 50, rotate: 0 },
    show: {
      opacity: 1,
      y: 0,
      rotate: [0, -7, 7, -4, 4, -6],
      transition: { duration: 0.8, ease: 'easeOut', delay: 0.2 },
    },
  };
  return (
    <section className="relative overflow-hidden  text-white py-24 px-6">
      {/* left glowing bal */}
      <div className="neon-orb" style={{ left: '10px', top: '20%' }}></div>

      {/* Right glowing ball */}
      <div className="neon-orb" style={{ right: '100px', bottom: '20%' }}></div>

      <div className="relative max-w-7xl mx-auto text-center">
        {/* Badge */}
        <main className="flex flex-col items-center justify-center  p-4 antialiased text-center  text-white">
          <div className="relative inline-block group">
            {/* The animated, blurred glow effect */}
            <div
              className="absolute -inset-1 rounded-full bg-gradient-to-r from-rose-500 via-fuchsia-500 to-indigo-500 blur-lg opacity-70 group-hover:opacity-90 transition duration-500"
              aria-hidden="true"
            ></div>

            {/* The main button/link content */}
            <a
              href="#"
              className="relative flex items-center px-2.5 py-2 text-sm leading-none bg-[#18181B] rounded-full text-gray-200 transition-transform duration-300 ease-in-out group-hover:scale-105"
            >
              <span className="flex items-center px-3 py-1 text-xs font-bold text-white bg-[#3A3042] rounded-full">
                NEW
              </span>
              <span className="ml-4 mr-3 whitespace-nowrap">
                Dark v3.0 is now released ✨
              </span>
            </a>
          </div>
        </main>

        {/* Heading */}
        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
          Next-gen investing app
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-blue-500">
            for modern investors
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-gray-300 max-w-2xl mx-auto mt-4">
          Lorem ipsum dolor sit amet consectetur adipiscing elit blandit id
          dolor venenatis auctor maecenas egestas arcu ut consectetur.
        </p>

        {/* Buttons */}
        <div className="flex flex-col md:flex-row justify-center gap-4 mt-8">
          <Link
            href=""
            className="relative inline-block rounded-full p-[3px] bg-gradient-to-r from-[rgba(255,0,150,0.8)] via-[rgba(128,0,255,0.8)] to-[rgba(0,200,255,0.8)]"
          >
            <span className="block bg-black text-white px-8 py-3 rounded-full font-semibold transition duration-200 ">
              Get started
            </span>
          </Link>
          <Link
            href=""
            className="px-6 py-3 rounded-full border bg-gray-600 border-white/20 hover:bg-white/10 transition"
          >
            Browse features
          </Link>
        </div>

        {/* Chart Section */}
        <div className="relative  min-h-screen flex flex-col items-center justify-center p-8 overflow-hidden max-w-7xl mx-auto rounded-3xl mt-10 ">
          {/* Background Glows - keeping the CSS animation for continuous blob motion */}
          <div className="absolute top-0 left-0 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob z-40"></div>
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000 z-40"></div>
          {/* Main Dashboard Window - Framer Motion */}
          <motion.div
            variants={dashboardVariants}
            initial="hidden"
            animate="show"
            className="relative bg-dashboard-bg rounded-xl shadow-2xl p-4 w-[90%] max-w-6xl h-[600px] flex flex-col items-center justify-center border border-gray-700/50"
          >
            {/* Mock Browser Title Bar */}
            <div className="absolute top-0 left-0 right-0 h-10 bg-dashboard-card rounded-t-xl flex items-center px-4 space-x-2 border-b border-gray-700/50">
              <span className="w-3 h-3 bg-red-500 rounded-full"></span>
              <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
              <span className="w-3 h-3 bg-green-500 rounded-full"></span>
            </div>

            {/* Dashboard Content Area */}
            <div className="flex w-full h-full mt-10">
              {/* Left Sidebar */}
              <div className="w-1/4 bg-dashboard-card rounded-bl-xl p-4 flex flex-col space-y-4 border-r border-gray-700/50">
                <div className="h-6 bg-gray-600 rounded w-3/4"></div>
                <div className="h-4 bg-gray-700 rounded w-1/2"></div>
                <div className="h-4 bg-gray-700 rounded w-2/3"></div>
                <div className="h-4 bg-gray-700 rounded w-1/2"></div>
                <div className="h-4 bg-gray-700 rounded w-3/4"></div>
                <div className="flex-grow"></div>
                <button className="bg-pink-purple-gradient text-white py-2 rounded-lg font-semibold">
                  Upgrade
                </button>
              </div>

              {/* Main Content Area */}
              <div className="flex-grow p-6 grid grid-cols-3 gap-4 auto-rows-min">
                {/* Top-left small chart card (floating) - Framer Motion */}
                <motion.div
                  variants={cardVariants}
                  initial="hidden"
                  animate="show"
                  className="absolute -left-20 top-40 w-64 h-48 bg-dashboard-card rounded-lg p-3 shadow-xl transform rotate-3 z-10 border border-gray-700/50"
                >
                  <div className="flex justify-between items-center text-gray-400 text-sm mb-2">
                    <span>Total Revenue</span>
                    <span className="text-green-400">+12%</span>
                  </div>
                  <div className="text-xl font-bold text-white mb-4">
                    $12,345
                  </div>
                  {/* Mock Chart SVG */}
                  <svg viewBox="0 0 100 30" className="w-full h-16">
                    <defs>
                      {' '}
                      {/* Define gradients inside defs for reusability if needed */}
                      <linearGradient
                        id="chartGradient1"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop offset="0%" stopColor="rgba(0,255,0,0.2)" />
                        <stop offset="100%" stopColor="rgba(0,255,0,0)" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M0,25 Q20,5 50,15 T100,5"
                      fill="none"
                      stroke="#00ff00"
                      strokeWidth="2"
                    />
                    <path
                      d="M0,25 Q20,5 50,15 T100,5 L100,30 L0,30 Z"
                      fill="url(#chartGradient1)"
                    />
                  </svg>
                </motion.div>

                {/* Main Growth Chart */}
                <div className="col-span-2 bg-dashboard-card rounded-lg p-4 shadow-md border border-gray-700/50">
                  <h3 className="text-lg font-semibold text-white mb-4">
                    Market Overview
                  </h3>
                  {/* Mock Large Chart SVG */}
                  <svg viewBox="0 0 200 80" className="w-full h-48">
                    <defs>
                      <linearGradient
                        id="chartGradientMain"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop offset="0%" stopColor="rgba(0,255,0,0.15)" />
                        <stop offset="100%" stopColor="rgba(0,255,0,0)" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M0,70 L20,60 L40,65 L60,50 L80,55 L100,40 L120,45 L140,30 L160,35 L180,20 L200,25"
                      fill="none"
                      stroke="#00ff00"
                      strokeWidth="2"
                    />
                    <path
                      d="M0,70 L20,60 L40,65 L60,50 L80,55 L100,40 L120,45 L140,30 L160,35 L180,20 L200,25 L200,80 L0,80 Z"
                      fill="url(#chartGradientMain)"
                    />
                  </svg>
                </div>

                {/* Small Chart Grid */}
                <div className="col-span-1 grid grid-cols-1 gap-4">
                  <div className="bg-dashboard-card rounded-lg p-3 shadow-sm border border-gray-700/50">
                    <span className="block text-gray-400 text-sm">Stock A</span>
                    <div className="flex justify-between items-end">
                      <span className="text-white text-lg font-bold">
                        $150.30
                      </span>
                      <svg viewBox="0 0 100 20" className="w-24 h-8">
                        <path
                          d="M0,15 L20,10 L40,12 L60,8 L80,10 L100,5"
                          fill="none"
                          stroke="#00ff00"
                          strokeWidth="1.5"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="bg-dashboard-card rounded-lg p-3 shadow-sm border border-gray-700/50">
                    <span className="block text-gray-400 text-sm">Stock B</span>
                    <div className="flex justify-between items-end">
                      <span className="text-white text-lg font-bold">
                        $92.10
                      </span>
                      <svg viewBox="0 0 100 20" className="w-24 h-8">
                        <path
                          d="M0,5 L20,10 L40,8 L60,12 L80,10 L100,15"
                          fill="none"
                          stroke="#ff0000"
                          strokeWidth="1.5"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="bg-dashboard-card rounded-lg p-3 shadow-sm border border-gray-700/50">
                    <span className="block text-gray-400 text-sm">Stock C</span>
                    <div className="flex justify-between items-end">
                      <span className="text-white text-lg font-bold">
                        $210.80
                      </span>
                      <svg viewBox="0 0 100 20" className="w-24 h-8">
                        <path
                          d="M0,10 L20,8 L40,15 L60,5 L80,12 L100,10"
                          fill="none"
                          stroke="#00ff00"
                          strokeWidth="1.5"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="bg-dashboard-card rounded-lg p-3 shadow-sm border border-gray-700/50">
                    <span className="block text-gray-400 text-sm">Stock D</span>
                    <div className="flex justify-between items-end">
                      <span className="text-white text-lg font-bold">
                        $45.60
                      </span>
                      <svg viewBox="0 0 100 20" className="w-24 h-8">
                        <path
                          d="M0,12 L20,15 L40,8 L60,10 L80,5 L100,10"
                          fill="none"
                          stroke="#ff0000"
                          strokeWidth="1.5"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Floating Candlestick Chart Card - Framer Motion */}
                <motion.div
                  variants={candlestickCardVariants}
                  initial="hidden"
                  animate="show"
                  className="absolute right-10 bottom-10 w-64 h-48 bg-dashboard-card rounded-lg p-3 shadow-xl transform -rotate-6 z-10 border border-gray-700/50"
                >
                  <h3 className="text-lg font-semibold text-white mb-4">
                    BTC/USD
                  </h3>
                  {/* Mock Candlestick Chart SVG */}
                  <svg viewBox="0 0 100 40" className="w-full h-24">
                    {/* Green candles */}
                    <rect
                      x="5"
                      y="10"
                      width="8"
                      height="20"
                      fill="#00ff00"
                    />{' '}
                    <line
                      x1="9"
                      y1="5"
                      x2="9"
                      y2="35"
                      stroke="#00ff00"
                      strokeWidth="1"
                    />
                    <rect x="20" y="5" width="8" height="25" fill="#00ff00" />{' '}
                    <line
                      x1="24"
                      y1="0"
                      x2="24"
                      y2="30"
                      stroke="#00ff00"
                      strokeWidth="1"
                    />
                    <rect x="35" y="15" width="8" height="15" fill="#00ff00" />{' '}
                    <line
                      x1="39"
                      y1="10"
                      x2="39"
                      y2="30"
                      stroke="#00ff00"
                      strokeWidth="1"
                    />
                    {/* Red candles */}
                    <rect
                      x="50"
                      y="20"
                      width="8"
                      height="15"
                      fill="#ff0000"
                    />{' '}
                    <line
                      x1="54"
                      y1="15"
                      x2="54"
                      y2="30"
                      stroke="#ff0000"
                      strokeWidth="1"
                    />
                    <rect x="65" y="10" width="8" height="20" fill="#ff0000" />{' '}
                    <line
                      x1="69"
                      y1="5"
                      x2="69"
                      y2="35"
                      stroke="#ff0000"
                      strokeWidth="1"
                    />
                    <rect x="80" y="15" width="8" height="15" fill="#00ff00" />{' '}
                    <line
                      x1="84"
                      y1="10"
                      x2="84"
                      y2="30"
                      stroke="#00ff00"
                      strokeWidth="1"
                    />
                  </svg>
                </motion.div>
              </div>
            </div>
          </motion.div>
          {/* Footer / Logo Section - Staggered animation */}

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-2 gap-8 mt-12 text-gray-500 justify-items-center"
          >
            <motion.div
              variants={itemVariants}
              className="flex flex-col items-center space-y-3"
            >
              <img
                src="https://cdn.prod.website-files.com/61113c4e9f23df1e7f554117/654e33873635494a6e41a59a_agency-logo-dark-x-webflow-template.svg"
                alt=""
              />
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex flex-col items-center space-y-3"
            >
              <img
                src="https://cdn.prod.website-files.com/61113c4e9f23df1e7f554117/654e33874d6f84884493bafb_application-logo-dark-x-webflow-template.svg"
                alt=""
              />
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex flex-col items-center space-y-3"
            >
              <img
                src="https://cdn.prod.website-files.com/61113c4e9f23df1e7f554117/654e33876532421653dd67e3_company-logo-dark-x-webflow-template.svg"
                alt=""
              />
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex flex-col items-center space-y-3"
            >
              <img
                src="https://cdn.prod.website-files.com/61113c4e9f23df1e7f554117/654e3388efb5d6275c03fd6b_business-logo-dark-x-webflow-template.svg"
                alt=""
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
