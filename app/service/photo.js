'use strict';

const Service = require('egg').Service;

class photo extends Service {
  constructor(ctx){
	  super(ctx);
	  this.TheUser=ctx.model.TheUser;
	  this.ResponseCode = ctx.response.ResponseCode;
	  this.ServerResponse = ctx.response.ServerResponse;
  }
  async updateavat(tplj,userid) {
	const thedata=await this.TheUser.update({
		avatar:tplj
	},{
		where:{
			id:userid
		}
	})
	if(thedata[0]==1){
		return this.ServerResponse.createBySuccessMsgAndData('上传成功',tplj);
	}else{
		return this.ServerResponse.createBySuccessMsg('上传失败');
	}
  }
}
module.exports = photo;
