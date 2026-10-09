import React, { useState, useRef, useEffect } from 'react';
import { Command as CommandPrimitive } from 'cmdk';
import { Dialog, DialogPortal, DialogOverlay } from '@/components/ui/dialog';
import { Calculator, Users, Info, Home, Briefcase, Mail, Search } from 'lucide-react';
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import ContactForm from '@/components/forms/ContactForm';
import CalculatorForm from '@/components/forms/CalculatorForm';
import { useIsMobile } from '@/hooks/use-mobile';

interface CommandMenuProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type View = 'main' | 'calculator' | 'contact';

const suggestions = [
  {
    icon: Calculator,
    label: "Calculate the price of a project",
    description: "Get an estimate for your interior design project",
    action: "calculate",
  },
  {
    icon: Mail,
    label: "Contact us",
    description: "Send us a message about your project",
    action: "contact",
  },
  {
    icon: Users,
    label: "Learn more about us",
    description: "Discover RAUM's story and philosophy",
    action: "about",
  },
  {
    icon: Info,
    label: "Know more about our services",
    description: "Explore what we offer",
    action: "services",
  },
];

const navigation = [
  { icon: Home, label: "Home", section: "hero" },
  { icon: Briefcase, label: "Projects", section: "projects" },
  { icon: Users, label: "Services", section: "services" },
  { icon: Info, label: "About", section: "about" },
];


const CommandMenu: React.FC<CommandMenuProps> = ({ open, onOpenChange }) => {
  const [search, setSearch] = useState('');
  const [view, setView] = useState<View>('main');
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToSection = (sectionId: string) => {
    // If not on home page, navigate there first
    if (window.location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    onOpenChange(false);
  };

  const navigateToPage = (path: string) => {
    navigate(path);
    onOpenChange(false);
  };

  const handleSuggestion = (action: string) => {
    switch (action) {
      case 'calculate':
        setView('calculator');
        break;
      case 'contact':
        setView('contact');
        break;
      case 'about':
        scrollToSection('about');
        break;
      case 'services':
        scrollToSection('services');
        break;
    }
  };

  const handleClose = () => {
    onOpenChange(false);
    // Reset view after close animation
    setTimeout(() => setView('main'), 200);
  };

  const handleBack = () => {
    setView('main');
  };

  // Reset view when opening and handle focus
  useEffect(() => {
    if (open) {
      setView('main');
      setSearch('');
      // Only focus input on desktop
      if (!isMobile && inputRef.current) {
        setTimeout(() => inputRef.current?.focus(), 100);
      }
    }
  }, [open, isMobile]);

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogPortal>
        <DialogOverlay className="bg-black/60" />
        <DialogPrimitive.Content
          className="fixed left-[50%] top-[50%] z-50 w-full max-w-[350px] md:max-w-[540px] translate-x-[-50%] translate-y-[-50%] duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95"
        >
          <div className="flex flex-col overflow-hidden rounded-lg bg-background border border-foreground/20">
            <AnimatePresence mode="wait">
              {view === 'main' && (
                <CommandPrimitive
                  key="main"
                  className="flex flex-col"
                  loop
                  shouldFilter={true}
                >
                  {/* Search Input */}
                  <div className="flex items-center border-b border-foreground/20 px-4">
                    <Search className="mr-3 h-5 w-5 shrink-0 text-muted-foreground" />
                    <CommandPrimitive.Input
                      ref={inputRef}
                      value={search}
                      onValueChange={setSearch}
                      placeholder="What would you like to do?"
                      className="flex h-14 w-full bg-transparent py-3 text-sm text-foreground outline-none placeholder:text-muted-foreground"
                    />
                  </div>

                  {/* Content */}
                  <CommandPrimitive.List className="max-h-[400px] overflow-y-auto p-2">
                    <CommandPrimitive.Empty className="py-6 text-center text-sm text-muted-foreground">
                      No results found.
                    </CommandPrimitive.Empty>
                    
                    {/* Suggestions */}
                    <CommandPrimitive.Group heading="Suggestions" className="px-2 py-2 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group-heading]]:mb-2">
                      {suggestions.map((suggestion) => (
                        <CommandPrimitive.Item
                          key={suggestion.action}
                          value={suggestion.label}
                          onSelect={() => handleSuggestion(suggestion.action)}
                          className="flex w-full items-center gap-3 px-3 py-3 rounded-md cursor-pointer transition-colors text-left data-[selected=true]:bg-foreground/10"
                        >
                          <suggestion.icon className="w-5 h-5 text-muted-foreground" />
                          <div className="flex flex-col">
                            <span className="text-sm font-medium text-foreground">{suggestion.label}</span>
                            <span className="text-xs text-muted-foreground">{suggestion.description}</span>
                          </div>
                        </CommandPrimitive.Item>
                      ))}
                    </CommandPrimitive.Group>

                    {/* Navigation */}
                    <CommandPrimitive.Group heading="Navigate" className="px-2 py-2 border-t border-foreground/20 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group-heading]]:mb-2">
                      {navigation.map((nav) => (
                        <CommandPrimitive.Item
                          key={nav.section}
                          value={nav.label}
                          onSelect={() => scrollToSection(nav.section)}
                          className="flex w-full items-center gap-3 px-3 py-2 rounded-md cursor-pointer transition-colors text-left data-[selected=true]:bg-foreground/10"
                        >
                          <nav.icon className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm text-foreground">{nav.label}</span>
                        </CommandPrimitive.Item>
                      ))}
                    </CommandPrimitive.Group>

                  </CommandPrimitive.List>

                  {/* Footer hint */}
                  <div className="flex items-center justify-between border-t border-foreground/20 px-4 py-2">
                    <span className="text-xs text-muted-foreground">Press ESC to close</span>
                    <div className="flex items-center gap-1">
                      <kbd className="px-1.5 py-0.5 text-xs text-muted-foreground bg-foreground/10 rounded">↑↓</kbd>
                      <span className="text-xs text-muted-foreground">to navigate</span>
                    </div>
                  </div>
                </CommandPrimitive>
              )}

              {view === 'calculator' && (
                <CalculatorForm key="calculator" onBack={handleBack} onClose={handleClose} />
              )}

              {view === 'contact' && (
                <ContactForm key="contact" onBack={handleBack} onClose={handleClose} />
              )}
            </AnimatePresence>
          </div>
        </DialogPrimitive.Content>
      </DialogPortal>
    </Dialog>
  );
};

export default CommandMenu;