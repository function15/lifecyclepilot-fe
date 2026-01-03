<template>
  <main v-if="user">
    <button @click="toggleFollow" @mouseover="hovering = true" @mouseleave="hovering = false"
            :class="['px-4 py-2 rounded', isFollowing ? (hovering ? 'bg-red-500 text-white' : 'bg-blue-500 text-white') : 'bg-blue-500 text-white']">
      {{ isFollowing ? (hovering ? 'Unfollow' : 'Following') : 'Follow' }}
    </button>
  </main>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { type User, useUserStore } from '@/stores/user'
import type { PropType } from 'vue'

export default defineComponent({
  name: 'FollowButton',
  props: {
    user: {
      type: Object as PropType<User | undefined>,
      required: false
    }
  },
  setup(props) {
    const authStore = useAuthStore()
    const userStore = useUserStore()

    const hovering = ref(false)

    const isFollowing = computed(() => {
      return props.user ? authStore.loggedInUser?.following?.includes(props.user.id) || false : false
    })

    const toggleFollow = async () => {
      if (props.user) {
        if (isFollowing.value) {
          await userStore.unfollowUser(props.user.username)
        } else {
          await userStore.followUser(props.user.username)
        }
      }
    }

    return {
      toggleFollow,
      isFollowing,
      hovering
    }
  }
})
</script>

<style scoped>
/* Add any scoped styles here */
</style>