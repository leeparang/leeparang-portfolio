<script lang="ts">
  import { onMount } from "svelte";
  import { getPostUrlBySlug } from "../utils/url-utils";

  export let sortedPosts: Post[] = [];
  interface Post {
    slug: string;
    data: { title: string; tags: string[]; category?: string | null; role?: string; published: Date; };
  }
  type ViewMode = "flow" | "list";

  let viewMode: ViewMode = "flow";
  let revealedIndex = -1;
  let revealTarget = -1;
  let isRevealing = false;
  const oldestFirst = (a: Post, b: Post) => a.data.published.getTime() - b.data.published.getTime();
  $: studyPosts = sortedPosts
    .filter((post) => post.data.category?.toLowerCase() === "notes")
    .sort(oldestFirst);
  $: yearGroups = studyPosts.reduce<{ year: number; posts: Post[] }[]>((groups, post) => {
    const year = post.data.published.getFullYear();
    const current = groups.find((group) => group.year === year);
    if (current) current.posts.push(post);
    else groups.push({ year, posts: [post] });
    return groups;
  }, []);
  const formatFlowDate = (date: Date) => new Intl.DateTimeFormat("en", { month: "short" }).format(date);
  const formatListDate = (date: Date) => new Intl.DateTimeFormat("en", { month: "short" }).format(date);

  const wait = (ms: number) => new Promise((resolve) => window.setTimeout(resolve, ms));
  async function revealQueuedItems() {
    if (isRevealing) return;
    isRevealing = true;
    while (revealedIndex < revealTarget) {
      revealedIndex += 1;
      await wait(190);
    }
    isRevealing = false;
  }
  function requestReveal(index: number) {
    revealTarget = Math.max(revealTarget, index);
    void revealQueuedItems();
  }
  function observeFlowItem(node: HTMLElement, index: number) {
    const observer = new IntersectionObserver((entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return;
      requestReveal(index);
      observer.unobserve(node);
    }, { threshold: 0.08, rootMargin: "0px 0px -8%" });
    observer.observe(node);
    return { destroy() { observer.disconnect(); } };
  }
  function setViewMode(mode: ViewMode) {
    if (mode === viewMode) return;
    viewMode = mode;
    if (mode === "flow") {
      revealedIndex = -1;
      revealTarget = -1;
      requestAnimationFrame(() => requestReveal(0));
    }
  }
  onMount(() => { requestReveal(0); });
</script>

