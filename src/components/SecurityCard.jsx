import React from 'react';

export default function SecurityCard({
  title = 'Built-in enterprise encryption and security',
  subtitle = 'Lorem ipsum dolor sit amet consectetur adipiscing elit non amet non eu auctor erat vitae diam erat tellus porta.',
  features = [
    {
      img: 'https://cdn.prod.website-files.com/61113c4e9f23df1e7f554117/611181b2be3d66285372e680_icon-3-home-perks-dark-template.svg',
      title: '256-bit AES encryption',
      desc: 'Lorem ipsum dolor sit amet consectetur adipiscing elit non amet non eu auctor erat vitae tellus.',
    },
    {
      img: 'https://cdn.prod.website-files.com/61113c4e9f23df1e7f554117/611181b1b2af0b6a4cd18dd7_icon-4-home-perks-dark-template.svg',
      title: 'Advanced security standards',
      desc: 'Lorem ipsum dolor sit amet consectetur adipiscing elit non amet non eu auctor erat vitae tellus.',
    },
  ],
}) {
  return (
    <section className="relative  text-white py-20 px-4">
      <div className="max-w-[1200px] mx-auto flex flex-col-reverse md:flex-col-reverse lg:flex-row items-center gap-10 md:gap-16">
        {/* Left image */}
        <div className="w-full md:w-[520px] rounded-xl overflow-hidden">
          <img
            src="https://cdn.prod.website-files.com/61113c4e9f23df1e7f554117/6111817f246ebe3d56f8f70a_image-1-home-perks-dark-template-p-800.jpeg"
            alt="Trading Screen"
            className="w-full h-auto object-cover"
          />
        </div>

        {/* Right content */}
        <div className="flex-1 text-white text-center md:text-left px-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-6">
            {title}
          </h1>
          <p className="text-slate-300 max-w-[27rem] text-sm md:text-lg mx-auto md:mx-0 mb-10">
            {subtitle}
          </p>

          <ul className="flex flex-col gap-7">
            {features.map((f, i) => (
              <li
                key={i}
                className="flex gap-4 items-start justify-center md:justify-start flex-col md:flex-row text-start"
              >
                <div className="bg-white/10 p-3 rounded-lg flex items-center justify-center">
                  <img src={f.img} alt={f.title + ' icon'} />
                </div>

                <div>
                  <h3 className="text-lg md:text-2xl font-semibold">
                    {f.title}
                  </h3>
                  <p className="text-slate-400 text-sm md:text-lg max-w-[20rem]">
                    {f.desc}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
