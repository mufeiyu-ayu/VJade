<script setup lang="ts">
import type { MenuItem } from '@ayu-mu/model'
import { onMounted, ref } from 'vue'
import { useUserStore } from '@/stores/modules/user'
import SubMenu from './appMenu/subMenu.vue'

defineProps<{
  isCollapse: boolean
}>()

const userStore = useUserStore()
const menuList = userStore.userMenu
const treeData = ref<MenuItem[]>([])

/**
 * 将扁平数组转换为树形结构
 * @param items - 扁平菜单数组
 * @returns 树形菜单结构
 */
console.log(menuList)
function buildMenuTree(items: MenuItem[]): MenuItem[] {
  // 创建 ID 到菜单项的映射
  const menuMap = new Map<number, MenuItem>()

  // 初始化所有菜单项，添加空的 children 数组
  items.forEach((item) => {
    menuMap.set(item.id, { ...item, children: [] })
  })

  console.log(menuMap)
  // 构建树形结构
  const rootMenus: MenuItem[] = []

  items.forEach((item) => {
    const menuItem = menuMap.get(item.id)!
    // {id:1001,parentId:1002}
    if (item.parentId && menuMap.has(item.parentId)) {
      // 有父级，添加到父级的 children 中
      menuMap.get(item.parentId)!.children!.push(menuItem)
    }
    else {
      // 没有父级或父级不存在，作为根节点
      rootMenus.push(menuItem)
    }
  })

  return rootMenus
}

onMounted(() => {
  treeData.value = buildMenuTree(menuList)
})
</script>

<template>
  <div class="w-full h-full">
    <ElMenu
      default-active="2"
      :collapse="isCollapse"
      class="el-menu-vertical-demo"
      style="width: 100%;"
    >
      <ElMenuItem v-if="!isCollapse" class="logo" @click="$router.push('/')">
        <div class="w-full h-[70px] flex items-center justify-center">
          <span
            class="text-5xl font-extrabold italic bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent w-full text-center leading-[70px] flex items-center justify-center animate-gradient cursor-pointer tracking-wide drop-shadow-[0_0_15px_rgba(59,130,246,0.6)] before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-r before:from-blue-500/20 before:via-purple-500/20 before:to-pink-500/20 before:animate-pulse"
          >
            VJade
          </span>
        </div>
      </ElMenuItem>
      <SubMenu :menu-list="treeData" :is-collapse="isCollapse" />
    </ElMenu>
  </div>
</template>

<style lang="scss" scoped>
.logo {
  padding: 0 !important;
}
:deep(.el-menu) {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
  width: 100% !important;
  min-width: 0 !important;
}

.el-menu-vertical-demo {
  height: 100%;
}
</style>
