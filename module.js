const {  resolve, join } = require('path')
const { readdirSync } = require('fs')

export default function (moduleOptions) {
  let options = {
    ...moduleOptions,
    ...this.options.cToast
  }

  if (!options.namespace) options.namespace = 'cToast'
  const { namespace } = options

  const plugins = [
    'debug.js',
    'plugins/cToast.js',
    'plugins/eventBus.js',
    'plugins/fontawesome.js'
  ]

  for (let plugin of plugins) {
    this.addPlugin({
      src: resolve(__dirname, plugin),
      fileName: join(namespace, plugin),
      options
    })
  }

  const folders = [
    'components',
    'assets/css'
  ]

  for (let pathString of folders) {
    const path = resolve(__dirname, pathString)
    for (const file of readdirSync(path)) {
      this.addTemplate({
        src: resolve(path, file),
        fileName: join(namespace, pathString, file),
        options
      })
    }
  }
}

module.exports.meta = require('./package.json')
