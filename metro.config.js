const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {
  transformer: {
    // Enable require context to support dynamic imports in storybook
    unstable_allowRequireContext: true,
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
