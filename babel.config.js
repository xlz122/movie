module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    'react-native-reanimated/plugin',
    'react-native-web',
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.android.js', '.ios.js', '.js', '.ts', '.tsx', '.json'],
        alias: { '@': ['./src'] }
      }
    ]
  ]
};
