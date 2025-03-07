import { LOAD_DEPENDENCIES } from '$shared/constants';
import { DESIGN_TYPOGRAPHY_PATH, ROOT_URL } from '$shared/services/navigation';
import { buildBreadcrumbs } from '$shared/services/navigation/server';

import type { PageServerLoad } from './$types';

const metaTranslations = {
	vi: {
		title: 'Chữ viết | Thiết Kế | Svelte Việt Nam',
		description: 'Tổng quan về thiết kế cho hệ thống chữ viết của Svelte Việt Nam',
		keywords: ['thiết kế', 'văn bản', 'chữ viết', 'hệ thống', 'css', 'inter', 'font'],
	},
	en: {
		title: 'Typography | Design | Svelte Vietnam',
		description: 'An overview of the typography design for Svelte Vietnam',
		keywords: ['design', 'typography', 'text', 'writing', 'system', 'css', 'inter', 'font'],
	},
};

export const load: PageServerLoad = ({ url, depends, locals: { language } }) => {
	depends(LOAD_DEPENDENCIES.LANGUAGE);
	const tMeta = metaTranslations[language];
	return {
		translations: {
			page: {
				title: language === 'en' ? 'Typography' : 'Chữ viết',
			},
		},
		breadcrumbs: buildBreadcrumbs(url.pathname),
		meta: {
			...tMeta,
			canonical: `${ROOT_URL}/${language}${DESIGN_TYPOGRAPHY_PATH}`,
		},
	};
};
