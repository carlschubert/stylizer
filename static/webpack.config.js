const webpack = require('webpack');
const HtmlWebPackPlugin = require("html-webpack-plugin");

const config = {
    entry: __dirname + '/js/index.jsx',
    output: {
        path: __dirname + '/dist',
        filename: 'bundle.js',
    },
    resolve: {
        extensions: ['.js', '.jsx', '.css']
    },
    module: {
        rules: [
            {
                test: /\.jsx?/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.html$/,
                use: [
                  {
                    loader: "html-loader"
                  }
                ]
              }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
          template: "./index.html",
          filename: "./index.html"
        })
      ]
};

module.exports = config;