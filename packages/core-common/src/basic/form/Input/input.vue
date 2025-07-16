<script setup lang="ts">
const modelValue = defineModel<string>()
</script>

<template>
  <div class="w-full">
    <ElInput v-bind="$attrs" v-model="modelValue" />
  </div>
</template>
