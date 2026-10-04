/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Logo } from './Logo';
import { ShieldCheck, ArrowUp, X, Check, Coffee, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  const [privacyModalOpen, setPrivacyModalOpen] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-white py-12 sm:py-16 border-t border-slate-100 text-xs text-slate-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
        {/* Support the Builder - Subtle, Warm, Personal & Premium */}
        <div className="rounded-2xl bg-gradient-to-r from-orange-50/70 via-amber-50/40 to-slate-50/50 border border-orange-200/60 p-4 sm:p-5 md:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-left">
          <div className="flex items-start sm:items-center gap-3.5 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-white border border-orange-200/80 shadow-2xs flex items-center justify-center text-[#EB4423] shrink-0">
              <Coffee className="w-5 h-5" />
            </div>
            <div className="space-y-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#EB4423]">
                  Support the Builder
                </span>
                <span className="w-1 h-1 rounded-full bg-orange-300 hidden sm:inline-block" />
                <span className="text-[11px] font-medium text-slate-400 hidden sm:inline-block">
                  Independent Project
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal max-w-2xl">
                Built with late nights, good ideas, and plenty of coffee. If Fetchly saved you some time, you can fuel the next update with a coffee.
              </p>
            </div>
          </div>

          <a
            href="https://devameer.xyz/buy-me-a-coffee"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 bg-[#EB4423] hover:bg-[#d43a1a] text-white text-xs font-bold rounded-xl shadow-xs hover:shadow-md transition-all cursor-pointer shrink-0 whitespace-nowrap group"
          >
            <Coffee className="w-4 h-4 transition-transform group-hover:rotate-6" />
            <span>Buy Me a Coffee</span>
            <ExternalLink className="w-3 h-3 text-orange-200 group-hover:translate-x-0.5 transition-transform" />
          </a>
        </div>

        {/* Main Footer Row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8 text-center md:text-left">
          {/* Brand & Copyright */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <a href="#" className="cursor-pointer">
              <Logo size={28} />
            </a>
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
              <span className="text-slate-900 font-bold">Fetchly</span>
              <span className="hidden sm:inline text-slate-300">·</span>
              <span className="text-slate-400 text-[11px] sm:text-xs">
                © {new Date().getFullYear()} Fetchly Technologies. Turn URLs into clean files.
              </span>
            </div>
          </div>

          {/* Navigation Links - Responsive Wrap with balanced gaps */}
          <nav className="flex flex-wrap items-center justify-center gap-x-5 sm:gap-x-7 gap-y-2.5 text-xs font-semibold text-slate-600">
            <a href="#what-is-fetchly" className="hover:text-slate-900 transition-colors cursor-pointer">
              Features
            </a>
            <a href="#how-it-works" className="hover:text-slate-900 transition-colors cursor-pointer">
              How It Works
            </a>
            <a href="#use-cases" className="hover:text-slate-900 transition-colors cursor-pointer">
              Use Cases
            </a>
            <a href="#supported-formats" className="hover:text-slate-900 transition-colors cursor-pointer">
              Formats
            </a>
            <a href="#why-fetchly" className="hover:text-slate-900 transition-colors cursor-pointer">
              Why Fetchly
            </a>
            <button
              type="button"
              onClick={() => setPrivacyModalOpen(true)}
              className="hover:text-slate-900 transition-colors text-slate-400 cursor-pointer"
            >
              Privacy & Security
            </button>
          </nav>
        </div>

        {/* Bottom Sub-footer Bar for Mobile & Desktop */}
        <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400 text-center sm:text-left">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3">
            <span className="inline-flex items-center gap-1.5 text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-semibold border border-emerald-200/50">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              All Systems Operational
            </span>
            <span>100% Client-Side In-Memory Processing</span>
          </div>

          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 text-slate-500 hover:text-slate-900 font-semibold transition-colors cursor-pointer p-1"
            aria-label="Scroll back to top"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Accessible In-App Privacy Modal (Zero alerts, fully mobile responsive) */}
      {privacyModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-fadeIn"
          onClick={() => setPrivacyModalOpen(false)}
        >
          <div 
            className="bg-white rounded-3xl border border-slate-200 shadow-2xl p-6 sm:p-8 max-w-lg w-full text-left space-y-4 animate-scaleUp"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-orange-50 border border-orange-200/80 flex items-center justify-center text-[#EB4423]">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <h3 className="text-base font-extrabold text-slate-900">
                  Privacy & Data Promise
                </h3>
              </div>
              <button
                onClick={() => setPrivacyModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-600 leading-relaxed font-normal">
              <p>
                Fetchly was built on a zero-retention philosophy. When you enter a public URL to extract documents:
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Zero Server Logging:</strong> We do not log or track the URLs you convert.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>In-Memory Generation:</strong> Download bundles (PDF, MD, TXT, HTML, PNG) are generated ephemeral in your local memory.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>No Tracking Cookies:</strong> No advertising trackers, profiling cookies, or third-party pixel beacons.</span>
                </li>
              </ul>
            </div>

            <div className="pt-3 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setPrivacyModalOpen(false)}
                className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-all cursor-pointer"
              >
                Got it
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};
