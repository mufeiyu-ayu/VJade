<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

// const route = useRoute()
const router = useRouter()
onMounted(() => {
  // console.log(userStore.userMenu, 'userStore.userMenu')
  // console.log(route, 'routeTest')
  console.log(router.getRoutes(), 'router.getRoutes()')
})
</script>

<template>
  <div class="w-full h-full flex items-center justify-center">
    <div class="flex flex-col items-center justify-center">
      <div class="text-4xl font-bold">
        this is a Test page route
      </div>
    </div>
  </div>
</template>
