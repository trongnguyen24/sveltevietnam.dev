import { getContext, setContext } from 'svelte';
import { derived, writable } from 'svelte/store';

import { browser } from '$app/environment';
import { PUBLIC_COOKIE_COLOR_SCHEME } from '$env/static/public';

const COLOR_SCHEME_CONTEXT_ID = 'colorscheme';

/**
 * requires `window.matchMedia` (only in browser context)
 * @returns user's color scheme preference
 */
function getPrefersColorScheme() {
	if (!browser) return 'light';
	return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function createColorSchemeStore(initial: App.ColorScheme) {
	const store = writable<App.ColorScheme>(initial);

	const preferred = derived(store, (c) => (c === 'system' ? getPrefersColorScheme() : c));

	return {
		subscribe: store.subscribe,
		change(scheme: App.ColorScheme) {
			document.documentElement.dataset.colorScheme = scheme;
			document.cookie = `${PUBLIC_COOKIE_COLOR_SCHEME}=${scheme}; path=/; SameSite=Lax; Secure; Max-Age=604800`;
			store.set(scheme);
		},
		preferred,
	};
}

export function setColorSchemeContext(initial: App.ColorScheme) {
	return setContext(COLOR_SCHEME_CONTEXT_ID, createColorSchemeStore(initial));
}

export function getColorSchemeContext() {
	return getContext<ReturnType<typeof setColorSchemeContext>>(COLOR_SCHEME_CONTEXT_ID);
}
