<script setup lang="ts">
import { useHead } from '@unhead/vue'
import SidebarNavigation from '@/components/sidebar/SidebarNavigation.vue'
import LoginComponent from '@/components/auth/LoginComponent.vue'
import { formatPageTitle } from '@/services/CommonUtils'
import LikedPostsPage from '@/components/LikedPostsPage.vue'
import TwoColumnLayout from '@/components/layout/TwoColumnLayout.vue'

useHead({
  title: formatPageTitle( 'Liked Posts'),
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

    <LikedPostsPage />
  </TwoColumnLayout>
</template>
