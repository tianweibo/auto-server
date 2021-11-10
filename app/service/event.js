'use strict';
const path = require("path");
const fs = require("fs");
const Service = require('egg').Service;
const sd = require('silly-datetime');
class Event extends Service {
	constructor(ctx) {
		super(ctx);
		this.Event = ctx.model.Event;
		this.TheLabel = ctx.model.TheLabel;
		this.EventAttribute = ctx.model.EventAttribute;
		this.IndicatorEvent=ctx.model.IndicatorEvent;
		this.ApplicationIndicator=ctx.model.ApplicationIndicator
		this.Indicator=ctx.model.Indicator
		this.Attribute = ctx.model.Attribute;
		this.ResponseCode = ctx.response.ResponseCode;
		this.ServerResponse = ctx.response.ServerResponse;
	}
	async update(data) {
		const Op = this.app.Sequelize.Op;
		const eventInfo = await this.Event.findOne({
			where: {
				event_id: data.id
			}
		})
		if (eventInfo == null) {
			return this.ServerResponse.requireData('事件不存在', { code: 1 })
		} else {
			var qian=[];
            var hou=[];
            if(eventInfo.event_label){
                qian=eventInfo.event_label.split(',');
            }
            if(data.updates.info.event_label){
                hou=data.updates.info.event_label.split(',');
            }
            var tempArr=[]
            for(var i=0;i<qian.length;i++){
                if(hou.indexOf(qian[i])==-1){
                    var obj={id:qian[i],type:'redu'}
                    tempArr.push(obj)
                }
            }
            for(var i=0;i<hou.length;i++){
                if(qian.indexOf(hou[i])==-1){
                    var obj={id:hou[i],type:'add'}
                    tempArr.push(obj)
                }
            }
            if(tempArr.length>0){
                this.ctx.helper.calcLabelNumber(tempArr,Op,this.TheLabel,null)
            }

			var obj = data.updates;
			obj.info.update_people = this.ctx.session.username;
			obj.info['update_time']=sd.format(new Date(), 'YYYY-MM-DD HH:mm:ss');
			const thedata = await this.Event.update(obj.info, {
				where: {
					event_id: data.id
				}
			})
			if (thedata) {
				/* var data1 = [];
				for (var i = 0; i < data.updates.attributeArr.length; i++) {
					var obj = {
						event_id: data.id,
						attribute_id: data.updates.attributeArr[i]
					}
					data1.push(obj)
				}
				await this.EventAttribute.destroy({ where: { event_id: data.id } });
				const eventAttributeInfo = await this.EventAttribute.bulkCreate(data1, { updateOnDuplicate: ["event_id"] })
				if (!eventAttributeInfo) {
					return this.ServerResponse.networkError('网络问题');
				} else {
					return this.ServerResponse.createBySuccessMsg('更新成功');
				} */
				return this.ServerResponse.createBySuccessMsg('更新成功');
			} else {
				return this.ServerResponse.networkError('网络问题');
			}
		}
	}
	async create(event) {
		const Op = this.app.Sequelize.Op;
		const hasEvent = await this.Event.findOne({
			where: {
				event_code: event.info.event_code
			}
		})
		const hasEventname = await this.Event.findOne({
			where: {
				event_name: event.info.event_name
			}
		})
		if(hasEventname){
			return this.ServerResponse.networkError('事件名称已存在,请换个再试试')
		}
		if (hasEvent == null) {
			event.info.create_people = this.ctx.session.username;
			event.info.product_line_id=this.ctx.session.productid;
			event.info.product_line_name=this.ctx.session.productname;
			const eventInfo = await this.Event.create(event.info);
			if (event.info.event_label) {
                var temp=event.info.event_label.split(',');
                this.ctx.helper.calcLabelNumber(temp,Op,this.TheLabel,'add')
            } 
			if (eventInfo) {
				/* if (event.attributeArr) {
					var data = [];
					for (var i = 0; i < event.attributeArr.length; i++) {
						var obj = {
							event_id: eventInfo.dataValues.event_id,
							attribute_id: event.attributeArr[i]
						}
						data.push(obj)
					}
					const eventAttributeInfo = await this.EventAttribute.bulkCreate(data)
					if (!eventAttributeInfo) {
						return this.ServerResponse.networkError('网络问题');
					} else {
						return this.ServerResponse.createBySuccessMsg('创建成功');
					}
				} else {
					return this.ServerResponse.createBySuccessMsg('创建成功');
				} */
				return this.ServerResponse.createBySuccessMsg('创建成功');
			} else {
				return this.ServerResponse.networkError('网络问题');
			}
		} else {
			return this.ServerResponse.networkError('事件英文代码已存在,请换个再试试')
		}
	}
	async indicByEventId(id){
		const { ctx, app } = this;
		const Op = app.Sequelize.Op;
		const idArr = await this.IndicatorEvent.findAll({
			where: {
				event_id: id
			},
			attributes: ['indicator_id']
		})
		var dataArr = [];
		if (idArr && idArr.length > 0) {
			for (var i = 0; i < idArr.length; i++) {
				dataArr.push({
					indicator_id: idArr[i].indicator_id
				})
			}
		}
		var objOption = {
			[Op.or]: dataArr,
		}
		var list = await this.Indicator.findAll({
			where: objOption,
		})
		if (list == null) {
			return this.ServerResponse.networkError('指标不存在');
		} else {
			return this.ServerResponse.requireData('查询成功', { code: 0, data: list });
		}
	}
	async detail(id) {
		const { ctx, app } = this;
		const Op = app.Sequelize.Op;
		try{
			const eventInfo = await this.Event.findOne({
				where: {
					event_id: id
				}
			})
			/* const idArr = await this.EventAttribute.findAll({
				where: {
					event_id: id
				},
				attributes: ['attribute_id']
			})
			var dataArr = [];
			if (idArr && idArr.length > 0) {
				for (var i = 0; i < idArr.length; i++) {
					dataArr.push({
						attribute_id: idArr[i].attribute_id
					})
				}
			}
			var objOption = {
				[Op.or]: dataArr,
			}
			var attrInfo = await this.Attribute.findAll({
				where: objOption,
			}) */
			var attrInfo=[]
			if (eventInfo == null) {
				return this.ServerResponse.networkError('事件不存在');
			} else {
				var eventObj = {
					eventInfo, attrInfo
				}
				return this.ServerResponse.requireData('查询成功', eventObj);
			}
		}catch(e){
			return this.ServerResponse.networkError(e);
		}
	}
	async list(obj) {
		const { ctx, app } = this;
		const Op = app.Sequelize.Op;
		var list = {
			count: 0,
			arr: [],
		}
		var arr = [];
		if(ctx.session.role==1){
			arr.push({
				state:1,
				open_type:1,
				[Op.or]: [{product_line_id: ctx.session.productid}, {product_line_id: 7}]
			})
		}else if(ctx.session.role==10){
			if(obj.product_line_id){
				arr.push({
					product_line_id:obj.product_line_id
				})
			}
			arr.push({
				state:1
			})
		}
		if (obj.event_label) {
			arr.push({
                event_label:{[Op.like]:`%${obj.event_label}%`}
            })
		}
		if (obj.event_trigger_mode) {
			arr.push({
				event_trigger_mode: obj.event_trigger_mode,
			})
		}
		var objOption = {
			[Op.or]: [{
				event_name: { [Op.like]: `%${obj.keyword}%` }
			}, {
				event_code: { [Op.like]: `%${obj.keyword}%` }
			}],
			[Op.and]: arr
		}
		try {
			await this.Event.findAndCountAll({
				where: objOption,
				limit: parseInt(obj.pageSize),
				order: [
                    ['create_time', 'DESC'], //降序desc，升序asc
                ],
				offset: parseInt((obj.pageNo - 1) * obj.pageSize)
			}).then(function (result) {
				list.count = result.count,
				list.arr = result.rows
			})
			return this.ServerResponse.requireData('查询成功', list);
		} catch (e) {
			return this.ServerResponse.networkError('网络问题');
		}
	}
	async archive(id) {
		const { ctx, app } = this;
		const Op = app.Sequelize.Op;
		try {
			const result = await this.Event.findOne({
				where: { event_id: id },
			});
			if (!result) {
				return this.ServerResponse.requireData('事件不存在', { code: 1 });
			}
			const indicatorArr = await this.IndicatorEvent.findAll({
                where: {
                    event_id: id
                },
                attributes: ['indicator_id']
            })
			var data1=[];
            if(indicatorArr.length!=0){
				for (var i = 0; i < indicatorArr.length; i++) {
					data1.push({
						indicator_id: indicatorArr[i].indicator_id
					})
				}
				var objOption = {
					[Op.or]: data1,
				}
				const arr1 = await this.ApplicationIndicator.findAll({ //事件去重（不去重也行）后按IDS获取详情
					where: objOption,
					attributes: ['application_id']
				})
				if(arr1.length!=0){
					return this.ServerResponse.requireData('该事件有关联的有效应用,不支持归档事件，请解除应用关联再进行操作', { code: 1 });
				}
            }
			const row = await this.Event.update({
				state: 0,
			}, { where: { event_id: id }, individualHooks: true }); 

			if (row) {
				return this.ServerResponse.requireData('归档成功');
			} else {
				return this.ServerResponse.requireData('归档失败', { code: 1 });
			}
		} catch (e) {
			return this.ServerResponse.networkError('网络问题');
		}
	}
	async listById(id) {      //id 数组
        const { ctx, app } = this;
        const Op = app.Sequelize.Op;
        var data = [];
        if (id && id.id.length > 0) {
            var idArr = id.id;
            for (var i = 0; i < idArr.length; i++) {
                data.push({
                    event_id: idArr[i]
                })
            }
        }
        var objOption = {
            [Op.or]: data,
        }
        try {
            var arr = await this.Event.findAll({
                where: objOption,
            })
            return this.ServerResponse.requireData('查询成功', arr);
        } catch (e) {
            return this.ServerResponse.networkError('网络问题');
        }
    }
	async delete(id) {
		const { ctx, app } = this;
		const Op = app.Sequelize.Op;
		try {
			const result = await this.Event.findOne({
				where: { event_id: id },
			});
			if (!result) {
				return this.ServerResponse.networkError('事件不存在');
			}
			if (result.event_label) {
                var temp=result.event_label.split(',');
                this.ctx.helper.calcLabelNumber(temp,Op,this.TheLabel,'redu')
            } 
			const indicatorArr = await this.IndicatorEvent.findAll({
                where: {
                    event_id: id
                },
                attributes: ['indicator_id']
            })
			var data1=[];
            if(indicatorArr.length!=0){
				for (var i = 0; i < indicatorArr.length; i++) {
					data1.push({
						indicator_id: indicatorArr[i].indicator_id
					})
				}
				var objOption = {
					[Op.or]: data1,
				}
				const arr1 = await this.IndicatorEvent.findAll({ //事件去重（不去重也行）后按IDS获取详情
					where: objOption,
					attributes: ['event_id']
				})
				if(arr1.length!=0){
					return this.ServerResponse.requireData('该事件有关联的有效应用,不支持删除事件，请解除应用关联再进行操作', { code: 1 });
				}
            }
			const row = await this.Event.destroy({ where: { event_id: id } });
			if (row) {
				return this.ServerResponse.requireData('删除成功');
			} else {
				return this.ServerResponse.requireData('删除失败', { code: 1 });
			}
		} catch (e) {
			return this.ServerResponse.networkError('网络问题');
		}
	}
	async importEvent(data) {
		const eventInfo = await this.Event.bulkCreate(data);
		if (eventInfo) {
			return this.ServerResponse.requireData('导入成功', { code: 0 });
		} else {
			return this.ServerResponse.networkError('网络问题');
		}
	}
}
module.exports = Event;
