<script lang="ts">
  import { EMAILS, SOCIAL_LINKS } from '$shared/constants';

  export let data;

  $: t = data.translations.page;
</script>

<main class="c-page">
  <section class="c-page@header">
    <h1 class="c-page@h1">{t.title}</h1>
  </section>

  <section class="notice">
    <h2 hidden>Description</h2>
    <div class="notice-icon">
      <svg height="24" width="24" inline-src="google/shield-with-heart" />
    </div>
    <p class="notice-description">{@html t.notice.description}</p>
    <p class="notice-action">{t.notice.action}</p>

    <div class="notice-ctas">
      <a href={SOCIAL_LINKS.discord} target="_blank" rel="noreferrer" class="c-btn">
        {t.notice.ctas.discord}
        <svg height="24" width="24" inline-src="simpleicon/discord" class="max-md:h-4 max-md:w-4" />
      </a>
      <a href="mailto:{EMAILS.coc}" target="_blank" rel="noreferrer" class="c-btn c-btn--outlined"
        ><span>{@html t.notice.ctas.email}</span></a
      >
    </div>
  </section>

  <section class="space-y-10">
    <h2 hidden>Excerpt</h2>
    <p>{t.excerpt.intro}</p>
    <figure class="excerpt">
      <blockquote>
        <p>{@html t.excerpt.quote}</p>
      </blockquote>
      <figcaption>{@html t.excerpt.caption}</figcaption>
    </figure>
  </section>
</main>

<style lang="postcss">
  .notice {
    display: grid;
    grid-template-areas:
      'icon description'
      'x action'
      'ctas ctas';
    row-gap: 16px;
    column-gap: 16px;

    padding: 24px;

    background-color: theme('colors.bg.200');
    border-radius: theme('borderRadius.default');

    /* @screen md {
      padding: 40px;
    } */

    & .notice-icon {
      grid-area: icon;
    }

    & .notice-description {
      grid-area: description;
    }

    & .notice-action {
      grid-area: action;
    }

    & .notice-ctas {
      display: flex;
      grid-area: ctas;

      /* @screen lt-md {
        @mixin space y, 16px;

        flex-direction: column;
        font-size: 14px;
      } */

      /* @screen md {
        @mixin space x, 32px;

        align-items: center;
        justify-content: center;
      } */
    }
  }

  .excerpt {
    display: grid;
    grid-template-areas:
      'line quote'
      'line caption';
    grid-template-columns: auto 1fr;
    row-gap: 24px;
    column-gap: 16px;

    &::before {
      content: '';

      display: grid;
      grid-area: line;

      width: 4px;
      height: 100%;

      background-color: theme('colors.fg.100');
    }

    & blockquote {
      grid-area: quote;

      & > p::first-letter {
        font-size: 36px;
        font-weight: bold;
      }
    }

    & figcaption {
      grid-area: caption;
      padding-bottom: 8px;
      font-style: italic;
    }
  }
</style>
