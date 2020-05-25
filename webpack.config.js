const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackTemplate = require('html-webpack-template');
const path = require('path');

let tailwindcss = require('tailwindcss');
let autoprefixer = require('autoprefixer');
let purgecss = require('@fullhuman/postcss-purgecss');

const config = {
  entry: './src/index.js',
  devtool: 'eval-source-map',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: [
          'style-loader',
          { loader: 'css-loader', options: { importLoaders: 1 } },
        ],
      },
      {
        test: /\.(svg)$/,
        exclude: /fonts/, /* dont want svg fonts from fonts folder to be included */
        use: [
          {
            loader: 'svg-url-loader',
            options: {
              noquotes: true,
            },
          },
        ],
      },
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: 'url-loader',
          },
        ],
      }
    ],
  },
  resolve: {
    extensions: ['.js'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: false,
      template: './src/index.html',
      appMountId: 'app',
      links: [
        {
          href: '/src/index.css',
          rel: 'stylesheet',
        },
      ],
    }),
  ],
};

module.exports = config;
