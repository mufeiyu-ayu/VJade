<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export default defineComponent({
  name: 'Redirect',
  setup() {
    const route = useRoute()
    const router = useRouter()

    onMounted(() => {
      const path = route.params.path as string
      router.replace({ path })
    })

    return () => null
  }
})
</script>
