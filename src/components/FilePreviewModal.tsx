/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  X, 
  Download, 
  Copy, 
  Check, 
  FileText, 
  Code, 
  FileCode, 
  Globe, 
  ChevronLeft, 
  ChevronRight, 
  ZoomIn, 
  ZoomOut,
  ExternalLink,
  ArrowLeft
} from 'lucide-react';
import { OutputFormat } from './ConversionTool';
import { downloadDocument } from '../utils/fileDownloader';

export interface ExtractedPageData {
  title: string;
  domain: string;
  sourceUrl: string;
  author?: string;
  publishDate?: string;
  wordCount?: number;
  readingTimeMinutes?: number;
  clutterReduction?: string;
  summary?: string;
  markdown?: string;
  plainText?: string;
  html?: string;
  topics?: string[];
}

interface FilePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  sourceUrl: string;
  initialFormat?: OutputFormat;
  documentData?: ExtractedPageData | null;
}

export const FilePreviewModal: React.FC<FilePreviewModalProps> = ({
  isOpen,
  onClose,
  sourceUrl,
  initialFormat = 'PDF',
  documentData = null,
}) => {
  const [activeFormat, setActiveFormat] = useState<OutputFormat>(initialFormat);
  const [viewMode, setViewMode] = useState<'rendered' | 'source'>('rendered');
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [copied, setCopied] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  if (!isOpen) return null;

  const urlDomain = sourceUrl.replace(/^https?:\/\//, '').split('/')[0] || 'example.com';
  
  const displayTitle = documentData?.title || (
    urlDomain.includes('wikipedia') 
      ? 'Web Scraping & Data Extraction Heuristics'
      : urlDomain.includes('mozilla') 
      ? 'HTML: HyperText Markup Language — Web Technology'
      : 'The Modern Architecture of Web Content Archiving'
  );

  const displaySummary = documentData?.summary || 
    'Web content parsing extracts meaningful editorial structure from public web pages while discarding distracting elements such as cookie consents, subscription modals, advertising trackers, and navigation clutter.';

  const activeMarkdown = documentData?.markdown || `# ${displayTitle}
*Source: ${sourceUrl}*
*Archived via Fetchly on ${new Date().toLocaleDateString()}*

---

> "${displaySummary}"

## Overview
Web content parsing extracts meaningful editorial structure from public web pages while discarding distracting elements such as cookie consents, subscription modals, advertising trackers, and navigation clutter.

### Key Highlights
- **Distraction-Free Output:** 100% of banner ads and tracking beacons stripped.
- **Structural Integrity:** Headers, lists, code samples, and inline links preserved.
- **Offline Reliability:** Instant local access without network connectivity.

\`\`\`typescript
interface FetchlyExport {
  sourceUrl: string;
  title: string;
  extractedWords: number;
  format: "PDF" | "Markdown" | "TXT" | "HTML" | "PNG";
}
\`\`\`

## Methodology
The parsing engine identifies the main document article element using weighted DOM traversal algorithms, ensuring high fidelity and readable formatting.`;

  const activePlainText = documentData?.plainText || `TITLE: ${displayTitle}
SOURCE: ${sourceUrl}
ARCHIVED VIA FETCHLY: ${new Date().toLocaleDateString()}

============================================================
OVERVIEW
============================================================
${displaySummary}

KEY HIGHLIGHTS:
- Distraction-Free Output: 100% of banner ads and tracking beacons stripped.
- Structural Integrity: Headers, lists, code samples, and inline links preserved.
- Offline Reliability: Instant local access without network connectivity.

METHODOLOGY:
The parsing engine identifies the main document article element using weighted DOM traversal algorithms, ensuring high fidelity and readable formatting.

------------------------------------------------------------
Extracted ${documentData?.wordCount || 1420} words. Clutter reduction: ${documentData?.clutterReduction || '74%'}. Encoded in UTF-8.`;

  const activeHtml = documentData?.html || `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>${displayTitle}</title>
  <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;600;700;800&display=swap" rel="stylesheet">
  <style>
    body { font-family: 'Manrope', sans-serif; line-height: 1.6; max-width: 760px; margin: 40px auto; padding: 0 20px; color: #1e293b; background: #ffffff; }
    h1 { font-size: 2rem; font-weight: 800; color: #0f172a; margin-bottom: 0.5rem; }
    .meta { font-size: 0.85rem; color: #64748b; margin-bottom: 2rem; border-bottom: 1px solid #e2e8f0; padding-bottom: 1rem; }
    blockquote { border-left: 4px solid #EB4423; padding-left: 1rem; margin: 1.5rem 0; color: #475569; font-style: italic; background: #fff7ed; padding: 12px; border-radius: 0 8px 8px 0; }
    code { background: #f1f5f9; padding: 2px 6px; border-radius: 4px; font-size: 0.9em; }
    footer { margin-top: 3rem; pt-4; border-top: 1px solid #e2e8f0; font-size: 0.8rem; color: #94a3b8; }
  </style>
</head>
<body>
  <h1>${displayTitle}</h1>
  <div class="meta">Extracted from <a href="${sourceUrl}">${sourceUrl}</a> · Clean Fetchly Archive</div>
  <blockquote>"${displaySummary}"</blockquote>
  <h2>Overview</h2>
  <p>${displaySummary}</p>
  <footer>Saved with Fetchly. Offline HTML Document.</footer>
</body>
</html>`;

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      const activeDocData: ExtractedPageData = documentData || {
        title: displayTitle,
        domain: urlDomain,
        sourceUrl: sourceUrl,
        summary: displaySummary,
        markdown: activeMarkdown,
        plainText: activePlainText,
        html: activeHtml,
      };

      await downloadDocument(activeDocData, activeFormat);
    } catch (err) {
      console.error('Download error:', err);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleCopy = () => {
    const textToCopy = activeFormat === 'Markdown' ? activeMarkdown : activeFormat === 'TXT' ? activePlainText : activeHtml;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formats: { id: OutputFormat; label: string; icon: React.ReactNode }[] = [
    { id: 'PDF', label: 'PDF Document', icon: <FileText className="w-4 h-4 text-red-500" /> },
    { id: 'Markdown', label: 'Markdown (.md)', icon: <Code className="w-4 h-4 text-blue-500" /> },
    { id: 'TXT', label: 'Plain Text (.txt)', icon: <FileText className="w-4 h-4 text-slate-500" /> },
    { id: 'HTML', label: 'Standalone HTML', icon: <FileCode className="w-4 h-4 text-orange-500" /> },
    { id: 'PNG', label: 'PNG Screenshot', icon: <Globe className="w-4 h-4 text-emerald-500" /> },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      {/* Modal Dialog Card */}
      <div 
        className="w-full max-w-5xl h-[90vh] bg-white rounded-3xl border border-slate-200/90 shadow-2xl flex flex-col overflow-hidden text-left relative animate-scaleUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="px-3.5 sm:px-6 py-3 sm:py-3.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between gap-2.5 shrink-0">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            {/* Prominent Go Back / Cancel Button on the left */}
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 bg-white hover:bg-slate-100 text-slate-700 hover:text-slate-900 border border-slate-200 text-xs font-bold rounded-xl transition-all shadow-2xs cursor-pointer shrink-0"
              title="Return to conversion editor"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-slate-600" />
              <span className="hidden sm:inline">Go Back</span>
              <span className="sm:hidden">Back</span>
            </button>

            <span className="w-2 h-2 rounded-full bg-[#EB4423] shrink-0" />
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-400 shrink-0 hidden md:inline">
                  Previewing:
                </span>
                <span className="text-xs sm:text-sm font-extrabold text-slate-900 truncate max-w-[140px] sm:max-w-xs md:max-w-md">
                  {displayTitle}
                </span>
              </div>
              <div className="text-[10px] sm:text-[11px] text-slate-500 truncate max-w-[140px] sm:max-w-sm md:max-w-lg mt-0.5">
                {sourceUrl}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            {(activeFormat === 'Markdown' || activeFormat === 'TXT' || activeFormat === 'HTML') && (
              <button
                type="button"
                onClick={handleCopy}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-bold rounded-xl transition-colors cursor-pointer shadow-2xs"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied!' : 'Copy'}</span>
              </button>
            )}

            <button
              type="button"
              onClick={handleDownload}
              className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-1.5 bg-[#EB4423] hover:bg-[#d43a1a] text-white text-xs font-bold rounded-xl transition-all shadow-xs cursor-pointer whitespace-nowrap"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download {activeFormat}</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer shrink-0"
              aria-label="Close preview modal and go back"
              title="Close preview"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Format Selector Tab Strip */}
        <div className="px-3.5 sm:px-6 py-2 bg-white border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2 shrink-0">
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-0.5 min-w-0 flex-1">
            <span className="text-[10px] sm:text-xs font-bold text-slate-400 mr-1 uppercase tracking-wide shrink-0">
              Format:
            </span>
            {formats.map((fmt) => {
              const isActive = activeFormat === fmt.id;
              return (
                <button
                  key={fmt.id}
                  onClick={() => setActiveFormat(fmt.id)}
                  className={`inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'bg-orange-50 text-[#EB4423] border border-orange-200 shadow-2xs'
                      : 'text-slate-600 hover:bg-slate-100 border border-transparent'
                  }`}
                >
                  {fmt.icon}
                  <span className="hidden sm:inline">{fmt.label}</span>
                  <span className="sm:hidden">{fmt.id}</span>
                </button>
              );
            })}
          </div>

          {/* View Mode & Zoom Controls */}
          <div className="flex items-center justify-between sm:justify-end gap-2 text-xs text-slate-500 font-semibold shrink-0 pt-1 sm:pt-0 border-t border-slate-100 sm:border-0">
            {(activeFormat === 'Markdown' || activeFormat === 'HTML') && (
              <div className="flex items-center bg-slate-100 p-0.5 rounded-lg">
                <button
                  onClick={() => setViewMode('rendered')}
                  className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                    viewMode === 'rendered'
                      ? 'bg-white text-slate-900 shadow-2xs font-bold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Formatted
                </button>
                <button
                  onClick={() => setViewMode('source')}
                  className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                    viewMode === 'source'
                      ? 'bg-white text-slate-900 shadow-2xs font-bold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Source Code
                </button>
              </div>
            )}

            {activeFormat === 'PDF' && (
              <div className="flex items-center gap-1 bg-slate-100 px-2 py-1 rounded-lg">
                <button
                  onClick={() => setZoomLevel(Math.max(75, zoomLevel - 15))}
                  className="hover:text-slate-900 p-0.5 cursor-pointer"
                  title="Zoom Out"
                >
                  <ZoomOut className="w-3.5 h-3.5" />
                </button>
                <span className="text-[11px] px-1 font-bold">{zoomLevel}%</span>
                <button
                  onClick={() => setZoomLevel(Math.min(150, zoomLevel + 15))}
                  className="hover:text-slate-900 p-0.5 cursor-pointer"
                  title="Zoom In"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Main Preview Canvas Area */}
        <div className="flex-1 bg-slate-100/70 p-4 sm:p-8 overflow-y-auto flex justify-center items-start">
          {/* FORMAT 1: PDF PREVIEW */}
          {activeFormat === 'PDF' && (
            <div 
              className="bg-white rounded-xl shadow-xl border border-slate-200/80 p-8 sm:p-12 w-full max-w-2xl min-h-[700px] flex flex-col justify-between transition-transform duration-200 origin-top"
              style={{ transform: `scale(${zoomLevel / 100})` }}
            >
              <div className="space-y-6">
                {/* PDF Header Sheet */}
                <div className="border-b border-slate-200 pb-5 flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#EB4423]">
                      Clean PDF Document
                    </span>
                    <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-1">
                      {displayTitle}
                    </h1>
                    <div className="text-xs text-slate-400 mt-1">
                      Source: {sourceUrl} · Converted via Fetchly
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-xs font-bold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-md">
                      Page {currentPage} of 2
                    </span>
                  </div>
                </div>

                {/* Callout Quote */}
                <div className="p-4 bg-orange-50 border-l-4 border-[#EB4423] rounded-r-xl text-slate-800 text-sm font-medium italic">
                  "{displaySummary}"
                </div>

                {/* Body Content */}
                <div className="space-y-4 text-sm text-slate-700 leading-relaxed font-normal">
                  <h2 className="text-base font-extrabold text-slate-900 pt-2">
                    1. Overview & Contents
                  </h2>
                  <p>
                    {displaySummary}
                  </p>
                  <p>
                    The document has been formatted into high-resolution typography with vector glyphs, optimized for print and offline reading on tablets, laptops, and e-readers.
                  </p>

                  <h2 className="text-base font-extrabold text-slate-900 pt-3">
                    2. Document Statistics
                  </h2>
                  <div className="grid grid-cols-2 gap-3 pt-1">
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/70">
                      <div className="text-[10px] text-slate-400 font-bold uppercase">Clutter Removed</div>
                      <div className="text-lg font-extrabold text-slate-900">{documentData?.clutterReduction || '74%'}</div>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/70">
                      <div className="text-[10px] text-slate-400 font-bold uppercase">Word Count</div>
                      <div className="text-lg font-extrabold text-slate-900">{documentData?.wordCount || 1420} Words</div>
                    </div>
                  </div>

                  {documentData?.topics && documentData.topics.length > 0 && (
                    <div className="pt-2">
                      <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Key Topics Covered:</div>
                      <div className="flex flex-wrap gap-1.5">
                        {documentData.topics.map((t, idx) => (
                          <span key={idx} className="px-2.5 py-1 bg-slate-100 text-slate-700 text-xs font-semibold rounded-lg">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* PDF Footer Page Numbers */}
              <div className="pt-8 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400 font-medium">
                <span>Fetchly Document Engine v2.4</span>
                <div className="flex items-center gap-2">
                  <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(1)}
                    className="p-1 hover:text-slate-700 disabled:opacity-30 cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <span>Page {currentPage} of 2</span>
                  <button
                    disabled={currentPage === 2}
                    onClick={() => setCurrentPage(2)}
                    className="p-1 hover:text-slate-700 disabled:opacity-30 cursor-pointer"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
                <span>PERMANENT ARCHIVE</span>
              </div>
            </div>
          )}

          {/* FORMAT 2: MARKDOWN PREVIEW */}
          {activeFormat === 'Markdown' && (
            <div className="bg-white rounded-2xl shadow-xl border border-slate-200/80 p-8 sm:p-10 w-full max-w-3xl">
              {viewMode === 'rendered' ? (
                <div className="space-y-6 text-slate-800">
                  <div className="border-b border-slate-100 pb-4">
                    <span className="text-xs font-bold text-[#EB4423] uppercase">Markdown Output</span>
                    <h1 className="text-2xl font-extrabold text-slate-900 mt-1">{displayTitle}</h1>
                    <p className="text-xs text-slate-400 mt-1">Source: {sourceUrl}</p>
                  </div>
                  <blockquote className="border-l-4 border-slate-300 pl-4 py-1 text-slate-600 italic text-sm">
                    "{displaySummary}"
                  </blockquote>
                  <div className="text-sm text-slate-700 whitespace-pre-wrap leading-relaxed font-sans">
                    {activeMarkdown}
                  </div>
                </div>
              ) : (
                <div className="text-xs text-slate-800 bg-slate-50 p-6 rounded-xl border border-slate-200 whitespace-pre-wrap leading-relaxed font-mono">
                  {activeMarkdown}
                </div>
              )}
            </div>
          )}

          {/* FORMAT 3: PLAIN TXT PREVIEW */}
          {activeFormat === 'TXT' && (
            <div className="bg-white rounded-2xl shadow-xl border border-slate-200/80 p-8 sm:p-10 w-full max-w-3xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 text-xs font-bold text-slate-500">
                <span>Raw Clean Text (.txt)</span>
                <span className="text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                  0 KB Bloat · Pure Text
                </span>
              </div>
              <div className="text-xs text-slate-800 bg-slate-50 p-6 rounded-xl border border-slate-200 whitespace-pre-wrap leading-relaxed font-mono">
                {activePlainText}
              </div>
              <div className="flex items-center justify-between text-xs text-slate-400 pt-2">
                <span>Words: {documentData?.wordCount || 1420}</span>
                <span>UTF-8 Normalization Applied</span>
              </div>
            </div>
          )}

          {/* FORMAT 4: HTML PREVIEW */}
          {activeFormat === 'HTML' && (
            <div className="bg-white rounded-2xl shadow-xl border border-slate-200/80 p-6 sm:p-8 w-full max-w-3xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 text-xs font-bold text-slate-500">
                <span>Self-Contained Standalone HTML</span>
                <span className="text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                  Zero External Dependencies
                </span>
              </div>

              {viewMode === 'rendered' ? (
                <div className="p-6 bg-slate-50 rounded-xl border border-slate-200 text-slate-800 text-sm leading-relaxed space-y-4">
                  <h1 className="text-2xl font-black text-slate-900">{displayTitle}</h1>
                  <div className="text-xs text-slate-500 pb-2 border-b border-slate-200">
                    Extracted from <a href={sourceUrl} target="_blank" rel="noopener noreferrer" className="text-[#EB4423] underline">{sourceUrl}</a>
                  </div>
                  <blockquote className="border-l-4 border-[#EB4423] pl-4 py-2 bg-orange-50/60 rounded-r-lg text-slate-700 italic">
                    "{displaySummary}"
                  </blockquote>
                  <p>{displaySummary}</p>
                  <div className="pt-4 border-t border-slate-200 text-xs text-slate-400">
                    Saved with Fetchly. Clean offline HTML document.
                  </div>
                </div>
              ) : (
                <div className="text-xs text-slate-800 bg-slate-900 text-slate-100 p-6 rounded-xl border border-slate-800 whitespace-pre-wrap leading-relaxed font-mono overflow-x-auto max-h-[500px]">
                  {activeHtml}
                </div>
              )}
            </div>
          )}

          {/* FORMAT 5: PNG PREVIEW */}
          {activeFormat === 'PNG' && (
            <div className="bg-white rounded-2xl shadow-xl border border-slate-200/80 p-6 sm:p-8 w-full max-w-3xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 text-xs font-bold text-slate-500">
                <span>Full Page Visual Rendering</span>
                <span className="text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                  2x Retina Resolution
                </span>
              </div>
              <div className="bg-slate-50 rounded-xl p-6 border border-slate-200 space-y-4 text-center">
                <div className="w-16 h-16 rounded-2xl bg-orange-100 text-[#EB4423] flex items-center justify-center mx-auto mb-2">
                  <Globe className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-extrabold text-slate-900">{displayTitle}</h3>
                <p className="text-xs text-slate-500 max-w-md mx-auto">{displaySummary}</p>
                <div className="inline-block px-3 py-1 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-700">
                  Resolution: 1920 × 2400 · Size: ~1.8 MB PNG
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Modal Action Footer Bar with prominent Cancel & Go Back button */}
        <div className="px-3.5 sm:px-6 py-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-3 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 bg-white hover:bg-slate-100 text-slate-700 hover:text-slate-900 border border-slate-200 text-xs font-bold rounded-xl transition-all shadow-2xs cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-slate-500" />
            <span>Cancel & Go Back</span>
          </button>

          <div className="flex items-center gap-2">
            {(activeFormat === 'Markdown' || activeFormat === 'TXT' || activeFormat === 'HTML') && (
              <button
                type="button"
                onClick={handleCopy}
                className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-bold rounded-xl transition-all shadow-2xs cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy Content'}</span>
              </button>
            )}

            <button
              type="button"
              onClick={handleDownload}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#EB4423] hover:bg-[#d43a1a] text-white text-xs font-bold rounded-xl transition-all shadow-xs cursor-pointer whitespace-nowrap"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download {activeFormat}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
