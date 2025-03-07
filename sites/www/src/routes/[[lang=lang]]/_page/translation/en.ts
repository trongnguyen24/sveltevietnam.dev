import { SOCIAL_LINKS } from '$shared/constants';

export const en = {
	intro: {
		title: 'Introduction',
		svelte:
			'A web technology for building user interface that enables great end-user experience without trading off developer productivity',
		vietnam:
			'A technology hub with engaging developers and rapidly growing investment in sustainable technologies and digital transformation',
		sveltevietnam:
			'A go-to and one-stop information center, and an inclusive community for anyone interested in the adoption of Svelte in Vietnam',
	},
	community: {
		title: 'Community',
		description: `Join the <a class="c-link" href=${SOCIAL_LINKS.DISCORD} target="_blank" rel="noreferrer">Svelte Vietnam Discord</a> and start having conversations, help or seek help from other members. To contribute to the source code of this website or other open source projects from Svelte Vietnam, visit the <a class="c-link" href="${SOCIAL_LINKS.GITHUB}" target="_blank" rel="noreferrer">Svelte Vietnam Github</a> page.`,
		ctas: {
			learn: 'Learn Svelte and SvelteKit with the translated tutorials',
			discord: 'Join community forum in Discord',
			// nominate: 'Nominate contributor',
			contribute: 'Contribute to open source projects at Github',
		},
	},
	events: {
		title: 'Events',
		description:
			'Join the community to share your experience, products, and all thing Svelte and open source',
		tba: {
			description: 'No event is planned yet',
			cta: 'Register for notification about the next event',
		},
	},
	posts: {
		title: 'Recent Posts',
		description: `Besides <a class="c-link" href=${SOCIAL_LINKS.DISCORD} target="_blank" rel="noreferrer">Discord</a>, the Svelte Vietnam Blog is our most official and practical channel for sharing.`,
	},
	jobs: {
		title: 'Recent Jobs',
		description: 'Share or apply for Svelte-related jobs or collaboration opportunities',
	},
	impact: {
		title: 'Projects',
		description: 'Share or participate in open source or non-profit projects and make a difference',
		by: 'By',
	},
	sponsor: {
		title: 'Sponsors',
		description: 'Help sustain the community and support its growth by becoming a sponsor',
		tba: {
			description: 'Sponsors will be listed here.',
			cta: `Learn more`,
		},
	},
} satisfies typeof import('./vi').vi;
