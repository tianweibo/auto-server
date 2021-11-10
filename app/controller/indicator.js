'use strict';
const Controller = require('egg').Controller;
const {indicatorExcel}=require('../common/excelEnum.js')
class IndicatorController extends Controller {
  constructor(ctx){
	super(ctx);
	this.request=ctx.request;
	this.Indicator=ctx.service.indicator;
    this.IndicatorM=ctx.model.Indicator;
    this.BasicData=ctx.model.BasicData;
   }
    async list(){
	  const ctx=this.ctx;
	  const response=await this.Indicator.list(ctx.request.body);
	  ctx.body=response;
    }
    async listById(){
      const ctx=this.ctx;
	  const response=await this.Indicator.listById(ctx.request.body);
	  ctx.body=response;
    }
    async create(){
        const ctx=this.ctx;
        const response=await this.Indicator.create(ctx.request.body);
        ctx.body=response;
    }
    async eventCodesByIndic(){ //获取指标下对应的事件codes
      const ctx=this.ctx;
      const response=await this.Indicator.eventCodesByIndic(ctx.helper.parseInt(ctx.query.id));
      ctx.body=response;
    }
    async update(){
        const ctx=this.ctx;
        const id = ctx.query.id;
        const body = ctx.request.body;
        const response=await this.Indicator.update({ id, updates: body });
        ctx.body=response;
    }
    async detail(){
        const ctx=this.ctx;
        const response=await this.Indicator.detail(ctx.query.id);
        ctx.body=response;
    }
   
    async listByType(){
     const ctx=this.ctx;
	   const response=await this.Indicator.listByType(ctx.request.body);
	   ctx.body=response;
    }
    async archive(){ 
        const ctx=this.ctx;
        const response=await this.Indicator.archive(ctx.helper.parseInt(ctx.query.id));
        ctx.body=response;
    }
    async delete(){ 
        const ctx=this.ctx;
        const response=await this.Indicator.delete(ctx.helper.parseInt(ctx.query.id));
        ctx.body=response;
    }
    async importIndicator() {
     const {ctx,app}=this;
     const file = ctx.request.files[0];
     // 中文表头转换为数据的key值，所使用的的映射map indicatorExcel
    try {
      //每行数据要进行的特殊处理函数
      //处理指标类型
      var indicatorType={}
      var arr=await this.BasicData.findAll({where:{fid:'indicator_type_level'},attributes:['label','value']});
      for(var i=0;i<arr.length;i++){
        indicatorType[arr[i].label]=arr[i].value
      }
      //处理一级指标
	  const Op = app.Sequelize.Op;
      var data=[{fid:'frequency'},{fid:'people'},{fid:'time'},{fid:'retained'},{fid:'retained'}];
      var objOption={
		[Op.or]:data,
	  }
      var indicatorLevel={}
      var arr2=await this.BasicData.findAll({where:objOption,attributes:['label','value']});
      for(var i=0;i<arr2.length;i++){
        indicatorLevel[arr2[i].label]=arr2[i].value
      }
      //处理指标标签
      var indicatorLabel={}
      var arr1=await this.BasicData.findAll({where:{fid:'indicator_label'},attributes:['label','value','is_lower']});
      for(var i=0;i<arr1.length;i++){
        if(arr1[i].is_lower==0){
          var b=await this.BasicData.findAll({where:{fid:arr1[i].value},attributes:['fid','label','value','is_lower']});
          arr1 = arr1.concat(b);
        }
      }
      for(var i=0;i<arr1.length;i++){
        indicatorLabel[arr1[i].label]=arr1[i].value
      }
      const rowTransform = (row) => ({
        ...row,
        indicator_label:ctx.helper.dealMulValue(row.indicator_label,indicatorLabel),
        indicator_type:indicatorType[row.indicator_type],
        indicator_level:indicatorLevel[row.indicator_level],
        indicator_type_label:row.indicator_type,
        indicator_level_label:row.indicator_level,
        indicator_label_label:row.indicator_label
      });
      //indicator_code 的唯一性判定
      var arr=[];
      const userData = ctx.helper.excelData(file, indicatorExcel, rowTransform);
      if(userData.length>0){
        for(var i=0;i<userData.length;i++){
            arr.push({
                indicator_code:{[Op.eq]:userData[i].indicator_code}
            })
        }
        var objOption={
            [Op.or]:arr,
        }
        try{
            const temp=await this.IndicatorM.findAndCountAll({
                where:objOption,
            }).then(function(result){
                if(result.count>0){
                    var str=''
                    for(var i=0;i<result.rows.length;i++){
                        str+=result.rows[i].indicator_code+','
                    } 
                    var obj={
                        num:result.count,
                        str:str
                    }
                    return obj
                }
            })
            if(temp.num>0){
                ctx.body={
                    status:1,
                    msg:`${temp.str}这些指标代码已存在,请核对后再导入`
                } 
                return
            }
        }catch(e){
            //console.log('error')
        }
      }else{
          ctx.body={
            status:1,
            msg:`模板中数据不能为空`
          }
          return
      }
     const response = await this.Indicator.importIndicator(userData);
     ctx.body = response;
      return;
    } catch (error) {
      ctx.badRequest({
        data: {},
        msg: error.errmsg,
      });
    }
  }



}
module.exports = IndicatorController;
