<template>
  <div class="bg-white rounded-lg shadow-md p-6">
    <h2 class="text-lg font-semibold text-gray-900 mb-4">Trade Win %</h2>

    <div v-if="loading" class="flex items-center justify-center min-h-[120px]">
      <div class="text-gray-500">Loading...</div>
    </div>

    <div v-else-if="error" class="flex items-center justify-center min-h-[120px]">
      <div class="text-red-500">{{ error }}</div>
    </div>

    <div v-else class="space-y-4">
      <!-- Win Rate Display -->
      <div class="text-center">
        <div class="text-4xl font-bold" :class="winRateColor">
          {{ winRatePercentage }}%
        </div>
        <div class="text-sm text-gray-600 mt-1">Win Rate</div>
      </div>

      <!-- Stats Grid -->
      <div class="grid grid-cols-3 gap-4 mt-6">
        <div class="text-center">
          <div class="text-2xl font-semibold text-green-600">{{ winRateData?.winners || 0 }}</div>
          <div class="text-xs text-gray-600 mt-1">Winners</div>
        </div>
        <div class="text-center">
          <div class="text-2xl font-semibold text-red-600">{{ winRateData?.losers || 0 }}</div>
          <div class="text-xs text-gray-600 mt-1">Losers</div>
        </div>
        <div class="text-center">
          <div class="text-2xl font-semibold text-gray-600">{{ winRateData?.break_evens || 0 }}</div>
          <div class="text-xs text-gray-600 mt-1">Break Even</div>
        </div>
      </div>

      <!-- Total Trades -->
      <div class="text-center pt-4 border-t border-gray-200">
        <div class="text-sm text-gray-600">
          Total Trades: <span class="font-semibold">{{ totalTrades }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed } from 'vue'
import { getWinRate, type WinRateResponse } from '@/services/FiltersService'

export default defineComponent({
  name: 'TradeWinRateWidget',
  props: {
    accountId: {
      type: String,
      default: 'ad3c84df'
    },
    numberFormat: {
      type: String,
      default: 'currency'
    },
    profitsType: {
      type: String,
      default: 'net_profits'
    },
    matchAllPlaybooks: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const loading = ref(true)
    const error = ref<string | null>(null)
    const winRateData = ref<WinRateResponse | null>(null)

    const totalTrades = computed(() => {
      if (!winRateData.value) return 0
      return winRateData.value.winners + winRateData.value.losers + winRateData.value.break_evens
    })

    const winRatePercentage = computed(() => {
      if (!winRateData.value || totalTrades.value === 0) return '0.0'
      return ((winRateData.value.winners / totalTrades.value) * 100).toFixed(1)
    })

    const winRateColor = computed(() => {
      const rate = parseFloat(winRatePercentage.value)
      if (rate >= 60) return 'text-green-600'
      if (rate >= 40) return 'text-yellow-600'
      return 'text-red-600'
    })

    const fetchWinRate = async () => {
      loading.value = true
      error.value = null

      try {
        const response = await getWinRate({
          number_format: props.numberFormat,
          profits_type: props.profitsType,
          accounts: [props.accountId],
          match_all_playbooks: props.matchAllPlaybooks
        })

        winRateData.value = response.data
      } catch (err: unknown) {
        console.error('Error fetching win rate:', err)
        error.value = err instanceof Error ? err.message : 'Failed to fetch win rate data'
      } finally {
        loading.value = false
      }
    }

    onMounted(() => {
      fetchWinRate()
    })

    return {
      loading,
      error,
      winRateData,
      totalTrades,
      winRatePercentage,
      winRateColor
    }
  }
})
</script>
