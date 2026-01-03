<template>
  <div class="px-4 sm:px-6 lg:px-8">
    <div class="sm:flex sm:items-center">
      <div class="sm:flex-auto">
        <h1 class="text-base font-semibold leading-6 text-gray-900">Trades</h1>
        <p class="mt-2 text-sm text-gray-700">A list of all your trades including symbol, type, status, and performance.</p>
      </div>
    </div>

    <div v-if="loading" class="mt-8 text-center">
      <p class="text-sm text-gray-500">Loading trades...</p>
    </div>

    <div v-else-if="error" class="mt-8 text-center">
      <p class="text-sm text-red-600">{{ error }}</p>
    </div>

    <div v-else class="mt-8 flow-root">
      <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <table class="min-w-full divide-y divide-gray-300">
            <thead>
              <tr>
                <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                  Symbol
                </th>
                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Type
                </th>
                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Side
                </th>
                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Status
                </th>
                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Quantity
                </th>
                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Entry
                </th>
                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Exit
                </th>
                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  P&L
                </th>
                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  ROI
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
              <tr v-for="trade in trades" :key="trade.id" class="hover:bg-gray-50">
                <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                  {{ trade.symbol }}
                  <span v-if="trade.contractType" class="ml-1 text-xs text-gray-500">
                    {{ formatContract(trade) }}
                  </span>
                </td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {{ trade.spreadType }}
                </td>
                <td class="whitespace-nowrap px-3 py-4 text-sm">
                  <span :class="[
                    trade.side === 'LONG' || trade.side === 'CALL' ? 'text-green-700 bg-green-50' : 'text-red-700 bg-red-50',
                    'inline-flex rounded-full px-2 text-xs font-semibold leading-5'
                  ]">
                    {{ trade.side }}
                  </span>
                </td>
                <td class="whitespace-nowrap px-3 py-4 text-sm">
                  <span :class="[
                    trade.status === 'OPEN' ? 'text-blue-700 bg-blue-50' : 'text-gray-700 bg-gray-50',
                    'inline-flex rounded-full px-2 text-xs font-semibold leading-5'
                  ]">
                    {{ trade.status }}
                  </span>
                </td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {{ trade.quantity }}
                </td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  ${{ trade.entryPrice.toFixed(2) }}
                </td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {{ trade.status === 'CLOSED' ? `$${trade.avgSellPrice.toFixed(2)}` : '-' }}
                </td>
                <td class="whitespace-nowrap px-3 py-4 text-sm font-medium">
                  <span :class="trade.netProfits >= 0 ? 'text-green-600' : 'text-red-600'">
                    {{ formatProfits(trade.netProfits) }}
                  </span>
                </td>
                <td class="whitespace-nowrap px-3 py-4 text-sm">
                  <span :class="trade.netRoi >= 0 ? 'text-green-600' : 'text-red-600'">
                    {{ formatRoi(trade.netRoi) }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>

          <div v-if="trades.length === 0" class="text-center py-12">
            <p class="text-sm text-gray-500">No trades found.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { getAllTrades, type Trade } from '@/services/TradesService';

export default defineComponent({
  name: 'TradesListPage',
  setup() {
    const trades = ref<Trade[]>([]);
    const loading = ref(true);
    const error = ref<string | null>(null);

    const formatContract = (trade: Trade) => {
      if (!trade.contractType || !trade.strike || !trade.expiration) {
        return '';
      }
      const expDate = new Date(trade.expiration);
      const expStr = `${expDate.getMonth() + 1}/${expDate.getDate()}/${expDate.getFullYear().toString().slice(-2)}`;
      return `${trade.contractType} $${trade.strike} ${expStr}`;
    };

    const formatProfits = (profits: number) => {
      const sign = profits >= 0 ? '+' : '';
      return `${sign}$${profits.toFixed(2)}`;
    };

    const formatRoi = (roi: number) => {
      const percentage = (roi * 100).toFixed(2);
      const sign = roi >= 0 ? '+' : '';
      return `${sign}${percentage}%`;
    };

    const fetchTrades = async () => {
      try {
        loading.value = true;
        error.value = null;
        const response = await getAllTrades();
        trades.value = response.data.data;
      } catch (err: unknown) {
        console.error('Error fetching trades:', err);
        error.value = (err as { response?: { data?: { message?: string } } }).response?.data?.message || 'Failed to load trades. Please try again later.';
      } finally {
        loading.value = false;
      }
    };

    onMounted(() => {
      fetchTrades();
    });

    return {
      trades,
      loading,
      error,
      formatContract,
      formatProfits,
      formatRoi
    };
  }
});
</script>

<style scoped>
</style>
