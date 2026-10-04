/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  Zap, 
  Sliders, 
  FileCheck, 
  Layers, 
  Smile, 
  ShieldCheck 
} from 'lucide-react';
import { SilkReveal } from './SilkReveal';

export const WhyFetchly: React.FC = () => {
  const benefits = [
    {
      title: 'No complicated workflow',
      desc: 'No headless browser installations, no Python scripts to manage, and no command-line flags. Just paste and get your file.',
      icon: <Sliders className="w-4 h-4 text-[#EB4423]" />
    },
    {
      title: 'No manual copying and formatting',
      desc: 'Say goodbye to copying messy webpage text, fixing broken line breaks, re-adding hyperlinks, and manually formatting headings.',
      icon: <FileCheck className="w-4 h-4 text-[#EB4423]" />
    },
    {
      title: 'Quick URL-to-file conversion',
      desc: 'Engineered for sub-second performance. From URL submission to downloadable file ready on your device in under 500ms.',
      icon: <Zap className="w-4 h-4 text-[#EB4423]" />
    },
    {
      title: 'Clean output',
      desc: 'Intelligent heuristic parsers automatically strip cookie banners, tracking scripts, intrusive advertising, and sticky navigation headers.',
      icon: <ShieldCheck className="w-4 h-4 text-[#EB4423]" />
    },
    {
      title: 'Multiple useful formats',
      desc: 'One universal engine providing 5 versatile file outputs: PDF, Markdown, TXT, HTML, and high-resolution PNG.',
      icon: <Layers className="w-4 h-4 text-[#EB4423]" />
    },
    {
      title: 'Simple interface',
      desc: 'A minimal, distraction-free interface with zero learning curve. Clean typography, obvious controls, and zero clutter.',
      icon: <Smile className="w-4 h-4 text-[#EB4423]" />
    },
  ];

  return (
    <section id="why-fetchly" className="py-24 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column */}
          <SilkReveal direction="left" delay={0} className="lg:col-span-5 lg:sticky lg:top-24 space-y-6">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Benefits
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.12]">
              Unlock a New Era of Effortless URL Archiving & Conversion
            </h2>
            <p className="text-base text-slate-500 font-normal leading-relaxed">
              Unlock speed, consistency, and clean file creation with our automated parsing engine designed to strip away web bloat.
            </p>

            {/* Pill Tags Row */}
            <div className="flex flex-wrap gap-2 pt-2">
              {[
                'Robust Security',
                'Clean Formatting',
                'Instant Engine',
                'Automated Efficiency',
                'No Sign-up'
              ].map((pill, idx) => (
                <span 
                  key={idx}
                  className="px-3.5 py-1.5 bg-[#F6F7F9] border border-slate-200/80 rounded-full text-xs font-semibold text-slate-700 hover:border-orange-300 transition-colors"
                >
                  {pill}
                </span>
              ))}
            </div>
          </SilkReveal>

          {/* Right Column: Stacked Benefit Cards */}
          <div className="lg:col-span-7 space-y-4">
            {benefits.map((benefit, idx) => (
              <SilkReveal key={idx} delay={idx * 70} direction="right">
                <div 
                  className="flex items-start gap-4 p-5 rounded-2xl bg-[#F6F7F9]/60 hover:bg-[#F6F7F9] border border-slate-200/60 hover:border-orange-200 hover:shadow-xs transition-all duration-300 group"
                >
                  <div className="w-8 h-8 rounded-xl bg-orange-50 border border-orange-200/80 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-[#EB4423] group-hover:text-white transition-colors text-[#EB4423]">
                    {benefit.icon}
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-lg font-extrabold text-slate-900">
                      {benefit.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 font-normal leading-relaxed">
                      {benefit.desc}
                    </p>
                  </div>
                </div>
              </SilkReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
