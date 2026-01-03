<template>
  <div class="bg-white">
    <!-- Hero Section -->
    <div class="relative isolate overflow-hidden bg-gradient-to-b from-blue-100/20">
      <div class="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div class="mx-auto max-w-2xl text-center">
          <h1 class="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Powerful Trading Journal for Stock Market Traders
          </h1>
          <p class="mt-6 text-lg leading-8 text-gray-600">
            Track every trade, analyze your performance, and make data-driven decisions.
            Join thousands of traders who have improved their trading with our comprehensive journal.
          </p>
          <div class="mt-10 flex items-center justify-center gap-x-6">
            <router-link
              to="/tracking"
              class="rounded-md bg-blue-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              Get Started
            </router-link>
            <router-link
              :to="{ name: 'about' }"
              class="text-base font-semibold leading-7 text-gray-900"
            >
              Learn more <span aria-hidden="true">→</span>
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <!-- Features Section -->
    <div class="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
      <div class="mx-auto max-w-2xl lg:text-center">
        <h2 class="text-base font-semibold leading-7 text-blue-600">Trade Smarter</h2>
        <p class="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Everything you need to track your trading journey
        </p>
        <p class="mt-6 text-lg leading-8 text-gray-600">
          Our trading journal provides professional tools to help you become a better trader through detailed analytics and insights.
        </p>
      </div>

      <div class="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
        <dl class="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
          <div v-for="feature in features" :key="feature.name" class="flex flex-col">
            <dt class="text-base font-semibold leading-7 text-gray-900">
              <div class="mb-6 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
                <component :is="feature.icon" class="h-6 w-6 text-white" aria-hidden="true" />
              </div>
              {{ feature.name }}
            </dt>
            <dd class="mt-1 flex flex-auto flex-col text-base leading-7 text-gray-600">
              <p class="flex-auto">{{ feature.description }}</p>
            </dd>
          </div>
        </dl>
      </div>
    </div>

    <!-- Stats Section -->
    <div class="bg-blue-600 py-24 sm:py-32">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="mx-auto max-w-2xl lg:max-w-none">
          <div class="text-center">
            <h2 class="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Trusted by traders worldwide
            </h2>
            <p class="mt-4 text-lg leading-8 text-blue-200">
              Join the community of successful traders
            </p>
          </div>
          <dl class="mt-16 grid grid-cols-1 gap-0.5 overflow-hidden rounded-2xl text-center sm:grid-cols-2 lg:grid-cols-3">
            <div v-for="stat in stats" :key="stat.name" class="flex flex-col bg-white/5 p-8">
              <dt class="text-sm font-semibold leading-6 text-blue-200">{{ stat.name }}</dt>
              <dd class="order-first text-3xl font-semibold tracking-tight text-white">{{ stat.value }}</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>

    <!-- CTA Section -->
    <div class="bg-white">
      <div class="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div class="mx-auto max-w-2xl text-center">
          <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Ready to improve your trading?
          </h2>
          <p class="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-600">
            Start tracking your trades today and gain the insights you need to become a more profitable trader.
          </p>
          <div class="mt-10 flex items-center justify-center gap-x-6">
            <router-link
              to="/tracking"
              class="rounded-md bg-blue-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              Start Your Journey
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <footer class="bg-gray-900" aria-labelledby="footer-heading">
      <h2 id="footer-heading" class="sr-only">Footer</h2>
      <div class="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
        <div class="mt-16 border-t border-white/10 pt-8 sm:mt-20 lg:mt-24">
          <nav class="flex gap-x-8 pb-6">
            <router-link
              v-for="item in footerNavigation"
              :key="item.name"
              :to="{ name: item.route }"
              class="text-sm leading-6 text-gray-300 hover:text-white"
            >
              {{ item.name }}
            </router-link>
          </nav>
          <p class="text-xs leading-5 text-gray-400">
            &copy; {{ new Date().getFullYear() }} lifecyclepilot.com. All rights reserved.
          </p>
          <p class="mt-4 text-xs leading-5 text-gray-400">
            Trading futures, currency & options involves substantial risk & is not appropriate for everyone.
            Only risk capital should be used for trading.
            <router-link class="underline hover:text-white ml-1" :to="{ name: 'disclaimer' }">
              Read our Full Risk Disclosure Here
            </router-link>
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script lang="ts">
import { defineComponent, h } from 'vue'

