<script lang="ts" setup>
import { useRouter } from 'vue-router'

const router = useRouter()

/**
 * 返回上一页
 */
function goBack() {
  router.go(-1)
}

/**
 * 回到首页
 */
function goHome() {
  router.push('/')
}
</script>

<template>
  <div>
    <ElEmpty description="抱歉，您访问的页面不存在。" class="exception">
      <ElButton type="info" @click="goHome">
        首页
      </ElButton>
      <ElButton type="primary" @click="goBack">
        返回
      </ElButton>
    </ElEmpty>
  </div>
</template>

<style lang="scss" scoped>
.exception {
  margin-top: 10vh;
  --el-empty-description-margin-top: 30px;
  --el-empty-bottom-margin-top: 30px;
}
</style>
