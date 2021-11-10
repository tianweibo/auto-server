// This file is created by egg-ts-helper@1.25.9
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportApplication = require('../../../app/controller/application');
import ExportAttribute = require('../../../app/controller/attribute');
import ExportAuxiliary = require('../../../app/controller/auxiliary');
import ExportBasic = require('../../../app/controller/basic');
import ExportEvent = require('../../../app/controller/event');
import ExportHome = require('../../../app/controller/home');
import ExportIndicator = require('../../../app/controller/indicator');
import ExportPhoto = require('../../../app/controller/photo');
import ExportProductLine = require('../../../app/controller/productLine');
import ExportProject = require('../../../app/controller/project');
import ExportReport = require('../../../app/controller/report');
import ExportTheLabel = require('../../../app/controller/theLabel');
import ExportUser = require('../../../app/controller/user');

declare module 'egg' {
  interface IController {
    application: ExportApplication;
    attribute: ExportAttribute;
    auxiliary: ExportAuxiliary;
    basic: ExportBasic;
    event: ExportEvent;
    home: ExportHome;
    indicator: ExportIndicator;
    photo: ExportPhoto;
    productLine: ExportProductLine;
    project: ExportProject;
    report: ExportReport;
    theLabel: ExportTheLabel;
    user: ExportUser;
  }
}
