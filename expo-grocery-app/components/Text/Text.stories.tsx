import type { Meta, StoryObj } from '@storybook/react';

import Text from '.';

import { View } from 'react-native';
import React from 'react';

const meta = {
  title: 'Text',
  component: Text,
  argTypes: {
    // onPress: { action: 'pressed the button' },
    variant: {
      control: 'inline-radio',
      options: ['heading', 'title', 'error', 'default'],
    },
    size: {
      control: 'inline-radio',
      options: ['xs', 'sm', 'base', 'md', 'lg', 'xl'],
    },
  },
  args: {
    size: 'base',
    variant: 'default',
  },
  decorators: [
    (Story) => (
      <View style={{ alignItems: 'center', flex: 1, paddingTop: 100 }}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof Text>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Hello World',
  },
};
