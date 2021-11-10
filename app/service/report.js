'use strict';
const Service = require('egg').Service;
const sd = require('silly-datetime');
class Report extends Service {
    constructor(ctx) {
        super(ctx);
        this.Report = ctx.model.Report;
        this.ReportBetween = ctx.model.ReportBetween;
        this.Card = ctx.model.Card;
        this.Application = ctx.model.Application;
        this.Table = ctx.model.Table;
        this.Trend = ctx.model.Trend;
        this.ResponseCode = ctx.response.ResponseCode;
        this.ServerResponse = ctx.response.ServerResponse;
        this.enumObj1 = {
            'card_ids': this.Card,
            'table_ids': this.Table,
            'trend_ids': this.Trend
        }
        this.enumObj2 = {
            'card_ids': 'card_id',
            'table_ids': 'table_id',
            'trend_ids': 'trend_id'
        }
        this.enumObj3 = {
            'card_ids': ['indicator_id','indicator_name','indicator_show_name','indicator_desc','time_dimension','time_dimension_label','sequential','indicator_level','indicator_level_label','events','show_type'],
            'table_ids':['indicator_id','indicator_name','indicator_show_name','indicator_desc','time_dimension','time_dimension_label','is_import','events','show_type'],
            'trend_ids': ['indicator_id','indicator_name','indicator_show_name','indicator_desc','time_scope','time_scope_label','events','show_type']
        }
    }
    async checkName(name){
        try{
            const hasReport = await this.Report.findOne({
                where: {
                    report_name: name
                }
            })
            if(hasReport){
                return this.ServerResponse.requireData('该报表名称已存在，请重新输入',{ code: 1 })
            }else{
                return this.ServerResponse.createBySuccessMsgAndData('不存在重名，可以使用', { code: 0 })
            }
        }catch(e){
            return this.ServerResponse.networkError('网络问题');
        }
    }
    async update(data) {
        const { ctx, app } = this;
        const Op = app.Sequelize.Op;
        try {
            var obj = data.updates;
            obj.reportInfo['update_people'] = this.ctx.session.username;
            obj.reportInfo['update_time'] = sd.format(new Date(), 'YYYY-MM-DD HH:mm:ss');
            obj.reportInfo['product_line_id']=ctx.session.productid;
			obj.reportInfo['product_line_name']=ctx.session.productname;
            const thedata = await this.Report.update(obj.reportInfo, {
                where: {
                    report_id: ctx.helper.parseInt(data.id)
                }
            })
            if (thedata) {
                
                var obj = data.updates;
                var reportBetween = await this.ReportBetween.findOne({
                    where: {
                        report_id: ctx.helper.parseInt(data.id)
                    },
                    attributes: ['card_ids', 'table_ids', 'trend_ids']
                })
                for (let key in obj) {
                    if (key != 'reportInfo') {
                        var theObj = {};
                        var ids = await this.enumObj1[key].bulkCreate(obj[key], { updateOnDuplicate: this.enumObj3[key] });

                        if (ids.length > 0) {
                            var newIds = [];
                            for (var i = 0; i < ids.length; i++) {
                                if(ids[i][this.enumObj2[key]]){
                                    newIds.push(ids[i][this.enumObj2[key]])
                                }
                            }
                            await this.ReportBetween.update({
                                [key]: newIds.join(','),
                            }, { where: { report_id: ctx.helper.parseInt(data.id) }, individualHooks: true });
                        }
                    }
                }
            } else {
                return this.ServerResponse.networkError('网络问题');
            }
            return this.ServerResponse.createBySuccessMsgAndData('编辑成功', { code: 0 })
        } catch (e) {
            console
            return this.ServerResponse.networkError('网络问题');
        }
    }
    async deleteTable(data) {
        /* var data = {
            type: 'card_ids',
            id: '1'
        }; */
        try{
            var enumObj1 = {
                'card': this.Card,
                'table': this.Table,
                'trend': this.Trend
            }
            var enumObj2 = {
                'card': 'card_id',
                'table': 'table_id',
                'trend': 'trend_id'
            }
            var key1=enumObj2[data.type]
            var theObj={}
            theObj[key1]=data.id
            const hasData = await enumObj1[data.type].findOne({
                where:theObj
            })
            if(hasData){
                const row = await enumObj1[data.type].destroy({ where:theObj });
                if (row) {
                    return this.ServerResponse.requireData('删除成功', { code: 0 });
                } else {
                    return this.ServerResponse.requireData('删除失败', { code: 1 });
                }
            }else{
                return this.ServerResponse.networkError('新增数据，不用删除');
            }
        }catch(e){
            return this.ServerResponse.requireData('网络问题', { code: 1 });
        }
    }
    async seeReport(data){
        var temp={
            viewId: 26, 
            groups: [
                    "APPLICATION_DEP_PLATFORM",
                    "PLATFORM_APP_CODE",
                    "PLATFORM_BUSINESS",
                
                    
                    "DAY_ID",
                    "ACT_ID",
                    "EVENT_CODE"
                ],
            aggregators: [
                    {
                        column: "DISTINCT_ID",
                        func: "count"
                    },
                    {
                        column: "DISTINCT_ID",
                        func: "COUNTDISTINCT"
                    }
            ],
            filters: [
                
                {
                    type: "relation",
                    value: "and",
                    children: [
                        {
                            name: "DAY_ID",
                            type: "filter",
                            value: "'2021-07-01'",
                            operator: ">=",
                            sqlType: "VARCHAR"
                        },
                        {
                            name: "DAY_ID",
                            type: "filter",
                            value: "'2021-09-30'",
                            operator: "<=",
                            sqlType: "VARCHAR"
                        }
                    ]
                }
            ],
                orders: [],
                pageNo: 0,
                pageSize: 1,
                nativeQuery: false,
                limit: null,
                cache: false,
                expired: 0,
                flush: false
            }
            var option={
                method:'POST',
                data:temp,
                headers:{//自定义header
                    "Accept": "*/*",
                    "Content-Type":"application/json"
                },
                rejectUnauthorized: false,
                dataType:'json'
            }
        var data = await this.ctx.curl('https://test-open-gateway.enbrands.com/erlang/views/getAggregData',option);
        return this.ServerResponse.requireData('查询成功', data.data.data.resultList);
    }
    async create(data) {
        const { ctx, app } = this;
        const Op = app.Sequelize.Op;
        try {
            var obj = data.updates;
            obj.reportInfo.create_people = this.ctx.session.username;
            obj.reportInfo.application_id = ctx.helper.parseInt(data.id);
            obj.reportInfo.product_line_id=ctx.session.productid;
			obj.reportInfo.product_line_name=ctx.session.productname;
            const thedata = await this.Report.create(obj.reportInfo);
            var theObj = {
                report_id: thedata.dataValues.report_id,
                card_ids: null,
                table_ids: null,
                trend_ids: null
            }
            await this.ReportBetween.create(theObj);
            var obj = data.updates;
            for (let key in obj) {
                if (key != 'reportInfo') {
                    var ids = await this.enumObj1[key].bulkCreate(obj[key], { updateOnDuplicate: [this.enumObj2[key]] });
                    if (ids.length > 0) {
                        var newIds = [];
                        for (var i = 0; i < ids.length; i++) {
                            newIds.push(ids[i][this.enumObj2[key]])
                        }
                        await this.ReportBetween.update({
                            [key]: newIds.join(','),
                        }, { where: { report_id: thedata.dataValues.report_id }, individualHooks: true });
                    }
                }
            }
            return this.ServerResponse.createBySuccessMsgAndData('创建成功', { code: 0 })
        } catch (e) {
            return this.ServerResponse.networkError('网络问题');
        }
    }
    async detail(report_id) {
        //api/application/detail   通过应用ID获取 应用的数据和指标的列表
        const { ctx, app } = this;
        const Op = app.Sequelize.Op;
        try {
            var reportInfo = await this.Report.findOne({
                where: {
                    report_id: report_id
                }
            })
            if (!reportInfo) {
                return this.ServerResponse.networkError('报表不存在');
            }
            var reportBetweenInfo = await this.ReportBetween.findOne({
                where: {
                    report_id: report_id
                },
                attributes: ['card_ids', 'table_ids', 'trend_ids']
            })
            var temp = {
                card_ids:[],
                table_ids:[],
                trend_ids:[],
                reportInfo:{}
            };
            if (reportBetweenInfo) {
                var obj = reportBetweenInfo.dataValues;
                for (let key in obj) {
                    if (obj[key]) {
                        var ids = obj[key].split(',');
                        var dataArr = [];
                        for (var i = 0; i < ids.length; i++) {
                            var theObj = {};
                            theObj[this.enumObj2[key]] = ids[i];
                            dataArr.push(theObj)
                        }
                        var objOption = {
                            [Op.or]: dataArr,
                        }
                        var dataList1= await this.enumObj1[key].findAll({
                            where: objOption,
                        })
                        var dataList=[]
                        for(var z=0;z<ids.length;z++){
                            for(var h=0;h<dataList1.length;h++){
                                if(ids[z]==dataList1[h][this.enumObj2[key]]){
                                    dataList.push(dataList1[h]);
                                    break;
                                }
                            }
                        }
                        temp[key] = dataList
                    } else {
                        temp[key] = []
                    }
                }
            }
            temp['reportInfo'] = reportInfo;
            return this.ServerResponse.createBySuccessMsgAndData('获取详情成功', temp)
        } catch (e) {
            return this.ServerResponse.networkError('网络问题');
        }
    }
    async list(obj) {
        var list = {
            count: 0,
            arr: [],
        }
        const { ctx, app } = this;
        const Op = app.Sequelize.Op;
        var arr = [];
        if(ctx.session.role==1){
			arr.push({
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
            arr.push({
                application_label:{[Op.like]:`%${obj.application_label}%`}
            })
        }
        if (obj.application_dep_platform) {
            arr.push({
                application_dep_platform: obj.application_dep_platform,
            })
        }
        var objOptionReport = {
            [Op.or]: [{
                report_name: { [Op.like]: `%${obj.report_keyword}%` }
            }, {
                report_id: { [Op.like]: `%${obj.report_keyword}%` }
            }]
        }
        var objOptionApp = {
            [Op.or]: [{
                platform_app: { [Op.like]: `%${obj.application_keyword}%` }
            }, {
                platform_app_code: { [Op.like]: `%${obj.application_keyword}%` }
            }],
            [Op.and]: arr
        }
        var objOptionApp = {
            [Op.or]: [{
                platform_app: { [Op.like]: `%${obj.application_keyword}%` }
            }, {
                application_id: { [Op.like]: `%${obj.application_keyword}%` }
            }],
            [Op.and]: arr
        }
        await this.Report.findAndCountAll({
            where: objOptionReport,
            order: [
                ['create_time', 'DESC'] //降序desc，升序asc
            ],
            limit: parseInt(obj.pageSize),
            offset: parseInt((obj.pageNo - 1) * obj.pageSize),
            attributes: ['report_id', 'report_name', 'create_time'],
            include: [{
                model: this.Application,
                where: objOptionApp,
                attributes: ['application_id', 'platform_app_version', 'platform_app', 'application_dep_platform_label', 'application_label_label', 'platform_app_code', 'application_type_label']
            }],
            raw: true,
        }).then(function (result) {
            list.count = result.count;
            var arr = [];
            var temp = result.rows
            for (var i = 0; i < temp.length; i++) {
                var obj = {
                    report_id: temp[i].report_id,
                    report_name: temp[i].report_name,
                    create_time: sd.format(temp[i].create_time, 'YYYY-MM-DD HH:mm:ss'),
                    application_id: temp[i]['application.application_id'],
                    platform_app_version: temp[i]['application.platform_app_version'],
                    platform_app: temp[i]['application.platform_app'],
                    application_dep_platform_label: temp[i]['application.application_dep_platform_label'],
                    application_label_label: temp[i]['application.application_label_label'],
                    platform_app_code: temp[i]['application.platform_app_code'],
                    application_type_label: temp[i]['application.application_type_label']
                }
                arr.push(obj)
            }
            list.arr = arr;
        })
        return this.ServerResponse.requireData('查询成功', list);
    }
    async delete(id) {
        const Op = this.app.Sequelize.Op;
        try {
            const result = await this.Report.findOne({
                where: { report_id: id },
            });
            if (!result) {
                return this.ServerResponse.requireData('报表不存在', { code: 1 });
            }
            var reportBetween = await this.ReportBetween.findOne({
                where: {
                    report_id: id
                },
                attributes: ['card_ids', 'table_ids', 'trend_ids']
            })
            var obj = { card_ids: null, table_ids: null, trend_ids: null }
            for (let key in obj) {
                if (key != 'reportInfo') {
                    var theObj = {};
                    if (reportBetween && reportBetween.dataValues[key]) {
                        var deleteIds = reportBetween.dataValues[key].split(',');
                        theObj[this.enumObj2[key]] = { [Op.in]: deleteIds };
                        await this.enumObj1[key].destroy({ where: theObj })
                    }
                }
            }
            const temp = await this.ReportBetween.destroy({ where: { report_id: id } });
            const row = await this.Report.destroy({ where: { report_id: id } });
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
module.exports = Report;
