<template>
  <div class="bg-white">
    <!-- Top Menu -->
    <header class="fixed inset-x-0 top-0 z-50 h-[60px] bg-white shadow-sm">
      <nav class="mx-auto flex h-full max-w-7xl items-center justify-between px-6 lg:px-8">
        <div class="flex items-center">
          <router-link :to="{ name: 'landing' }" class="flex items-center">
            <img src="@/assets/trader-logo.svg" alt="LifecyclePilot" class="h-8 w-auto" />
          </router-link>
        </div>
        <div class="flex items-center gap-x-8">
          <a href="#" class="text-sm font-semibold leading-6 text-gray-900 hover:text-yellow-500">Pricing</a>
          <a href="#" class="text-sm font-semibold leading-6 text-gray-900 hover:text-yellow-500">FAQ</a>
          <router-link
            :to="{ name: 'login' }"
            class="text-sm font-semibold leading-6 text-gray-900 hover:text-yellow-500"
          >
            Login
          </router-link>
        </div>
      </nav>
    </header>

    <!-- Hero Section -->
    <div class="relative isolate overflow-hidden bg-gradient-to-b from-yellow-100/20 pt-[74px]">
      <div class="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div class="mx-auto max-w-2xl text-center">
          <h1 class="text-5xl font-bold tracking-tight text-gray-900 sm:text-7xl">
            Cancellation Flows
          </h1>
          <p class="mt-8 text-xl leading-8 text-gray-600">
            Reduce cancellations up to 54%<br />
            Effortlessly increase customer loyalty<br />
            Extend LTV every month
          </p>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <footer class="bg-black" aria-labelledby="footer-heading">
      <h2 id="footer-heading" class="sr-only">Footer</h2>
      <div class="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
        <div class="mt-16 border-t border-white/10 pt-8 sm:mt-20 lg:mt-24">
          <nav class="flex gap-x-8 pb-6">
            <router-link
              v-for="item in footerNavigation"
              :key="item.name"
              :to="{ name: item.route }"
              class="text-sm leading-6 text-gray-300 hover:text-yellow-400"
            >
              {{ item.name }}
            </router-link>
          </nav>
          <p class="text-xs leading-5 text-gray-400">
            &copy; {{ new Date().getFullYear() }} LifecyclePilot. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script lang="ts">
import { defineComponent, h } from 'vue'

// Icon components
const SparklesIcon = {
  render: () =>
    h(
      'svg',
      {
        xmlns: 'http://www.w3.org/2000/svg',
        fill: 'none',
        viewBox: '0 0 24 24',
        'stroke-width': '1.5',
        stroke: 'currentColor'
      },
      [
        h('path', {
          'stroke-linecap': 'round',
          'stroke-linejoin': 'round',
          d: 'M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z'
        })
      ]
    )
}

const AdjustmentsHorizontalIcon = {
  render: () =>
    h(
      'svg',
      {
        xmlns: 'http://www.w3.org/2000/svg',
        fill: 'none',
        viewBox: '0 0 24 24',
        'stroke-width': '1.5',
        stroke: 'currentColor'
      },
      [
        h('path', {
          'stroke-linecap': 'round',
          'stroke-linejoin': 'round',
          d: 'M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75'
        })
      ]
    )
}

const ChartBarIcon = {
  render: () =>
    h(
      'svg',
      {
        xmlns: 'http://www.w3.org/2000/svg',
        fill: 'none',
        viewBox: '0 0 24 24',
        'stroke-width': '1.5',
        stroke: 'currentColor'
      },
      [
        h('path', {
          'stroke-linecap': 'round',
          'stroke-linejoin': 'round',
          d: 'M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z'
        })
      ]
    )
}

const PauseCircleIcon = {
  render: () =>
    h(
      'svg',
      {
        xmlns: 'http://www.w3.org/2000/svg',
        fill: 'none',
        viewBox: '0 0 24 24',
        'stroke-width': '1.5',
        stroke: 'currentColor'
      },
      [
        h('path', {
          'stroke-linecap': 'round',
          'stroke-linejoin': 'round',
          d: 'M14.25 9v6m-4.5 0V9M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
        })
      ]
    )
}

