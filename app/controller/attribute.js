'use strict';
const Controller = require('egg').Controller;
class AttributeController extends Controller {
   constructor(ctx){
	super(ctx);
	this.request=ctx.request;
	this.Attribute=ctx.service.attribute;
   }
    async list(){
	  const ctx=this.ctx;
	  const response=await this.Attribute.list(ctx.request.body);
	  ctx.body=response;
    }
    
    async detail(){
        const ctx=this.ctx;
        const response=await this.Attribute.detail(ctx.request.body);
        ctx.body=response;
    }
    async eventList(){
        const ctx=this.ctx;
        const response=await this.Attribute.eventList(ctx.request.body);
        ctx.body=response;
    }
}
module.exports = AttributeController;
