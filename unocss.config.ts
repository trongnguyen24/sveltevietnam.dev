import { extractorSvelte, type Preset } from '@unocss/core';
import presetUno, { type Theme } from '@unocss/preset-uno';
import UnoCSS from 'unocss/vite';

type CustomTheme = Theme & { zIndex: Record<string, string> };

export default UnoCSS<CustomTheme>({
  extractors: [extractorSvelte],
  presets: [presetUno() as unknown as Preset<CustomTheme>],
  theme: {
    colors: {
      status: {
        info: '#3ABFF8',
        success: '#36D399',
        warning: '#FBBD23',
        error: '#F87272',
      },
      grayscale: {
        light: {
          100: '#ffffff',
          200: '#E5E5E5',
          300: '#999999',
          400: '#4C4C4C',
        },
        dark: {
          100: '#1C1C1C',
          200: '#585757',
          300: '#969696',
          400: '#E8E8E8',
        },
      },
      fg: {
        100: 'var(--color-fg-100)',
        200: 'var(--color-fg-200)',
        300: 'var(--color-fg-300)',
        400: 'var(--color-fg-400)',
      },
      bg: {
        100: 'var(--color-bg-100)',
        200: 'var(--color-bg-200)',
        300: 'var(--color-bg-300)',
        400: 'var(--color-bg-400)',
      },
      primary: '#ef4623',
      svelte: '#ef4623',
    },
    spacing: {
      header: 'var(--header-height)',
    },
    borderRadius: {
      default: '4px',
    },
    zIndex: {
      px: '1',
      header: '50', // root header
      modal: '80', // a modal/dialog
      // sidebar: '92', // sidebar
      // float: '100', // floating buttons and such
      popup: '120', // tooltip, dropdown, popover etc
      overlay: '150', // a full screen overlay
      // command: '200', // command palette
      // notification: '300', // notification
    },
    breakpoints: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    fontFamily: {
      inter: 'Inter, sans-serif',
    },
  },
});