const ReceiptPercentIcon = {
  render: () =>
    h(
      'svg',
      {
        xmlns: 'http://www.w3.org/2000/svg',
        fill: 'none',
        viewBox: '0 0 24 24',
        'stroke-width': '1.5',
        stroke: 'currentColor'
      },
      [
        h('path', {
          'stroke-linecap': 'round',
          'stroke-linejoin': 'round',
          d: 'M9 14.25l6-6m4.5-3.493V21.75l-3.75-1.5-3.75 1.5-3.75-1.5-3.75 1.5V4.757c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0c1.1.128 1.907 1.077 1.907 2.185zM9.75 9h.008v.008H9.75V9zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm4.125 4.5h.008v.008h-.008V13.5zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z'
        })
      ]
    )
}

const ArrowsRightLeftIcon = {
  render: () =>
    h(
      'svg',
      {
        xmlns: 'http://www.w3.org/2000/svg',
        fill: 'none',
        viewBox: '0 0 24 24',
        'stroke-width': '1.5',
        stroke: 'currentColor'
      },
      [
        h('path', {
          'stroke-linecap': 'round',
          'stroke-linejoin': 'round',
          d: 'M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5'
        })
      ]
    )
}

const ClockIcon = {
  render: () =>
    h(
      'svg',
      {
        xmlns: 'http://www.w3.org/2000/svg',
        fill: 'none',
        viewBox: '0 0 24 24',
        'stroke-width': '1.5',
        stroke: 'currentColor'
      },
      [
        h('path', {
          'stroke-linecap': 'round',
          'stroke-linejoin': 'round',
          d: 'M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z'
        })
      ]
    )
}

const GiftIcon = {
  render: () =>
    h(
      'svg',
      {
        xmlns: 'http://www.w3.org/2000/svg',
        fill: 'none',
        viewBox: '0 0 24 24',
        'stroke-width': '1.5',
        stroke: 'currentColor'
      },
      [
        h('path', {
          'stroke-linecap': 'round',
          'stroke-linejoin': 'round',
          d: 'M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z'
        })
      ]
    )
}

const BeakerIcon = {
  render: () =>
    h(
      'svg',
      {
        xmlns: 'http://www.w3.org/2000/svg',
        fill: 'none',
        viewBox: '0 0 24 24',
        'stroke-width': '1.5',
        stroke: 'currentColor'
      },
      [
        h('path', {
          'stroke-linecap': 'round',
          'stroke-linejoin': 'round',
          d: 'M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5'
        })
      ]
    )
}

const CodeBracketIcon = {
  render: () =>
    h(
      'svg',
      {
        xmlns: 'http://www.w3.org/2000/svg',
        fill: 'none',
        viewBox: '0 0 24 24',
        'stroke-width': '1.5',
        stroke: 'currentColor'
      },
      [
        h('path', {
          'stroke-linecap': 'round',
          'stroke-linejoin': 'round',
          d: 'M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5'
        })
      ]
    )
}

const LanguageIcon = {
  render: () =>
    h(
      'svg',
      {
        xmlns: 'http://www.w3.org/2000/svg',
        fill: 'none',
        viewBox: '0 0 24 24',
        'stroke-width': '1.5',
        stroke: 'currentColor'
      },
      [
        h('path', {
          'stroke-linecap': 'round',
          'stroke-linejoin': 'round',
          d: 'M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 01-3.827-5.802'
        })
      ]
    )
}

const PaintBrushIcon = {
  render: () =>
    h(
      'svg',
      {
        xmlns: 'http://www.w3.org/2000/svg',
        fill: 'none',
        viewBox: '0 0 24 24',
        'stroke-width': '1.5',
        stroke: 'currentColor'
      },
      [
        h('path', {
          'stroke-linecap': 'round',
          'stroke-linejoin': 'round',
          d: 'M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42'
        })
      ]
    )
}

const UsersIcon = {
  render: () =>
    h(
      'svg',
      {
        xmlns: 'http://www.w3.org/2000/svg',
        fill: 'none',
        viewBox: '0 0 24 24',
        'stroke-width': '1.5',
        stroke: 'currentColor'
      },
      [
        h('path', {
          'stroke-linecap': 'round',
          'stroke-linejoin': 'round',
          d: 'M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z'
        })
      ]
    )
}

const ShieldCheckIcon = {
  render: () =>
    h(
      'svg',
      {
        xmlns: 'http://www.w3.org/2000/svg',
        fill: 'none',
        viewBox: '0 0 24 24',
        'stroke-width': '1.5',
        stroke: 'currentColor'
      },
      [
        h('path', {
          'stroke-linecap': 'round',
          'stroke-linejoin': 'round',
          d: 'M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z'
        })
      ]
    )
}

