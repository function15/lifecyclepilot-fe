<script setup lang="ts">
import { useHead } from '@unhead/vue'
import SidebarNavigation from '@/components/sidebar/SidebarNavigation.vue'
import FlowDetailPage from '@/components/cancellation/FlowDetailPage.vue'
import TwoColumnLayout from '@/components/layout/TwoColumnLayout.vue'
import { formatPageTitle } from '@/services/CommonUtils'

useHead({
  title: formatPageTitle('Flow Detail'),
  meta: [
    { name: 'description', content: 'Cancellation Flow Detail' },
  ],
})
</script>

<template>
  <TwoColumnLayout>
    <template #sidebar>
      <SidebarNavigation />
    </template>

    <FlowDetailPage />
  </TwoColumnLayout>
</template>
