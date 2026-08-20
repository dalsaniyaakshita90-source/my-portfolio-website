import React, { useEffect, useState, useRef } from 'react';

export const InteractiveCursor: React.FC = () => {
  const [isTouch, setIsTouch] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [hoverLabel, setHoverLabel] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    // Detect touch devices
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      setIsTouch(true);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);
      mousePos.current = { x: e.clientX, y: e.clientY };

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }

      // Check interactive target
      const target = e.target as HTMLElement | null;
      if (target) {
        const interactiveEl = target.closest(
          'button, a, input, textarea, select, [data-cursor-hover], [role="button"], .cursor-pointer'
        ) as HTMLElement | null;

        if (interactiveEl) {
          setIsHovered(true);
          const label = interactiveEl.getAttribute('data-cursor-label');
          setHoverLabel(label);
        } else {
          setIsHovered(false);
          setHoverLabel(null);
        }
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    // Ultra smooth lerp loop for the trailing outer aura
    const render = () => {
      const ease = 0.16;
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * ease;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * ease;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)`;
      }

      rafRef.current = requestAnimationFrame(render);
    };

    rafRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isVisible]);

  if (isTouch) return null;

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-[99999] overflow-hidden select-none transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* 1. Precision Center Gold Dot */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 -ml-1 -mt-1 rounded-full bg-amber-300 pointer-events-none transition-transform duration-100 ease-out shadow-[0_0_10px_rgba(251,191,36,0.9)] ${
          isClicking ? 'w-2.5 h-2.5 -ml-1.25 -mt-1.25 scale-75' : isHovered ? 'w-2 h-2 scale-125 bg-white' : 'w-2 h-2'
        }`}
        style={{ willChange: 'transform' }}
      />

      {/* 2. Aesthetic Trailing Frosted Halo Ring */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 pointer-events-none rounded-full flex items-center justify-center transition-all duration-300 ease-out backdrop-blur-[2px] ${
          isHovered
            ? 'w-12 h-12 -ml-6 -mt-6 border border-amber-400/80 bg-amber-400/15 shadow-[0_0_24px_rgba(251,191,36,0.35)] scale-110'
            : isClicking
            ? 'w-8 h-8 -ml-4 -mt-4 border border-amber-300/90 bg-amber-300/25 scale-90'
            : 'w-8 h-8 -ml-4 -mt-4 border border-white/30 bg-white/5'
        }`}
        style={{ willChange: 'transform' }}
      >
        {/* Sleek Floating Hover Micro-Pill */}
        {hoverLabel && (
          <div className="absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap px-2.5 py-0.5 rounded-full bg-black/85 border border-amber-400/40 text-[10px] font-mono font-medium tracking-wider text-amber-200 shadow-xl backdrop-blur-md animate-fadeIn">
            {hoverLabel}
          </div>
        )}
      </div>
    </div>
  );
};
