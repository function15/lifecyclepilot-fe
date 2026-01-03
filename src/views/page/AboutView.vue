<script setup lang="ts">
import AboutPage from '../../components/AboutPage.vue'
import SidebarNavigation from '@/components/sidebar/SidebarNavigation.vue'
import LoginComponent from '@/components/auth/LoginComponent.vue'
import { useHead } from '@unhead/vue'
import { formatPageTitle } from '@/services/CommonUtils'
import TwoColumnLayout from '@/components/layout/TwoColumnLayout.vue'

useHead({
  title: formatPageTitle("About"),
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

    <AboutPage />
  </TwoColumnLayout>
</template>
