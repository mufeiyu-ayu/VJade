<template>
  <div class="progress-container">
    <el-progress
      :type="type"
      :percentage="modelValue * 100"
      :indeterminate="indeterminate"
      :stroke-width="strokeWidth"
      :striped="striped"
      :duration="duration"
    ></el-progress>
  </div>
</template>

<script setup lang="ts">
import { ElProgress } from 'element-plus'

// 进度条配置
export interface ProgressConfig {
  // 进度条百分比，计算获取
  modelValue: string | any
  // 进度条类型
  type: 'line' | 'circle' | 'dashboard'
  // 进度条宽度
  strokeWidth?: number
  // 是否开启纹路
  striped?: boolean
  // 是否开启时间动画
  indeterminate?: boolean
  // 动画持续时间
  duration?: number
}

// 设置默认值
withDefaults(defineProps<ProgressConfig>(), {
  type: 'line',
  strokeWidth: 10,
  striped: true
})
</script>

<style scoped lang="scss"></style>
