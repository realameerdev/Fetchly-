/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AmbientGlow } from './components/AmbientGlow';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TrustedBy } from './components/TrustedBy';
import { WhatIsFetchly } from './components/WhatIsFetchly';
import { SupportedFormats } from './components/SupportedFormats';
import { HowItWorks } from './components/HowItWorks';
import { UseCases } from './components/UseCases';
import { WhyFetchly } from './components/WhyFetchly';
import { ProductPreview } from './components/ProductPreview';
import { FinalCta } from './components/FinalCta';
import { Footer } from './components/Footer';

export default function App() {
  const scrollToHeroConverter = () => {
    const el = document.getElementById('hero-converter');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      const input = el.querySelector('input');
      if (input) input.focus();
    }
  };

  return (
    <div className="relative min-h-screen bg-[#FAF8F5] text-slate-900 font-['Manrope',sans-serif] selection:bg-[#EB4423] selection:text-white antialiased overflow-x-hidden">
      {/* Radiant ambient flare from reference design */}
      <AmbientGlow />

      <Navbar onTryClick={scrollToHeroConverter} />

      <main className="relative z-10">
        {/* 1. HERO with conversion interface */}
        <Hero onCtaClick={scrollToHeroConverter} />

        {/* Minimal Monochrome Brand/Trust Bar matching reference */}
        <TrustedBy />

        {/* 2. WHAT IS FETCHLY */}
        <WhatIsFetchly />

        {/* 5. SUPPORTED FORMATS (5-card composition matching reference Valuable Features) */}
        <SupportedFormats />

        {/* 3. HOW IT WORKS (prominent 01, 02, 03 numbers) */}
        <HowItWorks />

        {/* 4. WHAT CAN YOU USE FETCHLY FOR (practical use cases) */}
        <UseCases />

        {/* 6. WHY FETCHLY (2-column layout matching bottom of reference image) */}
        <WhyFetchly />

        {/* 7. PRODUCT PREVIEW (realistic conversion workbench) */}
        <ProductPreview />

        {/* 8. FINAL CTA */}
        <FinalCta onTryClick={scrollToHeroConverter} />
      </main>

      {/* 9. FOOTER */}
      <Footer />
    </div>
  );
}
