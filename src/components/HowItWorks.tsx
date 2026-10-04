/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Link as LinkIcon, SlidersHorizontal, Download } from 'lucide-react';
import { SilkReveal } from './SilkReveal';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      number: '01',
      title: 'Paste',
      lead: 'Paste the public URL you want to convert.',
      desc: 'Copy any web link—an article, documentation page, news report, or blog post—and paste it straight into the Fetchly input field.',
      icon: <LinkIcon className="w-5 h-5 text-[#EB4423]" />
    },
    {
      number: '02',
      title: 'Choose',
      lead: 'Select the file format you need.',
      desc: 'Pick your desired output: PDF for clean reading, Markdown for writing and Obsidian, TXT for raw text, HTML for archiving, or PNG for visual capture.',
      icon: <SlidersHorizontal className="w-5 h-5 text-[#EB4423]" />
    },
    {
      number: '03',
      title: 'Fetch',
      lead: 'Fetchly processes the URL and gives you a downloadable file.',
      desc: 'Our engine cleans away cookie banners, sidebars, and ads, compiles the clean file in milliseconds, and delivers your instant download.',
      icon: <Download className="w-5 h-5 text-[#EB4423]" />
    },
  ];

  return (
    <section id="how-it-works" className="py-24 bg-[#FAFAFB] border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-6">
        <SilkReveal delay={0} className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Effortless Flow
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            How It Works
          </h2>
          <p className="text-base text-slate-500 font-normal">
            Three simple steps to transform web links into permanently useful files.
          </p>
        </SilkReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, idx) => (
            <SilkReveal key={idx} delay={idx * 120} className="h-full">
              <div className="h-full bg-white rounded-3xl p-8 border border-slate-200/80 shadow-xs hover:shadow-lg hover:border-orange-300 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between relative group">
                <div>
                  {/* Prominent, visually strong 01 / 02 / 03 number */}
                  <div className="flex items-center justify-between mb-8">
                    <span className="text-5xl sm:text-6xl font-black text-slate-200 group-hover:text-[#EB4423]/20 transition-colors font-['Manrope'] select-none">
                      {step.number}
                    </span>
                    <div className="w-10 h-10 rounded-2xl bg-orange-50 border border-orange-200/60 flex items-center justify-center shrink-0">
                      {step.icon}
                    </div>
                  </div>

                  <div className="text-xs font-bold uppercase tracking-wider text-[#EB4423] mb-1">
                    Step {step.number}
                  </div>
                  <h3 className="text-2xl font-extrabold text-slate-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm font-bold text-slate-800 mb-2 leading-snug">
                    {step.lead}
                  </p>
                  <p className="text-xs text-slate-500 font-normal leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-400">
                  <span>Phase {idx + 1} of 3</span>
                  <span className="text-slate-900 font-bold">Fast Execution</span>
                </div>
              </div>
            </SilkReveal>
          ))}
        </div>
      </div>
    </section>
  );
};
