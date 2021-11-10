const  fs = require('fs')
const path = require('path')
const Controller = require('egg').Controller;
const pump = require('mz-modules/pump');
class photo extends Controller {
	constructor(ctx){
		super(ctx);
		this.photo=ctx.service.photo;
	}
  async upload() {
	const stream = await this.ctx.getFileStream(); //获取表单提交的数据
        if (!stream.filename) { //注意如果没有传入图片直接返回   
            return;
        }
        const target = 'app/public/upload/' + path.basename(stream.filename);
        const writeStream = fs.createWriteStream(target);
		await pump(stream, writeStream); //stream.pipe(writeStream);   //可以用， 但是不建议,因为不能处理失败的情况
		const response=await this.photo.updateavat(stream.fields.tplj,stream.fields.userid)
		this.ctx.body=response;
  }
}
module.exports = photo;