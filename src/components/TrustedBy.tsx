/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Zap, Check } from 'lucide-react';
import { SilkReveal } from './SilkReveal';

export const TrustedBy: React.FC = () => {
  return (
    <div className="py-12 border-y border-slate-100 bg-white">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <SilkReveal delay={0} distance={20}>
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-8">
            Join 12,000+ researchers, developers & writers archiving the web
          </p>

          {/* Minimalist monochrome brand marks */}
          <div className="flex flex-wrap items-center justify-center gap-10 sm:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all">
            <div className="flex items-center gap-2 text-slate-700 font-extrabold text-base tracking-tight">
              <span className="w-5 h-5 rounded-full border-2 border-slate-700 flex items-center justify-center text-[10px]">G</span>
              <span>Grapho</span>
            </div>

            <div className="flex items-center gap-2 text-slate-700 font-extrabold text-base tracking-tight">
              <span className="w-5 h-5 rounded-full border-2 border-slate-700 flex items-center justify-center text-[10px] font-bold">S</span>
              <span>Signum.</span>
            </div>

            <div className="flex items-center gap-2 text-slate-700 font-extrabold text-base tracking-tight">
              <span className="w-4 h-4 bg-slate-700 rotate-45 inline-block" />
              <span>Vectra</span>
            </div>

            <div className="flex items-center gap-2 text-slate-700 font-extrabold text-base tracking-tight">
              <span className="w-5 h-5 rounded bg-slate-700 text-white flex items-center justify-center text-[10px]">
                <Check className="w-3 h-3 text-white" />
              </span>
              <span>Optimal</span>
            </div>

            <div className="flex items-center gap-2 text-slate-700 font-extrabold text-base tracking-tight">
              <span className="w-5 h-5 rounded-full bg-slate-700 text-white flex items-center justify-center">
                <Zap className="w-3 h-3 text-white fill-white" />
              </span>
              <span>Zenith</span>
            </div>
          </div>
        </SilkReveal>
      </div>
    </div>
  );
};
