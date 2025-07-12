<script lang="ts" setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <div class="w-full h-full flex items-center justify-center">
    <div class="text-4xl font-bold">
      {{ t('common.home') }} {{ $t('message') }}
    </div>

    <RouterView />
  </div>
</template>
