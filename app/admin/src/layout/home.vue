<script lang="ts" setup>
import { Expand, Fold } from '@element-plus/icons-vue'
import { ref } from 'vue'
import Menu from './components/menu.vue'

const isCollapse = ref(false)
</script>

<template>
  <div class="w-full h-screen flex theme">
    <!-- layoutsider -->
    <div class="w-[10vw] flex flex-col h-full bg-white">
      <div class="flex-1 bg-[#f1f3f5]">
        <Menu :is-collapse="isCollapse" />
      </div>
    </div>
    <!-- layout-right -->
    <div class="flex-1 w-full h-full bg-[#f1f3f5]">
      <div class="flex h-full w-full flex-col">
        <div class="h-14 w-full bg-white flex items-center justify-between">
          <ElIcon size="20px" class="cursor-pointer" @click="isCollapse = !isCollapse">
            <Fold v-if="isCollapse" />
            <Expand v-else />
          </ElIcon>
        </div>
        <div class="h-10 w-full bg-[#b1b1b1]">
          面包屑
        </div>
        <div class="flex-1 p-4">
          <div class="w-full h-full p-4 rounded-lg bg-white">
            <RouterView />
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
</style>
