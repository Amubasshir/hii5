import Banner from '@/components/Banner';
import FeaturesGrid from '@/components/FeaturesGrid';

import GettingStarted from '@/components/GettingStarted';
import LatestArticles from '@/components/LatestArticles';

import SecurityCard from '@/components/SecurityCard';
import TestimonialCarousel from '@/components/TestimonialCarousel';
import TradingCTA from '@/components/TradingCTA';
import TradingPromo from '@/components/TradingPromo';

export default function Home() {
  return (
    <div className="bg-[#0B0A13]">
      <Banner></Banner>
      <FeaturesGrid></FeaturesGrid>
      <TradingPromo></TradingPromo>
      <SecurityCard></SecurityCard>
      <TradingCTA></TradingCTA>
      <GettingStarted></GettingStarted>
      <TestimonialCarousel></TestimonialCarousel>
      <LatestArticles></LatestArticles>
      <TradingCTA></TradingCTA>
    </div>
  );
}
