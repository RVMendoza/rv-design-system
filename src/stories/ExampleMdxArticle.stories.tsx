import type { Meta, StoryObj } from '@storybook/react-vite';
import { GenericEmbed, InstagramEmbed, TiktokEmbed, YoutubeEmbed } from '../components/Embeds';
import { BulletedList, NumberedList } from '../components/Lists';
import { Container, Stack } from '../components/Layout';
import { Heading, Paragraph } from '../components/Typography';

const mdxSource = `---
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
  description="View the complete Instagram post in the embedded player."
  title="Instagram post"
  url="https://www.instagram.com/p/DESbLWOuM95/"
/>

<TiktokEmbed
  description="View the complete Tiktok video in the embedded player."
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
/>`;

function MdxArticleExample() {
  return (
    <Container reading>
      <article>
        <Stack>
          <header>
            <Heading level={1}>A post with media</Heading>
            <Paragraph size="lead">An example Astro MDX article using RVDS embeds.</Paragraph>
          </header>
          <Paragraph>
            Ordinary paragraphs, <a href="https://example.com">text links</a>, and lists remain
            Markdown.
          </Paragraph>
          <BulletedList>
            <li>Start with a semantic Markdown list.</li>
            <li>
              Add richer media only where it helps.
              <NumberedList>
                <li>Supply a descriptive title.</li>
                <li>Keep provider metadata explicit.</li>
              </NumberedList>
            </li>
          </BulletedList>
          <InstagramEmbed
            description="View the complete Instagram post in the embedded player."
            title="Instagram post"
            url="https://www.instagram.com/p/DESbLWOuM95/"
          />
          <TiktokEmbed
            description="View the complete Tiktok video in the embedded player."
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
        </Stack>
      </article>
    </Container>
  );
}

const meta = {
  title: 'Examples/MDX Article',
  component: MdxArticleExample,
  parameters: {
    layout: 'padded',
    docs: { source: { code: mdxSource, language: 'mdx' } },
  },
} satisfies Meta<typeof MdxArticleExample>;

export default meta;
export const RenderedPost: StoryObj<typeof meta> = {};
