<script setup lang="ts">
import type { FormViewProps } from './types'

const props = defineProps<FormViewProps>()

console.log(props)
</script>

<template>
  <div class=" bg-red-500">
    this is formview component11112121
    {{ props }}
  </div>
</template>
