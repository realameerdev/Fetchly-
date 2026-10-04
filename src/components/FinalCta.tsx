/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ArrowUpRight } from 'lucide-react';

interface FinalCtaProps {
  onTryClick: () => void;
}

export const FinalCta: React.FC<FinalCtaProps> = ({ onTryClick }) => {
  return (
    <section className="py-28 bg-white text-center relative overflow-hidden">
      {/* Radiant ambient glow on final CTA matching reference header */}
      <div 
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] opacity-25 blur-3xl pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 100%, rgba(235, 68, 35, 0.4) 0%, rgba(255, 120, 50, 0.15) 50%, transparent 80%)'
        }}
      />

      <div className="max-w-4xl mx-auto px-6 relative z-10 space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 border border-orange-200/80 mb-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#EB4423]" />
          <span className="text-xs font-bold text-[#EB4423]">Instant Conversion Engine</span>
        </div>

        <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight">
          Have a URL? Fetch it.
        </h2>

        <p className="text-lg sm:text-xl text-slate-500 max-w-xl mx-auto leading-relaxed">
          Turn useful web content into a file in just a few clicks.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onTryClick}
            className="w-full sm:w-auto px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold rounded-full shadow-md hover:shadow-lg transition-all inline-flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Try Fetchly</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
          <a
            href="#supported-formats"
            className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 text-sm font-bold rounded-full shadow-xs hover:border-slate-300 transition-all inline-flex items-center justify-center gap-2"
          >
            <span>Explore Formats</span>
            <ArrowUpRight className="w-4 h-4 text-slate-400" />
          </a>
        </div>
      </div>
    </section>
  );
};
