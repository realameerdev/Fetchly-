/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  FileText, 
  Code, 
  BookOpen, 
  Archive, 
  Globe, 
  WifiOff, 
  GraduationCap
} from 'lucide-react';
import { SilkReveal } from './SilkReveal';

export const UseCases: React.FC = () => {
  const cases = [
    {
      title: 'Save an article as a PDF',
      desc: 'Convert long-form journalism, newsletters, and in-depth guides into distraction-free, print-ready PDF files.',
      icon: <FileText className="w-5 h-5 text-[#EB4423]" />,
      formatBadge: 'PDF'
    },
    {
      title: 'Turn a webpage into Markdown',
      desc: 'Export API docs, tutorials, and Github wikis directly into structured Markdown for Obsidian, Notion, or Cursor.',
      icon: <Code className="w-5 h-5 text-[#EB4423]" />,
      formatBadge: 'Markdown'
    },
    {
      title: 'Extract readable text from a webpage',
      desc: 'Strip away header bars, floating ads, cookie modals, and sidebars to get pure, unadulterated text for quick reading.',
      icon: <BookOpen className="w-5 h-5 text-[#EB4423]" />,
      formatBadge: 'TXT'
    },
    {
      title: 'Archive useful online resources',
      desc: 'Never worry about 404 dead links or paywalls changing later. Keep permanent, timestamped local records.',
      icon: <Archive className="w-5 h-5 text-[#EB4423]" />,
      formatBadge: 'HTML / PDF'
    },
    {
      title: 'Create a screenshot of a webpage',
      desc: 'Capture full-height, 2x Retina PNG screenshots of live website designs for design teardowns, QA, and inspiration.',
      icon: <Globe className="w-5 h-5 text-[#EB4423]" />,
      formatBadge: 'PNG'
    },
    {
      title: 'Save online content for offline use',
      desc: 'Going on a flight or traveling off-grid? Download travel itineraries, documentation, and research for offline access.',
      icon: <WifiOff className="w-5 h-5 text-[#EB4423]" />,
      formatBadge: 'All Formats'
    },
    {
      title: 'Turn web resources into files for projects & research',
      desc: 'Assemble primary web sources into organized file folders for thesis research, market analysis, and product reviews.',
      icon: <GraduationCap className="w-5 h-5 text-[#EB4423]" />,
      formatBadge: 'Research Pack'
    },
  ];

  return (
    <section id="use-cases" className="py-24 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-6">
        <SilkReveal delay={0} className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Everyday Utility
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            What Can You Use Fetchly For?
          </h2>
          <p className="text-base text-slate-500 font-normal">
            Whether for deep work, research collections, or daily reading, Fetchly simplifies your web workflow.
          </p>
        </SilkReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cases.map((item, idx) => (
            <SilkReveal key={idx} delay={idx * 70} className="h-full">
              <div 
                className={`h-full bg-[#F6F7F9] rounded-3xl p-7 border border-slate-200/60 hover:bg-white hover:border-orange-300 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between ${
                  idx === 6 ? 'md:col-span-2 lg:col-span-1' : ''
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-10 h-10 rounded-2xl bg-white border border-slate-200/80 flex items-center justify-center shadow-2xs">
                      {item.icon}
                    </div>
                    <span className="text-[11px] font-bold text-slate-600 bg-white border border-slate-200/70 px-2.5 py-1 rounded-full shadow-2xs">
                      {item.formatBadge}
                    </span>
                  </div>

                  <h3 className="text-lg font-extrabold text-slate-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-500 font-normal leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-slate-200/50 flex items-center justify-between text-[11px] font-semibold text-slate-400">
                  <span>Available Format</span>
                  <span className="text-slate-800 font-bold">{item.formatBadge}</span>
                </div>
              </div>
            </SilkReveal>
          ))}
        </div>
      </div>
    </section>
  );
};
