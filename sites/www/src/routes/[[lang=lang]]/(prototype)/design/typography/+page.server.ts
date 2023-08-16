import { buildBreadcrumbs } from '$shared/services/navigation/server';

import type { PageServerLoad } from './$types';

export const load: PageServerLoad = ({ url, locals: { language } }) => {
  return {
    breadcrumbs: buildBreadcrumbs(url.pathname),
    meta: {
      title: 'Typography | Svelte Vietnam',
      description: 'Typography Design of Svelte Vietnam',
      keywords: ['typography', 'design', 'logo'],
      canonical: `https://sveltevietnam.com/${language}/design/typography`,
    },
  };
};
