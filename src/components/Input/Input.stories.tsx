import type { Meta, StoryObj } from '@storybook/react';
import Input from '.';

const meta = {
  title: 'components/Input',
  component: Input,
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Flushed: Story = {
  args: {
    value: 't',
    onChangeText: () => {},
  },
};

export const Filled: Story = {
  args: {
    value: 'Enter your promo code',
    variant: 'filled',
    onChangeText: () => {},
  },
};

export const HasLabel: Story = {
  args: {
    value: '',
    onChangeText: () => {},
    label: 'Label',
  },
};

export const HasIcon: Story = {
  args: {
    value: '',
    onChangeText: () => {},
    label: 'Label',
  },
};
