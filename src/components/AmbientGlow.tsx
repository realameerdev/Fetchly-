/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

export const AmbientGlow: React.FC = () => {
  return (
    <div className="absolute top-0 left-0 right-0 h-[600px] overflow-hidden pointer-events-none z-0">
      {/* Soft warm ambient radial illumination */}
      <div 
        className="absolute -top-40 left-1/2 -translate-x-1/2 w-[1100px] h-[550px] opacity-70 blur-3xl pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 65% 55% at 50% 15%, rgba(235, 68, 35, 0.22) 0%, rgba(255, 120, 50, 0.12) 40%, rgba(255, 180, 100, 0.04) 70%, transparent 100%)'
        }}
      />
    </div>
  );
};
