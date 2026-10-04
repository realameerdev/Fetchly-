/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from 'react';

interface SilkRevealProps {
  children: React.ReactNode;
  delay?: number; // In milliseconds
  duration?: number; // In seconds
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  distance?: number; // Translation distance in px
  className?: string;
  triggerOnce?: boolean;
}

export const SilkReveal: React.FC<SilkRevealProps> = ({
  children,
  delay = 0,
  duration = 0.75,
  direction = 'up',
  distance = 32,
  className = '',
  triggerOnce = true,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce) {
            observer.unobserve(el);
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, [triggerOnce]);

  const getTransform = () => {
    if (isVisible) return 'translate3d(0, 0, 0) scale(1)';
    switch (direction) {
      case 'up':
        return `translate3d(0, ${distance}px, 0) scale(0.98)`;
      case 'down':
        return `translate3d(0, -${distance}px, 0) scale(0.98)`;
      case 'left':
        return `translate3d(${distance}px, 0, 0) scale(0.98)`;
      case 'right':
        return `translate3d(-${distance}px, 0, 0) scale(0.98)`;
      case 'none':
        return 'scale(0.97)';
      default:
        return `translate3d(0, ${distance}px, 0) scale(0.98)`;
    }
  };

  return (
    <div
      ref={elementRef}
      className={`transition-all ${className}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: getTransform(),
        transitionDuration: `${duration}s`,
        transitionDelay: `${delay}ms`,
        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
        willChange: 'transform, opacity',
      }}
    >
      {children}
    </div>
  );
};
