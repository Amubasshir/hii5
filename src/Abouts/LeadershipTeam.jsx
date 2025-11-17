import React from 'react';

// --- Team Member Data ---
const teamMembers = [
  {
    id: 1,
    name: 'John Carter',
    role: 'CEO',
    description: 'Mattis nunc sed blandit libero volutpat sed cras ornare.',
    imageUrl:
      'https://cdn.prod.website-files.com/61113c4e9f23df7a39554118/61142d014d1e8c8ef6463535_image-1-team-dark-template.jpg',
  },
  {
    id: 2,
    name: 'Sophie Moore',
    role: 'COO',
    description: 'Mattis nunc sed blandit libero volutpat sed cras ornare.',
    imageUrl:
      'https://cdn.prod.website-files.com/61113c4e9f23df7a39554118/61142cfbd91be63c9f5bf361_image-2-team-dark-template.jpg',
  },
  {
    id: 3,
    name: 'Matt Cannon',
    role: 'CTO',
    description: 'Mattis nunc sed blandit libero volutpat sed cras ornare.',
    imageUrl:
      'https://cdn.prod.website-files.com/61113c4e9f23df7a39554118/61142cf695d7c54d5471a413_image-3-team-dark-template.jpg',
  },
  {
    id: 4,
    name: 'James Breslin',
    role: 'CMO',
    description: 'Mattis nunc sed blandit libero volutpat sed cras ornare.',
    imageUrl:
      'https://cdn.prod.website-files.com/61113c4e9f23df7a39554118/61142cf0c348f584d108bb14_image-4-team-dark-template.jpg',
  },
];

// --- Team Card ---
const TeamCard = ({ name, role, description, imageUrl }) => {
  return (
    <div
      className="group cursor-pointer relative flex flex-col items-center rounded-xl
                
transition duration-300 ease-in-out transform
hover:-translate-y-2 hover:shadow-xlmb-5"
    >
      <div
        className="group cursor-pointer relative flex flex-col items-center rounded-xl
                 bg-[#302c3f] backdrop-blur-sm border border-white/10
                px-10 py-9
mb-5"
      >
        {/* Role Badge */}
        <span className="absolute top-4 right-4 text-white text-xs font-semibold px-3 py-1 rounded-full opacity-90 border border-purple-500 bg-transparent">
          {role}
        </span>

        {/* Profile Image */}
        <div className="w-52 h-52 rounded-full overflow-hidden border-4 border-purple-500 flex items-center justify-center mb-4">
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Name */}
      <h3 className="text-xl font-semibold mb-2 text-white bg-transparent transition duration-300 group-hover:text-pink-600">
        {name}
      </h3>

      {/* Description */}
      <p className="text-lg text-gray-400 text-center bg-transparent">
        {description}
      </p>
    </div>
  );
};

// --- Leadership Team Section ---
const LeadershipTeam = () => {
  return (
    <section className="py-20 px-4 text-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="text-center mb-16">
          <h1 className="text-4xl font-extrabold mb-4">Leadership Team</h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Mattis nunc sed blandit libero volutpat sed cras ornare arcu a diam
            sollicitudin tempor id eu mattis vulputate
          </p>
        </header>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map(member => (
            <TeamCard
              key={member.id}
              name={member.name}
              role={member.role}
              description={member.description}
              imageUrl={member.imageUrl}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default LeadershipTeam;
