<template>
  <div
    :class="`is-toast ${defaultSetting.position}`"
    :style="`
    ${defaultSetting.positionPadding.top ? 'top:' + defaultSetting.positionPadding.top : ''};
    ${defaultSetting.positionPadding.right ? 'right:' + defaultSetting.positionPadding.right : ''};
    ${defaultSetting.positionPadding.bottom ? 'bottom:' + defaultSetting.positionPadding.bottom : ''};
    ${defaultSetting.positionPadding.left ? 'left:' + defaultSetting.positionPadding.left : ''};
    `"
  >
    <transition-group
      :name="`is-toasts-animation-${defaultSetting.position}`"
      class="is-toast__list"
    >
      <div
        :class="`is-toast__list__item ${toast.type}`"
        v-for="toast in toastArray"
        :key="toast.id"
      >
        <div class="is-toast__list__item__title">
          <div class="is-toast__list__item__title__head">
            <i
              :class="`is-toast__list__item__title__icon fa fas fa-${toast.icon}`"
            />
            <p>{{ toast.title }}</p>
          </div>
        </div>
        <div
          v-show="toast.description"
          class="is-toast__list__item__content"
        >
          <p>{{ toast.description }}</p>
        </div>
      </div>
    </transition-group>
  </div>
</template>

<script>
import {eventBus} from "../plugins/eventBus";
export default {
  name: "Test",
  data () {
    return {
      toastArray: [],
      timeShift: 0,
      defaultSetting: {
        position: 'right-bottom',
        maxToasts: 10,
        ...this.setterDefaultSettings,
        toast: {
          title: '',
          description: '',
          type: 'success',
          icon: '',
          delay: 3000,
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
    eventBus.$on('clear-toasts', () => {
      this.clearToasts()
    })
    eventBus.$on('create-toast', (res) => {
      this.adjustSetting(res)
      if (res.icon === '') {
        this.typeDecode(res)
      }
      const toastObj = {
        type: res.type,
        icon: res.icon,
        id: (Date.now() + this.timeShift++).toString(),
        title: res.title,
        description: res.description,
      }
      this.toastArray.push(toastObj)
      if (this.toastArray.length > this.defaultSetting.maxToasts) {
        this.toastArray.splice(0, 1)
      }
      if (this.toastArray.length) {
        setTimeout((obj) => {
          const index_obj = this.toastArray.indexOf(obj)
          if (index_obj !== -1) {
            this.toastArray.splice(index_obj, 1)
          }
        }, res.delay, toastObj)
      }
    })
  },
  methods: {
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
        if (!res[setting]) {
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
          res.icon = 'check'
          return
      }
    }
  },

}
</script>

<style lang="scss" scoped>
.is-toast {
  position: fixed;
  z-index: 3000;
  &.right {
    &-bottom {
      right: 1rem;
      bottom: 1rem;
    }
    &-top {
      right: 1rem;
      top: 1rem;
      .is-toast {
        &__list {
          flex-direction: column-reverse;
        }
      }
    }
  }
  &.left {
    &-bottom {
      left: 1rem;
      bottom: 1rem;
    }
    &-top {
      left: 1rem;
      top: 1rem;
      .is-toast {
        &__list {
          flex-direction: column-reverse;
        }
      }
    }
  }
  &__list {
    display: flex;
    flex-direction: column;
    &__item {
      margin-bottom: .5rem;
      -webkit-border-radius: 5px;
      -moz-border-radius: 5px;
      border-radius: 5px;
      width: 250px;
      overflow: hidden;
      -webkit-box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12);
      -moz-box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12);
      box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12);
      transition: 1s;
      max-height: 200px;
      p {
        font-family: 'Roboto', sans-serif;
        font-weight: 500;
        font-size: 16px;
        line-height: 16px;
        text-decoration: none;
        margin: 0;
        user-select: none;
        transition: .3s;
        color: #2c3e50;
        text-transform: inherit;
      }
      &.success {
        .is-toast {
          &__list {
            &__item {
              &__title {
                &__icon {
                  color: #4caf50;
                }
              }
            }
          }
        }
      }
      &.info {
        .is-toast {
          &__list {
            &__item {
              &__title {
                &__icon {
                  color: #ffb020;
                }
              }
            }
          }
        }
      }
      &.error {
        .is-toast {
          &__list {
            &__item {
              &__title {
                &__icon {
                  color: #f44336;
                }
              }
            }
          }
        }
      }
      &__title {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: .5rem;
        background-color: #f1f1f1;
        &__head {
          display: flex;
          align-items: center;
          svg {
            margin-right: .5rem;
            font-size: 1.25rem;
          }
        }
        &__toggle {
          font-size: 12px;
        }
        &:after {
          content: '';
          display: block;
          margin: 0 auto 2rem;
          position: absolute;
          bottom: 0;
          border-bottom: 1px solid black;
        }
      }
      &__content {
        padding: .75rem;
        font-size: 1.5rem;
        background-color: rgba(255,255,255,.95);
        p {
          font-size: .9rem !important;
        }
      }
    }
  }
}
.is-toasts-animation-right-bottom,
.is-toasts-animation-right-top {
  &-enter {
    transform: translateX(120px);
    opacity: 0;
  }
  &-enter-active, &-move  {
    transition: all .6s ease;
  }
  &-enter-to, &-leave {
    opacity: 1;
  }
  &-leave-active {
    transition: transform .6s ease, opacity .6s, max-height .6s .4s;
  }
  &-leave-to{
    max-height: 0;
    transform: translateX(120px);
    opacity: 0;
  }
}
.is-toasts-animation-left-bottom,
.is-toasts-animation-left-top {
  &-enter {
    transform: translateX(-120px);
    opacity: 0;
  }
  &-enter-active, &-move  {
    transition: all .6s ease;
  }
  &-enter-to, &-leave {
    opacity: 1;
  }
  &-leave-active {
    transition: transform .6s ease, opacity .6s, max-height .6s .4s;
  }
  &-leave-to{
    max-height: 0;
    transform: translateX(-120px);
    opacity: 0;
  }
}
</style>
