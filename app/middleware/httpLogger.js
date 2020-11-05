/**
 * @fileOverview HTTP日志记录中间件
 * @name logger.js
 * @author kiba.x.zhao <kiba.rain@qq.com>
 * @license MIT
 */
'use strict';

const UTF8_ENCODING = 'utf8';

function logInfo(ctx) {

  let msg = `egg-http-logger/middleware: querystring=${ctx.request.querystring},params=${JSON.stringify(ctx.params)},headers=${JSON.stringify(ctx.request.headers)}`;

  let res;

  try {

    if (ctx.request.body !== undefined)
      msg = `${msg},body=${JSON.stringify(ctx.request.body)}`;
    msg = `${msg},resStatus=${ctx.response.status},resHeaders=${JSON.stringify(ctx.response.headers || {})}`;

    res = JSON.stringify(ctx.response.body);
    const buffer = Buffer.from(res, UTF8_ENCODING);
    const maxByteLength = ctx.app.config.httpLogger ? ctx.app.config.httpLogger.maxByteLength : -1;

    if (buffer.byteLength <= 0 || (maxByteLength > 0 && buffer.byteLength >= maxByteLength)) {
      res = null;
    }

  } catch (err) {
    res = undefined;
  } finally {
    ctx.logger.info(res ? `${msg},resBody=${res}` : msg);
  }

}


module.exports = config => {

  return async function(ctx, next) {
    let error;
    try {
      await next();
    } catch (err) {
      error = err;
      ctx.logger.error(err);
    } finally {
      logInfo(ctx);
      if (error)
        throw error;
    }
  };

};
