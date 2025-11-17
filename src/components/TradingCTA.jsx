import React from 'react';

const TradingCTA = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0B0A13] p-4 w-full">
      {/* Main CTA Card */}
      <main className="flex flex-col items-center justify-center p-4 antialiased text-center bg-[#0E0B12] text-white w-full">
        <div className="relative inline-block group w-full max-w-[1000px]">
          {/* The animated, blurred glow effect */}
          <div
            className="absolute -inset-1 rounded-full bg-gradient-to-r from-rose-500 via-fuchsia-500 to-indigo-500 blur-2xl opacity-70 group-hover:opacity-90 transition duration-500"
            aria-hidden="true"
          ></div>

          <div className="relative z-10 cta-glow-border w-full rounded-3xl shadow-2xl shadow-pink-700 bg-[#0B0A13] text-white p-6 sm:p-8 md:p-10 lg:p-12 flex flex-col lg:flex-row items-center lg:items-start justify-between gap-6 sm:gap-8 lg:gap-12">
            {/* Text Content */}
            <div className="text-center lg:text-left">
              <h1 className="text-2xl sm:text-3xl md:text-[44px] lg:text-[48px] font-semibold leading-snug">
                Create your account
                <br />
                and start trading today
              </h1>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto mt-4 sm:mt-6">
              <a
                href="/get-started"
                className="
                w-full sm:w-auto
                py-2 sm:py-3 md:py-4 px-6 sm:px-8 text-base sm:text-lg font-semibold rounded-full 
                transition duration-200 
                bg-white text-[#0B0A13]
                border-2 border-white 
                shadow-xl
                hover:bg-gray-100
              "
              >
                Get started
              </a>

              <a
                href="/pricing"
                className="
                w-full sm:w-auto
                py-2 sm:py-3 md:py-4 px-6 sm:px-8 text-base sm:text-lg font-semibold rounded-full
                transition duration-200 
                bg-transparent text-white border-2 border-white 
                hover:border-gray-400 hover:text-gray-400
              "
              >
                View pricing
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TradingCTA;
