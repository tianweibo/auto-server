module.exports = app => {
  const { router, controller} = app;
  const path = require('path');
  //const Auth = app.middleware.auth()
  // 加载所有的校验规则
  const directory = path.join(app.config.baseDir, 'app/validate');
  app.loader.loadToApp(directory, 'validate');
  const { Auth} = require('./middleware/authClass')
  if(app.config.env==='dev'){  
   /*  app.beforeStart(async ()=>{     //定义模型
      await app.model.sync({alter:true});
    }) */ 
  } 
  router.get('/', controller.home.index);
  router.post('/user/login',controller.user.login);//系统登录-done
  router.post('/photo/upload',controller.photo.upload);//头像上传
  router.post('/user/editPassword',new Auth(1).check,controller.user.editPassword);//密码修改
  router.post('/user/create',new Auth(10).check,controller.user.create);//创建用户
  router.get('/user/useful',new Auth(10).check,controller.user.useful);//用户禁用与否
  router.get('/user/resetPassword',new Auth(10).check,controller.user.resetPassword);//用户禁用与否
  router.post('/user/update',new Auth(10).check,controller.user.update);//编辑用户
  router.get('/user/detail',new Auth(10).check,controller.user.detail);//用户详情
  router.delete('/user/delete',new Auth(10).check,controller.user.delete);//用户删除
  router.post('/user/list',new Auth(10).check,controller.user.list);// 用户列表获取-done   new Auth(1).check
  router.get('/user/loginOut',controller.user.loginOut);// 用户退出-done
  router.get('/user/isLogin',controller.user.isLogin);// 是否登录
  router.post('/user/dataGift',controller.user.dataGift);// 数据赠予-done
  //数据导入
  router.post("/event/importEvent", controller.event.importEvent);//批量导入事件-done
  //事件
  router.post('/event/listById',new Auth(1).check,controller.event.listById);// 通过ID获取事件的列表
  router.post('/event/list',new Auth(1).check,controller.event.list);// 事件列表的获取-done
  router.post('/event/create',new Auth(1).check,controller.event.create);//事件的创建-done
  router.get('/event/detail',new Auth(1).check,controller.event.detail);//事件详情的查看-done
  router.get('/event/archive',new Auth(1).check,controller.event.archive);//事件的归档-done
  router.delete('/event/delete',new Auth(1).check,controller.event.delete);//事件的删除-done
  router.post('/event/update',new Auth(1).check,controller.event.update);//事件的更新-done
  router.get('/event/indicByEventId',new Auth(1).check,controller.event.indicByEventId);//事件下的指标
  //属性
  router.post('/attribute/list',new Auth(1).check,controller.attribute.list);// 属性列表的获取
  router.post('/attribute/detail',new Auth(1).check,controller.attribute.detail);//属性详情的查看
  router.post('/attribute/eventList',new Auth(1).check,controller.attribute.eventList); //属性下的时间列表
  //应用
  router.post('/application/create',new Auth(1).check,controller.application.create);//应用的创建
  router.post('/application/exposeCreate',controller.application.exposeCreate);//对接互动营销分析平台-创建
  router.post('/application/exposeUpdate',controller.application.exposeUpdate);//对接互动营销分析平台-编辑
  router.delete('/application/exposeDelete',controller.application.exposeDelete);//对接互动营销分析平台-删除
  router.get('/application/exposeList',controller.application.exposeList);//对接互动营销分析平台-列表
  router.post('/application/update',new Auth(1).check,controller.application.update);//应用的编辑
  router.get('/application/detail',controller.application.detail);//应用详情的查看
  router.post('/application/detailByIndicator',new Auth(1).check,controller.application.detailByIndicator);//应用详情的查看-指标
  router.post('/application/detailByEvent',new Auth(1).check,controller.application.detailByEvent);//应用详情的查看-事件
  router.post('/application/list',new Auth(1).check,controller.application.list);// 应用列表的获取
  router.get('/application/useful',new Auth(1).check,controller.application.useful);//应用的启停与否
  router.get('/application/indicatorNum',new Auth(1).check,controller.application.indicatorNum);//应用下是否有指标
  router.delete('/application/delete',new Auth(1).check,controller.application.delete);//应用的删除
  //指标
  router.post('/indicator/listById',new Auth(1).check,controller.indicator.listById);// 通过ID获取指标的列表
  router.get('/indicator/eventCodesByIndic',controller.indicator.eventCodesByIndic);// 获取指标下对应的事件code
  router.post('/indicator/listByType',new Auth(1).check,controller.indicator.listByType);// 通过指标类型和一级指标获取指标的列表
  router.post('/indicator/list',new Auth(1).check,controller.indicator.list);// 指标列表的获取
  router.post('/indicator/create',new Auth(1).check,controller.indicator.create);//指标的创建
  router.get('/indicator/detail',new Auth(1).check,controller.indicator.detail);//指标详情的查看
  router.get('/indicator/archive',new Auth(1).check,controller.indicator.archive);//指标的归档
  router.delete('/indicator/delete',new Auth(1).check,controller.indicator.delete);//指标的删除
  router.post('/indicator/update',new Auth(1).check,controller.indicator.update);//指标的更新
  router.post("/indicator/importIndicator", new Auth(1).check,controller.indicator.importIndicator);//批量导入指标
  //公共数据的获取
  router.get('/basic/data',controller.basic.data);
  //标签
  router.post('/label/list',new Auth(10).check,controller.theLabel.list);// 标签的列表的获取
  router.post('/label/listTree',new Auth(1).check,controller.theLabel.listTree);// 标签的树获取
  router.post('/label/create',new Auth(10).check,controller.theLabel.create);//标签的创建
  router.delete('/label/delete',new Auth(10).check,controller.theLabel.delete);//标签的删除
  router.post('/label/update',new Auth(10).check,controller.theLabel.update);//标签的更新
  router.get('/label/labelType',controller.theLabel.labelType);//标签的类别获取
  router.get('/label/exposeLabel',controller.theLabel.exposeLabel);//小程序中标签的获取
  router.get('/label/findLabelId',controller.theLabel.findLabelId);//找父级ID
  //报表
  router.post('/report/list',new Auth(1).check,controller.report.list);// 报表的列表的获取
  router.post('/report/create',new Auth(1).check,controller.report.create);//报表的创建
  router.delete('/report/delete',new Auth(1).check,controller.report.delete);//报表的删除
  router.post('/report/update',new Auth(1).check,controller.report.update);//报表的更新
  router.post('/report/deleteTable',controller.report.deleteTable);//表单中三张表的删除
  router.get('/report/detail',controller.report.detail);//报表的详情获取
  router.get('/report/checkName',new Auth(1).check,controller.report.checkName);//报表的重名校验
  router.post('/report/seeReport',controller.report.seeReport);//报表的更新
  //辅助数据更新
  router.post('/auxiliary/repairData',controller.auxiliary.repairData);// 数据的创建人的修改
  router.get('/auxiliary/downData',controller.auxiliary.downData);// 数据的下载
  // 产品线
  router.post('/productLine/list',controller.productLine.list);// 产品线列表的获取
  router.get('/productLine/useful',new Auth(10).check,controller.productLine.useful);//产品线禁用与否
  router.post('/productLine/update',new Auth(10).check,controller.productLine.update);//编辑产品线数据
  router.post('/productLine/create',new Auth(10).check,controller.productLine.create);//创建产品线数据
  router.get('/productLine/delete',new Auth(10).check,controller.productLine.delete);//产品线删除
  router.get('/productLine/detail',new Auth(10).check,controller.productLine.detail);//产品线详情
  router.get('/productLine/listAll',controller.productLine.listAll);//产品线列表-all
  router.get('/productLine/userListPro',new Auth(10).check,controller.productLine.userListPro);//产品线列表-all
};
