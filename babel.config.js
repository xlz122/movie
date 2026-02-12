module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    'react-native-worklets/plugin',
    'react-native-web',
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
