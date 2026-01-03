<script setup lang="ts">
import { useHead } from '@unhead/vue'
import SidebarNavigation from '@/components/sidebar/SidebarNavigation.vue'
import StocksPage from '@/components/StocksPage.vue'
import LoginComponent from '@/components/auth/LoginComponent.vue'
import TwoColumnLayout from '@/components/layout/TwoColumnLayout.vue'
import { formatPageTitle } from '@/services/CommonUtils'

useHead({
  title: formatPageTitle("Stocks"),
  meta: [
    { name: 'description', content: '' },
  ],
})

</script>

<template>
  <TwoColumnLayout>
    <template #sidebar>
      <SidebarNavigation />
      <LoginComponent />
    </template>

    <StocksPage />
  </TwoColumnLayout>
</template>
