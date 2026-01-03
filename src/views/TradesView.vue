<script setup lang="ts">
import { useHead } from '@unhead/vue'
import LoginComponent from '@/components/auth/LoginComponent.vue'
import SidebarNavigation from '@/components/sidebar/SidebarNavigation.vue'
import TradesListPage from '@/components/TradesListPage.vue'
import TwoColumnLayout from '@/components/layout/TwoColumnLayout.vue'
import { formatPageTitle } from '@/services/CommonUtils'

useHead({
  title: formatPageTitle("Trades"),
  meta: [
    { name: 'description', content: 'View and manage your trading history' },
  ],
})

</script>

<template>
  <TwoColumnLayout>
    <template #sidebar>
      <SidebarNavigation />
      <LoginComponent />
    </template>

    <TradesListPage />
  </TwoColumnLayout>
</template>
