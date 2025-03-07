import React from 'react';
import { View, Text } from 'react-native';
import type { Preview } from '@storybook/react';
import { withBackgrounds } from '@storybook/addon-ondevice-backgrounds';

const preview: Preview = {
  decorators: [
    withBackgrounds,
    (Story) => (
      <View style={{ flex: 1, padding: 16 }}>
        <Story />
      </View>
    ),
  ],
};

export default preview;
