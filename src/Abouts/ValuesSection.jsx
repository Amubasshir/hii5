import React from 'react';

// Simplified SVG icons for demonstration
const StarIcon = props => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
    <path d="M316.9 18C342.1-4.1 377.9-4.1 403.1 18l46.7 44.8 63.8 3.5c28.3 1.5 40.8 34.6 19.9 52.8l-47.5 44.4 12.3 62.7c5.4 28.5-12.7 54.5-38.3 64.1L375.2 338 387 394c5.4 28.5-12.7 54.5-38.3 64.1l-55.5 29.5-23.7 54c-12 27.2-51.4 27.2-63.4 0l-23.7-54-55.5-29.5c-25.6-9.6-43.7-35.6-38.3-64.1l12.3-62.7-47.5-44.4c-20.9-18.2-8.4-51.3 19.9-52.8l63.8-3.5 46.7-44.8z" />
  </svg>
);

const AccessibilityIcon = props => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
    <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-16 112L128 368c-17.7 0-32 14.3-32 32s14.3 32 32 32l64 0c17.7 0 32-14.3 32-32s-14.3-32-32-32zm-64 64H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H352c17.7 0 32-14.3 32-32s-14.3-32-32-32H160c-17.7 0-32 14.3-32 32l0 0z" />
  </svg>
);

const OpennessIcon = props => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
    <path d="M416 384c-8.8 0-16 7.2-16 16v32c0 17.7-14.3 32-32 32h-64v-64c0-17.7-14.3-32-32-32s-32 14.3-32 32v64H96c-17.7 0-32-14.3-32-32v-32c0-8.8-7.2-16-16-16s-16 7.2-16 16v32c0 35.3 28.7 64 64 64h320c35.3 0 64-28.7 64-64v-32c0-8.8-7.2-16-16-16s-16 7.2-16 16zM256 0c17.7 0 32 14.3 32 32V320c0 17.7-14.3 32-32 32s-32-14.3-32-32V32c0-17.7 14.3-32 32-32zm0 144a112 112 0 1 0 0 224 112 112 0 1 0 0-224z" />
  </svg>
);

const EmpowermentIcon = props => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
    <path d="M256 0c8.8 0 16 7.2 16 16V176c0 8.8-7.2 16-16 16s-16-7.2-16-16V16c0-8.8 7.2-16 16-16zM32 256c8.8 0 16 7.2 16 16V496c0 8.8-7.2 16-16 16s-16-7.2-16-16V272c0-8.8 7.2-16 16-16zM448 256c-8.8 0-16 7.2-16 16V496c0 8.8 7.2 16 16 16s16-7.2 16-16V272c0-8.8-7.2-16-16-16zM144 144c8.8 0 16 7.2 16 16V496c0 8.8-7.2 16-16 16s-16-7.2-16-16V160c0-8.8 7.2-16 16-16zm224 0c-8.8 0-16 7.2-16 16V496c0 8.8 7.2 16 16 16s16-7.2 16-16V160c0-8.8-7.2-16-16-16z" />
  </svg>
);

// --- Data for the Value Cards ---
const coreValues = [
  {
    id: 1,
    title: 'Innovation',
    content:
      'Lorem ipsum dolor sit amet consectetur adipiscing elit odio tortor quam enim ipsum.',
    Icon: StarIcon,
  },
  {
    id: 2,
    title: 'Accessibility',
    content:
      'Lorem ipsum dolor sit amet consectetur adipiscing elit odio tortor quam enim ipsum.',
    Icon: AccessibilityIcon,
  },
  {
    id: 3,
    title: 'Openness',
    content:
      'Lorem ipsum dolor sit amet consectetur adipiscing elit odio tortor quam enim ipsum.',
    Icon: OpennessIcon,
  },
  {
    id: 4,
    title: 'Empowerment',
    content:
      'Lorem ipsum dolor sit amet consectetur adipiscing elit odio tortor quam enim ipsum.',
    Icon: EmpowermentIcon,
  },
];

// --- Card Component (reusable inner part) ---
const ValueCard = ({ title, content, Icon }) => (
  <div className="bg-[#1d1a27] p-6 sm:p-8 lg:p-12 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 relative">
    {/* Icon Wrapper */}
    <div className="flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center bg-white/10 shadow-lg">
      <Icon className="w-6 h-6 sm:w-7 sm:h-7 fill-white" />
    </div>

    {/* Text Content */}
    <div className="flex-1">
      <h2 className="text-lg sm:text-xl lg:text-2xl font-bold mb-1 text-white">
        {title}
      </h2>
      <p className="text-sm sm:text-base md:text-lg text-gray-300 leading-snug">
        {content}
      </p>
    </div>
  </div>
);

// --- Main Section Component ---
const ValuesSection = () => {
  return (
    // Set the overall dark background color here (dark-purple)
    <div className="relative py-20 px-4 text-white">
      <div className="neon-orb" style={{ right: '40%', bottom: '15%' }}></div>
      <header className="text-center mb-12">
        <h1 className="text-5xl font-medium mb-8">
          The values that drive
          <br />
          everything we do
        </h1>
        <p className="text-lg text-gray-400 max-w-xl mx-auto">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit congue
          elementum velit se senectus urna amet cras neque.
        </p>
      </header>

      {/* Responsive Grid Layout */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {coreValues.map(value => (
          <ValueCard
            key={value.id}
            title={value.title}
            content={value.content}
            Icon={value.Icon}
          />
        ))}
      </div>
    </div>
  );
};

export default ValuesSection;
