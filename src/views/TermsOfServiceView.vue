<script setup lang="ts">
import TermsOfServicePage from '../components/TermsOfServicePage.vue'
import { useHead } from '@unhead/vue'
import { formatPageTitle } from '@/services/CommonUtils'

useHead({
  title: formatPageTitle("Terms Of Service"),
  meta: [
    { name: 'description', content: '' },
  ],
})
</script>

<template>
    <main>
        <TermsOfServicePage />
    </main>
</template>
