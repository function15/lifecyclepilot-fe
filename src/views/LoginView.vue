<script setup lang="ts">
import SidebarNavigation from '@/components/sidebar/SidebarNavigation.vue'
import LoginComponent from '@/components/auth/LoginComponent.vue'
import TwoColumnLayout from '@/components/layout/TwoColumnLayout.vue'
</script>

<template>
  <TwoColumnLayout>
    <template #sidebar>
      <SidebarNavigation />
    </template>

    <LoginComponent />
  </TwoColumnLayout>
</template>
