const path = require('path')
const webpack = require('webpack')

module.exports = {
  context: path.resolve(__dirname),
  entry: {
    runscope: './lib/runscope.js',
    all: './clients/all.js',
    core: './lib/core.js',
  },
  target: 'node',
  resolve: {
    modules: [
      path.resolve(__dirname, '.'),
      path.resolve(__dirname, 'lib'),
      path.resolve(__dirname, 'clients'),
      path.resolve(__dirname, 'node_modules')
    ],
    extensions: ['.js']
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    library: '[name].js',
    libraryTarget: 'commonjs2'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: [
            ["es2015", {modules: false}],
            "es2017",
            'stage-0'
          ],
          plugins: [
            'syntax-dynamic-import',
            'transform-async-to-generator',
            'transform-regenerator',
            'transform-runtime',
            'babel-plugin-transform-object-rest-spread'
          ]
        }
      }
    ]
  }
}
