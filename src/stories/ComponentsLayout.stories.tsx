import type { Meta, StoryObj } from '@storybook/react-vite';
import { Card } from '../components/Card';
import { Cluster, Container, Stack } from '../components/Layout';
import { Heading, Paragraph } from '../components/Typography';
const meta = { title: 'Components/Layout', component: Container } satisfies Meta<typeof Container>;
export default meta;
export const ReadingLayout: StoryObj<typeof meta> = { args: { children: null }, render: () => <Container reading><Stack><Card><Heading level={2}>A reusable editorial card</Heading><Paragraph>This generic component accepts long content and responsive container constraints.</Paragraph></Card><Cluster><span>Comedy</span><span>Culture</span><span>Technology</span></Cluster></Stack></Container> };
