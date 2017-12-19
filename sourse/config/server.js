/* jshint esversion: 6 */
process.env.NODE_ENV = 'development';
let paths                 = require('./paths');
let chalk                 = require('chalk');
let config                = require('./webpack.config.dev');
let detect                = require('detect-port');
let prompt                = require('react-dev-utils/prompt');
let webpack               = require('webpack');
let openBrowser           = require('react-dev-utils/openBrowser');
let clearConsole          = require('react-dev-utils/clearConsole');
let WebpackDevServer      = require('webpack-dev-server');
let getProcessForPort     = require('react-dev-utils/getProcessForPort');
let formatWebpackMessages = require('react-dev-utils/formatWebpackMessages');
// 判断是否在终端环境中执行
let isInteractive         = process.stdout.isTTY;
let DEFAULT_PORT          = paths.defaultPort;
let DEFAULT_HOST          = paths.defaultHost;
let compiler              = webpack(config);

compiler.plugin('done', function (stats) {
  let messages     = formatWebpackMessages(stats.toJson({}, true));
  let isSuccessful = !messages.errors.length && !messages.warnings.length;
  // 终端运行
  if (isInteractive) {
    clearConsole();
  }
  // 成功
  if (isSuccessful) {
    console.log(chalk.green('编译成功，监听中…'));
  }
  // 错误异常
  if (messages.errors.length) {
    console.log(chalk.red('编译失败！'));
    messages.errors.forEach(msg => {
      console.log(msg);
    });
    return;
  }
  // 警告异常
  if (messages.warnings.length) {
    console.log(chalk.yellow('警告！'));
    messages.warnings.forEach(msg => {
      console.log(msg);
    });
    return;
  }
});

function runDevServer(host, port) {
  config.output.publicPath = `http://${host}:${port}/`;
  let name = process.env.INDEX;
  let reg = new RegExp(`^\/app\/${name}`);
  let devServer = new WebpackDevServer(compiler, {
    compress: false, // 使用gzip压缩
    hot: true,
    noInfo: true,
    publicPath: config.output.publicPath,
    clientLogLevel: 'error', // 在浏览器中显示终端的日志消息
    stats: { colors: true, chunks: false, errorDetails: true, warnings: true },
    historyApiFallback: {
      rewrites: [
        { from: reg, to: `/${name}` },
      ]
    },
    disableHostCheck: true,
    proxy: {
      '/api': {
        target: paths.proxyTarget,
        pathRewrite: { '^/api': '' }
      }
    }
  });
  // 启动devServer
  devServer.listen(port, (err, result) => {
    if (err) {
      return console.log(err);
    }
    if (isInteractive) {
      console.log(chalk.cyan('正在启动本地服务…'));
      openBrowser(`http://${host}:${port}/app/${process.env.INDEX}`);
    }
  });
}

function run(port) {
  // 设置host
  let host = DEFAULT_HOST || 'localhost';
  // 启动服务
  runDevServer(host, port);
}

// 启动端口检测程序
detect(DEFAULT_PORT).then(port => {
  // 端口未被占用
  if (port === DEFAULT_PORT) {
    run(port);
  // 端口已被占用
  } else {
    // 如果在终端环境中执行
    if (isInteractive) {
      // 返回被占用端口上正在运行的进程
      let existingProcess = getProcessForPort(DEFAULT_PORT);
      let msg             = chalk.yellow(`端口：${DEFAULT_PORT}已被"${existingProcess ? existingProcess : ''}"占用。\n\n是否用端口${port}代替？`);
      // 清空终端
      clearConsole();
      // 打印并显示输入端口号操作
      prompt(msg, true).then(shouldChangePort => {
        if (shouldChangePort) {
          run(port);
        }
      });
    } else {
      console.log(chalk.red(`端口${DEFAULT_PORT}已被占用.`));
    }
  }
}).catch(err => {
  console.log(err);
});
