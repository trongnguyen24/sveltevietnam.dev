/// <reference types="@sveltejs/kit" />
/// <reference types="svelte" />
/// <reference types="vite/client" />
/// <reference types="@types/gtag.js" />
/// <reference types="@sveltejs/adapter-cloudflare" />

import type { Language } from '$shared/services/i18n';
import type { ColorScheme } from '$shared/types';

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare global {
  declare const __BUILD_TIMESTAMP__: string;
  namespace App {
    interface Locals {
      userId: string;
      colorScheme: ColorScheme;
      language: Language;
      version: string;
      referer?: URL;
    }
    interface PageData {
      colorScheme: ColorScheme;
      language: Language;
      supportedLanguages: Language[];
      meta?: {
        title?: string;
        description?: string;
        keywords?: string[];
        canonical?: string;
        og?: {
          title?: string;
          description?: string;
          type?: 'website' | 'article' | 'profile';
          image?: string;
          imageAlt?: string;
          url?: string;
        };
        twitter?: {
          title?: string;
          description?: string;
          card?: string;
          image?: string;
          imageAlt?: string;
          site?: string;
          creator?: string;
        };
      };
    }

    interface Platform {
      env?: {
        D1: import('@cloudflare/workers-types').D1Database;
      };
      context: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        waitUntil(promise: Promise<any>): void;
      };
      caches: import('@cloudflare/workers-types').CacheStorage & {
        default: import('@cloudflare/workers-types').Cache;
      };
    }
    // interface Error {}
  }
}
