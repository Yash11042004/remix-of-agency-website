import React, { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import HeroSection from '@/components/sections/HeroSection';
import ProjectSection from '@/components/sections/ProjectSection';
import ServicesSection from '@/components/sections/ServicesSection';
import AboutSection from '@/components/sections/AboutSection';
import CTASection from '@/components/sections/CTASection';
import Footer from '@/components/layout/Footer';
import CommandMenu from '@/components/ui/CommandMenu';
import StickyCommandButton from '@/components/ui/StickyCommandButton';
import ThemeSwitcher from '@/components/ui/ThemeSwitcher';

const Index: React.FC = () => {
  const [commandOpen, setCommandOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCommandOpen((prev) => !prev);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      <div className="min-h-screen bg-background relative z-[1] mb-[280px] md:mb-[120px]">
        <ThemeSwitcher />
        <StickyCommandButton onClick={() => setCommandOpen(true)} />
        <CommandMenu open={commandOpen} onOpenChange={setCommandOpen} />
        
        <div className="max-w-[1380px] mx-auto px-6">
          <Header />
          <main>
            <HeroSection />
            <ProjectSection />
            <ServicesSection onOpenCommandMenu={() => setCommandOpen(true)} />
            <AboutSection />
            <CTASection onOpenCommandMenu={() => setCommandOpen(true)} />
          </main>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Index;
