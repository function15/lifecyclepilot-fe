<template>
  <div class="space-y-6">
    <div v-if="loading" class="flex items-center justify-center min-h-[200px]">
      <div class="text-gray-500">Loading dashboard stats...</div>
    </div>

    <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-lg p-4">
      <div class="text-red-600">{{ error }}</div>
    </div>

    <template v-else-if="stats">

    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed } from 'vue'
import { type DashboardStatsResponse } from '@/services/FiltersService'

export default defineComponent({
  name: 'DashboardStatsSection',
  components: {
  },
  props: {
    accountId: {
      type: String,
      default: 'ad3c84df'
    },
    profitsType: {
      type: String,
      default: 'net_profits'
    },
    matchAllPlaybooks: {
      type: Boolean,
      default: false
    },
    numberFormat: {
      type: String,
      default: 'currency'
    }
  },
  setup(props) {
    const loading = ref(true)
    const error = ref<string | null>(null)
    const stats = ref<DashboardStatsResponse | null>(null)

    const currentDayStreakText = computed(() => {
      if (!stats.value) return 'N/A'
      const streaks = stats.value.day_streaks
      if (streaks.current_winning > 0) {
        return `${streaks.current_winning} wins`
      } else if (streaks.current_losing > 0) {
        return `${streaks.current_losing} losses`
      }
      return 'None'
    })

    const currentDayStreakVariant = computed(() => {
      if (!stats.value) return 'neutral'
      const streaks = stats.value.day_streaks
      if (streaks.current_winning > 0) return 'positive'
      if (streaks.current_losing > 0) return 'negative'
      return 'neutral'
    })

    onMounted(() => {
    })

    return {
      loading,
      error,
      stats,
      currentDayStreakText,
      currentDayStreakVariant
    }
  }
})
</script>
