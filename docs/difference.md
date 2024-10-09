[Readme.md](../README.md) | [阿里字体图标](./iconfont.md) | [插件介绍](./plugin.md) | 平台差异对比 | [打包](./release.md) 

## 配置差异

阿里字体图标

* app端请查看[阿里字体图标](./iconfont.md)
* web端查看[web/webpack.config.js](https://github.com/xlz122/movie/blob/web-webpack/web/webpack.config.js) - module配置项、index.web.js文件

跨域

* app端不需要处理跨域
* web端需要处理跨域，请查看[web/webpack.config.js](https://github.com/xlz122/movie/blob/web-webpack/web/webpack.config.js) - devServer配置项

## 插件差异

渐变背景

* app端使用react-native-linear-gradient
* web端使用react-native-web-linear-gradient，请查看[web/webpack.config.js](https://github.com/xlz122/movie/blob/web-webpack/web/webpack.config.js) - alias配置项

react-native-webview

* app端使用react-native-webview在app内打开web网页
* web端原生支持web写法，通过特定文件名来区分不同平台，示例可以查看src/views/author文件夹
