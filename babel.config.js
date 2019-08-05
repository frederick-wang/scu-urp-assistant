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
    '@babel/plugin-transform-runtime',
    '@babel/proposal-class-properties',
    '@babel/proposal-object-rest-spread',
    '@babel/plugin-proposal-numeric-separator'
  ]

  return {
    presets,
    plugins
  }
}
