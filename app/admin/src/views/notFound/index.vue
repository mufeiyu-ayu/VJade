<script lang="ts">
import { ElMessage } from 'element-plus'
import { defineComponent, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'NotFound',
  setup() {
    const { t } = useI18n()
    const router = useRouter()

    onMounted(() => {
      ElMessage.error(t('error.pageNotExist'))
      router.replace({ path: '/' })
    })
    return () => null
  },
})
</script>
