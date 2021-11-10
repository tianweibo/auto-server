'use strict';

const Service = require('egg').Service;
const sd = require('silly-datetime');
class Attribute extends Service {
  constructor(ctx){
	  super(ctx);
	  this.Attribute=ctx.model.Attribute;
	  this.Event=ctx.model.Event;
	  this.EventAttribute=ctx.model.EventAttribute;
	  this.ResponseCode = ctx.response.ResponseCode;
	  this.ServerResponse = ctx.response.ServerResponse;
  }
  
  async detail(id){  // id数组
	const {ctx,app}=this;
	const Op = app.Sequelize.Op;
    var data=[];
    if(id && id.id.length>0){
        var idArr=id.id;
        for(var i=0;i<idArr.length;i++){
            data.push({
                attribute_id:idArr[i]
            })
        }
    }
    var objOption={
		[Op.or]:data,
	}
    try{
		var arr=await this.Attribute.findAll({
			where:objOption,
		})
		return this.ServerResponse.requireData('查询成功', arr);
	}catch(e){
		return this.ServerResponse.networkError('网络问题');
	}
  }
  async eventList(obj){
	try{
        var arr=await this.EventAttribute.findAll({where:{attribute_id:obj.id},attributes:['event_id']});
		const {ctx,app}=this;
		const Op = app.Sequelize.Op;
		var list={
			count:0,
			arr:[],
		}
		var arr1=[];
		for(var i=0;i<arr.length;i++){
			arr1.push({
				event_id:parseInt(arr[i].event_id)
			})
		} 
		var objOption={
			[Op.or]:arr1,
		    [Op.or]:[{
				event_name:{[Op.like]:`%${obj.keyword}%`}
			},{
				event_code:{[Op.like]:`%${obj.keyword}%`}
			}], 
		}
		await this.Event.findAndCountAll({
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
  async list(obj){
	const {ctx,app}=this;
	const Op = app.Sequelize.Op;
	var list={
		count:0,
		arr:[],
	}
    var arr=[];
    if(obj.attribute_label){
        arr.push({
			attribute_label:{[Op.like]:`%${obj.attribute_label}%`}
		})
    }  
    if(obj.data_type){
        arr.push({
			data_type:obj.data_type,
		})
    }
	if(obj.is_common){
        arr.push({
			is_common:obj.is_common,
		})
    }
	var objOption={
        [Op.or]:[{
			attribute_name:{[Op.like]:`%${obj.keyword}%`}
		},{
			attribute_code:{[Op.like]:`%${obj.keyword}%`}
		}],
        [Op.and]:arr,
	}
	try{
		await this.Attribute.findAndCountAll({
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
}
module.exports = Attribute;
