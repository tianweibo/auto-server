'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = '1234567891011hello,world3344552356 111eg22g451112231512';
  }
}

module.exports = HomeController;