const ArrowPathIcon = {
  render: () =>
    h(
      'svg',
      {
        xmlns: 'http://www.w3.org/2000/svg',
        fill: 'none',
        viewBox: '0 0 24 24',
        'stroke-width': '1.5',
        stroke: 'currentColor'
      },
      [
        h('path', {
          'stroke-linecap': 'round',
          'stroke-linejoin': 'round',
          d: 'M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99'
        })
      ]
    )
}

const UserGroupIcon = {
  render: () =>
    h(
      'svg',
      {
        xmlns: 'http://www.w3.org/2000/svg',
        fill: 'none',
        viewBox: '0 0 24 24',
        'stroke-width': '1.5',
        stroke: 'currentColor'
      },
      [
        h('path', {
          'stroke-linecap': 'round',
          'stroke-linejoin': 'round',
          d: 'M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z'
        })
      ]
    )
}

const CheckCircleIcon = {
  render: () =>
    h(
      'svg',
      {
        xmlns: 'http://www.w3.org/2000/svg',
        fill: 'none',
        viewBox: '0 0 24 24',
        'stroke-width': '1.5',
        stroke: 'currentColor'
      },
      [
        h('path', {
          'stroke-linecap': 'round',
          'stroke-linejoin': 'round',
          d: 'M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
        })
      ]
    )
}

const RocketLaunchIcon = {
  render: () =>
    h(
      'svg',
      {
        xmlns: 'http://www.w3.org/2000/svg',
        fill: 'none',
        viewBox: '0 0 24 24',
        'stroke-width': '1.5',
        stroke: 'currentColor'
      },
      [
        h('path', {
          'stroke-linecap': 'round',
          'stroke-linejoin': 'round',
          d: 'M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z'
        })
      ]
    )
}

const LightBulbIcon = {
  render: () =>
    h(
      'svg',
      {
        xmlns: 'http://www.w3.org/2000/svg',
        fill: 'none',
        viewBox: '0 0 24 24',
        'stroke-width': '1.5',
        stroke: 'currentColor'
      },
      [
        h('path', {
          'stroke-linecap': 'round',
          'stroke-linejoin': 'round',
          d: 'M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18'
        })
      ]
    )
}

const CubeTransparentIcon = {
  render: () =>
    h(
      'svg',
      {
        xmlns: 'http://www.w3.org/2000/svg',
        fill: 'none',
        viewBox: '0 0 24 24',
        'stroke-width': '1.5',
        stroke: 'currentColor'
      },
      [
        h('path', {
          'stroke-linecap': 'round',
          'stroke-linejoin': 'round',
          d: 'M21 7.5l-2.25-1.313M21 7.5v2.25m0-2.25l-2.25 1.313M3 7.5l2.25-1.313M3 7.5l2.25 1.313M3 7.5v2.25m9 3l2.25-1.313M12 12.75l-2.25-1.313M12 12.75V15m0 6.75l2.25-1.313M12 21.75V19.5m0 2.25l-2.25-1.313m0-16.875L12 2.25l2.25 1.313M21 14.25v2.25l-2.25 1.313m-13.5 0L3 16.5v-2.25'
        })
      ]
    )
}

