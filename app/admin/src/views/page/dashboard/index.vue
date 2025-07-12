<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <div class="w-full h-full flex items-center justify-center">
    <div class="text-4xl font-bold">
      <ElButton type="primary">
        {{ t('common.click') }}
      </ElButton>
    </div>
  </div>
</template>
