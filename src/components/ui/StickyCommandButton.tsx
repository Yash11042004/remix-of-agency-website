import React, { useState, useEffect } from 'react';
import { Command } from 'lucide-react';

interface StickyCommandButtonProps {
  onClick: () => void;
}

const texts = ["Get started", "Open Menu"];

const StickyCommandButton: React.FC<StickyCommandButtonProps> = ({ onClick }) => {
  const [textIndex, setTextIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setTextIndex((prev) => (prev + 1) % texts.length);
        setIsAnimating(false);
      }, 300);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-[1380px] px-6 pointer-events-none flex justify-end">
      <div className="flex flex-col items-end gap-1 pointer-events-auto">
      <span 
        className={`hidden lg:block text-xs text-foreground font-semibold transition-opacity duration-300 ${
          isAnimating ? 'opacity-0' : 'opacity-100'
        }`}
      >
        {texts[textIndex]}
      </span>
      <button
        onClick={onClick}
        className="flex items-center gap-1 bg-foreground px-2 py-1.5 rounded-[3px] hover:opacity-80 transition-all"
        aria-label="Open command menu"
      >
        {/* Mobile/Tablet: Show "Get started" text */}
        <span className="lg:hidden text-background text-sm font-semibold">Get started</span>
        {/* Desktop: Show CMD+K */}
        <Command className="hidden lg:block w-5 h-5 text-background" />
        <span className="hidden lg:inline text-background text-sm font-semibold">+</span>
        <span className="hidden lg:inline text-background text-sm font-semibold">K</span>
      </button>
      </div>
    </div>
  );
};

export default StickyCommandButton;