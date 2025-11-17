import React from 'react';
import { Check } from 'lucide-react';

// --- Reusable Pricing Card Component ---
const PricingCard = ({
  title,
  description,
  price,
  features,
  isPopular = false,
}) => {
  const baseClasses =
    'px-7 py-16 mx-4 my-6 rounded-2xl text-white w-full max-w-xs md:max-w-sm flex flex-col justify-between relative transition-all duration-300 bg-[#1d1a27]';

  let cardStyle = { boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)' };

  if (isPopular) {
    cardStyle = {
      ...cardStyle,
      border: '1px solid transparent',
      backgroundOrigin: 'border-box',

      boxShadow: `
        -10px 0 20px rgba(255, 20, 147, 0.7),
        10px 0 20px rgba(255, 0, 0, 0.7)
      `,
      transform: 'scale(1.05)',
    };
  }

  const buttonBase =
    'py-3 px-6 rounded-xl text-sm font-semibold transition-colors duration-300 w-full';
  const buttonStyle = isPopular
    ? 'bg-[#4A4A6A] hover:bg-[#6A6A8A] text-white mt-8'
    : 'bg-[#3A354C] hover:bg-[#4A445C] mt-4';
  const checkColor = isPopular ? 'text-[#FF1493]' : 'text-[#8A2BE2]';
  const iconBgColor = 'bg-[#3A354C]';

  return (
    <div
      className={
        baseClasses +
        (isPopular ? ' lg:h-[110%] lg:mt-[-60px] mb-8' : ' lg:mt-[40px]')
      }
      style={cardStyle}
    >
      {isPopular && (
        <div className="absolute top-20 right-5 transform -translate-y-1/2">
          <span
            className="text-xs font-bold py-1 px-3 rounded-full bg-[#1d1a27] text-white tracking-wider shadow-lg"
            style={{
              boxShadow: `
                -5px 0 10px rgba(255, 20, 147, 0.7),
                5px 0 10px rgba(255, 0, 0, 0.7)
              `,
            }}
          >
            Popular
          </span>
        </div>
      )}

      {/* Header */}
      <div>
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-12 h-12 p-1 rounded-full bg-white/10 flex items-center justify-center">
            <div
              className={`w-8 h-8 rounded-full ${
                title === 'Basic'
                  ? 'bg-gradient-to-br from-[#8A2BE2] to-[#FF1493]'
                  : title === 'Advanced'
                  ? 'bg-gradient-to-br from-[#FF1493] to-[#8A2BE2]'
                  : 'bg-gradient-to-br from-[#8A2BE2] to-[#FF1493]'
              }`}
            ></div>
          </div>
          <h3 className="text-2xl font-extrabold">{title}</h3>
        </div>

        <p className="text-sm text-gray-400 mb-6 leading-relaxed">
          {description}
        </p>

        <ul className="space-y-4 mb-8">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start text-sm">
              <div
                className={`w-5 h-5 mr-3 mt-0.5 rounded flex items-center justify-center shrink-0 ${iconBgColor}`}
              >
                <Check className={`w-4 h-4 ${checkColor}`} />
              </div>
              <span className="text-gray-300">{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Footer */}
      <div className="mt-auto pt-4">
        <p
          className={`text-4xl font-extrabold mb-4 ${
            isPopular ? 'text-white' : 'text-gray-200'
          }`}
        >
          {price}
        </p>
        <button className={buttonBase + ' ' + buttonStyle}>Get started</button>
        <p className="text-xs text-gray-500 mt-3">No credit card required</p>
      </div>
    </div>
  );
};

// --- Feature Table Components ---
const tableData = {
  header: {
    title: 'Compare all plan features',
    subtitle:
      'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur amet',
    plans: [
      { name: 'Basic plan', price: '$9' },
      { name: 'Advanced plan', price: '$19' },
      { name: 'Professional plan', price: '$99' },
    ],
  },
  sections: [
    {
      title: 'Main features',
      features: [
        {
          name: 'Feature One',
          basic: true,
          advanced: true,
          professional: true,
        },
        {
          name: 'Feature Two',
          basic: true,
          advanced: true,
          professional: true,
        },
        {
          name: 'Feature Three',
          basic: true,
          advanced: true,
          professional: true,
        },
        {
          name: 'Feature Four',
          basic: '25,000',
          advanced: '50,000',
          professional: '150,000',
        },
      ],
    },
    {
      title: 'Secondary features',
      features: [
        {
          name: 'Feature One',
          basic: true,
          advanced: true,
          professional: true,
        },
        {
          name: 'Feature Two',
          basic: true,
          advanced: true,
          professional: true,
        },
        {
          name: 'Feature Three',
          basic: '10 Credits',
          advanced: '50 Credits',
          professional: '100 Credits',
        },
        {
          name: 'Feature Four',
          basic: true,
          advanced: true,
          professional: true,
        },
      ],
    },
  ],
};

