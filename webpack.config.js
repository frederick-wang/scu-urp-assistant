require('dotenv').config({
  path: `.env.${process.env.NODE_ENV || 'development'}`
})
const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const webpack = require('webpack')
const { version, description, author, license } = require('./package.json')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin

const banner = `// ==UserScript==
// @name         四川大学综合教务系统助手
// @namespace    https://zhaoji.wang/
// @version      ${version}
// @description  ${description}
// @author       ${author}
// @license      ${license}
// @include      http://202.115.47.141/*
// @include      http://zhjw.scu.edu.cn/*
// @grant        none
// @run-at       document-start
// @icon         https://gitee.com/frederick-wang/scu-urp-assistant/raw/master/icon.png
// @icon64       https://gitee.com/frederick-wang/scu-urp-assistant/raw/master/icon64.png
// ==/UserScript==`

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
module.exports = (env) => {
  const devConfig = {
    devtool: 'inline-source-map',
    devServer: {
      overlay: true,
      disableHostCheck: true
    }
  }
  const prodConfig = {
    optimization: {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          extractComments: {
            condition: 'some',
            banner: banner
          }
        })
      ],
      concatenateModules: true
    }
  }
  return {
    ...(env.development ? devConfig : {}),
    ...(env.production ? prodConfig : {}),
    entry: {
      'scu-urp-assistant.user': './src/scu-urp-assistant.user.ts',
      'scu-urp-assistant-bookmarklet': './src/scu-urp-assistant-bookmarklet.ts'
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env.API_PATH': `'${process.env.API_PATH}'`,
        'process.env.API_PATH_V2': `'${process.env.API_PATH_V2}'`
      }),
      new CleanWebpackPlugin(),
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery'
      }),
      new VueLoaderPlugin(),
      ...(env.analyze ? [new BundleAnalyzerPlugin()] : [])
    ],
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, 'dist')
    },
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: 'vue-loader'
        },
        {
          test: /\.(ts|js)x?$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader'
          }
        },
        {
          test: /\.scss$/i,
          oneOf: [
            // 这条规则应用到 Vue 组件内的
            {
              resourceQuery: /^\?vue/,
              use: [
                'vue-style-loader',
                {
                  loader: 'css-loader', options: {
                    importLoaders: 2,
                    esModule: false
                  }
                },
                'postcss-loader',
                {
                  loader: 'sass-loader',
                  options: {
                    sassOptions: { outputStyle: 'expanded' }
                  }
                }
              ]
            },
            {
              use: [
                'to-string-loader',
                {
                  loader: 'css-loader', options: {
                    importLoaders: 2,
                    esModule: false
                  }
                },
                'postcss-loader',
                {
                  loader: 'sass-loader',
                  options: {
                    sassOptions: {
                      outputStyle: 'expanded'
                    }
                  }
                }
              ]
            }
          ]
        },
        {
          test: /\.css$/i,
          oneOf: [
            // 这条规则应用到 Vue 组件内的
            {
              resourceQuery: /^\?vue/,
              use: [
                'vue-style-loader',
                {
                  loader: 'css-loader', options: {
                    importLoaders: 1,
                    esModule: false
                  }
                },
                'postcss-loader'
              ]
            },
            {
              use: [
                'to-string-loader',
                {
                  loader: 'css-loader', options: {
                    importLoaders: 1,
                    esModule: false
                  }
                },
                'postcss-loader'
              ]
            }
          ]
        },
        {
          test: /\.pug$/i,
          oneOf: [
            // 这条规则应用到 Vue 组件内的 `<template lang="pug">`
            {
              resourceQuery: /^\?vue/,
              use: ['pug-plain-loader']
            },
            // 这条规则应用到 JavaScript 内的 pug 导入
            {
              use: ['babel-loader', 'pug-loader']
            }
          ]
        },
        {
          test: /\.(ttf|eot|woff|woff2)$/i,
          use: 'null-loader'
        }
      ]
    },
    resolve: {
      alias: {
        '@': path.resolve('src')
      },
      extensions: ['.wasm', '.mjs', '.js', '.jsx', '.json', '.ts', '.tsx']
    }
  }
}
