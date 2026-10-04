/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Logo } from './Logo';
import { ArrowUpRight, Menu, X } from 'lucide-react';

interface NavbarProps {
  onTryClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onTryClick }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full pointer-events-none transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-3 pb-2 pointer-events-auto">
        <div 
          className={`flex items-center justify-between h-14 px-4 sm:px-6 rounded-full transition-all duration-200 ${
            isScrolled 
              ? 'bg-white/95 backdrop-blur-xl border border-slate-200/90 shadow-lg shadow-slate-900/5' 
              : 'bg-white/85 backdrop-blur-md border border-slate-200/70 shadow-xs'
          }`}
        >
          {/* Brand Zone: Fetchly Logo */}
          <a href="#" className="flex items-center gap-2 group cursor-pointer">
            <Logo size={32} />
          </a>

          {/* Center Zone: Nav Links */}
          <nav className="hidden md:flex items-center gap-7 text-[13px] font-semibold text-slate-600">
            <a href="#what-is-fetchly" className="hover:text-slate-900 transition-colors cursor-pointer">Features</a>
            <a href="#how-it-works" className="hover:text-slate-900 transition-colors cursor-pointer">How It Works</a>
            <a href="#use-cases" className="hover:text-slate-900 transition-colors cursor-pointer">Use Cases</a>
            <a href="#supported-formats" className="hover:text-slate-900 transition-colors cursor-pointer">Formats</a>
            <a href="#why-fetchly" className="hover:text-slate-900 transition-colors cursor-pointer">Why Fetchly</a>
          </nav>

          {/* Right Zone: Primary CTA */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={onTryClick}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-full shadow-xs transition-all cursor-pointer whitespace-nowrap"
            >
              <span>Try Fetchly</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-slate-200" />
            </button>
          </div>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 text-slate-600 hover:text-slate-900 cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-2 p-5 bg-white/95 backdrop-blur-xl border border-slate-200 rounded-3xl shadow-xl space-y-4 animate-fadeIn">
            <nav className="flex flex-col space-y-3 text-sm font-semibold text-slate-700">
              <a 
                href="#what-is-fetchly" 
                onClick={() => setMobileMenuOpen(false)}
                className="px-2 py-1.5 hover:text-orange-600 transition-colors"
              >
                Features
              </a>
              <a 
                href="#how-it-works" 
                onClick={() => setMobileMenuOpen(false)}
                className="px-2 py-1.5 hover:text-orange-600 transition-colors"
              >
                How It Works
              </a>
              <a 
                href="#use-cases" 
                onClick={() => setMobileMenuOpen(false)}
                className="px-2 py-1.5 hover:text-orange-600 transition-colors"
              >
                Use Cases
              </a>
              <a 
                href="#supported-formats" 
                onClick={() => setMobileMenuOpen(false)}
                className="px-2 py-1.5 hover:text-orange-600 transition-colors"
              >
                Formats
              </a>
              <a 
                href="#why-fetchly" 
                onClick={() => setMobileMenuOpen(false)}
                className="px-2 py-1.5 hover:text-orange-600 transition-colors"
              >
                Why Fetchly
              </a>
            </nav>
            <div className="pt-2 border-t border-slate-100">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onTryClick();
                }}
                className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-full transition-colors flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
              >
                <span>Try Fetchly</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
