import React from 'react';

export default function TradingPromo({
  title = 'Real-time trading like never before',
  subtitle = 'Lorem ipsum dolor sit amet consectetur adipiscing elit non amet non eu auctor erat vitae diam erat tellus porta.',
  features = [
    {
      title: '<1 sec operations',
      desc: 'Lorem ipsum dolor sit amet consectetur adipiscing elit non amet non eu auctor erat vitae tellus.',
    },
    {
      title: 'No commissions',
      desc: 'Lorem ipsum dolor sit amet consectetur adipiscing elit non amet non eu auctor erat vitae tellus.',
    },
  ],
}) {
  return (
    <section className="relative  text-white py-16 px-4">
      <div className="max-w-[1200px] mx-auto flex flex-col lg:flex-row items-center gap-12">
        {/* Left */}
        <div className="flex-1 text-center md:text-left px-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
            {title}
          </h1>

          <p className="text-slate-300 max-w-[480px] mx-auto md:mx-0 mb-8 text-base sm:text-lg md:text-[18px]">
            {subtitle}
          </p>

          <ul className="flex flex-col gap-6">
            {features.map((f, i) => (
              <li
                key={i}
                className="flex gap-4 items-start justify-center md:justify-start flex-col md:flex-row text-start"
              >
                <div className="w-12 h-12 flex items-center justify-center rounded-md bg-gray-600">
                  {i === 0 ? (
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path d="M3 12h18M12 3v18" />
                    </svg>
                  ) : (
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <circle cx="12" cy="12" r="9" />
                      <path d="M8 12h8" />
                    </svg>
                  )}
                </div>

                <div>
                  <h3 className="text-lg  md:text-[22px] font-semibold">
                    {f.title}
                  </h3>
                  <p className="text-slate-400 text-base sm:text-lg md:text-[18px] max-w-[20rem]">
                    {f.desc}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Image */}
        <div className="w-full md:w-[580px] rounded-xl overflow-hidden shadow-2xl">
          <img
            src="/trading.jpg"
            alt="Trading Screen"
            className="w-full h-auto object-cover"
          />
        </div>
      </div>
    </section>
  );
}
