import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // Phi-scaled typography (1.618 ratio)
        // Desktop sizes (base) → Tablet (÷1.618) → Mobile (÷1.618²)
        'hero': ['76px', { lineHeight: '1', fontWeight: '600' }],           // 76px desktop
        'hero-md': ['47px', { lineHeight: '1.05', fontWeight: '600' }],     // 76/1.618 ≈ 47px
        'hero-sm': ['29px', { lineHeight: '1.1', fontWeight: '600' }],      // 47/1.618 ≈ 29px
        
        'display': ['280px', { lineHeight: '1', fontWeight: '600' }],       // 280px desktop (background text)
        'display-md': ['173px', { lineHeight: '1', fontWeight: '600' }],    // 280/1.618 ≈ 173px
        'display-sm': ['100px', { lineHeight: '1', fontWeight: '600' }],    // mobile
        
        'heading': ['42px', { lineHeight: '1.24', fontWeight: '600' }],     // 42px desktop
        'heading-md': ['32px', { lineHeight: '1.25', fontWeight: '600' }],  // 42/1.3 ≈ 32px (gentler ratio)
        'heading-sm': ['24px', { lineHeight: '1.3', fontWeight: '600' }],   // mobile
        
        'subheading': ['32px', { lineHeight: '1.19', fontWeight: '500' }],  // 32px desktop
        'subheading-md': ['24px', { lineHeight: '1.25', fontWeight: '500' }], // tablet
        'subheading-sm': ['20px', { lineHeight: '1.3', fontWeight: '500' }], // mobile
        
        'body': ['28px', { lineHeight: '1.4', fontWeight: '600' }],         // 28px desktop (service items)
        'body-md': ['22px', { lineHeight: '1.4', fontWeight: '600' }],      // tablet
        'body-sm': ['18px', { lineHeight: '1.4', fontWeight: '600' }],      // mobile
        
        'small': ['14px', { lineHeight: '1.5', fontWeight: '500' }],        // 14px desktop
        'small-sm': ['12px', { lineHeight: '1.5', fontWeight: '500' }],     // Minimum
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
          muted: "hsl(var(--accent-muted))",
          border: "hsl(var(--accent-border))",
          hover: "hsl(var(--accent-hover))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
