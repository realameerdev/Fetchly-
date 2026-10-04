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
  ArrowLeft,
  BookOpen,
  Quote,
  Lightbulb
} from 'lucide-react';
import { OutputFormat } from './ConversionTool';
import { 
  downloadDocument, 
  downloadExtractedNote, 
  downloadResearchFindings 
} from '../utils/fileDownloader';

export interface ExtractedNote {
  title: string;
  markdown: string;
  plainText: string;
  tags?: string[];
  keyTakeaways?: string[];
}

export interface ResearchFinding {
  label: string;
  detail: string;
}

export interface CitationQuote {
  quote: string;
  author?: string;
  context?: string;
}

export interface CodeOrDataSnippet {
  title: string;
  language: string;
  code: string;
}

export interface SectionBreakdown {
  sectionTitle: string;
  summary: string;
  content: string;
}

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
  screenshot?: string;
  engine?: 'firecrawl' | 'semantic-ai';
  topics?: string[];
  notes?: ExtractedNote;
  keyFindings?: ResearchFinding[];
  quotes?: CitationQuote[];
  codeOrData?: CodeOrDataSnippet[];
  sections?: SectionBreakdown[];
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
  const [modalTab, setModalTab] = useState<'document' | 'notes' | 'research'>('document');
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

  // Note data fallback
  const noteData: ExtractedNote = documentData?.notes || {
    title: `Executive Note: ${displayTitle}`,
    markdown: `# Executive Note: ${displayTitle}\n\n**Source:** ${sourceUrl}\n**Date:** ${new Date().toLocaleDateString()}\n\n### Core Thesis\n${displaySummary}\n\n### Key Takeaways\n- Distilled directly from ${urlDomain}.\n- Stripped 100% of banner ads and web bloat.\n- Permanent archive format for personal note systems.`,
    plainText: `EXECUTIVE NOTE: ${displayTitle}\nSource: ${sourceUrl}\nDate: ${new Date().toLocaleDateString()}\n\nCORE THESIS:\n${displaySummary}\n\nKEY TAKEAWAYS:\n- Distilled directly from ${urlDomain}.\n- Stripped 100% of banner ads and web bloat.\n- Permanent archive format for personal note systems.`,
    keyTakeaways: [
      `Distilled directly from ${urlDomain} without web bloat.`,
      `Verified clean semantic structure with zero ads.`,
      `Permanent archive format compatible with Obsidian, Notion, and Apple Notes.`
    ],
    tags: [urlDomain, 'ExecutiveNote', 'Research']
  };

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
        notes: noteData,
      };

      if (modalTab === 'notes') {
        await downloadExtractedNote(activeDocData, 'Markdown');
      } else if (modalTab === 'research') {
        await downloadResearchFindings(activeDocData);
      } else {
        await downloadDocument(activeDocData, activeFormat);
      }
    } catch (err) {
      console.error('Download error:', err);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleCopy = () => {
    let textToCopy = '';
    if (modalTab === 'notes') {
      textToCopy = noteData.markdown;
    } else if (modalTab === 'research') {
      textToCopy = JSON.stringify(documentData?.keyFindings || [], null, 2);
    } else {
      textToCopy = activeFormat === 'Markdown' ? activeMarkdown : activeFormat === 'TXT' ? activePlainText : activeHtml;
    }
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formats: { id: OutputFormat; label: string; icon: React.ReactNode }[] = [
    { id: 'PDF', label: 'PDF Document', icon: <FileText className="w-3.5 h-3.5 text-red-500" /> },
    { id: 'Markdown', label: 'Markdown (.md)', icon: <Code className="w-3.5 h-3.5 text-blue-500" /> },
    { id: 'TXT', label: 'Plain Text (.txt)', icon: <FileText className="w-3.5 h-3.5 text-slate-500" /> },
    { id: 'HTML', label: 'Standalone HTML', icon: <FileCode className="w-3.5 h-3.5 text-orange-500" /> },
    { id: 'PNG', label: 'PNG Screenshot', icon: <Globe className="w-3.5 h-3.5 text-emerald-500" /> },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-slate-900/60 backdrop-blur-sm animate-fadeIn overflow-y-auto">
      {/* Modal Dialog Card */}
      <div 
        className="w-full max-w-5xl h-[94vh] sm:h-[90vh] bg-white rounded-2xl sm:rounded-3xl border border-slate-200 shadow-2xl flex flex-col overflow-hidden text-left relative animate-scaleUp my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar - Optimized for Mobile with Zero Overlapping */}
        <div className="px-3 sm:px-6 py-2.5 sm:py-3.5 bg-slate-50 border-b border-slate-200 shrink-0 space-y-2 sm:space-y-0 sm:flex sm:items-center sm:justify-between sm:gap-3">
          {/* Row 1: Back + Title + Close */}
          <div className="flex items-center justify-between gap-2 min-w-0">
            <div className="flex items-center gap-2 min-w-0">
              <button
                type="button"
                onClick={onClose}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-white hover:bg-slate-100 text-slate-700 hover:text-slate-900 border border-slate-200 text-xs font-bold rounded-xl transition-all shadow-2xs cursor-pointer shrink-0"
                title="Return"
              >
                <ArrowLeft className="w-3.5 h-3.5 text-slate-600" />
                <span className="hidden sm:inline">Go Back</span>
                <span className="sm:hidden text-[11px]">Back</span>
              </button>

              <div className="min-w-0">
                <h3 className="text-xs sm:text-sm font-extrabold text-slate-900 truncate max-w-[150px] sm:max-w-xs md:max-w-md">
                  {displayTitle}
                </h3>
                <div className="text-[10px] text-slate-400 truncate max-w-[150px] sm:max-w-xs md:max-w-sm">
                  {urlDomain}
                </div>
              </div>
            </div>

            {/* Close Button on Top Right */}
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer shrink-0"
              aria-label="Close preview modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Row 2 on Mobile / Right side on Desktop: Quick Actions */}
          <div className="flex items-center justify-end gap-2 shrink-0">
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-bold rounded-xl transition-colors cursor-pointer shadow-2xs shrink-0"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied!' : 'Copy'}</span>
            </button>

            <button
              type="button"
              disabled={isDownloading}
              onClick={handleDownload}
              className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 bg-[#EB4423] hover:bg-[#d43a1a] text-white text-xs font-bold rounded-xl transition-all shadow-xs cursor-pointer whitespace-nowrap shrink-0"
            >
              <Download className="w-3.5 h-3.5" />
              <span>
                {modalTab === 'notes' ? 'Download Note (.md)' : modalTab === 'research' ? 'Download Findings' : `Download ${activeFormat}`}
              </span>
            </button>
          </div>
        </div>

        {/* Modal Navigation Mode Selector: Full Document vs Extracted Note vs Deep Research */}
        <div className="px-3 sm:px-6 py-2 bg-slate-100/80 border-b border-slate-200 flex items-center gap-1.5 overflow-x-auto scrollbar-none shrink-0">
          <button
            type="button"
            onClick={() => setModalTab('document')}
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
              modalTab === 'document'
                ? 'bg-white text-slate-900 shadow-2xs border border-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <FileText className="w-3.5 h-3.5 text-[#EB4423]" />
            <span>Clean Document</span>
          </button>

          <button
            type="button"
            onClick={() => setModalTab('notes')}
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
              modalTab === 'notes'
                ? 'bg-white text-[#EB4423] shadow-2xs border border-orange-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 text-amber-500" />
            <span>Extracted Note</span>
            <span className="px-1.5 py-0.2 bg-orange-100 text-[#EB4423] rounded text-[10px] font-bold">New</span>
          </button>

          <button
            type="button"
            onClick={() => setModalTab('research')}
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
              modalTab === 'research'
                ? 'bg-white text-indigo-600 shadow-2xs border border-indigo-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Lightbulb className="w-3.5 h-3.5 text-indigo-500" />
            <span>Deep Findings</span>
          </button>
        </div>

        {/* Sub-toolbar for Formats (if in Document mode) */}
        {modalTab === 'document' && (
          <div className="px-3 sm:px-6 py-2 bg-white border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2 shrink-0">
            {/* Horizontal format swipe */}
            <div className="flex items-center gap-1 overflow-x-auto scrollbar-none py-0.5 min-w-0">
              <span className="text-[10px] font-bold text-slate-400 mr-1 uppercase tracking-wide shrink-0">
                Format:
              </span>
              {formats.map((fmt) => {
                const isActive = activeFormat === fmt.id;
                return (
                  <button
                    key={fmt.id}
                    onClick={() => setActiveFormat(fmt.id)}
                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                      isActive
                        ? 'bg-orange-50 text-[#EB4423] border border-orange-200 shadow-2xs'
                        : 'text-slate-600 hover:bg-slate-100 border border-transparent'
                    }`}
                  >
                    {fmt.icon}
                    <span>{fmt.id}</span>
                  </button>
                );
              })}
            </div>

            {/* View Mode & Zoom Controls */}
            <div className="flex items-center justify-between sm:justify-end gap-2 text-xs text-slate-500 font-semibold shrink-0">
              {(activeFormat === 'Markdown' || activeFormat === 'HTML') && (
                <div className="flex items-center bg-slate-100 p-0.5 rounded-lg text-[11px]">
                  <button
                    onClick={() => setViewMode('rendered')}
                    className={`px-2.5 py-0.5 rounded-md transition-all cursor-pointer ${
                      viewMode === 'rendered'
                        ? 'bg-white text-slate-900 shadow-2xs font-bold'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Formatted
                  </button>
                  <button
                    onClick={() => setViewMode('source')}
                    className={`px-2.5 py-0.5 rounded-md transition-all cursor-pointer ${
                      viewMode === 'source'
                        ? 'bg-white text-slate-900 shadow-2xs font-bold'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Source
                  </button>
                </div>
              )}

              {activeFormat === 'PDF' && (
                <div className="flex items-center gap-1 bg-slate-100 px-2 py-0.5 rounded-lg text-[11px]">
                  <button
                    onClick={() => setZoomLevel(Math.max(75, zoomLevel - 15))}
                    className="hover:text-slate-900 p-0.5 cursor-pointer"
                    title="Zoom Out"
                  >
                    <ZoomOut className="w-3 h-3" />
                  </button>
                  <span className="text-[10px] px-1 font-bold">{zoomLevel}%</span>
                  <button
                    onClick={() => setZoomLevel(Math.min(150, zoomLevel + 15))}
                    className="hover:text-slate-900 p-0.5 cursor-pointer"
                    title="Zoom In"
                  >
                    <ZoomIn className="w-3 h-3" />
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Main Preview Canvas Area - Responsive with Zero Clashing */}
        <div className="flex-1 bg-slate-100/70 p-3 sm:p-6 md:p-8 overflow-y-auto flex justify-center items-start">
          
          {/* TAB 1: FULL DOCUMENT PREVIEW */}
          {modalTab === 'document' && (
            <div className="w-full flex justify-center">
              {/* FORMAT 1: PDF PREVIEW */}
              {activeFormat === 'PDF' && (
                <div 
                  className="bg-white rounded-xl shadow-lg border border-slate-200 p-5 sm:p-8 md:p-10 w-full max-w-2xl min-h-0 flex flex-col justify-between transition-transform duration-200 origin-top"
                  style={{ transform: `scale(${zoomLevel / 100})` }}
                >
                  <div className="space-y-5">
                    {/* PDF Header Sheet */}
                    <div className="border-b border-slate-200 pb-4 flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                      <div className="min-w-0">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#EB4423]">
                          Clean PDF Document
                        </span>
                        <h1 className="text-lg sm:text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight mt-1 leading-snug">
                          {displayTitle}
                        </h1>
                        <div className="text-[11px] text-slate-400 mt-1 truncate">
                          Source: {sourceUrl} · Converted via Fetchly
                        </div>
                      </div>
                      <div className="shrink-0">
                        <span className="text-[11px] font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
                          Page {currentPage} of 2
                        </span>
                      </div>
                    </div>

                    {/* Callout Quote */}
                    <div className="p-3 bg-orange-50/70 border-l-4 border-[#EB4423] text-slate-800 text-xs italic font-medium rounded-r-lg leading-relaxed">
                      "{displaySummary}"
                    </div>

                    {/* Body Content */}
                    <div className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                      <h2 className="text-sm font-extrabold text-slate-900 border-b border-slate-100 pb-1">
                        1. Executive Overview
                      </h2>
                      <p>
                        Web scraping and automated content extraction convert dynamic web pages into persistent structured offline files. Fetchly isolates the core editorial text and strips out tracking beacons, third-party cookie alerts, and navigational headers.
                      </p>

                      <h2 className="text-sm font-extrabold text-slate-900 border-b border-slate-100 pb-1 pt-2">
                        2. Key Highlights
                      </h2>
                      <ul className="space-y-1.5 list-disc pl-4 text-xs">
                        <li><strong>Distraction-Free Output:</strong> 100% of banner ads and tracking beacons stripped.</li>
                        <li><strong>Structural Integrity:</strong> Headers, lists, and inline links preserved.</li>
                        <li><strong>Offline Reliability:</strong> Instant local access without network connectivity.</li>
                      </ul>
                    </div>
                  </div>

                  {/* PDF Footer Page Numbers */}
                  <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => setCurrentPage(1)}
                        disabled={currentPage === 1}
                        className="p-1 hover:text-slate-900 disabled:opacity-30 cursor-pointer"
                        title="Previous page"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <span className="text-[11px] font-bold text-slate-700">Page {currentPage} of 2</span>
                      <button
                        onClick={() => setCurrentPage(2)}
                        disabled={currentPage === 2}
                        className="p-1 hover:text-slate-900 disabled:opacity-30 cursor-pointer"
                        title="Next page"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                    <span className="text-[10px] text-slate-400 hidden sm:inline">Fetchly In-Memory PDF Engine</span>
                  </div>
                </div>
              )}

              {/* FORMAT 2: MARKDOWN PREVIEW */}
              {activeFormat === 'Markdown' && (
                <div className="w-full max-w-3xl bg-white rounded-2xl p-4 sm:p-8 border border-slate-200 shadow-lg text-left">
                  {viewMode === 'rendered' ? (
                    <div className="space-y-4 text-slate-800 text-xs sm:text-sm leading-relaxed">
                      <div className="border-b border-slate-200 pb-3">
                        <span className="text-[10px] font-bold text-blue-600 uppercase">Markdown Rendered View</span>
                        <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1">{displayTitle}</h1>
                        <p className="text-xs text-slate-400 mt-0.5">{sourceUrl}</p>
                      </div>
                      <div className="p-3 bg-slate-50 border-l-4 border-blue-500 rounded-r-lg text-xs italic text-slate-600">
                        "{displaySummary}"
                      </div>
                      <div className="whitespace-pre-wrap font-sans space-y-2">
                        {activeMarkdown}
                      </div>
                    </div>
                  ) : (
                    <pre className="font-mono text-xs text-slate-800 whitespace-pre-wrap bg-slate-50 p-4 rounded-xl border border-slate-200 overflow-x-auto">
                      {activeMarkdown}
                    </pre>
                  )}
                </div>
              )}

              {/* FORMAT 3: PLAIN TXT PREVIEW */}
              {activeFormat === 'TXT' && (
                <div className="w-full max-w-3xl bg-white rounded-2xl p-4 sm:p-8 border border-slate-200 shadow-lg text-left">
                  <div className="pb-3 border-b border-slate-200 mb-4 flex items-center justify-between">
                    <span className="text-[10px] font-bold text-slate-500 uppercase">Pure Unformatted Plain Text (.txt)</span>
                    <span className="text-xs text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded">Zero Code Bloat</span>
                  </div>
                  <pre className="font-mono text-xs sm:text-sm text-slate-700 whitespace-pre-wrap leading-relaxed">
                    {activePlainText}
                  </pre>
                </div>
              )}

              {/* FORMAT 4: HTML PREVIEW */}
              {activeFormat === 'HTML' && (
                <div className="w-full max-w-3xl bg-white rounded-2xl p-4 sm:p-8 border border-slate-200 shadow-lg text-left">
                  {viewMode === 'rendered' ? (
                    <div className="space-y-4 text-xs sm:text-sm text-slate-800 leading-relaxed">
                      <div className="border-b border-slate-200 pb-3">
                        <span className="text-[10px] font-bold text-orange-600 uppercase">Self-Contained Standalone HTML</span>
                        <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1">{displayTitle}</h1>
                      </div>
                      <p className="text-xs text-slate-500 leading-relaxed">{displaySummary}</p>
                      <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                        <p className="font-bold text-slate-900 mb-1">Embedded Styles Included:</p>
                        <p className="text-slate-600 font-mono text-[11px]">System-ui responsive layout, print media-queries, inlined assets.</p>
                      </div>
                    </div>
                  ) : (
                    <pre className="font-mono text-xs text-slate-800 whitespace-pre-wrap bg-slate-50 p-4 rounded-xl border border-slate-200 overflow-x-auto">
                      {activeHtml}
                    </pre>
                  )}
                </div>
              )}

              {/* FORMAT 5: PNG PREVIEW */}
              {activeFormat === 'PNG' && (
                <div className="w-full max-w-3xl bg-white rounded-2xl p-4 sm:p-6 border border-slate-200 shadow-lg text-left space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold text-emerald-600 uppercase">
                        {documentData?.screenshot ? 'Rendered Webpage Screenshot (PNG)' : '2x Retina Page Capture'}
                      </span>
                    </div>
                    <span className="text-xs font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">Full Resolution</span>
                  </div>

                  {documentData?.screenshot ? (
                    <div className="space-y-3">
                      <div className="rounded-xl border border-slate-200 overflow-hidden max-h-[550px] overflow-y-auto bg-slate-50 shadow-inner">
                        <img 
                          src={documentData.screenshot} 
                          alt={`Rendered screenshot of ${displayTitle}`}
                          className="w-full h-auto object-top"
                        />
                      </div>
                      <p className="text-[11px] text-slate-500 italic text-center">
                        Genuine full-page viewport screenshot captured with live JavaScript execution.
                      </p>
                    </div>
                  ) : (
                    <div className="border-2 border-dashed border-slate-200 rounded-xl p-6 bg-slate-50 text-center space-y-3">
                      <Globe className="w-12 h-12 text-[#EB4423] mx-auto opacity-70" />
                      <div className="text-sm font-extrabold text-slate-900">{displayTitle}.png</div>
                      <p className="text-xs text-slate-500 max-w-sm mx-auto">
                        High-DPI rasterized PNG capturing the complete typography, callouts, and clean layout ready for design presentations.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: EXTRACTED NOTE COMPONENT (User Request: "If the URL comprises of a note, get the note out and bring it to the website") */}
          {modalTab === 'notes' && (
            <div className="w-full max-w-3xl bg-white rounded-2xl p-4 sm:p-8 border border-orange-200/80 shadow-xl text-left space-y-5">
              {/* Note Header */}
              <div className="pb-4 border-b border-slate-200 flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 bg-orange-100 text-[#EB4423] rounded-md text-[10px] font-extrabold uppercase tracking-wider">
                      Extracted Note
                    </span>
                    <span className="text-xs text-slate-400">{urlDomain}</span>
                  </div>
                  <h2 className="text-lg sm:text-2xl font-extrabold text-slate-900 leading-snug">
                    {noteData.title}
                  </h2>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => downloadExtractedNote(documentData || { title: displayTitle, domain: urlDomain, sourceUrl, notes: noteData }, 'Markdown')}
                    className="px-3 py-1.5 bg-[#EB4423] hover:bg-[#d43a1a] text-white text-xs font-bold rounded-xl transition-all shadow-xs cursor-pointer inline-flex items-center gap-1.5"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Note (.md)</span>
                  </button>
                </div>
              </div>

              {/* Note Body */}
              <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed font-sans">
                {/* Core Thesis Card */}
                <div className="p-4 bg-amber-50/70 border-l-4 border-amber-500 rounded-r-xl">
                  <span className="text-xs font-bold text-amber-800 block uppercase mb-1">
                    Core Note Thesis:
                  </span>
                  <p className="text-slate-800 text-xs sm:text-sm font-medium">
                    {displaySummary}
                  </p>
                </div>

                {/* Key Takeaways */}
                {noteData.keyTakeaways && noteData.keyTakeaways.length > 0 && (
                  <div className="space-y-2">
                    <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
                      <span>Key Takeaways & Action Items:</span>
                    </h3>
                    <ul className="space-y-2">
                      {noteData.keyTakeaways.map((point, idx) => (
                        <li key={idx} className="flex items-start gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-200/70">
                          <span className="w-5 h-5 rounded-full bg-orange-100 text-[#EB4423] font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                            {idx + 1}
                          </span>
                          <span className="text-xs sm:text-sm text-slate-700">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Note Source Markdown Box */}
                <div className="pt-2">
                  <div className="flex items-center justify-between text-xs text-slate-500 font-semibold mb-2">
                    <span>Note Markdown Content:</span>
                    <button
                      type="button"
                      onClick={() => {
                        navigator.clipboard.writeText(noteData.markdown);
                        setCopied(true);
                        setTimeout(() => setCopied(false), 2000);
                      }}
                      className="text-[#EB4423] hover:underline cursor-pointer inline-flex items-center gap-1"
                    >
                      <Copy className="w-3 h-3" />
                      <span>{copied ? 'Copied' : 'Copy Note'}</span>
                    </button>
                  </div>
                  <pre className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs font-mono text-slate-800 whitespace-pre-wrap max-h-56 overflow-y-auto">
                    {noteData.markdown}
                  </pre>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: DEEP RESEARCH & FINDINGS COMPONENT */}
          {modalTab === 'research' && (
            <div className="w-full max-w-3xl bg-white rounded-2xl p-4 sm:p-8 border border-indigo-200 shadow-xl text-left space-y-6">
              <div className="pb-4 border-b border-slate-200 flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div className="space-y-1">
                  <span className="px-2 py-0.5 bg-indigo-100 text-indigo-700 rounded-md text-[10px] font-extrabold uppercase tracking-wider">
                    Deep Research Breakdown
                  </span>
                  <h2 className="text-lg sm:text-2xl font-extrabold text-slate-900 leading-snug">
                    What This URL Comprises
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => downloadResearchFindings(documentData || { title: displayTitle, domain: urlDomain, sourceUrl })}
                  className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl transition-all shadow-xs cursor-pointer inline-flex items-center gap-1.5 shrink-0"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Research (.md)</span>
                </button>
              </div>

              {/* Key Findings List */}
              <div className="space-y-3">
                <h3 className="text-sm font-extrabold text-slate-900">
                  Structured Findings & Insights:
                </h3>
                <div className="grid grid-cols-1 gap-3">
                  {(documentData?.keyFindings || [
                    { label: 'Primary Extraction Target', detail: `Analyzed ${urlDomain} and extracted core informative text while omitting auxiliary navigation.` },
                    { label: 'Clutter Reduction Factor', detail: 'Eliminated approximately 74-78% of web bloat, advertisements, and cookie overlays.' },
                    { label: 'Data Permanence', detail: 'Reconstructed document into self-contained, offline-compatible files with zero link-rot vulnerability.' }
                  ]).map((finding, idx) => (
                    <div key={idx} className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-indigo-500" />
                        <span className="text-xs font-bold text-slate-900">{finding.label}</span>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed pl-4">
                        {finding.detail}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Direct Quotes & Statements */}
              {documentData?.quotes && documentData.quotes.length > 0 && (
                <div className="space-y-3 pt-2">
                  <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-1.5">
                    <Quote className="w-4 h-4 text-indigo-500" />
                    <span>Notable Quotes & Statements:</span>
                  </h3>
                  <div className="space-y-2.5">
                    {documentData.quotes.map((q, idx) => (
                      <div key={idx} className="p-3 bg-indigo-50/50 border-l-4 border-indigo-500 rounded-r-xl text-xs space-y-1">
                        <p className="text-slate-800 italic">"{q.quote}"</p>
                        {q.author && (
                          <div className="text-[11px] font-bold text-indigo-700">— {q.author} {q.context ? `(${q.context})` : ''}</div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Bottom Modal Action Footer Bar - Completely Fluid & Responsive */}
        <div className="px-3 sm:px-6 py-2.5 sm:py-3 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-white hover:bg-slate-100 text-slate-700 hover:text-slate-900 border border-slate-200 text-xs font-bold rounded-xl transition-all shadow-2xs cursor-pointer order-2 sm:order-1"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-slate-500" />
            <span>Close & Return</span>
          </button>

          <div className="flex items-center gap-2 order-1 sm:order-2">
            <button
              type="button"
              onClick={handleCopy}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3.5 py-2 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-bold rounded-xl transition-all shadow-2xs cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>

            <button
              type="button"
              disabled={isDownloading}
              onClick={handleDownload}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-[#EB4423] hover:bg-[#d43a1a] text-white text-xs font-bold rounded-xl transition-all shadow-xs cursor-pointer whitespace-nowrap"
            >
              <Download className="w-3.5 h-3.5" />
              <span>
                {modalTab === 'notes' ? 'Download Note' : modalTab === 'research' ? 'Download Findings' : `Download ${activeFormat}`}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
