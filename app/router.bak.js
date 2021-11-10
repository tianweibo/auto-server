module.exports = app => {
  const { router, controller} = app;
  const path = require('path');
  //const Auth = app.middleware.auth()
  // 加载所有的校验规则
  const directory = path.join(app.config.baseDir, 'app/validate');
  app.loader.loadToApp(directory, 'validate');
  const { Auth} = require('./middleware/authClass')
  //if(app.config.env==='dev'){
    app.beforeStart(async ()=>{     //定义模型
      await app.model.sync({alter:true});
    })  
  //} 
  router.get('/', controller.home.index);
  router.post('/api/user/login',controller.user.login);//系统登录-done
  router.post('/api/photo/upload',controller.photo.upload);//头像上传
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
  //数据导入
  router.post("/api/event/importEvent", controller.event.importEvent);//批量导入事件-done
  //事件
  router.post('/api/event/listById',new Auth(1).check,controller.event.listById);// 通过ID获取事件的列表
  router.post('/api/event/list',new Auth(1).check,controller.event.list);// 事件列表的获取-done
  router.post('/api/event/create',new Auth(1).check,controller.event.create);//事件的创建-done
  router.get('/api/event/detail',new Auth(1).check,controller.event.detail);//事件详情的查看-done
  router.get('/api/event/archive',new Auth(1).check,controller.event.archive);//事件的归档-done
  router.delete('/api/event/delete',new Auth(1).check,controller.event.delete);//事件的删除-done
  router.post('/api/event/update',new Auth(1).check,controller.event.update);//事件的更新-done
  router.get('/api/event/indicByEventId',new Auth(1).check,controller.event.indicByEventId);//事件下的指标
  //属性
  router.post('/api/attribute/list',new Auth(1).check,controller.attribute.list);// 属性列表的获取
  router.post('/api/attribute/detail',new Auth(1).check,controller.attribute.detail);//属性详情的查看
  router.post('/api/attribute/eventList',new Auth(1).check,controller.attribute.eventList); //属性下的时间列表
  //应用
  router.post('/api/application/create',new Auth(1).check,controller.application.create);//应用的创建
  router.post('/api/application/exposeCreate',controller.application.exposeCreate);//对接互动营销分析平台-创建
  router.post('/api/application/exposeUpdate',controller.application.exposeUpdate);//对接互动营销分析平台-编辑
  router.delete('/api/application/exposeDelete',controller.application.exposeDelete);//对接互动营销分析平台-删除
  router.get('/api/application/exposeList',controller.application.exposeList);//对接互动营销分析平台-列表
  router.post('/api/application/update',new Auth(1).check,controller.application.update);//应用的编辑
  router.get('/api/application/detail',controller.application.detail);//应用详情的查看
  router.post('/api/application/detailByIndicator',new Auth(1).check,controller.application.detailByIndicator);//应用详情的查看-指标
  router.post('/api/application/detailByEvent',new Auth(1).check,controller.application.detailByEvent);//应用详情的查看-事件
  router.post('/api/application/list',new Auth(1).check,controller.application.list);// 应用列表的获取
  router.get('/api/application/useful',new Auth(1).check,controller.application.useful);//应用的启停与否
  router.get('/api/application/indicatorNum',new Auth(1).check,controller.application.indicatorNum);//应用下是否有指标
  router.delete('/api/application/delete',new Auth(1).check,controller.application.delete);//应用的删除
  //指标
  router.post('/api/indicator/listById',new Auth(1).check,controller.indicator.listById);// 通过ID获取指标的列表
  router.get('/api/indicator/eventCodesByIndic',controller.indicator.eventCodesByIndic);// 获取指标下对应的事件code
  router.post('/api/indicator/listByType',new Auth(1).check,controller.indicator.listByType);// 通过指标类型和一级指标获取指标的列表
  router.post('/api/indicator/list',new Auth(1).check,controller.indicator.list);// 指标列表的获取
  router.post('/api/indicator/create',new Auth(1).check,controller.indicator.create);//指标的创建
  router.get('/api/indicator/detail',new Auth(1).check,controller.indicator.detail);//指标详情的查看
  router.get('/api/indicator/archive',new Auth(1).check,controller.indicator.archive);//指标的归档
  router.delete('/api/indicator/delete',new Auth(1).check,controller.indicator.delete);//指标的删除
  router.post('/api/indicator/update',new Auth(1).check,controller.indicator.update);//指标的更新
  router.post("/api/indicator/importIndicator", new Auth(1).check,controller.indicator.importIndicator);//批量导入指标
  //公共数据的获取
  router.get('/api/basic/data',controller.basic.data);
  //标签
  router.post('/api/label/list',new Auth(10).check,controller.theLabel.list);// 标签的列表的获取
  router.post('/api/label/listTree',new Auth(1).check,controller.theLabel.listTree);// 标签的树获取
  router.post('/api/label/create',new Auth(10).check,controller.theLabel.create);//标签的创建
  router.delete('/api/label/delete',new Auth(10).check,controller.theLabel.delete);//标签的删除
  router.post('/api/label/update',new Auth(10).check,controller.theLabel.update);//标签的更新
  router.get('/api/label/labelType',controller.theLabel.labelType);//标签的类别获取
  router.get('/api/label/exposeLabel',controller.theLabel.exposeLabel);//小程序中标签的获取
  router.get('/api/label/findLabelId',controller.theLabel.findLabelId);//找父级ID
  //报表
  router.post('/api/report/list',new Auth(1).check,controller.report.list);// 报表的列表的获取
  router.post('/api/report/create',new Auth(1).check,controller.report.create);//报表的创建
  router.delete('/api/report/delete',new Auth(1).check,controller.report.delete);//报表的删除
  router.post('/api/report/update',new Auth(1).check,controller.report.update);//报表的更新
  router.post('/api/report/deleteTable',controller.report.deleteTable);//表单中三张表的删除
  router.get('/api/report/detail',controller.report.detail);//报表的详情获取
  router.get('/api/report/checkName',new Auth(1).check,controller.report.checkName);//报表的重名校验
  router.post('/api/report/seeReport',controller.report.seeReport);//报表的更新
  //辅助数据更新
  router.post('/api/auxiliary/repairData',controller.auxiliary.repairData);// 数据的创建人的修改
  router.get('/api/auxiliary/downData',controller.auxiliary.downData);// 数据的下载
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
