// This file is created by egg-ts-helper@1.25.9
// Do not modify this file!!!!!!!!!

import 'egg';
type AnyClass = new (...args: any[]) => any;
type AnyFunc<T = any> = (...args: any[]) => T;
type CanExportFunc = AnyFunc<Promise<any>> | AnyFunc<IterableIterator<any>>;
type AutoInstanceType<T, U = T extends CanExportFunc ? T : T extends AnyFunc ? ReturnType<T> : T> = U extends AnyClass ? InstanceType<U> : U;
import ExportApplication = require('../../../app/service/application');
import ExportAttribute = require('../../../app/service/attribute');
import ExportAuxiliary = require('../../../app/service/auxiliary');
import ExportBasic = require('../../../app/service/basic');
import ExportEvent = require('../../../app/service/event');
import ExportIndicator = require('../../../app/service/indicator');
import ExportPhoto = require('../../../app/service/photo');
import ExportProductLine = require('../../../app/service/productLine');
import ExportProject = require('../../../app/service/project');
import ExportReport = require('../../../app/service/report');
import ExportTheLabel = require('../../../app/service/theLabel');
import ExportUser = require('../../../app/service/user');

declare module 'egg' {
  interface IService {
    application: AutoInstanceType<typeof ExportApplication>;
    attribute: AutoInstanceType<typeof ExportAttribute>;
    auxiliary: AutoInstanceType<typeof ExportAuxiliary>;
    basic: AutoInstanceType<typeof ExportBasic>;
    event: AutoInstanceType<typeof ExportEvent>;
    indicator: AutoInstanceType<typeof ExportIndicator>;
    photo: AutoInstanceType<typeof ExportPhoto>;
    productLine: AutoInstanceType<typeof ExportProductLine>;
    project: AutoInstanceType<typeof ExportProject>;
    report: AutoInstanceType<typeof ExportReport>;
    theLabel: AutoInstanceType<typeof ExportTheLabel>;
    user: AutoInstanceType<typeof ExportUser>;
  }
}
