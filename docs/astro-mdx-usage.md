# Astro MDX usage

Use Astro Content Collections with `.mdx` entries when a post needs RVDS components. Ordinary prose stays Markdown; richer blocks use explicit JSX. RVDS components render server-side and do not need a `client:*` hydration directive.

Configure the consuming Astro site with its official MDX and React integrations:

```ts
// astro.config.ts
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import { defineConfig } from 'astro/config';

export default defineConfig({
  integrations: [mdx(), react()],
});
```

Import the package stylesheet once in the shared blog layout, not in every post:

```astro
---
import '@rvmendoza/design-system/styles.css';
---

<main>
  <slot />
</main>
```

The website layout owns the mapping or styling for generated Markdown elements such as `p`, `h2`, `ul`, and `ol`. Keep that website-side prose layer aligned with RVDS tokens and semantics. The design-system package does not parse Markdown.

## Copy-ready post

```mdx
---
title: "A post with media"
description: "An example Astro MDX article using RVDS embeds."
publishedAt: 2026-07-18
status: publish
draft: false
---

import {
  GenericEmbed,
  InstagramEmbed,
  TiktokEmbed,
  YoutubeEmbed,
} from '@rvmendoza/design-system';

# A post with media

Ordinary paragraphs, [text links](https://example.com), and lists remain Markdown.

- Start with a semantic Markdown list.
- Add richer media only where it helps.
  1. Supply a descriptive title.
  2. Keep provider metadata explicit.

<InstagramEmbed
  description="Open this post on Instagram without loading provider scripts here."
  title="Instagram post"
  url="https://www.instagram.com/p/DESbLWOuM95/"
/>

<TiktokEmbed
  description="Open this video on Tiktok without loading provider scripts here."
  title="Tiktok video"
  url="https://www.tiktok.com/@rvxmendoza/video/7368864505985617195"
/>

<GenericEmbed
  description="View the media kit in a new tab."
  provider="Media kit"
  title="RV Mendoza media kit"
  url="https://beacons.ai/rvxmendoza/mediakit"
/>

<YoutubeEmbed
  caption="The privacy-enhanced player loads lazily near the viewport."
  title="Beyoncé – All Night"
  videoId="gM89Q5Eng_M"
/>
```

Titles and descriptions are required authoring decisions, not third-party metadata. Instagram, Tiktok, and generic cards remain outbound links with no provider scripts or iframes. Youtube is the only provider component that creates an iframe.
