<script lang="ts">
	import { intersect } from '$client/actions/intersect';
	import { AnimatedArrowCircle } from '$client/components/AnimatedArrowCircle';
	import { ConsecutiveFadeUpIntro } from '$client/components/ConsecutiveFadeUpIntro';
	import { SplitText } from '$client/components/SplitText';
	import { ToBeAnnounced } from '$client/components/ToBeAnnounced';
	import { getLangContext } from '$client/contexts/lang';
	import { SPONSOR_PATH } from '$shared/services/navigation';
	import type { Sponsor } from '$shared/types';

	import { translations } from '../translation';

	export let sponsors: Sponsor[];

	const langStore = getLangContext();
	$: lang = $langStore;

	$: t = translations[lang].sponsor;
</script>

<section class="sponsors max-w-pad">
	<ConsecutiveFadeUpIntro selector=":is(.arrow, .char)">
		<a href={SPONSOR_PATH} title={t.title} class="section-title-container">
			<h2 class="tp-h2 uppercase">
				<SplitText text={t.title} />
			</h2>
			<AnimatedArrowCircle class="arrow h-12 w-12 tb:h-16 tb:w-16" handle="parent" />
		</a>
	</ConsecutiveFadeUpIntro>
	<p class="section-desc mt-6" use:intersect>{t.description}</p>
	{#if sponsors.length}
		<ul use:intersect>
			{#each sponsors as _}
				<li class="flex items-center space-x-2 pc:space-x-4">
					<svg
						inline-src="sveltevietnam"
						width="50"
						height="56"
						class="c-logo c-logo--themed sp:h-auto sp:w-[32px]"
					/>
					<p class="tp-h5 uppercase leading-normal">Svelte<br />Vietnam</p>
				</li>
			{/each}
		</ul>
	{:else}
		<div use:intersect class="mt-10 tb:mt-[60px]">
			<ToBeAnnounced>
				<p class="text-center">
					{t.tba.description}
					<a href={SPONSOR_PATH} class="c-link">{t.tba.cta}</a>
				</p>
			</ToBeAnnounced>
		</div>
	{/if}
</section>

<style lang="postcss">
	.sponsors {
		margin-top: 80px;

		@screen tb {
			margin-top: 120px;
		}
	}

	ul {
		display: flex;
		flex-wrap: wrap;
		gap: 24px;
		margin-top: 24px;

		@screen tb {
			gap: 40px;
			margin-top: 60px;
		}
	}
</style>
