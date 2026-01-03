<script setup lang="ts">
import SettingsProlfilePage from '@/components/settings/SettingsProfilePage.vue'
import SidebarNavigation from '@/components/sidebar/SidebarNavigation.vue'
import { useHead } from '@unhead/vue'
import { formatPageTitle } from '@/services/CommonUtils'
import TwoColumnLayout from '@/components/layout/TwoColumnLayout.vue'

useHead({
  title: formatPageTitle('Profile settings'),
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

    <SettingsProlfilePage />
  </TwoColumnLayout>
</template>
