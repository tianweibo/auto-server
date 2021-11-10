'use strict';
const sd = require('silly-datetime');
const Service = require('egg').Service;
class ProductLine extends Service {
  constructor(ctx){
	  super(ctx);
	  this.ProductLine=ctx.model.ProductLine;
	  this.ResponseCode = ctx.response.ResponseCode;
	  this.ServerResponse = ctx.response.ServerResponse;
      this.TheUser=ctx.model.User;
  }
  async listAll(){
    const {ctx,app}=this;
	const Op = app.Sequelize.Op;
	var list=[]
	try{
		await this.ProductLine.findAndCountAll({
			where:{
                status:1,
                product_use:1
            },
			order: [
                ['create_time', 'DESC'] //降序desc，升序asc
            ],
		}).then(function(result){
			for(let i=0;i<result.rows.length;i++){
                let obj={
                    value:result.rows[i].id,
                    label:result.rows[i].productname
                }
                list.push(obj)
            }
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
	var objOption={
		productname:{[Op.like]:`%${obj.keyword}%`},
		status:1,
	}
	try{
		await this.ProductLine.findAndCountAll({
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
  async create(product) {
	const hasProduct=await this.ProductLine.findOne({
		where:{
			productname:product.productname
		}
	})
	if(hasProduct==null){
		product['create_people'] = this.ctx.session.username;
		const productInfo=await this.ProductLine.create(product);
		if (!productInfo) {
			return this.ServerResponse.networkError('网络问题');
		}else{
			return this.ServerResponse.createBySuccessMsg('创建成功');
		}
	}else{
		return this.ServerResponse.requireData('产品线名已存在,请换个名字试试',{code:1})
	}
  }
  async update(data) {
	const productInfo = await this.ProductLine.findOne({
		where: {
			id: data.id
		}
	})
	if (productInfo == null) {
		return this.ServerResponse.requireData('产品线不存在', { code: 1 })
	} else {
		var obj = data.updates;
		obj['update_people'] = this.ctx.session.username;
		obj['update_time']=sd.format(new Date(), 'YYYY-MM-DD HH:mm:ss');
		const thedata = await this.ProductLine.update(obj, {
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
  async useful(id) {
	try {
		const result = await this.ProductLine.findOne({
			where: { id: id },
		});
		var sj=0;
		var str='';
		if(result.product_use==0){
			sj=1;
			str='启用'
		}else{
			sj=0;
			str='停用'
		}
		const row = await this.ProductLine.update({
			product_use: sj,
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
  async detail(id) {
    const { ctx, app } = this;
    const Op = app.Sequelize.Op;
    try{
        const productInfo = await this.ProductLine.findOne({
            where: {
                id: id
            }
        })
        if (productInfo == null) {
            return this.ServerResponse.networkError('事件不存在');
        } else {
            return this.ServerResponse.requireData('查询成功', productInfo);
        }
    }catch(e){
        return this.ServerResponse.networkError(e);
    }
}
async userListPro(id){
    try{
        const userArr = await this.TheUser.findAll({
            where: {
                product_line_id: id
            },
            attributes: ['username']
        })
        if(userArr.length!=0){
            return this.ServerResponse.requireData('查询成功', userArr);
        }else{

        }
    }catch(e){
        return this.ServerResponse.networkError('网络问题');
    }
}
  async delete(id) {
	try {
        const lineArr = await this.TheUser.findAll({
            where: {
                product_line_id: id
            },
            attributes: ['product_line_id']
        })
        
        if(lineArr.length!=0){
            return this.ServerResponse.networkError('该产品线已有用户接入，不支持删除');
        }
		const row = await this.ProductLine.update({
			status: 0,
		}, { where: { id: id }, individualHooks: true });
		if (row) {
			return this.ServerResponse.createBySuccessMsg(`删除成功`);
		} else {
			return this.ServerResponse.createBySuccessMsg(`删除失败`);
		}
	} catch (e) {
		return this.ServerResponse.networkError('网络问题');
	}
  }
}
module.exports = ProductLine;
