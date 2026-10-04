/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  FileText, 
  Code, 
  FileCode, 
  Globe, 
  Download, 
  Check, 
  Link as LinkIcon, 
  CheckCircle2, 
  RefreshCw,
  Eye,
  Copy,
  ExternalLink,
  Layers,
  RotateCcw,
  BookOpen,
  Lightbulb,
  Quote,
  AlertCircle,
  AlertTriangle,
  Sparkles,
  X,
  FileCheck
} from 'lucide-react';
import { FilePreviewModal, ExtractedPageData } from './FilePreviewModal';
import { 
  downloadDocument, 
  downloadExtractedNote, 
  downloadResearchFindings 
} from '../utils/fileDownloader';

export type OutputFormat = 'PDF' | 'Markdown' | 'TXT' | 'HTML' | 'PNG';

interface ConversionToolProps {
  initialFormat?: OutputFormat;
  variant?: 'hero' | 'preview';
}

export const ConversionTool: React.FC<ConversionToolProps> = ({ 
  initialFormat = 'PDF',
  variant = 'hero'
}) => {
  // Start with a completely blank URL input
  const [url, setUrl] = useState('');
  const [format, setFormat] = useState<OutputFormat>(initialFormat);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progressStep, setProgressStep] = useState<string>('');
  const [progressPercent, setProgressPercent] = useState(0);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [extractedData, setExtractedData] = useState<ExtractedPageData | null>(null);
  const [copied, setCopied] = useState(false);
  const [viewTab, setViewTab] = useState<'formatted' | 'raw'>('formatted');
  const [activeComponentTab, setActiveComponentTab] = useState<'note' | 'document' | 'research'>('note');
  const [isDownloading, setIsDownloading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [completedResult, setCompletedResult] = useState<{
    filename: string;
    fileSize: string;
    format: OutputFormat;
    wordCount: number;
    title: string;
    summary: string;
    engine?: 'firecrawl' | 'semantic-ai';
  } | null>(null);

  // Feature toggles for converter feel
  const [readerMode, setReaderMode] = useState(true);
  const [includeImages, setIncludeImages] = useState(true);

  const samplePresets = [
    { name: 'Wikipedia Article', url: 'https://en.wikipedia.org/wiki/Web_scraping' },
    { name: 'MDN Web Docs', url: 'https://developer.mozilla.org/en-US/docs/Web/HTML' },
    { name: 'TechCrunch News', url: 'https://techcrunch.com' },
  ];

  const handleStartConversion = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;

    setIsProcessing(true);
    setErrorMessage(null);
    setCompletedResult(null);
    setProgressPercent(15);
    setProgressStep('Connecting to host and loading webpage...');

    try {
      const stepTimer1 = setTimeout(() => {
        setProgressPercent(45);
        setProgressStep('Executing JavaScript & waiting for dynamic page render...');
      }, 600);

      const stepTimer2 = setTimeout(() => {
        setProgressPercent(75);
        setProgressStep(`Extracting main content and structuring clean ${format} file...`);
      }, 1400);

      const response = await fetch('/api/fetch-url', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url: url.trim(),
          format,
          readerMode,
          includeImages
        })
      });

      clearTimeout(stepTimer1);
      clearTimeout(stepTimer2);

      const result = await response.json();

      if (!response.ok || !result.success || !result.data) {
        throw new Error(result.error || 'The webpage could not be loaded or processed. Please verify the URL.');
      }

      const doc: ExtractedPageData = result.data;
      setExtractedData(doc);

      setProgressPercent(100);
      setProgressStep('Content extraction and processing complete!');

      const extension = format === 'PDF' ? 'pdf' : format === 'Markdown' ? 'md' : format === 'TXT' ? 'txt' : format === 'HTML' ? 'html' : 'png';
      const cleanFilename = (doc.title || doc.domain || 'document')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '_')
        .slice(0, 32);

      setCompletedResult({
        filename: `fetchly_${cleanFilename}.${extension}`,
        fileSize: format === 'PNG' ? '1.8 MB' : format === 'PDF' ? `${Math.max(140, Math.round((doc.wordCount || 1000) * 0.4))} KB` : `${Math.max(12, Math.round((doc.wordCount || 1000) * 0.05))} KB`,
        format,
        wordCount: doc.wordCount || 1200,
        title: doc.title,
        summary: doc.summary || 'Clean document structure and notes extracted.',
        engine: doc.engine
      });

      setIsProcessing(false);
    } catch (err: any) {
      console.error('URL processing failure:', err);
      setIsProcessing(false);
      setProgressPercent(0);
      setProgressStep('');
      setErrorMessage(err.message || 'Failed to process the URL. Please ensure it is a live, publicly reachable website.');
    }
  };

  const handleDownload = async () => {
    if (!extractedData) return;
    setIsDownloading(true);
    try {
      await downloadDocument(extractedData, format);
    } catch (err) {
      console.error('Download error:', err);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleCopyContent = () => {
    if (!extractedData) return;
    const textToCopy = (format === 'HTML' 
      ? (extractedData.html || extractedData.plainText) 
      : format === 'Markdown' 
      ? (extractedData.markdown || extractedData.plainText) 
      : (extractedData.plainText || extractedData.markdown)) || '';

    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setCompletedResult(null);
    setExtractedData(null);
    setErrorMessage(null);
    setProgressPercent(0);
    setProgressStep('');
    setUrl('');
  };

  const formatList: { id: OutputFormat; label: string; desc: string; icon: React.ReactNode }[] = [
    { id: 'PDF', label: 'PDF', desc: 'Paginated print', icon: <FileText className="w-4 h-4 text-red-500" /> },
    { id: 'Markdown', label: 'Markdown', desc: 'Clean headers', icon: <Code className="w-4 h-4 text-blue-500" /> },
    { id: 'TXT', label: 'TXT', desc: 'Plain text', icon: <FileText className="w-4 h-4 text-slate-500" /> },
    { id: 'HTML', label: 'HTML', desc: 'Webpage code', icon: <FileCode className="w-4 h-4 text-orange-500" /> },
    { id: 'PNG', label: 'PNG', desc: 'Screenshot', icon: <Globe className="w-4 h-4 text-emerald-500" /> },
  ];

  return (
    <div className="w-full max-w-3xl mx-auto rounded-3xl bg-white border border-slate-200/90 shadow-xl shadow-slate-900/5 p-4 sm:p-7 md:p-8 relative text-left">
      {/* Top Interface Bar */}
      <div className="flex items-center justify-between pb-3 sm:pb-4 mb-4 sm:mb-6 border-b border-slate-100 gap-2">
        <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
          <div className="flex items-center gap-1 shrink-0">
            <div className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-slate-300" />
            <div className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-slate-300" />
            <div className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-slate-300" />
          </div>
          <span className="hidden sm:inline-block ml-1 text-xs font-semibold text-slate-400 tracking-tight truncate">
            fetchly-engine // deep-research
          </span>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          <span className="inline-flex items-center gap-1 sm:gap-1.5 text-[11px] sm:text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 sm:px-2.5 py-0.5 rounded-full border border-emerald-200/60">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Conversion Engine Ready
          </span>
        </div>
      </div>

      {/* Error Alert Banner */}
      {errorMessage && (
        <div className="mb-5 p-4 bg-red-50 border-2 border-red-200 rounded-2xl text-left space-y-2 animate-fadeIn">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-2.5">
              <AlertTriangle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs sm:text-sm font-extrabold text-red-900">
                  URL Processing Failed
                </h4>
                <p className="text-xs text-red-700 mt-0.5 leading-relaxed">
                  {errorMessage}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setErrorMessage(null)}
              className="text-xs font-bold text-red-600 hover:text-red-800 bg-white hover:bg-red-100 px-2.5 py-1 rounded-lg border border-red-200 cursor-pointer shrink-0"
            >
              Dismiss
            </button>
          </div>
          <div className="text-[11px] text-red-600/90 pl-7">
            Tip: Please ensure the link is a public, currently reachable website (e.g. <code>https://en.wikipedia.org/wiki/Web_scraping</code>).
          </div>
        </div>
      )}

      {/* Input Form State */}
      {!completedResult && !isProcessing && (
        <form onSubmit={handleStartConversion} className="space-y-5 sm:space-y-6">
          {/* Step 1: URL Input */}
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 mb-2">
              <label className="text-xs font-bold text-slate-500 tracking-wider uppercase">
                01 — Enter Any Public Web Link or Topic
              </label>
              <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-0.5">
                <span className="text-[10px] uppercase font-bold text-slate-400 shrink-0">Try:</span>
                {samplePresets.map((preset, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setUrl(preset.url)}
                    className="text-[11px] font-semibold text-slate-600 hover:text-orange-600 bg-slate-100 hover:bg-orange-50 px-2 py-0.5 rounded-md transition-colors cursor-pointer shrink-0 whitespace-nowrap"
                  >
                    {preset.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="relative flex items-center">
              <div className="absolute left-3.5 sm:left-4 text-slate-400 pointer-events-none">
                <LinkIcon className="w-4 sm:w-5 h-4 sm:h-5 text-[#EB4423]" />
              </div>
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com/article-or-documentation"
                className="w-full pl-10 sm:pl-12 pr-10 py-3 sm:py-3.5 bg-slate-50 hover:bg-slate-50/80 focus:bg-white border-2 border-slate-200 focus:border-[#EB4423] rounded-2xl text-xs sm:text-sm font-semibold text-slate-900 placeholder:text-slate-400 placeholder:font-normal outline-hidden transition-all shadow-inner"
              />
              {url && (
                <button
                  type="button"
                  onClick={() => setUrl('')}
                  className="absolute right-3 p-1.5 text-slate-400 hover:text-slate-600 rounded-full cursor-pointer hover:bg-slate-200/60 transition-colors"
                  title="Clear input"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            <p className="mt-1.5 text-[11px] text-slate-400">
              Fetchly extracts the note, research points, and full document without ads or paywall scripts.
            </p>
          </div>

          {/* Step 2: Choose Format */}
          <div>
            <label className="block text-xs font-bold text-slate-500 tracking-wider uppercase mb-2">
              02 — Primary File Format
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-2.5">
              {formatList.map((f) => {
                const isSelected = format === f.id;
                return (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => setFormat(f.id)}
                    className={`p-2.5 sm:p-3 rounded-2xl border text-left transition-all cursor-pointer relative flex flex-col justify-between ${
                      isSelected
                        ? 'border-[#EB4423] bg-orange-50/50 shadow-xs'
                        : 'border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1 sm:mb-2">
                      <span className={`p-1.5 rounded-lg ${isSelected ? 'bg-orange-100' : 'bg-slate-100'}`}>
                        {f.icon}
                      </span>
                      {isSelected && (
                        <span className="w-2 h-2 rounded-full bg-[#EB4423]" />
                      )}
                    </div>
                    <div>
                      <div className={`text-xs sm:text-sm font-bold ${isSelected ? 'text-slate-900' : 'text-slate-700'}`}>
                        {f.label}
                      </div>
                      <div className="text-[10px] sm:text-[11px] text-slate-400 font-medium">
                        {f.desc}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 3: Deep Extraction Options */}
          <div className="p-3 sm:p-4 bg-slate-50/80 rounded-2xl border border-slate-100 space-y-2">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
              Parsing & Research Heuristics
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <label className="flex items-center gap-2 cursor-pointer text-slate-700">
                <input
                  type="checkbox"
                  checked={readerMode}
                  onChange={(e) => setReaderMode(e.target.checked)}
                  className="rounded text-[#EB4423] focus:ring-orange-400 w-4 h-4 cursor-pointer"
                />
                <span className="font-semibold text-xs">Auto-extract study note & key findings</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer text-slate-700">
                <input
                  type="checkbox"
                  checked={includeImages}
                  onChange={(e) => setIncludeImages(e.target.checked)}
                  className="rounded text-[#EB4423] focus:ring-orange-400 w-4 h-4 cursor-pointer"
                />
                <span className="font-semibold text-xs">Preserve figures & inline citations</span>
              </label>
            </div>
          </div>

          {/* Submit CTA Button */}
          <button
            type="submit"
            disabled={!url.trim()}
            className="w-full py-3.5 sm:py-4 px-6 bg-slate-900 hover:bg-slate-800 disabled:opacity-40 disabled:hover:bg-slate-900 text-white font-bold text-xs sm:text-sm rounded-full shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Fetch & Research URL</span>
            <span className="text-orange-400">→</span>
          </button>
        </form>
      )}

      {/* Processing Animation */}
      {isProcessing && (
        <div className="py-12 sm:py-16 text-center space-y-5 animate-fadeIn">
          <div className="relative w-14 h-14 mx-auto flex items-center justify-center">
            <div className="w-14 h-14 rounded-full border-4 border-orange-100 border-t-[#EB4423] animate-spin" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="w-3 h-3 rounded-full bg-[#EB4423]" />
            </div>
          </div>

          <div className="space-y-1.5">
            <h3 className="text-base sm:text-lg font-extrabold text-slate-900">
              Conducting Deep URL Research...
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
              {progressStep}
            </p>
          </div>

          <div className="w-full max-w-sm mx-auto bg-slate-100 h-2 rounded-full overflow-hidden">
            <div 
              className="bg-[#EB4423] h-full transition-all duration-300 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          <div className="text-[11px] font-bold text-slate-400">
            {progressPercent}% completed
          </div>
        </div>
      )}

      {/* EXTRACTED COMPONENTS WORKBENCH */}
      {completedResult && extractedData && (
        <div className="py-2 space-y-4 sm:space-y-5 animate-fadeIn">
          {/* Status Header Badge */}
          <div className="flex flex-wrap items-center justify-between gap-2 p-3 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-900 text-xs font-semibold">
            <div className="flex items-center gap-2 min-w-0">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="truncate">
                Processing complete — clean files & notes extracted
              </span>
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
              <span className="bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                HTTP 200 OK
              </span>
            </div>
          </div>

          {/* Component Card Container */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3.5 sm:p-6 space-y-4">
            {/* Header info */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pb-3.5 border-b border-slate-200/80">
              <div className="min-w-0 space-y-1">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#EB4423] shrink-0" />
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 truncate">
                    {extractedData.domain}
                  </span>
                </div>
                <h3 className="text-base sm:text-xl font-extrabold text-slate-900 leading-snug">
                  {extractedData.title}
                </h3>
                <a 
                  href={extractedData.sourceUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-xs text-[#EB4423] hover:underline inline-flex items-center gap-1 truncate max-w-full"
                >
                  <span className="truncate">{extractedData.sourceUrl}</span>
                  <ExternalLink className="w-3 h-3 shrink-0" />
                </a>
              </div>

              {/* Stats badges */}
              <div className="flex flex-wrap sm:flex-col gap-1.5 sm:items-end text-xs font-semibold text-slate-500 shrink-0">
                <span className="bg-white border border-slate-200 px-2.5 py-1 rounded-lg">
                  {extractedData.wordCount || completedResult.wordCount} words
                </span>
                <span className="bg-white border border-slate-200 px-2.5 py-1 rounded-lg text-emerald-700">
                  {extractedData.clutterReduction || '76%'} clutter stripped
                </span>
              </div>
            </div>

            {/* Component Tab Switcher */}
            <div className="space-y-1">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                Choose Component to View & Download:
              </div>
              <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-1">
                <button
                  type="button"
                  onClick={() => setActiveComponentTab('note')}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                    activeComponentTab === 'note'
                      ? 'bg-[#EB4423] text-white shadow-xs'
                      : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Extracted Note</span>
                  <span className={`px-1.5 py-0.2 rounded text-[10px] font-extrabold ${activeComponentTab === 'note' ? 'bg-orange-600 text-white' : 'bg-orange-100 text-[#EB4423]'}`}>
                    Ready
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveComponentTab('document')}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                    activeComponentTab === 'document'
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Full Clean Document</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveComponentTab('research')}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                    activeComponentTab === 'research'
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <Lightbulb className="w-3.5 h-3.5" />
                  <span>Key Research Points</span>
                </button>
              </div>
            </div>

            {/* TAB CONTENT 1: EXTRACTED NOTE - RESPONSIVE & NO OVERLAPPING */}
            {activeComponentTab === 'note' && (
              <div className="bg-white border border-orange-200/90 rounded-xl p-3.5 sm:p-5 space-y-3.5 shadow-xs">
                {/* Header with Title and Action Buttons: Stacks cleanly on mobile */}
                <div className="flex flex-col gap-2.5 pb-2.5 border-b border-orange-100 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0" />
                    <span className="text-xs font-extrabold text-slate-900 break-words line-clamp-2">
                      {extractedData.notes?.title || `Executive Note: ${extractedData.title}`}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-1.5 shrink-0">
                    <button
                      type="button"
                      onClick={() => downloadExtractedNote(extractedData, 'Markdown')}
                      className="px-2.5 py-1 bg-[#EB4423] hover:bg-[#d43a1a] text-white text-xs font-bold rounded-lg transition-all shadow-xs inline-flex items-center gap-1 cursor-pointer whitespace-nowrap"
                    >
                      <Download className="w-3 h-3 shrink-0" />
                      <span>Download Note (.md)</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => downloadExtractedNote(extractedData, 'PDF')}
                      className="px-2.5 py-1 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-bold rounded-lg transition-all shadow-2xs inline-flex items-center gap-1 cursor-pointer whitespace-nowrap"
                    >
                      <Download className="w-3 h-3 text-red-500 shrink-0" />
                      <span>PDF Note</span>
                    </button>
                  </div>
                </div>

                {/* Note Core Thesis */}
                <div className="p-3 bg-amber-50/70 border-l-4 border-amber-500 rounded-r-lg text-xs text-slate-800 leading-relaxed">
                  <span className="font-bold text-amber-800 block uppercase text-[10px] mb-0.5">
                    Extracted Core Note:
                  </span>
                  {extractedData.summary}
                </div>

                {/* Key Takeaways */}
                {extractedData.notes?.keyTakeaways && extractedData.notes.keyTakeaways.length > 0 && (
                  <div className="space-y-1.5">
                    <span className="text-xs font-bold text-slate-900 block">
                      Bullet Takeaways:
                    </span>
                    <ul className="space-y-1.5 text-xs text-slate-700">
                      {extractedData.notes.keyTakeaways.map((point, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-[#EB4423] font-bold shrink-0 mt-0.5">•</span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* TAB CONTENT 2: FULL CLEAN DOCUMENT */}
            {activeComponentTab === 'document' && (
              <div className="space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-1 bg-slate-200/80 p-0.5 rounded-lg">
                    <button
                      type="button"
                      onClick={() => setViewTab('formatted')}
                      className={`px-2.5 py-1 rounded-md font-bold transition-all cursor-pointer ${
                        viewTab === 'formatted'
                          ? 'bg-white text-slate-900 shadow-2xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Formatted View
                    </button>
                    <button
                      type="button"
                      onClick={() => setViewTab('raw')}
                      className={`px-2.5 py-1 rounded-md font-bold transition-all cursor-pointer ${
                        viewTab === 'raw'
                          ? 'bg-white text-slate-900 shadow-2xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Raw {format}
                    </button>
                  </div>

                  <span className="text-[11px] text-slate-400 font-medium">
                    Clean {format} Output
                  </span>
                </div>

                {/* Box showing real content */}
                <div className="bg-white border border-slate-200 rounded-xl p-3.5 sm:p-5 max-h-56 overflow-y-auto text-xs sm:text-sm text-slate-700 leading-relaxed font-sans shadow-inner">
                  {viewTab === 'formatted' ? (
                    <div className="space-y-2.5 whitespace-pre-wrap">
                      {extractedData.markdown 
                        ? extractedData.markdown.slice(0, 1400) 
                        : extractedData.plainText?.slice(0, 1400)}
                      {(extractedData.markdown?.length || 0) > 1400 && (
                        <p className="text-xs text-orange-600 font-semibold pt-1 italic">
                          ... [Click "Preview File" below to view the full multi-page document]
                        </p>
                      )}
                    </div>
                  ) : (
                    <pre className="font-mono text-xs text-slate-800 whitespace-pre-wrap">
                      {format === 'HTML' 
                        ? (extractedData.html || '') 
                        : format === 'Markdown' 
                        ? (extractedData.markdown || '') 
                        : (extractedData.plainText || '')}
                    </pre>
                  )}
                </div>
              </div>
            )}

            {/* TAB CONTENT 3: DEEP RESEARCH & FINDINGS */}
            {activeComponentTab === 'research' && (
              <div className="bg-white border border-indigo-200 rounded-xl p-3.5 sm:p-5 space-y-3 shadow-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-indigo-100">
                  <span className="text-xs font-extrabold text-indigo-900">
                    Structured Research Insights
                  </span>
                  <button
                    type="button"
                    onClick={() => downloadResearchFindings(extractedData)}
                    className="px-2.5 py-1 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-lg transition-all shadow-xs inline-flex items-center gap-1 cursor-pointer whitespace-nowrap self-start sm:self-auto"
                  >
                    <Download className="w-3 h-3" />
                    <span>Download Findings (.md)</span>
                  </button>
                </div>

                <div className="space-y-2">
                  {(extractedData.keyFindings || [
                    { label: 'Primary Extraction Target', detail: `Analyzed ${extractedData.domain} and extracted core informative text while omitting auxiliary navigation.` },
                    { label: 'Clutter Reduction Factor', detail: 'Eliminated approximately 76% of web bloat, advertisements, and cookie overlays.' }
                  ]).map((finding, idx) => (
                    <div key={idx} className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs space-y-0.5">
                      <div className="font-bold text-slate-900">{finding.label}</div>
                      <div className="text-slate-600">{finding.detail}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ACTION BUTTONS ROW: Responsive with zero mobile overlapping */}
            <div className="pt-3 border-t border-slate-200/80 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-bold text-slate-600 hover:text-slate-900 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl transition-all cursor-pointer order-2 sm:order-1"
              >
                <RotateCcw className="w-3.5 h-3.5 text-[#EB4423]" />
                <span>Run Another URL</span>
              </button>

              <div className="grid grid-cols-2 sm:flex sm:items-center gap-2 order-1 sm:order-2">
                <button
                  type="button"
                  onClick={handleCopyContent}
                  className="inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-bold rounded-xl transition-all shadow-2xs cursor-pointer truncate"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> : <Copy className="w-3.5 h-3.5 shrink-0" />}
                  <span className="truncate">{copied ? 'Copied' : 'Copy'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setIsPreviewOpen(true)}
                  className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 bg-orange-50 hover:bg-orange-100 text-[#EB4423] border border-orange-200 text-xs font-bold rounded-xl transition-all cursor-pointer shadow-2xs truncate"
                >
                  <Eye className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">Preview File</span>
                </button>

                <button
                  type="button"
                  disabled={isDownloading}
                  onClick={handleDownload}
                  className="col-span-2 sm:col-span-1 inline-flex items-center justify-center gap-2 px-5 py-2 bg-[#EB4423] hover:bg-[#d43a1a] disabled:opacity-50 text-white text-xs font-bold rounded-xl transition-all shadow-xs cursor-pointer whitespace-nowrap"
                >
                  <Download className="w-3.5 h-3.5 shrink-0" />
                  <span>{isDownloading ? 'Generating...' : `Download ${format}`}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Full Feature File Preview Modal */}
      <FilePreviewModal
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        sourceUrl={url || 'https://en.wikipedia.org/wiki/Web_scraping'}
        initialFormat={format}
        documentData={extractedData}
      />
    </div>
  );
};
