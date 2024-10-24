<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue'
import { http } from '@ayu-mu/request'
import { webStorage } from '@ayu-mu/utils'

const props = withDefaults(
  defineProps<{
    modelValue: string[]
    options?: Record<string, any>
    column?: Record<string, any>
    row?: Record<string, any>
  }>(),
  {
    modelValue: [''] as any
  }
)
const appMeta = webStorage.getStorageFromKey('app')

const getDataListById = (id: string) => {
  return http.get(`/${appMeta.code}/area/children?code=${id}`)
}
const getRootDataList = () => {
  return http.get(`/${appMeta.code}/area/root`)
}
const value = ref([])
const filterValue = computed(() => {
  if (value.value.length <= 0) return ''
  if (value.value.length > 1) {
    return value.value.join('/')
  }
  return value.value
})
onMounted(async () => {
  const list = props.modelValue
  console.log('list', props.modelValue)
  if (!list || list.length <= 0) return
  for (const item of list) {
    console.log(item)
    const index: number = list.indexOf(item)
    const res = index === 0 ? await getRootDataList() : await getDataListById(list[index - 1])
    // if (res.data.length <= 0) continue
    const data = res.data.find((item: any) => item.code === list[index])
    if (data) {
      value.value[index] = data.name
    }
  }
})
</script>

<template>
  <div v-bind="props?.options">
    {{ filterValue }}
  </div>
</template>
