import type { Meta, StoryObj } from '@storybook/react-vite';
import { siInstagram } from 'simple-icons';
import { FeatureSteps, MetricGrid, ProjectPreview, QuoteRail } from '../components/CaseStudies';

const instagramLogo = `data:image/svg+xml,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#${siInstagram.hex}" d="${siInstagram.path}"/></svg>`,
)}`;

const meta = {
  title: 'Patterns/Case Studies',
  component: ProjectPreview,
} satisfies Meta<typeof ProjectPreview>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ProjectPreviewCard: Story = {
  args: {
    brandName: 'Instagram',
    brandLogo: {
      src: instagramLogo,
      width: 96,
      height: 96,
    },
    href: '#project',
    meta: 'Paid partnership · Q2 2026',
    roleLabel: 'Content creator + speaker',
    outcome: 'Made a creator tool useful through a real workflow.',
    image: {
      alt: 'Creator presenting at a product workshop.',
      height: 640,
      src: '/favicon.svg',
      width: 640,
    },
  },
};

export const VerifiedMetrics = () => (
  <MetricGrid
    aria-label="Verified campaign results"
    items={[
      { label: 'Accounts reached', value: '130K+' },
      { label: 'Total engagements', value: '1.5K+' },
    ]}
  />
);

export const ProcessSteps = () => (
  <FeatureSteps
    items={[
      {
        description: 'Show how the product fits into a real creative process.',
        icon: 'target',
        label: 'The brief',
        title: 'Make the product useful',
      },
      {
        description: 'Use a familiar creator format as the teaching device.',
        icon: 'lightbulb',
        label: 'The creative move',
        title: 'Give the audience a story',
      },
      {
        description: 'Carry one idea through strategy, education, and delivery.',
        icon: 'video',
        label: 'What I made',
        title: 'Strategy through delivery',
      },
    ]}
  />
);

export const AudienceQuoteRail = () => (
  <QuoteRail
    autoDrift
    items={[
      { attribution: '@creator', quote: 'The real workflow made this click.' },
      { attribution: '@viewer', quote: 'I want to attend the next workshop.' },
      { attribution: '@reader', quote: 'Editing as empathy is such a useful idea.' },
      { attribution: '@partner', quote: 'This is how you make a product belong in the story.' },
      { attribution: '@student', quote: 'I finally understand how to structure the idea.' },
      { attribution: '@designer', quote: 'The practical example made the lesson memorable.' },
      { attribution: '@strategist', quote: 'Useful, specific, and still entertaining.' },
      { attribution: '@producer', quote: 'I would watch a whole series built like this.' },
      { attribution: '@editor', quote: 'The pacing kept every step easy to follow.' },
      { attribution: '@marketer', quote: 'This gives the product a real reason to be there.' },
      { attribution: '@attendee', quote: 'Please bring this workshop back next year.' },
      { attribution: '@subscriber', quote: 'More behind-the-scenes examples like this.' },
    ]}
    label="Audience comments"
  />
);
