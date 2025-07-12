<script lang="ts" setup>
import { FormView } from '@ayu-mu/core-common'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <div class="w-full h-full flex flex-col gap-4 items-center justify-center">
    <div class="text-4xl font-bold">
      {{ t('common.home') }} {{ $t('message') }}
    </div>
    <div class="">
      <FormView />
    </div>
    <RouterView />
  </div>
</template>
