import { AppRegistry } from 'react-native';
import App from './App.tsx';

AppRegistry.registerComponent('App', () => App);

AppRegistry.runApplication('App', {
  rootTag: document.getElementById('root')
});

// 阿里字体图标
import iconFont from './src/assets/fonts/iconfont.ttf';
const iconFontStyles = `@font-face {
  src: url(${iconFont});
  font-family: 'iconfont';
}`;

const style = document.createElement('style');
if (style.styleSheet) {
  style.styleSheet.cssText = iconFontStyles;
} else {
  style.appendChild(document.createTextNode(iconFontStyles));
}

document.head.appendChild(style);
