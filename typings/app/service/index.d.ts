// This file is created by egg-ts-helper@1.29.1
// Do not modify this file!!!!!!!!!

import 'egg';
type AnyClass = new (...args: any[]) => any;
type AnyFunc<T = any> = (...args: any[]) => T;
type CanExportFunc = AnyFunc<Promise<any>> | AnyFunc<IterableIterator<any>>;
type AutoInstanceType<T, U = T extends CanExportFunc ? T : T extends AnyFunc ? ReturnType<T> : T> = U extends AnyClass ? InstanceType<U> : U;
import ExportBasic = require('../../../app/service/basic');
import ExportProductLine = require('../../../app/service/productLine');
import ExportUser = require('../../../app/service/user');

declare module 'egg' {
  interface IService {
    basic: AutoInstanceType<typeof ExportBasic>;
    productLine: AutoInstanceType<typeof ExportProductLine>;
    user: AutoInstanceType<typeof ExportUser>;
  }
}
