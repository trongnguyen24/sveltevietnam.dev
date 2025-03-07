import { superValidate } from 'sveltekit-superforms/server';

import { mailSchema } from '$client/components/MailRegistrationForm';
import { mail } from '$server/actions/mail/mail.server';
import { translations as tMail } from '$server/actions/mail/translation';
import ogImageEn from '$shared/assets/images/og/og-jobs.en.jpg';
import ogImageVi from '$shared/assets/images/og/og-jobs.vi.jpg';
import { LOAD_DEPENDENCIES } from '$shared/constants';
import { JOBS_PATH, ROOT_URL } from '$shared/services/navigation';
import { buildBreadcrumbs } from '$shared/services/navigation/server';

import type { PageServerLoad, Actions } from './$types';
import { translations as tPage } from './_page/translation';

const metaTranslations = {
	vi: {
		title: 'Công việc | Svelte Việt Nam',
		description: 'Công việc dành cho lập trình viên Svelte tại Việt Nam',
		keywords: ['công việc', 'việc làm', 'tuyển dụng', 'dự án'],
		og: {
			image: ogImageVi,
		},
	},
	en: {
		title: 'Jobs | Svelte Vietnam',
		description: 'Job board for Svelte developers in Vietnam',
		keywords: ['job', 'work', 'employment', 'posting', 'recruitment', 'partner', 'project'],
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
			page: tPage[language],
			mail: tMail[language],
		},
		jobs: {
			fromSponsors: [],
			fromRecruitmentSites: {
				collectedAt: new Date('2023-11-07'),
				jobs: [],
			},
		},
		meta: {
			...tMeta,
			canonical: `${ROOT_URL}/${language}${JOBS_PATH}`,
		},
		mailForm,
	};
};

export const actions: Actions = {
	mail: (event) => mail(event, 'job'),
};
