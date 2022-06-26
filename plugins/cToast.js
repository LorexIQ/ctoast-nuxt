import Vue from "vue";
import cToast from "../components/cToast.vue"
import { eventBus } from './eventBus'

const options = JSON.parse(`<%= JSON.stringify(options) %>`)
let init = false

const CToast = {
  install(Vue) {
    const cToastTypes = [
      'success',
      'info',
      'error'
    ]
    const defaultKeys = [
      'show',
      'replace',
      'delete',
      'clear',
      ...cToastTypes
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
    Vue.prototype.$ctoast = function (title, args={}) {
      if (dataIsString(data)) {
        eventBus.$emit('create-toast', {
          ...args,
          title,
          type: 'default'
        })
      }
    }

    for (const cToastType of cToastTypes) {
      Vue.prototype.$ctoast[cToastType] = function (title, args={}) {
        if (dataIsString(title)) {
          eventBus.$emit('create-toast', {
            ...args,
            title,
            type: cToastType,
          })
        }
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
