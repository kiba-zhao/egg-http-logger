/**
 * @fileOverview 插件入口
 * @name app.js
 * @author kiba.x.zhao <kiba.rain@qq.com>
 * @license MIT
 */
'use strict';

module.exports = app => {

  require('./lib/logger')(app);

};
