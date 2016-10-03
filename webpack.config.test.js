const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const TransferWebpackPlugin = require('transfer-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  resolve: {
    extensions: ['', '.scss', '.js', '.json', '.md'],
    packageMains: ['browser', 'web', 'browserify', 'main', 'style'],
    modulesDirectories: [
      'node_modules',
      path.resolve(__dirname, './node_modules')
    ],
    alias: {

    }
  },
  target: 'node',
  node: {
    global: true,
    process: true,
    Buffer: true,
    __filename: true,
    __dirname: true,
    setImmediate: false
  },
  module: {
    exprContextRegExp: /$^/,
    exprContextCritical: false,
    loaders: [
      { test: /\.(jpg|jpeg|png|eot|ttf|woff|svg|less)/, loader: 'file' },
      { test: /(Josefin)/, loader: 'url-loader?limit=100000' },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: 'babel',
        query: {
          presets:[ 'es2015', 'react', 'stage-2' ]
        }
      }, {
        test: /\.(scss|css)$/,
        include: /components\/partials\//,
        loader: ExtractTextPlugin.extract("style", "css?sourceMap&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss!sass?sourceMap")
      }, {
        test: /\.(scss|css)$/,
        exclude: /components\/partials\//,
        loader: ExtractTextPlugin.extract("style", "css?sourceMap&modules&importLoaders=1&localIdentName=[local]!postcss!sass?sourceMap")
      }, {
        test: /\.(txt)$/,
        loader: 'raw',
        include: path.resolve(__dirname, './components/layout/main/modules')
      }, {
        test: /\.(md)$/,
        loader: ExtractTextPlugin.extract('html!highlight!markdown')
      },
      {
        test: /modernizr\.min\.js$/,
        loader: "imports?this=>window,html5=>window.html5!exports?window.Modernizr"
      }, {
        test: /\.json$/,
        loader: "json"
      }
    ]
  },
  externals: {
    // require("jquery") is external and available
    //  on the global var jQuery
    "jquery": "jQuery"
  },
  postcss: [autoprefixer],
  plugins: [
    new webpack.ProvidePlugin({
      'fetch': 'imports?self=>global,this=>global!exports?global.fetch!node-fetch'
    }),
    new ExtractTextPlugin('docs.css', { allChunks: true }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('test')
    }),
    new webpack.NoErrorsPlugin(),

    new HtmlWebpackPlugin({
        template: path.resolve('./', 'index.html'),
        webpackDevServer: '/webpack-dev-server.js'
    })
  ]
};
