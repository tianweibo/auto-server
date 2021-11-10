'use strict';

const Service = require('egg').Service;
class Basic extends Service {
  constructor(ctx) {
    super(ctx);
    this.BasicData = ctx.model.BasicData;
    this.ResponseCode = ctx.response.ResponseCode;
    this.ServerResponse = ctx.response.ServerResponse;
  }
  async data(id) {
    try {
      var arr = await this.BasicData.findAll({ where: { fid: id }, attributes: ['fid', 'label', 'value', 'is_lower'] });
      for (var i = 0; i < arr.length; i++) {
        if (arr[i].is_lower == 0) {
          arr[i].children = await this.BasicData.findAll({ where: { fid: arr[i].value }, attributes: ['fid', 'label', 'value', 'is_lower'] });
        }
      }
      return this.ServerResponse.requireData('查询成功', arr);
    } catch (e) {
      return this.ServerResponse.networkError('网络问题');
    }
  }
}
module.exports = Basic;
