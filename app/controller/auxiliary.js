'use strict';
const Controller = require('egg').Controller;
class AuxiliaryController extends Controller {
   constructor(ctx){
	super(ctx);
	this.request=ctx.request;
	this.TheAuxiliary=ctx.service.auxiliary;
   }
    async repairData(){
	  const ctx=this.ctx;
	  const response=await this.TheAuxiliary.repairData(ctx.request.body);
	  ctx.body=response;
    }
	async downData(){
	 const ctx=this.ctx;
	  const response=await this.TheAuxiliary.downData(ctx.query.id,ctx.query.flag);
	  ctx.body=response;
	}
}
module.exports = AuxiliaryController;
