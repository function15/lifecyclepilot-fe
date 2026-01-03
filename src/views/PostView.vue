<script setup lang="ts">
import PostPage from '@/components/PostPage.vue'
import SidebarNavigation from '@/components/sidebar/SidebarNavigation.vue'
import { useHead } from '@unhead/vue'
import { computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import LoginComponent from '@/components/auth/LoginComponent.vue'
import { formatPageTitle } from '@/services/CommonUtils'
import TwoColumnLayout from '@/components/layout/TwoColumnLayout.vue'

const store = useAuthStore()
const username = computed(() => store.loggedInUser?.username || '')

useHead({
  title: formatPageTitle(username.value),
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

    <PostPage />
  </TwoColumnLayout>
</template>
