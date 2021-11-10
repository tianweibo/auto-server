'use strict';

exports.sequelize = {
  dialect: 'mysql', // support: mysql, mariadb, postgres, mssql
  database: 'buried_points_server',
  host: 'rm-k2jq4d1297g80t326.mysql.zhangbei.rds.aliyuncs.com',
  port: 3306,
  username: 'prod',
  password: 'Prodc959ed5e61ce4451803Enbrands',
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