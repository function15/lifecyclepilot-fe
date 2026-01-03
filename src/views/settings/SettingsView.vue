<script setup lang="ts">
import SettingsPage from '@/components/settings/SettingsPage.vue'
import SidebarNavigation from '@/components/sidebar/SidebarNavigation.vue'
import { useHead } from '@unhead/vue'
import { formatPageTitle } from '@/services/CommonUtils'
import TwoColumnLayout from '@/components/layout/TwoColumnLayout.vue'

useHead({
  title: formatPageTitle('Settings'),
  meta: [
    { name: 'description', content: '' }
  ]
})

</script>

<template>
  <TwoColumnLayout>
    <template #sidebar>
      <SidebarNavigation />
    </template>

    <SettingsPage />
  </TwoColumnLayout>
</template>
