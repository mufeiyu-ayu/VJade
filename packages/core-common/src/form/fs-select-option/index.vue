<script lang="ts" setup>
import { ElOption, ElRadio, ElRadioButton, ElRadioGroup, ElSelect } from 'element-plus'
import { useAttrs, watchEffect, ref } from 'vue'

const props = defineProps<{
  values?: any
  display?: 'select' | 'radio' | 'radioButton'
  modelValue: any
}>()

const attrs = useAttrs()
const value = ref(props.modelValue)
watchEffect(() => {
  value.value = props.modelValue
})
</script>

<template>
  <el-radio-group v-if="display === 'radioButton'" v-model="value" v-bind="attrs">
    <el-radio-button v-for="options in props.values || []" :key="options.value" :value="options.value" v-bind="attrs">
      {{ options.label }}
    </el-radio-button>
  </el-radio-group>
  <el-radio-group v-else-if="display === 'radio'" v-model="value" v-bind="attrs">
    <el-radio v-for="options in props.values || []" :key="options.value" :value="options.value" v-bind="attrs">
      {{ options.label }}
    </el-radio>
  </el-radio-group>
  <el-select v-else v-model="value" v-bind="attrs" class="w-full">
    <el-option
      v-for="options in props.values || []"
      :key="options.value"
      :label="options.label"
      :value="options.value"
      v-bind="attrs"
    />
  </el-select>
</template>

<style lang="scss" scoped></style>
