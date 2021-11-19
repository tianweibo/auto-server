// This file is created by egg-ts-helper@1.25.9
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportBasic = require('../../../app/controller/basic');
import ExportHome = require('../../../app/controller/home');
import ExportProductLine = require('../../../app/controller/productLine');
import ExportUser = require('../../../app/controller/user');

declare module 'egg' {
  interface IController {
    basic: ExportBasic;
    home: ExportHome;
    productLine: ExportProductLine;
    user: ExportUser;
  }
}
