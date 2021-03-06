const webpack = require('webpack');
const merge = require('webpack-merge');

const ENV_CONFIG = require('./webpack.env.config.js') ;
const common = require('./webpack.common.config.js');

const config = merge(common, {
    
    devtool: "source-map",

    plugins: [new webpack.DefinePlugin({
        BASE_URL: ENV_CONFIG.baseUrlDev,
      })]
      
})

module.exports = config;