// Simple icon components
const ChartBarIcon = {
  render: () => h('svg', {
    xmlns: 'http://www.w3.org/2000/svg',
    fill: 'none',
    viewBox: '0 0 24 24',
    'stroke-width': '1.5',
    stroke: 'currentColor'
  }, [
    h('path', {
      'stroke-linecap': 'round',
      'stroke-linejoin': 'round',
      d: 'M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z'
    })
  ])
}

const DocumentTextIcon = {
  render: () => h('svg', {
    xmlns: 'http://www.w3.org/2000/svg',
    fill: 'none',
    viewBox: '0 0 24 24',
    'stroke-width': '1.5',
    stroke: 'currentColor'
  }, [
    h('path', {
      'stroke-linecap': 'round',
      'stroke-linejoin': 'round',
      d: 'M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z'
    })
  ])
}

const BellAlertIcon = {
  render: () => h('svg', {
    xmlns: 'http://www.w3.org/2000/svg',
    fill: 'none',
    viewBox: '0 0 24 24',
    'stroke-width': '1.5',
    stroke: 'currentColor'
  }, [
    h('path', {
      'stroke-linecap': 'round',
      'stroke-linejoin': 'round',
      d: 'M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0M3.124 7.5A8.969 8.969 0 015.292 3m13.416 0a8.969 8.969 0 012.168 4.5'
    })
  ])
}

const CurrencyDollarIcon = {
  render: () => h('svg', {
    xmlns: 'http://www.w3.org/2000/svg',
    fill: 'none',
    viewBox: '0 0 24 24',
    'stroke-width': '1.5',
    stroke: 'currentColor'
  }, [
    h('path', {
      'stroke-linecap': 'round',
      'stroke-linejoin': 'round',
      d: 'M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
    })
  ])
}

const ClipboardDocumentListIcon = {
  render: () => h('svg', {
    xmlns: 'http://www.w3.org/2000/svg',
    fill: 'none',
    viewBox: '0 0 24 24',
    'stroke-width': '1.5',
    stroke: 'currentColor'
  }, [
    h('path', {
      'stroke-linecap': 'round',
      'stroke-linejoin': 'round',
      d: 'M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z'
    })
  ])
}

const LightBulbIcon = {
  render: () => h('svg', {
    xmlns: 'http://www.w3.org/2000/svg',
    fill: 'none',
    viewBox: '0 0 24 24',
    'stroke-width': '1.5',
    stroke: 'currentColor'
  }, [
    h('path', {
      'stroke-linecap': 'round',
      'stroke-linejoin': 'round',
      d: 'M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18'
    })
  ])
}

export default defineComponent({
  name: 'LandingPage',
  setup() {
    const features = [
      {
        name: 'Trade Tracking',
        description: 'Record every trade with detailed entry and exit data. Track stocks, options, futures, and more with comprehensive trade logs.',
        icon: ClipboardDocumentListIcon,
      },
      {
        name: 'Performance Analytics',
        description: 'Visualize your trading performance with advanced charts and metrics. Identify patterns, strengths, and areas for improvement.',
        icon: ChartBarIcon,
      },
      {
        name: 'Trade Notes & Tags',
        description: 'Add detailed notes, screenshots, and tags to each trade. Document your thought process and learn from every trade.',
        icon: DocumentTextIcon,
      },
      {
        name: 'Profit & Loss Tracking',
        description: 'Monitor your P&L in real-time. Track daily, weekly, monthly, and all-time performance with detailed breakdowns.',
        icon: CurrencyDollarIcon,
      },
      {
        name: 'Real-time Alerts',
        description: 'Stay informed with notifications about your portfolio and trading activity. Never miss important market movements.',
        icon: BellAlertIcon,
      },
      {
        name: 'Trading Insights',
        description: 'Get actionable insights from your trading data. Discover your best setups, optimal trading times, and winning strategies.',
        icon: LightBulbIcon,
      },
    ]

    const stats = [
      { name: 'Trades Tracked', value: '1M+' },
      { name: 'Active Traders', value: '10K+' },
      { name: 'Average Win Rate Improvement', value: '23%' },
    ]

    const footerNavigation = [
      { name: 'About', route: 'about' },
      { name: 'Disclaimer', route: 'disclaimer' },
      { name: 'Privacy Policy', route: 'privacy-policy' },
      { name: 'Terms of Service', route: 'terms-of-service' },
    ]

    return {
      features,
      stats,
      footerNavigation,
    }
  }
})
</script>
