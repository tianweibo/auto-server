'use strict';
const sd = require('silly-datetime');
const Service = require('egg').Service;
class TheLabel extends Service {
  constructor(ctx){
	  super(ctx);
	  this.TheLabel=ctx.model.TheLabel;
	  this.ResponseCode = ctx.response.ResponseCode;
	  this.ServerResponse = ctx.response.ServerResponse;	  
  }
  async findLabelId(id){
	const data = await this.TheLabel.findOne({
		where: {
			id: id
		},
		attributes: ['fid']
	})
	return this.ServerResponse.requireData('查询成功', data );
  }
  async exposeLabel(fid){
	const data = await this.TheLabel.findAll({
		where: {
			fid: fid
		},
		attributes: ['label','id']
	})
	return this.ServerResponse.requireData('查询成功', data );
  }
  async create(data) {
    const {ctx,app}=this;
	const Op = app.Sequelize.Op;
	//重名校验
	var temp=data.labelList.replace(/\s/g,"").replace(/，|\./g, ',').split(',');
	var arr=[];
	var dataArr=[];
	for(var i=0;i<temp.length;i++){
        var obj={
          fid:data.fuid===0? 0:data.fuid,
          fname:data.fuid===0?'标签':data.fname,
          label:temp[i],
          is_lower:data.isfu===1?0:1,
		  create_people:this.ctx.session.username
        }
		arr.push(obj)
		dataArr.push({
			label: temp[i]
		})
      }
	const hasLabel=await this.TheLabel.findAll({
		where:{
			[Op.or]: dataArr
		}
	})
	if(hasLabel.length==0){
		const tempInfo=await this.TheLabel.bulkCreate(arr);
		if (!tempInfo) {
			return this.ServerResponse.networkError('网络问题');
		} else {
			return this.ServerResponse.createBySuccessMsg('创建成功');
		}
	}else{
		var str=''
		for(var i=0;i<hasLabel.length;i++){
			str+=hasLabel[i].label
		}
		return this.ServerResponse.networkError(`标签[${str}]已存在,请换个名字试试`)
	}
  }
  
  
  async delete(id){
	try{
		const result = await this.TheLabel.findOne({
			where: {id: id},
		});
		if (!result) {
			return this.ServerResponse.requireData('标签不存在',{code:1});
		}
		if(result.number>0 && result.is_lower==1){
			return this.ServerResponse.networkError('标签使用中，请先去除标签的使用');
		}
		if(result.is_lower==0){
			var num=0
			await this.TheLabel.findAndCountAll({
				where:{
					fid:result.id
				},
				limit: 100,
				offset:0
			}).then(function(result){
				num=result.count
			})
			if(num>0){
				return this.ServerResponse.networkError('该父级标签存在子级，不支持删除操作');
			}
		}
		const row = await this.TheLabel.destroy({ where: {id: id } });
		if (row) {
			return this.ServerResponse.createBySuccessMsg('删除成功');
		} else {
			return this.ServerResponse.requireData('删除失败', { code: 1 });
		}
	}catch(e){
		return this.ServerResponse.networkError('网络问题');
	}
  }
  async listTree(obj){
    const {ctx,app}=this;
	var theid=obj.id
	const Op = app.Sequelize.Op;
	var list={
		count:0,
		arr:[],
	}
	const arr1 = await this.TheLabel.findAll({ 
		where: {
			fid:theid
		},
		attributes: ['id']
	})
	var ids=[]
	for (var i = 0; i < arr1.length; i++) {
		ids.push(arr1[i].id);
	}
	ids.unshift(theid);
	ids.unshift(0);
	var data1=[]
	for (var i = 0; i < ids.length; i++) {
		data1.push({
			fid: ids[i]
		})
	}
	var objOption = {
		[Op.or]: data1,
	}
	try{
		await this.TheLabel.findAndCountAll({
			where:objOption,
			limit: 1000,
			offset:0
		}).then(function(result){
			list.count=result.count
			list.arr=ctx.helper.listToTree(result.rows,true);
		})
		return this.ServerResponse.requireData('查询成功', list);
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
	if(obj.fid.length==0){
		var objOption={
			label:{[Op.like]:`%${obj.keyword}%`},
		}
	}else{
		var objOption={
			label:{[Op.like]:`%${obj.keyword}%`},
			fid:obj.fid
		}
	}
	try{
		await this.TheLabel.findAndCountAll({
			where:objOption,
			order: [
				['update_time', 'DESC'] //降序desc，升序asc
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
  async update(data){
	const labelInfo=await this.TheLabel.findOne({
		where:{
			id:data.id
		}
	})
	if(labelInfo==null){
		return this.ServerResponse.requireData('标签不存在',{code:1})
	}else{
		if(data.label==labelInfo.label){
			return this.ServerResponse.createBySuccessMsg('更新成功');
		}else{
			const thename=await this.TheLabel.findOne({
				where:{
					label:data.label
				}
			})
			if(thename){
				return this.ServerResponse.networkError('标签名已存在')
			}else{
				const thedata=await this.TheLabel.update({label:data.label,update_people:this.ctx.session.username,update_time:sd.format(new Date(), 'YYYY-MM-DD HH:mm:ss')},{
					where:{
						id:data.id
					}
				})
				if(thedata[0]==1){
					return this.ServerResponse.createBySuccessMsg('更新成功');
				}else{
					return this.ServerResponse.requireData('项目修改失败',{code:1})
				}
			}
		}
	}
  }
  async labelType(){
	try{
		const arr1 = await this.TheLabel.findAll({ 
			where: {
				is_lower:0
			},
		})
		var list=this.ctx.helper.listToTree(arr1,false);
		return this.ServerResponse.requireData('查询成功', list);
	}catch(e){
		console.log(e)
		return this.ServerResponse.networkError('网络问题');
	}
  }
}
module.exports = TheLabel;