export default defineComponent({
  name: 'LandingPage',
  setup() {
    const stats = [
      { label: 'Churn Reduction', value: '40%' },
      { label: 'Average Retention Lift', value: '2.3x' },
      { label: 'Setup Time', value: '<10min' },
      { label: 'Customer Satisfaction', value: '98%' }
    ]

    const primaryFeatures = [
      {
        name: 'Personalization for Every Customer',
        description:
          'Leverage customer behavior, usage patterns, and custom attributes to show the right offer at the right time. Each customer gets a unique experience tailored to their situation.',
        icon: SparklesIcon
      },
      {
        name: 'Dynamic Flow Branching',
        description:
          'Create sophisticated decision trees that adapt based on customer responses, attributes, and behavior. Guide each customer down the optimal path to retention.',
        icon: ArrowPathIcon
      },
      {
        name: 'Built-In A/B Testing',
        description:
          'Test different offers, messaging, and flow structures to discover what works best. Automatically optimize your cancellation flows based on real data.',
        icon: BeakerIcon
      }
    ]

    const offers = [
      {
        name: 'Subscription Pauses',
        description:
          'Let customers temporarily pause their subscription instead of canceling. Perfect for seasonal businesses or customers going through temporary changes.',
        icon: PauseCircleIcon
      },
      {
        name: 'Discounts & Promotions',
        description:
          'Offer personalized discounts based on customer lifetime value, tenure, or cancel reason. Target high-value customers with compelling offers.',
        icon: ReceiptPercentIcon
      },
      {
        name: 'Plan Changes',
        description:
          'Suggest alternative plans that better fit customer needs. Downgrade options keep customers subscribed at a lower tier instead of churning completely.',
        icon: ArrowsRightLeftIcon
      },
      {
        name: 'Payment Delays',
        description:
          'Give customers more time to pay without losing access. Especially effective for customers experiencing temporary financial constraints.',
        icon: ClockIcon
      },
      {
        name: 'Trial Extensions',
        description:
          'Automatically extend free trials for users who need more time to see value. Convert more trials into paying customers.',
        icon: GiftIcon
      },
      {
        name: 'Custom Offers',
        description:
          'Create any type of retention offer that fits your business model. Mix and match multiple offer types in a single flow.',
        icon: SparklesIcon
      }
    ]

    const advancedFeatures = [
      {
        name: 'Visual Flow Editor',
        description:
          'Build sophisticated cancellation flows with our visual editor. Easy to create, test, and iterate on your retention strategy.',
        icon: CodeBracketIcon
      },
      {
        name: 'Unlimited Customer Segments',
        description:
          'Create precise segments based on any customer attribute, behavior, or usage pattern. Target the right customers with the right offers.',
        icon: UserGroupIcon
      },
      {
        name: 'Custom Attributes',
        description:
          'Use your own customer data for advanced targeting and personalization. Integrate seamlessly with your existing systems.',
        icon: AdjustmentsHorizontalIcon
      },
      {
        name: 'Anti-Gamification Measures',
        description:
          'Prevent offer abuse with built-in safeguards. Control offer frequency, eligibility, and conditions to maintain business integrity.',
        icon: ShieldCheckIcon
      },
      {
        name: 'Multi-Language Support',
        description:
          'Deliver localized experiences for global audiences. Support for dozens of languages with automatic translation capabilities.',
        icon: LanguageIcon
      },
      {
        name: 'Custom Branding',
        description:
          'White-label the entire experience with your brand colors, logos, and custom CSS. Create seamless experiences that match your product.',
        icon: PaintBrushIcon
      },
      {
        name: 'Unlimited Team Members',
        description:
          'Collaborate with your entire team. Role-based permissions keep everyone aligned without compromising security.',
        icon: UsersIcon
      },
      {
        name: 'Block Paused Accounts',
        description:
          'Control access for paused subscriptions. Decide whether paused users retain full, partial, or no access to your service.',
        icon: ShieldCheckIcon
      }
    ]

    const segmentationFeatures = [
      {
        name: 'Behavioral Targeting',
        description:
          'Segment customers based on product usage, feature adoption, engagement levels, and activity patterns.'
      },
      {
        name: 'Custom Attributes',
        description:
          'Use your own customer data like industry, company size, plan type, or any other attribute for precise targeting.'
      },
      {
        name: 'Dynamic Segments',
        description:
          'Segments update automatically as customer behavior changes, ensuring the right customers always see the right offers.'
      },
      {
        name: 'Segment Analytics',
        description:
          'Understand retention rates, lifetime value, and churn risk for each segment to optimize your strategy.'
      }
    ]

    const abTestingBenefits = [
      {
        name: 'Easy Experimentation',
        description:
          'Create A/B tests in minutes. Test different offers, messaging, timing, and flow structures.',
        icon: RocketLaunchIcon
      },
      {
        name: 'Statistical Significance',
        description:
          'Automatically calculate confidence intervals and statistical significance. Know when you have a clear winner.',
        icon: ChartBarIcon
      },
      {
        name: 'Continuous Optimization',
        description:
          'Run multiple experiments simultaneously. Continuously improve your retention rates through data-driven decisions.',
        icon: LightBulbIcon
      }
    ]

    const footerNavigation = [
      { name: 'About', route: 'about' },
      { name: 'Terms of Service', route: 'terms-of-service' },
      { name: 'Privacy Policy', route: 'privacy-policy' }
    ]

    return {
      stats,
      primaryFeatures,
      offers,
      advancedFeatures,
      segmentationFeatures,
      abTestingBenefits,
      footerNavigation,
      CubeTransparentIcon,
      UserGroupIcon,
      CheckCircleIcon
    }
  }
})
</script>
