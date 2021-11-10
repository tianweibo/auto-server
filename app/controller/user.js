'use strict';
const Controller = require('egg').Controller;
class UserController extends Controller {
   constructor(ctx){
	super(ctx);
	this.request=ctx.request;
	this.TheUser=ctx.service.user;
   }
    async login(){
	  const ctx=this.ctx;
	  const response=await this.TheUser.login(ctx.request.body);
	  ctx.body=response;
    }
	async dataGift(){
		const ctx=this.ctx;
	  	const response=await this.TheUser.dataGift(ctx.request.body);
	  	ctx.body=response;
	}
	async create(){
		const rule={
			username:{
				type:'username',
			},
			phone:{
				type:'phone',
			}
		}
		const ctx=this.ctx;
		const sj=this.app.validator.validate(rule,ctx.request.body);
		if(sj){
			ctx.body={
				status:1,
				msg:`${sj[0].message}`
			}
			return
		}
		const response=await this.TheUser.create(ctx.request.body);
		ctx.body=response;
	}
	async list(){
		const ctx=this.ctx;
		const response=await this.TheUser.list(ctx.request.body);
		ctx.body=response;
	}
	async update(){
		const ctx=this.ctx;
        const id = ctx.query.id;
        const body = ctx.request.body;
        const response=await this.TheUser.update({ id, updates: body });
        ctx.body=response;
	}
	async detail(){
		const ctx=this.ctx;
        const response=await this.TheUser.detail(ctx.query.id);
        ctx.body=response;
	}
	async delete(){
		const ctx=this.ctx;
        const response=await this.TheUser.delete(ctx.helper.parseInt(ctx.query.id));
        ctx.body=response;
	}
	async loginOut(){
		const ctx=this.ctx;
		const response=await this.TheUser.loginOut();
		ctx.body=response;
	}
	async isLogin(){
		const ctx=this.ctx;
		const response=await this.TheUser.isLogin();
		ctx.body=response;
	}
	async editPassword(){
		const ctx=this.ctx;
		const response=await this.TheUser.editPassword(ctx.request.body);
		ctx.body=response;
	}
	async useful(){ 
        const ctx=this.ctx;
        const response=await this.TheUser.useful(ctx.helper.parseInt(ctx.query.id));
        ctx.body=response;
    }
	async resetPassword(){ 
        const ctx=this.ctx;
        const response=await this.TheUser.resetPassword(ctx.helper.parseInt(ctx.query.id));
        ctx.body=response;
    }
}
module.exports = UserController;
