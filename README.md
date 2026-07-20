# RV Design System

Reusable, accessible React primitives for RV Mendoza projects. This public portfolio artifact is intentionally separate from private website copy and migrated content.

Status: Milestone 2 foundation. The package is not published to npm.

## Public CSS contract

Rendered classes are stable, namespaced BEM hooks such as `rvds-button`, `rvds-button--primary`, `rvds-paragraph`, and `rvds-quote__attribution`. Every custom property begins with `--rvds-`, for example `--rvds-color-action` and `--rvds-space-4`. Unprefixed tokens are not supported.

RVDS owns the document's dark canvas and Inter typography. Sunflower gold is used for text links and focus indicators; verdigris is used for primary actions and success states.

## Blog components

The package includes long-form `Paragraph`, `Heading`, `Quote`, `CodeBlock`, and `Divider` primitives; a `Prose` wrapper for native Markdown output; mixed `BulletedList` and `NumberedList` compositions; responsive `Image`, `Gallery`, and `VideoEmbed` media; and `YoutubeEmbed`, `InstagramEmbed`, `TiktokEmbed`, and `GenericEmbed` previews. `Image` supports reusable crops, focal positioning, captions below or at the top inline end of an image, and right-aligned photo credits. The shared `Icon` component accepts canonical kebab-case names from the Lucide catalog and safely falls back to `sparkles`. `ArticlePreview` uses that system for its optional decorative marker. Youtube uses its privacy-enhanced host. Instagram, Tiktok, and Youtube load responsive provider players lazily. Generic previews remain script-free outbound links.

For an Astro Content Collections example, see the [Astro MDX usage guide](docs/astro-mdx-usage.md). Markdown parsing and component mapping belong to the consuming website. Wrap generated article output in `Prose` to apply the RVDS typography and media treatment without rewriting ordinary Markdown as JSX.

## Requirements

- Node.js 22 or newer supported LTS
- pnpm 11.9.0

## Development

```sh
pnpm install
pnpm storybook
pnpm check
```

Storybook runs at [http://localhost:6006](http://localhost:6006). Stop it with `Control+C`. Rebuild the package with `pnpm build` whenever the consuming Astro website needs new RVDS source changes.

## Fonts

The package defines Inter with system-sans fallbacks but does not load external resources. Consumers that choose Google Fonts should add these elements to the document head:

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap"
  rel="stylesheet"
/>
```

Without those links, the interface uses the documented system-sans fallback stack. Storybook loads the same stylesheet for accurate previews.

## Local website dependency

Build the package, then consume it from a sibling private repository with `pnpm add ../rv-design-system` or `pnpm pack` plus the generated tarball. The package boundary must remain intact; do not copy shared source into the website.

## Accessibility

Components use native semantics, visible focus, reduced-motion handling, and documented keyboard behavior. See [`docs/accessibility.md`](docs/accessibility.md).

## Versioning and contributions

Use Changesets for user-facing changes. Keep components generic, document props and meaningful states, add stories and tests, and run `pnpm check` before review. Humans and AI agents must follow [`AGENTS.md`](AGENTS.md).

## License

No open-source license has been granted. See [`RIGHTS.md`](RIGHTS.md). RV must approve a license before unrestricted reuse or npm publication.
