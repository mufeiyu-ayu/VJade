<script setup lang="ts">
import type { FormProps } from './types'
import FormViewContent from './components/FormViewContent.vue'
import { useFormHooks } from './hooks/useForm'

defineProps<FormProps>()
const { formContainerType, formContainerProps, formContentRef, handleOpen, handleClose } = useFormHooks()

defineExpose({
  handleOpen,
  handleClose,
  formContentRef,
})
</script>

<template>
  <!-- @vue-ignore -->
  <component :is="formContainerType" v-bind="formContainerProps">
    <FormViewContent
      ref="formContentRef"
      v-bind="{
        fieldConfig: fieldConfig || [],
      }"
    />
  </component>
</template>
