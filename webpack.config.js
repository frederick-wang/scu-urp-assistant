const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const webpack = require('webpack')
const { version, description, author } = require('./package.json')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

const banner = `// ==UserScript==
// @name         四川大学综合教务系统助手
// @namespace    http://zhaoji.wang/
// @version      ${version}
// @description  ${description}
// @author       ${author}
// @include      http://202.115.47.141/*
// @include      http://zhjw.scu.edu.cn/*
// @grant        none
// @run-at       document-start
// ==/UserScript==`

module.exports = {
  mode: 'production',
  entry: {
    'scu-urp-assistant.user': './src/scu-urp-assistant.user.ts',
    'scu-urp-assistant-bookmarklet': './src/scu-urp-assistant-bookmarklet.ts'
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.BannerPlugin({ banner }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    }),
    new VueLoaderPlugin()
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
              { loader: 'css-loader', options: { importLoaders: 2 } },
              'postcss-loader',
              {
                loader: 'sass-loader',
                options: {
                  outputStyle: 'expanded'
                }
              }
            ]
          },
          {
            use: [
              'to-string-loader',
              { loader: 'css-loader', options: { importLoaders: 2 } },
              'postcss-loader',
              {
                loader: 'sass-loader',
                options: {
                  outputStyle: 'expanded'
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
              { loader: 'css-loader', options: { importLoaders: 1 } },
              'postcss-loader'
            ]
          },
          {
            use: [
              'to-string-loader',
              { loader: 'css-loader', options: { importLoaders: 1 } },
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
      }
    ]
  },
  resolve: {
    alias: { '@': path.resolve('src') },
    extensions: ['.wasm', '.mjs', '.js', '.jsx', '.json', '.ts', '.tsx']
  }
}
