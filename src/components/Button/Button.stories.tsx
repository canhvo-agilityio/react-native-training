import type { Meta, StoryObj } from '@storybook/react';
import Button from '.';

const meta = {
  title: 'components/Button',
  component: Button,
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    text: 'Hello World',
  },
};

export const Text: Story = {
  args: {
    text: 'Hello World',
    variant: 'text',
  },
};

export const Loading: Story = {
  args: {
    text: 'Hello World',
    isLoading: true,
  },
};

export const disabled: Story = {
  args: {
    text: 'Hello World',
    disabled: true,
  },
};
