<script setup lang="ts">
import subMenu from './appMenu/subMenu.vue'
import { useUserStore } from '@/stores/modules/user'
import type { MenuItem } from '@ayu-mu/model'
const userStore = useUserStore()
const menuList = userStore.userMenu

function arrayToTree(items: MenuItem[]): MenuItem[] {
  const map: Record<string | number, MenuItem> = {}
  const roots: MenuItem[] = []

  try {
    // 构建映射表
    items.forEach((item) => {
      map[item.id] = { ...item, children: [] }
    })

    // 构建树结构
    items.forEach((item) => {
      if (item.parentId && map[item.parentId]) {
        map[item.parentId].children?.push(map[item.id])
      } else {
        roots.push(map[item.id])
      }
    })

    return roots
  } catch (error) {
    console.error('构建菜单树结构时出错:', error)
    return []
  }
}

function sortTree(tree: MenuItem[]): MenuItem[] {
  return tree
    .sort((a, b) => (a.sort ?? 0) - (b.sort ?? 0))
    .map((node) => ({
      ...node,
      children: node.children?.length ? sortTree(node.children) : []
    }))
}

const treeData = sortTree(arrayToTree(menuList))
</script>

<template>
  <div class="w-full h-full">
    <el-menu default-active="2" class="el-menu-vertical-demo">
      <subMenu :menuList="treeData" />
    </el-menu>
  </div>
</template>

<style lang="scss" scoped></style>
