'use strict';
const Controller = require('egg').Controller;
class ApplicationController extends Controller {
   constructor(ctx){
	super(ctx);
	this.request=ctx.request;
	this.Application=ctx.service.application;
   }
   async exposeCreate(){
    const ctx=this.ctx;
    const response=await this.Application.exposeCreate(ctx.request.body);
    ctx.body=response;
   }
   async exposeList(){
    const ctx=this.ctx;
    const response=await this.Application.exposeList(ctx.query.keyword);
    ctx.body=response;
   }
   async exposeUpdate(){
    const ctx=this.ctx;
    const response=await this.Application.exposeUpdate(ctx.request.body);
    ctx.body=response;
   } 
   async exposeDelete(){ 
    const ctx=this.ctx;
    const response=await this.Application.exposeDelete(ctx.query.id);
    ctx.body=response;
   }  
    async list(){
	  const ctx=this.ctx;
	  const response=await this.Application.list(ctx.request.body);
	  ctx.body=response;
    }
    async create(){
        const ctx=this.ctx;
        const response=await this.Application.create(ctx.request.body);
        ctx.body=response;
    }
    async update(){
        const ctx=this.ctx;
        const id = ctx.query.id;
        const body = ctx.request.body;
        const response=await this.Application.update({ id, updates: body });
        ctx.body=response;
    }
    async detail(){
        const ctx=this.ctx;
        const response=await this.Application.detail(ctx.query.id,ctx.query.open_type);
        ctx.body=response;
    }
    async indicatorNum(){
        const ctx=this.ctx;
        const response=await this.Application.indicatorNum(ctx.query.id);
        ctx.body=response;
    }
    async detailByIndicator(){
        const ctx=this.ctx;
        const response=await this.Application.detailByIndicator(ctx.request.body);
        ctx.body=response;
    }
    async detailByEvent(){
        const ctx=this.ctx;
        const response=await this.Application.detailByEvent(ctx.request.body);
        ctx.body=response;
    }
    async useful(){ 
        const ctx=this.ctx;
        const response=await this.Application.useful(ctx.helper.parseInt(ctx.query.id));
        ctx.body=response;
    }
    async delete(){ 
        const ctx=this.ctx;
        const response=await this.Application.delete(ctx.helper.parseInt(ctx.query.id));
        ctx.body=response;
    }
}
module.exports = ApplicationController;
