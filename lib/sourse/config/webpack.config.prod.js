process.env.NODE_ENV = 'production';
let glob              = require('glob');
let path              = require('path');
let paths             = require('./paths');
let webpack           = require('webpack');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let ExtractTextPlugin = require('extract-text-webpack-plugin');
const WebpackMonitor = require('webpack-monitor');


let filepath = glob.sync(path.resolve(__dirname, '../*.html'))[0];
let files = filepath.split('/');
let name = files[files.length - 2].split('-')[0].toLowerCase();
let projectType = files[files.length - 2].split('-')[1].toLowerCase();

process.env.INDEX = name;
process.env.ISAPP = (projectType === 'app');

const newDate = new Date();
const dateString = newDate.toLocaleString().replace(/\D/g, '');
// webpack插件
let webpackPlugins = [
  // 生产者模式
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': '"production"',
    'process.env.SERVICE_URL': JSON.stringify(process.env.BUILD_MODULE ? paths.appAjax : paths.appRajax),
    'process.env.IMG_PATH': JSON.stringify(process.env.BUILD_MODULE ? paths.appImgPath : paths.appRimgPath),
    'process.env.AUDIO_PATH': JSON.stringify(process.env.BUILD_MODULE ? paths.appAudioPath : paths.appRaudioPath)
  }),
  // 打包公共模块
  new webpack.optimize.CommonsChunkPlugin({
    names: ['a'],
    filename: process.env.BUILD_MODULE ? `js/meeting-app-common.${dateString}.js` : `js/meeting-app-common.js`,
    // 确保公共包内的模块是指定的模块（后续模块越来越多，也不会被自动编译进去）
    minChunks: Infinity
  }),
  // 公共js持久化缓存
  new webpack.HashedModuleIdsPlugin(),
  // css文件
  new ExtractTextPlugin({
    filename: process.env.BUILD_MODULE ? 'css/a-[name].[contenthash:6].css' : 'css/a-[name].css',
  }),
  new HtmlWebpackPlugin({
    filename: name + '.html',
    // 每个html的模版，这里多个页面使用同一个模版
    template: path.resolve(__dirname, '../index.html'),
    // 自动将引用插入html
    inject: true,
    chunks: ['a', name],
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeRedundantAttributes: true,
      useShortDoctype: true,
      removeEmptyAttributes: true,
      removeStyleLinkTypeAttributes: true,
      keepClosingSlash: true,
      minifyJS: true,
      minifyCSS: true,
      minifyURLs: true
    }
  }),
  // 压缩js
  new webpack.optimize.UglifyJsPlugin({
    // 最紧凑的输出
    beautify: false,
    compress: {
      screw_ie8: true,
      // 在UglifyJs删除没有用到的代码时不输出警告
      warnings: false,
      // 删除所有的 `console` 语句
      drop_console: false,
      // 内嵌定义了但是只用到一次的变量
      collapse_vars: true,
      // 提取出出现多次但是没有定义成变量去引用的静态值
      reduce_vars: true
    },
    mangle: {
      screw_ie8: true
    },
    output: {
      comments: false,
      screw_ie8: true
    }
  }),
  // 除去多余的包
  // new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
  // 把 loader 设置为 minimizing
  new webpack.LoaderOptionsPlugin({
    minimize: true,
    debug: false
  }),
  // new WebpackMonitor({
  //   jsonOpts: { source: false, chunkModules: true },
  //   capture: true, // -> default 'true'
  //   launch: true, // -> default 'false'
  //   port: 6060, // default -> 8081
  // }),
];

const svgDirs = [
  require.resolve('antd-mobile').replace(/warn\.js$/, ''),  // 1. 属于 antd-mobile 内置 svg 文件
  // path.resolve(__dirname, 'static/images'),  // 2. 自己私人的 svg 存放目录
];

