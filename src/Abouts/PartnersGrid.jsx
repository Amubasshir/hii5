import React from 'react';

// --- Partner Data Array (using your provided URLs) ---
const partners = [
  {
    id: 1,
    name: 'agency',
    img: 'https://cdn.prod.website-files.com/61113c4e9f23df1e7f554117/654e34f03ccee7aaac920dbf_agency-logo-partners-dark-x-webflow-template.svg',
  },
  {
    id: 2,
    name: 'application',
    img: 'https://cdn.prod.website-files.com/61113c4e9f23df1e7f554117/654e34f0a01afbcbb2ed2167_application-logo-partners-dark-x-webflow-template.svg',
  },
  {
    id: 3,
    name: 'institute',
    img: 'https://cdn.prod.website-files.com/61113c4e9f23df1e7f554117/654e34f0014b7c4f0dd0d252_institute-logo-partners-dark-x-webflow-template.svg',
  },
  {
    id: 4,
    name: 'business',
    img: 'https://cdn.prod.website-files.com/61113c4e9f23df1e7f554117/654e34f0ca02e3904b53bb44_business-logo-partners-dark-x-webflow-template.svg',
  },
  {
    id: 5,
    name: 'company',
    img: 'https://cdn.prod.website-files.com/61113c4e9f23df1e7f554117/654e34f0d4cdc1fa219db679_company-logo-partners-dark-x-webflow-template.svg',
  },
  {
    id: 6,
    name: 'enterprise',
    img: 'https://cdn.prod.website-files.com/61113c4e9f23df1e7f554117/654e34f0f7ddbbf98f4ae9ee_enterprise-logo-partners-dark-x-webflow-template.svg',
  },
  {
    id: 7,
    name: 'agency-2',
    img: 'https://cdn.prod.website-files.com/61113c4e9f23df1e7f554117/654e34f03ccee7aaac920dbf_agency-logo-partners-dark-x-webflow-template.svg',
  },
  {
    id: 8,
    name: 'organization',
    img: 'https://cdn.prod.website-files.com/61113c4e9f23df1e7f554117/654e34f0b700ec82e23168e4_organization-logo-partners-dark-x-webflow-template.svg',
  },
];

const PartnerGrid = () => {
  return (
    // Set the overall dark background color matching your UI
    <section className="w-full  text-white py-20 px-6 flex flex-col items-center justify-center">
      {/* --- Section Header --- */}
      <div className="text-center mb-16 max-w-2xl">
        <h2 className="text-4xl font-bold text-white mb-4">Our partners</h2>
        <p className="text-gray-400 text-lg">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit congue
          elementum velit se senectus urna amet cras neque.
        </p>
      </div>

      {/* --- Partner Grid Container (Outer Box) --- */}
      <div className="max-w-6xl w-full rounded-3xl overflow-hidden bg-gray-900 shadow-xl">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-0">
          {/* We use grid-cols-4 directly to match the 4x2 layout */}
          {partners.map((partner, index) => {
            // Logic for applying the specific borders and corner radiuses
            const isRightColumn = (index + 1) % 4 === 0;
            const isBottomRow = index >= 4;

            const borderClasses = `
              ${!isRightColumn ? 'border-r border-r-gray-700/50' : ''}
              ${!isBottomRow ? 'border-b border-b-gray-700/50' : ''}
            `;

            const cornerClasses = `
              ${index === 0 ? 'rounded-tl-3xl' : ''} 
              ${index === 3 ? 'rounded-tr-3xl' : ''} 
              ${index === 4 ? 'rounded-bl-3xl' : ''} 
              ${index === 7 ? 'rounded-br-3xl' : ''} 
            `;

            return (
              <div
                key={partner.id}
                className={`
                  flex items-center justify-start p-6 md:p-8 h-[100px] sm:h-[120px]
                  bg-[#1D1A27] text-gray-300 hover:text-white hover:bg-[#252233] 
                  transition-colors duration-300 cursor-pointer space-x-3
                  ${borderClasses}
                  ${cornerClasses}
                `}
              >
                {/* The logo is small and centered/aligned left */}
                <img
                  src={partner.img}
                  alt={partner.name}
                  className="h-7 w-auto object-contain brightness-200"
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PartnerGrid;
