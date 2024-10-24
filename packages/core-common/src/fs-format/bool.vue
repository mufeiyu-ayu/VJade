<!-- TODO booolean -->
<script lang="ts" setup>
import { ElTag } from 'element-plus'
import { ref, useAttrs, watchEffect } from 'vue'

const props = defineProps<{
  modelValue: boolean | any
  options?: Record<string, any>
  column?: Record<string, any>
  row?: Record<string, any>
}>()

const attrs = useAttrs()

const value = ref(props.modelValue)

watchEffect(() => {
  value.value = props.modelValue
})
</script>

<template>
  <el-tag :type="value ? 'success' : 'danger'" v-bind="props?.options">
    {{ value ? (attrs['true'] ?? '是') : (attrs['false'] ?? '否') }}
  </el-tag>
</template>
