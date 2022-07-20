<template lang="pug">
  .ctoast(
    :class="`${defaultSetting.position}`"
    :style="`${defaultSetting.positionPadding.top ? 'top:' + defaultSetting.positionPadding.top : ''};${defaultSetting.positionPadding.right ? 'right:' + defaultSetting.positionPadding.right : ''};${defaultSetting.positionPadding.bottom ? 'bottom:' + defaultSetting.positionPadding.bottom : ''};${defaultSetting.positionPadding.left ? 'left:' + defaultSetting.positionPadding.left : ''};`"
  )
    transition-group.ctoast__list(:name="`ctoasts-animation-${defaultSetting.position}`")
      .ctoast__list__item(
        :class="toast.type"
        v-for="toast in toastArray"
        :key="toast.id"
        @click="toast.clickOn(toast.id)"
      )
        .ctoast__list__item__title
          .ctoast__list__item__title__head
            i.ctoast__list__item__title__icon(
              :class="`fa fas fa-${toast.icon}`"
            )
            p {{ toast.title }}
        .ctoast__list__item__timer(
          v-if="toast.delay !== defaultSetting.infinityDestroyDelay && toast.timer"
          :style="`transition: ${toast.delay / 1000}s all linear; ${toast.timerActive && 'width: 0;'}`"
        )
        .ctoast__list__item__content(v-if="toast.description || toast.loaderData !== undefined")
          p(
            v-if="toast.description"
            :style="toast.loaderData !== undefined ? 'padding-bottom: 2px;' : ''"
          ) {{ toast.description }}
          span.ctoast__list__item__content__loader(
            v-if="toast.loaderData"
            v-for="loader in toast.loaderData"
            :key="`loader-key-${loader.key}`"
          )
            .ctoast__list__item__content__loader__icon(
              :class="`ctoast__list__item__content__loader__icon--${loader.status}`"
            )
              i(
                class="fa"
                :class="`fa-${loader.status === 'load' ? 'spinner fa-spin' : loader.status === 'success' ? 'check' : 'times'}`"
              )
            p {{ loader.title }}
</template>

