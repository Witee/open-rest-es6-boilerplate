#! /usr/bin/env node

const U = require('./app/lib/utils');
const config = require('./app/configs');
const getter = require('open-rest-helper-getter');
const assert = require('open-rest-helper-assert');
const rest = require('open-rest-helper-rest');
const params = require('open-rest-helper-params');

// 配置 redis 缓存
const cache = config.cache || {};
U.cached.init(cache.port, cache.host, cache.opts);

// 生产环境中的配置
if (U.isProd) {
  U.rest.utils.logger = U.bunyan.createLogger(config.logger);
  U.logger = U.bunyan.createLogger(config.logger);
}

// 注册插件、启动服务
U.rest
  .plugin(U.openRestWithMysql)
  .plugin(getter, assert, rest, params)
  .plugin(() => {
    U.model = U.rest.utils.model;
  })
  .start(`${__dirname}/app`, (error) => {
    if (error) {
      U.logger.error(error);
      process.exit();
    }
    U.logger.info(`Open-rest api served at: http://localhost:${config.service.port}`);
  });
