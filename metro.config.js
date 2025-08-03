const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Add support for resolving paths like @/components
config.resolver.alias = {
  '@': './src',
};

module.exports = config;