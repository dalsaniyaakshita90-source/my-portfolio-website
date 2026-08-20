import React, { useRef, useEffect } from 'react';

interface PixelWarpTransitionProps {
  triggerKey: number | string;
}

export const PixelWarpTransition: React.FC<PixelWarpTransitionProps> = ({ triggerKey }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animFrame: number;
    const width = (canvas.width = window.innerWidth);
    const height = (canvas.height = window.innerHeight);

    let progress = 0;
    const duration = 28; // frames (~450ms)

    const cols = 24;
    const rows = 14;
    const cellW = Math.ceil(width / cols);
    const cellH = Math.ceil(height / rows);

    const render = () => {
      progress++;
      ctx.clearRect(0, 0, width, height);

      const ratio = progress / duration;
      const alpha = ratio < 0.5 ? ratio * 2 : (1 - ratio) * 2;

      // Draw cyber retro pixel dissolve blocks
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const noise = ((r * 17 + c * 31) % 100) / 100;
          if (noise < alpha * 0.9) {
            const isGold = (r + c) % 2 === 0;
            ctx.fillStyle = isGold ? '#fbbf24' : '#38bdf8';
            ctx.globalAlpha = Math.min(0.35, alpha * 0.4);
            ctx.fillRect(c * cellW, r * cellH, cellW - 1, cellH - 1);
          }
        }
      }

      if (progress < duration) {
        animFrame = requestAnimationFrame(render);
      } else {
        ctx.clearRect(0, 0, width, height);
      }
    };

    render();

    return () => {
      if (animFrame) cancelAnimationFrame(animFrame);
    };
  }, [triggerKey]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-40"
    />
  );
};
