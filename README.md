# egg-http-logger #
基于[eggjs](https://eggjs.org/zh-cn/index.html)的http请求日志记录插件.

## 安装 ##
```bash
npm install git://github.com/kiba-zhao/egg-http-logger.git --save
```

## 启用 ##
设置启用plugin: `config/plugin.js`
```javascript
exports.httpLogger = {
  enable:true,
  package:'egg-http-logger'
};
```

## 配置 (可选) ##
配置响应内容记录阀值: `config/config.default.js`

> 响应内容数据大小达到阀值，日志只会记录响应内容以外的数据信息．

```javascript
exports.httpLogger = {
    maxByteLength: 8192
};

```
