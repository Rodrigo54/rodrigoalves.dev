const CopyWebpackPlugin = require('copy-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require('terser-webpack-plugin');
const path = require('path');

module.exports = [
  {
    entry: ['./src/scss/app.scss', './src/js/app.js'],
    output: {
      path: path.resolve(__dirname, 'static'),
      filename: 'js/bundle.js'
    },
    optimization: {
      minimizer: [
        new TerserPlugin({
          cache: true,
          parallel: true,
          extractComments: 'all',
        }),
        new OptimizeCSSAssetsPlugin({
          cssProcessorPluginOptions: {
            preset: ['default', { discardComments: { removeAll: true } }],
          },
        })
      ]
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader'
          }
        },
        {
          test: /\.s[c|a]ss$/,
          use: [
            { loader: 'style-loader' },
            { loader: MiniCssExtractPlugin.loader },
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1
              }
            },
            {
              loader: 'sass-loader',
              options: {
                minimize: true,
                includePaths: ['./node_modules']
              }
            }
          ]
        }
      ]
    },
    plugins: [
      new CopyWebpackPlugin([
        { from: 'src/img/**/*', to: 'img/', flatten: true },
        { from: 'src/videos/**/*', to: 'videos/', flatten: true }
      ]),
      new ImageminPlugin({
        disable: process.env.NODE_ENV !== 'production',
        test: /\.(jpe?g|png|gif|svg)$/i,
        jpegtran: { progressive: true }
      }),
      new MiniCssExtractPlugin({
        filename: 'css/bundle.css'
      })
    ],
    stats: {
      all: false,
      assets: true,
      modules: true,
      maxModules: 0,
      errors: true,
      warnings: true,
      moduleTrace: true,
      errorDetails: true
    }
  }
];
