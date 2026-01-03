<script setup lang="ts">
import { useHead } from '@unhead/vue'
import LandingPage from '@/components/LandingPage.vue'

useHead({
  title: 'Lifecycle Pilot - Improve Your Free-to-Paid Conversion Rate',
  meta: [
    {
      name: 'description',
      content:
        'Track, analyze, and improve your trading performance with our comprehensive trading journal. Built for stock market traders who want to take their trading to the next level.'
    }
  ]
})
</script>

<template>
  <LandingPage />
</template>
