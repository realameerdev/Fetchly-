/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { FileText, Code, FileCode, Globe, Download, Check, Eye } from 'lucide-react';
import { OutputFormat } from './ConversionTool';
import { FilePreviewModal } from './FilePreviewModal';
import { SilkReveal } from './SilkReveal';

export const SupportedFormats: React.FC = () => {
  const [previewModalFormat, setPreviewModalFormat] = useState<OutputFormat | null>(null);

  return (
    <section id="supported-formats" className="py-24 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header matching Reference Image */}
        <SilkReveal delay={0} className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Valuable Formats
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            Clean Solutions for Every File Need
          </h2>
          <p className="text-base text-slate-500 font-normal">
            Fetchly parses complex websites and generates clean, distraction-free files. Preview any format before downloading.
          </p>
        </SilkReveal>

        {/* 5-Card Grid: 3 on Top Row, 2 on Bottom Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* Card 1: PDF */}
          <SilkReveal delay={80} className="h-full">
            <div className="h-full bg-[#F6F7F9] rounded-3xl p-6 sm:p-7 border border-slate-200/60 flex flex-col justify-between hover:border-orange-300 hover:shadow-md hover:-translate-y-1 transition-all duration-300 group">
              <div>
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-extrabold text-slate-900">
                    PDF Documents
                  </h3>
                  <div className="w-8 h-8 rounded-full bg-orange-100 text-[#EB4423] flex items-center justify-center shrink-0">
                    <FileText className="w-4 h-4" />
                  </div>
                </div>
                <p className="text-xs text-slate-500 font-medium leading-relaxed mb-6">
                  Clean document version optimized for reading, printing, and permanent archival.
                </p>
              </div>

              {/* Inset White Mockup Card */}
              <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs space-y-2.5">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100 text-[10px] text-slate-400 font-medium">
                  <span>document_export.pdf</span>
                  <span className="text-[#EB4423] font-bold">Page 1 of 4</span>
                </div>
                <div className="h-2.5 bg-slate-900 rounded-sm w-3/4" />
                <div className="space-y-1.5 pt-1">
                  <div className="h-1.5 bg-slate-200 rounded-sm w-full" />
                  <div className="h-1.5 bg-slate-200 rounded-sm w-5/6" />
                  <div className="h-1.5 bg-slate-200 rounded-sm w-4/6" />
                </div>
                <div className="pt-2 flex items-center justify-between text-[10px] text-slate-500">
                  <span>Vector Typography</span>
                  <button
                    type="button"
                    onClick={() => setPreviewModalFormat('PDF')}
                    className="font-bold text-[#EB4423] hover:text-[#d43a1a] inline-flex items-center gap-1 cursor-pointer"
                  >
                    <Eye className="w-3 h-3" />
                    <span>Preview PDF</span>
                  </button>
                </div>
              </div>
            </div>
          </SilkReveal>

          {/* Card 2: Markdown */}
          <SilkReveal delay={160} className="h-full">
            <div className="h-full bg-[#F6F7F9] rounded-3xl p-6 sm:p-7 border border-slate-200/60 flex flex-col justify-between hover:border-orange-300 hover:shadow-md hover:-translate-y-1 transition-all duration-300 group">
              <div>
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-extrabold text-slate-900">
                    Markdown Syntax
                  </h3>
                  <div className="w-8 h-8 rounded-full bg-orange-100 text-[#EB4423] flex items-center justify-center shrink-0">
                    <Code className="w-4 h-4" />
                  </div>
                </div>
                <p className="text-xs text-slate-500 font-medium leading-relaxed mb-6">
                  Structured content for developers, Obsidian, Notion, and technical writers.
                </p>
              </div>

              {/* Inset White Mockup Card */}
              <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs text-[11px] space-y-1.5 text-slate-700">
                <div className="text-[#EB4423] font-bold"># Architecture Plan</div>
                <div className="text-slate-500 text-[10px]">## Core Extraction Engine</div>
                <div className="text-[10px] text-slate-600">- [x] Clean semantic parsing</div>
                <div className="pt-2 flex items-center justify-between border-t border-slate-100">
                  <span className="text-[10px] text-slate-400">Syntax Highlighted</span>
                  <button
                    type="button"
                    onClick={() => setPreviewModalFormat('Markdown')}
                    className="font-bold text-[#EB4423] hover:text-[#d43a1a] inline-flex items-center gap-1 cursor-pointer"
                  >
                    <Eye className="w-3 h-3" />
                    <span>Preview .md</span>
                  </button>
                </div>
              </div>
            </div>
          </SilkReveal>

          {/* Card 3: Plain TXT */}
          <SilkReveal delay={240} className="h-full">
            <div className="h-full bg-[#F6F7F9] rounded-3xl p-6 sm:p-7 border border-slate-200/60 flex flex-col justify-between hover:border-orange-300 hover:shadow-md hover:-translate-y-1 transition-all duration-300 group">
              <div>
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-extrabold text-slate-900">
                    Plain TXT Text
                  </h3>
                  <div className="w-8 h-8 rounded-full bg-orange-100 text-[#EB4423] flex items-center justify-center shrink-0">
                    <FileText className="w-4 h-4" />
                  </div>
                </div>
                <p className="text-xs text-slate-500 font-medium leading-relaxed mb-6">
                  Pure unformatted text stripped of code tags, ads, and cookies for fast reading.
                </p>
              </div>

              {/* Inset White Mockup Card */}
              <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs space-y-2">
                <div className="flex items-center justify-between text-[10px] font-bold text-slate-500">
                  <span>extracted_plain.txt</span>
                  <span className="text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">0 KB bloat</span>
                </div>
                <p className="text-[11px] text-slate-600 leading-snug line-clamp-3">
                  Web scraping is data scraping used for extracting data from websites. Fetchly isolates the core prose...
                </p>
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px]">
                  <span className="text-slate-400">1,420 words</span>
                  <button
                    type="button"
                    onClick={() => setPreviewModalFormat('TXT')}
                    className="font-bold text-[#EB4423] hover:text-[#d43a1a] inline-flex items-center gap-1 cursor-pointer"
                  >
                    <Eye className="w-3 h-3" />
                    <span>Preview TXT</span>
                  </button>
                </div>
              </div>
            </div>
          </SilkReveal>
        </div>

        {/* Bottom Row: 2 Wider Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 4: HTML */}
          <SilkReveal delay={120} className="h-full">
            <div className="h-full bg-[#F6F7F9] rounded-3xl p-6 sm:p-8 border border-slate-200/60 flex flex-col justify-between hover:border-orange-300 hover:shadow-md hover:-translate-y-1 transition-all duration-300 group">
              <div>
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-xl font-extrabold text-slate-900">
                      HTML Structure
                    </h3>
                    <p className="text-xs text-slate-500 font-medium leading-relaxed mt-1">
                      Downloadable standalone webpage structure with bundled styling for offline access.
                    </p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-orange-100 text-[#EB4423] flex items-center justify-center shrink-0">
                    <FileCode className="w-4 h-4" />
                  </div>
                </div>
              </div>

              {/* Inset White Mockup Card */}
              <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs mt-6">
                <div className="flex items-center justify-between gap-2 pb-3 border-b border-slate-100 text-xs font-semibold text-slate-700 min-w-0">
                  <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
                    <span className="w-2 h-2 rounded-full bg-[#EB4423] shrink-0" />
                    <span className="truncate">standalone_archive.html</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setPreviewModalFormat('HTML')}
                    className="font-bold text-[#EB4423] hover:text-[#d43a1a] inline-flex items-center gap-1 cursor-pointer text-xs shrink-0 whitespace-nowrap"
                  >
                    <Eye className="w-3 h-3 shrink-0" />
                    <span className="hidden sm:inline">Preview HTML</span>
                    <span className="sm:hidden">Preview</span>
                  </button>
                </div>
                <div className="pt-3 grid grid-cols-3 gap-2 sm:gap-3 text-center">
                  <div className="p-2 sm:p-2.5 bg-slate-50 rounded-xl">
                    <span className="text-[9px] sm:text-[10px] text-slate-400 block font-medium truncate">DOM Elements</span>
                    <span className="text-xs sm:text-sm font-extrabold text-slate-900 truncate block">148 Nodes</span>
                  </div>
                  <div className="p-2 sm:p-2.5 bg-slate-50 rounded-xl">
                    <span className="text-[9px] sm:text-[10px] text-slate-400 block font-medium truncate">Images Inlined</span>
                    <span className="text-xs sm:text-sm font-extrabold text-slate-900 truncate block">12 Assets</span>
                  </div>
                  <div className="p-2 sm:p-2.5 bg-slate-50 rounded-xl">
                    <span className="text-[9px] sm:text-[10px] text-slate-400 block font-medium truncate">Load Time</span>
                    <span className="text-xs sm:text-sm font-extrabold text-emerald-600 truncate block">0.05s</span>
                  </div>
                </div>
              </div>
            </div>
          </SilkReveal>

          {/* Card 5: PNG */}
          <SilkReveal delay={200} className="h-full">
            <div className="h-full bg-[#F6F7F9] rounded-3xl p-6 sm:p-8 border border-slate-200/60 flex flex-col justify-between hover:border-orange-300 hover:shadow-md hover:-translate-y-1 transition-all duration-300 group">
              <div>
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-xl font-extrabold text-slate-900">
                      PNG Screenshot
                    </h3>
                    <p className="text-xs text-slate-500 font-medium leading-relaxed mt-1">
                      High-resolution, full-page webpage screenshot capturing the exact visual layout.
                    </p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-orange-100 text-[#EB4423] flex items-center justify-center shrink-0">
                    <Globe className="w-4 h-4" />
                  </div>
                </div>
              </div>

              {/* Inset White Mockup Card */}
              <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs mt-6">
                <div className="flex items-center justify-between gap-2 pb-3 border-b border-slate-100 text-xs font-semibold text-slate-700 min-w-0">
                  <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                    <span className="truncate">full_page_capture.png</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setPreviewModalFormat('PNG')}
                    className="font-bold text-[#EB4423] hover:text-[#d43a1a] inline-flex items-center gap-1 cursor-pointer text-xs shrink-0 whitespace-nowrap"
                  >
                    <Eye className="w-3 h-3 shrink-0" />
                    <span className="hidden sm:inline">Preview PNG</span>
                    <span className="sm:hidden">Preview</span>
                  </button>
                </div>
                <div className="pt-3 flex flex-wrap items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <span className="px-2 py-0.5 sm:py-1 bg-slate-100 rounded text-[10px] sm:text-[11px] font-bold text-slate-700 shrink-0">2x Retina</span>
                    <span className="text-slate-400 text-[11px] sm:text-xs">Lossless compression</span>
                  </div>
                  <span className="font-extrabold text-slate-900 text-xs shrink-0">1.8 MB</span>
                </div>
              </div>
            </div>
          </SilkReveal>
        </div>
      </div>

      {/* Preview Modal for any clicked format */}
      {previewModalFormat && (
        <FilePreviewModal
          isOpen={true}
          onClose={() => setPreviewModalFormat(null)}
          sourceUrl="https://en.wikipedia.org/wiki/Web_scraping"
          initialFormat={previewModalFormat}
        />
      )}
    </section>
  );
};
