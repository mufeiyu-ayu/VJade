<script setup lang="ts">
import { computed, ref } from 'vue'
import { types } from './types'

const props = defineProps({
  type: {
    type: String,
    default: types.MESSAGE,
    validator: (val: string) => {
      return Object.values(types).includes(val)
    }
  },
  message: {
    type: String,
    default: ''
  },
  duration: {
    type: Number,
    default: 30000
  }
})

const visible = ref(false)
const top = ref(0)

const classes = computed(() => {
  return ['ayu-message', `ayu-message--${props.type}`]
})
const setVisibility = (val: boolean): Promise<string> => {
  return new Promise((resolve) => {
    visible.value = val
    setTimeout(() => {
      resolve('')
    }, 300)
  })
}
const setTop = (val: number) => {
  top.value = val
  return top.value
}

defineExpose({
  setVisibility,
  setTop,
  height: 40,
  margin: 20
})
</script>

<template>
  <transition name="ayu-message-fade">
    <div v-show="visible" :class="classes" :style="{ top: top + 'px' }">
      {{ message }}
    </div>
  </transition>
</template>

<style lang="scss" scoped>
.ayu-message {
  position: fixed;
  left: 50%;
  width: 380px;
  height: 40px;
  //写translateX会让动画存在问题
  margin-left: -190px;
  font-size: 14px;
  line-height: 40px;
  text-align: center;
  border-radius: 5px;
  transition: top 0.3s ease-out;
  color: #fff;
  z-index: 9999;
  &--success {
    background-color: #67c23a;
    color: #fff;
  }
  &--warning {
    background-color: #e6a23c;
    color: #fff;
  }
  &--error {
    background-color: #f56c6c;
  }
  &--message {
    background-color: #909399;
    color: #fff;
  }
}

.ayu-message-fade-enter-active {
  transition: all 0.3s ease-in;
}
.ayu-message-fade-leave-active {
  transition: all 0.3s ease-in;
}
.ayu-message-fade-enter-from,
.ayu-message-fade-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}
</style>
