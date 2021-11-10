'use strict';
const Controller = require('egg').Controller;
class BasicController extends Controller {
   constructor(ctx){
	super(ctx);
	this.request=ctx.request;
	this.TheBasic=ctx.service.basic;
   }
    async data(){
	  const ctx=this.ctx;
	  const response=await this.TheBasic.data(ctx.query.id);
	  ctx.body=response;
    }
}
module.exports = BasicController;
