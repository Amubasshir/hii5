import React from 'react';

import StatsSection from '@/Abouts/AboutBanner';

import ValuesSection from '@/Abouts/ValuesSection';
import VisitUsSection from '@/Abouts/VisitUsSection';
import LeadershipTeam from '@/Abouts/LeadershipTeam';
import PartnersGrid from '@/Abouts/PartnersGrid';

const About = () => {
  return (
    <div className="bg-[#0B0A13]">
      <StatsSection></StatsSection>
      <ValuesSection></ValuesSection>
      <VisitUsSection></VisitUsSection>
      <LeadershipTeam></LeadershipTeam>
      <PartnersGrid></PartnersGrid>
    </div>
  );
};

export default About;
