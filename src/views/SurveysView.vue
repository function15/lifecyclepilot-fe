<script setup lang="ts">
import { useHead } from '@unhead/vue'
import SidebarNavigation from '@/components/sidebar/SidebarNavigation.vue'
import SurveysPage from '@/components/cancellation/SurveysPage.vue'
import TwoColumnLayout from '@/components/layout/TwoColumnLayout.vue'
import { formatPageTitle } from '@/services/CommonUtils'

useHead({
  title: formatPageTitle('Surveys'),
  meta: [
    { name: 'description', content: 'Cancellation Surveys' },
  ],
})
</script>

<template>
  <TwoColumnLayout>
    <template #sidebar>
      <SidebarNavigation />
    </template>

    <SurveysPage />
  </TwoColumnLayout>
</template>
