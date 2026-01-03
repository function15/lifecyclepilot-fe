<script setup lang="ts">
import SidebarNavigation from '@/components/sidebar/SidebarNavigation.vue'
import { useHead } from '@unhead/vue'
import LoginComponent from '@/components/auth/LoginComponent.vue'
import { formatPageTitle } from '@/services/CommonUtils'
import TwoColumnLayout from '@/components/layout/TwoColumnLayout.vue'

useHead({
  title: formatPageTitle('Notifications'),
  meta: [
    { name: 'description', content: '' },
  ],
});

</script>

<template>
  <TwoColumnLayout>
    <template #sidebar>
      <SidebarNavigation />
      <LoginComponent />
    </template>

    Notifications
  </TwoColumnLayout>
</template>
