let path = require('path');

module.exports = {
  defaultHost: 'localhost',
  defaultPort: 8980,
  appDajax: '/api/', // 本地调试
  appTpublic: 'http://localhost:9443/', // 本地测试打包文件路径

  appRajax: 'https://boxm.51vj.cn:9443/', // 数据联调ajax路径
  appRpublic: 'https://box.51vj.cn:9443/html/app/', // 数据联调文件路径

  appAjax: 'https://m.51vj.cn/', // 正式上线ajax路径             //TODO
  appPublic: 'https://rsc.51vj.cn/', // 正式上线文件路径

  appRimgPath: 'https://vjfiledev.oss-cn-shanghai.aliyuncs.com/',       // 联调图片路径
  appImgPath: 'https://img2.51vj.cn/',            // 上线图片路径

  // appRaudioPath: 'https://boximg.51vj.cn:9443/',
  appRaudioPath: 'http://vjtest.oss-cn-shanghai.aliyuncs.com/',
  appAudioPath: 'https://media.51vj.cn/',

  static: path.resolve(__dirname, '../static'),
  thirdPlugin: path.resolve(__dirname, '../static/style/thirdPlugin'),
  appBuild: path.resolve(__dirname, '../dist'),
  appRelease: path.resolve(__dirname, '../dev'),
  tempHtml: path.resolve(__dirname, '../index.html'),
  nodeModules: path.resolve(__dirname, '../node_modules'),
  appSrc: path.resolve(__dirname, '../src'),
  proxyTarget: 'http://localhost:8981'
};
