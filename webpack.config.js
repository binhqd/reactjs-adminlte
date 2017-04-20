const webpack = require('webpack');
const path = require('path');

const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const TransferWebpackPlugin = require('transfer-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = require('./constants/config');

const {
  ENV,
  PORT,
  API_URL
} = config;

const sourcePath = path.join(__dirname, './');
const staticsPath = path.join(__dirname, './static');

module.exports = function (env) {
  const nodeEnv = env && env.prod ? 'production' : 'development';
  const isProd = ENV === 'production';

  const envars = {
    NODE_ENV: JSON.stringify(ENV),
    API_URL: JSON.stringify(API_URL),
    PORT: JSON.stringify(PORT)
  };

  const plugins = [
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor'],
      // minChunks: Infinity,
      filename: '[name].bundle.js'
    }),
    new webpack.EnvironmentPlugin(envars),
    new webpack.DefinePlugin({
      'process.env': envars
    }),
    new webpack.NamedModulesPlugin(),
    new ExtractTextPlugin({filename: 'docs.css', allChunks: true})
  ];

  if (isProd) {
    plugins.push(
      new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false
      }),
      new HtmlWebpackPlugin({
        template: path.resolve('./', 'index.production.html'),
        favicon: path.join('assets/images', 'favicon.ico')
      }),
      new webpack.optimize.UglifyJsPlugin({
        sourceMap: true,
        compress: {
          warnings: false,
          screw_ie8: true,
          conditionals: true,
          unused: true,
          comparisons: true,
          sequences: true,
          dead_code: true,
          evaluate: true,
          if_return: true,
          join_vars: true
        },
        output: {
          comments: false
        }
      })
    );
  } else {
    plugins.push(
      new webpack.HotModuleReplacementPlugin()
    );
  }

  return {
    devtool: isProd ? 'source-map' : 'eval',
    context: sourcePath,
    entry: {
      vendor: [
        'babel-polyfill',
        'webpack-hot-middleware/client',


        'jquery',
        'admin-lte/plugins/jQueryUI/jquery-ui.min.js',
        'admin-lte/bootstrap/js/bootstrap.min.js',
        'admin-lte/plugins/morris/morris.min.js',
        'admin-lte/plugins/sparkline/jquery.sparkline.min.js',
        'admin-lte/plugins/knob/jquery.knob.js',
        'moment/moment.js',
        'admin-lte/plugins/daterangepicker/daterangepicker.js',
        'admin-lte/plugins/datepicker/bootstrap-datepicker.js'
      ],
      app: [
        'base/index.js',
        'font-awesome/less/font-awesome.less',
        'admin-lte/bootstrap/css/bootstrap.min.css',
        'admin-lte/dist/css/AdminLTE.min.css',
        'admin-lte/dist/css/skins/_all-skins.min.css',
        //'admin-lte/plugins/iCheck/flat/blue.css',
        'admin-lte/plugins/morris/morris.css',
        'admin-lte/plugins/datepicker/datepicker3.css',
        'admin-lte/plugins/daterangepicker/daterangepicker.css'
      ]
    },
    output: {
      path: path.join(__dirname, 'build'),
      publicPath: isProd ? '/' : '/static',
      filename: 'bundle.js'
    },
    module: {
      rules: [
        {
          test: /\.(ico|jpg|jpeg|png|eot|ttf|woff|svg)/,
          loader: 'file-loader'
        }, {
          test: /\.(js|jsx)$/,
          exclude: /(node_modules)/,
          loader: 'babel-loader',
          query: {
            presets: [['es2015', {
              "modules": false
            }], 'react', 'stage-2'],
            plugins: ['transform-runtime', 'transform-decorators-legacy']
          }
        }, {
          test: /\.less$/,
          //use: ['css-loader', 'less-loader']
          use: ExtractTextPlugin.extract({
            use: [
              'css-loader',
              'less-loader'
            ]
          })
        }, {
          test: /\.(scss|css)$/,
          include: /components\/partials\//,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              {
                loader: 'css-loader',
                options: {
                  modules: true,
                  importLoaders: true,
                  localIdentName: '[name]__[local]___[hash:base64:5]'
                }
              },
              'sass-loader'
            ]
          })
        }, {
          test: /\.(css|scss)$/,
          exclude: /components\/partials\//,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              {
                loader: 'css-loader',
                options: {
                  modules: true,
                  importLoaders: true,
                  localIdentName: '[local]'
                }
              },
              'sass-loader'
            ]
          })
        }, {
          test: /\.(txt)$/,
          loader: 'raw-loader',
          include: path.resolve(__dirname, './components/layout/main/modules')
        }, {
          test: /\.(md)$/,
          loader: ExtractTextPlugin.extract({
            use: [
              'html', 'highlight', 'markdown'
            ]
          })
        }
      ],
      noParse: [/jszip.js$/]
    },
    resolve: {
      extensions: ['.webpack-loader.js', '.web-loader.js', '.loader.js', '.js', '.jsx'],
      alias: {
        'base_styles': path.resolve(__dirname, './assets/styles/global_styles/'),
        'components': path.resolve(__dirname, './components/'),
        'assets': path.resolve(__dirname, './assets/'),
        'jquery': path.resolve(__dirname, "node_modules") + "/jquery/src/jquery.js",
        'api': path.resolve(__dirname, './api/'),
        'base': path.resolve(__dirname, './'),
        'lib': path.resolve(__dirname, './lib/'),
        'jszip': 'xlsx/jszip.js'
      },
      modules: [
        path.resolve(__dirname, 'node_modules'),
        'node_modules',
        sourcePath
      ]
    },

    plugins,

    performance: isProd && {
      //maxAssetSize: 100,
      //maxEntrypointSize: 300,
      hints: 'warning'
    },

    stats: {
      colors: {
        green: '\u001b[32m'
      }
    },
    node: {
      fs: 'empty',
      child_process: 'empty',
      global: true,
      process: true,
      Buffer: true,
      __filename: true,
      __dirname: true,
      setImmediate: false
    },
    externals: [
      {
        "./cptable": "var cptable"
      }
    ],
    devServer: {
      contentBase: './',
      publicPath: '/static',
      historyApiFallback: true,
      host: '0.0.0.0',
      port: PORT,
      compress: isProd,
      inline: !isProd,
      hot: !isProd,
      stats: {
        assets: true,
        children: false,
        chunks: false,
        hash: false,
        modules: false,
        publicPath: false,
        timings: true,
        version: false,
        warnings: true,
        colors: {
          green: '\u001b[32m'
        }
      }
    }
  };
};
