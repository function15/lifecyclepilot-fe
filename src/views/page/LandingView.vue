<script setup lang="ts">
import { useHead } from '@unhead/vue'
import LandingPage from '@/components/LandingPage.vue'

useHead({
  title: 'Lower Your Churn',
  meta: [
    {
      name: 'description',
      content:
        'Reduce churn by up to 40% with intelligent cancellation flows that personalize offers, discounts, and alternatives for every customer. Built for subscription businesses that want to maximize retention.'
    }
  ]
})
</script>

<template>
  <LandingPage />
</template>
