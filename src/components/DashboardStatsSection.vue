<template>
  <div class="space-y-6">
    <div v-if="loading" class="flex items-center justify-center min-h-[200px]">
      <div class="text-gray-500">Loading dashboard stats...</div>
    </div>

    <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-lg p-4">
      <div class="text-red-600">{{ error }}</div>
    </div>

    <template v-else-if="stats">
      <!-- Performance Overview -->
      <div>
        <h2 class="text-lg font-semibold text-gray-900 mb-4">Performance Overview</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <DashboardStatWidget
            label="Total P&L"
            :value="stats.total_gain_loss"
            :variant="parseFloat(stats.total_gain_loss) >= 0 ? 'positive' : 'negative'"
            icon="currency"
          />
          <DashboardStatWidget
            label="Profit Factor"
            :value="stats.profit_factor"
            :variant="parseFloat(stats.profit_factor) >= 1 ? 'positive' : 'negative'"
            icon="scale"
          />
          <DashboardStatWidget
            label="Trade Count"
            :value="stats.trade_count"
            variant="neutral"
            icon="chart"
          />
          <DashboardStatWidget
            label="Avg Per Trade"
            :value="stats.average_per_trade_profits"
            :variant="parseFloat(stats.average_per_trade_profits) >= 0 ? 'positive' : 'negative'"
            icon="currency"
          />
        </div>
      </div>

      <!-- Trade Statistics -->
      <div>
        <h2 class="text-lg font-semibold text-gray-900 mb-4">Trade Statistics</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <DashboardStatWidget
            label="Winning Trades"
            :value="stats.winning_trades_count"
            :subtitle="`Total: ${stats.winning_trades_sum}`"
            variant="positive"
            icon="trending-up"
          />
          <DashboardStatWidget
            label="Losing Trades"
            :value="stats.losing_trades_count"
            :subtitle="`Total: ${stats.losing_trades_sum}`"
            variant="negative"
            icon="trending-down"
          />
          <DashboardStatWidget
            label="Avg Winning Trade"
            :value="stats.average_winning_trade"
            variant="positive"
            icon="trending-up"
          />
          <DashboardStatWidget
            label="Avg Losing Trade"
            :value="stats.average_losing_trade"
            variant="negative"
            icon="trending-down"
          />
        </div>
      </div>

      <!-- Daily Performance -->
      <div>
        <h2 class="text-lg font-semibold text-gray-900 mb-4">Daily Performance</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <DashboardStatWidget
            label="Winning Days"
            :value="stats.winning_days"
            variant="positive"
            icon="trending-up"
          />
          <DashboardStatWidget
            label="Losing Days"
            :value="stats.losing_days"
            variant="negative"
            icon="trending-down"
          />
          <DashboardStatWidget
            label="Breakeven Days"
            :value="stats.breakeven_days"
            variant="neutral"
            icon="chart"
          />
          <DashboardStatWidget
            label="Current Day Streak"
            :value="currentDayStreakText"
            :variant="currentDayStreakVariant"
            icon="chart"
          />
        </div>
      </div>

      <!-- Advanced Metrics -->
      <div>
        <h2 class="text-lg font-semibold text-gray-900 mb-4">Advanced Metrics</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <DashboardStatWidget
            label="Trade Expectancy"
            :value="stats.trade_expectancy"
            :variant="parseFloat(stats.trade_expectancy) >= 0 ? 'positive' : 'negative'"
            icon="chart"
          />
          <DashboardStatWidget
            label="Max Drawdown"
            :value="stats.max_drawdown.drawdown"
            :subtitle="stats.max_drawdown.date"
            variant="negative"
            icon="trending-down"
          />
          <DashboardStatWidget
            label="Current Drawdown"
            :value="stats.current_drawdown.drawdown"
            :subtitle="stats.current_drawdown.date"
            variant="warning"
            icon="trending-down"
          />
          <DashboardStatWidget
            label="Max Trade Profit"
            :value="stats.maximum_profits"
            variant="positive"
            icon="trending-up"
          />
        </div>
      </div>

      <!-- Streaks -->
      <div>
        <h2 class="text-lg font-semibold text-gray-900 mb-4">Streaks</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <DashboardStatWidget
            label="Max Winning Streak"
            :value="`${stats.trade_streaks.max_wins} trades`"
            variant="positive"
            icon="trending-up"
          />
          <DashboardStatWidget
            label="Max Losing Streak"
            :value="`${stats.trade_streaks.max_losses} trades`"
            variant="negative"
            icon="trending-down"
          />
          <DashboardStatWidget
            label="Current Win Streak"
            :value="`${stats.trade_streaks.current_winning_streak} trades`"
            :variant="stats.trade_streaks.current_winning_streak > 0 ? 'positive' : 'neutral'"
            icon="chart"
          />
          <DashboardStatWidget
            label="Current Loss Streak"
            :value="`${stats.trade_streaks.current_losing_streak} trades`"
            :variant="stats.trade_streaks.current_losing_streak > 0 ? 'negative' : 'neutral'"
            icon="chart"
          />
        </div>
      </div>

      <!-- Costs -->
      <div>
        <h2 class="text-lg font-semibold text-gray-900 mb-4">Trading Costs</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <DashboardStatWidget
            label="Total Commissions"
            :value="stats.total_commissions"
            variant="warning"
            icon="currency"
          />
          <DashboardStatWidget
            label="Total Fees"
            :value="stats.total_fees"
            variant="warning"
            icon="currency"
          />
          <DashboardStatWidget
            label="Total Swap"
            :value="stats.total_swap"
            variant="neutral"
            icon="currency"
          />
        </div>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed } from 'vue'
import { getDashboardStats, type DashboardStatsResponse } from '@/services/FiltersService'
import DashboardStatWidget from '@/components/DashboardStatWidget.vue'

export default defineComponent({
  name: 'DashboardStatsSection',
  components: {
    DashboardStatWidget
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

    const fetchDashboardStats = async () => {
      loading.value = true
      error.value = null

      try {
        const response = await getDashboardStats({
          profits_type: props.profitsType,
          accounts: [props.accountId],
          match_all_playbooks: props.matchAllPlaybooks,
          number_format: props.numberFormat
        })

        stats.value = response.data
      } catch (err: unknown) {
        console.error('Error fetching dashboard stats:', err)
        error.value = err instanceof Error ? err.message : 'Failed to fetch dashboard statistics'
      } finally {
        loading.value = false
      }
    }

    onMounted(() => {
      fetchDashboardStats()
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
