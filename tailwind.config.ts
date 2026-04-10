import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          base: "var(--color-bg-base)",
          surface1: "var(--color-bg-surface-1)",
          surface2: "var(--color-bg-surface-2)",
          surface3: "var(--color-bg-surface-3)",
          overlay: "var(--color-bg-overlay)",
        },
        border: {
          subtle: "var(--color-border-subtle)",
          default: "var(--color-border-default)",
          strong: "var(--color-border-strong)",
        },
        text: {
          primary: "var(--color-text-primary)",
          secondary: "var(--color-text-secondary)",
          tertiary: "var(--color-text-tertiary)",
          disabled: "var(--color-text-disabled)",
          inverse: "var(--color-text-inverse)",
        },
        brand: {
          default: "var(--color-brand-default)",
          hover: "var(--color-brand-hover)",
          subtle: "var(--color-brand-subtle)",
          text: "var(--color-brand-text)",
        },
        feedback: {
          success: "var(--color-success)",
          successSubtle: "var(--color-success-subtle)",
          warning: "var(--color-warning)",
          warningSubtle: "var(--color-warning-subtle)",
          error: "var(--color-error)",
          errorSubtle: "var(--color-error-subtle)",
        },
      },
      borderRadius: {
        xs: "var(--radius-xs)",
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)",
        "2xl": "var(--radius-2xl)",
        full: "9999px",
      },
      fontSize: {
        // Display
        'display-2xl': ['48px', { lineHeight: '1.1', fontWeight: '700', letterSpacing: '-0.03em' }],
        'display-xl': ['40px', { lineHeight: '1.1', fontWeight: '700', letterSpacing: '-0.03em' }],
        'display-lg': ['32px', { lineHeight: '1.15', fontWeight: '700', letterSpacing: '-0.02em' }],
        // Heading
        'heading-xl': ['28px', { lineHeight: '1.2', fontWeight: '600', letterSpacing: '-0.02em' }],
        'heading-lg': ['24px', { lineHeight: '1.25', fontWeight: '600', letterSpacing: '-0.01em' }],
        'heading-md': ['20px', { lineHeight: '1.3', fontWeight: '600', letterSpacing: '-0.01em' }],
        'heading-sm': ['16px', { lineHeight: '1.4', fontWeight: '600', letterSpacing: '0' }],
        // Body
        'body-lg': ['16px', { lineHeight: '1.6', fontWeight: '400' }],
        'body-md': ['15px', { lineHeight: '1.6', fontWeight: '400' }],
        'body-sm': ['13px', { lineHeight: '1.5', fontWeight: '400' }],
        // Label
        'label-lg': ['14px', { lineHeight: '1.4', fontWeight: '500' }],
        'label-md': ['13px', { lineHeight: '1.4', fontWeight: '500' }],
        'label-sm': ['12px', { lineHeight: '1.4', fontWeight: '500', letterSpacing: '0.01em' }],
        // Caption
        caption: ['11px', { lineHeight: '1.4', fontWeight: '400' }],
        // Code
        'code-md': ['13px', { lineHeight: '1.6', fontWeight: '400' }],
        'code-sm': ['12px', { lineHeight: '1.5', fontWeight: '400' }],
      },
    },
  },
  plugins: [],
};
export default config;
