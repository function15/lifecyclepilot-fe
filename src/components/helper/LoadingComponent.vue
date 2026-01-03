<template>
  <main>
    <ArrowPathIcon class="animate-spin h-6 w-6 text-gray-500" />
  </main>
</template>

<script lang="ts">
import { ArrowPathIcon } from '@heroicons/vue/24/solid'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'LoadingComponent',
  components: {
    ArrowPathIcon
  }
})
</script>