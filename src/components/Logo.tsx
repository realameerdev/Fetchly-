/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ 
  className = '', 
  size = 36,
  showText = true 
}) => {
  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      {/* Official Fetchly Logo Icon with exact folded ribbon 'F' */}
      <div 
        className="relative flex items-center justify-center rounded-xl bg-[#EB4423] shadow-xs overflow-hidden shrink-0 select-none"
        style={{ width: size, height: size }}
      >
        <svg 
          viewBox="0 0 100 100" 
          className="w-[72%] h-[72%]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Soft inner shadow on the paper fold underneath the top bar */}
            <linearGradient id="foldShadow" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#c8ccd2" />
              <stop offset="50%" stopColor="#dde0e5" />
              <stop offset="100%" stopColor="#ffffff" />
            </linearGradient>
            {/* Subtle soft gradient on the lower turn */}
            <linearGradient id="foldShadowLower" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#d2d5db" />
              <stop offset="100%" stopColor="#ffffff" />
            </linearGradient>
          </defs>

          {/* Bottom tail pointing down-left */}
          <polygon points="12,68 32,46 56,46 44,70 24,94 12,68" fill="#ffffff" />
          
          {/* Lower fold shadow under the middle segment */}
          <polygon points="12,68 32,46 22,46 12,68" fill="url(#foldShadowLower)" opacity="0.65" />

          {/* Middle horizontal bar of the 'F' */}
          <polygon points="22,46 68,46 56,70 12,70" fill="#ffffff" />

          {/* Intermediate fold under top bar */}
          <polygon points="18,46 56,46 50,34 16,34" fill="url(#foldShadow)" opacity="0.9" />

          {/* Top horizontal bar of the 'F' */}
          <polygon points="30,16 84,16 70,40 18,40" fill="#ffffff" />
        </svg>
      </div>
      
      {showText && (
        <span className="font-extrabold tracking-tight text-xl text-slate-900 font-['Manrope']">
          Fetchly
        </span>
      )}
    </div>
  );
};
