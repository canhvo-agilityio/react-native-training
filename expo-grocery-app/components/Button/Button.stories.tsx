import type { Meta, StoryObj } from '@storybook/react';

import Button from '.';

import { View } from 'react-native';
import React from 'react';
import { SearchIcon } from '../icons';

const meta = {
  title: 'Button',
  component: Button,
  argTypes: {
    // onPress: { action: 'pressed the button' },
    variant: {
      control: 'inline-radio',
      options: ['primary', 'secondary', 'outlined', 'reversal'],
    },
    size: {
      control: 'inline-radio',
      options: ['sm', 'md', 'full'],
    },
  },
  args: {
    size: 'sm',
    variant: 'primary',
  },
  decorators: [
    (Story) => (
      <View style={{ alignItems: 'center', flex: 1, paddingTop: 100 }}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Button',
  },
};

export const Disabled: Story = {
  args: {
    title: 'Button',
    disabled: true,
  },
};

export const Loading: Story = {
  args: {
    title: 'Button',
    isLoading: true,
  },
};

export const Icon: Story = {
  args: {
    title: 'Button',
    icon: <SearchIcon />,
  },
};
