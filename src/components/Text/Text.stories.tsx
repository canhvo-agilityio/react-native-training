import type { Meta, StoryObj } from '@storybook/react';

import Text from '.';

const meta: Meta<typeof Text> = {
  title: 'components/Text',
  component: Text,
};

export default meta;

type Story = StoryObj<typeof Text>;

export const Default: Story = {
  args: {
    value: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
  },
};

export const Heading: Story = {
  args: {
    value: 'HEADING TEXT',
    variant: 'heading',
    size: '2xl',
  },
};

export const Title: Story = {
  args: {
    value: 'This is title',
    variant: 'title',
    size: 'xs',
  },
};

export const Description: Story = {
  args: {
    value: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    variant: 'description',
    size: 'xs',
  },
};
