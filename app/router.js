module.exports = app => {
  const { router, controller} = app;
  const path = require('path');
  //const Auth = app.middleware.auth()
  // 加载所有的校验规则
  const directory = path.join(app.config.baseDir, 'app/validate');
  app.loader.loadToApp(directory, 'validate');
  const { Auth} = require('./middleware/authClass')
  /* if(app.config.env==='dev'){
    app.beforeStart(async ()=>{     //定义模型
      await app.model.sync({alter:true});
    })  
  }  */
  router.get('/', controller.home.index);
  router.post('/api/user/login',controller.user.login);//系统登录-done
  router.post('/api/user/editPassword',new Auth(1).check,controller.user.editPassword);//密码修改
  router.post('/api/user/create',new Auth(10).check,controller.user.create);//创建用户
  router.get('/api/user/useful',new Auth(10).check,controller.user.useful);//用户禁用与否
  router.get('/api/user/resetPassword',new Auth(10).check,controller.user.resetPassword);//用户禁用与否
  router.post('/api/user/update',new Auth(10).check,controller.user.update);//编辑用户
  router.get('/api/user/detail',new Auth(10).check,controller.user.detail);//用户详情
  router.delete('/api/user/delete',new Auth(10).check,controller.user.delete);//用户删除
  router.post('/api/user/list',new Auth(10).check,controller.user.list);// 用户列表获取-done   new Auth(1).check
  router.get('/api/user/loginOut',controller.user.loginOut);// 用户退出-done
  router.get('/api/user/isLogin',controller.user.isLogin);// 是否登录
  router.post('/api/user/dataGift',controller.user.dataGift);// 数据赠予-done
 
  router.get('/api/basic/data',controller.basic.data);

  // 产品线
  router.post('/api/productLine/list',controller.productLine.list);// 产品线列表的获取
  router.get('/api/productLine/useful',new Auth(10).check,controller.productLine.useful);//产品线禁用与否
  router.post('/api/productLine/update',new Auth(10).check,controller.productLine.update);//编辑产品线数据
  router.post('/api/productLine/create',new Auth(10).check,controller.productLine.create);//创建产品线数据
  router.get('/api/productLine/delete',new Auth(10).check,controller.productLine.delete);//产品线删除
  router.get('/api/productLine/detail',new Auth(10).check,controller.productLine.detail);//产品线详情
  router.get('/api/productLine/listAll',controller.productLine.listAll);//产品线列表-all
  router.get('/api/productLine/userListPro',new Auth(10).check,controller.productLine.userListPro);//产品线列表-all
};
