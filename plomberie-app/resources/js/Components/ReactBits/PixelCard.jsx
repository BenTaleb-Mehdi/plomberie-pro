import { useEffect, useRef, useState } from 'react';

export default function PixelCard({
  children,
  variant = 'pink',
  gap = 4,
  speed = 35,
  colors = '#478ed1,#9ad3ff,#ecf6ff',
  noFocus = false,
  className = '',
}) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const pixelsRef = useRef([]);
  const animationRef = useRef(null);
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const container = containerRef.current;
    
    const colorArray = colors.split(',');

    const resize = () => {
      canvas.width = container.offsetWidth;
      canvas.height = container.offsetHeight;
      initPixels();
    };

    const initPixels = () => {
      pixelsRef.current = [];
      for (let x = 0; x < canvas.width; x += gap) {
        for (let y = 0; y < canvas.height; y += gap) {
          if (Math.random() > 0.95) {
             pixelsRef.current.push({
               x, y, 
               color: colorArray[Math.floor(Math.random() * colorArray.length)],
               offset: Math.random() * 100
             });
          }
        }
      }
    };

    const animate = () => {
      timeRef.current += 1;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      pixelsRef.current.forEach(p => {
        const opacity = (Math.sin((timeRef.current + p.offset) / speed) + 1) / 2;
        ctx.globalAlpha = opacity * 0.4;
        ctx.fillStyle = p.color;
        ctx.fillRect(p.x, p.y, gap - 1, gap - 1);
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    resize();
    window.addEventListener('resize', resize);
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationRef.current);
    };
  }, [gap, speed, colors]);

  return (
    <div ref={containerRef} className={`relative overflow-hidden group ${className}`}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-0"
      />
      <div className="relative z-10 h-full w-full">
        {children}
      </div>
    </div>
  );
}
