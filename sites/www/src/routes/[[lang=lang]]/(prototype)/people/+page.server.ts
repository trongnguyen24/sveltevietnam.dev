import { LOAD_DEPENDENCIES } from '$shared/constants';
import { createMockedContributors } from '$shared/mocks';

import type { PageServerLoad } from './$types';
import { translations } from './_page/translation';

const metaTranslations = {
  vi: {
    title: 'Con người | Svelte Vietnam',
    description: 'Nhân tố Việt trong Cộng đồng Svelte',
    keywords: ['con người', 'cộng đồng', 'đóng góp', 'đề cử'],
  },
  en: {
    title: 'People | Svelte Vietnam',
    description: 'People of Vietnam in the Svelte community',
    keywords: ['people', 'contributor', 'nomination', 'community'],
  },
};

export const load: PageServerLoad = ({ depends, locals: { language } }) => {
  depends(LOAD_DEPENDENCIES.LANGUAGE);
  const tMeta = metaTranslations[language];
  return {
    translations: {
      page: translations[language],
    },
    contributors: createMockedContributors(),
    meta: {
      ...tMeta,
      canonical: `https://sveltevietnam.com/${language}/people`,
    },
  };
};
