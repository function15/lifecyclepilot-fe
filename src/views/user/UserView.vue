<script setup lang="ts">
import { useHead } from '@unhead/vue'
import { useRoute } from 'vue-router'
import UserPage from '@/components/UserPage.vue'
import SidebarNavigation from '@/components/sidebar/SidebarNavigation.vue'
import { formatPageTitle } from '@/services/CommonUtils'
import TwoColumnLayout from '@/components/layout/TwoColumnLayout.vue'

const route = useRoute()

useHead({
  title: formatPageTitle('@' + route.params.username),
  meta: [
    { name: 'description', content: '' },
  ],
});
</script>

<template>
  <TwoColumnLayout>
    <template #sidebar>
      <SidebarNavigation />
    </template>

    <UserPage />
  </TwoColumnLayout>
</template>
