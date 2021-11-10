'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg
  // static: {
  //   enable: true,
  // },
  nunjucks: {
    enable: true,
    package: 'egg-view-nunjucks',
  },

  sequelize: {
    enable: true,
    package: 'egg-sequelize'
  },
  validate:{
		package: "egg-validate"
	},
  uuid: {
		enable: true,
		package: 'uuid',
	},
  // mysql: {
  //   enable: true,
  //   package: 'egg-mysql',
  // },

  cors: {
    enable: true,
    package: 'egg-cors',
  }

};

