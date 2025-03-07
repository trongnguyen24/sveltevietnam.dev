import { superValidate } from 'sveltekit-superforms/server';

import { mailSchema } from '$client/components/MailRegistrationForm';
import { mail } from '$server/actions/mail/mail.server';
import { translations as mailT } from '$server/actions/mail/translation';
import ogImageEn from '$shared/assets/images/og/og-events.en.jpg';
import ogImageVi from '$shared/assets/images/og/og-events.vi.jpg';
import { LOAD_DEPENDENCIES } from '$shared/constants';
import { listEvents } from '$shared/data/events';
import type { Language } from '$shared/services/i18n';
import { EVENTS_PATH, ROOT_URL } from '$shared/services/navigation';
import { buildBreadcrumbs } from '$shared/services/navigation/server';

import type { PageServerLoad, Actions } from './$types';
import { translations as pageT } from './_page/translation';

const metaTranslations: Record<Language, App.PageData['meta']> = {
	vi: {
		title: 'Sự kiện | Svelte Việt Nam',
		description: 'Gặp gỡ cộng đồng Svelte tại Việt Nam',
		keywords: ['sự kiện', 'cộng đồng', 'gặp mặt'],
		og: {
			image: ogImageVi,
		},
	},
	en: {
		title: 'Events | Svelte Vietnam',
		description: 'Meet up with people of Svelte in Vietnam',
		keywords: ['event', 'community', 'meetup'],
		og: {
			image: ogImageEn,
		},
	},
};

export const load: PageServerLoad = async ({ url, depends, locals: { language } }) => {
	depends(LOAD_DEPENDENCIES.LANGUAGE);
	const tMeta = metaTranslations[language];
	const mailForm = await superValidate(mailSchema);
	return {
		breadcrumbs: buildBreadcrumbs(url.pathname),
		translations: {
			page: pageT[language],
			mail: mailT[language],
		},
		events: listEvents(language),
		meta: {
			...tMeta,
			canonical: `${ROOT_URL}/${language}${EVENTS_PATH}`,
		},
		mailForm,
	};
};

export const actions: Actions = {
	mail: async (event) => mail(event, 'event'),
};
