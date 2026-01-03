<template>
  <main>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useAuthStore } from '@/stores/auth'

export default defineComponent({
  name: 'LogoutView',
  components: {},
  setup() {
    const store = useAuthStore()
    store.logout()
    window.location.href = '/'
  }
})
</script>