<div class="archive-shell">
  <header class="archive-summary">
    <div><span>Archive</span><strong>{studyPosts.length}</strong></div>
    <div class="view-switch" aria-label="Archive view">
      <button type="button" class:is-active={viewMode === "flow"} on:click={() => setViewMode("flow")}>Flow</button>
      <button type="button" class:is-active={viewMode === "list"} on:click={() => setViewMode("list")}>List</button>
    </div>
  </header>

  {#if studyPosts.length === 0}
    <p class="empty">No study notes yet.</p>
  {:else if viewMode === "flow"}
    <section class="archive-flow" aria-label="Study archive">
      {#each studyPosts as post, index}
        <article use:observeFlowItem={index} class:from-left={index % 2 === 0} class:from-right={index % 2 !== 0} class:is-visible={index <= revealedIndex} class="flow-item">
          <div class="flow-marker"><span></span></div>
          <a href={getPostUrlBySlug(post.slug)} class="flow-card">
            <time>{formatFlowDate(post.data.published)}</time>
            <h2>{post.data.title}</h2>
            <span class="flow-label">Study</span>
          </a>
        </article>
      {/each}
    </section>
  {:else}
    <section class="archive-list" aria-label="Study archive list">
      {#each yearGroups as group}
        <section class="year-group">
          <h2>{group.year}</h2>
          <div class="year-items">
            {#each group.posts as post}
              <a href={getPostUrlBySlug(post.slug)} class="list-row">
                <time>{formatListDate(post.data.published)}</time>
                <span class="list-title">{post.data.title}</span>
                <span class="list-label">Study</span>
              </a>
            {/each}
          </div>
        </section>
      {/each}
    </section>
  {/if}
</div>

<style>
  .archive-shell { margin: .4rem 0 2.5rem; padding: .7rem clamp(.2rem, 2vw, 1.2rem) 1rem; }
  .archive-summary { display: flex; align-items: center; justify-content: space-between; gap: 1rem; margin-bottom: 2rem; color: var(--text-50); font-size: .83rem; font-weight: 800; }
  .archive-summary > div:first-child { display: flex; align-items: baseline; gap: .55rem; }
  .archive-summary strong { color: var(--primary); font-size: 1.12rem; font-weight: 900; }
  .view-switch { display: inline-flex; gap: .2rem; padding: .22rem; border: 1px solid color-mix(in srgb, var(--primary) 22%, var(--line-divider)); border-radius: 999px; background: color-mix(in srgb, var(--primary) 4%, var(--card-bg)); }
  .view-switch button { border: 0; border-radius: 999px; padding: .38rem .74rem; color: var(--text-50); background: transparent; font: inherit; font-size: .75rem; font-weight: 800; cursor: pointer; transition: .2s ease; }
  .view-switch button.is-active { color: white; background: var(--primary); box-shadow: 0 .25rem .8rem color-mix(in srgb, var(--primary) 27%, transparent); }
  .archive-flow { position: relative; display: grid; gap: 1.6rem; padding: .5rem 0 1rem; }
  .archive-flow::before { content: ""; position: absolute; top: .7rem; bottom: .7rem; left: 50%; width: 2px; background: repeating-linear-gradient(to bottom, transparent 0 .5rem, color-mix(in srgb, var(--primary) 45%, transparent) .5rem 1rem); transform: translateX(-50%); }
  .flow-item { position: relative; display: grid; grid-template-columns: minmax(0, 1fr) 4.5rem minmax(0, 1fr); align-items: center; min-height: 7.5rem; }
  .flow-marker { grid-column: 2; grid-row: 1; z-index: 2; display: grid; place-items: center; }
  .flow-marker span { width: .82rem; height: .82rem; border: 4px solid var(--card-bg); border-radius: 999px; background: var(--primary); box-shadow: 0 0 0 1px color-mix(in srgb, var(--primary) 35%, transparent), 0 0 1rem color-mix(in srgb, var(--primary) 25%, transparent); }
  .flow-card { position: relative; display: flex; min-width: 0; flex-direction: column; justify-content: center; min-height: 6.3rem; padding: 1.05rem 1.2rem; border: 1px solid var(--line-divider); border-radius: 1rem; color: inherit; background: var(--card-bg); box-shadow: 0 .65rem 1.8rem color-mix(in srgb, var(--primary) 7%, transparent); text-decoration: none; opacity: 0; filter: blur(6px); transform: translateY(1rem); transition: opacity .42s ease, filter .42s ease, transform .42s cubic-bezier(.2, .75, .2, 1), border-color .22s ease, box-shadow .22s ease; }
  .flow-card::after { content: ""; position: absolute; top: 50%; width: 2.65rem; height: 1px; background: color-mix(in srgb, var(--primary) 58%, var(--line-divider)); transform-origin: center; }
  .from-left .flow-card { grid-column: 1; grid-row: 1; text-align: right; }
  .from-left .flow-card::after { right: -2.55rem; transform: rotate(13deg); }
  .from-right .flow-card { grid-column: 3; grid-row: 1; }
  .from-right .flow-card::after { left: -2.55rem; transform: rotate(-13deg); }
  .flow-item.is-visible .flow-card { opacity: 1; filter: blur(0); transform: translateY(0); }
  .flow-item.is-visible .flow-marker span { animation: marker-pop .35s cubic-bezier(.2, .75, .2, 1) both; }
  .flow-card:hover { border-color: color-mix(in srgb, var(--primary) 65%, var(--line-divider)); box-shadow: 0 1rem 2.2rem color-mix(in srgb, var(--primary) 14%, transparent); transform: translateY(-3px); }
  .flow-card time { color: var(--text-50); font-size: .73rem; font-weight: 800; }
  .flow-card h2 { display: -webkit-box; margin: .35rem 0 0; overflow: hidden; color: var(--text-90); font-size: clamp(1rem, 2vw, 1.17rem); font-weight: 850; letter-spacing: -.035em; line-height: 1.35; -webkit-box-orient: vertical; -webkit-line-clamp: 2; }
  .flow-label { margin-top: .42rem; color: var(--primary); font-size: .72rem; font-weight: 850; }
  .archive-list { display: grid; gap: 1.7rem; }
  .year-group { display: grid; grid-template-columns: 5rem minmax(0, 1fr); gap: 1.15rem; }
  .year-group h2 { position: sticky; top: 5.5rem; align-self: start; margin: 0; color: var(--text-90); font-size: clamp(1.35rem, 3vw, 1.85rem); font-weight: 900; letter-spacing: -.05em; }
  .year-items { position: relative; border-top: 1px solid var(--line-divider); }
  .year-items::before { content: ""; position: absolute; top: 0; bottom: .4rem; left: -1.15rem; width: 1px; background: linear-gradient(to bottom, color-mix(in srgb, var(--primary) 48%, transparent), transparent); }
  .list-row { position: relative; display: grid; grid-template-columns: 4.6rem minmax(0, 1fr) auto; align-items: center; gap: 1rem; min-height: 4.1rem; border-bottom: 1px solid var(--line-divider); color: inherit; text-decoration: none; transition: background .18s ease, transform .18s ease; }
  .list-row::before { content: ""; position: absolute; left: -1.36rem; top: 50%; width: .42rem; height: .42rem; border-radius: 999px; background: var(--primary); box-shadow: 0 0 .75rem color-mix(in srgb, var(--primary) 38%, transparent); transform: translateY(-50%); }
  .list-row:hover { background: color-mix(in srgb, var(--primary) 5%, transparent); transform: translateX(3px); }
  .list-row time { color: var(--text-50); font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: .78rem; font-weight: 750; }
  .list-title { overflow: hidden; color: var(--text-90); font-weight: 800; text-overflow: ellipsis; white-space: nowrap; }
  .list-label { border: 1px solid color-mix(in srgb, var(--primary) 25%, transparent); border-radius: 999px; padding: .22rem .55rem; color: var(--primary); background: color-mix(in srgb, var(--primary) 6%, transparent); font-size: .72rem; font-weight: 800; }
  .empty { padding: 1rem 0; color: var(--text-50); }
  @keyframes marker-pop { from { opacity: 0; transform: scale(.35); } to { opacity: 1; transform: scale(1); } }
  @media (max-width: 640px) {
    .archive-flow::before { left: .43rem; transform: none; }
    .flow-item { grid-template-columns: 1.7rem minmax(0, 1fr); min-height: auto; }
    .flow-marker { grid-column: 1; }
    .flow-card, .from-left .flow-card, .from-right .flow-card { grid-column: 2; grid-row: 1; text-align: left; }
    .flow-card::after { display: none; }
    .year-group { grid-template-columns: 1fr; gap: .45rem; padding-left: 1rem; }
    .year-group h2 { position: static; }
    .year-items::before { left: -.78rem; }
    .list-row { grid-template-columns: 3.9rem minmax(0, 1fr); gap: .7rem; }
    .list-label { grid-column: 2; justify-self: start; margin-top: -.7rem; }
  }
  @media (prefers-reduced-motion: reduce) { .flow-card { opacity: 1; filter: none; transform: none; transition: none; } .flow-item.is-visible .flow-marker span { animation: none; } }
</style>
