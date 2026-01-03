<script setup lang="ts">
import { useHead } from '@unhead/vue'
import SidebarNavigation from '@/components/sidebar/SidebarNavigation.vue'
import LoginComponent from '@/components/auth/LoginComponent.vue'
import HomePage from '../components/HomePage.vue'
import TwoColumnLayout from '@/components/layout/TwoColumnLayout.vue'

useHead({
  title: 'Lifecycle Pilot',
  meta: [
    { name: 'description', content: 'Lifecycle Pilot' },
  ],
});

</script>

<template>
  <TwoColumnLayout>
    <template #sidebar>
      <SidebarNavigation />
      <LoginComponent />
    </template>

    <HomePage />
  </TwoColumnLayout>
</template>
