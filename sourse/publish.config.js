// 自动发布配置
module.exports = {
  modules: [
    {
      name: '测试环境box.51vj.cn:9443',
      env: 'test',
      ssh: {
        host: '192.168.0.131',
        port: 22,
        username: 'root',
        password: 'box123456',
      },
      ssh2shell: {
        idleTimeOut: 50000
      },
      nobuild: true,
      nobackup: true,
      localPath: 'dev',
      remotePath: `/app/vjftp/static/html/app/${process.env.INDEX}`,
      postCommands: ['\\cp -rf ./* ../'],
      tag: 'v1'
    },
  ],
};