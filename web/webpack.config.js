const path = require('path');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CompressionWebpackPlugin = require('compression-webpack-plugin');

const appDirectory = path.resolve(__dirname, '../');

// 需要编译的插件
const compileNodeModules = [
  'react-native-reanimated',
  'react-native-linear-gradient',
  'react-native-webview'
].map(moduleName => path.resolve(appDirectory, `node_modules/${moduleName}`));

// This is needed for webpack to compile JavaScript.
// Many OSS React Native packages are not compiled to ES5 before being
// published. If you depend on uncompiled packages they may cause webpack build
// errors. To fix this webpack can be configured to compile to the necessary
// `node_module`.
const babelLoaderConfiguration = {
  test: /\.js$|tsx?$/,
  // Add every directory that needs to be compiled by Babel during the build.
  include: [
    path.resolve(appDirectory, 'index.web.js'),
    path.resolve(appDirectory, 'App.tsx'),
    path.resolve(appDirectory, 'src'),
    path.resolve(appDirectory, 'node_modules/react-native-uncompiled'),
    ...compileNodeModules
  ],
  use: {
    loader: 'babel-loader',
    options: {
      cacheDirectory: true,
      // The 'metro-react-native-babel-preset' preset is recommended to match React Native's packager
      presets: ['@react-native/babel-preset'],
      // Re-write paths to import only the modules needed by the app
      plugins: ['react-native-web']
    }
  }
};

// This is needed for webpack to import static images in JavaScript files.
const imageLoaderConfiguration = {
  test: /\.(gif|jpe?g|png|svg)$/,
  use: {
    loader: 'url-loader',
    options: {
      name: '[name].[ext]',
      esModule: false,
    }
  }
};

module.exports = {
  entry: [
    // load any web API polyfills
    // path.resolve(appDirectory, 'polyfills-web.js'),
    // your web-specific entry file
    path.resolve(appDirectory, 'index.web.js')
  ],

  // configures where the build ends up
  output: {
    filename: '[name].js',
    chunkFilename: '[name].js',
    path: path.resolve(appDirectory, 'dist'),
    // 构建前删除旧打包文件
    clean: true
  },

  optimization: {
    // Webpack运行时代码单独抽离到一个文件
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        commons: {
          chunks: 'initial',
          minChunks: 2,
          maxInitialRequests: 5,
          minSize: 0
        },
        vendor: {
          test: /node_modules/,
          chunks: 'initial',
          name: 'vendor',
          priority: 10,
          enforce: true
        }
      }
    },
    // 打包忽略LICENSE文件
    minimizer: [
      new TerserPlugin({ extractComments: false })
    ]
  },

  // ...the rest of your config

  module: {
    rules: [
      babelLoaderConfiguration,
      imageLoaderConfiguration,
      {
        test: /\.ttf$/,
        loader: 'url-loader',
        include: path.resolve(appDirectory, 'src/assets/fonts/iconfont.ttf')
      }
    ]
  },

  resolve: {
    // This will only alias the exact import "react-native"
    alias: {
      'react-native$': 'react-native-web',
      'react-native-linear-gradient': 'react-native-web-linear-gradient'
    },
    // If you're working on a multi-platform React Native app, web-specific
    // module implementations should be written in files using the extension
    // `.web.js`.
    extensions: ['.web.js', '.js', '.ts', '.tsx']
  },

  devServer: {
    proxy: [
      {
        context: ['/api'],
        target: 'https://movie.xlz122.cn/api',
        changeOrigin: true,
        pathRewrite: { '^/api': '' }
      }
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      // Uncaught ReferenceError: process is not defined
      process: { env: {} },
      // Uncaught ReferenceError: __DEV__ is not defined
      __DEV__: null
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(appDirectory, 'web/index.html'),
      filename: 'index.html',
      favicon: path.resolve(appDirectory, 'web/favicon.ico')
    }),
    new CompressionWebpackPlugin({
      filename: '[path][base].gz',
      algorithm: 'gzip',
      test: new RegExp('\\.(' + ['css', 'js', 'json'].join('|') + ')$'),
      // 对超过10k的数据进行压缩
      threshold: 10240,
      // 压缩比例(0 ~ 1)
      minRatio: 0.6
    })
  ]
}
