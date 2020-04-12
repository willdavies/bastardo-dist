const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

const env = require('./config/dev.env')

module.exports = {
  mode: 'development',
  entry: './src/app.js',
  output: {
    publicPath: '/'
  },
  watch: true,
  module: {
    rules: [
      { test: /\.js$/, use: 'babel-loader' },
      { test: /\.vue$/, use: 'vue-loader' },
      { test: /\.css$/, use: ['vue-style-loader', 'css-loader']},
      { test: /\.(png|svg|jpg|gif)$/, use: 'file-loader' },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new VueLoaderPlugin(),
    new webpack.DefinePlugin({
      'process.env': env
    }),
  ]
};



