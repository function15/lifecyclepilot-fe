<template>
  <main>
    <router-link :to="{name: 'landing'}" class="mb-8 block">
      <img src="/assets/images/logo.svg" alt="LifecyclePilot" class="h-8 w-auto" />
    </router-link>
    <div v-for="item in navigation" :key="item.name" class="pb-6">
      <router-link type="a"
                   :class="[
                            $route.name === item.route ? 'underline' : '',
                            'text-sm',
                            'navigation-link'
                          ]"
                   :to="item.to">
        {{ item.name }}
      </router-link>
    </div>
  </main>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useAuthStore } from '@/stores/auth'

export default defineComponent({
  name: 'SidebarNavigation',
  components: {},
  setup() {
    const store = useAuthStore()
    const isAuthenticated = computed(() => store.isAuthenticated)
    const username = computed(() => store.loggedInUser?.username)

    const navigation = computed(() => [
      { name: 'Cancellation Flows', route: 'dashboard', to: isAuthenticated.value ? { name: 'dashboard' } : { name: 'login' } },
      { name: 'Notifications', route: 'notifications', to: isAuthenticated.value ? { name: 'notifications' } : { name: 'login' } },
      { name: 'My Profile', route: 'user', to: username.value ? { name: 'user', params: { username: username.value } } : { name: 'login' } },
      { name: 'Settings', route: 'settings-profile', to: isAuthenticated.value ? { name: 'settings-profile' } : { name: 'login' } }
    ])

    return {
      navigation
    }
  }
})
</script>

<style scoped>
.navigation-link {
  font-family: 'Helvetica Neue', Arial, sans-serif;
  font-size: 18px;
  font-weight: 400;
}
</style>