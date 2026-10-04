/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Check } from 'lucide-react';
import { ConversionTool } from './ConversionTool';

interface HeroProps {
  onCtaClick?: () => void;
}

export const Hero: React.FC<HeroProps> = () => {
  return (
    <section className="relative pt-24 pb-16 sm:pt-28 sm:pb-20 md:pt-36 md:pb-24 overflow-hidden text-center bg-[#FAF8F5]">
      {/* Subtle warm cream background illumination */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[420px] pointer-events-none bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(254,215,170,0.35),rgba(250,248,245,0))] -z-10" 
        aria-hidden="true"
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Top badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 border border-orange-200/80 shadow-2xs mb-8 sm:mb-9">
          <span className="text-xs sm:text-sm font-bold text-[#EB4423]">New</span>
          <span className="w-1.5 h-1.5 rounded-full bg-orange-400" />
          <span className="text-xs sm:text-sm font-medium text-slate-800">Instant URL-to-File Engine</span>
        </div>

        {/* Main headline */}
        <div className="relative mx-auto">
          <h1 className="font-['Outfit',sans-serif] text-6xl sm:text-7xl md:text-8xl lg:text-[100px] xl:text-[108px] font-black tracking-[-0.045em] text-[#0B0F19] leading-[0.91] text-balance">
            <span className="block">Turn URLs</span>
            <span className="block mt-1 sm:mt-2">into files.</span>
          </h1>
        </div>

        {/* Supporting text */}
        <p className="mt-7 sm:mt-9 font-['Manrope',sans-serif] text-base sm:text-lg md:text-xl text-[#526071] font-normal leading-relaxed max-w-xl mx-auto text-balance">
          Paste a public URL, choose the format you need, and Fetchly turns it into a clean, downloadable file.
        </p>

        {/* Three compact benefits */}
        <div className="flex flex-wrap items-center justify-center gap-x-7 sm:gap-x-9 gap-y-3 mt-8 sm:mt-10 text-xs sm:text-sm font-medium text-slate-700 max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-2 whitespace-nowrap">
            <span className="w-5 h-5 rounded-full bg-[#FFEDD5] text-[#EB4423] flex items-center justify-center shrink-0">
              <Check className="w-3 h-3 stroke-[2.5]" />
            </span>
            <span>Clean Formatting</span>
          </span>
          <span className="inline-flex items-center gap-2 whitespace-nowrap">
            <span className="w-5 h-5 rounded-full bg-[#FFEDD5] text-[#EB4423] flex items-center justify-center shrink-0">
              <Check className="w-3 h-3 stroke-[2.5]" />
            </span>
            <span>Instant Conversion</span>
          </span>
          <span className="inline-flex items-center gap-2 whitespace-nowrap">
            <span className="w-5 h-5 rounded-full bg-[#FFEDD5] text-[#EB4423] flex items-center justify-center shrink-0">
              <Check className="w-3 h-3 stroke-[2.5]" />
            </span>
            <span>Zero Sign-up Required</span>
          </span>
        </div>

        {/* Whitespace before conversion interface */}
        <div id="hero-converter" className="mt-16 sm:mt-24 relative max-w-3xl mx-auto">
          <ConversionTool />
        </div>
      </div>
    </section>
  );
};
