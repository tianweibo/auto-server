'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi,world 11eg22g451112';
  }
}

module.exports = HomeController;
