<script lang="ts">
  import { getPostUrlBySlug } from "../utils/url-utils";

  export let sortedPosts: Post[] = [];
  interface Post {
    slug: string;
    data: { title: string; tags: string[]; category?: string | null; role?: string; published: Date; };
  }
  type ViewMode = "flow" | "list";

  let viewMode: ViewMode = "flow";
  type Connector = { d: string; startX: number; startY: number; endX: number; endY: number };
  let connectorPaths: Connector[] = [];
  let flowSize = { width: 100, height: 100 };
  let visibleConnectorIndex = -1;
  const newestFirst = (a: Post, b: Post) => b.data.published.getTime() - a.data.published.getTime();
  $: studyPosts = sortedPosts
    .filter((post) => post.data.category?.toLowerCase() === "notes")
    .sort(newestFirst);
  $: yearGroups = studyPosts.reduce<{ year: number; posts: Post[] }[]>((groups, post) => {
    const year = post.data.published.getFullYear();
    const current = groups.find((group) => group.year === year);
    if (current) current.posts.push(post);
    else groups.push({ year, posts: [post] });
    return groups;
  }, []);
  const formatFlowDate = (date: Date) => new Intl.DateTimeFormat("en", { month: "short" }).format(date);
  const formatListDate = (date: Date) => new Intl.DateTimeFormat("en", { month: "short" }).format(date);

  function setViewMode(mode: ViewMode) {
    if (mode === viewMode) return;
    viewMode = mode;
  }
  function connectFlow(node: HTMLElement) {
    let frame = 0;

    const updatePaths = () => {
      frame = 0;
      const flowRect = node.getBoundingClientRect();
      flowSize = { width: Math.max(1, flowRect.width), height: Math.max(1, flowRect.height) };
      const cards = Array.from(node.querySelectorAll<HTMLElement>(".flow-card"));
      connectorPaths = cards.slice(0, -1).map((card, index) => {
        const nextCard = cards[index + 1];
        const current = card.getBoundingClientRect();
        const next = nextCard.getBoundingClientRect();
        const currentLeft = index % 2 === 0;
        const nextLeft = !currentLeft;
        const startX = (currentLeft ? current.right - 4 : current.left + 4) - flowRect.left;
        const startY = current.top + current.height * .6 - flowRect.top;
        const endX = (nextLeft ? next.right - 4 : next.left + 4) - flowRect.left;
        const endY = next.top + next.height * .4 - flowRect.top;
        // Keep both ends almost horizontal.  This makes the path read like a
        // gentle bridge between cards instead of a steep vertical hook.
        const distance = Math.abs(endX - startX);
        const direction = endX > startX ? 1 : -1;
        const handle = Math.max(72, distance * .36) * direction;
        const d = "M " + startX.toFixed(1) + " " + startY.toFixed(1)
          + " C " + (startX + handle).toFixed(1) + " " + startY.toFixed(1)
          + " " + (endX - handle).toFixed(1) + " " + endY.toFixed(1)
          + " " + endX.toFixed(1) + " " + endY.toFixed(1);
        return { d, startX, startY, endX, endY };
      });
    };
    const scheduleUpdate = () => {
      if (!frame) frame = requestAnimationFrame(updatePaths);
    };
    const items = Array.from(node.querySelectorAll<HTMLElement>(".flow-item"));
    let scrollFrame = 0;
    let revealedCardIndex = 0;
    let targetCardIndex = 0;
    let revealTimer = 0;
    const revealStepMs = 820;

    const applyRevealState = () => {
      items.forEach((item, index) => item.classList.toggle("is-revealed", index <= revealedCardIndex));
      visibleConnectorIndex = revealedCardIndex - 1;
    };
    // A scroll wheel or trackpad can jump over several cards in one frame.
    // Play the route one segment at a time so those jumps still read as a
    // drawn circuit path instead of several connectors popping in together.
    const playNextRevealStep = () => {
      if (revealedCardIndex === targetCardIndex) {
        revealTimer = 0;
        return;
      }
      revealedCardIndex += targetCardIndex > revealedCardIndex ? 1 : -1;
      applyRevealState();
      revealTimer = window.setTimeout(playNextRevealStep, revealStepMs);
    };
    const queueRevealPlayback = () => {
      if (!revealTimer) playNextRevealStep();
    };
    const syncScrollProgress = (immediately = false) => {
      scrollFrame = 0;
      const revealLine = window.innerHeight * .82;
      let nextTargetIndex = 0;
      items.forEach((item, index) => {
        if (item.getBoundingClientRect().top <= revealLine) nextTargetIndex = index;
      });
      targetCardIndex = nextTargetIndex;
      if (immediately) {
        revealedCardIndex = targetCardIndex;
        applyRevealState();
        return;
      }
      queueRevealPlayback();
    };
    const scheduleScrollSync = () => {
      if (!scrollFrame) scrollFrame = requestAnimationFrame(syncScrollProgress);
    };
    // This is reversible: scrolling back upward retracts the next connector
    // and its card instead of leaving the full route drawn on screen.
    syncScrollProgress(true);
    scheduleUpdate();
    window.addEventListener("scroll", scheduleScrollSync, { passive: true });
    const resizeObserver = new ResizeObserver(scheduleUpdate);
    resizeObserver.observe(node);
    return {
      destroy() {
        if (frame) cancelAnimationFrame(frame);
        if (scrollFrame) cancelAnimationFrame(scrollFrame);
        if (revealTimer) window.clearTimeout(revealTimer);
        window.removeEventListener("scroll", scheduleScrollSync);
        resizeObserver.disconnect();
        connectorPaths = [];
        visibleConnectorIndex = -1;
      },
    };
  }
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
    <section use:connectFlow class="archive-flow" aria-label="Study archive">
      <svg class="connector-layer" viewBox={`0 0 ${flowSize.width} ${flowSize.height}`} preserveAspectRatio="none" aria-hidden="true">
        {#each connectorPaths as connector, index}
          <path pathLength="1" class:is-visible={index <= visibleConnectorIndex} class="connector connector-sleeve" d={connector.d}></path>
          <path pathLength="1" class:is-visible={index <= visibleConnectorIndex} class="connector connector-core" d={connector.d}></path>
          <g class:is-visible={index <= visibleConnectorIndex} class="pin-ends">
            {#if index % 2 === 0}
              <rect x={connector.startX - 3} y={connector.startY - 6} width="28" height="12" rx="2" class="pin-body"></rect>
              <line x1={connector.startX - 2} y1={connector.startY} x2={connector.startX - 23} y2={connector.startY} class="pin-metal"></line>
              <rect x={connector.endX - 25} y={connector.endY - 6} width="28" height="12" rx="2" class="pin-body"></rect>
              <line x1={connector.endX + 2} y1={connector.endY} x2={connector.endX + 23} y2={connector.endY} class="pin-metal"></line>
            {:else}
              <rect x={connector.startX - 25} y={connector.startY - 6} width="28" height="12" rx="2" class="pin-body"></rect>
              <line x1={connector.startX + 2} y1={connector.startY} x2={connector.startX + 23} y2={connector.startY} class="pin-metal"></line>
              <rect x={connector.endX - 3} y={connector.endY - 6} width="28" height="12" rx="2" class="pin-body"></rect>
              <line x1={connector.endX - 2} y1={connector.endY} x2={connector.endX - 23} y2={connector.endY} class="pin-metal"></line>
            {/if}
          </g>
        {/each}
      </svg>
      {#each studyPosts as post, index}
        <article class:from-left={index % 2 === 0} class:from-right={index % 2 !== 0} class="flow-item">
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
  .archive-flow { position: relative; display: grid; gap: 1.25rem; padding: .5rem 0 1rem; isolation: isolate; }
  .connector-layer { position: absolute; inset: 0; z-index: 2; width: 100%; height: 100%; overflow: visible; pointer-events: none; }
  .connector { fill: none; stroke-linecap: round; stroke-dasharray: 1; stroke-dashoffset: 1; opacity: 0; vector-effect: non-scaling-stroke; transition: opacity .2s ease 1s, stroke-dashoffset 1.15s cubic-bezier(.22, .8, .18, 1); }
  .connector.is-visible { opacity: 1; stroke-dashoffset: 0; transition-delay: 0s, 0s; }
  .connector-sleeve { stroke: #8bd7df; stroke-width: 8px; filter: drop-shadow(0 .18rem .32rem color-mix(in srgb, var(--primary) 14%, transparent)); }
  .connector-core { stroke: #efffff; stroke-width: 1.8px; }
  .pin-ends { opacity: 0; transition: opacity .28s ease .62s; }
  .pin-ends.is-visible { opacity: 1; }
  .pin-body { fill: #252c30; stroke: #101518; stroke-width: 1.5px; }
  .pin-metal { stroke: #d6a84b; stroke-width: 3.2px; stroke-linecap: round; stroke-dasharray: 26; stroke-dashoffset: 26; filter: drop-shadow(0 0 .18rem #f4d690); transition: stroke-dashoffset .38s cubic-bezier(.2, .75, .2, 1); }
  .pin-ends.is-visible .pin-metal { stroke-dashoffset: 0; transition-delay: .78s; }
  .flow-item { position: relative; z-index: 1; display: grid; grid-template-columns: 1fr 1fr; align-items: center; min-height: 9.5rem; }
  .flow-card { position: relative; display: flex; width: 58%; min-width: 0; flex-direction: column; justify-content: center; min-height: 6.3rem; padding: 1.05rem 1.2rem; border: 1px solid var(--line-divider); border-radius: 1rem; color: inherit; background: var(--card-bg); box-shadow: 0 .65rem 1.8rem color-mix(in srgb, var(--primary) 7%, transparent); text-decoration: none; opacity: 1; filter: none; transform: translateY(0); transition: border-color .22s ease, box-shadow .22s ease; }
  .from-left .flow-card { grid-column: 1; justify-self: start; margin-left: 7%; text-align: left; border-right: 3px solid color-mix(in srgb, var(--primary) 60%, var(--line-divider)); }
  .from-right .flow-card { grid-column: 2; justify-self: end; margin-right: 7%; text-align: right; border-left: 3px solid color-mix(in srgb, var(--primary) 60%, var(--line-divider)); }
  .flow-item.is-revealed .flow-card { animation: card-arrival .42s cubic-bezier(.2, .75, .2, 1) both; }
  @keyframes card-arrival { from { opacity: .15; filter: blur(5px); transform: translateY(1rem); } to { opacity: 1; filter: blur(0); transform: translateY(0); } }
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
  @media (max-width: 640px) {
    .flow-item { grid-template-columns: 1fr; min-height: auto; }
    .connector-layer { display: none; }
    .flow-card, .from-left .flow-card, .from-right .flow-card { grid-column: 1; justify-self: stretch; width: auto; text-align: left; border-left: 3px solid color-mix(in srgb, var(--primary) 60%, var(--line-divider)); border-right: 1px solid var(--line-divider); }
    .year-group { grid-template-columns: 1fr; gap: .45rem; padding-left: 1rem; }
    .year-group h2 { position: static; }
    .year-items::before { left: -.78rem; }
    .list-row { grid-template-columns: 3.9rem minmax(0, 1fr); gap: .7rem; }
    .list-label { grid-column: 2; justify-self: start; margin-top: -.7rem; }
  }
  @media (prefers-reduced-motion: reduce) { .flow-card { opacity: 1; filter: none; transform: none; transition: none; } }
</style>
