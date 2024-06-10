<script lang="ts" setup>
import { ElButton, ElIcon, ElPopover, ElSpace, ElText } from 'element-plus'
import { BellFilled, Promotion, Share, Stamp, Timer } from '@element-plus/icons-vue'
import { addNodeActionHooks } from './hooks/add-node-action-hooks.ts'

const { readOnly, popoverRef, addApprovalNode, addCcNode, addExclusiveNode, addTimerNode, addNotifyNode } =
  addNodeActionHooks()
</script>

<template>
  <div class="add-but">
    <el-popover ref="popoverRef" :width="336" placement="bottom-start" title="添加节点" trigger="click">
      <el-space wrap>
        <div class="node-select" @click="addApprovalNode">
          <el-icon class="svg-icon Stamp">
            <Stamp />
          </el-icon>
          <el-text style="margin-left: 10px">审批人</el-text>
        </div>
        <div class="node-select" @click="addCcNode">
          <el-icon class="svg-icon Promotion">
            <Promotion />
          </el-icon>
          <el-text style="margin-left: 10px">抄送人</el-text>
        </div>
        <div class="node-select" @click="addExclusiveNode">
          <el-icon class="svg-icon Share">
            <Share />
          </el-icon>
          <el-text style="margin-left: 10px">互斥分支</el-text>
        </div>
        <div class="node-select" @click="addTimerNode">
          <el-icon class="svg-icon Timer">
            <Timer />
          </el-icon>
          <el-text style="margin-left: 10px">计时等待</el-text>
        </div>
        <div class="node-select" @click="addNotifyNode">
          <el-icon class="svg-icon BellFilled">
            <BellFilled />
          </el-icon>
          <el-text>消息通知</el-text>
        </div>
      </el-space>
      <template #reference>
        <el-button v-show="!readOnly" circle icon="Plus" style="z-index: 1" type="primary"></el-button>
      </template>
    </el-popover>
  </div>
</template>

<style lang="scss" scoped>
.node-select {
  cursor: pointer;
  display: flex;
  padding: 8px;
  width: 135px;
  border-radius: 10px;
  position: relative;
  background-color: var(--el-fill-color-light);

  &:hover {
    background-color: var(--el-color-primary-light-9);
    box-shadow: var(--el-box-shadow-light);
    color: var(--el-color-primary);
  }

  .svg-icon {
    font-size: 25px;
    padding: 5px;
    border-radius: 50%;
    color: var(--el-color-white);

    &.Stamp {
      background-color: #ff943e;
    }

    &.Promotion {
      background-color: #3296fa;
    }

    &.Share {
      background-color: #45cf9b;
    }

    &.Timer {
      background-color: #e872b7;
    }

    &.BellFilled {
      background-color: #95d475;
    }
  }

  .el-text {
    margin-left: 10px;
  }
}

.add-but {
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 20px 0 32px;
  position: relative;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    width: 1px;
    height: 100%;
    background-color: var(--el-border-color);
  }
}
</style>
