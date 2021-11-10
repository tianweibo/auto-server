'use strict';

const Service = require('egg').Service;
class ProjectService extends Service {
  constructor(ctx){
	  super(ctx);
	  this.TheProject=ctx.model.Project;
	  this.ResponseCode = ctx.response.ResponseCode;
	  this.ServerResponse = ctx.response.ServerResponse;	  
  }
  
  async create(project) {
	const hasProject=await this.TheProject.findOne({
		where:{
			project_name:project.project_name
		}
	})
	if(hasProject==null){
		var project1=project
		project1['username']=this.ctx.session.username;
		const projectInfo=await this.TheProject.create(project1);
		if (!projectInfo) {
			return this.ServerResponse.networkError('网络问题');
		}else{
			var projectInfo1 = projectInfo.toJSON();
			return this.ServerResponse.requireData('创建成功', {code:0});
		}
	}else{
		return this.ServerResponse.requireData('项目已存在,请换个名字试试',{code:1})
	}
  }
  async detail(id){
	const {ctx,app}=this;
	const Op = app.Sequelize.Op;
    var objOption={
		[Op.or]:[{
			project_id:id
		},{
			project_name:id
		}],
		[Op.and]:[{
			state:1
		}]
	}
	const projectInfo=await this.TheProject.findOne({
		/* where:{
			project_id:id
		} */
		where:objOption
	})
	
	if(projectInfo==null){
		return this.ServerResponse.requireData('项目不存在',{code:1});
	}else{
		var projectObj={
            projectInfo
		}
		return this.ServerResponse.requireData('查询成功', {code:0,data:projectObj});
	}
  }
  async delete(project_id){
	try{
		const result = await this.TheProject.findOne({
			where: { project_id: project_id ,state:1},
		});
		if (!result) {
			return this.ServerResponse.requireData('项目不存在',{code:1});
		}
		const row= await this.TheProject.update({
			state: 0,
		}, { where: { project_id: project_id}, individualHooks: true });
		
		if(row) {
			return this.ServerResponse.requireData('删除成功',{code:0});
		}else{
			return this.ServerResponse.requireData('删除失败',{code:1});
		}
	}catch(e){
		return this.ServerResponse.networkError('网络问题');
	}
  }
  async list(obj){
	const {ctx,app}=this;
	const Op = app.Sequelize.Op;
	var list={
		count:0,
		arr:[],
	}
	var objOption={
		project_name:{[Op.like]:`%${obj.keyword}%`},
		state:1
	}
	try{
		await this.TheProject.findAndCountAll({
			where:objOption,
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
  async update(data){
	const projectInfo=await this.TheProject.findOne({
		where:{
			project_id:data.id
		}
	})
	/* const hasProject=await this.TheProject.findOne({
		where:{
			project_name:data.updates.project_name
		}
	})
	if(hasProject){
		return this.ServerResponse.requireData('项目已存在,请换个名字试试',{code:1})
	} */
	if(projectInfo==null){
		return this.ServerResponse.requireData('项目不存在',{code:1})
	}else{
		const thedata=await this.TheProject.update(data.updates,{
			where:{
				project_id:data.id
			}
		})
		if(thedata[0]==1){
			return this.ServerResponse.requireData('修改成功', {code:0});
		}else{
			return this.ServerResponse.requireData('项目修改失败',{code:1})
		}
	}
  }
}
module.exports = ProjectService;
