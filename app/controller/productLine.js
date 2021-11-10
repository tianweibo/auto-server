'use strict';
const Controller = require('egg').Controller;
class ProductController extends Controller {
   constructor(ctx){
	super(ctx);
	this.request=ctx.request;
	this.ProductLine=ctx.service.productLine;
   }
	async create(){
        const ctx=this.ctx;
		const response=await this.ProductLine.create(ctx.request.body);
		ctx.body=response;
	}
	async list(){
		const ctx=this.ctx;
		const response=await this.ProductLine.list(ctx.request.body);
		ctx.body=response;
	}
	async update(){
		const ctx=this.ctx;
        const id = ctx.query.id;
        const body = ctx.request.body;
        const response=await this.ProductLine.update({ id, updates: body });
        ctx.body=response;
	}
	async detail(){
		const ctx=this.ctx;
        const response=await this.ProductLine.detail(ctx.query.id);
        ctx.body=response;
	}
	async delete(){
		const ctx=this.ctx;
        const response=await this.ProductLine.delete(ctx.helper.parseInt(ctx.query.id));
        ctx.body=response;
	}
	async useful(){ 
        const ctx=this.ctx;
        const response=await this.ProductLine.useful(ctx.helper.parseInt(ctx.query.id));
        ctx.body=response;
    }
    async listAll(){
        const ctx=this.ctx;
        const response=await this.ProductLine.listAll();
        ctx.body=response;
    }
    async userListPro(){
        const ctx=this.ctx;
        const response=await this.ProductLine.userListPro(ctx.query.id);
        ctx.body=response;
    }
}
module.exports = ProductController;
