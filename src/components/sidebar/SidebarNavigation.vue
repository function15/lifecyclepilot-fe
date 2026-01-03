<template>
  <main>
    <router-link :to="{name: 'home'}">
      <h2 class="text-xl font-bold mb-8">ATJ</h2>
    </router-link>
    <div v-for="item in navigation" :key="item.name" class="pb-6">
      <router-link type="a"
                   :class="[
                            $route.name === item.route && item.name !== 'Post' ? 'underline' : '',
                            'text-sm',
                            'navigation-link',
                            item.name === 'Post' && $route.name === item.route ? 'bg-blue-700 text-white px-4 py-2 rounded' : item.name === 'Post' ? 'bg-blue-500 text-white px-4 py-2 rounded' : ''
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
      { name: 'Dashboard', route: 'dashboard', to: isAuthenticated.value ? { name: 'dashboard' } : { name: 'login' } },
      { name: 'Trades', route: 'trades', to: isAuthenticated.value ? { name: 'trades' } : { name: 'login' } },
      { name: 'Feed', route: 'home', to: { name: 'home' } },
      { name: 'Stocks', route: 'stocks', to: { name: 'stocks' } },
      { name: 'Notifications', route: 'notifications', to: isAuthenticated.value ? { name: 'notifications' } : { name: 'login' } },
      { name: 'Liked', route: 'liked', to: isAuthenticated.value ? { name: 'liked' } : { name: 'login' } },
      { name: 'My Profile', route: 'user', to: username.value ? { name: 'user', params: { username: username.value } } : { name: 'login' } },
      { name: 'Settings', route: 'settings-profile', to: isAuthenticated.value ? { name: 'settings-profile' } : { name: 'login' } },
      { name: 'Post', route: 'create-post', to: isAuthenticated.value ? { name: 'create-post' } : { name: 'login' } },
      { name: 'About', route: 'about', to: { name: 'about' } }
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