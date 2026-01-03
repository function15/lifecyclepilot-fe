<script setup lang="ts">
import DisclaimerPage from '../../components/DisclaimerPage.vue'
import { useHead } from '@unhead/vue'
import { formatPageTitle } from '@/services/CommonUtils'

useHead({
  title: formatPageTitle("Disclaimer"),
  meta: [
    { name: 'description', content: '' },
  ],
})
</script>

<template>
    <main>
        <DisclaimerPage />
    </main>
</template>
