// metro.config.js
const path = require('path');
const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Add asset handling configuration
config.resolver.assetExts.push('png', 'jpg', 'jpeg', 'gif');

module.exports = config;
