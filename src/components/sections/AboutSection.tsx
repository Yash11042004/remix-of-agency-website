import React from 'react';
import { motion } from 'framer-motion';
const AboutSection: React.FC = () => {
  return <section id="about" className="relative w-full pt-24 pb-16">
      {/* Background text */}
      <div className="absolute inset-x-0 top-0 overflow-hidden pointer-events-none">
      <motion.div initial={{
        opacity: 0,
        x: -100
      }} whileInView={{
        opacity: 1,
        x: 0
      }} viewport={{
        once: true
      }} transition={{
        duration: 1,
        ease: [0.25, 0.1, 0.25, 1]
      }} className="relative text-center text-display-sm md:text-display-md lg:text-display font-semibold leading-none whitespace-nowrap" style={{
        background: 'linear-gradient(to bottom, hsl(var(--foreground) / 0.1), transparent)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text'
      }}>
          ABOUT
        </motion.div>
      </div>
      
      <div className="relative z-10">
        <motion.div initial={{
        opacity: 0
      }} whileInView={{
        opacity: 1
      }} viewport={{
        once: true,
        margin: "-100px"
      }} transition={{
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1]
      }} className="flex flex-col">
          {/* Image wrapper - responsive height */}
          <div className="h-[412px] md:h-[515px] lg:h-[618px]">
            <img src="https://api.builder.io/api/v1/image/assets/20f31d2b4c414a48ac0232fce85f1621/b7da09d8830ece1db455a2302eaa5ca036a5ff3c?placeholderIfAbsent=true" alt="RAUM studio workspace" className="absolute left-0 top-[40px] w-full md:w-[343px] lg:w-[412px] h-[412px] md:h-[515px] lg:h-[618px] object-cover max-md:relative max-md:top-0" />
          </div>
          
          {/* Mobile text - visible only on mobile */}
          <p className="block md:hidden pt-6 text-heading-sm font-semibold text-foreground">
            RAUM was founded to create interiors that feel calm, functional, and durable. The studio works across residential and commercial projects with a strong focus on proportion, light, and material quality.
          </p>
          
          {/* Tablet text - visible only on tablet */}
          <p className="hidden md:block lg:hidden pt-6 text-heading-md font-semibold text-foreground py-0">                                            RAUM was founded to create interiors that feel calm, functional, and durable. The studio works across residential and commercial projects with a strong focus on proportion, light, and material quality.</p>
          
          {/* Desktop text with CSS float spacer */}
          <p className="hidden lg:block pt-0 text-heading font-semibold text-foreground">                                        RAUM was founded to create interiors that feel calm, functional, and durable. The studio works across residential and commercial projects with a strong focus on proportion, light, and material quality.</p>
        </motion.div>
      </div>
    </section>;
};
export default AboutSection;