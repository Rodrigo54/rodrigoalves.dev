const CopyWebpackPlugin = require('copy-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default

module.exports = [{
  entry: ['./src/scss/app.scss', './src/js/app.js'],
  output: {
    filename: 'static/js/bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'static/css/bundle.css',
            },
          },
          { loader: 'extract-loader' },
          {
            loader: 'css-loader',
            options: {
              includePaths: ['./node_modules']
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
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015'],
          plugins: ['transform-object-assign']
        },
      }
    ]
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: 'src/img/**/*', to: 'static/img/', flatten: true },
    ]),
    new ImageminPlugin({ test: /\.(jpe?g|png|gif|svg)$/i }),
  ]
}];
