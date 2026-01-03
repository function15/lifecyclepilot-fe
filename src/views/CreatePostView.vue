<script setup lang="ts">
import { useHead } from '@unhead/vue'
import SidebarNavigation from '@/components/sidebar/SidebarNavigation.vue'
import CreatePostPage from '@/components/post/CreatePostPage.vue'
import TwoColumnLayout from '@/components/layout/TwoColumnLayout.vue'
import { formatPageTitle } from '@/services/CommonUtils'

useHead({
  title: formatPageTitle('Create Post'),
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

    <CreatePostPage />
  </TwoColumnLayout>
</template>
