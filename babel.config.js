const { browserslist } = require('./package.json')

module.exports = function(api) {
  api.cache(true)

  const presets = [
    [
      '@babel/preset-env',
      {
        targets: {
          browsers: browserslist
        }
      }
    ],
    '@babel/typescript'
  ]
  const plugins = [
    [
      'component',
      {
        libraryName: 'element-ui',
        styleLibraryName: 'theme-chalk'
      }
    ],
    '@babel/plugin-transform-runtime',
    '@babel/proposal-object-rest-spread',
    '@babel/plugin-proposal-numeric-separator',
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    '@babel/plugin-transform-typescript'
  ]

  return {
    presets,
    plugins
  }
}
