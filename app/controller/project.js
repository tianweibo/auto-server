'use strict';
const Controller = require('egg').Controller;
class ProjectController extends Controller {
   constructor(ctx){
	super(ctx);
	this.request=ctx.request;
	this.TheProject=ctx.service.project;
   }
    async create(){
	  const ctx=this.ctx;
	  const response=await this.TheProject.create(ctx.request.body);
	  ctx.body=response;
    }
    async update() {
        const ctx = this.ctx;
        const id = ctx.helper.parseInt(ctx.query.id);
        const body = ctx.request.body;
        ctx.body = await this.TheProject.update({ id, updates: body });
    }
    async list(){
        const ctx=this.ctx;
        const response=await this.TheProject.list(ctx.request.body);
        ctx.body=response;
    }
    async detail(){
        const ctx=this.ctx;
        const response=await this.TheProject.detail(ctx.query.id);
        ctx.body=response;
    }
    async delete(){ 
        const ctx=this.ctx;
        const response=await this.TheProject.delete(ctx.helper.parseInt(ctx.query.id));
        ctx.body=response;
    }
}
module.exports = ProjectController;
