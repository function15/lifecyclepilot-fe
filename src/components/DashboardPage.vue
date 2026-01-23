<template>
  <div class="space-y-8">
    <!-- Header Section -->
    <div class="text-center lg:text-left">
      <h1 class="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">Dashboard</h1>
    </div>

    <!-- Dashboard Stats Section -->
    <DashboardStatsSection />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import DashboardStatsSection from '@/components/DashboardStatsSection.vue'

export default defineComponent({
  name: 'DashboardPage',
  components: {
    DashboardStatsSection
  },
  setup() {
    return {}
  }
})
</script>
