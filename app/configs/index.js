// 通过 process.env.NODE_ENV 判断加载哪个配置文件
const nodeEnv = process.env.NODE_ENV || 'development';
const configFile = `./config.${nodeEnv}`;
module.exports = require(configFile);
