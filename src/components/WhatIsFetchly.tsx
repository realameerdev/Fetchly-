/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ArrowRight, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';

export const WhatIsFetchly: React.FC = () => {
  return (
    <section id="what-is-fetchly" className="py-24 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Clear Explanation */}
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-bold uppercase tracking-wider text-[#EB4423]">
              What is Fetchly?
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.15]">
              Turn valuable online content into files you own forever.
            </h2>
            <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
              Fetchly helps users turn useful online content into files they can download, save, share, or use elsewhere. Instead of struggling with broken browser printing, messy copy-paste formatting, or vanishing webpages, Fetchly extracts the real content and formats it instantly.
            </p>
            <p className="text-base text-slate-500 font-normal leading-relaxed">
              Whether you need to convert an investigative article into a clean PDF, extract documentation into Markdown for your personal notes, or pull plain TXT for data processing, Fetchly does the heavy lifting in seconds.
            </p>

            <div className="pt-2 flex flex-wrap gap-4">
              <a
                href="#supported-formats"
                className="inline-flex items-center gap-2 text-sm font-bold text-[#EB4423] hover:text-[#d43a1a]"
              >
                <span>View all 5 supported formats</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Right Column: Visual Feature Breakdown */}
          <div className="lg:col-span-6">
            <div className="bg-[#F6F7F9] rounded-3xl p-7 sm:p-9 border border-slate-200/80 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200/70">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Supported Input & Output Matrix
                </span>
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                  100% Client Clean
                </span>
              </div>

              <div className="space-y-3">
                {[
                  { name: 'PDF Document', desc: 'Clean, distraction-free document for printing & reading', speed: '0.4s' },
                  { name: 'Markdown Syntax', desc: 'Structured headers, bullet lists, and code blocks', speed: '0.2s' },
                  { name: 'Plain Text (TXT)', desc: 'Pure unformatted body copy stripped of all advertising', speed: '0.1s' },
                  { name: 'HTML Archive', desc: 'Self-contained webpage bundle with inlined styling', speed: '0.3s' },
                  { name: 'PNG Screenshot', desc: 'High-DPI full-page visual capture of live viewport', speed: '0.8s' },
                ].map((item, idx) => (
                  <div 
                    key={idx}
                    className="bg-white rounded-2xl p-4 border border-slate-200/70 flex items-center justify-between shadow-2xs hover:border-orange-300 transition-colors"
                  >
                    <div className="space-y-0.5">
                      <div className="text-sm font-extrabold text-slate-900">{item.name}</div>
                      <div className="text-xs text-slate-500 font-medium">{item.desc}</div>
                    </div>
                    <span className="text-xs font-bold text-[#EB4423] bg-orange-50 px-2.5 py-1 rounded-xl shrink-0">
                      {item.speed}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
