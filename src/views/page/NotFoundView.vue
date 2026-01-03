<script setup lang="ts">
import NotFoundPage from '../../components/NotFoundPage.vue'
import { useHead } from '@unhead/vue'
import { formatPageTitle } from '@/services/CommonUtils'

useHead({
  title: formatPageTitle("Page Not Found"),
  meta: [
    { name: 'description', content: '' },
  ],
})

</script>

<template>
  <main>
    <NotFoundPage />
  </main>
</template>
