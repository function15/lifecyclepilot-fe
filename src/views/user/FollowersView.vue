<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useHead } from '@unhead/vue'
import { useRoute } from 'vue-router'
import UserListPage from '@/components/UserListPage.vue'
import SidebarNavigation from '@/components/sidebar/SidebarNavigation.vue'
import LoginComponent from '@/components/auth/LoginComponent.vue'
import { useUserStore } from '@/stores/user'
import { formatPageTitle } from '@/services/CommonUtils'
import TwoColumnLayout from '@/components/layout/TwoColumnLayout.vue'

const route = useRoute()
const userStore = useUserStore()
const followers = ref<string[]>([])
const username = ref<string>((Array.isArray(route.params.username) ? route.params.username[0] : route.params.username) as string || '')

useHead({
  title: formatPageTitle('Followers of @' + route.params.username),
  meta: [
    { name: 'description', content: '' },
  ],
})

onMounted(async () => {
  await userStore.loadUserByUsername(route.params.username as string)
  followers.value = userStore.user?.followers || []
})
</script>

<template>
  <TwoColumnLayout>
    <template #sidebar>
      <SidebarNavigation />
      <LoginComponent />
    </template>

    <UserListPage :usersIds="followers" :title="'Followers'" :username="username" />
  </TwoColumnLayout>
</template>
