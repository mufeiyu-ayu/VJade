<script setup lang="ts">
import type { MenuItem } from '@ayu-mu/model'
import { useUserStore } from '@/stores/modules/user'
import SubMenu from './appMenu/subMenu.vue'

defineProps<{
  isCollapse: boolean
}>()
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
      }
      else {
        roots.push(map[item.id])
      }
    })

    return roots
  }
  catch (error) {
    console.error('构建菜单树结构时出错:', error)
    return []
  }
}

function sortTree(tree: MenuItem[]): MenuItem[] {
  return tree
    .sort((a, b) => (a.sort ?? 0) - (b.sort ?? 0))
    .map(node => ({
      ...node,
      children: node.children?.length ? sortTree(node.children) : [],
    }))
}

const treeData = sortTree(arrayToTree(menuList))
</script>

<template>
  <div class="w-full h-full">
    <ElMenu default-active="2" :collapse="isCollapse" class="el-menu-vertical-demo">
      <ElMenuItem class="logo" @click="$router.push('/')">
        <div v-if="!isCollapse" class="w-full h-[70px] flex items-center justify-center">
          <span
            class="text-5xl font-extrabold italic bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent w-full text-center leading-[70px] flex items-center justify-center animate-gradient cursor-pointer tracking-wide drop-shadow-[0_0_15px_rgba(59,130,246,0.6)] before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-r before:from-blue-500/20 before:via-purple-500/20 before:to-pink-500/20 before:animate-pulse"
          >
            VJade
          </span>
        </div>
      </ElMenuItem>
      <SubMenu :menu-list="treeData" />
    </ElMenu>
  </div>
</template>

<style lang="scss" scoped>
:deep(.el-menu-item) {
  min-width: 230px !important;
}
.logo {
  padding: 0 !important;
}
:deep(.el-menu) {
  transition: width 0.3s ease-in-out !important;
}

.el-menu-vertical-demo {
  height: 100%;
}
</style>
