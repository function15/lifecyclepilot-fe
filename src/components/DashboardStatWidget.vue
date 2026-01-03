<template>
  <div class="bg-white rounded-lg shadow-md p-6">
    <div class="flex items-center justify-between">
      <div class="flex-1">
        <p class="text-sm font-medium text-gray-600 mb-1">{{ label }}</p>
        <p class="text-2xl font-bold" :class="valueColor">{{ displayValue }}</p>
        <p v-if="subtitle" class="text-xs text-gray-500 mt-1">{{ subtitle }}</p>
      </div>
      <div v-if="icon" class="flex-shrink-0 ml-4">
        <div class="rounded-full p-3" :class="iconBgColor">
          <component :is="iconComponent" class="w-6 h-6" :class="iconColor" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import {
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  CurrencyDollarIcon,
  ChartBarIcon,
  ClockIcon,
  ScaleIcon
} from '@heroicons/vue/24/outline'

export default defineComponent({
  name: 'DashboardStatWidget',
  components: {
    ArrowTrendingUpIcon,
    ArrowTrendingDownIcon,
    CurrencyDollarIcon,
    ChartBarIcon,
    ClockIcon,
    ScaleIcon
  },
  props: {
    label: {
      type: String,
      required: true
    },
    value: {
      type: [String, Number],
      required: true
    },
    subtitle: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: ''
    },
    variant: {
      type: String,
      default: 'neutral',
      validator: (value: string) => ['positive', 'negative', 'neutral', 'warning'].includes(value)
    },
    formatAsCurrency: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const displayValue = computed(() => {
      if (props.formatAsCurrency && typeof props.value === 'number') {
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD'
        }).format(props.value)
      }
      return props.value
    })

    const valueColor = computed(() => {
      switch (props.variant) {
        case 'positive':
          return 'text-green-600'
        case 'negative':
          return 'text-red-600'
        case 'warning':
          return 'text-yellow-600'
        default:
          return 'text-gray-900'
      }
    })

    const iconBgColor = computed(() => {
      switch (props.variant) {
        case 'positive':
          return 'bg-green-100'
        case 'negative':
          return 'bg-red-100'
        case 'warning':
          return 'bg-yellow-100'
        default:
          return 'bg-gray-100'
      }
    })

    const iconColor = computed(() => {
      switch (props.variant) {
        case 'positive':
          return 'text-green-600'
        case 'negative':
          return 'text-red-600'
        case 'warning':
          return 'text-yellow-600'
        default:
          return 'text-gray-600'
      }
    })

    const iconComponent = computed(() => {
      switch (props.icon) {
        case 'trending-up':
          return ArrowTrendingUpIcon
        case 'trending-down':
          return ArrowTrendingDownIcon
        case 'currency':
          return CurrencyDollarIcon
        case 'chart':
          return ChartBarIcon
        case 'clock':
          return ClockIcon
        case 'scale':
          return ScaleIcon
        default:
          return ChartBarIcon
      }
    })

    return {
      displayValue,
      valueColor,
      iconBgColor,
      iconColor,
      iconComponent
    }
  }
})
</script>
