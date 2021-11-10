'use strict';
const Controller = require('egg').Controller;
class TheLabel extends Controller {
   constructor(ctx){
	super(ctx);
	this.request=ctx.request;
    this.TheLabel=ctx.service.theLabel;
   }
    async create(){
	  const ctx=this.ctx;
	  const response=await this.TheLabel.create(ctx.request.body);
	  ctx.body=response;
    }
    async update() {
        const ctx = this.ctx;
        const body = ctx.request.body;
        ctx.body = await this.TheLabel.update(ctx.request.body);
    }
    async list(){  //待测试
        const ctx=this.ctx;
        const response=await this.TheLabel.list(ctx.request.body);
        ctx.body=response;
    }
    async listTree(){
        const ctx=this.ctx;
        const response=await this.TheLabel.listTree(ctx.request.body);
        ctx.body=response;
    }
    async findLabelId(){
        const ctx=this.ctx;
        const response=await this.TheLabel.findLabelId(ctx.helper.parseInt(ctx.query.id));
        ctx.body=response;
    }
    async exposeLabel(){
        const ctx=this.ctx;
        const response=await this.TheLabel.exposeLabel(ctx.helper.parseInt(ctx.query.fid));
        ctx.body=response;
    }
    async delete(){  //待测试
        const ctx=this.ctx;
        const response=await this.TheLabel.delete(ctx.helper.parseInt(ctx.query.id));
        ctx.body=response;
    }
    async labelType(){ //待测试
        const ctx=this.ctx;
        const response=await this.TheLabel.labelType();
        ctx.body=response;
    }
}
module.exports = TheLabel;
