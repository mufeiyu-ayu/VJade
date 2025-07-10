<script lang="ts" setup>
import { Icon } from '@iconify/vue'
import { languageList, useLanguageStory } from '@/stores/modules/language'

const languageStore = useLanguageStory()
</script>

<template>
  <ElDropdown trigger="click">
    <span class="el-dropdown-link">
      <Icon icon="ic:sharp-translate" width="24" height="24" />

    </span>
    <template #dropdown>
      <ElDropdownMenu>
        <ElDropdownItem
          v-for="language in languageList"
          :key="language.code"
          :class="{ 'is-active': language.code === languageStore.currentLanguage }"
          @click="languageStore.setLanguage(language.code)"
        >
          <div class="flex items-center px-2">
            <!-- <span class="mr-2 text-lg">{{ language.code }}</span> -->
            <div class="flex flex-col">
              <span class="text-sm font-medium">{{ language.name }}</span>
              <!-- <span class="text-xs text-gray-500">{{ language.label }}</span> -->
            </div>
            <div class="w-2" />
            <ElIcon
              v-if="language.code === languageStore.currentLanguage"
              class="ml-2"
            >
              <Check />
            </ElIcon>
          </div>
        </ElDropdownItem>
      </ElDropdownMenu>
    </template>
  </ElDropdown>
</template>

<style scoped>
.example-showcase .el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
}
</style>
