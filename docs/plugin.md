[Readme.md](../README.md) | [阿里字体图标](./iconfont.md) | 插件介绍 | [平台差异对比](./difference.md) | [打包apk](./release.md) 

手势

* react-native-gesture-handler

持久化状态管理(redux + 本地存储 + redux-persist)

* @reduxjs/toolkit
* react-redux
* @react-native-async-storage/async-storage
* redux-persist

路由

* @react-navigation/native
* @react-navigation/stack
* react-native-safe-area-context
* react-native-screens

tabbar路由

* @react-navigation/bottom-tabs

轮播图

* react-native-reanimated
* react-native-reanimated-carousel

配置babel.config.js
```
plugins: ['react-native-reanimated/plugin']
```

渐变背景色

* react-native-linear-gradient(app端)
* react-native-web-linear-gradient(web端)

app端内置网页

* react-native-webview

路径别名

* babel-plugin-module-resolver

配置babel.config.js

```
plugins: [
  ...
  [
    'module-resolver',
    {
      root: ['./src'],
      extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
      alias: {
        '@': ['./src']
      }
    }
  ]
]
```

tsconfig.json(create-react-app脚手架配置)

```
{
  "compilerOptions": {
    "target": "es5",
    "lib": [
      "dom",
      "dom.iterable",
      "esnext"
    ],
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noFallthroughCasesInSwitch": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  },
  "include": ["src"],
  "exclude": ["node_modules"]
}
```