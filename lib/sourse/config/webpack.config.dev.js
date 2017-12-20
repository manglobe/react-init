let glob = require('glob');
let path = require('path');
let paths = require('./paths');
let webpack = require('webpack');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin');

let filepath = glob.sync(path.resolve(__dirname, '../*.html'))[0];
let files = filepath.split('/');
let name = '{#title#}';
let isapp = {#isapp#};

process.env.INDEX = name;
process.env.ISAPP = isapp;

// webpack插件
let webpackPlugins = [
  // 开发者模式
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': '"development"',
    'process.env.SERVICE_URL': JSON.stringify(process.env.DEV_MODULE ? paths.appRajax : paths.appDajax),
    'process.env.IMG_PATH': JSON.stringify(process.env.DEV_MODULE ? paths.appRimgPath : ''),
    'process.env.AUDIO_PATH': JSON.stringify(process.env.DEV_MODULE ? paths.appRaudioPath : ''),
  }),
  new HtmlWebpackPlugin({
    filename: name + '/index.html',
    // 每个html的模版，这里多个页面使用同一个模版
    template: paths.tempHtml,
    // 自动将引用插入html
    inject: true,
    chunks: [name]
  }),
  // webpack热加载模块
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NamedModulesPlugin(),
  // 跳过编译时出错的代码
  new webpack.NoEmitOnErrorsPlugin(),
  // 确保新引入包时强制重新编译项目
  new WatchMissingNodeModulesPlugin(paths.appNodeModules),
  // new webpack.optimize.ModuleConcatenationPlugin(),
];

const svgDirs = [
  require.resolve('antd-mobile').replace(/warn\.js$/, ''), // 1. 属于 antd-mobile 内置 svg 文件
  // path.resolve(__dirname, '../static/images'),  // 2. 自己私人的 svg 存放目录
];

module.exports = {
  resolve: {
    alias: {
      STATIC: path.resolve(__dirname, '../static'),
      CONFIG: path.resolve(__dirname, '../src/config'),
      ACTIONS: path.resolve(__dirname, '../src/actions'),
      REDUCERS: path.resolve(__dirname, '../src/reducers'),
      IMG: path.resolve(__dirname, '../static/images'),
      COMMON: path.resolve(__dirname, '../src/views/common'),
    },
    modules: [
      'node_modules'
    ],
    mainFiles: ['index.web', 'index'],
    extensions: [
      '.web.tsx', '.web.ts', '.web.jsx', '.web.js', '.ts', '.tsx',
      '.js',
      '.jsx',
      '.react.js',
    ],
    mainFields: [
      'browser',
      'jsnext:main',
      'main',
    ],
  },
  entry: {
    [name]: [
      'react-hot-loader/patch',
      `webpack-dev-server/client?http://${paths.defaultHost}:${paths.defaultPort}/`,
      'webpack/hot/only-dev-server',
      path.resolve(__dirname, '../src/index.dev.js')
    ]
  },
  output: {
    path: paths.appBuild,
    filename: 'js/[name].js'
  },
  devtool: 'eval',
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader?cacheDirectory'],
        // 只命中src目录里的js文件，加快webpack搜索速度
        exclude: paths.nodeModules
      }, {
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              // 使用CSS Modules
              modules: true,
              localIdentName: '[local]-[hash:base64:6]-[hash:base32:4]',
              sourceMap: true
            }
          }, {
            loader: 'postcss-loader',
            options: {
              plugins: function () {
                return [
                  require('precss'),
                  require('autoprefixer'),
                ];
              }
            }
          },
          'sass-loader',
        ]
      }, {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              // 使用CSS Modules
              modules: true,
              localIdentName: '[local]-[hash:base64:6]-[hash:base32:4]',
              sourceMap: true
            }
          }, {
            loader: 'postcss-loader',
            options: {
              plugins: function () {
                return [
                  require('precss'),
                  require('autoprefixer'),
                ];
              }
            }
          }
        ],
        // 剔除node_modules、static文件夹
        exclude: [paths.nodeModules, paths.static]
      }, {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          }, {
            loader: 'postcss-loader',
            options: {
              plugins: function () {
                return [
                  require('precss'),
                  require('autoprefixer')
                ];
              }
            }
          }
        ],
        // 对node_modules、lib、static文件夹内的css使用普通编译
        include: [paths.nodeModules, paths.static]
      }, {
        test: /\.(png|jpg|gif|woff|woff2|ttf|eot)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1,
            }
          }
        ],
        // 对node_modules、lib、static文件夹内的css使用普通编译
        include: [paths.nodeModules],
      }, {
        test: /\.(png|jpg|gif|woff|woff2|ttf|eot)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 1,
          }
        }],
        // 只命中src目录里的文件，加快webpack搜索速度
        include: [paths.appSrc, paths.static]
      }, {
        test: /\.(svg)$/i,
        loader: 'svg-sprite-loader',
        include: svgDirs, // 把 svgDirs 路径下的所有 svg 文件交给 svg-sprite-loader 插件处理
      }, {
        test: /\.(svg)$/i,
        loader: 'raw-loader',
        include: [paths.appSrc, paths.static], // 把 svgDirs 路径下的所有 svg 文件交给 svg-sprite-loader 插件处理
      }]
  },
  plugins: webpackPlugins,

};