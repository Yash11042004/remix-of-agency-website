import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="fixed bottom-0 left-0 right-0 py-6 bg-foreground text-background z-[-1]">
      <div className="max-w-[1380px] mx-auto px-6">
        <div className="flex justify-between items-center text-sm font-semibold">
          <Link to="/" className="text-[18px] font-bold tracking-tight hover:opacity-70 transition-opacity">
            RAUM
          </Link>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="hover:opacity-70 transition-opacity"
          >
            Back to Top
          </button>
        </div>

        <div className="mt-6 text-sm opacity-70">
          <p>© {new Date().getFullYear()} RAUM. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
