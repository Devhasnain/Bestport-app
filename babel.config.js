module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '@/components': './src/components',
          '@/screens': './src/screens',
          '@/assets': './src/assets',
          '@/utils': './src/utils',
          '@/config': './src/config',
          '@/store': './src/store',
          '@/navigation': './src/navigation',
          '@/hooks': './src/hooks',
          '@/types': './src/types',
          '@/api': './src/api',
          '@/services': './src/services',
          '@/styles': './src/styles',
          '@/providers': './src/providers',
          '@/constants': './src/constants',
        },
      },
    ],
    'react-native-reanimated/plugin',
    [
      'module:react-native-dotenv',
      {
        moduleName: '@env',
        path: '.env',
        safe: true,
        allowUndefined: false,
      },
    ]
  ],
};
