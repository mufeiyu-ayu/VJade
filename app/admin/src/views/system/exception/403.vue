<script lang="ts" setup>
import { useRouter } from 'vue-router'
const router = useRouter()

/**
 * 返回上一页
 */
const goBack = () => {
  router.go(-1)
}

/**
 * 回到首页
 */
const goHome = () => {
  router.push('/')
}
</script>

<template>
  <div>
    <el-empty description="抱歉，你无权访问这个页面。" class="exception">
      <el-button type="info" @click="goHome">首页</el-button>
      <el-button type="primary" @click="goBack">返回</el-button>
    </el-empty>
  </div>
</template>

<style lang="scss" scoped>
.exception {
  margin-top: 10vh;
  --el-empty-description-margin-top: 30px;
  --el-empty-bottom-margin-top: 30px;
}
</style>
