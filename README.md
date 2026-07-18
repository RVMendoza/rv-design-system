# RV Design System

Reusable, accessible React primitives for RV Mendoza projects. This public portfolio artifact is intentionally separate from private website copy and migrated content.

Status: Milestone 2 foundation. The package is not published to npm.

## Public CSS contract

Rendered classes are stable, namespaced BEM hooks such as `rvds-button`, `rvds-button--primary`, `rvds-paragraph`, and `rvds-quote__attribution`. Every custom property begins with `--rvds-`, for example `--rvds-color-action` and `--rvds-space-4`. Unprefixed tokens are not supported.

## Blog components

The package includes long-form `Paragraph`, `Heading`, `Quote`, `CodeBlock`, and `Divider` primitives; mixed `BulletedList` and `NumberedList` compositions; responsive `Image`, `Gallery`, and `VideoEmbed` media; and `YoutubeEmbed`, `InstagramEmbed`, `TiktokEmbed`, and `GenericEmbed` previews. Youtube uses its privacy-enhanced host and loads the native player lazily when it nears the viewport. Other provider previews never inject third-party scripts or iframes.

For an Astro Content Collections example, see the [Astro MDX usage guide](docs/astro-mdx-usage.md). Markdown parsing, generated-prose styling, and component mapping belong to the consuming website; this package supplies the components and CSS contract.

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
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
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
