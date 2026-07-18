# RV Design System agent instructions

These rules apply to every file in this repository. Human instructions in the active task take precedence.

## Accessibility is a release requirement

- Target WCAG 2.2 AA. Automated checks are necessary but do not prove conformance.
- Prefer native HTML semantics and behavior before adding ARIA.
- Support keyboard operation, logical focus order, visible focus, reduced motion, 320px reflow, and 200% zoom.
- Use labels, instructions, errors, and status messages that are programmatically associated with their controls.
- Do not communicate meaning or state through color alone. Maintain at least 4.5:1 contrast for normal text and 3:1 for large text and meaningful UI boundaries.
- Preserve minimum 44px touch targets where practical. Avoid keyboard traps, hover-only information, and unnecessary motion.
- Document keyboard behavior and include default, hover, focus-visible, active, disabled, error, loading, long-content, and mobile states where applicable.

## CSS and naming

- Use CSS Modules, but expose stable public class names using BEM and the `rvds` namespace.
- Blocks use `rvds-block`, elements use `rvds-block__element`, and modifiers use `rvds-block--modifier`. Do not emit unnamespaced or hashed public classes.
- Every custom property must start with `--rvds-`. Do not add compatibility aliases without explicit approval.
- Use semantic tokens in components rather than raw color values. Keep sunflower gold for actions/focus and verdigris for links or restrained informational states.
- Preserve the minimal dark Inter-based direction. Do not add gradients, glass effects, excessive rounding, or animation libraries without explicit approval.

## Components and tests

- Use strict TypeScript and document public props. Keep component names generic and reusable.
- Preserve native element props and behavior. Avoid unnecessary client-side JavaScript and dependencies.
- Every public component needs representative Storybook stories, meaningful interaction or unit tests, and accessibility checks.
- Run `pnpm check` with Node.js 22 or newer before handoff. Add regression coverage for public classes, tokens, semantics, and keyboard behavior.
- Treat stable BEM classes, `--rvds-*` tokens, React exports, and documented props as public APIs. Record breaking changes with Changesets.

## Privacy and repository boundary

- Never add private website copy, Squarespace exports, credentials, account metadata, personal contact details, private client information, analytics, or unlicensed assets.
- Use generic placeholder content in public examples. Do not copy website-specific compositions into this package.
- Do not publish, deploy, or change repository visibility unless the user explicitly authorizes it.
