<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

const { t } = useI18n()
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
    <ElEmpty :description="t('error.forbidden')" class="exception">
      <ElButton type="info" @click="goHome">
        {{ t('error.home') }}
      </ElButton>
      <ElButton type="primary" @click="goBack">
        {{ t('error.back') }}
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
