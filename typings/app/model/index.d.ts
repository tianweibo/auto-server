// This file is created by egg-ts-helper@1.25.9
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportBasicData = require('../../../app/model/basicData');
import ExportProductLine = require('../../../app/model/productLine');
import ExportUser = require('../../../app/model/user');

declare module 'egg' {
  interface IModel {
    BasicData: ReturnType<typeof ExportBasicData>;
    ProductLine: ReturnType<typeof ExportProductLine>;
    User: ReturnType<typeof ExportUser>;
  }
}
