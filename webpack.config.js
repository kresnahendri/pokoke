/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-var-requires */
// eslint-disable-next-line import/no-extraneous-dependencies
const createExpoWebpackConfig = require("@expo/webpack-config");

module.exports = function (env, argv) {
  env.mode = "development";
  const config = createExpoWebpackConfig(env, argv);
  return config;
};
