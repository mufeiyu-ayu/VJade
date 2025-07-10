<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { ref } from 'vue'
import { useUserStore } from '@/stores/modules/user'

const userStore = useUserStore()

const menuList = ref([
  {
    label: 'github',
    iconBind: {
      icon: 'mdi:github',
      color: '#000',
      width: '24',
      height: '24',
    },
    fn: () => {
      window.open('https://github.com/mufeiyu-ayu/VJade')
    },
  },
  {
    label: 'logout',
    iconBind: {
      icon: 'material-symbols-light:logout-rounded',
      color: '#000',
      width: '24',
      height: '24',
    },
    fn: () => {
      userStore.loginOut()
    },
  },
])
</script>

<template>
  <ElDropdown trigger="click">
    <div class="w-[40px] h-[40px]">
      <img src="@/assets/images/circle.png" alt="user" class="w-full h-full">
    </div>
    <template #dropdown>
      <ElDropdownMenu>
        <ElDropdownItem v-for="item in menuList" :key="item.label" @click="item.fn">
          <div class="flex items-center gap-2">
            <Icon v-bind="item.iconBind" />
            <span>{{ $t(item.label) }}</span>
          </div>
        </ElDropdownItem>
      </ElDropdownMenu>
    </template>
  </ElDropdown>
</template>

<style scoped>
.el-dropdown-menu {
  padding: 0;
}
</style>
