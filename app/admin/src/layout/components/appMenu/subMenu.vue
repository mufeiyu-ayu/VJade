<script setup lang="ts">
import { MenuItem } from '@ayu-mu/model'
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
const router = useRouter()
const props = defineProps<{
  menuList: MenuItem[]
}>()

const route = useRoute()
const activeIndex = ref('')

// 根据路由查找对应的菜单项
const findMenuByRoute = (menus: MenuItem[], path: string): string => {
  for (const menu of menus) {
    if (menu.routePath === path) {
      return menu.menuIndex
    }
    if (menu.children) {
      const found = findMenuByRoute(menu.children, path)
      if (found) return found
    }
  }
  return ''
}

// 初始化选中状态
onMounted(() => {
  // 优先从 localStorage 获取
  const savedIndex = localStorage.getItem('activeMenuIndex')
  if (savedIndex) {
    activeIndex.value = savedIndex
  } else {
    // 如果没有保存的状态，则根据当前路由设置
    const currentPath = route.path.replace(/^\//, '') // 移除开头的斜杠
    const menuIndex = findMenuByRoute(props.menuList, currentPath)
    if (menuIndex) {
      activeIndex.value = menuIndex
      localStorage.setItem('activeMenuIndex', menuIndex)
    }
  }
})

// 处理菜单选中
const handleSelect = (item: MenuItem) => {
  activeIndex.value = item.menuIndex
  localStorage.setItem('activeMenuIndex', item.menuIndex)
  router.push(item.link)
}
</script>

<template>
  <template v-for="item in menuList" :key="item.menuIndex">
    <el-sub-menu
      v-if="item.children.length > 0"
      :index="item.menuIndex"
      :class="{ 'is-active': activeIndex === item.menuIndex }"
    >
      <template #title>
        <el-icon>
          <component :is="item.icon" />
        </el-icon>
        <span>{{ item.menuTitle }}</span>
      </template>
      <subMenu :menuList="item.children" />
    </el-sub-menu>
    <el-menu-item v-else :index="item.menuIndex" @click="handleSelect(item)">
      <el-icon>
        <component :is="item.icon" />
      </el-icon>
      <span>{{ item.menuTitle }}</span>
    </el-menu-item>
  </template>
</template>

<style scoped lang="scss">
:deep(.el-menu-item.is-active) {
  background-color: var(--el-menu-hover-bg-color);
}

:deep(.el-sub-menu.is-active) {
  > .el-sub-menu__title {
    color: var(--el-menu-active-color);
  }
}
</style>
