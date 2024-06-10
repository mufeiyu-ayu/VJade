<script lang="ts" setup="">
import {
  ClickOutside as vClickOutside,
  ElButton,
  ElCard,
  ElIcon,
  ElInput,
  ElPopconfirm,
  ElText,
  ElTooltip,
  type InputInstance
} from 'element-plus'
import type { Ref } from 'vue'
import { computed, inject, nextTick, ref, type Component } from 'vue'
import type { ErrorInfo, FlowNode, Recordable, NodeType } from '../types'
import SvgIcon from '../components/SvgIcon'
import { List, Promotion, Share, Stamp } from '@element-plus/icons-vue'
import Add from './AddNode.vue'
const $props = withDefaults(
  defineProps<{
    node: FlowNode
    icon?: string
    color?: string
    readOnly?: boolean
    close?: boolean
  }>(),
  {
    readOnly: false,
    close: true
  }
)
const icons: Record<string, Component> = {
  list: List,
  stamp: Stamp,
  share: Share,
  promotion: Promotion
}
const _inject = inject<{
  readOnly?: Ref<boolean>
  nodesError: Ref<Recordable<ErrorInfo[]>>
}>('flowDesign', { readOnly: ref(false), nodesError: ref({}) })
const $emits = defineEmits<{
  (e: 'activeNode', node: FlowNode): void
  (e: 'addNode', type: NodeType, node: FlowNode): void
}>()
const errorInfo = computed<ErrorInfo[] | undefined>(() => _inject.nodesError.value[$props.node.id])
const _readOnly = computed(() => _inject.readOnly?.value || $props.readOnly)
const showInput = ref(false)
const inputRef = ref<InputInstance>()
const onClickOutside = () => {
  if (showInput.value) {
    showInput.value = false
  }
}
const onShowInput = () => {
  if (_readOnly.value) return
  showInput.value = true
  nextTick(() => {
    inputRef.value?.focus()
  })
}
const activeNode = () => {
  if (_readOnly.value) return
  $emits('activeNode', $props.node)
}

const addNode = (type: NodeType) => {
  $emits('addNode', type, $props.node)
}
</script>

<template>
  <div class="node-box">
    <el-card :class="['node', { 'error-node': errorInfo?.length && !_readOnly }]" @click="activeNode">
      <template #header>
        <div class="head">
          <div v-if="showInput" @click.stop>
            <el-input
              ref="inputRef"
              v-model="$props.node.node"
              v-click-outside="onClickOutside"
              maxlength="30"
              @blur="onClickOutside"
            />
          </div>
          <el-text v-else tag="b" @click.stop="onShowInput">
            {{ $props.node.name }}
          </el-text>
          <el-icon>
            <EditPen />
          </el-icon>
          <slot name="icon">
            <svg-icon v-if="icon" :name="icon" :size="30" color="node-icon" />
          </slot>
        </div>
        <!--          删除按钮-->
        <span @click.stop>
          <el-popconfirm :hide-after="0" placement="right-start" title="您确定要删除该节点吗？" width="200">
            <template #reference>
              <el-button
                v-show="close && !_readOnly"
                circle
                class="node-close"
                icon="CircleClose"
                plain
                size="small"
                type="danger"
              />
            </template>
          </el-popconfirm>
        </span>
        <!--            错误提示-->
        <el-tooltip placement="top-start">
          <template #content>
            <div v-for="err in errorInfo" :key="err.id">
              {{ err.message }}
            </div>
          </template>
          <el-icon v-show="errorInfo?.length && !_readOnly" :size="20" class="warn-icon">
            <WarnTriangleFilled @click.stop />
          </el-icon>
        </el-tooltip>
      </template>
      <!--插槽内容-->
      <slot>
        <el-icon :size="24" color="node-icon">
          <component :is="icons[icon?.toLowerCase()]" />
        </el-icon>
        <!--        <svg-icon :size="30" color="node-icon" v-if="icon" :name="icon" />-->
      </slot>
    </el-card>
    <Add @add-node="addNode" />
  </div>
</template>

<style lang="scss" scoped>
.node-box {
  position: relative;

  /* &:before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    width: 1px;
    height: 100%;
    background-color: var(--fs-border-color);
  }*/

  &:after {
    content: '';
    position: absolute;
    top: -12px;
    left: 50%;
    transform: translate(-50%);
    border-style: solid;
    width: 0;
    border-width: 8px 6px 4px;
    border-color: var(--el-border-color) transparent transparent;
    background-color: var(--flow-bg-color);
  }

  .warn-icon {
    cursor: pointer;
    position: absolute;
    right: -30px;
    top: 50%;
    transform: translateY(-50%);
    color: var(--el-color-error);
  }

  .error-node {
    box-shadow: 0 0 5px 0 var(--el-color-error-light-3);
  }

  .node {
    border-radius: 7px;
    cursor: pointer;
    position: relative;
    overflow: visible;
    min-height: 90px;
    width: 230px;
    z-index: 10;

    .node-close {
      position: absolute;
      top: -10px;
      right: -10px;
      display: none;
    }

    &:hover {
      &:not(.error-node) {
        box-shadow: 0 0 5px 0 var(--el-color-primary);
      }

      .node-close {
        display: block;
      }
    }

    :deep(.el-card__header) {
      padding: calc(var(--el-card-padding) - 18px) calc(var(--el-card-padding) - 13px);
      border-radius: 7px 7px 0 0;
      background: v-bind(color);

      .el-input__wrapper {
        background-color: var(--el-card-bg-color);
      }

      .node-icon {
        color: transparent;
      }
    }

    :deep(.el-card__body) {
      position: relative;
    }

    .head {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }
}
</style>
