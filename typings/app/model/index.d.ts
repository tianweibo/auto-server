// This file is created by egg-ts-helper@1.25.9
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportApplication = require('../../../app/model/application');
import ExportApplicationIndicator = require('../../../app/model/applicationIndicator');
import ExportAttribute = require('../../../app/model/attribute');
import ExportBasicData = require('../../../app/model/basicData');
import ExportCard = require('../../../app/model/card');
import ExportEvent = require('../../../app/model/event');
import ExportEventAttribute = require('../../../app/model/eventAttribute');
import ExportIndicator = require('../../../app/model/indicator');
import ExportIndicatorEvent = require('../../../app/model/indicatorEvent');
import ExportProductLine = require('../../../app/model/productLine');
import ExportReport = require('../../../app/model/report');
import ExportReportBetween = require('../../../app/model/reportBetween');
import ExportTable = require('../../../app/model/table');
import ExportTheLabel = require('../../../app/model/theLabel');
import ExportTrend = require('../../../app/model/trend');
import ExportUser = require('../../../app/model/user');

declare module 'egg' {
  interface IModel {
    Application: ReturnType<typeof ExportApplication>;
    ApplicationIndicator: ReturnType<typeof ExportApplicationIndicator>;
    Attribute: ReturnType<typeof ExportAttribute>;
    BasicData: ReturnType<typeof ExportBasicData>;
    Card: ReturnType<typeof ExportCard>;
    Event: ReturnType<typeof ExportEvent>;
    EventAttribute: ReturnType<typeof ExportEventAttribute>;
    Indicator: ReturnType<typeof ExportIndicator>;
    IndicatorEvent: ReturnType<typeof ExportIndicatorEvent>;
    ProductLine: ReturnType<typeof ExportProductLine>;
    Report: ReturnType<typeof ExportReport>;
    ReportBetween: ReturnType<typeof ExportReportBetween>;
    Table: ReturnType<typeof ExportTable>;
    TheLabel: ReturnType<typeof ExportTheLabel>;
    Trend: ReturnType<typeof ExportTrend>;
    User: ReturnType<typeof ExportUser>;
  }
}
