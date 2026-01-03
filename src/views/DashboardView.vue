<script setup lang="ts">
import { useHead } from '@unhead/vue'
import SidebarNavigation from '@/components/sidebar/SidebarNavigation.vue'
import LoginComponent from '@/components/auth/LoginComponent.vue'
import DashboardPage from '@/components/DashboardPage.vue'
import TwoColumnLayout from '@/components/layout/TwoColumnLayout.vue'
import { formatPageTitle } from '@/services/CommonUtils'

useHead({
  title: formatPageTitle("Dashboard"),
  meta: [
    { name: 'description', content: 'Trading Dashboard' },
  ],
})
</script>

<template>
  <TwoColumnLayout>
    <template #sidebar>
      <SidebarNavigation />
      <LoginComponent />
    </template>

    <DashboardPage />
  </TwoColumnLayout>
</template>
