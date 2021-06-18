/**
 * @fileOverview 日志记录
 * @name logger.js
 * @author kiba.x.zhao <kiba.rain@qq.com>
 * @license MIT
 */
'use strict';

const MW_NAME = 'httpLogger';
const BODY_PARSER = 'bodyParser';
const UTF8_ENCODING = 'utf8';
/**
 * 安装中间件
 * @param {EggApplication} app
 */
function setupMiddleware(app) {

  const index = app.config.coreMiddleware.indexOf(BODY_PARSER);
  if (index === -1) {
    app.config.coreMiddleware.push(MW_NAME);
  } else {
    app.config.coreMiddleware.splice(index + 1, 0, MW_NAME);
  }

}

/**
 * 安装HttpClient
 * @param {EggApplication} app
 */
function setupHttpClient(app) {

  app.httpclient.on('response', onHttpClientRepnoseLogger.bind(this));

}

/**
 * httpClient日志记录
 * @param {Context} ctx
 * @param {Request} req
 * @param {Response} res
 */
function onHttpClientRepnoseLogger({ req, res }) {

  const app = this;
  let msg = `egg-http-logger/httpclient: method=${req.options.method},url=${req.url},headers=${JSON.stringify(req.args.headers)}`;

  let resBody;
  try {

    if (req.args.data !== undefined) {
      msg = `${msg},body=${JSON.stringify(req.args.data)}`;
    }
    msg = `${msg},resStatus=${res.status},resHeaders=${JSON.stringify(res.headers || {})}`;

    resBody = JSON.stringify(res.data);
    const buffer = Buffer.from(resBody, UTF8_ENCODING);
    const maxByteLength = app.config.httpLogger ? app.config.httpLogger.maxByteLength : -1;
    if (buffer.byteLength <= 0 || (maxByteLength > 0 && buffer.byteLength > maxByteLength)) {
      resBody = null;
    }

  } catch (err) {
    resBody = undefined;
  } finally {
    app.logger.info(resBody ? `${msg},resBody=${resBody}` : msg);
    // if (resBody) {

    //   msg = `${msg},resBody=${resBody}`;
    // }
    // if (ctx)
    //   ctx.logger.info(msg);
    // else
    //   console.info(msg);
  }

}

module.exports = app => {
  setupMiddleware(app);
  setupHttpClient(app);
};
