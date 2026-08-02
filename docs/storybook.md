# Storybook navigation and review

Storybook is organized by what a consumer is trying to understand:

- **Foundations** documents semantic color, typography, and spacing contracts.
- **Components** contains focused reusable controls, layout, navigation, social, and brand primitives.
- **Editorial** contains long-form typography, prose, lists, media, embeds, and article-preview patterns.
- **Patterns** combines primitives into reusable product-level structures such as case-study evidence.
- **Examples** shows a small number of complete compositions and authoring integrations.

Focused stories show defaults, meaningful variants, long content, wrapping, and interaction states. Complete examples demonstrate composition without repeating every component variant. Autodocs is enabled for every story module so props and source remain available beside the rendered examples.

## Review checklist

1. Start with the default story before comparing variants or compositions.
2. Use the responsive preview controls at narrow phone, tablet, and desktop widths. Confirm 320px reflow and repeat the narrow review at 200% browser zoom.
3. Use Tab and Shift+Tab to verify logical focus order and visible focus. Exercise native controls without a pointer.
4. Enable the operating system's reduced-motion preference before reviewing moving rails or embeds.
5. Check the Accessibility panel. Violations are configured as test errors, but automated results do not replace keyboard, reflow, contrast, or screen-reader judgment.
6. Keep story data generic and public. Website copy, private campaigns, analytics, and credentials do not belong in RVDS.

Run `pnpm check` before handoff. It validates formatting, lint, types, unit and accessibility contracts, the public package, and the complete static Storybook build.
