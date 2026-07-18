# RV Design System

Reusable, accessible React primitives for RV Mendoza projects. This public portfolio artifact is intentionally separate from private website copy and migrated content.

Status: Milestone 2 foundation. The package is not published to npm.

## Requirements

- Node.js 22 or newer supported LTS
- pnpm 10

## Development

```sh
pnpm install
pnpm storybook
pnpm check
```

## Local website dependency

Build the package, then consume it from a sibling private repository with `pnpm add ../rv-design-system` or `pnpm pack` plus the generated tarball. The package boundary must remain intact; do not copy shared source into the website.

## Accessibility

Components use native semantics, visible focus, reduced-motion handling, and documented keyboard behavior. See [`docs/accessibility.md`](docs/accessibility.md).

## Versioning and contributions

Use Changesets for user-facing changes. Keep components generic, document props and meaningful states, add stories and tests, and run `pnpm check` before review.

## License

No open-source license has been granted. See [`RIGHTS.md`](RIGHTS.md). RV must approve a license before unrestricted reuse or npm publication.
