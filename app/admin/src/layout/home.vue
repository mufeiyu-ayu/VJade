<script lang="ts" setup>
import { ref } from 'vue'
import LeftCom from './components/leftcom/index.vue'
import Menu from './components/menu.vue'
import RightCom from './components/rightcom/index.vue'

const isCollapse = ref(false)
</script>

<template>
  <div class="w-full h-screen flex theme">
    <!--    layout-slider -->
    <div
      class="flex flex-col h-full bg-white transition-all duration-300"
      :style="{ width: isCollapse ? '64px' : '230px' }"
    >
      <div class="flex-1 bg-[#ffffff]">
        <Menu :is-collapse="isCollapse" />
      </div>
    </div>
    <!-- layout-right -->
    <div class="flex-1 shrink-0 h-full bg-[#f1f3f5]">
      <div class="flex h-full w-full flex-col">
        <div class="h-14 px-4 space-x-2 w-full bg-white flex items-center ">
          <LeftCom v-model:is-collapse="isCollapse" />
          <RightCom />
        </div>
        <div class="h-10 w-full bg-[#b1b1b1]">
          面包屑
        </div>
        <div class="flex-1 p-3">
          <div class="w-full h-full p-2 rounded-lg bg-white">
            <Transition name="fade-slide" mode="out-in">
              <RouterView />
            </Transition>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
img {
  width: 100%;
  height: 100%;
}
.theme {
  background-color: hsl(216, 20.11%, 95.47%);
}

@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.animate-gradient {
  background-size: 200% auto;
  animation: gradient 3s linear infinite;
}

/* 路由过渡动画 */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.3s ease;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateX(20px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}
</style>
