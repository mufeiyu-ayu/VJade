<script lang="ts" setup>
import { useRouter } from 'vue-router'
import Menu from './components/menu.vue'
const router = useRouter()

const getRoute = () => {
  console.log(router.getRoutes(), 'router')
}
const handleRoute = () => {
  console.log(router.getRoutes(), 'router')
  router.push('/system')
}
</script>

<template>
  <div class="w-full h-screen flex theme">
    <!-- layoutsider -->
    <div class="w-[10vw] flex flex-col h-full bg-white">
      <div class="w-full h-[70px] flex items-center justify-center">
        <span
          class="text-5xl font-extrabold italic bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent w-full text-center leading-[70px] flex items-center justify-center animate-gradient cursor-pointer tracking-wide drop-shadow-[0_0_15px_rgba(59,130,246,0.6)] before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-r before:from-blue-500/20 before:via-purple-500/20 before:to-pink-500/20 before:animate-pulse"
        >
          VJade
        </span>
      </div>
      <div class="flex-1">
        <Menu />
      </div>
    </div>
    <!-- layout-right -->
    <div class="flex-1 h-full">
      <div class="flex h-full flex-col">
        <div class="h-14 w-full bg-white flex items-center justify-between">
          <div class="w-4/6">11</div>
          <div class="flex-1">utils</div>
        </div>
        <div class="h-10 bg-[#b1b1b1]">面包屑</div>
        <div class="flex-1">
          <el-button @click="handleRoute">点击</el-button>
          <el-button @click="$router.push('/system/user')">点击</el-button>
          <el-button @click="getRoute">点击</el-button>
          <router-view />
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
