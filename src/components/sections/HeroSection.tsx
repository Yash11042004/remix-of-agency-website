import React from 'react';
import { motion } from 'framer-motion';

const HeroSection: React.FC = () => {
  return (
    <section id="hero" className="w-full pt-20 pb-16">
      <div className="flex flex-wrap items-start justify-between gap-10">
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-hero-sm md:text-hero-md lg:text-hero font-semibold text-foreground"
        >
          RAUM Studio <br />
          Landing Page
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-subheading-sm md:text-subheading-md lg:text-subheading font-medium text-foreground max-w-[468px]"
        >
          Command-first agency landing page
        </motion.p>
      </div>
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="flex flex-wrap justify-between gap-10 mt-28 text-sm max-md:mt-10"
      >
        {[
          { city: "Berlin", greeting: "Hallo!" },
          { city: "Zurich", greeting: "Grüezi!" },
          { city: "Copenhagen", greeting: "Hej!" }
        ].map((location, i) => (
          <motion.div 
            key={location.city}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
          >
            <div className="font-bold text-foreground">{location.city}</div>
            <div className="font-medium text-muted-foreground">{location.greeting}</div>
          </motion.div>
        ))}
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        className="mt-6 w-full"
      >
        <img
          src="https://api.builder.io/api/v1/image/assets/20f31d2b4c414a48ac0232fce85f1621/8900c0e32c1aae878fff7ea060f684eb58b3a22b?placeholderIfAbsent=true"
          alt="Interior design showcase"
          className="w-full h-auto object-cover"
        />
      </motion.div>
    </section>
  );
};

export default HeroSection;