<script>
import { eventBus } from "../plugins/eventBus";
export default {
  name: "CToastComponent",
  data () {
    return {
      toastArray: [],
      toastTimeoutArray: [],
      timeShift: 0,
      defaultSetting: {
        position: 'right-bottom',
        maxToasts: 10,
        infinityDestroyDelay: 999999,
        ...this.setterDefaultSettings,
        toast: {
          title: 'cToast',
          description: '',
          type: 'default',
          icon: '',
          delay: 3000,
          timer: true,
          clickOn: () => {},
          clickDelete: true,
          errorData: {
            title: 'Error',
            type: 'error',
            icon: 'times'
          },
          successData: {
            title: 'Success',
            type: 'success',
            icon: 'check'
          },
          errorFunction: () => {},
          successFunction: () => {},
          loaderDelay: 1000,
          ...this.setterDefaultSettings.toast
        },
        positionPadding: {
          top: null,
          right: null,
          bottom: null,
          left: null,
          ...this.setterDefaultSettings.positionPadding
        },

      }
    }
  },
  props: {
    setterDefaultSettings: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  created () {
    eventBus.$on('create-toast', (res) => {
      res.delay === false && (res.delay = this.defaultSetting.infinityDestroyDelay)
      this.adjustSetting(res)
      if (res.icon === '') {
        this.typeDecode(res)
      }
      const toastObj = {
        ...(res.name && { name: res.name }),
        clickOn: (id) => {
          res.clickOn()
          if (res.clickDelete) {
            this.deleteToastFromId(id)
          }
        },
        ...(res.loaderData !== undefined && {
          loaderData: res.loaderData,
          errorData: res.errorData,
          successData: res.successData,
          loaderDelay: res.loaderDelay,
          errorFunction: res.errorFunction,
          successFunction: res.successFunction
        }),
        timer: res.timer,
        timerActive: false,
        delay: res.delay,
        title: res.title,
        description: res.description,
        type: res.type,
        icon: res.icon,
        id: (Date.now() + this.timeShift++).toString(),
      }
      this.toastArray.push(toastObj)
      if (res.timer) {
        setTimeout((obj) => {
          const index_obj = this.toastArray.indexOf(obj)
          if (index_obj !== -1) {
            this.toastArray[index_obj].timerActive = true
          }
        }, 0, toastObj)
      }

      if (this.toastArray.length > this.defaultSetting.maxToasts) {
        this.toastArray.splice(0, 1)
        this.toastTimeoutArray.splice(0, 1)
      }
      if (this.toastArray.length) {
        this.toastTimeoutArray.push(setTimeout((obj, ) => {
          const index_obj = this.toastArray.indexOf(obj)
          if (index_obj !== -1) {
            this.toastArray.splice(index_obj, 1)
            this.toastTimeoutArray.splice(index_obj, 1)
          }
          if (!this.toastArray.length) this.toastTimeoutArray = []
        }, res.delay, toastObj))
      }
    })
    eventBus.$on('change-loader-status', args => {
      const { nameLoader, nameStatus, status } = args
      let loaderToast = this.toastArray.filter(res => res.name === nameLoader)
      if (loaderToast.length) {
        let toastData = loaderToast[0]
        toastData.loaderData[nameStatus].status = status ? 'success' : 'error'
        toastData.loaderData[nameStatus].key += '_edit'
        if (!status) {
          const errorToast = toastData.errorData
          setTimeout(() => {
            toastData.errorFunction()
            eventBus.$emit('create-toast', errorToast)
            this.deleteToastFromId(toastData.id)
          }, toastData.loaderDelay)
        } else if (Object.values(toastData.loaderData).length === Object.values(toastData.loaderData).filter(res => res.status === 'success').length) {
          const successToast = toastData.successData
          setTimeout(() => {
            toastData.successFunction()
            eventBus.$emit('create-toast', successToast)
            this.deleteToastFromId(toastData.id)
          }, toastData.loaderDelay)
        }
      }
    })
    eventBus.$on('delete-toast', (name) => {
      for (let ctoastData of this.toastArray.filter(res => res.name && res.name === name)) {
        const index = this.toastArray.indexOf(ctoastData)
        if (index !== -1) {
          this.toastArray.splice(index, 1)
          this.toastTimeoutArray.splice(index, 1)
        }
      }
    })
    eventBus.$on('clear-toasts', () => {
      for (let timeout of this.toastTimeoutArray) {
        clearTimeout(timeout)
      }
      this.toastTimeoutArray = []
      this.clearToasts()
    })
  },
  methods: {
    deleteToastFromId (id) {
      const toast = this.toastArray.filter(res => res.id === id)[0]
      const index = this.toastArray.indexOf(toast)
      if (index !== -1) {
        this.toastArray.splice(index, 1)
        this.toastTimeoutArray.splice(index, 1)
      }
    },
    clearToasts () {
      const objDel = this.toastArray[this.toastArray.length - 1]
      setTimeout((data) => {
        const index_obj = this.toastArray.indexOf(data)
        if (index_obj !== -1) {
          this.toastArray.splice(index_obj, 1)
          if (this.toastArray.length) {
            this.clearToasts()
          }
        }
      }, 100, objDel)
    },
    adjustSetting (res) {
      for (let setting in this.defaultSetting.toast) {
        if (res[setting] === undefined) {
          res[setting] = this.defaultSetting.toast[setting]
        }
      }
    },
    typeDecode (res) {
      switch (res.type) {
        case 'success':
          res.icon = 'check'
          return
        case 'info':
          res.icon = 'hourglass-half'
          return
        case 'error':
          res.icon = 'times'
          return
        default:
          res.icon = 'bell'
          return
      }
    }
  },

}
</script>

<style scoped>
@import "../assets/css/main.css";
</style>
