import React, { forwardRef } from 'react';
import { Link } from 'react-router-dom';

const Header = forwardRef<HTMLElement>((_, ref) => {
  return (
    <header ref={ref} className="relative flex w-full items-center justify-between py-4 border-b border-muted">
      {/* Logo - left */}
      <Link to="/" className="w-[100px] md:w-[180px] lg:w-[225px] flex-shrink-0 text-foreground hover:opacity-70 transition-opacity z-10">
        <svg viewBox="0 0 225 40" className="w-full h-auto fill-current">
          <text x="0" y="32" className="text-[36px] font-bold tracking-tight">RAUM</text>
        </svg>
      </Link>
      
      {/* Centered text - absolutely positioned to always be centered */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="text-[10px] md:text-xs lg:text-sm font-semibold text-foreground text-center">
          Interior Architecture & Spatial Design
        </div>
      </div>
      
      {/* Right spacer for CMD+K button */}
      <div className="w-[40px] md:w-[68px] flex-shrink-0" />
    </header>
  );
});

Header.displayName = 'Header';

export default Header;