module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    'react-native-worklets/plugin',
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.android.js', '.ios.js', '.js', '.ts', '.tsx'],
        alias: { '@': ['./src'] },
      },
    ],
  ],
};
