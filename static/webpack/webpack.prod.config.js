const webpack = require('webpack');
const merge = require('webpack-merge');

const common = require('./webpack.common.config.js');
const ENV_CONFIG = require('./webpack.env.config.js') ;

module.exports = merge(common, {
    plugins: [new webpack.DefinePlugin({
        BASE_URL: ENV_CONFIG.baseUrlProd,
      })]
      
})
