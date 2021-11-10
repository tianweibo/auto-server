'use strict';
const Controller = require('egg').Controller;
const {eventExcel}=require('../common/excelEnum.js')
class EventController extends Controller {
   constructor(ctx){
	super(ctx);
	this.request=ctx.request;
	this.Event=ctx.service.event;
    this.EventM=ctx.model.Event;
    this.BasicData=ctx.model.BasicData;
    this.Attribute=ctx.model.Attribute;
   }
    async list(){
	  const ctx=this.ctx;
	  const response=await this.Event.list(ctx.request.body);
	  ctx.body=response;
    }
    async listById(){
      const ctx=this.ctx;
	  const response=await this.Event.listById(ctx.request.body);
	  ctx.body=response;
    }
    async create(){
        const ctx=this.ctx;
        const response=await this.Event.create(ctx.request.body);
        ctx.body=response;
    }
    async update(){
        const ctx=this.ctx;
        const id = ctx.query.id;
        const body = ctx.request.body;
        const response=await this.Event.update({ id, updates: body });
        ctx.body=response;
    }
    async detail(){
        const ctx=this.ctx;
        const response=await this.Event.detail(ctx.query.id);
        ctx.body=response;
    }
    async indicByEventId(){
      const ctx=this.ctx;
      const response=await this.Event.indicByEventId(ctx.query.id);
      ctx.body=response;
    }
    async archive(){ 
        const ctx=this.ctx;
        const response=await this.Event.archive(ctx.helper.parseInt(ctx.query.id));
        ctx.body=response;
    }
    async delete(){ 
        const ctx=this.ctx;
        const response=await this.Event.delete(ctx.helper.parseInt(ctx.query.id));
        ctx.body=response;
    }
   
    async importEvent() {
	// 获取文件对象
   // const ctx=this.ctx;
    const {ctx,app}=this;
    const file = ctx.request.files[0];
    // 中文表头转换为数据的key值，所使用的的映射map eventExcel
    try {
      // 每行数据要进行的特殊处理函数
      //触发类型
      var arr=await this.BasicData.findAll({where:{fid:'event_trigger_mode'},attributes:['label','value']});
      var triggerMode={}
      for(var i=0;i<arr.length;i++){
        triggerMode[arr[i].label]=arr[i].value
      }
      //事件标签
      var arr1=await this.BasicData.findAll({where:{fid:'event_label'},attributes:['label','value','is_lower']});
      for(var i=0;i<arr1.length;i++){
        if(arr1[i].is_lower==0){
          var b=await this.BasicData.findAll({where:{fid:arr1[i].value},attributes:['fid','label','value','is_lower']});
          arr1 = arr1.concat(b);
        }
      }
      var eventLabelList={};
      for(var i=0;i<arr1.length;i++){
        eventLabelList[arr1[i].label]=arr1[i].value
      }
      //属性 
      var generalAttr={}
      var arr2=await this.Attribute.findAll({attributes:['attribute_name','attribute_code']});
      for(var i=0;i<arr2.length;i++){
        generalAttr[arr2[i].attribute_name]=arr2[i].attribute_code
      }
      const rowTransform = (row) => ({
        ...row,
       //general_attr: row.general_attr.toString(),
       //event_label:eventLabelList[row.event_label],
       event_label:ctx.helper.dealMulValue(row.event_label,eventLabelList),
       event_trigger_mode:triggerMode[row.event_trigger_mode],
       general_attr:ctx.helper.dealMulValue(row.general_attr,generalAttr),
       event_label_label:row.event_label,
       event_trigger_mode_label:row.event_trigger_mode
      });
      //event_code 的唯一性判定
      const Op = app.Sequelize.Op;
      var arr=[];
      const userData = ctx.helper.excelData(file, eventExcel, rowTransform);
      
      if(userData.length>0){
        for(var i=0;i<userData.length;i++){
            arr.push({
                event_code:{[Op.eq]:userData[i].event_code}
            })
        }
        var objOption={
            [Op.or]:arr,
        }
        try{
            const temp=await this.EventM.findAndCountAll({
                where:objOption,
            }).then(function(result){
                if(result.count>0){
                    var str=''
                    for(var i=0;i<result.rows.length;i++){
                        str+=result.rows[i].event_code+','
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
                    msg:`${temp.str}这些事件代码已存在,请核对后再导入`
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
     const response = await this.Event.importEvent(userData);
     ctx.body = response;
      return;
    } catch (error) {
      ctx.badRequest({
        data: {},
        msg: error.msg,
      });
    }
  }
}
module.exports = EventController;
