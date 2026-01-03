<script setup lang="ts">
import { useHead } from '@unhead/vue'
import LoginComponent from '@/components/auth/LoginComponent.vue'
import SidebarNavigation from '@/components/sidebar/SidebarNavigation.vue'
import { useRoute } from 'vue-router'
import StockPage from '@/components/StockPage.vue'
import { formatPageTitle } from '@/services/CommonUtils'
import TwoColumnLayout from '@/components/layout/TwoColumnLayout.vue'

const route = useRoute()

useHead({
  title: formatPageTitle('$' + route.params.stock),
  meta: [
    { name: 'description', content: '' },
  ],
})

</script>

<template>
  <TwoColumnLayout>
    <template #sidebar>
      <SidebarNavigation />
      <LoginComponent />
    </template>

    <StockPage />
  </TwoColumnLayout>
</template>
