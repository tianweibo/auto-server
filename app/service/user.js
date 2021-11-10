'use strict';

const Service = require('egg').Service;
const jwt=require('jsonwebtoken')
const sd = require('silly-datetime');
class User extends Service {
  constructor(ctx){
	  super(ctx);
	  this.TheUser=ctx.model.User;
	  this.Event = ctx.model.Event;
	  this.Indicator = ctx.model.Indicator;
	  this.Application = ctx.model.Application;
	  this.Report= ctx.model.Report;
	  this.ResponseCode = ctx.response.ResponseCode;
	  this.ServerResponse = ctx.response.ServerResponse;
  }
  async dataGift(data){
	try{
		const userObj=await this.TheUser.findOne({
			where:{
				username:data.newUsername //data.oldUsername
			}
		})

		if(userObj){
			if(userObj.dataValues.product_line_id!=data.oldProduct){
				return this.ServerResponse.networkError('非同一产品线不能互赠数据');
			}
			//this.Event   查看老用户名下的所有事件都有哪些，查出id,用ID更新创建人
			var arrEvent=[]  //可封装公共方法-优化记得
			arrEvent = await this.Event.findAll({
				where:{
					create_people:data.oldUsername 
				},
				attributes: ['event_id']
			})
			var arrIndicator=[]
			arrIndicator = await this.Indicator.findAll({
				where:{
					create_people:data.oldUsername 
				},
				attributes: ['indicator_id']
			})
			var arrApplication=[];
			arrApplication = await this.Application.findAll({
				where:{
					create_people:data.oldUsername 
				},
				attributes: ['application_id']
			})	
			var arrReport=[];
			arrReport = await this.Report.findAll({
				where:{
					create_people:data.oldUsername 
				},
				attributes: ['report_id']
			})	

			if(arrEvent.length==0 && arrIndicator.length==0 && arrApplication.length==0 && arrReport.length==0){
				return this.ServerResponse.createBySuccessMsg(`[${data.oldUsername}]名下没有数据`);
			}
			if(arrEvent.length.length!=0){
				var updateEvent=[]
				for(let i=0;i<arrEvent.length;i++){
					let obj={
						event_id:arrEvent[i].event_id,
						create_people:data.newUsername
					}
					updateEvent.push(obj)
				}
				await this.Event.bulkCreate(updateEvent,{ updateOnDuplicate: ['create_people'] })
			}
			if(arrIndicator.length!=0){
				var updateIndicator=[]
				for(let i=0;i<arrIndicator.length;i++){
					let obj={
						indicator_id:arrIndicator[i].indicator_id,
						create_people:data.newUsername
					}
					updateIndicator.push(obj)
				}
				await this.Indicator.bulkCreate(updateIndicator,{ updateOnDuplicate: ['create_people'] })
			}

			if(arrApplication.length!=0){
				var updateApplication=[]
				for(let i=0;i<arrApplication.length;i++){
					let obj={
						application_id:arrApplication[i].application_id,
						create_people:data.newUsername
					}
					updateApplication.push(obj)
				}
				await this.Application.bulkCreate(updateApplication,{ updateOnDuplicate: ['create_people'] })
			}

			if(arrReport.length!=0){
				var updateReport=[];
				for(let i=0;i<arrReport.length;i++){
					let obj={
						report_id:arrReport[i].report_id,
						create_people:data.newUsername
					}
					updateReport.push(obj)
				}
				await this.Report.bulkCreate(updateReport,{ updateOnDuplicate: ['create_people'] })
			}
			return this.ServerResponse.createBySuccessMsg('数据赠予成功');
		}else{
			return this.ServerResponse.networkError('用户不存在');
		} 
	}catch(e){
		console.log(e)
		return this.ServerResponse.networkError('网络问题');
	}
  }
  async login(userInfo){
	const hasUser=await this.TheUser.findOne({
		where:{
			username:userInfo.username,
			status:1
		}
	})
	if(hasUser==null){
		return this.ServerResponse.createByErrorMsg('账号不存在');
	}
	if(hasUser.dataValues.user_use==0){
		return this.ServerResponse.createByErrorMsg('账号禁用,联系管理员');
	}
	const verify = await hasUser.validPassword(userInfo.password);
	if (!verify) {
		return this.ServerResponse.createByErrorCodeMsg('密码错误');
	}
	const token=jwt.sign({
		id:hasUser.dataValues.id,
		scope:hasUser.role
	},this.app.config.jwt.cert,{
		expiresIn:60*60*2
	})
	//await this.app.redis.set('userid', hasUser.dataValues.id);
	this.ctx.session.userid=hasUser.dataValues.id
	this.ctx.session.username=hasUser.dataValues.username;
	this.ctx.session.role=hasUser.dataValues.role;
	this.ctx.session.productid=hasUser.dataValues.product_line_id;
	this.ctx.session.productname=hasUser.dataValues.product_line_name;
	var info={
		data:hasUser.dataValues,
		token:token,
	}
	return this.ServerResponse.createBySuccessMsgAndData('登录成功',info)
  }
  async loginOut(){
	// const theid=await this.app.redis.del('userid')
	this.ctx.session.userid=null;
	this.ctx.session.username=null;
	this.ctx.session.role=null;
	this.ctx.session.productid=null;
	this.ctx.session.productname=null;
	return this.ServerResponse.createBySuccessMsg('退出成功')
  }
  async isLogin(){
	try {
		var decode = jwt.verify(this.ctx.get('Authorization'), this.ctx.app.config.jwt.cert)
	} catch (error) {
		if (error.name == 'TokenExpiredError'){
			return this.ServerResponse.requireData('token过期',{code:1});
		}
		return this.ServerResponse.requireData('授权失败，重新登陆',{code:1});
	}
	if(this.ctx.session.userid){
		const userObj=await this.TheUser.findOne({
			where:{
				id:this.ctx.session.userid
			}
		})
		if(userObj){
			return this.ServerResponse.requireData('查询成功', {code:0,data:userObj});
		}else{
			return this.ServerResponse.requireData('用户不存在',{code:1});
		} 
	}else{
		return this.ServerResponse.requireData('用户已退出',{code:1});
	}
	
  }
  async list(obj){
	const {ctx,app}=this;
	const Op = app.Sequelize.Op;
	var list={
		count:0,
		arr:[],
	}
	if(obj.product_line_id){
		var objOption={
			username:{[Op.like]:`%${obj.keyword}%`},
			role:obj.role,
			product_line_id:obj.product_line_id
		}
	}else{
		var objOption={
			username:{[Op.like]:`%${obj.keyword}%`},
			role:obj.role,
		}
	}
	
	try{
		await this.TheUser.findAndCountAll({
			where:objOption,
			order: [
                ['create_time', 'DESC'] //降序desc，升序asc
            ],
			limit: parseInt(obj.pageSize),
			offset:parseInt((obj.pageNo-1) * obj.pageSize)
		}).then(function(result){
			list.count=result.count,
			list.arr=result.rows
		})
		return this.ServerResponse.requireData('查询成功', list);
	}catch(e){
		return this.ServerResponse.networkError('网络问题');
	}
  }
  async create(user) {
	const hasUser=await this.TheUser.findOne({
		where:{
			username:user.username
		}
	})
	if(hasUser==null){
		user['create_people'] = this.ctx.session.username;
		user['password'] ='yjf@123456';
		const userInfo=await this.TheUser.create(user);
		if (!userInfo) {
			return this.ServerResponse.networkError('网络问题');
		}else{
			return this.ServerResponse.createBySuccessMsg('创建成功');
		}
	}else{
		return this.ServerResponse.requireData('账号已存在,请换个名字试试',{code:1})
	}
  }
  async update(data) {
	const userInfo = await this.TheUser.findOne({
		where: {
			id: data.id
		}
	})
	if (userInfo == null) {
		return this.ServerResponse.requireData('用户不存在', { code: 1 })
	} else {
		var obj = data.updates;
		obj['update_people'] = this.ctx.session.username;
		obj['update_time']=sd.format(new Date(), 'YYYY-MM-DD HH:mm:ss');
		const thedata = await this.TheUser.update(obj, {
			where: {
				id: data.id
			}
		})
		if (thedata) {
			return this.ServerResponse.createBySuccessMsg('更新成功');
		} else {
			return this.ServerResponse.networkError('网络问题');
		}
	}
  }
  async detail(id) {
	const userInfo = await this.TheUser.findOne({
		where: {
			id: id
		}
	})
	if (userInfo == null) {
		return this.ServerResponse.requireData('用户不存在', { code: 1 });
	} else {
		return this.ServerResponse.requireData('查询成功',userInfo);
	}
}
  async delete(id){
	try {
		const result = await this.TheUser.findOne({
			where: {id: id },
		});
		if (!result) {
			return this.ServerResponse.requireData('用户不存在', { code: 1 });
		}
		const row = await this.TheUser.destroy({ where: { id: id } });
		if (row) {
			return this.ServerResponse.createBySuccessMsg('删除成功');
		} else {
			return this.ServerResponse.requireData('删除失败', { code: 1 });
		}
	} catch (e) {
		return this.ServerResponse.networkError('网络问题');
	}
  }
  async editPassword(data){
	try{
		const row = await this.TheUser.update({
			password: data.password,
		}, { where: { id: data.id }, individualHooks: true });
		if (row) {
			return this.ServerResponse.createBySuccessMsg('密码修改成功');
		} else {
			return this.ServerResponse.requireData(`密码修改失败`, { code: 1 });
		}
	}catch(e){
		return this.ServerResponse.networkError('网络问题');
	}
  }
  async resetPassword(id){
	try {
		const result = await this.TheUser.findOne({
			where: { id: id },
		});
		if (!result) {
			return this.ServerResponse.requireData('用户不存在', { code: 1 });
		}
		const row = await this.TheUser.update({
			password:'yjf@123456',
		}, { where: { id: id }, individualHooks: true });

		if (row) {
			return this.ServerResponse.createBySuccessMsg('密码还原成功');
		} else {
			return this.ServerResponse.requireData(`密码还原失败`, { code: 1 });
		}
	} catch (e) {
		return this.ServerResponse.networkError('网络问题');
	}
  }
  async useful(id) {
	try {
		const result = await this.TheUser.findOne({
			where: { id: id },
		});
		if (!result) {
			return this.ServerResponse.requireData('用户不存在', { code: 1 });
		}
		var sj=0;
		var str='';
		if(result.user_use==0){
			sj=1;
			str='启用'
		}else{
			sj=0;
			str='停用'
		}
		const row = await this.TheUser.update({
			user_use: sj,
		}, { where: { id: id }, individualHooks: true });

		if (row) {
			return this.ServerResponse.createBySuccessMsg(`${str}成功`);
		} else {
			return this.ServerResponse.createBySuccessMsg(`${str}失败`);
		}
	} catch (e) {
		return this.ServerResponse.networkError('网络问题');
	}
  }
}
module.exports = User;
