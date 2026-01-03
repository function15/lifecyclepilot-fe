<template>
  <RouterView />
</template>

<script lang="ts">
import { RouterView } from 'vue-router'

import { defineComponent, onMounted } from 'vue';
import { useAuthStore } from '@/stores/auth'

export default defineComponent({
  name: 'App',
  components: {
    RouterView,
  },
  setup() {
    onMounted(async () => await useAuthStore().loadLoggedInUser())
    return {}
  },
});

</script>

