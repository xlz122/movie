[Readme.md](../README.md) | [阿里字体图标](./iconfont.md) | 插件介绍 | [平台差异对比](./difference.md) | [打包](./release.md) 

手势

* react-native-gesture-handler

状态管理 + 本地存储持久化

* @reduxjs/toolkit
* react-redux
* @react-native-async-storage/async-storage
* redux-persist

路由

* @react-navigation/native
* @react-navigation/stack
* react-native-safe-area-context
* react-native-screens

TabBar路由

* @react-navigation/bottom-tabs

轮播图

* react-native-reanimated
* react-native-reanimated-carousel

轮播图 - 配置babel.config.js

```diff
module.exports = {
  presets: ['module:@react-native/babel-preset'],
+ plugins: ['react-native-reanimated/plugin']
};
```

渐变背景色

* react-native-linear-gradient(app端)
* react-native-web-linear-gradient(web端)

app端内置网页

* react-native-webview

路径别名

* babel-plugin-module-resolver

路径别名 - 配置babel.config.js

```diff
module.exports = {
  presets: ['module:@react-native/babel-preset'],
+ plugins: [
+   [
+     'module-resolver',
+     {
+       root: ['./src'],
+       extensions: ['.android.js', '.ios.js', '.js', '.ts', '.tsx', '.json'],
+       alias: {
+         '@': ['./src']
+       }
+     }
+   ]
+ ]
};
```
