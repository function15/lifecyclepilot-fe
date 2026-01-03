<script setup lang="ts">
import PrivacyPolicyPage from '../../components/PrivacyPolicyPage.vue'
import { useHead } from '@unhead/vue'
import { formatPageTitle } from '@/services/CommonUtils'

useHead({
  title: formatPageTitle("Privacy Policy"),
  meta: [
    { name: 'description', content: '' },
  ],
})

</script>

<template>
    <main>
        <PrivacyPolicyPage />
    </main>
</template>
