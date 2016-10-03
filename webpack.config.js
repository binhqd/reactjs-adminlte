const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const TransferWebpackPlugin = require('transfer-webpack-plugin');

const DashboardPlugin = require('webpack-dashboard/plugin');
const DASHBOARD_PORT = 3011;

module.exports = {
  context: __dirname,
  devtool: 'inline-source-map',
  entry: {
    app: [
      'webpack-hot-middleware/client',
      './index.js',
      'jquery',
      'multi-level-menu/css/component.css',
      'multi-level-menu/css/default.css',
      'bootstrap/dist/css/bootstrap.css',
      'base_styles/_global.scss',
      'font-awesome/css/font-awesome.min.css',
      'lib/security.js'
    ]
  },
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  resolve: {
    extensions: [
      '', '.scss', '.js', '.json', '.md'
    ],
    packageMains: [
      'browser', 'web', 'browserify', 'main', 'style'
    ],
    modulesDirectories: [
      'node_modules',
      path.resolve(__dirname, './node_modules')
    ],
    alias: {
      'base_styles': path.resolve(__dirname, './assets/styles/global_styles/'),
      'components': path.resolve(__dirname, './components/'),
      'assets': path.resolve(__dirname, './assets/'),
      'jquery': path.resolve(__dirname, "node_modules") + "/jquery/src/jquery.js",
      'api': path.resolve(__dirname, './api/'),
      'base': path.resolve(__dirname, './'),
      'lib': path.resolve(__dirname, './lib/')
    }
  },
  module: {
    loaders: [
      {
        test: /\.(jpg|jpeg|png|eot|ttf|woff|svg|less)/,
        loader: 'file'
      }, {
        test: /(Josefin)/,
        loader: 'url-loader?limit=100000'
      }, {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'react', 'stage-2']
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
      }, {
        test: /modernizr\.min\.js$/,
        loader: "imports?this=>window,html5=>window.html5!exports?window.Modernizr"
      }
    ]
  },
  postcss: [autoprefixer],
  plugins: [
    new DashboardPlugin({port: DASHBOARD_PORT}),
    // new webpack.ProvidePlugin({
    //   'fetch': 'imports?self=>global,this=>global!exports?global.fetch!isomorphic-fetch'
    // }),
    new webpack.ProvidePlugin({$: "jquery", jquery: "jQuery", "windows.jQuery": "jquery"}),
    new ExtractTextPlugin('docs.css', {allChunks: true}),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({'process.env.NODE_ENV': JSON.stringify('development')})
  ],
  stats: {
    colors: true
  },

  node: {
    global: true,
    process: true,
    Buffer: true,
    __filename: true,
    __dirname: true,
    setImmediate: false
  },
  devServer: {
    port: process.env.PORT || 3000,
    host: '0.0.0.0',
    colors: true,
    publicPath: '/static',
    contentBase: './',
    historyApiFallback: true,
    proxy: [
      // OPTIONAL: proxy configuration:
      // {
      // 	path: '/optional-prefix/**',
      // 	target: 'http://target-host.com',
      // 	rewrite: req => { req.url = req.url.replace(/^\/[^\/]+\//, ''); }   // strip first path segment
      // }
    ]
  }
};
