<script setup lang="ts">
import { useHead } from '@unhead/vue'
import SidebarNavigation from '@/components/sidebar/SidebarNavigation.vue'
import DashboardPage from '@/components/DashboardPage.vue'
import TwoColumnLayout from '@/components/layout/TwoColumnLayout.vue'
import { formatPageTitle } from '@/services/CommonUtils'

useHead({
  title: formatPageTitle("Cancellation Flows"),
  meta: [
    { name: 'description', content: 'Cancellation Flows' },
  ],
})
</script>

<template>
  <TwoColumnLayout>
    <template #sidebar>
      <SidebarNavigation />
    </template>

    <DashboardPage />
  </TwoColumnLayout>
</template>
