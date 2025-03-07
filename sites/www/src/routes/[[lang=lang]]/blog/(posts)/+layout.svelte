<script lang="ts">
	import { copy } from '@svelte-put/copy';
	import { toc, toclink, createTocStore } from '@svelte-put/toc';

	import { page } from '$app/stores';
	import { intersect } from '$client/actions/intersect';
	import { BlogPostItem } from '$client/components/BlogPostItem';
	import { Breadcrumbs } from '$client/components/Breadcrumbs';
	import ExternalBlogPostItem from '$client/components/ExternalBlogPostItem/ExternalBlogPostItem.svelte';
	import { Person } from '$client/components/Person';
	import { modalStore } from '$client/modals';
	import { QRCode } from '$client/modals/QRCode';
	import { noti } from '$client/notifications';
	import { textTip } from '$client/tooltips';
	import fallbackThumbnail from '$shared/assets/images/fallback/default.jpg?w=2000&enhanced&imagetools';
	import type { Breadcrumb } from '$shared/services/navigation';
	import { formateDateForBlog } from '$shared/utils/datetime';

	import '../../../../lib/client/styles/code.css';
	import '../../../../lib/client/styles/heading-anchor.css';

	import type { LayoutData } from './$types';

	export let data: LayoutData;

	$: meta = $page.data.meta;
	$: post = $page.data.post;
	$: isLangNotSupported = !$page.data.supportedLanguages?.includes($page.data.language);
	$: breadcrumbs = [...data.breadcrumbs, { label: post?.title ?? '' }] satisfies Breadcrumb[];

	$: encodedCanonical = encodeURIComponent(meta?.canonical ?? '');
	$: encodedTitle = encodeURIComponent(post?.title ?? '');

	$: t = data.translations.layout;

	function onCopiedCanonical() {
		noti.info(t.urlCopyNotice);
	}
	const tocStore = createTocStore();
	$: tocItems = Object.values($tocStore.items);

	async function onClickQRLink() {
		modalStore.push({
			component: QRCode,
			props: {
				data: meta?.canonical ?? '',
				texts: {
					...t.qr,
					filename: post?.slug ?? 'qr',
				},
			},
		});
	}

	$: langVersion =
		data.language === post?.originalLang || isLangNotSupported
			? t.language.original
			: t.language.translated;
	let stats = '';
	$: {
		stats = '';
		if (post?.readMinutes) {
			stats += `${post.readMinutes} ${t.readMinutes}`;
		}
		if (post?.wordCount) {
			if (stats) stats += ', ';
			stats += `~${post.wordCount} ${t.word}`;
		}
	}
</script>

