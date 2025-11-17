import React from 'react';

// --- Icon Components ---
const BuildingIcon = props => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
    <path d="M224 0c-17.7 0-32 14.3-32 32V48L32 64V448H416V64L256 48V32c0-17.7-14.3-32-32-32zM192 48V64H256V48L224 32 192 48zm-64 80H192v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V128h64v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V128h64V416H128V128z" />
  </svg>
);

const SkyscraperIcon = props => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
    <path d="M32 0C14.3 0 0 14.3 0 32S14.3 64 32 64V448H64V64H320V448h32V64c17.7 0 32-14.3 32-32s-14.3-32-32-32H32zM64 480c0 17.7 14.3 32 32 32H288c17.7 0 32-14.3 32-32V448H64V480z" />
  </svg>
);

// --- Location Data ---
const locations = [
  {
    id: 1,
    city: 'San Francisco, CA',
    address: '794 Moontalker St, San Francisco, California(CA), 94102',
    Icon: SkyscraperIcon,
  },
  {
    id: 2,
    city: 'New York, NY',
    address: '653 Springfield Gardens, New York (NY), 11413',
    Icon: BuildingIcon,
  },
];

const ADDRESS_CARD_CLASSES = `
  flex items-start p-6 md:p-10 rounded-2xl border border-white/10
  bg-[#1d1a27] backdrop-blur-sm transition duration-300
  hover:shadow-lg w-full max-w-md
`;

const StyledWorldMap = () => {
  const pins = [
    { id: 1, top: '29%', left: '9%' },
    { id: 2, top: '42%', left: '1%' },
    { id: 3, top: '80%', left: '17%' },
    { id: 4, top: '39%', left: '54%' },
    { id: 5, top: '19%', right: '4%' },
  ];

  return (
    <div className="relative w-full h-[500px] md:h-[600px] lg:h-[700px] rounded-2xl md:px-5 ">
      <img
        src="https://cdn.prod.website-files.com/61113c4e9f23df1e7f554117/6112d9ff295f88bcd45ba8d1_image-map-dark-template.png"
        alt="World Map"
        className="w-full h-full object-cover rounded-2xl"
      />
      {pins.map(pin => (
        <div
          key={pin.id}
          style={{ top: pin.top, left: pin.left, right: pin.right }}
          className="absolute w-4 h-4 rounded-full bg-purple-400 animate-pulse shadow-[0_0_20px_8px_#a78bfa]"
        />
      ))}
    </div>
  );
};

// --- Visit Us Section ---
const VisitUsSection = () => {
  return (
    <section className="py-12 md:py-20 px-4 text-white">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
        {/* Text + Address Cards: on mobile show first, on lg show first */}
        <div className="order-1 lg:order-1 flex flex-col items-start">
          <h1 className="text-3xl md:text-4xl font-extrabold mb-4 md:mb-8">
            Come and visit us!
          </h1>
          <p className="text-base md:text-lg text-gray-400 mb-8 md:mb-10 max-w-md">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit congue
            elementum velit se senectus urna amet cras neque.
          </p>

          <div className="flex flex-col space-y-6 md:space-y-8">
            {locations.map(location => (
              <div key={location.id} className={ADDRESS_CARD_CLASSES}>
                <div className="flex-shrink-0 w-12 h-12 mr-4 flex items-center justify-center rounded-lg bg-white/10">
                  <location.Icon className="w-6 h-6 fill-white" />
                </div>
                <div className="flex-1 space-y-2">
                  <h2 className="text-lg md:text-xl font-semibold text-white">
                    {location.city}
                  </h2>
                  <p className="text-sm md:text-base text-gray-400">
                    {location.address}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Map: on mobile show second, on lg show second */}
        <div className="order-2 lg:order-2 flex justify-center lg:justify-end mt-8 lg:mt-0">
          <StyledWorldMap />
        </div>
      </div>
    </section>
  );
};

export default VisitUsSection;
