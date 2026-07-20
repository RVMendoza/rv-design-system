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
- Use semantic tokens in components rather than raw color values. Keep sunflower gold for links, focus, and attention; use verdigris for actions and success.
- Preserve the minimal dark Inter-based direction. Do not add gradients, glass effects, excessive rounding, or animation libraries without explicit approval.
- Model reusable visual and layout behavior as explicit component props with stable BEM modifiers. Consumer pages should not need contextual selectors such as `.page .rvds-button` to alter component shape, width, alignment, or interaction states.
- Name variants and components for their general behavior, not for a website route or campaign. Do not add a page-specific component to RVDS when a generic action-list, layout, or sizing API would describe the same contract.
- Keep component styling owned by its RVDS block. Prefer a modifier placed on the block over ancestry-dependent specificity, `!important`, tag coupling, or assumptions about consumer DOM structure.

## Components and tests

- RVDS is the preferred source for generic interface behavior consumed by the RV Mendoza website. When website work reveals a missing reusable pattern, evaluate and implement the public RVDS API before adding a local imitation.
- Accept a new RVDS component or variant only when it supports at least two credible compositions, can be named for behavior rather than a route or content type, and does not depend on private website copy, CMS schemas, URLs, publishing logic, or business rules.
- Prefer composing or extending existing primitives before adding another public block. A new abstraction should remove real duplication or provide missing semantic, responsive, or interaction behavior, not merely wrap a few lines of JSX.
- Design the consumer API before styling the implementation. Preserve native element props, choose explicit typed variants, identify stable BEM classes and semantic tokens, and document which concerns remain owned by the consuming site.
- Use strict TypeScript and document public props. Keep component names generic and reusable.
- Preserve native element props and behavior. Avoid unnecessary client-side JavaScript and dependencies.
- Every public component needs representative Storybook stories, meaningful interaction or unit tests, and accessibility checks.
- When a consumer workaround reveals a missing RVDS capability, test the proposed API with at least two credible compositions before making it public. Cover long labels, narrow viewports, 200% zoom, keyboard focus, and interaction states.
- Run `pnpm format` after editing supported source files, then run `pnpm check` with Node.js 22 or newer before handoff. Add regression coverage for public classes, tokens, semantics, and keyboard behavior.
- Treat stable BEM classes, `--rvds-*` tokens, React exports, and documented props as public APIs. Record breaking changes with Changesets.

## Privacy and repository boundary

- Never add private website copy, Squarespace exports, credentials, account metadata, personal contact details, private client information, analytics, or unlicensed assets.
- Use generic placeholder content in public examples. Do not copy website-specific compositions into this package.
- Do not publish, deploy, or change repository visibility unless the user explicitly authorizes it.
