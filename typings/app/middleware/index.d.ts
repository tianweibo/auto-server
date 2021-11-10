// This file is created by egg-ts-helper@1.25.9
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportAuth = require('../../../app/middleware/auth');
import ExportAuthClass = require('../../../app/middleware/authClass');
import ExportError = require('../../../app/middleware/error');
import ExportParam = require('../../../app/middleware/param');

declare module 'egg' {
  interface IMiddleware {
    auth: typeof ExportAuth;
    authClass: typeof ExportAuthClass;
    error: typeof ExportError;
    param: typeof ExportParam;
  }
}
