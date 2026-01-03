<template>
  <div class="space-y-8">
    <!-- Header Section -->
    <div class="text-center lg:text-left">
      <h1 class="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">Dashboard</h1>
      <p class="mt-4 text-lg text-gray-600">Your trading overview and analytics</p>
    </div>

    <!-- Win Rate Widget -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <TradeWinRateWidget />
    </div>

    <!-- Dashboard Stats Section -->
    <DashboardStatsSection />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import TradeWinRateWidget from '@/components/TradeWinRateWidget.vue'
import DashboardStatsSection from '@/components/DashboardStatsSection.vue'

export default defineComponent({
  name: 'DashboardPage',
  components: {
    TradeWinRateWidget,
    DashboardStatsSection
  },
  setup() {
    return {}
  }
})
</script>
