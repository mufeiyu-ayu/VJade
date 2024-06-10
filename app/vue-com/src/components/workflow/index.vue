<script lang="ts" setup="">
import { AyuFlowDesign } from '@ayu/workflow'
import { workflowHooks } from './data'

const { fields } = workflowHooks()
</script>

<template>
  <div class="workflow">
    <ayu-flow-design :fields="fields" />
  </div>
</template>

<style>
.workflow {
  height: 60vh;
}
</style>