const CellContent = ({ isAdvanced, value }) => {
  const checkColor = isAdvanced ? 'text-[#FF1493]' : 'text-[#8A2BE2]';
  const checkBg = 'bg-[#3A354C]';
  if (value === true)
    return (
      <div
        className={`w-5 h-5 mx-auto rounded flex items-center justify-center ${checkBg}`}
      >
        <Check className={`w-4 h-4 ${checkColor}`} />
      </div>
    );
  if (value)
    return <span className="font-semibold text-gray-200">{value}</span>;
  return <span>-</span>;
};

// --- Merged Component ---
const PricingAndFeatures = () => {
  const cardsData = [
    {
      title: 'Basic',
      description: 'Lorem ipsum...',
      price: '$9.99 USD',
      features: [
        'All basic features',
        'Up to $10,000 USD traded',
        'Normal support',
        'Mobile & desktop app',
      ],
      isPopular: false,
    },
    {
      title: 'Advanced',
      description: 'Lorem ipsum...',
      price: '$19.99 USD',
      features: [
        'All advanced features',
        'Up to $100,000 USD traded',
        'Premium support',
        'AI-based trading',
      ],
      isPopular: true,
    },
    {
      title: 'Professional',
      description: 'Lorem ipsum...',
      price: '$99.99 USD',
      features: [
        'All professional features',
        'Up to $1.0MM USD traded',
        'Dedicated support',
        'Account manager',
      ],
      isPopular: false,
    },
  ];

  const appBgColor = '#100C1B';

  const tableStyle = {
    border: '1px solid transparent',

    backgroundOrigin: 'border-box',
    backgroundClip: 'padding-box, border-box',
  };

  return (
    <div
      className="min-h-screen py-16 overflow-hidden font-sans text-white "
      style={{ background: appBgColor }}
    >
      <div className="neon-orb" style={{ left: '10px', top: '20%' }}></div>

      {/* Right glowing ball */}
      <div
        className="neon-orb"
        style={{ right: '100px', bottom: '-90%' }}
      ></div>
      <div className="container mx-auto px-4">
        {/* Pricing Section */}
        <header className="text-center mb-40">
          <h1 className="text-5xl font-extrabold text-white mb-4">Pricing</h1>
          <p className="text-gray-400 text-base max-w-md mx-auto">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna
          </p>
        </header>
        <div className="flex flex-col lg:flex-row justify-center items-center lg:items-stretch relative">
          {cardsData.map((card, index) => (
            <PricingCard key={index} {...card} />
          ))}
        </div>

        {/* Feature Table */}
        <div
          className="mt-24 rounded-2xl p-4 md:p-6 lg:p-10 shadow-2xl bg-[#1d1a27] z-30"
          style={tableStyle}
        >
          <div className="grid grid-cols-4 gap-8 md:gap-4 text-sm">
            <div className="col-span-1 md:block hidden"></div>
            {tableData.header.plans.map((plan, index) => (
              <div
                key={index}
                className={`col-span-1 text-center font-bold pb-6 ${
                  index === 1 ? 'text-[#FF1493]' : 'text-gray-200'
                }`}
              >
                <div className="md:text-lg">{plan.name}</div>
                <div className="md:text-4xl font-extrabold mt-1">
                  {plan.price}
                </div>
              </div>
            ))}

            {tableData.sections.map((section, sectionIndex) => (
              <React.Fragment key={sectionIndex}>
                <div className="col-span-4 border-t border-gray-700/50 pt-6 mt-6">
                  <h3 className="text-xl font-bold mb-4">{section.title}</h3>
                </div>

                {section.features.map((feature, featureIndex) => (
                  <React.Fragment key={featureIndex}>
                    <div className="col-span-1 py-4 text-gray-300">
                      {feature.name}
                    </div>
                    <div className="col-span-1 py-4 text-center">
                      <CellContent isAdvanced={false} value={feature.basic} />
                    </div>
                    <div className="col-span-1 py-4 text-center">
                      <CellContent isAdvanced={true} value={feature.advanced} />
                    </div>
                    <div className="col-span-1 py-4 text-center">
                      <CellContent
                        isAdvanced={false}
                        value={feature.professional}
                      />
                    </div>
                  </React.Fragment>
                ))}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingAndFeatures;
