import Vue from "vue";
import cToast from "../components/cToast.vue"
import { eventBus } from './eventBus'

const options = JSON.parse(`<%= JSON.stringify(options) %>`)
let init = false

const CToast = {
  install(Vue) {
    Vue.prototype.$ctoast = function (data) {
      eventBus.$emit('create-toast', data)
    }
    Vue.prototype.$ctoast.clear = function () {
      eventBus.$emit('clear-toasts')
    }
    Vue.mixin({
      created: () => {
        if (init) return;
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
