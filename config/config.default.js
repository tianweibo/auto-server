/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};
  config.middleware = ['error'];
  config.error = {
    // 这里使用appInfo.env来判断环境，仅仅在非生产环境下打开堆栈信息，用于调试
    postFormat: (e, { stack, ...rest}) => appInfo.env === 'prod' ? rest: { stack, ...rest}
	}

  config.sequelize = {
    dialect: 'mysql', // support: mysql, mariadb, postgres, mssql
    database: 'buried_points_server',
    host: '116.198.161.239',
    port: 30001,
    username: 'prod',
    password: 'prodENbsaRq1523y1b1',
    delegate: 'model',
    baseDir: 'model',
    timezone: '+08:00', // 保存为本地时区
    define: {
      // raw: true,
      underscored: true,
      freezeTableName: true, //直接查找设置的表名，默认是表名加s或者es
      timestamps: false,
      createdAt: "CreatedAt",  //自定义时间戳
      updatedAt: "UpdatedAt", // 自定义时间戳
      timezone: '+08:00' // 保存为本地时区
    }
  };
  config.jwt={
    cert: 'twb' // jwt秘钥
  };
  // config.mysql = {
  //   // 单数据库信息配置
  //   client: {
  //     // host
  //     host: '127.0.0.1',
  //     // 端口号
  //     port: '3306',
  //     // 用户名
  //     user: 'root',
  //     // 密码
  //     password: 'root',
  //     // 数据库名
  //     database: 'buried_points_server',
  //   },
  //   // 是否加载到 app 上，默认开启
  //   app: true,
  //   // 是否加载到 agent 上，默认关闭
  //   agent: false,
  // };

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1612864597616_9798';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  config.security= {
    csrf: {
      headerName: 'x-csrf-token',// 自定义请求头
      enable: false,
      ignoreJSON: true
    },
    domainWhiteList: ['*']
 }
 config.multipart = {
  fileSize: "4gb",
  mode: 'file', // 文件模式
  whitelist: ['.xlsx','.xlsm'], // 文件类型白名单
  fileExtensions: [
    ".csv",
    ".zip",
    ".geojson",
    ".json",
    ".mbtiles",
    ".ttf",
    ".otf",
    ".xlsx",
    '.xlsm'
  ]
}
const baseDir = "data/import"
  config.dataPath = {
    Event: baseDir + "/Event",
    //Dw: baseDir + "/Dw",
    //Cd: baseDir + "/Cd"
  }
  // 添加 view 配置
  config.view = {
    defaultViewEngine: 'nunjucks',
    mapping: {
      '.tpl': 'nunjucks',
    },
  };

  config.cors = {
    origin:'*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH'
  };

  return {
    ...config,
    ...userConfig,
  };
};

