import React from 'react';
import Providers from "@/components/Providers";
import MainLayout from "@/components/layout/MainLayout";
import HomeHero from "@/components/home/HomeHero";
import SocialProof from "@/components/SocialProof";
import CentroSwitcher from "@/components/home/CentroSwitcher";
import PromiseSection from "@/components/home/PromiseSection";
import Reviews from "@/components/Reviews";
import HomeFAQLinks from "@/components/home/HomeFAQLinks";
import BigCTA from "@/components/BigCTA";

import "../landing.css";

export default function Home() {
  return (
    <div className="landing-wrapper">
      <Providers>
        <MainLayout>
          <HomeHero />
          <SocialProof />
          <CentroSwitcher />
          <PromiseSection />
          <Reviews />
          <HomeFAQLinks />
          <BigCTA showCenterLinks />
        </MainLayout>
      </Providers>
    </div>
  );
}
