<script setup lang="ts">
import { Expand, Fold } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import { RouteNameEnum } from '@/router/type'

defineProps<{
  isCollapse: boolean
}>()
const router = useRouter()

function refresh() {
  // 获取当前路由的完整路径
  const fullPath = router.currentRoute.value.fullPath || '/'
  router.push({
    name: RouteNameEnum.REDIRECT,
    params: {
      path: fullPath,
    },
  })
}
</script>

<template>
  <TipIcon content="折叠">
    <ElIcon
      size="20px"
      color="#b2b2b2"
      class="cursor-pointer"
      @click="$emit('update:isCollapse', !isCollapse)"
    >
      <Fold v-if="!isCollapse" />
      <Expand v-else />
    </ElIcon>
  </TipIcon>

  <!-- 刷新 -->
  <TipIcon content="刷新">
    <ElIcon
      size="20px"
      title="刷新"
      color="#b2b2b2"
      class="cursor-pointer"
      @click="refresh"
    >
      <Refresh />
    </ElIcon>
  </TipIcon>
</template>
