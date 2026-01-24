<script setup lang="ts">
import PostPage from '@/components/PostPage.vue'
import SidebarNavigation from '@/components/sidebar/SidebarNavigation.vue'
import { useHead } from '@unhead/vue'
import { formatPageTitle } from '@/services/CommonUtils'
import TwoColumnLayout from '@/components/layout/TwoColumnLayout.vue'

useHead({
  title: formatPageTitle('Post'),
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

    <PostPage />
  </TwoColumnLayout>
</template>