module.exports = {
  resolve: {
    alias: {
      // react: 'preact-compat',
      // 'react-dom': 'preact-compat',
      STATIC: path.resolve(__dirname, '../static'),
      CONFIG: path.resolve(__dirname, '../src/config'),
      ACTIONS: path.resolve(__dirname, '../src/actions'),
      REDUCERS: path.resolve(__dirname, '../src/reducers'),
      IMG: path.resolve(__dirname, '../static/images'),
      COMMON: path.resolve(__dirname, '../src/views/common'),
    },
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
  bail: true,
  entry: {
    a: [
      'react',                     // 2017-06-21 8.1.0
      'react-dom',              // 2017-06-21 3.16.0
      'react-lazy-load',            // 2017-06-21 3.0.11
      'react-redux',                // 2017-06-21 5.0.3
      'react-router-dom',           // 2017-06-21 4.1.1
      'redux',                      // 2017-06-21 3.6.0
      'redux-thunk',                // 2017-06-21 2.2.0
      'axios',                      // 2017-06-21 0.15.2
      'classnames',                 // 2015-06-21 2.2.5
      'react-notify-toast',         // 2015-06-21 0.1.5
      'babel-polyfill',             // 2015-06-21 4.0.5
    ],
    [name]: path.resolve(__dirname, '../src/index.prod.js')
  },
  output: {
    path: process.env.BUILD_MODULE ? paths.appBuild : paths.appRelease,
    publicPath: (process.env.BUILD_MODULE ?
      paths.appPublic :
      process.env.DEV_TEST ?
        paths.appTpublic :
        paths.appRpublic
    ),
    filename: process.env.BUILD_MODULE ? 'js/a-[name].[chunkhash:6].js' : 'js/a-[name].js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader'],
        exclude: paths.nodeModules
      }, {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract([
          {
            loader: 'css-loader',
            options: {
              // 使用CSS Modules
              modules: true,
              localIdentName: 'vj-[hash:10]',
              sourceMap: false
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
        ]),
        exclude: [paths.nodeModules, paths.static]
      }, {
        test: /\.css$/,
        use: ExtractTextPlugin.extract([
          {
            loader: 'css-loader',
            options: {
              // 使用CSS Modules
              modules: true,
              localIdentName: 'vj-[hash:10]',
              // 最小化CSS
              minimize: true
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
        ]),
        exclude: [paths.nodeModules, paths.static]
      }, {
        test: /\.css$/,
        use: ExtractTextPlugin.extract([
          {
            loader: 'css-loader',
            options: {
              // 最小化CSS
              minimize: {
                discardComments: {
                  removeAll: true
                }
              }
            }
          }, {
            loader: 'postcss-loader',
            options: {
              plugins: function () {
                return [
                  require('precss'),
                  require('autoprefixer')({ browsers: ['> 1%', 'ie 9'] }),
                ];
              }
            }
          }
        ]),
        // 对node_modules、lib、static文件夹内的css使用普通编译
        include: [paths.nodeModules, paths.static]
      }, {
        test: /^.*?emoji.*?\.(png|jpe?g|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1024,
              name: 'media/a_[name].[ext]'
            }
          },
        ],
        exclude: paths.nodeModules
      }, {
        test: /^((?!.*?emoji).)*\.(png|jpe?g|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1024,
              name: 'media/a_[name].[ext]'
            }
          }, {
            loader: 'image-webpack-loader',
            query: {
              progressive: true,
              optimizationLevel: 7,
              interlaced: false,
              pngquant: {
                quality: '65-90',
                speed: 4
              },
              mozjpeg: {
                quality: 65
              }
            }
          }
        ],
        exclude: paths.nodeModules
      }, {
        test: /\.(woff|woff2|ttf|eot)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 30000,
              name: `media/a_[name].${dateString}.[ext]`
            }
          }
        ],
        exclude: paths.nodeModules
      }, {
        test: /\.(svg)$/i,
        loader: 'svg-sprite-loader',
        include: svgDirs,  // 把 svgDirs 路径下的所有 svg 文件交给 svg-sprite-loader 插件处理
      }, {
        test: /\.(svg)$/i,
        loader: 'raw-loader',
        include: [paths.appSrc, paths.static],  // 把 svgDirs 路径下的所有 svg 文件交给 svg-sprite-loader 插件处理
      },
    ]
  },
  plugins: webpackPlugins,
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    pako: 'empty',
    // Buffer: false,
    // __dirname: false,
    // __filename: false,
    // process: false
  }
};
