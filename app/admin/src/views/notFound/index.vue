<script lang="ts">
import { ElMessage } from 'element-plus'
import { defineComponent, onMounted } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'NotFound',
  setup() {
    const router = useRouter()

    onMounted(() => {
      ElMessage.error('页面组件不存在，请检测 page 目录下的组件是否创建正确')
      router.replace({ path: '/' })
    })
    return () => null
  },
})
</script>
