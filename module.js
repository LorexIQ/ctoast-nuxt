const {  resolve, join } = require('path')

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
    'plugins/fontawesome.js',
    'components/cToast.vue'
  ]

  for (let plugin of plugins) {
    this.addPlugin({
      src: resolve(__dirname, plugin),
      fileName: join(namespace, plugin),
      options
    })
  }
}

module.exports.meta = require('./package.json')
