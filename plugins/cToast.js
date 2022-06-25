import Vue from "vue";
import cToast from "../components/cToast.vue"
import { eventBus } from './eventBus'

const options = JSON.parse(`<%= JSON.stringify(options) %>`)
let init = false

const CToast = {
  install(Vue) {
    const defaultKeys = [
      'info',
      'error',
      'show',
      'replace',
      'delete',
      'clear',
    ]
    function dataIsString (data) {
      try {
        if (typeof data !== 'string') {
          throw new Error('typeof data ctoast is not string')
        }
        return true
      } catch (err) {
        console.error(err)
        return false
      }
    }
    Vue.prototype.$ctoast = function (data, args={}) {
      if (dataIsString(data)) {
        eventBus.$emit('create-toast', {
          title: data,
          ...(args.delay !== undefined && { delay: args.delay }),
          ...(args.name && { name: args.name })
        })
      }
    }
    Vue.prototype.$ctoast.info = function (data, args={}) {
      if (dataIsString(data)) {
        eventBus.$emit('create-toast', {
          title: data,
          type: 'info',
          ...(args.delay !== undefined && { delay: args.delay }),
          ...(args.name && { name: args.name })
        })
      }
    }
    Vue.prototype.$ctoast.error = function (data, args={}) {
      if (dataIsString(data)) {
        eventBus.$emit('create-toast', {
          title: data,
          type: 'error',
          ...(args.delay !== undefined && { delay: args.delay }),
          ...(args.name && { name: args.name })
        })
      }
    }

    Vue.prototype.$ctoast.show = function (data) {
      eventBus.$emit('create-toast', data)
    }
    Vue.prototype.$ctoast.replace = function (name, data={}) {
      eventBus.$emit('delete-toast', name)
      eventBus.$emit('create-toast', data)
    }
    Vue.prototype.$ctoast.delete = function (name) {
      eventBus.$emit('delete-toast', name)
    }
    Vue.prototype.$ctoast.clear = function () {
      eventBus.$emit('clear-toasts')
    }

    Vue.mixin({
      created: () => {
        if (init) return;
        if (options.ctoasts) {
          for (const ctoastData of Object.keys(options.ctoasts)) {
            try {
              if (defaultKeys.includes(ctoastData)) throw new Error(`The "${ctoastData}" key is used in the ctoast module by default. Toast will not be used with such a key!`)
              Vue.prototype.$ctoast[ctoastData] = function () {
                eventBus.$emit('create-toast', options.ctoasts[ctoastData])
              }
            } catch (err) {
              console.error(err)
            }
          }
        }
        init = true
        let component = Vue.extend(cToast)
        let instance = new component({
          propsData: {
            setterDefaultSettings: options
          }
        })
        instance.$mount()
        document.body.appendChild(instance.$el)
      }
    })

  }
}

CToast.install(Vue)

export default CToast;
