import FeaturedGames from '@/components/sections/FeaturedGames';
import HomeBanner from '@/components/sections/HomeBanner';
import TopGames from '@/components/sections/TopGames';
import React from 'react';

function page() {
  return (
    <div>
      <h1 className="text-3xl font-medium font-secondary   text-txt-primary ">
        Hey,<span className="text-primary mb-5">Welcome</span>
      </h1>
      <HomeBanner />
      <FeaturedGames />
      <TopGames />
    </div>
  );
}

export default page;
