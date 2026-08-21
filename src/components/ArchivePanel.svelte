<script lang="ts">
  import { getPostUrlBySlug } from "../utils/url-utils";

  export let sortedPosts: Post[] = [];
  interface Post {
    slug: string;
    data: { title: string; tags: string[]; category?: string | null; role?: string; published: Date; };
  }

  const isCategory = (name: string) => (post: Post) => post.data.category?.toLowerCase() === name;
  const oldestFirst = (a: Post, b: Post) => a.data.published.getTime() - b.data.published.getTime();
  $: careers = sortedPosts.filter(isCategory("career")).sort(oldestFirst);
  $: competitions = sortedPosts.filter(isCategory("competitions")).sort(oldestFirst);
  $: projects = sortedPosts.filter(isCategory("projects")).sort(oldestFirst);
  $: notes = sortedPosts.filter(isCategory("notes")).sort(oldestFirst);
  const formatDate = (date: Date) => new Intl.DateTimeFormat("ko-KR", { year: "numeric", month: "2-digit" })
    .format(date).replace(/\. /g, ".").replace(/\.$/, "");
</script>

<div class="archive-panel">
  <section class="archive-section">
    <h2>Affiliation</h2>
    <div class="timeline">
      {#each careers as post}
        <a class="timeline-item" href={getPostUrlBySlug(post.slug)}>
          <span class="dot"></span>
          <div>
            <h3>{post.data.title}</h3>
            <div class="meta">
              {#if post.data.role}<span class="badge">{post.data.role}</span>{/if}
              <time>{formatDate(post.data.published)} ~ Present</time>
            </div>
          </div>
        </a>
      {:else}
        <p class="empty">등록된 경력 또는 활동이 없습니다.</p>
      {/each}
    </div>
  </section>

  <section class="archive-section">
    <h2>Competitions</h2>
    <div class="project-list">
      {#each competitions as post}
        <a class="project-card" href={getPostUrlBySlug(post.slug)}>
          <h3>{post.data.title}</h3>
          <div class="meta">
            {#if post.data.role}<span class="badge">{post.data.role}</span>{/if}
            <time>{formatDate(post.data.published)}</time>
          </div>
        </a>
      {:else}
        <p class="empty">등록된 대회 기록이 없습니다.</p>
      {/each}
    </div>
  </section>

  <section class="archive-section">
    <h2>Projects</h2>
    <div class="project-list">
      {#each projects as post}
        <a class="project-card" href={getPostUrlBySlug(post.slug)}>
          <h3>{post.data.title}</h3>
          <div class="meta">
            {#if post.data.role}<span class="badge">{post.data.role}</span>{/if}
            <time>{formatDate(post.data.published)}</time>
          </div>
        </a>
      {:else}
        <p class="empty">등록된 프로젝트가 없습니다.</p>
      {/each}
    </div>
  </section>

  {#if notes.length > 0}
    <section class="archive-section">
      <h2>Study Notes</h2>
      <div class="project-list">
        {#each notes as post}
          <a class="project-card" href={getPostUrlBySlug(post.slug)}>
            <h3>{post.data.title}</h3>
            <div class="meta">
              {#if post.data.role}<span class="badge">{post.data.role}</span>{/if}
              <time>{formatDate(post.data.published)}</time>
            </div>
          </a>
        {/each}
      </div>
    </section>
  {/if}
</div>

<style>
  .archive-panel { padding: clamp(1.7rem, 5vw, 4rem); background: var(--card-bg); border-radius: var(--radius-large); }
  .archive-section + .archive-section { margin-top: 4.7rem; }
  h2, h3, p { margin: 0; }
  h2, h3 { color: var(--text-90); letter-spacing: -.055em; }
  h2 { margin-bottom: 2.4rem; font-size: clamp(1.8rem, 3.3vw, 2.3rem); }
  .timeline { position: relative; display: grid; gap: 2.35rem; padding-left: 2.85rem; }
  .timeline::before { content: ""; position: absolute; top: .65rem; bottom: .65rem; left: .48rem; width: 2px; background: color-mix(in srgb, var(--primary) 24%, transparent); }
  .timeline-item { position: relative; display: block; text-decoration: none; }
  .dot { position: absolute; top: .38rem; left: -2.85rem; width: .98rem; height: .98rem; border: 4px solid var(--card-bg); border-radius: 50%; background: var(--primary); box-shadow: 0 0 0 1px color-mix(in srgb, var(--primary) 20%, transparent); }
  h3 { font-size: 1.15rem; }
  .meta { display: flex; flex-wrap: wrap; align-items: center; gap: .65rem; margin-top: .75rem; color: var(--text-50); font-size: .86rem; }
  .badge { padding: .29rem .72rem; border: 1px solid color-mix(in srgb, var(--primary) 28%, transparent); border-radius: 999px; color: var(--primary); background: color-mix(in srgb, var(--primary) 7%, transparent); font-weight: 700; }
  .project-list { display: grid; gap: 1.15rem; }
  .project-card { display: block; padding: 1.75rem 1.35rem; border: 1px solid var(--line-divider); border-radius: 1rem; text-decoration: none; transition: border-color .2s, transform .2s, box-shadow .2s; }
  .project-card h3 { color: var(--primary); }
  .project-card:hover { border-color: color-mix(in srgb, var(--primary) 45%, var(--line-divider)); transform: translateY(-2px); box-shadow: 0 .7rem 1.5rem color-mix(in srgb, var(--primary) 9%, transparent); }
  .empty { color: var(--text-50); }
  @media (max-width: 640px) { .archive-panel { padding: 1.6rem; }.archive-section + .archive-section { margin-top: 3.6rem; }.timeline { padding-left: 2.3rem; }.timeline-item .dot { left: -2.3rem; }.project-card { padding: 1.35rem 1.1rem; } }
</style>
