# Accessibility principles

The target is WCAG 2.2 AA. Automated checks are a floor, not proof of conformance.

Repository-wide implementation rules for humans and AI agents live in [`AGENTS.md`](../AGENTS.md).

## Component expectations

- Use native HTML behavior before ARIA.
- Preserve visible focus and logical DOM order.
- Maintain 44px minimum interactive control height where practical.
- Do not communicate state by color alone.
- Labels and error messages must be programmatically associated with controls.
- Components must reflow at 320px and remain usable at 200% zoom.
- Content examples include long labels and narrow containers.
- Motion uses shared tokens and respects `prefers-reduced-motion`.
- Verdigris actions use black text, sunflower-gold links retain at least 4.5:1 contrast on the black canvas and raised surfaces, and gold focus rings use a black separator over verdigris controls.
- Muted copy uses an accessible derived token rather than raw dim grey, which is reserved for borders and non-text separation.

## Keyboard behavior

- `Button`: Tab focuses; Enter or Space activates; disabled/loading states cannot activate.
- `Link`: Tab focuses; Enter follows the destination.
- `SkipLink`: first focusable element; becomes visible on focus and moves focus toward main content.
- `YoutubeEmbed`: the privacy-enhanced iframe loads lazily near the viewport; its required title identifies the player, and native Youtube controls provide keyboard interaction.
- `BulletedList` and `NumberedList`: native list semantics are preserved through arbitrary mixed nesting; dash markers are decorative CSS.
- `Image`, `Gallery`, and `VideoEmbed`: alternative text, labels, captions, and caption tracks remain the content author's responsibility and are exposed through required or documented props.

## Required review before release

Run Storybook's accessibility checks, keyboard-test every interactive story, inspect forced-colors mode, test 200% zoom and 320px reflow, and perform screen-reader spot checks in VoiceOver and NVDA when available.
