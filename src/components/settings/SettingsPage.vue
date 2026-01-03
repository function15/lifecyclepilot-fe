<template>
  <div class="min-h-full">
    <main>
      <div class="px-4 sm:px-6 lg:px-8">
        <div class="sm:flex sm:items-center">
          <div class="sm:flex-auto">
            <h1 class="mb-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Settings</h1>
          </div>
        </div>
      </div>

    </main>
  </div>
</template>


<script lang="ts">
import { defineComponent } from 'vue'

import { useRoute } from 'vue-router'

export default defineComponent({
  name: 'SettingsPage',
  components: {
  },
  setup() {

    const route = useRoute()
    const username = route.params['username']

    return {
      username
    }
  }
})
</script>
