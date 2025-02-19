<script setup lang="ts">
import { useUserStore } from '@/stores/modules/user'
import { useRoute } from 'vue-router'
import { onMounted } from 'vue'
const route = useRoute()
const userStore = useUserStore()
onMounted(() => {
  console.log(userStore.userMenu, 'userStore.userMenu')
  console.log(route, 'routeTest')
})
</script>

<template>
  <div class="w-full h-full flex items-center justify-center">
    <div class="flex flex-col items-center justify-center">
      <div class="text-4xl font-bold">this is a Test page route</div>
    </div>
  </div>
</template>