<main class="max-w-pad" use:intersect>
	<Breadcrumbs {breadcrumbs} class="mt-6" />
	<article class="mt-8 tb:mt-[60px]">
		<section>
			{#if post?.thumbnail}
				<enhanced:img src={post?.thumbnail} alt={post?.title} class="h-auto w-full" />
			{:else}
				<enhanced:img src={fallbackThumbnail} alt={post?.title} class="h-auto w-full" />
			{/if}
			<div class="mt-8 space-y-6">
				<h1 class="tp-h2 font-bold">{post?.title}</h1>
				<ul class="flex flex-wrap items-center gap-2">
					{#each post?.tags ?? [] as tag}
						<li class="c-tag">{tag}</li>
					{/each}
				</ul>
				<!-- <div class="separator" /> -->
				<ul class="flex items-start gap-6">
					{#each post?.authors ?? [] as person}
						<li>
							<Person {person} />
						</li>
					{/each}
				</ul>
				<div class="tp-cap1 text-fg-200">
					<div class="mb-2 separator" />
					<div class="tp-cap1 flex justify-between text-fg-200">
						<div class="shrink-0">
							{#key data.language}
								<p>
									{langVersion.label}
									<svg
										inline-src="google/info"
										class="ml-1 inline-block cursor-help fill-current align-text-top"
										height="16"
										width="16"
										use:textTip={{ content: langVersion.description }}
									/>
								</p>
							{/key}
							{#if stats}
								<p class="mt-1">
									{stats}
								</p>
							{/if}
						</div>
						{#if post?.date}
							<p class="flex-1 shrink-0 text-right">
								{formateDateForBlog(data.language, post?.date)}
							</p>
						{/if}
					</div>
				</div>
			</div>
		</section>

		{#if isLangNotSupported}
			<p class="c-callout c-callout--warning mt-[60px]">
				{@html t.language.unsupported}
			</p>
		{/if}

		<div class="post-grid mt-[60px]">
			{#key data.language && data.pathname}
				<section
					class="post-content prose-svelte-vn prose max-w-full dark:prose-invert"
					use:toc={{
						store: tocStore,
						selector: ':where(h2,h3,h4,h5,h6)',
						observe: true,
					}}
				>
					<slot />
					<hr />
					<p class="tp-body2">
						{t.editLink.intro}
						<a href={post?.githubUrl} external>{t.editLink.label}</a>
					</p>
				</section>
			{/key}

			<section class="post-more">
				<h2 class="tp-h3 font-medium after:mt-2 after:separator">{t.more}</h2>
				<ul class="mt-8 space-y-8">
					{#each data.more.internal as post}
						<li class="before:mb-8 before:separator first-of-type:before:hidden">
							<BlogPostItem {post} alwaysVertical />
						</li>
					{/each}
					{#each data.more.external as post}
						<li class="before:mb-8 before:separator">
							<ExternalBlogPostItem {post} />
						</li>
					{/each}
				</ul>
			</section>

			<section class="post-share">
				<h2 class="tp-h3 after:mt-2 after:separator">{t.share}</h2>
				<ul class="mt-8 flex flex-wrap items-center gap-4">
					<li>
						<a
							href="https://www.facebook.com/sharer/sharer.php?u={encodedCanonical}"
							class="c-link c-link--icon block w-fit rounded-full border border-current p-[10px]"
							external
						>
							<span class="sr-only">facebook</span>
							<svg inline-src="simpleicon/facebook" width="20" height="20" />
						</a>
					</li>
					<li>
						<a
							href="https://twitter.com/intent/tweet?url={encodedCanonical}&text={encodedTitle}"
							class="c-link c-link--icon block w-fit rounded-full border border-current p-[10px]"
							external
						>
							<span class="sr-only">twitter (x)</span>
							<svg inline-src="simpleicon/twitter" width="20" height="20" />
						</a>
					</li>
					<li>
						<a
							href="https://www.linkedin.com/shareArticle?mini=true&url={encodedCanonical}&title={encodedTitle}"
							class="c-link c-link--icon block w-fit rounded-full border border-current p-[10px]"
							external
						>
							<span class="sr-only">linkedin</span>
							<svg inline-src="simpleicon/linkedin" width="20" height="20" />
						</a>
					</li>
					<li>
						<button
							class="c-link c-link--icon block w-fit rounded-full border border-current p-[10px]"
							on:copied={onCopiedCanonical}
							use:copy={{ text: meta?.canonical ?? '' }}
						>
							<span class="sr-only">copy link</span>
							<svg inline-src="google/share" width="20" height="20" />
						</button>
					</li>
					<li>
						<button
							class="c-link c-link--icon block w-fit rounded-full border border-current p-[10px]"
							on:click={onClickQRLink}
						>
							<span class="sr-only">QR code</span>
							<svg inline-src="google/qr-code-2" width="20" height="20" />
						</button>
					</li>
				</ul>
			</section>

			<section class="post-toc">
				{#if tocItems.length}
					<nav aria-label={t.tableOfContents.title}>
						<h2 class="tp-h3 font-medium after:mt-2 after:separator">{t.tableOfContents.title}</h2>
						<ul class="mt-8">
							{#each tocItems as tocItem (tocItem.id)}
								{@const level = tocItem.element.tagName.slice(1)}
								<li>
									<!-- svelte-ignore a11y-missing-attribute -->
									<a
										use:toclink={{
											tocItem,
											store: tocStore,
											observe: {
												attribute: 'data-current',
											},
										}}
										class="my-2 block tb:data-current:text-link"
										class:ml-4={level === '3'}
										class:ml-8={level === '4'}
										class:ml-12={level === '5'}
										class:ml-16={level === '6'}
									>
										<span class="c-link c-link--preserved">
											{tocItem.text}
										</span>
									</a>
								</li>
							{/each}
						</ul>
					</nav>
				{/if}
			</section>
		</div>
	</article>
</main>

<style lang="postcss">
	.post-grid {
		position: relative;

		display: grid;
		grid-template-areas:
			'toc'
			'content'
			'share'
			'more';
		grid-template-columns: minmax(0, 1fr);
		grid-template-rows: repeat(4, auto);
		row-gap: 60px;

		@screen tb {
			grid-template-areas:
				'content share'
				'content toc'
				'content more';
			grid-template-columns: minmax(400px, 3fr) minmax(200px, 1fr);
			grid-template-rows: auto 1fr auto;
			column-gap: 60px;
		}
	}

	.post-content {
		grid-area: content;

		& :global(img) {
			max-width: 100%;
		}
	}

	.post-share {
		grid-area: share;
		height: fit-content;
	}

	.post-more {
		grid-area: more;
		height: fit-content;
	}

	.post-toc {
		grid-area: toc;

		& nav {
			@screen tb {
				position: sticky;
				top: calc(var(--header-height) + 60px);
			}
		}
	}
</style>
