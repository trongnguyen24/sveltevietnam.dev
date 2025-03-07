import Mustache from 'mustache';

import { INTERNAL_POSTS } from '$shared/data/blog';
import { EVENTS } from '$shared/data/events';
import { LANGUAGES, resolveLangVar } from '$shared/services/i18n';
import { BLOG_PATH } from '$shared/services/navigation';

import type { RequestHandler } from './$types';
import template from './rss.template.xml?raw';

type RssItem = {
	title: string;
	description: string;
	link: string;
	guid: string;
	pubDate: string;
};

export const GET: RequestHandler = ({ url }) => {
	const items: RssItem[] = [
		...INTERNAL_POSTS.flatMap((p) =>
			LANGUAGES.map((l) => ({
				title: resolveLangVar(l, p.title),
				description: resolveLangVar(l, p.description),
				link: `${url.origin}/${l}${BLOG_PATH}/${p.slug}`,
				guid: p.slug,
				pubDate: new Date(p.date).toUTCString(),
			})),
		),
		...EVENTS.flatMap((e) =>
			LANGUAGES.map((l) => ({
				title: resolveLangVar(l, e.title),
				description: resolveLangVar(l, e.description),
				link: `${url.origin}/${l}${BLOG_PATH}/${e.slug}`,
				guid: e.slug,
				pubDate: new Date(e.startDate).toUTCString(),
			})),
		),
	];
	const xml = Mustache.render(template, {
		title: 'Svelte Vietnam',
		link: url.origin,
		description: 'The go-to, one-stop information hub for the Svelte community in Vietnam',
		lastBuildDate: new Date(__BUILD_TIMESTAMP__).toUTCString(),
		copyright: `Copyright ${new Date().getFullYear()}, Svelte Vietnam`,
		items,
	});
	const headers = {
		'Cache-Control': 'max-age=0, s-maxage=3600',
		'Content-Type': 'application/xml',
	};
	return new Response(xml, { headers });
};
