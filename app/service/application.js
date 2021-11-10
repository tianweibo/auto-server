'use strict';
const path = require("path");
const fs = require("fs");
const sd = require('silly-datetime');
const Service = require('egg').Service;
const {indicatorObj,sourceFrom}=require('../common/foreignEnum.js')
class Application extends Service {
    constructor(ctx) {
        super(ctx);
        this.Application = ctx.model.Application;
        this.Event = ctx.model.Event;
        this.TheLabel = ctx.model.TheLabel;
        this.Report = ctx.model.Report;
        this.ApplicationIndicator = ctx.model.ApplicationIndicator;
        this.IndicatorEvent = ctx.model.IndicatorEvent;
        this.Indicator = ctx.model.Indicator;
        this.ResponseCode = ctx.response.ResponseCode;
        this.ServerResponse = ctx.response.ServerResponse;
    }
    async exposeList(keyword){
        const { ctx, app } = this;
        const Op = app.Sequelize.Op;
        var objOption={}
        if(keyword){
            objOption = {
                [Op.or]: [{
                    platform_app: { [Op.like]: `%${keyword}%` }
                }, {
                    platform_app_code: { [Op.like]: `%${keyword}%` }
                }],
                [Op.and]: [{
                    is_interactive:1
                }]
            }
        }else{
            objOption = {
                [Op.and]: [{
                    is_interactive:1
                }]
            }
        }
        try{
            var arr = await this.Application.findAll({
                where:objOption,
                attributes: ['platform_app_code', 'platform_app','product_line_id','product_line_name']
            })
            return this.ServerResponse.requireData('查询成功', arr);
        }catch(e){
            return this.ServerResponse.networkError('网络问题');
        }
    }
    async exposeCreate(data){
        var data1={
          platform_app:'',          //小程序名称
          platform_app_code:'',     //小程序代码
          platform_app_version:'',  //小程序版本
          platform_business:'TB',     //小程序平台
          platform_business_label:'淘宝',
          application_dep_platform:'platform-ali',
          application_dep_platform_label:'客户运营平台-阿里版',
          application_type:'program-zfb',
          application_type_label:'支付宝小程序',
          application_label:'',      //标签类型-value(多值，字符串逗号分隔)
          application_label_label:'',//标签类型-label(多值，字符串逗号分隔)
          application_use:1,
          is_interactive:1,
          note:'',                 //小程序描述
          create_people:'',         //创建人
          belongTo:'IMA'
        }
        var bj=sourceFrom[data.belongTo]
        try{
            const Op = this.app.Sequelize.Op;
            const hasApp = await this.Application.findOne({
            where: {
                platform_app_code: data.platform_app_code
            }
        })
        if (hasApp == null) {
            data['open_type']=sourceFrom[data.belongTo];
            data['platform_app_version']='1.0.0';
            const appInfo = await this.Application.create(data);
            if (data.application_label) {
                var temp=data.application_label.split(',');
                this.ctx.helper.calcLabelNumber(temp,Op,this.TheLabel,'add')
            } 
            if (appInfo) {
                var indicatorArr=indicatorObj[data.belongTo];
                if (indicatorArr.length > 0) {
                    var data = [];
                    for (var i = 0; i < indicatorArr.length; i++) {
                        var obj = {
                            application_id: appInfo.dataValues.application_id,
                            indicator_id: indicatorArr[i],
                            open_type:bj
                        }
                        data.push(obj)
                    }
                    const tempInfo = await this.ApplicationIndicator.bulkCreate(data)
                    if (!tempInfo) {
                        return this.ServerResponse.networkError('网络问题');
                    } else {
                        return this.ServerResponse.createBySuccessMsg('创建成功');
                    }
                } else {
                    return this.ServerResponse.createBySuccessMsg('创建成功');
                }
            } else {
                return this.ServerResponse.networkError('网络问题');
            }
        } else {
            return this.ServerResponse.networkError('小程序代码已存在,请换个再试试')
        }
        }catch(e){
            console.log(e,'ee')
        }
    }
    async exposeUpdate(data) {
        try{
            var data1={
                platform_app:'',          //小程序名称
                platform_app_code:'',
                application_label:'',      //标签类型-value(多值，字符串逗号分隔)
                application_label_label:'',//标签类型-label(多值，字符串逗号分隔)
                note:'',                 //小程序描述
                update_people:'',         //更新人
                belongTo:"IMA"
            }
            const Op = this.app.Sequelize.Op;
            const appInfo = await this.Application.findOne({
                where: {
                    platform_app_code: data.platform_app_code
                }
            })
            data['open_type']=sourceFrom[data.belongTo];
            if (appInfo == null) {
                return this.ServerResponse.networkError('应用不存在')
            } else {
                //标签使用数量的更新
                var qian=[];
                var hou=[];
                if(appInfo.application_label){
                    qian=appInfo.application_label.split(',');
                }
                if(data.application_label){
                    hou=data.application_label.split(',');
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
                //标签的使用数量的更新
                data['update_time'] = sd.format(new Date(), 'YYYY-MM-DD HH:mm:ss');
                // 指标添加的逻辑
                const indicInfo = await this.ApplicationIndicator.findAll({
                    where: {
                        application_id: appInfo.application_id,
                        //open_type:sourceFrom[data.belongTo]
                    }
                })
                var indicOpenType1=[];
                var indicOpenType2=[];
                console.log(indicInfo,'indicInfo')
                for(let i=0;i<indicInfo.length;i++){
                    if(indicInfo[i].open_type==1){
                        indicOpenType1.push(indicInfo[i].indicator_id)
                    } else if(indicInfo[i].open_type==2){
                        indicOpenType2.push(indicInfo[i].indicator_id)
                    } 
                }
                //指标添加的逻辑
                if(indicOpenType1.length!=0){ //在原有的基础上添加【互动营销分析平台的指标
                  var indicArr=[];   //indicOpenType1   indicatorObj[data.belongTo]
                  for (let i = 0; i < indicOpenType1.length; i++) {
                    var obj = {
                        application_id: appInfo.application_id,
                        indicator_id: indicOpenType1[i],
                        open_type:1
                    }
                    indicArr.push(obj)
                  }
                  for (let i = 0; i < indicatorObj[data.belongTo].length; i++) {
                    var obj = {
                        application_id: appInfo.application_id,
                        indicator_id: indicatorObj[data.belongTo][i],
                        open_type:sourceFrom[data.belongTo]
                    }
                    indicArr.push(obj)
                  }
                  console.log('indicArr',indicArr)
                  //先删除 再添加
                  await this.ApplicationIndicator.destroy({ where: { application_id: parseInt(appInfo.application_id) } });
                  const eventAppInfo = await this.ApplicationIndicator.bulkCreate(indicArr)
                    if (!eventAppInfo) {
                        return this.ServerResponse.networkError('网络问题');
                    } 
                }
                
                if(indicOpenType1.length==0 && indicOpenType2.length==0){  //二者都没有，则直接加【互动营销分析平台的指标】
                    var indicatorArr=indicatorObj[data.belongTo];
                    if (indicatorArr.length > 0) {
                        var data1 = [];
                        for (var i = 0; i < indicatorArr.length; i++) {
                            var obj = {
                                application_id: appInfo.dataValues.application_id,
                                indicator_id: indicatorArr[i],
                                open_type:sourceFrom[data.belongTo]
                            }
                            data1.push(obj)
                        }
                        const tempInfo = await this.ApplicationIndicator.bulkCreate(data1)
                        if (!tempInfo) {
                            return this.ServerResponse.networkError('网络问题');
                        } 
                    } 
                }
                //if(indicOpenType2.length!=0){ //则编辑基本信息就行
                    const thedata = await this.Application.update(data, {
                        where: {
                            platform_app_code: data.platform_app_code
                        }
                    })
                    if (thedata) {
                        return this.ServerResponse.createBySuccessMsg('更新成功');
                    } else {
                        return this.ServerResponse.networkError('网络问题');
                    }
                //}
            }
        }catch(e){
            console.log(e,'eeeee')
        }
    }
    async exposeDelete(platform_app_code) {
        const Op = this.app.Sequelize.Op;
        try {
            const result = await this.Application.findOne({
                where: { platform_app_code: platform_app_code },
            });
            if (!result) {
                return this.ServerResponse.networkError('应用不存在');
            }
            if (result.application_label) {
                var temp=result.application_label.split(',');
                this.ctx.helper.calcLabelNumber(temp,Op,this.TheLabel,'redu')
            } 
            const arr = await this.Report.findAll({
                where: { application_id: result.application_id},
            });
            if (arr.length > 0) {
                return this.ServerResponse.networkError('该应用下存在报表,不支持进行删除的操作');
            }
            /* if (result.application_use == 1) {
                return this.ServerResponse.requireData('应用已启用,不支持进行删除的操作', { code: 1 });
            } */
            const row = await this.Application.destroy({ where: { platform_app_code: platform_app_code } });
            if (row) {
                return this.ServerResponse.requireData('删除成功', { code: 0 });
            } else {
                return this.ServerResponse.requireData('删除失败', { code: 1 });
            }
        } catch (e) {
            return this.ServerResponse.networkError('网络问题');
        }
    }
    async update(data) {
        const Op = this.app.Sequelize.Op;
        const appInfo = await this.Application.findOne({
            where: {
                application_id: data.id
            }
        })
        if (appInfo == null) {
            return this.ServerResponse.networkError('应用不存在')
        } else {
            var qian=[];
            var hou=[];
            if(appInfo.application_label){
                qian=appInfo.application_label.split(',');
            }
            if(data.updates.info.application_label){
                hou=data.updates.info.application_label.split(',');
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
            obj.info.product_line_id=this.ctx.session.productid;
			obj.info.product_line_name=this.ctx.session.productname;
            obj.info['update_time'] = sd.format(new Date(), 'YYYY-MM-DD HH:mm:ss');
            const thedata = await this.Application.update(obj.info, {
                where: {
                    application_id: data.id
                }
            })
            if (thedata) {
                var data1 = [];
                for (var i = 0; i < data.updates.indicatorArr.length; i++) {
                    var obj = {
                        application_id: data.id,
                        indicator_id: data.updates.indicatorArr[i]
                    }
                    data1.push(obj)
                }
                await this.ApplicationIndicator.destroy({ where: { application_id: data.id } });
                const eventAppInfo = await this.ApplicationIndicator.bulkCreate(data1, { updateOnDuplicate: ["application_id"] })
                if (!eventAppInfo) {
                    return this.ServerResponse.networkError('网络问题');
                } else {
                    return this.ServerResponse.createBySuccessMsg('更新成功');
                }

            } else {
                return this.ServerResponse.networkError('网络问题');
            }
        }
    }
    async create(app) {
        //const { ctx, app } = this;
		const Op = this.app.Sequelize.Op;
        const hasApp = await this.Application.findOne({
            where: {
                platform_app_code: app.info.platform_app_code
            }
        })
        if (hasApp == null) {
            app.info.create_people = this.ctx.session.username;
            app.info.product_line_id=this.ctx.session.productid;
			app.info.product_line_name=this.ctx.session.productname;
            const appInfo = await this.Application.create(app.info);
            if (app.info.application_label) {
                var temp=app.info.application_label.split(',');
                this.ctx.helper.calcLabelNumber(temp,Op,this.TheLabel,'add')
            } 
            if (appInfo) {
                if (app.indicatorArr.length > 0) {
                    var data = [];
                    for (var i = 0; i < app.indicatorArr.length; i++) {
                        var obj = {
                            application_id: appInfo.dataValues.application_id,
                            indicator_id: app.indicatorArr[i]
                        }
                        data.push(obj)
                    }
                    const tempInfo = await this.ApplicationIndicator.bulkCreate(data)
                    if (!tempInfo) {
                        return this.ServerResponse.networkError('网络问题');
                    } else {
                        return this.ServerResponse.createBySuccessMsg('创建成功');
                    }
                } else {
                    return this.ServerResponse.createBySuccessMsg('创建成功');
                }
                //标签数量的统计
                
            } else {
                return this.ServerResponse.networkError('网络问题');
            }
        } else {
            return this.ServerResponse.networkError('应用英文代码已存在,请换个再试试')
        }
    }
    async indicatorNum(id){
        try{
            var arr = await this.ApplicationIndicator.findAll({
                where: {
                    application_id: id
                },
                attributes: ['indicator_id']
            })
            return this.ServerResponse.requireData('查询成功', arr.length);
        }catch(e){
            return this.ServerResponse.networkError('网络问题');
        }
    }
    async detail(id,open_type) {
        const { ctx, app } = this;
        const Op = app.Sequelize.Op;
        const appInfo = await this.Application.findOne({
            where: {
                application_id: id
            }
        })
        var arr1 = [];
        if(open_type!=0){
            arr1.push({
                open_type:open_type
            })
        }
        arr1.push({
			application_id: id
		})
        var objOption = {[Op.and]: arr1}
        const arr = await this.ApplicationIndicator.findAll({
            where: objOption,
            attributes: ['indicator_id']
        })
        var indicatorIds = []
        for (var i = 0; i < arr.length; i++) {
            indicatorIds.push(arr[i].indicator_id);
        }
        if (appInfo == null) {
            return this.ServerResponse.networkError('应用不存在');
        } else {
            var appObj = {
                appInfo, indicatorIds
            }
            return this.ServerResponse.requireData('查询成功', appObj );
        }
    }
    async detailByIndicator(data) {  //应用下的指标
        var dataArr = [];
        if (data && data.id.length > 0) {
            for (var i = 0; i < data.id.length; i++) {
                dataArr.push({
                    indicator_id: data.id[i]
                })
            }
        }
        const { ctx, app } = this;
        const Op = app.Sequelize.Op;
        var objOption = {
            [Op.or]: dataArr,
        }
        var indicatorInfo = await this.Indicator.findAll({
            where: objOption,
        })
        if (indicatorInfo == null) {
            return this.ServerResponse.networkError('指标不存在');
        } else {
            return this.ServerResponse.requireData('查询成功', { code: 0, indicatorInfo });
        }
    }

    async detailByEvent(data) {  //指标下的事件
        const { ctx, app } = this;
        const Op = app.Sequelize.Op;                     //查找出指标下的事件，
        var data1 = [];
        if (data && data.id.length > 0) {
            var idArr = data.id;
            for (var i = 0; i < idArr.length; i++) {
                data1.push({
                    indicator_id: idArr[i]
                })
            }
        }
        var objOption = {
            [Op.or]: data1,
        }
        const arr1 = await this.IndicatorEvent.findAll({ //事件去重（不去重也行）后按IDS获取详情
            where: objOption,
            attributes: ['event_id']
        })

        var eventIds = [];
        for (var i = 0; i < arr1.length; i++) {
            eventIds.push(arr1[i].event_id);
        }
        //通过事件IDs 查找事件的列表-去重
        /* var eventIds= arr1.filter(function (item, index, arr) {
            return arr1.indexOf(item, 0) === index;
        }); */
        var data2 = [];
        if (eventIds && eventIds.length > 0) {
            for (var i = 0; i < eventIds.length; i++) {
                data2.push({
                    event_id: eventIds[i]
                })
            }
        }
        var objOption = {
            [Op.or]: data2,
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
				open_type:1,
				[Op.or]: [{product_line_id: ctx.session.productid}, {product_line_id: 7}]
			})
		}else if(ctx.session.role==10){
            if(obj.product_line_id){
				arr.push({
					product_line_id:obj.product_line_id
				})
			}
        }
        if (obj.application_label) {
            /* arr.push({
                application_label: obj.application_label,
            }) */
            arr.push({
                application_label:{[Op.like]:`%${obj.application_label}%`}
            })
        }
        if (obj.platform_business) {
            arr.push({
                platform_business: obj.platform_business,
            })
        }
        arr.push({
            is_interactive: obj.is_interactive,
        })
        var objOption = {
            [Op.or]: [{
                platform_app: { [Op.like]: `%${obj.keyword}%` }
            }, {
                platform_app_code: { [Op.like]: `%${obj.keyword}%` }
            }],
            [Op.and]: arr
        }
        try {
            await this.Application.findAndCountAll({
                where: objOption,
                order: [
                    ['create_time', 'DESC'] //降序desc，升序asc
                ],
                limit: parseInt(obj.pageSize),
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
    async useful(id) {
        try {
            const result = await this.Application.findOne({
                where: { application_id: id },
            });
            if (!result) {
                return this.ServerResponse.requireData('应用不存在', { code: 1 });
            }
            var sj = 0;
            var str = '';
            if (result.application_use == 0) {
                sj = 1;
                str = '启用'
            } else {
                sj = 0;
                str = '停用'
            }
            const row = await this.Application.update({
                application_use: sj,
            }, { where: { application_id: id }, individualHooks: true });

            if (row) {
                return this.ServerResponse.requireData(`${str}成功`);
            } else {
                return this.ServerResponse.requireData(`${str}失败`, { code: 1 });
            }
        } catch (e) {
            return this.ServerResponse.networkError('网络问题');
        }
    }
    async delete(id) {
        const Op = this.app.Sequelize.Op;
        try {
            const result = await this.Application.findOne({
                where: { application_id: id },
            });
            if (!result) {
                return this.ServerResponse.requireData('应用不存在', { code: 1 });
            }
            if (result.application_label) {
                var temp=result.application_label.split(',');
                this.ctx.helper.calcLabelNumber(temp,Op,this.TheLabel,'redu')
            } 
            const arr = await this.Report.findAll({
                where: { application_id: id },
            });
            if (arr.length > 0) {
                return this.ServerResponse.networkError('该应用下存在报表,不支持进行删除的操作');
            }
            /* if (result.application_use == 1) {
                return this.ServerResponse.requireData('应用已启用,不支持进行删除的操作', { code: 1 });
            } */
            const row = await this.Application.destroy({ where: { application_id: id } });
            if (row) {
                return this.ServerResponse.requireData('删除成功', { code: 0 });
            } else {
                return this.ServerResponse.requireData('删除失败', { code: 1 });
            }
        } catch (e) {
            return this.ServerResponse.networkError('网络问题');
        }
    }
}
module.exports = Application;
