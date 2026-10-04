/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  FileText, 
  Code, 
  Download, 
  Check, 
  Eye, 
  Layers, 
  FileCheck,
} from 'lucide-react';
import { OutputFormat } from './ConversionTool';
import { FilePreviewModal } from './FilePreviewModal';
import { downloadDocument } from '../utils/fileDownloader';

export const ProductPreview: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'preview' | 'code'>('preview');
  const [selectedFormat, setSelectedFormat] = useState<OutputFormat>('Markdown');
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);

  const targetUrl = 'https://techpulse.io/future-web-data';

  const sampleMarkdown = `# The Future of Open Web Data Extraction
*Published on TechPulse Insights · Converted via Fetchly*

> "The web is humanity's largest public library, yet saving clean copies remains unnecessarily difficult."

## 1. Executive Summary
Public web information frequently decays over time. Academic studies indicate that over **38% of web pages** created in 2013 are no longer accessible today. Fetchly addresses this digital fragility by converting dynamic URLs into permanent, structured offline documents.

### Key Conversion Metrics
- **Clutter Removed:** 74% (Cookie consent overlays, analytics beacons, floating banners)
- **Extracted Content:** 1,480 Words, 6 High-res Figures
- **Output File Size:** 38.4 KB (Markdown) / 410 KB (Vector PDF)

\`\`\`typescript
// Fetchly Heuristic Parser v2.4
const cleanDocument = await fetchly.convert({
  url: "https://techpulse.io/future-web-data",
  format: "markdown",
  stripAds: true,
  preserveFootnotes: true
});
\`\`\`

## 2. Next Steps
Users can save this file directly into local knowledge repositories or cloud backup buckets without formatting loss.`;

  const sampleTxt = `TITLE: The Future of Open Web Data Extraction
SOURCE: https://techpulse.io/future-web-data
CONVERTED VIA FETCHLY

OVERVIEW
Public web information frequently decays over time. Academic studies indicate that over 38% of web pages created in 2013 are no longer accessible today. Fetchly addresses this digital fragility by converting dynamic URLs into permanent, structured offline documents.

METRICS:
- Clutter Removed: 74%
- Extracted Words: 1,480 Words
- Output Format: Plain Text UTF-8

All advertisements, analytics scripts, and navigation bars have been stripped.`;

  const handleDownload = async () => {
    await downloadDocument({
      title: 'The Future of Open Web Data Extraction',
      domain: 'techpulse.io',
      sourceUrl: targetUrl,
      summary: 'Public web information frequently decays over time. Fetchly converts dynamic URLs into permanent, structured offline documents.',
      markdown: sampleMarkdown,
      plainText: sampleTxt,
    }, selectedFormat, 'techpulse_article');
  };

  return (
    <section className="py-20 sm:py-24 bg-[#FAFAFB] border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16 space-y-2.5 sm:space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Interface In Action
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            Product Preview
          </h2>
          <p className="text-sm sm:text-base text-slate-500 font-normal">
            Preview your converted file in any format before saving. A focused workspace built for clarity.
          </p>
        </div>

        {/* Desktop App Interface Frame */}
        <div className="max-w-5xl mx-auto bg-white rounded-2xl sm:rounded-3xl border border-slate-200 shadow-xl shadow-slate-900/10 overflow-hidden text-left">
          {/* Top Window Bar - Fully responsive layout without overlapping */}
          <div className="bg-slate-50 px-3 sm:px-6 py-3 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
            {/* Window controls + URL tag */}
            <div className="flex items-center justify-between sm:justify-start gap-2 min-w-0">
              <div className="flex items-center gap-1.5 shrink-0">
                <div className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                <div className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                <div className="w-2.5 h-2.5 rounded-full bg-slate-300" />
              </div>
              <div className="h-3.5 w-[1px] bg-slate-200 mx-0.5 hidden sm:block shrink-0" />
              <div className="flex items-center gap-1.5 px-2.5 py-1 bg-white border border-slate-200 rounded-lg text-[11px] sm:text-xs text-slate-600 font-semibold tracking-tight min-w-0 truncate">
                <span className="text-[#EB4423] font-bold shrink-0">GET</span>
                <span className="text-slate-400 truncate max-w-[170px] sm:max-w-none">{targetUrl}</span>
              </div>
            </div>

            {/* Action buttons: Tab toggle + Preview + Download */}
            <div className="flex items-center justify-between sm:justify-end gap-1.5 sm:gap-2">
              <div className="flex items-center bg-slate-200/70 p-0.5 rounded-lg text-[11px] sm:text-xs font-semibold shrink-0">
                <button
                  onClick={() => setActiveTab('preview')}
                  className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                    activeTab === 'preview'
                      ? 'bg-white text-slate-900 shadow-2xs font-bold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Formatted
                </button>
                <button
                  onClick={() => setActiveTab('code')}
                  className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                    activeTab === 'code'
                      ? 'bg-white text-slate-900 shadow-2xs font-bold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Syntax
                </button>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  type="button"
                  onClick={() => setIsPreviewModalOpen(true)}
                  className="px-2.5 sm:px-3 py-1 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 text-[11px] sm:text-xs font-bold rounded-lg transition-all flex items-center gap-1 cursor-pointer shadow-2xs whitespace-nowrap"
                  title="Open full interactive preview"
                >
                  <Eye className="w-3.5 h-3.5 text-[#EB4423]" />
                  <span>Preview</span>
                </button>

                <button
                  onClick={handleDownload}
                  className="px-3 py-1 bg-[#EB4423] hover:bg-[#d43a1a] text-white text-[11px] sm:text-xs font-bold rounded-lg transition-all flex items-center gap-1 cursor-pointer shadow-xs whitespace-nowrap"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export {selectedFormat}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Sub-header Toolbar: Fluid layout with horizontal format strip */}
          <div className="px-3 sm:px-6 py-2 bg-slate-50/70 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-500 font-medium">
            {/* Status indicators */}
            <div className="flex items-center gap-2 text-[11px] sm:text-xs min-w-0">
              <span className="flex items-center gap-1 font-semibold text-slate-700 shrink-0">
                <FileCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Clean Parse</span>
                <span className="text-slate-400 font-normal">(0.34s)</span>
              </span>
              <span className="text-slate-300">·</span>
              <span className="truncate">1,480 words</span>
              <span className="text-slate-300">·</span>
              <span className="text-emerald-700 font-semibold bg-emerald-50 px-1.5 py-0.5 rounded text-[10px] shrink-0">
                Zero Ads
              </span>
            </div>

            {/* Format selector buttons with horizontal scrollbar protection */}
            <div className="flex items-center gap-1 overflow-x-auto scrollbar-none pb-0.5 sm:pb-0">
              <span className="text-slate-400 mr-1 text-[10px] font-bold uppercase shrink-0">
                Format:
              </span>
              {(['PDF', 'Markdown', 'TXT', 'HTML', 'PNG'] as OutputFormat[]).map((fmt) => (
                <button
                  key={fmt}
                  onClick={() => setSelectedFormat(fmt)}
                  className={`px-2 py-0.5 rounded-md text-[11px] sm:text-xs font-bold transition-all cursor-pointer shrink-0 whitespace-nowrap ${
                    selectedFormat === fmt
                      ? 'bg-orange-100 text-[#EB4423] shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  {fmt}
                </button>
              ))}
            </div>
          </div>

          {/* Main Content Preview Area */}
          <div className="p-4 sm:p-8 md:p-12 max-h-[500px] overflow-y-auto font-['Manrope'] bg-white">
            {activeTab === 'preview' ? (
              <div>
                {/* PDF FORMAT PREVIEW */}
                {selectedFormat === 'PDF' && (
                  <div className="max-w-2xl mx-auto p-4 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-md space-y-4 sm:space-y-6">
                    <div className="border-b border-slate-200 pb-3 sm:pb-4 flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <span className="text-[10px] font-bold text-[#EB4423] uppercase">PDF Document Preview</span>
                        <h1 className="text-lg sm:text-2xl font-extrabold text-slate-900 mt-1 leading-snug">The Future of Open Web Data Extraction</h1>
                        <p className="text-[11px] sm:text-xs text-slate-400 mt-0.5 truncate">{targetUrl}</p>
                      </div>
                      <span className="text-[11px] sm:text-xs font-bold text-slate-700 bg-slate-100 px-2 py-0.5 sm:py-1 rounded shrink-0">Page 1/3</span>
                    </div>
                    <div className="p-3 bg-orange-50/70 border-l-4 border-[#EB4423] text-slate-800 text-xs italic font-medium rounded-r-lg">
                      "The web is humanity's largest public library, yet saving clean copies remains unnecessarily difficult."
                    </div>
                    <div className="space-y-2.5 text-xs text-slate-700 leading-relaxed font-normal">
                      <h2 className="text-xs sm:text-sm font-extrabold text-slate-900">1. Executive Summary</h2>
                      <p>
                        Public web information frequently decays over time. Academic studies indicate that over 38% of web pages created in 2013 are no longer accessible today. Fetchly converts dynamic URLs into clean offline PDF files.
                      </p>
                    </div>
                  </div>
                )}

                {/* MARKDOWN FORMAT PREVIEW */}
                {selectedFormat === 'Markdown' && (
                  <div className="max-w-2xl mx-auto space-y-4 sm:space-y-6 text-slate-800">
                    <div className="space-y-1.5 sm:space-y-2 border-b border-slate-100 pb-4 sm:pb-6">
                      <span className="text-[10px] sm:text-xs font-bold text-[#EB4423] uppercase tracking-wider">
                        Extracted Markdown Document
                      </span>
                      <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
                        The Future of Open Web Data Extraction
                      </h1>
                      <p className="text-xs text-slate-400 font-medium">
                        Published on TechPulse Insights · 5 min read · Converted via Fetchly
                      </p>
                    </div>

                    <div className="p-3 sm:p-4 bg-orange-50/50 border-l-4 border-[#EB4423] rounded-r-xl text-slate-700 italic text-xs sm:text-sm">
                      "The web is humanity's largest public library, yet saving clean copies remains unnecessarily difficult."
                    </div>

                    <div className="space-y-3 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                      <h2 className="text-base sm:text-lg font-bold text-slate-900">
                        1. Executive Summary
                      </h2>
                      <p>
                        Public web information frequently decays over time. Academic studies indicate that over <strong>38% of web pages</strong> created in 2013 are no longer accessible today. Fetchly addresses this digital fragility by converting dynamic URLs into permanent, structured offline documents.
                      </p>
                      
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3 my-4">
                        <div className="p-2.5 sm:p-3 bg-slate-50 rounded-xl border border-slate-100">
                          <span className="text-[10px] text-slate-400 block font-semibold">Clutter Removed</span>
                          <span className="text-xs sm:text-sm font-extrabold text-slate-900">74%</span>
                        </div>
                        <div className="p-2.5 sm:p-3 bg-slate-50 rounded-xl border border-slate-100">
                          <span className="text-[10px] text-slate-400 block font-semibold">Clean Text</span>
                          <span className="text-xs sm:text-sm font-extrabold text-slate-900">1,480 Words</span>
                        </div>
                        <div className="p-2.5 sm:p-3 bg-slate-50 rounded-xl border border-slate-100 col-span-2 sm:col-span-1">
                          <span className="text-[10px] text-slate-400 block font-semibold">Processing Time</span>
                          <span className="text-xs sm:text-sm font-extrabold text-emerald-600">0.34s</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* TXT FORMAT PREVIEW */}
                {selectedFormat === 'TXT' && (
                  <div className="max-w-2xl mx-auto space-y-3 sm:space-y-4">
                    <div className="flex items-center justify-between text-xs text-slate-500 pb-2 border-b border-slate-100 font-bold">
                      <span>Plain Text Preview</span>
                      <span className="text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded text-[11px]">0 KB Bloat</span>
                    </div>
                    <div className="p-4 sm:p-6 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-800 whitespace-pre-wrap leading-relaxed">
                      {sampleTxt}
                    </div>
                  </div>
                )}

                {/* HTML FORMAT PREVIEW */}
                {selectedFormat === 'HTML' && (
                  <div className="max-w-2xl mx-auto rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
                    <div className="bg-slate-100 px-3.5 sm:px-4 py-2 border-b border-slate-200 text-xs font-bold text-slate-600 flex items-center justify-between">
                      <span>Standalone HTML Document</span>
                      <span className="text-orange-600 font-semibold text-[10px] sm:text-[11px]">Self-Contained File</span>
                    </div>
                    <div className="p-4 sm:p-8 space-y-3 sm:space-y-4 bg-white">
                      <h1 className="text-lg sm:text-2xl font-extrabold text-slate-900">The Future of Open Web Data Extraction</h1>
                      <p className="text-xs text-slate-400">Offline document saved with Fetchly.</p>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        This HTML file has inlined typography and styled CSS with zero external network tracking dependencies.
                      </p>
                    </div>
                  </div>
                )}

                {/* PNG FORMAT PREVIEW */}
                {selectedFormat === 'PNG' && (
                  <div className="max-w-3xl mx-auto space-y-3">
                    <div className="flex items-center justify-between text-xs text-slate-600 pb-2 border-b border-slate-100 font-bold">
                      <span>Full Page Capture (PNG)</span>
                      <span className="text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded text-[11px]">1920 × 2400 px</span>
                    </div>
                    <div className="rounded-xl border border-slate-200 overflow-hidden bg-slate-100 p-6 sm:p-8 text-center space-y-3">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-white border border-slate-200 flex items-center justify-center mx-auto text-[#EB4423]">
                        <Layers className="w-6 h-6 sm:w-8 sm:h-8" />
                      </div>
                      <div className="space-y-0.5">
                        <div className="text-xs sm:text-sm font-extrabold text-slate-900">Full-Height Viewport Render</div>
                        <div className="text-[11px] sm:text-xs text-slate-500">2x Retina · PNG Format · Clean Visual Capture</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-xs text-slate-800 bg-slate-50 p-4 sm:p-6 rounded-2xl border border-slate-200 overflow-x-auto whitespace-pre-wrap leading-relaxed font-medium">
                {selectedFormat === 'Markdown' ? sampleMarkdown : sampleTxt}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Full Feature Preview Modal */}
      <FilePreviewModal
        isOpen={isPreviewModalOpen}
        onClose={() => setIsPreviewModalOpen(false)}
        sourceUrl={targetUrl}
        initialFormat={selectedFormat}
      />
    </section>
  );
};
